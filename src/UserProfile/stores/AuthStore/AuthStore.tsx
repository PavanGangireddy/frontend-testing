import { observable, action } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'

import { bindPromiseWithOnSuccess } from '../../../Common/utils/MobxPromise'

import AuthService from '../../services/AuthService'
import {
   setAccessToken,
   setRefreshToken,
   getAccessToken,
   clearAllCookies
} from '../../utils/StorageUtils'

import {
   Tokens,
   SendEmailAPIRequest,
   UpdatePasswordAPIRequest,
   SignUpRequest,
   SendVerificationEmailRequest,
   LoginWithCodeResponse
} from '../types'
import AuthTokens from '../models/AuthTokens'

class AuthStore {
   @observable verifyLoginAPIStatus!: APIStatus
   @observable verifyLoginAPIError: any

   @observable logoutAPIStatus!: APIStatus
   @observable logoutAPIError: any

   @observable sendEmailAPIStatus!: APIStatus
   @observable sendEmailAPIError!: any

   @observable updatePasswordAPIStatus!: APIStatus
   @observable updatePasswordAPIError: any
   @observable signUpAPIStatus!: APIStatus
   // TODO: Need to add type
   @observable signUpAPIError!: any
   @observable sendVerificationEmailAPIStatus!: APIStatus
   // TODO: Need to add type
   @observable sendVerificationEmailAPIError!: any

   @observable refreshAuthTokenAPIStatus!: APIStatus
   @observable refreshAuthTokenAPIError!: any

   @observable authTokens!: AuthTokens

   refreshAuthTokensPromise
   authService: AuthService

   constructor(authService) {
      this.authService = authService
      this.initAuthStore()
   }

   @action.bound
   initAuthStore(): void {
      this.initAPIStatusAndErrors()
      this.authTokens = new AuthTokens()
      this.authTokens.setAccessToken(getAccessToken())
   }

   @action.bound
   initAPIStatusAndErrors(): void {
      this.verifyLoginAPIStatus = API_INITIAL
      this.verifyLoginAPIError = {}

      this.updatePasswordAPIStatus = API_INITIAL
      this.updatePasswordAPIError = {}

      this.logoutAPIStatus = API_INITIAL
      this.logoutAPIError = {}

      this.sendEmailAPIStatus = API_INITIAL
      this.sendEmailAPIError = {}
      this.signUpAPIStatus = API_INITIAL
      this.signUpAPIError = {}
      this.sendVerificationEmailAPIStatus = API_INITIAL
      this.sendVerificationEmailAPIError = {}

      this.refreshAuthTokenAPIStatus = API_INITIAL
      this.refreshAuthTokenAPIError = {}
   }

   setCookies(response: Tokens): void {
      setAccessToken(response.access_token)
      setRefreshToken(response.refresh_token)
   }

   @action.bound
   setVerifyLoginAPIStatus(status: APIStatus): void {
      this.verifyLoginAPIStatus = status
   }

   @action.bound
   setVerifyLoginAPIError(error: any): void {
      this.verifyLoginAPIError = error
   }

   @action.bound
   setVerifyLoginAPIResponse(response: Tokens): void {
      this.setCookies(response)
      this.authTokens.setAuthTokens(response)
   }

   // TODO: need to use when we use beta or gamma
   // @action.bound
   // verifyLoginAPI(authCode: string): any {
   //    const verifyLoginAPIPromise = this.authService.verifyLoginAPI(authCode)
   //    return bindPromiseWithOnSuccess(verifyLoginAPIPromise)
   //       .to(this.setVerifyLoginAPIStatus, response => {
   //          this.setVerifyLoginAPIResponse(response as Tokens)
   //       })
   //       .catch(err => {
   //          this.setVerifyLoginAPIError(err)
   //          throw err
   //       })
   // }
   @action.bound
   verifyLoginAPI(
      requestObject: any,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ): any {
      const verifyLoginAPIPromise = this.authService.verifyLoginAPI(
         requestObject
      )
      return bindPromiseWithOnSuccess(verifyLoginAPIPromise)
         .to(this.setVerifyLoginAPIStatus, response => {
            this.setVerifyLoginAPIResponse(response as Tokens)
            onSuccess()
         })
         .catch(err => {
            this.setVerifyLoginAPIError(err)
            onFailure(err)
            throw err
         })
   }

   @action.bound
   setSendEmailAPIStatus(status: APIStatus): void {
      this.sendEmailAPIStatus = status
   }

   @action.bound
   setSendEmailAPIError(error: any): void {
      console.log('error in store', error)
      this.sendEmailAPIError = error
   }

   //TODO: reset status to initial is working
   @action.bound
   setSendEmailAPIResponse() {
      this.setSendEmailAPIStatus(API_INITIAL)
   }

   @action.bound
   sendEmailAPI(
      requestObject: SendEmailAPIRequest,
      onSuccess: Function = (): void => {},
      onFailure: Function = (error): void => {}
   ): any {
      const sendEmailAPIPromise = this.authService.sendEmailAPI(requestObject)

      return bindPromiseWithOnSuccess(sendEmailAPIPromise)
         .to(this.setSendEmailAPIStatus, response => {
            this.setSendEmailAPIResponse()
            onSuccess()
         })
         .catch(err => {
            this.setSendEmailAPIError(err)
            onFailure(err)
         })
   }

   @action.bound
   setUpdatePasswordAPIStatus(status: APIStatus): void {
      this.updatePasswordAPIStatus = status
   }

   @action.bound
   setUpdatePasswordAPIError(error: any): void {
      this.updatePasswordAPIError = error
   }

   @action.bound
   updatePasswordAPI(
      requestObject: UpdatePasswordAPIRequest,
      token: string,
      onSuccess: Function = (): void => {},
      onFailure: Function = (error: any): void => {}
   ): any {
      const updatePasswordAPIPromise = this.authService.updatePasswordAPI(
         token,
         requestObject
      )

      return bindPromiseWithOnSuccess(updatePasswordAPIPromise)
         .to(this.setUpdatePasswordAPIStatus, response => {
            this.setSendEmailAPIResponse()
            onSuccess()
         })
         .catch(error => {
            this.setUpdatePasswordAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setSignUpAPIStatus(status: APIStatus): void {
      this.signUpAPIStatus = status
   }

   // TODO: Need to add type
   @action.bound
   setSignUpAPIError(error: any): void {
      this.signUpAPIError = error
   }

   // TODO: Need to add return type
   @action.bound
   signUpAPI(
      request: SignUpRequest,
      onSuccess: () => void,
      onFailure: (error) => void
   ) {
      const signUpPromise = this.authService.signUpAPI(request)
      return bindPromiseWithOnSuccess(signUpPromise)
         .to(this.setSignUpAPIStatus, () => {
            onSuccess()
         })
         .catch(error => {
            this.setSignUpAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setSendVerificationEmailAPIStatus(status: APIStatus): void {
      this.sendVerificationEmailAPIStatus = status
   }

   // TODO: Need to add type
   @action.bound
   setSendVerificationEmailAPIError(error: any): void {
      this.sendVerificationEmailAPIError = error
   }

   // TODO: Need to add return type
   @action.bound
   sendVerificationEmailAPI(
      request: SendVerificationEmailRequest,
      onSuccess: () => void,
      onFailure: () => void
   ) {
      const sendVerificationEmailPromise = this.authService.sendVerificationEmailAPI(
         request
      )
      return bindPromiseWithOnSuccess(sendVerificationEmailPromise)
         .to(this.setSendVerificationEmailAPIStatus, () => {
            onSuccess()
         })
         .catch(error => {
            this.setSendVerificationEmailAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setRefreshAuthTokenAPIStatus(status: APIStatus): void {
      this.refreshAuthTokenAPIStatus = status
   }

   @action.bound
   setRefreshAuthTokenAPIError(error: any): void {
      this.refreshAuthTokenAPIError = error
      clearAllCookies()
   }

   @action.bound
   setRefreshAuthTokenAPIResponse(response: Tokens): void {
      this.setCookies(response)
      this.authTokens.setAuthTokens(response)
   }

   refreshAuthTokensAPI(request: LoginWithCodeResponse) {
      const refreshAuthTokenAPIPromise = this.authService.refreshAuthTokensAPI(
         request
      )
      return bindPromiseWithOnSuccess(refreshAuthTokenAPIPromise)
         .to(this.setRefreshAuthTokenAPIStatus, response => {
            this.setRefreshAuthTokenAPIResponse(response as Tokens)
         })
         .catch(error => {
            this.setRefreshAuthTokenAPIError(error)
         })
   }

   @action.bound
   clearStore(): void {
      this.initAuthStore()
   }
}

export default AuthStore
