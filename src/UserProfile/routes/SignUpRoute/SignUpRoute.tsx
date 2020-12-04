import React, { Component, ReactElement } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { computed } from 'mobx'
import { History } from 'history'

import { showFailureBottomCenterToast } from '../../../Common/utils/ToastUtils'
import { getAPIErrorMessage } from '../../../Common/utils/APIUtils'

import AuthStore from '../../stores/AuthStore'
import SignUp from '../../components/SignUp'
import {
   goToLoginPage,
   goToVerificationMailSentPage
} from '../../utils/NavigationUtils'

interface SignUpRouteProps extends RouteComponentProps {
   // TODO: Need to fix issue with react router dom types
   history: History
}

interface InjectedProps extends SignUpRouteProps {
   authStore: AuthStore
}

@inject('authStore')
@observer
class SignUpRoute extends Component<SignUpRouteProps> {
   @computed
   get injectedProps(): InjectedProps {
      return this.props as InjectedProps
   }

   @computed
   get authStore(): AuthStore {
      const { authStore } = this.injectedProps
      return authStore
   }

   navigateToLoginPage = (): void => {
      const { history } = this.props
      goToLoginPage(history)
   }

   onSuccessSignUpAPI = (email: string): void => {
      const { history } = this.props
      goToVerificationMailSentPage(history, email)
   }

   createUserAccount = (
      fullName: string,
      email: string,
      password: string,
      onSignUpAPIFailure: (error: any) => void
   ): void => {
      const request = {
         full_name: fullName.trim(),
         email: email.trim(),
         password
      }
      const { signUpAPI } = this.authStore
      signUpAPI(
         request,
         () => this.onSuccessSignUpAPI(email),
         onSignUpAPIFailure
      )
   }

   render(): ReactElement {
      const { signUpAPIStatus } = this.authStore
      return (
         <SignUp
            onClickLoginButton={this.navigateToLoginPage}
            onSubmitSignUpForm={this.createUserAccount}
            signUpAPIStatus={signUpAPIStatus}
         />
      )
   }
}

export default withRouter(SignUpRoute)
