export interface VerifyLoginAPIRequest {
   email: string
   password: string
}

export interface SendEmailAPIRequest {
   email: string
}

export interface Tokens {
   access_token: string
   refresh_token: string
   expire_in_seconds: number
}

export interface UpdatePasswordAPIRequest {
   new_password: string
   confirm_password: string
}

export interface SignUpRequest {
   full_name: string
   email: string
   password: string
}

export interface SendVerificationEmailRequest {
   email: string
}

export interface UserProfileAPIResponse {
   name: string
   role: string
   is_first_time: boolean
}

export interface UsersGroup {
   group_id: string
   name: string
}

export interface UsersGroupsResponse {
   groups: Array<UsersGroup>
}

export interface LoginWithCodeResponse {
   access_token: string
   refresh_token: string
}

export interface LoginWithLearningTokenRequest {
   userToken: string
   userName: string
}
