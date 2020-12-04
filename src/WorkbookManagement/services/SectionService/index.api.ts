import { create } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import Config from '../../../Common/constants/EnvironmentConstants'

import { MoveCardRequestType } from '../../stores/types'

import endpoints from '../endpoints'

import SectionService from '.'

const BASE_URL = `${Config.BSS_BASE_URL}workbook_management/`

class SectionAPI implements SectionService {
   //TODO: need to mention type
   api: any
   networkCallWithAPISauce: Function

   constructor(networkCallWithAPISauce: Function) {
      this.api = create({
         baseURL: BASE_URL
      })
      this.networkCallWithAPISauce = networkCallWithAPISauce
   }

   createCardAPI(requestObject) {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.createCard,
         requestObject,
         apiMethods.post
      )
   }

   updateSectionNameAPI(sectionId, requestObject) {
      const endPoint = `/section/${sectionId}/update/name/v1/`
      return this.networkCallWithAPISauce(
         this.api,
         endPoint,
         requestObject,
         apiMethods.post
      )
   }

   deleteCardAPI(card_id) {
      const endpoint = `${endpoints.card}${card_id}/delete/v1/`
      return this.networkCallWithAPISauce(
         this.api,
         endpoint,
         {},
         apiMethods.delete
      )
   }

   moveCardAPI(cardId: string, request: MoveCardRequestType): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.card}${cardId}/update/section/v1/`,
         request,
         apiMethods.put
      )
   }
}

export default SectionAPI
