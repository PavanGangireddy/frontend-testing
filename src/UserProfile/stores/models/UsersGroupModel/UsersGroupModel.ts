import { UsersGroup } from '../../types'

class UsersGroupModel {
   groupId
   groupName

   constructor(usersGroupDetails: UsersGroup) {
      const { group_id: groupId, name: groupName } = usersGroupDetails
      this.groupId = groupId
      this.groupName = groupName
   }
}

export default UsersGroupModel
