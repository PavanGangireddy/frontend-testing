import { create, ApisauceInstance } from 'apisauce'

import { apiMethods } from '../../../../Common/constants/APIConstants'
import Config from '../../../../Common/constants/EnvironmentConstants'

import { AssignmentSubmitResponse } from '../../../stores/types'

import endpoints from '../../endpoints'

import PageService from '.'

const BASE_URL = `${Config.BSS_BASE_URL}workbook_evaluation/`

class PageAPI implements PageService {
   api: ApisauceInstance
   authNetworkCallWithApisauce

   constructor(authNetworkCallWithApisauce) {
      this.api = create({
         baseURL: BASE_URL
      })
      this.authNetworkCallWithApisauce = authNetworkCallWithApisauce
   }

   submitAssignmentAPI(pageId: string): Promise<AssignmentSubmitResponse> {
      return this.authNetworkCallWithApisauce(
         this.api,
         `${endpoints.page}${pageId}/evaluate/v1/`,
         {},
         apiMethods.post
      )
   }
}

export default PageAPI
