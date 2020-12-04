import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL, APIStatus } from '@ib/api-constants'

import PaginationStore from '../../../Common/stores/PaginationStore'

import { filterValues, sortbyValues } from '../../constants/DiscussionConstants'
import DiscussionsService from '../../services/DiscussionsService'
import DiscussionModel from '../models/Discussion'

import { EntityObjectType } from '../types'

export interface DiscussionsStoreProps {
   apiService: DiscussionsService
   entityObject: EntityObjectType
}

export default class DiscussionsStore {
   entityId: string
   entityType: string
   apiService: DiscussionsService
   paginationStore!: PaginationStore

   @observable sortbyValue!: string
   @observable getCreateNewDiscussionAPIStatus!: APIStatus
   @observable getCreateNewDiscussionAPIError!: Error | null

   constructor({ apiService, entityObject }: DiscussionsStoreProps) {
      this.apiService = apiService
      this.entityId = entityObject.entity_id
      this.entityType = entityObject.entity_type
      this.init()
      this.initPaginationStore()
   }

   @action.bound
   init() {
      this.sortbyValue = sortbyValues.latest
      this.getCreateNewDiscussionAPIStatus = API_INITIAL
      this.getCreateNewDiscussionAPIError = null
   }

   @action.bound
   initPaginationStore() {
      const { apiService } = this
      this.paginationStore = new PaginationStore(DiscussionModel)
      this.paginationStore.getEntitiesListAPI = apiService.getDiscussionsAPI
      this.paginationStore.getEntitiesFromResponse = response =>
         response.discussions
      this.paginationStore.getStringEntityIndex = entity => entity.discussion_id
      this.paginationStore.getEntitiesCountFromResponse = response =>
         response.total_count
      this.paginationStore.responseItemIterator = modalInstance =>
         (modalInstance.apiService = apiService)
      this.paginationStore.changeShowPerPage(4, false)
      this.onChangeOfValuesInRequestObject()
   }

   @action.bound
   onChangeOfValuesInRequestObject() {
      const {
         entityId: entity_id,
         entityType: entity_type,
         sortbyValue: sort_by
      } = this
      this.paginationStore.defaultGetEntitiesRequestObject = {
         entity_id,
         entity_type,
         sort_by
      }
   }

   @action.bound
   onChangeSortbyValue(data) {
      this.sortbyValue = data.value
      this.onChangeOfValuesInRequestObject()
      this.paginationStore.reloadPagesData()
   }

   @action.bound
   setGetCreateNewDiscussionAPIStatus(apiStatus) {
      this.getCreateNewDiscussionAPIStatus = apiStatus
   }

   @action.bound
   setCreateNewDiscussionAPIResponse(response) {
      //    NOTE: Ask suggestion from RP bro (Whether to refresh or assign a local value)
      this.paginationStore.reloadPagesData()
   }

   @action.bound
   setGetCreateNewDiscussionAPIError(error) {
      this.getCreateNewDiscussionAPIError = error
   }

   @action.bound
   createNewDiscussion(
      data: { title: string; description: string },
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) {
      const {
         entityId: entity_id,
         entityType: entity_type,
         apiService,
         setGetCreateNewDiscussionAPIStatus,
         setCreateNewDiscussionAPIResponse,
         setGetCreateNewDiscussionAPIError
      } = this
      const requestObject = { ...data, entity_id, entity_type }
      const promise = apiService.postDiscussionAPI(requestObject)
      return bindPromiseWithOnSuccess(promise)
         .to(setGetCreateNewDiscussionAPIStatus, response => {
            setCreateNewDiscussionAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            setGetCreateNewDiscussionAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   clearStore() {
      this.init()
   }
}
