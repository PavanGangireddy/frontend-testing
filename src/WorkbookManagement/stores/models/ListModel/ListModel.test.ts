import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import getWorkbookDetailsAPIResponse from '../../../fixtures/getWorkbookDetailsAPIResponse.json'
import ListService from '../../../services/ListService/index.fixture'
import SectionService from '../../../services/SectionService/index.fixture'
import CardService from '../../../services/CardService/index.fixture'

import ListModel from '.'

const {
   page: { lists }
} = getWorkbookDetailsAPIResponse

const createSectionRequestObject = {
   list_id: 'test-list-id',
   section_name: 'test-section-name'
}

const sectionId = '3fa85f64-5717-4562-b3fc-2c963f66afa9'

const moveSectionAPIRequestObject = {
   list_id: '1'
}

const movePageListRequestObject = {
   page_id: '1'
}

describe('ListModel test cases', () => {
   let listService
   let sectionService
   let cardService
   let listModel
   let onSuccess
   let onFailure

   beforeEach(() => {
      listService = new ListService()
      sectionService = new SectionService()
      cardService = new CardService()
      listModel = new ListModel(
         lists[0],
         listService,
         sectionService,
         cardService
      )
      onSuccess = jest.fn()
      onFailure = jest.fn()
   })

   it('should test whether list Model is initialize or not', () => {
      expect(listModel.createSectionAPIStatus).toBe(API_INITIAL)
      expect(listModel.createSectionAPIError).toEqual({})

      expect(listModel.deleteSectionAPIStatus).toBe(API_INITIAL)
      expect(listModel.deleteSectionAPIError).toEqual({})

      expect(listModel.renameListAPIStatus).toBe(API_INITIAL)
      expect(listModel.renameListAPIError).toEqual({})
   })

   it('should initialize list model with given data', () => {
      const { list_id: listId, list_name: listName, sections } = lists[0]

      expect(listModel.id).toBe(listId)
      expect(listModel.name).toBe(listName)
      expect(listModel.sections.size).toBe(sections.length)
   })

   it('should test create section loading state', () => {
      const mockLoadingPromise = new Promise((resolve, reject): object => ({}))
      const mockCreateSectionService = jest.fn()
      mockCreateSectionService.mockReturnValue(mockLoadingPromise)
      listService.createSectionAPI = mockCreateSectionService

      listModel.createSectionAPI(
         createSectionRequestObject,
         onSuccess,
         onFailure
      )
      expect(listModel.createSectionAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test create section success state', async () => {
      await listModel.createSectionAPI(
         createSectionRequestObject,
         onSuccess,
         onFailure
      )

      expect(listModel.createSectionAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test create section failure state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         reject()
      })
      const mockCreateSectionService = jest.fn()
      mockCreateSectionService.mockReturnValue(mockSuccessPromise)
      listService.createSectionAPI = mockCreateSectionService

      await listModel.createSectionAPI(
         createSectionRequestObject,
         onSuccess,
         onFailure
      )

      expect(listModel.createSectionAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should update the name by given name', () => {
      listModel.updateName('Updated name for list')
      expect(listModel.name).toBe('Updated name for list')
   })

   it('should test delete section loading state', () => {
      const mockLoadingPromise = new Promise((resolve, reject): object => ({}))
      const mockDeleteSectionService = jest.fn()
      mockDeleteSectionService.mockReturnValue(mockLoadingPromise)
      listService.deleteSectionAPI = mockDeleteSectionService

      listModel.deleteSectionAPI(sectionId, onSuccess, onFailure)
      expect(listModel.deleteSectionAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })
   it('should test whether renameListAPI is initialize or not', () => {
      expect(listModel.renameListAPIStatus).toBe(API_INITIAL)
      expect(listModel.renameListAPIError).toEqual({})
   })

   it('should test renameListAPI loading state', () => {
      const mockLoadingPromise = new Promise((_): object => ({}))
      const mockCreateSectionService = jest.fn()
      mockCreateSectionService.mockReturnValue(mockLoadingPromise)
      listService.renameListAPI = mockCreateSectionService

      listModel.renameListAPI(onSuccess, onFailure)
      expect(listModel.renameListAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test delete section success state', async () => {
      const sectionModel = listModel.sections.get(sectionId)
      await listModel.deleteSectionAPI(sectionId, onSuccess, onFailure)

      expect(listModel.deleteSectionAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalledWith(sectionModel.name)
      expect(listModel.sections.get(sectionId)).toBe(undefined)
      expect(onFailure).not.toBeCalled()
   })

   it('should test delete section failure state', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) => reject())
      const mockDeleteSectionService = jest.fn()
      mockDeleteSectionService.mockReturnValue(mockSuccessPromise)
      listService.deleteSectionAPI = mockDeleteSectionService

      await listModel.deleteSectionAPI(sectionId, onSuccess, onFailure)
      expect(listModel.deleteSectionAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test renameListAPI loading state', () => {
      const mockLoadingPromise = new Promise((_): object => ({}))
      const mockCreateSectionService = jest.fn()
      mockCreateSectionService.mockReturnValue(mockLoadingPromise)
      listService.renameListAPI = mockCreateSectionService

      const value = ''
      listModel.renameListAPI(onSuccess, onFailure, value)
      expect(listModel.renameListAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test renameListAPI failure state', async () => {
      const mockLoadingPromise = new Promise((_, reject) => {
         reject()
      })
      const mockCreateSectionService = jest.fn()
      mockCreateSectionService.mockReturnValue(mockLoadingPromise)
      listService.renameListAPI = mockCreateSectionService

      const value = ''
      await listModel.renameListAPI(onSuccess, onFailure, value)
      expect(listModel.renameListAPIStatus).toBe(API_FAILED)
   })

   it('should test renameListAPI success state', async () => {
      const value = ''
      await listModel.renameListAPI(onSuccess, onFailure)
      expect(onSuccess).toBeCalled()
      expect(listModel.renameListAPIStatus).toBe(API_SUCCESS)
   })

   it('should test MoveSectionAPI initial state', () => {
      expect(listModel.moveSectionAPIStatus).toBe(API_INITIAL)
      expect(listModel.moveSectionAPIError).toStrictEqual({})
   })

   it('should test MoveSectionAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      listService.moveSectionAPI = jest.fn(() => mockLoadingPromise)

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      listModel.moveSectionAPI(
         '1',
         moveSectionAPIRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(listModel.moveSectionAPIStatus).toBe(API_FETCHING)
   })

   it('should test MoveSectionAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      listService.moveSectionAPI = jest.fn(() => mockFailurePromise)

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await listModel.moveSectionAPI(
         '1',
         moveSectionAPIRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(listModel.moveSectionAPIStatus).toBe(API_FAILED)
      expect(listModel.moveSectionAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockFailureFunction).toBeCalled()
   })

   it('should test MoveSectionAPI success state', async () => {
      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await listModel.moveSectionAPI(
         '3fa85f64-5717-4562-b3fc-2c963f66afa9',
         moveSectionAPIRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(listModel.moveSectionAPIStatus).toBe(API_SUCCESS)
      expect(mockSuccessFunction).toBeCalled()
   })
})
