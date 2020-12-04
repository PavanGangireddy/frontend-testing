import { History } from 'history'

import {
   LOGIN_SCREEN_PATH,
   FORGOT_PASSWORD_SCREEN_PATH,
   VERIFICATION_MAIL_SENT_PATH,
   SEND_VERIFICATION_MAIL_PATH,
   SIGN_UP_PATH,
   LINK_EXPIRED_SCREEN_PATH
} from '../../constants/NavigationConstants'
import { SendVerificationMailRouteErrorObject } from '../../routes/types'

export function goToLoginPage(history: History): void {
   history.replace(LOGIN_SCREEN_PATH)
}

export function goToSignUpPage(history: History): void {
   history.replace(SIGN_UP_PATH)
}

export function goToForgotPasswordPage(history: History): void {
   history.push(FORGOT_PASSWORD_SCREEN_PATH)
}

export function goToVerificationMailSentPage(
   history: History,
   email: string
): void {
   history.push({
      pathname: VERIFICATION_MAIL_SENT_PATH,
      state: { email }
   })
}

export function goToSendVerificationMailPage(
   history: History,
   error: SendVerificationMailRouteErrorObject | null
): void {
   history.push({ pathname: SEND_VERIFICATION_MAIL_PATH, state: { error } })
}

export function goToLinkExpiredScreen(history: History): void {
   history.replace(LINK_EXPIRED_SCREEN_PATH)
}
