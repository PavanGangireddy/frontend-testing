import { create } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import Config from '../../../Common/constants/EnvironmentConstants'

import { MoveSectionRequestType, MoveListRequestType } from '../../stores/types'

import endpoints from '../endpoints'

import ListService from '.'

const BASE_URL = `${Config.BSS_BASE_URL}workbook_management/`

class ListAPI implements ListService {
   //TODO: need to mention type
   api: any
   networkCallWithAPISauce: Function

   constructor(networkCallWithAPISauce: Function) {
      this.api = create({
         baseURL: BASE_URL
      })
      this.networkCallWithAPISauce = networkCallWithAPISauce
   }

   createSectionAPI(requestObject) {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.createSection,
         requestObject,
         apiMethods.post
      )
   }

   deleteSectionAPI(sectionId) {
      const endPoint = `/section/${sectionId}/delete/v1/`
      return this.networkCallWithAPISauce(
         this.api,
         endPoint,
         {},
         apiMethods.delete
      )
   }

   renameListAPI(requestObject, listId) {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.lists}${listId}/v1/`,
         requestObject,
         apiMethods.put
      )
   }

   moveSectionAPI(
      sectionId: string,
      request: MoveSectionRequestType
   ): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.section}${sectionId}/update/list/v1/`,
         request,
         apiMethods.put
      )
   }
}

export default ListAPI
