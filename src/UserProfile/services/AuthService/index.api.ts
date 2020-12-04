import { create } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import Config from '../../../Common/constants/EnvironmentConstants'

import { USER_TOKEN, NAME } from '../../constants/AuthenticationConstants'
import {
   SignUpRequest,
   SendVerificationEmailRequest,
   LoginWithCodeResponse
} from '../../stores/types'

import endpoints from '../endpoints'

import AuthService from '.'

const AUTH_URL = `${Config.BSS_BASE_URL}bss_auth/`

class AuthAPI implements AuthService {
   api: Record<string, any>
   networkCallWithAPISauce: Function

   constructor(networkCallWithAPISauce: Function) {
      this.api = create({
         baseURL: AUTH_URL
      })
      this.networkCallWithAPISauce = networkCallWithAPISauce
   }

   // TODO: need to edit this after development
   // verifyLoginAPI(userToken: string, name: string) {
   //    const endpoint = `${endpoints.loginWithUserToken}?${USER_TOKEN}=${userToken}&${NAME}=${name}`
   //    return this.networkCallWithAPISauce(
   //       this.api,
   //       endpoint,
   //       {},
   //       apiMethods.post
   //    )
   // }

   verifyLoginAPI(requestObject) {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.login,
         requestObject,
         apiMethods.post
      )
   }

   sendEmailAPI(requestObject) {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.forgotPassword,
         requestObject,
         apiMethods.post
      )
   }

   updatePasswordAPI(token, requestObject) {
      const endpoint = `${endpoints.updatePassword}?token=${token}`
      return this.networkCallWithAPISauce(
         this.api,
         endpoint,
         requestObject,
         apiMethods.post
      )
   }

   signUpAPI(request: SignUpRequest): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.signUp,
         request,
         apiMethods.post
      )
   }

   sendVerificationEmailAPI(
      request: SendVerificationEmailRequest
   ): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.sendVerificationEmail,
         request,
         apiMethods.post
      )
   }

   refreshAuthTokensAPI(
      request: LoginWithCodeResponse
   ): Promise<LoginWithCodeResponse> {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.refreshAuthToken,
         request,
         apiMethods.post
      )
   }
}

export default AuthAPI
