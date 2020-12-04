import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import getWorkbookDetailsAPIResponse from '../../../fixtures/getWorkbookDetailsAPIResponse.json'
import SectionService from '../../../services/SectionService/index.fixture'
import CardService from '../../../services/CardService/index.fixture'

import SectionModel from '.'

const {
   page: { lists }
} = getWorkbookDetailsAPIResponse
const { sections } = lists[0]

const cardCreationRequestObject = {
   section_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
   card_title: 'iBHubs'
}

const sectionId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

const cardId = '4fa85f64-5717-4562-b3fc-2c963f66afa0sfsdfsd'

const renameSectionRequestObject = {
   section_name: 'section name'
}

const moveCardRequestObject = {
   section_id: '1'
}

describe('SectionModel test cases', () => {
   let sectionModel
   let sectionService
   let cardService
   let onSuccess
   let onFailure

   beforeEach(() => {
      sectionService = new SectionService()
      cardService = new CardService()
      sectionModel = new SectionModel(sections[0], sectionService, cardService)
      onSuccess = jest.fn()
      onFailure = jest.fn()
   })

   it('should test whether  Section Model is initialize or not', () => {
      expect(sectionModel.createCardAPIStatus).toBe(API_INITIAL)
      expect(sectionModel.createCardAPIError).toEqual({})

      expect(sectionModel.updateSectionNameAPIStatus).toBe(API_INITIAL)
      expect(sectionModel.updateSectionNameAPIError).toEqual({})

      expect(sectionModel.deleteCardAPIStatus).toBe(API_INITIAL)
      expect(sectionModel.deleteCardAPIError).toEqual({})
   })

   it('should initialize section model with given data', () => {
      const {
         section_id: sectionId,
         section_name: sectionName,
         cards
      } = sections[0]

      expect(sectionModel.id).toBe(sectionId)
      expect(sectionModel.name).toBe(sectionName)
      expect(sectionModel.cards.size).toBe(cards.length)
   })

   it('should test create card loading state', () => {
      const mockLoadingPromise = new Promise((resolve, reject): object => ({}))
      const mockCreateCardService = jest.fn()
      mockCreateCardService.mockReturnValue(mockLoadingPromise)
      sectionService.createCardAPI = mockCreateCardService

      sectionModel.createCardAPI(
         cardCreationRequestObject,
         onSuccess,
         onFailure
      )
      expect(sectionModel.createCardAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test create card success state', async () => {
      await sectionModel.createCardAPI(
         cardCreationRequestObject,
         onSuccess,
         onFailure
      )

      expect(sectionModel.createCardAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test create card failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject()
      })
      const mockCreateCardService = jest.fn()
      mockCreateCardService.mockReturnValue(mockFailurePromise)
      sectionService.createCardAPI = mockCreateCardService

      await sectionModel.createCardAPI(
         cardCreationRequestObject,
         onSuccess,
         onFailure
      )

      expect(sectionModel.createCardAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test rename section loading state', () => {
      const mockLoadingPromise = new Promise((resolve, reject): object => ({}))
      const mockRenameSectionService = jest.fn()
      mockRenameSectionService.mockReturnValue(mockLoadingPromise)
      sectionService.updateSectionNameAPI = mockRenameSectionService

      sectionModel.updateSectionNameAPI(
         sectionId,
         renameSectionRequestObject,
         onSuccess,
         onFailure
      )
      expect(sectionModel.updateSectionNameAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test rename section success state', async () => {
      await sectionModel.updateSectionNameAPI(
         renameSectionRequestObject,
         onSuccess,
         onFailure
      )

      expect(sectionModel.updateSectionNameAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test update section name failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject): void =>
         reject()
      )
      const mockRenameSectionService = jest.fn()
      mockRenameSectionService.mockReturnValue(mockFailurePromise)
      sectionService.updateSectionNameAPI = mockRenameSectionService

      await sectionModel.updateSectionNameAPI(
         renameSectionRequestObject,
         onSuccess,
         onFailure
      )
      expect(sectionModel.updateSectionNameAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test delete loading state', () => {
      const mockLoadingPromise = new Promise((resolve, reject): object => ({}))
      const mockDeleteCardService = jest.fn()
      mockDeleteCardService.mockReturnValue(mockLoadingPromise)
      sectionService.deleteCardAPI = mockDeleteCardService

      sectionModel.deleteCardAPI(cardId, onSuccess, onFailure)
      expect(sectionModel.deleteCardAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test delete Card Success state', async () => {
      await sectionModel.deleteCardAPI(cardId, onSuccess, onFailure)
      expect(sectionModel.deleteCardAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test delete Card failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => reject())
      const mockDeleteCardService = jest.fn()
      mockDeleteCardService.mockReturnValue(mockFailurePromise)
      sectionService.deleteCardAPI = mockDeleteCardService

      await sectionModel.deleteCardAPI(cardId, onSuccess, onFailure)
      expect(sectionModel.deleteCardAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test MoveCardAPI initial state', () => {
      expect(sectionModel.moveCardAPIStatus).toBe(API_INITIAL)
      expect(sectionModel.moveCardAPIError).toStrictEqual({})
   })

   it('should test MoveCardAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      sectionService.moveCardAPI = jest.fn(() => mockLoadingPromise)

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      sectionModel.moveCardAPI(
         '1',
         moveCardRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(sectionModel.moveCardAPIStatus).toBe(API_FETCHING)
   })

   it('should test MoveCardAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      sectionService.moveCardAPI = jest.fn(() => mockFailurePromise)

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await sectionModel.moveCardAPI(
         '1',
         moveCardRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(sectionModel.moveCardAPIStatus).toBe(API_FAILED)
      expect(sectionModel.moveCardAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockFailureFunction).toBeCalled()
   })

   it('should test MoveCardAPI success state', async () => {
      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await sectionModel.moveCardAPI(
         '4fa85f64-5717-4562-b3fc-2c963f66afa0sfsdfsd',
         moveCardRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(sectionModel.moveCardAPIStatus).toBe(API_SUCCESS)
      expect(mockSuccessFunction).toBeCalled()
   })
})
