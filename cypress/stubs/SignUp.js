import { apiMethods } from '../constants/APIConstants/APIMethods'
import {
   apiEndpoints,
   AUTHENTICATION
} from '../constants/APIConstants/APIEndpoints'
import { apiStatuses } from '../constants/APIConstants/APIStatuses'
import { ACCESS_TOKEN } from '../constants/RouteConstants/RouteConstants'
export function stubSignUpUser() {
   cy.route({
      method: apiMethods.post,
      url: `${AUTHENTICATION}${apiEndpoints.signUp}`,
      status: apiStatuses.success,
      response: {}
   })
}

export function stubResendVerifyEmail() {
   cy.route({
      method: apiMethods.post,
      url: `${AUTHENTICATION}${apiEndpoints.sendVerificationEmail}`,
      status: apiStatuses.success,
      response: {}
   })
}

export function stubSuccessVerifyEmail() {
   cy.route({
      method: apiMethods.post,
      url: `${AUTHENTICATION}${apiEndpoints.verifyUserEmail}`,
      status: apiStatuses.success,
      response: {}
   })
}
