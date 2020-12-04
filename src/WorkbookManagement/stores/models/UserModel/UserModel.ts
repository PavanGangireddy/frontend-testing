import { User } from '../../types'

class UserModel {
   profilePic: string
   userName: string
   permissionLevel: string
   email: string

   constructor(userDetails: User) {
      const {
         profile_pic_url: profilePic,
         name: userName,
         role: permissionLevel,
         email
      } = userDetails
      this.profilePic = profilePic
      this.userName = userName
      this.permissionLevel = permissionLevel
      this.email = email
   }
}

export default UserModel
