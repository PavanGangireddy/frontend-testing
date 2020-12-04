/*global jest,expect*/
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import PaginationStore from '../../../Common/stores/PaginationStore'
import DiscussionsService from '../../services/DiscussionsService/index.fixture'
import { sortbyValues } from '../../constants/DiscussionConstants'
import DiscussionsStore from '.'

describe('DiscussionsStore Tests', () => {
   let apiService: DiscussionsService
   let discussionsStore: DiscussionsStore
   const entityObject = { entity_id: 'T_01', entity_type: 'CARD' }
   let onSuccess
   let onFailure

   beforeEach(() => {
      apiService = new DiscussionsService()
      discussionsStore = new DiscussionsStore({
         apiService: apiService,
         entityObject
      })
      onSuccess = jest.fn()
      onFailure = jest.fn()
   })

   it('should test initialising discussion store', () => {
      expect(discussionsStore.entityId).toBe(entityObject.entity_id)
      expect(discussionsStore.entityType).toBe(entityObject.entity_type)
      expect(discussionsStore.sortbyValue).toBe(sortbyValues.latest)
      expect(discussionsStore.getCreateNewDiscussionAPIStatus).toBe(API_INITIAL)
      expect(discussionsStore.getCreateNewDiscussionAPIError).toBe(null)
   })

   it('should test initialising pagination store store', () => {
      expect(discussionsStore.paginationStore).toBeInstanceOf(PaginationStore)
      expect(discussionsStore.paginationStore.getEntitiesListAPI).toBeTruthy()
      expect(
         discussionsStore.paginationStore.getEntitiesFromResponse
      ).toBeTruthy()
      expect(discussionsStore.paginationStore.getStringEntityIndex).toBeTruthy()
      expect(
         discussionsStore.paginationStore.getEntitiesCountFromResponse
      ).toBeTruthy()
      expect(discussionsStore.paginationStore.responseItemIterator).toBeTruthy()
   })

   it('should test onChangeSortbyValue()', () => {
      jest.spyOn(discussionsStore, 'onChangeOfValuesInRequestObject')
      jest.spyOn(discussionsStore.paginationStore, 'changeCurrentPage')
      const data = {
         value: 'OLDEST_TO_NEWEST',
         label: 'Oldest to Newest'
      }
      discussionsStore.onChangeSortbyValue(data)
      expect(discussionsStore.sortbyValue).toBe(data.value)
      expect(discussionsStore.onChangeOfValuesInRequestObject).toBeCalled()
      expect(discussionsStore.paginationStore.changeCurrentPage).toBeCalledWith(
         1
      )
   })
   it('should test createNewDiscussion() data fetching state', () => {
      const requestObject = {
            title: 'testTitle',
            description: 'testDescription'
         },
         mockLoadingPromise = new Promise(() => {})

      apiService.postDiscussionAPI = jest
         .fn()
         .mockReturnValue(mockLoadingPromise)

      discussionsStore.createNewDiscussion(requestObject, onSuccess, onFailure)
      expect(discussionsStore.getCreateNewDiscussionAPIStatus).toBe(
         API_FETCHING
      )
   })

   it('should test createNewDiscussion() success state', async () => {
      jest.spyOn(discussionsStore.paginationStore, 'changeCurrentPage')
      const requestObject = {
            title: 'testTitle',
            description: 'testDescription'
         },
         mockSuccessPromise = Promise.resolve({})

      apiService.postDiscussionAPI = jest
         .fn()
         .mockReturnValue(mockSuccessPromise)

      await discussionsStore.createNewDiscussion(
         requestObject,
         onSuccess,
         onFailure
      )
      expect(discussionsStore.getCreateNewDiscussionAPIStatus).toBe(API_SUCCESS)
      expect(discussionsStore.paginationStore.changeCurrentPage).toBeCalledWith(
         1
      )
   })

   it('should test createNewDiscussion() failure state', async () => {
      const requestObject = {
         title: 'testTitle',
         description: 'testDescription'
      }

      jest
         .spyOn(apiService, 'postDiscussionAPI')
         .mockImplementation(() => Promise.reject())

      await discussionsStore.createNewDiscussion(
         requestObject,
         onSuccess,
         onFailure
      )
      expect(discussionsStore.getCreateNewDiscussionAPIStatus).toBe(API_FAILED)
   })

   it('should test clearStore()', () => {
      jest.spyOn(discussionsStore, 'init')
      discussionsStore.clearStore()
      expect(discussionsStore.init).toBeCalled()
   })
})
