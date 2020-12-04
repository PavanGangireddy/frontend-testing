import { create } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import Config from '../../../Common/constants/EnvironmentConstants'

import endpoints from '../endpoints'

import CardService from '.'

const BASE_URL = `${Config.BSS_BASE_URL}workbook_management/`

class CardAPI implements CardService {
   //TODO: need to mention type
   api: any
   networkCallWithAPISauce: Function

   constructor(networkCallWithAPISauce: Function) {
      this.api = create({
         baseURL: BASE_URL
      })
      this.networkCallWithAPISauce = networkCallWithAPISauce
   }

   getCardDetailsAPI(cardId) {
      const endpoint = `${endpoints.card}${cardId}/v1/`
      return this.networkCallWithAPISauce(
         this.api,
         endpoint,
         {},
         apiMethods.get
      )
   }

   updateCardNameAPI(cardId, requestObject) {
      const endpoint = `${endpoints.card}${cardId}/update/title/`
      return this.networkCallWithAPISauce(
         this.api,
         endpoint,
         requestObject,
         apiMethods.post
      )
   }

   updateCardNoteAPI(cardId, requestObject) {
      const endpoint = `${endpoints.card}${cardId}/notes/v1/`
      return this.networkCallWithAPISauce(
         this.api,
         endpoint,
         requestObject,
         apiMethods.post
      )
   }

   addAttachmentAPI(cardId, requestObject) {
      const endpoint = `${endpoints.card}${cardId}/add_attachment/v1/`
      return this.networkCallWithAPISauce(
         this.api,
         endpoint,
         requestObject,
         apiMethods.post
      )
   }

   updateAttachmentURLAPI(attachmentId, requestObject) {
      const endpoint = `${endpoints.attachment}${attachmentId}/update/v1/`
      return this.networkCallWithAPISauce(
         this.api,
         endpoint,
         requestObject,
         apiMethods.post
      )
   }

   deleteAttachmentAPI(attachmentId) {
      const endpoint = `${endpoints.attachment}${attachmentId}/delete/v1/`
      return this.networkCallWithAPISauce(
         this.api,
         endpoint,
         {},
         apiMethods.delete
      )
   }

   updatePriorityAPI(card_id, requestObject) {
      const endpoint = `${endpoints.card}${card_id}/update/priority/v1/`
      return this.networkCallWithAPISauce(
         this.api,
         endpoint,
         requestObject,
         apiMethods.put
      )
   }

   updateLabelAPI(card_id, requestObject) {
      const endpoint = `${endpoints.cards}${card_id}/card_label/v1/`
      return this.networkCallWithAPISauce(
         this.api,
         endpoint,
         requestObject,
         apiMethods.put
      )
   }

   updateDueDateAndTimeAPI(card_id, requestObject) {
      //TODO: need to confirm with backend
      const endpoint = `${endpoints.card}${card_id}/update/due_datetime/`
      return this.networkCallWithAPISauce(
         this.api,
         endpoint,
         requestObject,
         apiMethods.post
      )
   }
}

export default CardAPI
