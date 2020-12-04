import {
   SendEmailAPIRequest,
   UpdatePasswordAPIRequest,
   SignUpRequest,
   SendVerificationEmailRequest,
   LoginWithCodeResponse
} from '../../stores/types'

interface AuthService {
   // TODO: need to update the code hen e go ith alpha or beta
   // verifyLoginAPI: (
   //    userToken: string,
   //    name: string
   // ) => Promise<LoginWithCodeResponse>

   verifyLoginAPI: (requestObject: any) => Promise<LoginWithCodeResponse>

   sendEmailAPI: (requestObject: SendEmailAPIRequest) => Promise<{}>

   updatePasswordAPI: (
      token: string,
      requestObject: UpdatePasswordAPIRequest
   ) => Promise<{}>

   signUpAPI: (request: SignUpRequest) => Promise<{}>

   sendVerificationEmailAPI: (
      request: SendVerificationEmailRequest
   ) => Promise<{}>

   refreshAuthTokensAPI: (
      request: LoginWithCodeResponse
   ) => Promise<LoginWithCodeResponse>
}

export default AuthService
