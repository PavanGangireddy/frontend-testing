/*
 * @flow
 * refactored to @typescript
 */

import { observable, ObservableMap } from 'mobx'

import { Pagination } from '../PaginationStore/types'
import PaginationStore from './PaginationStore'

class Entity {
   id
   name
   constructor({ id, name }) {
      this.id = id
      this.name = name
   }
}

type RequestFilterType = {
   filter_type: string
   filter_by: string
}

type RequestSortType = {
   key: string
   order: 'ASC' | 'DESC'
}

type RequestType = {
   limit: number
   offset: number
   filters: Array<RequestFilterType>
   sort_by: RequestSortType
}

type ResponseType = {
   entities: Array<Entity>
   total: number
}

function getEntitiesListAPI(request: RequestType): Promise<ResponseType> {
   return new Promise(resolve => {
      setTimeout(() => {
         const response: ResponseType = {
            total: 100,
            entities: []
         }
         let start = request.offset
         let end = request.offset + request.limit
         let increment = 1
         if (request.filters.length > 0) {
            if (request.filters[0].filter_type === 'ODD_EVEN') {
               start = request.offset * 2
               increment = 2
               if (request.filters[0].filter_by === 'ODD') {
                  if (start % 2 === 0) {
                     start += 1
                  }
               } else if (start % 2 !== 0) {
                  start += 1
               }
               end = request.limit * 2
               end += start
            }
         }
         for (let i = start; i < end; i += increment) {
            response.entities.push({
               id: i,
               name: `Entity-${i}`
            })
         }
         if (request.sort_by.order === 'DESC') {
            response.entities = response.entities.reverse()
         }
         resolve(response)
      }, 1000)
   })
}

describe('PaginationStore', () => {
   const store = new PaginationStore(Entity)
   store.getEntitiesListAPI = getEntitiesListAPI
   store.getStringEntityIndex = entity => entity.id.toString()
   store.getEntitiesFromResponse = (response: any) => response.entities
   store.getEntitiesCountFromResponse = (response: any) => response.total
   store.requestTransformer = (
      pagination: Pagination,
      filters: ObservableMap<any>,
      sortOrders: any
   ): any => {
      let sort = { key: 'id', order: 'ASC' }
      if (sortOrders.length > 0) {
         ;[sort] = sortOrders
      }
      const filtersRequest = Array.from(
         filters.entries()
      ).map(([key, value]) => ({ filter_type: key, filter_by: value[0].label }))
      return Object.assign(
         {},
         pagination,
         {
            filters: filtersRequest
         },
         { sort_by: sort }
      )
   }
   beforeAll(() => {})

   it('Initial State', () => {
      expect(store.totalPages).toBe(0)
      expect(store.currentPageEntities).toEqual([])
      expect(store.currentPageEntities).toEqual([])
   })
   it('Change Current Page to 1', () => {
      expect.assertions(10)
      expect(store.pages.has(1)).toBe(false)
      store.changeCurrentPage(1)
      return store.recentGetEntitiesPromise.then(() => {
         expect(store.currentPage).toBe(1)
         expect(store.showPerPage).toBe(10)
         expect(store.totalPages).toBe(10)
         expect(store.totalEntities).toBe(100)
         expect(store.entitiesFetchingStatus).toBe(200)
         expect(store.currentPageEntityIds.toJS()).toEqual([
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9'
         ])
         expect(store.currentPageEntities).toEqual([
            new Entity({ id: 0, name: 'Entity-0' }),
            new Entity({ id: 1, name: 'Entity-1' }),
            new Entity({ id: 2, name: 'Entity-2' }),
            new Entity({ id: 3, name: 'Entity-3' }),
            new Entity({ id: 4, name: 'Entity-4' }),
            new Entity({ id: 5, name: 'Entity-5' }),
            new Entity({ id: 6, name: 'Entity-6' }),
            new Entity({ id: 7, name: 'Entity-7' }),
            new Entity({ id: 8, name: 'Entity-8' }),
            new Entity({ id: 9, name: 'Entity-9' })
         ])
         expect(store.entitiesMap.toJSON()).toEqual({
            0: new Entity({ id: 0, name: 'Entity-0' }),
            1: new Entity({ id: 1, name: 'Entity-1' }),
            2: new Entity({ id: 2, name: 'Entity-2' }),
            3: new Entity({ id: 3, name: 'Entity-3' }),
            4: new Entity({ id: 4, name: 'Entity-4' }),
            5: new Entity({ id: 5, name: 'Entity-5' }),
            6: new Entity({ id: 6, name: 'Entity-6' }),
            7: new Entity({ id: 7, name: 'Entity-7' }),
            8: new Entity({ id: 8, name: 'Entity-8' }),
            9: new Entity({ id: 9, name: 'Entity-9' })
         })
         expect(store.pages.toJSON()).toEqual({
            1: observable(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
         })
      })
   })
   it('Change current page to 2', () => {
      expect.assertions(6)
      store.changeCurrentPage(2)
      return store.recentGetEntitiesPromise.then(() => {
         expect(store.currentPage).toBe(2)
         expect(store.showPerPage).toBe(10)
         expect(store.totalPages).toBe(10)
         expect(store.totalEntities).toBe(100)
         expect(store.entitiesFetchingStatus).toBe(200)
         expect(store.currentPageEntityIds.toJS()).toEqual([
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19'
         ])
      })
   })
   it('Show 5 per page', () => {
      expect.assertions(4)
      store.changeShowPerPage(5, true)
      return store.recentGetEntitiesPromise.then(() => {
         expect(store.currentPage).toBe(1)
         expect(store.totalPages).toBe(20)
         expect(store.totalEntities).toBe(100)
         expect(store.currentPageEntities).toEqual([
            new Entity({ id: 0, name: 'Entity-0' }),
            new Entity({ id: 1, name: 'Entity-1' }),
            new Entity({ id: 2, name: 'Entity-2' }),
            new Entity({ id: 3, name: 'Entity-3' }),
            new Entity({ id: 4, name: 'Entity-4' })
         ])
      })
   })
   it('Apply Even-only filter', async () => {
      expect.assertions(1)
      store.changeCurrentFilter('ODD_EVEN', [
         { label: 'EVEN', id: 0, extra: {} }
      ])
      return store.recentGetEntitiesPromise.then(() =>
         expect(store.currentPageEntities).toEqual([
            new Entity({ id: 0, name: 'Entity-0' }),
            new Entity({ id: 2, name: 'Entity-2' }),
            new Entity({ id: 4, name: 'Entity-4' }),
            new Entity({ id: 6, name: 'Entity-6' }),
            new Entity({ id: 8, name: 'Entity-8' })
         ])
      )
   })
   it('Change to second page again', () => {
      expect.assertions(1)
      store.changeCurrentPage(2)
      return store.recentGetEntitiesPromise.then(() =>
         expect(store.currentPageEntities).toEqual([
            new Entity({ id: 10, name: 'Entity-10' }),
            new Entity({ id: 12, name: 'Entity-12' }),
            new Entity({ id: 14, name: 'Entity-14' }),
            new Entity({ id: 16, name: 'Entity-16' }),
            new Entity({ id: 18, name: 'Entity-18' })
         ])
      )
   })
   it('Apply Odd-only filter', async () => {
      expect.assertions(1)
      store.changeCurrentFilter('ODD_EVEN', [
         { label: 'ODD', id: 0, extra: {} }
      ])
      return store.recentGetEntitiesPromise.then(() =>
         expect(store.currentPageEntities).toEqual([
            new Entity({ id: 1, name: 'Entity-1' }),
            new Entity({ id: 3, name: 'Entity-3' }),
            new Entity({ id: 5, name: 'Entity-5' }),
            new Entity({ id: 7, name: 'Entity-7' }),
            new Entity({ id: 9, name: 'Entity-9' })
         ])
      )
   })
   it('Change Sort Order', async () => {
      expect.assertions(1)
      store.changeCurrentSortOrder([{ key: 'id', order: 'DESC' }])
      return store.recentGetEntitiesPromise.then(() =>
         expect(store.currentPageEntities).toEqual([
            new Entity({ id: 9, name: 'Entity-9' }),
            new Entity({ id: 7, name: 'Entity-7' }),
            new Entity({ id: 5, name: 'Entity-5' }),
            new Entity({ id: 3, name: 'Entity-3' }),
            new Entity({ id: 1, name: 'Entity-1' })
         ])
      )
   })
   it('Setting Same Sort Order', async () => {
      const oldPromise = store.recentGetEntitiesPromise
      store.changeCurrentSortOrder([{ key: 'id', order: 'DESC' }], false)
      const newPromise = store.recentGetEntitiesPromise
      expect(oldPromise).toEqual(newPromise)
   })
   it('Setting Same Filter', async () => {
      const oldPromise = store.recentGetEntitiesPromise
      store.changeCurrentFilter(
         'ODD_EVEN',
         [{ label: 'ODD', id: 0, extra: {} }],
         false
      )
      const newPromise = store.recentGetEntitiesPromise
      expect(oldPromise).toEqual(newPromise)
   })
})
