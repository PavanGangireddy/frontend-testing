const endpoints = {
   logout: 'user/logout/v1/',
   // TODO: need to update this end point
   // login: 'login_with_code/v1/',
   login: 'user/login/v1/',
   forgotPassword: 'user/send/reset_password_link/v1/',
   updatePassword: 'user/reset_password/v1/',
   userProfile: 'user/profile/v1/',
   signUp: 'user/signup/v1/',
   sendVerificationEmail: 'user/send/verify_email_link/v1/',
   verifyUserEmail: 'user/verify_email/v1/',
   userGroups: 'get/groups/v1/',
   refreshAuthToken: 'refresh_auth_tokens/v1/',
   loginWithUserToken: 'login_with_user_token/v1/'
}

export default endpoints
