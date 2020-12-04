import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import getCardDetails from '../../fixtures/getCardDetails.json'
import addAttachmentResponse from '../../fixtures/addAttachment.json'

import CardService from '.'

class CardFixture implements CardService {
   getCardDetailsAPI() {
      return resolveWithTimeout(getCardDetails)
   }

   updateCardNameAPI() {
      return resolveWithTimeout({})
   }

   updateCardNoteAPI() {
      return resolveWithTimeout({})
   }

   addAttachmentAPI() {
      return resolveWithTimeout(addAttachmentResponse)
   }

   updateAttachmentURLAPI() {
      return resolveWithTimeout({})
   }

   deleteAttachmentAPI() {
      return resolveWithTimeout({})
   }

   updatePriorityAPI() {
      return resolveWithTimeout({})
   }

   updateLabelAPI() {
      return resolveWithTimeout({})
   }

   updateDueDateAndTimeAPI() {
      return resolveWithTimeout({})
   }
}

export default CardFixture
