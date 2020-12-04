import { observable, action } from 'mobx'

import { Tokens } from '../../types'

class AuthTokens {
   @observable accessToken!: string
   @observable refreshToken!: string
   @observable expireInSeconds!: number

   constructor() {
      this.initAuthTokens()
   }

   @action.bound
   initAuthTokens(): void {
      this.accessToken = ''
      this.refreshToken = ''
      // TODO:- need to verify with brother whether initilising expire as 0 is correct or not
      this.expireInSeconds = 0
   }

   @action.bound
   setAuthTokens(authTokens: Tokens): void {
      const {
         access_token: accessToken,
         refresh_token: refreshToken,
         expire_in_seconds: expireInSeconds
      } = authTokens
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this.expireInSeconds = expireInSeconds
   }

   @action.bound
   setAccessToken(accessToken: string): void {
      this.accessToken = accessToken
   }
}

export default AuthTokens
