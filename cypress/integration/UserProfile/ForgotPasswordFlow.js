import {
   login,
   forgotPassword,
   USER_EMAIL,
   PASSWORD
} from '../../constants/UserProfile/UserProfile'
import {
   goToLoginPage,
   clickUsingDataTestID,
   initCypress,
   setViewPortSize,
   checkCurrentRoute,
   typeUsingDataTestID
} from '../../reusableActions/Common'
import {
   stubSendEmail,
   stubUpdatePassword,
   stubUpdatePasswordLinkExpired
} from '../../stubs/ForgotPassword'
import {
   FORGOT_PASSWORD_SCREEN_PATH,
   RESET_PASSWORD_SCREEN_PATH,
   RANDOM_TOKEN,
   LOGIN_SCREEN_PATH,
   LINK_EXPIRED_SCREEN_PATH
} from '../../constants/RouteConstants/RouteConstants'

describe('Forgot Password', () => {
   beforeEach(() => {
      setViewPortSize(1600, 1020)
      cy.server()
      initCypress()
      goToLoginPage()
      clickUsingDataTestID(login.forgotPasswordButton)
      checkCurrentRoute(FORGOT_PASSWORD_SCREEN_PATH)
   })

   it('should send email after entering correct email', () => {
      typeUsingDataTestID(forgotPassword.forgotPasswordEmail, USER_EMAIL)
      stubSendEmail()
      clickUsingDataTestID(forgotPassword.sendEmailButton)
      cy.visit(`${RESET_PASSWORD_SCREEN_PATH}?token=${RANDOM_TOKEN}`)
      typeUsingDataTestID(forgotPassword.passwordInput, PASSWORD)
      typeUsingDataTestID(forgotPassword.confirmPasswordInput, PASSWORD)
      stubUpdatePassword()
      clickUsingDataTestID(forgotPassword.updatePasswordButton)
   })

   it('should redirect to login screen when we click return to login in Forgot password screen', () => {
      clickUsingDataTestID(forgotPassword.redirectToLoginButton)
      checkCurrentRoute(LOGIN_SCREEN_PATH)
   })

   it('should redirect to login screen when we click return to login in Reset Password screen', () => {
      typeUsingDataTestID(forgotPassword.forgotPasswordEmail, USER_EMAIL)
      stubSendEmail()
      clickUsingDataTestID(forgotPassword.sendEmailButton)
      cy.visit(`${RESET_PASSWORD_SCREEN_PATH}?token=${RANDOM_TOKEN}`)
      clickUsingDataTestID(forgotPassword.redirectToLoginButton)
      checkCurrentRoute(LOGIN_SCREEN_PATH)
   })

   it('should redirect to link expired screen when link expires', () => {
      typeUsingDataTestID(forgotPassword.forgotPasswordEmail, USER_EMAIL)
      stubSendEmail()
      clickUsingDataTestID(forgotPassword.sendEmailButton)
      cy.visit(`${RESET_PASSWORD_SCREEN_PATH}?token=${RANDOM_TOKEN}`)
      typeUsingDataTestID(forgotPassword.passwordInput, PASSWORD)
      typeUsingDataTestID(forgotPassword.confirmPasswordInput, PASSWORD)
      stubUpdatePasswordLinkExpired()
      clickUsingDataTestID(forgotPassword.updatePasswordButton)
      checkCurrentRoute(LINK_EXPIRED_SCREEN_PATH)
      clickUsingDataTestID(forgotPassword.redirectToLoginButton)
      checkCurrentRoute(LOGIN_SCREEN_PATH)
   })
})
