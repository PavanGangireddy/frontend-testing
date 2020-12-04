import { create } from 'apisauce'

import {
   AssignmentPageResponse,
   GetAssignmentWorkbookResponse,
   PublishWorkbookRequest
} from '../../../stores/types'

import Config from '../../../../Common/constants/EnvironmentConstants'
import { apiMethods } from '../../../../Common/constants/APIConstants'

import endpoints from '../../endpoints'

import WorkbookService from '.'

const BASE_URL = `${Config.BSS_BASE_URL}workbook_evaluation/`

class WorkbookAPI implements WorkbookService {
   // TODO: need to mention type
   api: any
   networkCallWithAPISauce: Function

   constructor(networkCallWithAPISauce: Function) {
      this.api = create({
         baseURL: BASE_URL
      })
      this.networkCallWithAPISauce = networkCallWithAPISauce
   }

   getAssignmentWorkbookDetailsAPI(
      workbookId: string
   ): Promise<GetAssignmentWorkbookResponse> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.workbooks}${workbookId}/v2/`,
         {},
         apiMethods.get
      )
   }

   publishWorkbookAPI(
      workbookId: string,
      request: PublishWorkbookRequest
   ): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.workbook}${workbookId}/${endpoints.publishWorkbook}`,
         request,
         apiMethods.post
      )
   }

   getAssignmentPageDetailsAPI(
      pageId: string
   ): Promise<AssignmentPageResponse> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.page}${pageId}/v1/`,
         {},
         apiMethods.get
      )
   }
}

export default WorkbookAPI
