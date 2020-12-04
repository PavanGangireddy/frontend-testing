import {
   API_INITIAL,
   API_FAILED,
   API_SUCCESS,
   API_FETCHING
} from '@ib/api-constants'

import UserService from '../../services/UserService/index.fixture'
import getUserGroups from '../../fixtures/getUsersGroupsResponse.json'

import UserStore from './UserStore'

describe('UserStore test cases', () => {
   let userService
   let userStore: UserStore
   let onSuccess
   let onFailure

   beforeEach(() => {
      userService = new UserService()
      userStore = new UserStore(userService)
      onSuccess = jest.fn()
      onFailure = jest.fn()
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test UserVerificationAPI initial state', () => {
      expect(userStore.userMailVerificationAPIStatus).toBe(API_INITIAL)
      expect(userStore.userMailVerificationAPIError).toStrictEqual({})
   })

   it('should test UserVerificationAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      userService.userMailVerificationAPI = jest.fn(() => mockLoadingPromise)

      const mockFailureFunction = jest.fn()
      const mockSuccessFunction = jest.fn()

      userStore.userMailVerificationAPI(
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(userStore.userMailVerificationAPIStatus).toBe(API_FETCHING)
   })

   it('should test UserVerificationAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      userService.userMailVerificationAPI = jest.fn(() => mockFailurePromise)

      const mockFailureFunction = jest.fn()
      const mockSuccessFunction = jest.fn()

      await userStore.userMailVerificationAPI(
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(userStore.userMailVerificationAPIStatus).toBe(API_FAILED)
      expect(userStore.userMailVerificationAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockFailureFunction).toBeCalled()
   })

   it('should test UserVerificationAPI success state', async () => {
      const mockFailureFunction = jest.fn()
      const mockSuccessFunction = jest.fn()

      await userStore.userMailVerificationAPI(
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(userStore.userMailVerificationAPIStatus).toBe(API_SUCCESS)
      expect(mockSuccessFunction).toBeCalled()
   })

   it('should test UserProfileAPI initial state', () => {
      expect(userStore.userProfileAPIStatus).toBe(API_INITIAL)
      expect(userStore.userProfileAPIError).toStrictEqual({})
   })

   it('should test UserProfileAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      userService.getuserProfileAPI = jest.fn(() => mockLoadingPromise)

      userStore.getuserProfileAPI()

      expect(userStore.userProfileAPIStatus).toBe(API_FETCHING)
   })

   it('should test UserProfileAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      userService.getuserProfileAPI = jest.fn(() => mockFailurePromise)

      await userStore.getuserProfileAPI()

      expect(userStore.userProfileAPIStatus).toBe(API_FAILED)
      expect(userStore.userProfileAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test UserProfileAPI success state', async () => {
      await userStore.getuserProfileAPI()

      expect(userStore.userProfileAPIStatus).toBe(API_SUCCESS)
   })

   it('should test UserVerificationAPI initial state', () => {
      expect(userStore.getUsersGroupAPIStatus).toBe(API_INITIAL)
      expect(userStore.getUsersGroupAPIError).toEqual({})
   })

   it('should test get Users Groups loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      userService.getUsersGroupsAPI = jest.fn(() => mockLoadingPromise)

      userStore.getUsersGroupsAPI(onSuccess, onFailure)

      expect(userStore.getUsersGroupAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test get Users Groups Success state', async () => {
      await userStore.getUsersGroupsAPI(onSuccess, onFailure)

      const { userGroups } = userStore
      const { groups } = getUserGroups
      const testGroup = userGroups.get(groups[0].group_id)

      expect(userStore.getUsersGroupAPIStatus).toBe(API_SUCCESS)
      expect(userGroups.size).toBe(groups.length)
      expect(testGroup?.groupName).toBe(groups[0].name)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test get Users Groups failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      userService.getUsersGroupsAPI = jest.fn(() => mockFailurePromise)

      await userStore.getUsersGroupsAPI(onSuccess, onFailure)

      expect(userStore.getUsersGroupAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
      expect(userStore.getUsersGroupAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })
})
