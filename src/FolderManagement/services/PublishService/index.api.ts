import { create, ApisauceInstance } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import Config from '../../../Common/constants/EnvironmentConstants'

import { SortRequestType, PublishWorkbookResponse } from '../../stores/types'

import endpoints from '../endpoints'

import PublishService from '.'

const BASE_URL = `${Config.BSS_BASE_URL}workbook_evaluation/`

class PublishAPI implements PublishService {
   api: ApisauceInstance
   networkCallWithAPISauce: Function

   constructor(authNetworkCallWithApisauce) {
      this.api = create({
         baseURL: BASE_URL
      })
      this.networkCallWithAPISauce = authNetworkCallWithApisauce
   }

   getPublishedWorkbookAPI(
      request: SortRequestType
   ): Promise<PublishWorkbookResponse> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.publishWorkbooks}`,
         request,
         apiMethods.post
      )
   }
}

export default PublishAPI
