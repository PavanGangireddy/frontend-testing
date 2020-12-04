import { create } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import Config from '../../../Common/constants/EnvironmentConstants'

import {
   GetWorkbookDetailsAPIResponseType,
   GetWorkbookChildDetailsAPIResponse,
   MergeCardsRequestType,
   CreatePageResponse,
   PageResponseType,
   ReorderPageRequest,
   MovePageRequest
} from '../../stores/types'

import endpoints from '../endpoints'

import WorkbookService from '.'

const BASE_URL = `${Config.BSS_BASE_URL}workbook_management/`

class WorkbookAPI implements WorkbookService {
   //TODO: need to mention type
   api: any
   networkCallWithAPISauce: Function

   constructor(networkCallWithAPISauce: Function) {
      this.api = create({
         baseURL: BASE_URL
      })
      this.networkCallWithAPISauce = networkCallWithAPISauce
   }

   getWorkbookDetailsAPI(
      workbookId: string
   ): Promise<GetWorkbookDetailsAPIResponseType> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.workbooks}${workbookId}/v1/`,
         {},
         apiMethods.get
      )
   }

   updatePageObjectiveWithDescriptionAPI(pageId, requestObject) {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.pages}${pageId}/page_objective/v1/`,
         requestObject,
         apiMethods.put
      )
   }

   getWorkbookChildDetailsAPI(
      workbookId: string
   ): Promise<GetWorkbookChildDetailsAPIResponse> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.workbook}${workbookId}/v1/`,
         {},
         apiMethods.get
      )
   }

   getSharedUsersDetailsAPI(workbookId: string) {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.workbooks}${workbookId}/shared_users/v1/`,
         {},
         apiMethods.get
      )
   }

   mergeCardsAPI(request: MergeCardsRequestType): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.mergeCards,
         request,
         apiMethods.post
      )
   }

   createPageAPI(workbookId: string): Promise<CreatePageResponse> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.workbooks}${workbookId}/pages/v1/`,
         {},
         apiMethods.post
      )
   }

   getPageDetailsAPI(pageId: string): Promise<PageResponseType> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.pages}${pageId}/v1/`,
         {},
         apiMethods.get
      )
   }

   reorderPageAPI(pageId: string, request: ReorderPageRequest): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.pages}${pageId}/order/update/v1/`,
         request,
         apiMethods.put
      )
   }

   movePageAPI(
      pageId: string,
      request: MovePageRequest
   ): Promise<PageResponseType> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.page}${pageId}/update/workbook/v1/`,
         request,
         apiMethods.put
      )
   }
}

export default WorkbookAPI
