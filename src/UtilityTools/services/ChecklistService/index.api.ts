import { ApisauceInstance, create } from 'apisauce'

import config from '../../../Common/constants/EnvironmentConstants'
import { apiMethods } from '../../../Common/constants/APIConstants'

import {
   NewChecklistItemType,
   GetChecklistRequestType,
   PutChecklistItemRequestType
} from '../../stores/types'

import endpoints from '../endpoints'

import ChecklistService from '.'

const CHECKLIST_URL = `${config.BSS_BASE_URL}bss_checklist/`

export default class ChecklistServiceAPI implements ChecklistService {
   api: ApisauceInstance
   networkCallWithApisauce: Function

   constructor(networkCallWithApisauce: Function) {
      this.api = create({
         baseURL: CHECKLIST_URL
      })
      this.networkCallWithApisauce = networkCallWithApisauce
   }

   getChecklist = (requestObject: GetChecklistRequestType) =>
      this.networkCallWithApisauce(
         this.api,
         endpoints.getChecklist,
         requestObject,
         apiMethods.post
      )

   postChecklistItem = (requestObject: NewChecklistItemType) =>
      this.networkCallWithApisauce(
         this.api,
         endpoints.postChecklistItem,
         requestObject,
         apiMethods.post
      )

   putChecklistItem = (
      itemId: string,
      requestObject: PutChecklistItemRequestType
   ) =>
      this.networkCallWithApisauce(
         this.api,
         `${endpoints.putChecklistItem}${itemId}/v1/`,
         requestObject,
         apiMethods.put
      )

   //TODO: Need to confirm endpoint
   removeChecklistItemAPI = itemId =>
      this.networkCallWithApisauce(
         this.api,
         `${endpoints.putChecklistItem}${itemId}/v1/`,
         {},
         apiMethods.delete
      )
}
