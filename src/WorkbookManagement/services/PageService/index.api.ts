import { create, ApisauceInstance } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import Config from '../../../Common/constants/EnvironmentConstants'

import {
   CreatePageListAPIRequestType,
   ReorderListSectionAPIRequestType,
   ReorderPageListAPIRequestType,
   ReorderSectionCardAPIRequestType,
   GetMultipleCardDetailsRequestType,
   GetMultipleCardDetailsResponseType,
   MoveListRequestType
} from '../../stores/types'

import endpoints from '../endpoints'

import PageService from '.'

const BASE_URL = `${Config.BSS_BASE_URL}workbook_management/`

class PageAPI implements PageService {
   api: ApisauceInstance
   authNetworkCallWithApisauce

   constructor(authNetworkCallWithApisauce) {
      this.api = create({
         baseURL: BASE_URL
      })
      this.authNetworkCallWithApisauce = authNetworkCallWithApisauce
   }

   createPageListAPI(request: CreatePageListAPIRequestType): Promise<{}> {
      return this.authNetworkCallWithApisauce(
         this.api,
         endpoints.createPageList,
         request,
         apiMethods.post
      )
   }

   deletePageListAPI(listId: string): Promise<{}> {
      return this.authNetworkCallWithApisauce(
         this.api,
         `${endpoints.lists}${listId}/v1/`,
         {},
         apiMethods.delete
      )
   }

   reorderListSectionAPI(
      sectionId: string,
      request: ReorderListSectionAPIRequestType
   ): Promise<{}> {
      return this.authNetworkCallWithApisauce(
         this.api,
         `${endpoints.section}${sectionId}/update/order/v1/`,
         request,
         apiMethods.post
      )
   }

   reorderPageListAPI(
      listId: string,
      request: ReorderPageListAPIRequestType
   ): Promise<{}> {
      return this.authNetworkCallWithApisauce(
         this.api,
         `${endpoints.lists}${listId}/order/update/v1/`,
         request,
         apiMethods.put
      )
   }

   updatePageNameAPI(pageId, requestObject) {
      return this.authNetworkCallWithApisauce(
         this.api,
         `${endpoints.pages}${pageId}/page_name/v1/`,
         requestObject,
         apiMethods.put
      )
   }

   reorderSectionCardAPI(
      cardId: string,
      request: ReorderSectionCardAPIRequestType
   ): Promise<{}> {
      return this.authNetworkCallWithApisauce(
         this.api,
         `${endpoints.card}${cardId}/update/order/v1/`,
         request,
         apiMethods.post
      )
   }

   // TODO: Need to update return type
   getMultipleCardDetailsAPI(
      request: GetMultipleCardDetailsRequestType
   ): Promise<GetMultipleCardDetailsResponseType> {
      return this.authNetworkCallWithApisauce(
         this.api,
         endpoints.multipleCardDetails,
         request,
         apiMethods.post
      )
   }

   moveListAPI(listId: string, request: MoveListRequestType): Promise<{}> {
      return this.authNetworkCallWithApisauce(
         this.api,
         `${endpoints.list}${listId}/update/page/v1/`,
         request,
         apiMethods.put
      )
   }
}

export default PageAPI
