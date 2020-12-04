import { apiMethods } from '../constants/APIConstants/APIMethods'
import {
   apiEndpoints,
   AUTHENTICATION
} from '../constants/APIConstants/APIEndpoints'
import { apiStatuses } from '../constants/APIConstants/APIStatuses'
import getAccessToken from '../fixtures/getAccessToken.json'

export function stubGetAccessToken() {
   cy.route({
      method: apiMethods.post,
      url: `${AUTHENTICATION}${apiEndpoints.login}`,
      status: apiStatuses.success,
      response: getAccessToken
   })
}
