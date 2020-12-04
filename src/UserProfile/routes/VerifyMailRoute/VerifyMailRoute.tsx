import React, { Component, ReactElement } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { computed } from 'mobx'
import { History } from 'history'
import { parse } from 'query-string'
import { withTranslation } from 'react-i18next'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import { showSuccessBottomCenterToast } from '../../../Common/utils/ToastUtils'

import AuthStore from '../../stores/AuthStore'
import UserStore from '../../stores/UserStore'
import { setAccessToken, clearUserSession } from '../../utils/StorageUtils'
import VerifyEmailSuccessForm from '../../components/VerifyEmailSuccessForm'
import { EMAIL_ALREADY_VERIFIED } from '../../constants/ResContants'
import {
   goToLoginPage,
   goToSendVerificationMailPage
} from '../../utils/NavigationUtils'

interface VerifyEmailRouteProps extends RouteComponentProps {
   // TODO: Need to fix issue with react router dom types
   history: History
   location: { search: string }
   // TODO: Need to fix issue with i8next
   i18n: any
   tReady: boolean
   t: any
}

interface InjectedProps extends VerifyEmailRouteProps {
   authStore: AuthStore
   userStore: UserStore
}

@inject('authStore', 'userStore')
@observer
class VerifyEmailRoute extends Component<VerifyEmailRouteProps> {
   componentDidMount(): void {
      const {
         location: { search }
      } = this.props
      const queryParams = parse(search)
      const accessToken = queryParams.access_token as string
      setAccessToken(accessToken)
      this.verifyUserMail()
   }

   @computed
   get injectedProps(): InjectedProps {
      return this.props as InjectedProps
   }

   @computed
   get authStore(): AuthStore {
      const { authStore } = this.injectedProps
      return authStore
   }

   @computed
   get userStore(): UserStore {
      const { userStore } = this.injectedProps
      return userStore
   }

   onSuccessUserMailVerification = (): void => {
      clearUserSession()
   }

   onFailureUserMailVerification = (): void => {
      const { history, t } = this.props
      const { userMailVerificationAPIError } = this.userStore
      try {
         const {
            data: { res_status: resStatus }
         } = JSON.parse(userMailVerificationAPIError)
         if (resStatus === EMAIL_ALREADY_VERIFIED) {
            clearUserSession()
            this.goToLoginPage()
            const { t } = this.props
            showSuccessBottomCenterToast(t('userProfile:emailAlreadyVerified'))
         }
      } catch (apiError) {
         const error = {
            title: t('userProfile:linkExpiredForm.linkExpired'),
            label: t(
               `userProfile:linkExpiredForm.pleaseEnterYourEmailAddressBelowToReceiveAPasswordResetLinkAgain`
            )
         }
         clearUserSession()
         goToSendVerificationMailPage(history, error)
      }
   }

   verifyUserMail = (): void => {
      const { userMailVerificationAPI } = this.userStore
      userMailVerificationAPI(
         this.onSuccessUserMailVerification,
         this.onFailureUserMailVerification
      )
   }

   goToLoginPage = (): void => {
      const { history } = this.props
      goToLoginPage(history)
   }

   renderSuccessUI = observer(() => (
      <VerifyEmailSuccessForm goToLoginPage={this.goToLoginPage} />
   ))

   render(): ReactElement {
      const {
         userMailVerificationAPIStatus,
         userMailVerificationAPIError
      } = this.userStore
      return (
         <LoadingWrapper
            apiStatus={userMailVerificationAPIStatus}
            apiError={userMailVerificationAPIError}
            renderSuccessUI={this.renderSuccessUI}
         />
      )
   }
}

export default withTranslation()(withRouter(VerifyEmailRoute))
