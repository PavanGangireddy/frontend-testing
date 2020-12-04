import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { History } from 'history'
import { withTranslation } from 'react-i18next'

import { replaceWithHomePage } from '../../../Common/utils/NavigationUtils'

import {
   goToForgotPasswordPage,
   goToSendVerificationMailPage,
   goToSignUpPage
} from '../../utils/NavigationUtils'
import AuthStore from '../../stores/AuthStore'
import LoginForm from '../../components/LoginForm'

interface Props {
   history: History
   // TODO: Need to fix issue with i8next
   i18n: any
   tReady: boolean
   t: any
}

interface InjectedProps extends Props {
   authStore: AuthStore
}

@inject('authStore')
@observer
class LoginPage extends Component<Props> {
   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getAuthStore = (): AuthStore => {
      const { authStore } = this.getInjectedProps()
      return authStore
   }

   onSuccessVerifyLoginAPI = (): void => {
      const { history } = this.props
      //TODO: need to implement further
      replaceWithHomePage(history)
   }

   onClickForgotPassword = (): void => {
      const { history } = this.props
      goToForgotPasswordPage(history)
   }

   goToSendVerificationMailPage = (errorMessage: string): void => {
      const { history, t } = this.props
      const error = {
         title: t('userProfile:loginForm.emailNotVerified'),
         label: errorMessage
      }
      goToSendVerificationMailPage(history, error)
   }

   goToSignUpPage = (): void => {
      const { history } = this.props
      goToSignUpPage(history)
   }

   render(): React.ReactNode {
      const { verifyLoginAPIStatus, verifyLoginAPI } = this.getAuthStore()
      return (
         <LoginForm
            verifyLoginAPIStatus={verifyLoginAPIStatus}
            onSuccessVerifyLoginAPI={this.onSuccessVerifyLoginAPI}
            onClickForgotPassword={this.onClickForgotPassword}
            goToSendVerificationMailPage={this.goToSendVerificationMailPage}
            goToSignUpPage={this.goToSignUpPage}
            verifyLoginAPI={verifyLoginAPI}
         />
      )
   }
}

export default withTranslation()(LoginPage)
