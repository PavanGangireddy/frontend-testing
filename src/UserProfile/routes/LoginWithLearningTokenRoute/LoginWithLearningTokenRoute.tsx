import { parse } from 'querystring'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'
import { History } from 'history'
import { observable } from 'mobx'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import { replaceWithHomePage } from '../../../Common/utils/NavigationUtils'
import { WithTranslation } from '../../../Common/types'

import { USER_TOKEN, NAME } from '../../constants/AuthenticationConstants'
import AuthStore from '../../stores/AuthStore'

interface LoginWithLearningTokenRouteProps extends WithTranslation {
   history: History
   location: {
      search: string
   }
}

interface InjectedProps extends LoginWithLearningTokenRouteProps {
   authStore: AuthStore
}

@inject('authStore')
@observer
class LoginWithLearningTokenRoute extends Component<
   LoginWithLearningTokenRouteProps
> {
   @observable userToken!: string
   @observable userName!: string

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getAuthStore = (): AuthStore => {
      const { authStore } = this.getInjectedProps()
      return authStore
   }

   componentDidMount() {
      const {
         location: { search }
      } = this.props
      const queryParams = parse(search)
      // FIXME: need to check queryParams
      this.userToken = queryParams[`?${USER_TOKEN}`] as string
      this.userName = queryParams[`${NAME}`] as string
      // TODO: need to update the code when we go ith alpha or beta

      // this.doNetworkCallForVerifyLogin()
   }

   onSuccessVerifyLoginAPI = (): void => {
      const { history } = this.props
      replaceWithHomePage(history)
   }

   getRequestObject = () => {
      const { userToken, userName } = this
      return {
         userToken,
         userName
      }
   }

   // TODO: need to update the code when we go ith alpha or beta
   // doNetworkCallForVerifyLogin = () => {
   //    const { verifyLoginAPI } = this.getAuthStore()
   //    const {
   //       userToken,
   //       userName,
   //       getRequestObject,
   //       onSuccessVerifyLoginAPI
   //    } = this
   //    if (userToken && userName)
   //    verifyLoginAPI(getRequestObject(), onSuccessVerifyLoginAPI)
   // }

   render() {
      const { verifyLoginAPIStatus, verifyLoginAPIError } = this.getAuthStore()
      return (
         <LoadingWrapper
            apiStatus={verifyLoginAPIStatus}
            apiError={verifyLoginAPIError}
            // TODO: need to update the code when we go ith alpha or beta
            onRetry={() => {}}
            renderSuccessUI={() => null}
         />
      )
   }
}

export default withTranslation()(LoginWithLearningTokenRoute)
