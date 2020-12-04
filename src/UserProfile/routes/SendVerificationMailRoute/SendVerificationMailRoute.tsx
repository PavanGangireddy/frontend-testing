import React, { Component, ReactElement } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { computed } from 'mobx'
import { History } from 'history'

import AuthStore from '../../stores/AuthStore'
import {
   goToVerificationMailSentPage,
   goToLoginPage
} from '../../utils/NavigationUtils'
import VerifyEmailForm from '../../components/VerifyEmailForm'

import { SendVerificationMailRouteErrorObject } from '../types'

interface SendVerificationMailRouteProps extends RouteComponentProps {
   // TODO: Need to fix issue with react router dom types
   history: History
   location: { state: { error: SendVerificationMailRouteErrorObject } }
}

interface InjectedProps extends SendVerificationMailRouteProps {
   authStore: AuthStore
}

@inject('authStore')
@observer
class SendVerificationMailRoute extends Component<
   SendVerificationMailRouteProps
> {
   @computed
   get injectedProps(): InjectedProps {
      return this.props as InjectedProps
   }

   @computed
   get authStore(): AuthStore {
      const { authStore } = this.injectedProps
      return authStore
   }

   goToVerificationMailSent = (email: string): void => {
      const { history } = this.props
      goToVerificationMailSentPage(history, email)
   }

   goToLoginPage = (): void => {
      const { history } = this.props
      goToLoginPage(history)
   }

   get error(): SendVerificationMailRouteErrorObject | null {
      const {
         location: { state }
      } = this.props
      if (state) {
         return state.error
      }
      return null
   }

   render(): ReactElement {
      const {
         sendVerificationEmailAPI,
         sendVerificationEmailAPIStatus,
         sendVerificationEmailAPIError
      } = this.authStore
      return (
         <VerifyEmailForm
            goToLoginPage={this.goToLoginPage}
            goToVerificationMailSentPage={this.goToVerificationMailSent}
            sendVerificationMailAPI={sendVerificationEmailAPI}
            sendVerificationMailAPIStatus={sendVerificationEmailAPIStatus}
            sendVerificationMailAPIError={sendVerificationEmailAPIError}
            error={this.error}
         />
      )
   }
}

export default withRouter(SendVerificationMailRoute)
