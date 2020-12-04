import verifyLoginResponse from '../../../fixtures/AuthFixtures/verifyLoginResponse.json'

import AuthTokens from '.'

describe('AuthTokens model test cases', () => {
   const authTokensModel = new AuthTokens()

   it('should test for setAccessToken settter function', () => {
      authTokensModel.setAccessToken(verifyLoginResponse.access_token)
      expect(authTokensModel.accessToken).toBe(verifyLoginResponse.access_token)
   })
})
