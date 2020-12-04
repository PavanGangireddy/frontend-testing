import {
   login,
   signUp,
   USER_FULL_NAME,
   USER_EMAIL,
   PASSWORD
} from '../../constants/UserProfile/UserProfile'
import {
   typeUsingDataTestID,
   goToLoginPage,
   clickUsingDataTestID,
   initCypress,
   setViewPortSize,
   checkCurrentRoute,
   getUsingDataTestID
} from '../../reusableActions/Common'
import {
   stubSignUpUser,
   stubResendVerifyEmail,
   stubSuccessVerifyEmail
} from '../../stubs/SignUp'
import {
   SIGN_UP_PATH,
   VERIFICATION_MAIL_SENT_PATH,
   LOGIN_SCREEN_PATH,
   VERIFY_MAIL_PATH
} from '../../constants/RouteConstants/RouteConstants'

describe('Sign Up', () => {
   beforeEach(() => {
      setViewPortSize(1600, 1020)
      cy.server()
      initCypress()
      goToLoginPage()
      clickUsingDataTestID(login.signUpButton)
      checkCurrentRoute(SIGN_UP_PATH)
   })

   it('should return to login page when we click on login button', () => {
      clickUsingDataTestID(signUp.redirectToLoginButton)
      checkCurrentRoute(LOGIN_SCREEN_PATH)
      getUsingDataTestID(login.submitButton)
   })

   it('should signup after entering new user correct credentials', () => {
      typeUsingDataTestID(signUp.fullName, USER_FULL_NAME)
      typeUsingDataTestID(signUp.signUpEmail, USER_EMAIL)
      typeUsingDataTestID(signUp.passwordInput, PASSWORD)
      typeUsingDataTestID(signUp.confirmPasswordInput, PASSWORD)
      stubSignUpUser()
      clickUsingDataTestID(signUp.createAccountButton)
      checkCurrentRoute(VERIFICATION_MAIL_SENT_PATH)
      stubResendVerifyEmail()
      clickUsingDataTestID(signUp.resendLinkButton)
      stubSuccessVerifyEmail()
      cy.visit(VERIFY_MAIL_PATH)
      checkCurrentRoute(VERIFY_MAIL_PATH)
      clickUsingDataTestID(signUp.redirectToLoginButton)
      checkCurrentRoute(LOGIN_SCREEN_PATH)
   })
})
