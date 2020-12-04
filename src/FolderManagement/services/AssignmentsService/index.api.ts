import { create, ApisauceInstance } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import Config from '../../../Common/constants/EnvironmentConstants'

import {
   GetAssignmentsResponseType,
   AssignmentInstructionsResponse
} from '../../stores/types'

import endpoints from '../endpoints'

import AssignmentsService from '.'

const ASSIGNMENTS_URL = `${Config.BSS_BASE_URL}workbook_evaluation/`

class AssignmentsAPI implements AssignmentsService {
   api: ApisauceInstance
   networkCallWithAPISauce: Function

   constructor(authNetworkCallWithApisauce) {
      this.api = create({
         baseURL: ASSIGNMENTS_URL
      })
      this.networkCallWithAPISauce = authNetworkCallWithApisauce
   }

   getAssignmentsAPI(): Promise<GetAssignmentsResponseType> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.assignments}`,
         {},
         apiMethods.get
      )
   }

   getAssignmentInstructionsAPI(
      workbookId: string
   ): Promise<AssignmentInstructionsResponse> {
      const endpoint = `${endpoints.workbook}${workbookId}/instructions/v1/`
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoint}`,
         {},
         apiMethods.get
      )
   }
}

export default AssignmentsAPI
