import { observable, action } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'

import { bindPromiseWithOnSuccess } from '../../../Common/utils/MobxPromise'

import UserService from '../../services/UserService'
import { clearUserSession } from '../../utils/StorageUtils'

import { UserProfileAPIResponse, UsersGroupsResponse } from '../types'

import UsersGroupModel from '../models/UsersGroupModel'

import UserDetails from './models/UserDetails'

class UserStore {
   @observable logoutAPIStatus!: APIStatus
   @observable logoutAPIError: any
   @observable userProfileAPIStatus!: APIStatus
   @observable userProfileAPIError!: any
   @observable userDetails!: UserDetails | any
   @observable userMailVerificationAPIStatus!: APIStatus
   // TODO: Need to add type
   @observable userMailVerificationAPIError!: any

   @observable getUsersGroupAPIError!: any
   @observable getUsersGroupAPIStatus!: APIStatus

   @observable userGroups!: Map<string, UsersGroupModel>

   userService: UserService
   clearAllStores!: Function

   constructor(userService) {
      this.userService = userService
      this.userGroups = new Map()
      this.initUserStore()
   }

   setClearAllStoresFunction(clearAllStores: Function): void {
      this.clearAllStores = clearAllStores
   }

   @action.bound
   initUserStore(): void {
      this.initAPIStatusAndErrors()
      this.userDetails = {}
   }

   @action.bound
   initAPIStatusAndErrors(): void {
      this.logoutAPIStatus = API_INITIAL
      this.logoutAPIError = {}
      this.userProfileAPIStatus = API_INITIAL
      this.userProfileAPIError = {}
      this.userMailVerificationAPIStatus = API_INITIAL
      this.userMailVerificationAPIError = {}
      this.getUsersGroupAPIStatus = API_INITIAL
      this.getUsersGroupAPIError = {}
   }

   @action.bound
   setLogoutAPIStatus(status: APIStatus): void {
      this.logoutAPIStatus = status
   }

   @action.bound
   setLogoutAPIError(error: any): void {
      this.logoutAPIError = error
   }

   @action.bound
   logoutAPI(): Promise<any> {
      return Promise.resolve(() => {
         clearUserSession()
         this.clearAllStores()
      })
   }

   @action.bound
   setUserProfileAPIStatus(status: APIStatus): void {
      this.userProfileAPIStatus = status
   }

   @action.bound
   setUserProfileAPIError(error: any): void {
      this.userProfileAPIError = error
   }

   @action.bound
   setUserProfileAPIResponse(response: UserProfileAPIResponse | null): void {
      if (response) {
         this.userDetails = new UserDetails(response)
      }
   }

   @action.bound
   getuserProfileAPI(): Promise<void | {}> {
      const getuserProfilePromise = this.userService.getuserProfileAPI()
      return bindPromiseWithOnSuccess(getuserProfilePromise)
         .to(this.setUserProfileAPIStatus, this.setUserProfileAPIResponse)
         .catch(this.setUserProfileAPIError)
   }

   @action.bound
   setUserMailVerificationAPIStatus(status: APIStatus): void {
      this.userMailVerificationAPIStatus = status
   }

   // TODO: Need to add type
   @action.bound
   setUserMailVerificationAPIError(error: any): void {
      this.userMailVerificationAPIError = error
   }

   @action.bound
   userMailVerificationAPI(
      onSuccess: () => void,
      onFailure: () => void
   ): Promise<{} | void> {
      const userMailVerificationPromise = this.userService.userMailVerificationAPI()
      return bindPromiseWithOnSuccess(userMailVerificationPromise)
         .to(this.setUserMailVerificationAPIStatus, () => {
            onSuccess()
         })
         .catch(error => {
            this.setUserMailVerificationAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setGetUsersGroupAPIStatus(status: APIStatus): void {
      this.getUsersGroupAPIStatus = status
   }

   @action.bound
   setGetUsersGroupAPIResponse(userGroups: UsersGroupsResponse | null): void {
      if (userGroups) {
         const { groups } = userGroups
         groups.forEach(eachGroup => {
            const { group_id: groupId } = eachGroup
            this.userGroups.set(groupId, new UsersGroupModel(eachGroup))
         })
      }
   }

   // TODO: Need to update type
   @action.bound
   setGetUsersGroupAPIError(error: any): void {
      this.getUsersGroupAPIError = error
   }

   @action.bound
   getUsersGroupsAPI(onSuccess: () => void, onFailure: (error: any) => void) {
      const getUsersGroupsPromise = this.userService.getUsersGroupsAPI()
      return bindPromiseWithOnSuccess(getUsersGroupsPromise)
         .to(this.setGetUsersGroupAPIStatus, response => {
            this.setGetUsersGroupAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setGetUsersGroupAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   clearStore(): void {
      this.initUserStore()
   }
}

export default UserStore
