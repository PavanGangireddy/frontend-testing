import { UserProfileAPIResponse, UsersGroupsResponse } from '../../stores/types'

interface UserService {
   logoutAPI: () => Promise<{}>

   getuserProfileAPI: () => Promise<UserProfileAPIResponse>

   userMailVerificationAPI: () => Promise<{}>

   getUsersGroupsAPI: () => Promise<UsersGroupsResponse>
}

export default UserService
