import { observable, computed, action, ObservableMap } from 'mobx'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL, API_SWIPE_REFRESH, APIStatus } from '@ib/api-constants'

import { FilterType, Pagination } from './types'

class PaginationStore {
   // FIXME: Mention specific/Generic types for all the variables having any 'type'
   Model: any
   @observable
   entitiesMap: ObservableMap<any>
   @observable
   totalEntities: number
   @observable
   currentFilters: any = new Map()
   @observable
   currentSortOrder: any = []
   @observable
   pages: ObservableMap<any>
   @observable
   currentPage = 0
   @observable
   showPerPage = 10
   @observable
   entitiesFetchingStatus: APIStatus
   requestTransformer: (
      pagination: Pagination,
      filters: ObservableMap<any>,
      sortOrder: any
   ) => any
   defaultGetEntitiesRequestObject: any
   getEntitiesResponseCallback: (response: any) => any
   getEntitiesErrorCallback: (response: any) => any
   @observable
   apiError: any
   recentGetEntitiesPromise!: Promise<any>
   createModelInstance: (any) => any
   getEntitiesFromResponse!: (response: any) => Array<any>
   getEntitiesCountFromResponse!: (response: any) => number
   responseItemIterator: (model: any) => any
   getEntitiesListAPI!: (any) => Promise<any>
   getStringEntityIndex!: (any) => string

   constructor(model: any) {
      this.Model = model
      this.entitiesMap = observable.map({})
      this.totalEntities = 0
      this.pages = observable.map({})
      this.entitiesFetchingStatus = API_INITIAL
      this.requestTransformer = pagination => pagination
      this.responseItemIterator = modalInstance => {}
      this.defaultGetEntitiesRequestObject = {}
      this.getEntitiesResponseCallback = () => {}
      this.getEntitiesErrorCallback = () => {}
      this.apiError = {}

      // FIXME: Flowtype error
      this.createModelInstance = entity => new this.Model(entity)
   }

   @computed
   get totalPages(): number {
      return Math.ceil(this.totalEntities / this.showPerPage)
   }

   @computed
   get currentPageEntityIds(): any {
      if (!this.pages.has(this.currentPage)) {
         return observable([])
      }
      return this.pages.get(this.currentPage)
   }

   @computed
   get currentPageEntities(): Array<any> {
      return this.currentPageEntityIds.map(entityId =>
         this.entitiesMap.get(entityId)
      )
   }

   getPaginationForPage(page: number): Pagination {
      return {
         limit: this.showPerPage,
         offset: (page - 1) * this.showPerPage
      }
   }

   @action.bound
   resetCurrentSortOrder() {
      this.currentSortOrder.clear()
   }

   @action.bound
   resetCurrentFilters() {
      this.currentFilters.clear()
   }

   @action.bound
   reloadPagesData() {
      this.clearPagesCache()
   }

   @action.bound
   resetPaginationState() {
      this.changeCurrentPage(1)
      this.resetCurrentFilters()
      this.resetCurrentSortOrder()
      this.reloadPagesData()
   }

   @action.bound
   clearPagesCache() {
      this.pages.clear()
      this.changeCurrentPage(1)
   }

   @action.bound
   reloadCurrentPage() {
      // FIXME: Flowtype error
      const promise = this.getEntities()
      this.recentGetEntitiesPromise = promise
      return promise
   }

   // Assuming onSwiperefresh filters,sorting wont be changed, currentPage will be set to 1
   swipeRefreshPage() {
      // FIXME: Flowtype error
      this.changeCurrentPage(1)
      const promise = this.getEntities({}, true, this.currentPage, () => {}, {
         loadingStatus: API_SWIPE_REFRESH
      })
      this.recentGetEntitiesPromise = promise
      return promise
   }

   @action.bound
   loadPage(page: number) {
      // FIXME: Flowtype error
      const promise = this.getEntities({}, true, page)
      this.recentGetEntitiesPromise = promise
      return promise
   }

   @action.bound
   changeCurrentPage(page: number, shouldReactImmediately = true) {
      if (typeof page === 'number' && Math.round(page) === page && page > 0) {
         this.currentPage = page
      } else {
         throw Error(`current page: ${page} is not a valid number`)
      }
      if (shouldReactImmediately) {
         this.reloadCurrentPage()
      }
   }

   @action.bound
   changeShowPerPage(showPerPage: number, shouldReactImmediately = true) {
      if (
         typeof showPerPage === 'number' &&
         Math.round(showPerPage) === showPerPage &&
         showPerPage > 0
      ) {
         this.showPerPage = showPerPage
      } else {
         throw Error(`show per page: ${showPerPage} is not a valid number`)
      }
      if (shouldReactImmediately) {
         this.reloadPagesData()
      }
   }

   @action.bound
   changeCurrentFilter(
      filterKey: FilterType,
      filterValues: Array<any>,
      shouldReactImmediately = true
   ) {
      this.currentFilters.set(filterKey, observable(filterValues))
      if (shouldReactImmediately) {
         this.reloadPagesData()
      }
   }

   @action.bound
   addFilterValueForCurrentFilterKey(filterKey: FilterType, filterValue: any) {
      if (this.currentFilters.has(filterKey)) {
         const cfValues = this.currentFilters.get(filterKey)
         cfValues.push(filterValue)
      } else {
         this.currentFilters.set(filterKey, observable.array([filterValue]))
      }
   }

   @action.bound
   removeFilterValueFromCurrentFilterKey(
      filterKey: FilterType,
      filterValue: any
   ) {
      if (this.currentFilters.has(filterKey)) {
         const cfValues = this.currentFilters.get(filterKey)
         cfValues.remove(filterValue)
      }
   }

   @action.bound
   removeFilterObjectFromCurrentFiltersByKey(filterKey: FilterType) {
      if (this.currentFilters.has(filterKey)) {
         this.currentFilters.delete(filterKey)
      }
   }

   @action.bound
   changeCurrentSortOrder(
      sortValues: Array<any>,
      shouldReactImmediately = true
   ) {
      this.currentSortOrder.replace(observable(sortValues))
      if (shouldReactImmediately) {
         this.reloadPagesData()
      }
   }

   @action.bound
   addSortFieldToCurrentSortOrder(sortValue: any) {
      this.currentSortOrder.push(sortValue)
   }

   @action.bound
   async getEntities(
      requestObject?,
      shouldUpdateImmediately = true,
      currentPage: number = this.currentPage,
      callback: (response?: any) => any = () => {},
      options?: any
   ): Promise<any> {
      const pagination = this.getPaginationForPage(this.currentPage)
      const request = Object.assign(
         {},
         this.defaultGetEntitiesRequestObject,
         this.requestTransformer(
            pagination,
            this.currentFilters,
            this.currentSortOrder
         ),
         requestObject
      )
      const entitiesPromise = this.getEntitiesListAPI(request)
      if (shouldUpdateImmediately === true) {
         return bindPromiseWithOnSuccess(entitiesPromise, options)
            .to(
               (status: APIStatus) => {
                  if (currentPage === this.currentPage) {
                     this.setEntitiesFetchingStatus(status)
                  }
               },
               response => {
                  this.setEntitiesResponse(response, currentPage)
               }
            )
            .then(response => {
               this.getEntitiesResponseCallback(response)
               callback(response)
            })
            .catch(error => {
               this.getEntitiesErrorCallback(error)
               this.apiError = error
            })
      }
      return entitiesPromise
   }

   @action.bound
   setEntitiesResponse(entitiesResponse: any, page: number) {
      this.addEntitiesToPage(
         this.getEntitiesFromResponse(entitiesResponse),
         page
      )
      const totalEntities = this.getEntitiesCountFromResponse(entitiesResponse)
      if (typeof totalEntities === 'number') {
         this.totalEntities = totalEntities
      } else {
         throw Error(
            'total entities is not number in getEntitiesCountFromResponse'
         )
      }
   }

   @action.bound
   setEntitiesFetchingStatus(status: APIStatus): void {
      this.entitiesFetchingStatus = status
   }

   @action.bound
   addEntitiesToPage(entities: Array<any>, page: number) {
      if (entities) {
         const entityIds = entities.map(entity => {
            const entityId = this.getStringEntityIndex(entity)
            const model = this.createModelInstance(entity)
            this.entitiesMap.set(entityId, model)
            this.responseItemIterator(model)
            return entityId
         })
         if (this.pages.has(page)) {
            this.pages.get(page).replace(entityIds)
         } else {
            this.pages.set(page, observable(entityIds))
         }
      } else {
         throw Error(`Entities is not an instance of array for page ${page}`)
      }
   }
}

export default PaginationStore
