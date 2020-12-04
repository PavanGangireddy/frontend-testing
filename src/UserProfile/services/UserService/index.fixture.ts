import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import userProfile from '../../fixtures/AuthFixtures/userProfile.json'
import getUsersGroupsResponse from '../../fixtures/getUsersGroupsResponse.json'
import { UserProfileAPIResponse, UsersGroupsResponse } from '../../stores/types'

import UserService from '.'

class UserFixture implements UserService {
   logoutAPI() {
      return resolveWithTimeout({})
   }

   getuserProfileAPI(): Promise<UserProfileAPIResponse> {
      return resolveWithTimeout(userProfile)
   }

   userMailVerificationAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   getUsersGroupsAPI(): Promise<UsersGroupsResponse> {
      return resolveWithTimeout(getUsersGroupsResponse)
   }
}

export default UserFixture
