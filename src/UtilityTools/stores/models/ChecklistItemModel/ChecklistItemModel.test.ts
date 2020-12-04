import {
   API_INITIAL,
   API_FETCHING,
   API_FAILED,
   API_SUCCESS
} from '@ib/api-constants'

import checklistData from '../../../fixtures/get-checklist-response.json'
import ChecklistService from '../../../services/ChecklistService'
import ChecklistFixtureService from '../../../services/ChecklistService/index.fixture'

import ChecklistItemModel from '.'

describe('ChecklistItemModel tests', () => {
   let checklistService: ChecklistService
   let checklistItemModel: ChecklistItemModel
   const checklistItem = checklistData.checklist[0]
   const mockOnFailure = jest.fn()

   beforeEach(() => {
      checklistService = new ChecklistFixtureService()
      checklistItemModel = new ChecklistItemModel(
         checklistService,
         checklistItem
      )
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test model initialised or not', () => {
      expect(checklistItemModel.putChecklistItemAPIStatus).toBe(API_INITIAL)
      expect(checklistItemModel.putChecklistItemAPIError).toBe(null)
      expect(checklistItemModel.text).toBe(checklistItem.text)
      expect(checklistItemModel.isChecked).toBe(checklistItem.is_checked)
      expect(checklistItemModel.id).toBe(checklistItem.checklist_item_id)
   })

   it('should test putChecklistItemAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockPutChecklistItemAPI = jest.fn()
      mockPutChecklistItemAPI.mockReturnValue(mockFetchingPromise)
      checklistService.putChecklistItem = mockPutChecklistItemAPI

      checklistItemModel.putChecklistItem(
         { text: '', is_checked: false },
         () => {},
         mockOnFailure
      )
      expect(checklistItemModel.putChecklistItemAPIStatus).toBe(API_FETCHING)
      expect(checklistItemModel.putChecklistItemAPIError).toBe(null)
   })

   it('should test putChecklistItemAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while updating  checklistItem!'))
      )

      const mockPutChecklistItemAPI = jest.fn()
      mockPutChecklistItemAPI.mockReturnValue(mockFailurePromise)
      checklistService.putChecklistItem = mockPutChecklistItemAPI

      await checklistItemModel.putChecklistItem(
         { text: '', is_checked: false },
         () => {},
         mockOnFailure
      )

      expect(checklistItemModel.putChecklistItemAPIStatus).toBe(API_FAILED)
      expect(mockOnFailure).toBeCalled()
      expect(checklistItemModel.putChecklistItemAPIError).toBe(
         'Error while updating  checklistItem!'
      )
   })

   it('should test putChecklistItemAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve => resolve({}))

      const mockPutChecklistItemAPI = jest.fn()
      mockPutChecklistItemAPI.mockReturnValue(mockSuccessPromise)
      checklistService.putChecklistItem = mockPutChecklistItemAPI
      const updatedChecklistItem = checklistData.checklist[1]

      checklistItemModel.updateId(updatedChecklistItem.checklist_item_id)
      checklistItemModel.updateIsChecked(updatedChecklistItem.is_checked)
      checklistItemModel.updateText(updatedChecklistItem.text)

      await checklistItemModel.putChecklistItem(
         {
            text: updatedChecklistItem.text,
            is_checked: updatedChecklistItem.is_checked
         },
         () => {},
         mockOnFailure
      )

      expect(checklistItemModel.putChecklistItemAPIStatus).toBe(API_SUCCESS)
      expect(mockOnFailure).not.toBeCalled()
      expect(checklistItemModel.putChecklistItemAPIError).toBe(null)
      expect(checklistItemModel.id).toBe(updatedChecklistItem.checklist_item_id)
      expect(checklistItemModel.text).toBe(updatedChecklistItem.text)
      expect(checklistItemModel.isChecked).toBe(updatedChecklistItem.is_checked)
   })
})
