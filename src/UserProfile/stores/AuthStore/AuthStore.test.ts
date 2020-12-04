import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'
import Cookie from 'js-cookie'

import AuthService from '../../services/AuthService/index.fixture'
import verifyLoginResponse from '../../fixtures/AuthFixtures/verifyLoginResponse.json'
import verifyPasswordUpdation from '../../fixtures/AuthFixtures/verifyPasswordUpdation.json'

import AuthStore from '.'

const loginRequestObject = {
   email: 'test-email',
   password: 'test-password'
}

const sendEmailRequestObject = {
   email: 'test-email'
}

const updatePasswordRequestObject = {
   updated_password: 'updatedPassword',
   updated_confirm_password: 'updatedConfirmPassword'
}

const token = '5j4-1c4331b5a09b09fcd11d'
const signUpRequestObject = {
   full_name: 'John Doe',
   email: 'johndoe@gmail.com',
   password: 'John@123'
}

const sendVerificationEmailRequestObject = {
   email: 'johndoe@gmail.com'
}

const refreshTokenRequest = {
   access_token: 'accessToken',
   refresh_token: 'refreshToken'
}

describe.skip('AuthStore test cases', () => {
   let authService
   let authStore
   let onSuccess
   let onFailure

   beforeEach(() => {
      authService = new AuthService()
      authStore = new AuthStore(authService)
      onSuccess = jest.fn()
      onFailure = jest.fn()
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test whether  authStore is initialize or not', () => {
      expect(authStore.verifyLoginAPIStatus).toBe(API_INITIAL)
      expect(authStore.verifyLoginAPIError).toEqual({})

      expect(authStore.logoutAPIStatus).toBe(API_INITIAL)
      expect(authStore.sendEmailAPIError).toEqual({})

      expect(authStore.updatePasswordAPIStatus).toBe(API_INITIAL)
      expect(authStore.updatePasswordAPIError).toEqual({})

      expect(authStore.sendEmailAPIStatus).toBe(API_INITIAL)
      expect(authStore.logoutAPIError).toEqual({})

      expect(authStore.signUpAPIStatus).toBe(API_INITIAL)
      expect(authStore.signUpAPIError).toStrictEqual({})

      expect(authStore.sendVerificationEmailAPIStatus).toBe(API_INITIAL)
      expect(authStore.sendVerificationEmailAPIError).toStrictEqual({})

      expect(authStore.refreshAuthTokenAPIStatus).toBe(API_INITIAL)
      expect(authStore.refreshAuthTokenAPIError).toStrictEqual({})
   })

   it('should test user verify login data  fetching state', () => {
      const mockLoadingPromise = new Promise((resolve, reject): object => ({}))
      const mockVerifyLogInService = jest.fn()
      mockVerifyLogInService.mockReturnValue(mockLoadingPromise)
      authService.verifyLoginAPI = mockVerifyLogInService

      authStore.verifyLoginAPI(loginRequestObject, onSuccess, onFailure)
      expect(authStore.verifyLoginAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test user verify login data  success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(verifyLoginResponse)
      })

      const mockSetCookie = jest.fn()
      Cookie.set = mockSetCookie

      const expires = { expires: 30, path: '/' }

      const mockVerifyLogInService = jest.fn()
      mockVerifyLogInService.mockReturnValue(mockSuccessPromise)
      authService.verifyLoginAPI = mockVerifyLogInService

      await authStore.verifyLoginAPI(loginRequestObject, onSuccess, onFailure)

      expect(authStore.verifyLoginAPIStatus).toBe(API_SUCCESS)
      expect(mockSetCookie).toBeCalledWith(
         'bss_at',
         verifyLoginResponse.access_token,
         expires
      )
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test user verify login data  failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })

      const mockVerifyLogInService = jest.fn()
      mockVerifyLogInService.mockReturnValue(mockFailurePromise)
      authService.verifyLoginAPI = mockVerifyLogInService

      await authStore.verifyLoginAPI(loginRequestObject, onSuccess, onFailure)

      expect(authStore.verifyLoginAPIStatus).toBe(API_FAILED)
      expect(authStore.verifyLoginAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(onFailure).toBeCalled()
      expect(onSuccess).not.toBeCalled()
   })

   it('should test send email loading state', () => {
      const mockLoadingPromise = new Promise((resolve, reject) => ({}))
      const mockSendEmailService = jest.fn()
      mockSendEmailService.mockReturnValue(mockLoadingPromise)
      authService.sendEmailAPI = mockSendEmailService

      authStore.sendEmailAPI(sendEmailRequestObject, onSuccess, onFailure)
      expect(authStore.sendEmailAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test send email success state', async () => {
      const mockSuccessPromise = new Promise((resolve, reject) => resolve())
      const mockSendEmailService = jest.fn()
      mockSendEmailService.mockReturnValue(mockSuccessPromise)
      authService.sendEmailAPI = mockSendEmailService

      await authStore.sendEmailAPI(sendEmailRequestObject, onSuccess, onFailure)
      expect(authStore.sendEmailAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })
   it('should test send email failure state', async () => {
      const mockFailurePromise = new Promise((resolve, reject) => reject({}))
      const mockSendEmailService = jest.fn()
      mockSendEmailService.mockReturnValue(mockFailurePromise)
      authService.sendEmailAPI = mockSendEmailService

      await authStore.sendEmailAPI(sendEmailRequestObject, onSuccess, onFailure)
      expect(authStore.sendEmailAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test update password loading state', () => {
      const mockLoadingPromise = new Promise((resolve, reject) => ({}))
      const mockUpdatePasswordService = jest.fn()
      mockUpdatePasswordService.mockReturnValue(mockLoadingPromise)
      authService.updatePasswordAPI = mockUpdatePasswordService

      authStore.updatePasswordAPI(
         updatePasswordRequestObject,
         token,
         onSuccess,
         onFailure
      )
      expect(authStore.updatePasswordAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test update password success state', async () => {
      const mockLoadingPromise = new Promise((resolve, reject) =>
         resolve(verifyPasswordUpdation)
      )
      const mockUpdatePasswordService = jest.fn()
      mockUpdatePasswordService.mockReturnValue(mockLoadingPromise)
      authService.updatePasswordAPI = mockUpdatePasswordService

      await authStore.updatePasswordAPI(
         updatePasswordRequestObject,
         token,
         onSuccess,
         onFailure
      )
      expect(authStore.updatePasswordAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test update password failure state', async () => {
      const mockLoadingPromise = new Promise((resolve, reject) => reject({}))
      const mockUpdatePasswordService = jest.fn()
      mockUpdatePasswordService.mockReturnValue(mockLoadingPromise)
      authService.updatePasswordAPI = mockUpdatePasswordService

      await authStore.updatePasswordAPI(
         updatePasswordRequestObject,
         token,
         onSuccess,
         onFailure
      )
      expect(authStore.updatePasswordAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test SignUpAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      authService.signUpAPI = jest.fn(() => mockLoadingPromise)

      const mockFailureFunction = jest.fn()
      const mockSuccessFunction = jest.fn()

      authStore.signUpAPI(
         signUpRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(authStore.signUpAPIStatus).toBe(API_FETCHING)
   })

   it('should test SignUpAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      authService.signUpAPI = jest.fn(() => mockFailurePromise)

      const mockFailureFunction = jest.fn()
      const mockSuccessFunction = jest.fn()

      await authStore.signUpAPI(
         signUpRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(authStore.signUpAPIStatus).toBe(API_FAILED)
      expect(authStore.signUpAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockFailureFunction).toBeCalled()
   })

   it('should test SignUpAPI success state', async () => {
      const mockFailureFunction = jest.fn()
      const mockSuccessFunction = jest.fn()

      await authStore.signUpAPI(
         signUpRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(authStore.signUpAPIStatus).toBe(API_SUCCESS)
      expect(mockSuccessFunction).toBeCalled()
   })

   it('should test SendVerificationAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      authService.sendVerificationEmailAPI = jest.fn(() => mockLoadingPromise)

      const mockFailureFunction = jest.fn()
      const mockSuccessFunction = jest.fn()

      authStore.sendVerificationEmailAPI(
         sendVerificationEmailRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(authStore.sendVerificationEmailAPIStatus).toBe(API_FETCHING)
   })

   it('should test SendVerificationAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      authService.sendVerificationEmailAPI = jest.fn(() => mockFailurePromise)

      const mockFailureFunction = jest.fn()
      const mockSuccessFunction = jest.fn()

      await authStore.sendVerificationEmailAPI(
         sendVerificationEmailRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(authStore.sendVerificationEmailAPIStatus).toBe(API_FAILED)
      expect(authStore.sendVerificationEmailAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockFailureFunction).toBeCalled()
   })

   it('should test SendVerificationAPI success state', async () => {
      const mockFailureFunction = jest.fn()
      const mockSuccessFunction = jest.fn()

      await authStore.sendVerificationEmailAPI(
         sendVerificationEmailRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(authStore.sendVerificationEmailAPIStatus).toBe(API_SUCCESS)
      expect(mockSuccessFunction).toBeCalled()
   })

   it('should test user refresh token api data  fetching state', () => {
      const mockLoadingPromise = new Promise((resolve, reject): object => ({}))
      const mockVerifyLogInService = jest.fn()
      mockVerifyLogInService.mockReturnValue(mockLoadingPromise)
      authService.refreshAuthTokensAPI = mockVerifyLogInService

      authStore.refreshAuthTokensAPI(refreshTokenRequest)
      expect(authStore.refreshAuthTokenAPIStatus).toBe(API_FETCHING)
   })

   it('should test user refresh token api data  success state', async () => {
      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(verifyLoginResponse)
      })

      const mockSetCookie = jest.fn()
      Cookie.set = mockSetCookie

      const mockVerifyLogInService = jest.fn()
      mockVerifyLogInService.mockReturnValue(mockSuccessPromise)
      authService.refreshAuthTokensAPI = mockVerifyLogInService

      await authStore.refreshAuthTokensAPI(refreshTokenRequest)

      expect(authStore.refreshAuthTokenAPIStatus).toBe(API_SUCCESS)
   })

   it('should test user verify login data  failure state', async () => {
      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })

      const mockVerifyLogInService = jest.fn()
      mockVerifyLogInService.mockReturnValue(mockFailurePromise)
      authService.refreshAuthTokensAPI = mockVerifyLogInService

      await authStore.refreshAuthTokensAPI(refreshTokenRequest)

      expect(authStore.refreshAuthTokenAPIStatus).toBe(API_FAILED)
      expect(authStore.refreshAuthTokenAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })
})
