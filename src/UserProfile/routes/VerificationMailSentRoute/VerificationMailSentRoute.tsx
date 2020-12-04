import React, { Component, ReactElement } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { computed } from 'mobx'
import { History } from 'history'

import AuthStore from '../../stores/AuthStore'
import VerificationMailSent from '../../components/VerificationMailSent'

interface VerificationMailSentRouteProps extends RouteComponentProps {
   // TODO: Need to fix issue with react router dom types
   history: History
   location: { state: { email: string } }
}

interface InjectedProps extends VerificationMailSentRouteProps {
   authStore: AuthStore
}

@inject('authStore')
@observer
class VerificationMailSentRoute extends Component<
   VerificationMailSentRouteProps
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

   get email(): string {
      const {
         location: { state }
      } = this.props
      if (state) {
         return state.email
      }
      return ''
   }

   render(): ReactElement {
      const {
         sendVerificationEmailAPI,
         sendVerificationEmailAPIStatus
      } = this.authStore
      return (
         <VerificationMailSent
            sendVerificationEmailAPI={sendVerificationEmailAPI}
            sendVerificationEmailAPIStatus={sendVerificationEmailAPIStatus}
            email={this.email}
         />
      )
   }
}

export default withRouter(VerificationMailSentRoute)
