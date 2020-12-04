import {
   API_INITIAL,
   API_FETCHING,
   API_FAILED,
   API_SUCCESS
} from '@ib/api-constants'

import ChecklistService from '../../services/ChecklistService'
import checklistData from '../../fixtures/get-checklist-response.json'
import ChecklistFixtureService from '../../services/ChecklistService/index.fixture'

import ChecklistStore from '.'

const newCheckListItem = {
   text: 'New checklist item',
   isChecked: true
}

describe('Checklist store', () => {
   let checklistService: ChecklistService
   let checklistStore: ChecklistStore
   const entityDetails = { entity_id: 'iBT01', entity_type: 'TASK' }
   const mockOnSuccess = jest.fn()
   const mockOnFailure = jest.fn()

   beforeEach(() => {
      checklistService = new ChecklistFixtureService()
      checklistStore = new ChecklistStore(checklistService)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test if checklist store is initialised or not', () => {
      expect(checklistStore.getChecklistAPIStatus).toBe(API_INITIAL)
      expect(checklistStore.getChecklistAPIError).toBe(null)
      expect(checklistStore.postChecklistItemAPIStatus).toBe(API_INITIAL)
      expect(checklistStore.postChecklistItemAPIError).toBe(null)
      expect(checklistStore.checklist.size).toBe(0)
   })

   it('should test getChecklistAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockGetChecklistAPI = jest.fn()
      mockGetChecklistAPI.mockReturnValue(mockFetchingPromise)
      checklistService.getChecklist = mockGetChecklistAPI

      checklistStore.getChecklist(entityDetails)
      expect(checklistStore.getChecklistAPIStatus).toBe(API_FETCHING)
      expect(checklistStore.getChecklistAPIError).toBe(null)
   })

   it('should test getChecklistAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while fetching checklist!'))
      )

      const mockGetChecklistAPI = jest.fn()
      mockGetChecklistAPI.mockReturnValue(mockFailurePromise)
      checklistService.getChecklist = mockGetChecklistAPI

      await checklistStore.getChecklist(entityDetails)
      expect(checklistStore.getChecklistAPIStatus).toBe(API_FAILED)
      expect(checklistStore.getChecklistAPIError).toBe(
         'Error while fetching checklist!'
      )
   })

   it('should test getChecklistAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => resolve(checklistData))

      const mockGetChecklistAPI = jest.fn()
      mockGetChecklistAPI.mockReturnValue(mockSuccessPromise)
      checklistService.getChecklist = mockGetChecklistAPI

      await checklistStore.getChecklist(entityDetails)
      expect(checklistStore.getChecklistAPIStatus).toBe(API_SUCCESS)
      expect(checklistStore.getChecklistAPIError).toBe(null)
      expect(checklistStore.checklist.size).toBe(checklistData.checklist.length)
   })

   it('should test postChecklistItemAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockPostChecklistItemAPI = jest.fn()
      mockPostChecklistItemAPI.mockReturnValue(mockFetchingPromise)
      checklistService.postChecklistItem = mockPostChecklistItemAPI

      checklistStore.addNewChecklistItem(newCheckListItem)
      checklistStore.postNewChecklistItem(mockOnSuccess, mockOnFailure)
      expect(checklistStore.postChecklistItemAPIStatus).toBe(API_FETCHING)
      expect(checklistStore.postChecklistItemAPIError).toBe(null)
   })

   it('should test postChecklistItemAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while posting new checklistItem!'))
      )

      const mockPostChecklistItemAPI = jest.fn()
      mockPostChecklistItemAPI.mockReturnValue(mockFailurePromise)
      checklistService.postChecklistItem = mockPostChecklistItemAPI

      checklistStore.addNewChecklistItem(newCheckListItem)
      await checklistStore.postNewChecklistItem(mockOnSuccess, mockOnFailure)

      expect(checklistStore.postChecklistItemAPIStatus).toBe(API_FAILED)
      expect(mockOnFailure).toBeCalled()
      expect(checklistStore.postChecklistItemAPIError).toBe(
         'Error while posting new checklistItem!'
      )
   })

   it('should test postChecklistItemAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve =>
         resolve(checklistData.checklist[0].checklist_item_id)
      )

      const mockPostChecklistItemAPI = jest.fn()
      mockPostChecklistItemAPI.mockReturnValue(mockSuccessPromise)
      checklistService.postChecklistItem = mockPostChecklistItemAPI

      checklistStore.addNewChecklistItem(newCheckListItem)
      await checklistStore.postNewChecklistItem(mockOnSuccess, mockOnFailure)

      expect(checklistStore.postChecklistItemAPIStatus).toBe(API_SUCCESS)
      expect(mockOnSuccess).toBeCalled()
      expect(checklistStore.postChecklistItemAPIError).toBe(null)
      expect(checklistStore.checklist.size).toBe(1)
   })

   it('should test if checklist store is cleared or not', () => {
      expect(checklistStore.getChecklistAPIStatus).toBe(API_INITIAL)
      expect(checklistStore.getChecklistAPIError).toBe(null)
      expect(checklistStore.postChecklistItemAPIStatus).toBe(API_INITIAL)
      expect(checklistStore.postChecklistItemAPIError).toBe(null)
      expect(checklistStore.checklist.size).toBe(0)
   })
})
