import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import verifyLoginResponse from '../../fixtures/AuthFixtures/verifyLoginResponse.json'

import AuthService from '.'

class AuthFixture implements AuthService {
   verifyLoginAPI() {
      return resolveWithTimeout(verifyLoginResponse)
   }

   sendEmailAPI() {
      return resolveWithTimeout({})
   }

   updatePasswordAPI() {
      return resolveWithTimeout({})
   }

   signUpAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   sendVerificationEmailAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   refreshAuthTokensAPI() {
      return resolveWithTimeout(verifyLoginResponse)
   }
}

export default AuthFixture
