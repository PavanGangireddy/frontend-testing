import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'
import getWorkbookDetailsAPIResponse from '../../../fixtures/getWorkbookDetailsAPIResponse.json'
import CardService from '../../../services/CardService/index.fixture'

import CardModel from '.'

const {
   page: { lists }
} = getWorkbookDetailsAPIResponse
const { sections } = lists[0]
const { cards } = sections[0]

const cardId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

const attachmentId = '3fa85f64-5818-4562-b3cc-2c963fdadfa6'

const updateCardNameRequest = {
   card_title: 'updated card title'
}

const updateCardNoteRequest = {
   card_note: 'updated card title'
}

const updateAttachmentURLRequest = {
   url: 'https://www.google.co.in'
}

const addAttachmentRequest = {
   url: 'https://wwww.youtube.com'
}

const updateLabelRequestObject = {
   label: '#ffffff'
}

const updatePriorityRequestObject = {
   priority: 2
}

describe('CardModel test cases', () => {
   let cardService
   let cardModel
   let onSuccess
   let onFailure

   beforeEach(() => {
      cardService = new CardService()
      cardModel = new CardModel(cards[0], null, cardService)
      onSuccess = jest.fn()
      onFailure = jest.fn()
   })

   it('should test whether  cardModel is initialize or not', () => {
      expect(cardModel.getCardDetailsAPIStatus).toBe(API_INITIAL)
      expect(cardModel.cardDetailsAPIError).toEqual({})

      expect(cardModel.updateCardNameAPIStatus).toBe(API_INITIAL)
      expect(cardModel.updateCardNameAPIError).toEqual({})

      expect(cardModel.updateCardNoteAPIStatus).toBe(API_INITIAL)
      expect(cardModel.updateCardNoteAPIError).toEqual({})

      expect(cardModel.addAttachmentAPIStatus).toBe(API_INITIAL)
      expect(cardModel.addAttachmentAPIError).toEqual({})

      expect(cardModel.updateAttachmentURLAPIStatus).toBe(API_INITIAL)
      expect(cardModel.updateAttachmentURLAPIError).toEqual({})

      expect(cardModel.deleteAttachmentAPIStatus).toBe(API_INITIAL)
      expect(cardModel.deleteAttachmentAPIError).toEqual({})

      expect(cardModel.updateCardLabelAPIStatus).toBe(API_INITIAL)
      expect(cardModel.updateCardLabelAPIError).toEqual({})

      expect(cardModel.updateCardPriorityAPIStatus).toBe(API_INITIAL)
      expect(cardModel.updateCardPriorityAPIError).toEqual({})
   })

   it('should initialize card model with given data', () => {
      const {
         card_id: cardId,
         card_title: cartTitle,
         has_attachments: hasAttachments,
         has_notes: hasNotes
      } = cards[0]

      expect(cardModel.id).toBe(cardId)
      expect(cardModel.name).toBe(cartTitle)
      expect(cardModel.hasAttachments).toBe(hasAttachments)
      expect(cardModel.hasNotes).toBe(hasNotes)
   })

   it('should test card Details data fetching state', () => {
      const mockLoadingPromise = new Promise((resolve, reject): object => ({}))
      const mockCardDetailsService = jest.fn()
      mockCardDetailsService.mockReturnValue(mockLoadingPromise)
      cardService.getCardDetailsAPI = mockCardDetailsService

      cardModel.getCardDetailsAPI(cardId, onSuccess, onFailure)
      expect(cardModel.getCardDetailsAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test card Details data success state', async () => {
      await cardModel.getCardDetailsAPI(cardId, onSuccess, onFailure)
      expect(cardModel.getCardDetailsAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test card Details data failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => reject())
      const mockCardDetailsService = jest.fn()
      mockCardDetailsService.mockReturnValue(mockFailurePromise)
      cardService.getCardDetailsAPI = mockCardDetailsService

      await cardModel.getCardDetailsAPI(cardId, onSuccess, onFailure)
      expect(cardModel.getCardDetailsAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test update card name loading state', () => {
      const mockLoadingPromise = new Promise((resolve, reject): object => ({}))
      const mockUpdateCardNameService = jest.fn()
      mockUpdateCardNameService.mockReturnValue(mockLoadingPromise)
      cardService.updateCardNameAPI = mockUpdateCardNameService

      cardModel.updateCardNameAPI(
         cardId,
         updateCardNameRequest,
         onSuccess,
         onFailure
      )
      expect(cardModel.updateCardNameAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test update card name success state', async () => {
      await cardModel.updateCardNameAPI(
         cardId,
         updateCardNameRequest,
         onSuccess,
         onFailure
      )
      expect(cardModel.updateCardNameAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test update card name failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => reject())
      const mockUpdateCardNameService = jest.fn()
      mockUpdateCardNameService.mockReturnValue(mockFailurePromise)
      cardService.updateCardNameAPI = mockUpdateCardNameService

      await cardModel.updateCardNameAPI(
         cardId,
         updateCardNameRequest,
         onSuccess,
         onFailure
      )
      expect(cardModel.updateCardNameAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })
   //TODO: Need to fix the skipped test cases
   it.skip('should test update card note success state', async () => {
      await cardModel.updateCardNoteAPI(
         cardId,
         updateCardNoteRequest,
         onSuccess,
         onFailure
      )
      expect(cardModel.updateCardNoteAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test update card note failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => reject())
      const mockUpdateCardNoteService = jest.fn()
      mockUpdateCardNoteService.mockReturnValue(mockFailurePromise)
      cardService.updateCardNoteAPI = mockUpdateCardNoteService

      await cardModel.updateCardNoteAPI(
         cardId,
         updateCardNoteRequest,
         onSuccess,
         onFailure
      )
      expect(cardModel.updateCardNoteAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test add attachment loading state', () => {
      const mockLoadingPromise = new Promise((resolve, reject): object => ({}))
      const mockAddAttachmentURLService = jest.fn()
      mockAddAttachmentURLService.mockReturnValue(mockLoadingPromise)
      cardService.addAttachmentAPI = mockAddAttachmentURLService

      cardModel.addAttachmentAPI(
         cardId,
         addAttachmentRequest,
         onSuccess,
         onFailure
      )
      expect(cardModel.addAttachmentAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })
   //TODO: Need to fix the skipped test cases
   it.skip('should test add attachment success state', async () => {
      await cardModel.addAttachmentAPI(
         cardId,
         addAttachmentRequest,
         onSuccess,
         onFailure
      )
      expect(cardModel.addAttachmentAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test add attachment failure state', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) => reject())
      const mockAddAttachmentURLService = jest.fn()
      mockAddAttachmentURLService.mockReturnValue(mockSuccessPromise)
      cardService.addAttachmentAPI = mockAddAttachmentURLService

      await cardModel.addAttachmentAPI(
         cardId,
         addAttachmentRequest,
         onSuccess,
         onFailure
      )
      expect(cardModel.addAttachmentAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test update attachment url loading state', () => {
      const mockLoadingPromise = new Promise((resolve, reject): object => ({}))
      const mockUpdateAttachmentURLService = jest.fn()
      mockUpdateAttachmentURLService.mockReturnValue(mockLoadingPromise)
      cardService.updateAttachmentURLAPI = mockUpdateAttachmentURLService

      cardModel.updateAttachmentURLAPI(
         attachmentId,
         updateAttachmentURLRequest,
         onSuccess,
         onFailure
      )
      expect(cardModel.updateAttachmentURLAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test update attachment url success state', async () => {
      await cardModel.updateAttachmentURLAPI(
         attachmentId,
         updateAttachmentURLRequest,
         onSuccess,
         onFailure
      )
      expect(cardModel.updateAttachmentURLAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test update attachment url failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => reject())
      const mockUpdateAttachmentURLService = jest.fn()
      mockUpdateAttachmentURLService.mockReturnValue(mockFailurePromise)
      cardService.updateAttachmentURLAPI = mockUpdateAttachmentURLService

      await cardModel.updateAttachmentURLAPI(
         attachmentId,
         updateAttachmentURLRequest,
         onSuccess,
         onFailure
      )
      expect(cardModel.updateAttachmentURLAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test delete attachment loading state', () => {
      const mockLoadingPromise = new Promise((resolve, reject): object => ({}))
      const mockDeleteAttachmentService = jest.fn()
      mockDeleteAttachmentService.mockReturnValue(mockLoadingPromise)
      cardService.deleteAttachmentAPI = mockDeleteAttachmentService

      cardModel.deleteAttachmentAPI(attachmentId, onSuccess, onFailure)
      expect(cardModel.deleteAttachmentAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it.skip('should test delete attachment success state', async () => {
      await cardModel.deleteAttachmentAPI(attachmentId, onSuccess, onFailure)
      expect(cardModel.deleteAttachmentAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test delete attachment failure state', async () => {
      const mockLoadingPromise = new Promise((resolve, reject) => reject())
      const mockDeleteAttachmentService = jest.fn()
      mockDeleteAttachmentService.mockReturnValue(mockLoadingPromise)
      cardService.deleteAttachmentAPI = mockDeleteAttachmentService

      await cardModel.deleteAttachmentAPI(attachmentId, onSuccess, onFailure)
      expect(cardModel.deleteAttachmentAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test update label loading state', () => {
      const mockLoadingPromise = new Promise((resolve, reject): object => ({}))
      const mockUpdateLabelService = jest.fn()
      mockUpdateLabelService.mockReturnValue(mockLoadingPromise)
      cardService.updateLabelAPI = mockUpdateLabelService

      cardModel.updateLabelAPI(updateLabelRequestObject, onSuccess, onFailure)
      expect(cardModel.updateCardLabelAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test update label success state', async () => {
      await cardModel.updateLabelAPI(
         updateLabelRequestObject,
         onSuccess,
         onFailure
      )
      expect(cardModel.updateCardLabelAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test update label failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => reject())
      const mockUpdateLabelService = jest.fn()
      mockUpdateLabelService.mockReturnValue(mockFailurePromise)
      cardService.updateLabelAPI = mockUpdateLabelService

      await cardModel.updateLabelAPI(
         updateLabelRequestObject,
         onSuccess,
         onFailure
      )
      expect(cardModel.updateCardLabelAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test update priority loading state', () => {
      const mockLoadingPromise = new Promise((resolve, reject): object => ({}))
      const mockUpdatePriorityService = jest.fn()
      mockUpdatePriorityService.mockReturnValue(mockLoadingPromise)
      cardService.updatePriorityAPI = mockUpdatePriorityService

      cardModel.updatePriorityAPI(
         updatePriorityRequestObject,
         onSuccess,
         onFailure
      )
      expect(cardModel.updateCardPriorityAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test update priority success state', async () => {
      await cardModel.updatePriorityAPI(
         updatePriorityRequestObject,
         onSuccess,
         onFailure
      )
      expect(cardModel.updateCardPriorityAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test update priority failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => reject())
      const mockUpdatePriorityService = jest.fn()
      mockUpdatePriorityService.mockReturnValue(mockFailurePromise)
      cardService.updatePriorityAPI = mockUpdatePriorityService

      await cardModel.updatePriorityAPI(
         updatePriorityRequestObject,
         onSuccess,
         onFailure
      )
      expect(cardModel.updateCardPriorityAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })
})
