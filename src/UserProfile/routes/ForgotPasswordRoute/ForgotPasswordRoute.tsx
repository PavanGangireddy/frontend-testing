import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { History } from 'history'
import { withTranslation } from 'react-i18next'

import { showSuccessBottomCenterToast } from '../../../Common/utils/ToastUtils'

import { goToLoginPage } from '../../utils/NavigationUtils'
import AuthStore from '../../stores/AuthStore'
import ForgotPasswordForm from '../../components/ForgotPasswordForm'

//FIXME: need to fix the WithTransalation in i18n-next , so instead of that we use WithTransalationProps here

interface WithTranslationProps {
   i18n: any
   tReady: boolean
   t: any
}

interface Props extends WithTranslationProps {
   authStore: AuthStore
   history: History
}

interface InjectedProps extends Props {
   authStore: AuthStore
}

//TODO: need to write test cases for Route

@inject('authStore')
@observer
class ForgotPasswordRoute extends Component<Props> {
   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getAuthStore = () => {
      const { authStore } = this.getInjectedProps()
      return authStore
   }

   onSuccessSendEmailAPI = (): void => {
      //TODO: need to verify the content of the message with content Team
      const { t } = this.props
      const message = t('userProfile:forgotPasswordForm.emailSentSuccessfully')
      showSuccessBottomCenterToast(message)
   }

   onClickReturnToLogin = (): void => {
      const { history } = this.props
      goToLoginPage(history)
   }

   render(): React.ReactNode {
      const { sendEmailAPI, sendEmailAPIStatus } = this.getAuthStore()
      return (
         <ForgotPasswordForm
            sendEmailAPI={sendEmailAPI}
            sendEmailAPIStatus={sendEmailAPIStatus}
            onSuccessSendEmailAPI={this.onSuccessSendEmailAPI}
            onClickReturnToLogin={this.onClickReturnToLogin}
         />
      )
   }
}

export default withTranslation('translation', { withRef: true })(
   ForgotPasswordRoute
)
