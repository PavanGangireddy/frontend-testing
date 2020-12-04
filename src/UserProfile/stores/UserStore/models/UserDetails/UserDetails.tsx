class UserDetails {
   name: string
   role: string
   isFirstTime: boolean

   constructor(userDetails) {
      const { name, role, is_first_time: isFirstTime } = userDetails
      this.name = name
      this.role = role
      this.isFirstTime = isFirstTime
   }
}

export default UserDetails
