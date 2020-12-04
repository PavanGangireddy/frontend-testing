import { create, ApisauceInstance } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import Config from '../../../Common/constants/EnvironmentConstants'

import { GetLearningsResponseType } from '../../stores/types'

import endpoints from '../endpoints'

import LearningsService from '.'

const LEARNINGS_URL = `${Config.BSS_BASE_URL}workbook_evaluation/`

class LearningsAPI implements LearningsService {
   api: ApisauceInstance
   networkCallWithAPISauce: Function

   constructor(authNetworkCallWithApisauce) {
      this.api = create({
         baseURL: LEARNINGS_URL
      })
      this.networkCallWithAPISauce = authNetworkCallWithApisauce
   }

   getLearningWorkbooksAPI(): Promise<GetLearningsResponseType> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.learnings}`,
         {},
         apiMethods.get
      )
   }
}

export default LearningsAPI
