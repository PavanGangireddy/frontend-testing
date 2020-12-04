import {
   login,
   USER_EMAIL,
   PASSWORD
} from '../../constants/UserProfile/UserProfile'
import {
   typeUsingDataTestID,
   goToLoginPage,
   clickUsingDataTestID,
   initCypress,
   setViewPortSize,
   checkCurrentRoute
} from '../../reusableActions/Common'
import { stubGetAccessToken } from '../../stubs/Login'
import { HOME_SCREEN_PATH } from '../../constants/RouteConstants/RouteConstants'

describe('User Login', () => {
   beforeEach(() => {
      setViewPortSize(1600, 1020)
      cy.server()
      initCypress()
      goToLoginPage()
   })
   it('should visit home page after entering correct credentials', () => {
      typeUsingDataTestID(login.emailInput, USER_EMAIL)
      typeUsingDataTestID(login.passwordInput, PASSWORD)
      stubGetAccessToken()
      clickUsingDataTestID(login.submitButton)
      checkCurrentRoute(HOME_SCREEN_PATH)
   })
})
