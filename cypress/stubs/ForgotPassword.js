import { apiMethods } from '../constants/APIConstants/APIMethods'
import {
   apiEndpoints,
   AUTHENTICATION
} from '../constants/APIConstants/APIEndpoints'
import { apiStatuses } from '../constants/APIConstants/APIStatuses'
import { RANDOM_TOKEN } from '../constants/RouteConstants/RouteConstants'
import linkExpiredResponse from '../fixtures/linkExpiredResponse.json'

export function stubSendEmail() {
   cy.route({
      method: apiMethods.post,
      url: `${AUTHENTICATION}${apiEndpoints.forgotPassword}`,
      status: apiStatuses.success,
      response: {}
   })
}

export function stubUpdatePassword() {
   cy.route({
      method: apiMethods.post,
      url: `${AUTHENTICATION}${apiEndpoints.updatePassword}?token=${RANDOM_TOKEN}`,
      status: apiStatuses.success,
      response: {}
   })
}

export function stubUpdatePasswordLinkExpired() {
   cy.route({
      method: apiMethods.post,
      url: `${AUTHENTICATION}${apiEndpoints.updatePassword}?token=${RANDOM_TOKEN}`,
      status: apiStatuses.linkExpired,
      response: linkExpiredResponse
   })
}
