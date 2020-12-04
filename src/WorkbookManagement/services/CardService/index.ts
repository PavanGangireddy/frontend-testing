import {
   CardDetails,
   UpdateCardNameRequest,
   UpdateCardNoteRequest,
   AddAttachmentRequest,
   UpdateAttachmentURLRequest,
   AddAttachmentResponse,
   UpdatePriorityRequest,
   UpdateLabelRequest,
   UpdateDueDateAndTimeRequest
} from '../../stores/types'

interface CardService {
   getCardDetailsAPI: (cardId: string) => Promise<CardDetails>

   updateCardNameAPI: (
      cardId: string,
      requestObject: UpdateCardNameRequest
   ) => Promise<{}>

   updateCardNoteAPI: (
      cardId: string,
      requestObject: UpdateCardNoteRequest
   ) => Promise<{}>

   addAttachmentAPI: (
      cardId: string,
      requestObject: AddAttachmentRequest
   ) => Promise<AddAttachmentResponse>

   updateAttachmentURLAPI: (
      attachmentId: string,
      requestObject: UpdateAttachmentURLRequest
   ) => Promise<{}>

   deleteAttachmentAPI: (attachmentId: string) => Promise<{}>

   updatePriorityAPI: (
      cardId: string,
      requestObject: UpdatePriorityRequest
   ) => Promise<{}>

   updateLabelAPI: (
      cardId: string,
      requestObject: UpdateLabelRequest
   ) => Promise<{}>

   updateDueDateAndTimeAPI: (
      cardId: string,
      requestObject: UpdateDueDateAndTimeRequest
   ) => Promise<{}>
}

export default CardService
