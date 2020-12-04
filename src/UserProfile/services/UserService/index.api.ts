import { create } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import Config from '../../../Common/constants/EnvironmentConstants'

import { UsersGroupsResponse } from '../../stores/types'

import endpoints from '../endpoints'

import UserService from '.'

const BASE_URL = `${Config.BSS_BASE_URL}bss_auth/`

class UserAPI implements UserService {
   api: Record<string, any>
   networkCallWithAPISauce: Function

   constructor(networkCallWithAPISauce: Function) {
      this.api = create({
         baseURL: BASE_URL
      })
      this.networkCallWithAPISauce = networkCallWithAPISauce
   }

   logoutAPI() {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.logout,
         {},
         apiMethods.post
      )
   }

   getuserProfileAPI() {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.userProfile,
         {},
         apiMethods.get
      )
   }

   userMailVerificationAPI(): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.verifyUserEmail,
         {},
         apiMethods.post
      )
   }

   getUsersGroupsAPI(): Promise<UsersGroupsResponse> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.userGroups}`,
         {},
         apiMethods.get
      )
   }
}

export default UserAPI
