import { parse } from 'querystring'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import { History } from 'history'
import { withTranslation } from 'react-i18next'

import {
   showSuccessBottomCenterToast,
   showFailureBottomCenterToast
} from '../../../Common/utils/ToastUtils'

import { displayApiError } from '../../../Common/utils/APIUtils'

import {
   goToLinkExpiredScreen,
   goToLoginPage
} from '../../utils/NavigationUtils'

import AuthStore from '../../stores/AuthStore'
import ResetPasswordForm from '../../components/ResetPasswordForm'

//FIXME: need to fix the WithTransalation in i18n-next , so instead of that we use WithTransalationProps here

interface WithTranslationProps {
   i18n: any
   tReady: boolean
   t: any
}

interface Props extends WithTranslationProps {
   authStore: AuthStore
   history: History

   location: {
      search: string
   }
}

interface InjectedProps extends Props {
   authStore: AuthStore
}

//TODO: need to write test cases for Route

@inject('authStore')
@observer
class ResetPasswordRoute extends Component<Props> {
   @observable token!: string

   componentDidMount() {
      const {
         location: { search }
      } = this.props
      const queryParams = parse(search)
      this.token = queryParams['?token'] as string
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getAuthStore = () => {
      const { authStore } = this.getInjectedProps()
      return authStore
   }

   onSuccessUpdatePasswordAPI = (): void => {
      const { t, history } = this.props
      const message = t(
         'userProfile:resetPasswordForm.passwordSuccessfullyUpdated'
      )
      showSuccessBottomCenterToast(message)
      goToLoginPage(history)
   }

   onFailureUpdatePasswordAPI = (error: any) => {
      const { description, errorCode } = displayApiError(error)
      const { history } = this.props
      showFailureBottomCenterToast(description)
      if (errorCode === 419) goToLinkExpiredScreen(history)
   }

   onClickReturnToLogin = (): void => {
      const { history } = this.props
      goToLoginPage(history)
   }

   render(): React.ReactNode {
      const { updatePasswordAPI, updatePasswordAPIStatus } = this.getAuthStore()
      return (
         <ResetPasswordForm
            updatePasswordAPI={updatePasswordAPI}
            updatePasswordAPIStatus={updatePasswordAPIStatus}
            onSuccessUpdatePasswordAPI={this.onSuccessUpdatePasswordAPI}
            onFailureUpdatePasswordAPI={this.onFailureUpdatePasswordAPI}
            onClickReturnToLogin={this.onClickReturnToLogin}
            token={this.token}
         />
      )
   }
}

export default withTranslation('translation', { withRef: true })(
   ResetPasswordRoute
)
