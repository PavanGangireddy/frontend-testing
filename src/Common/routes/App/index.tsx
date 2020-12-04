import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import { Provider, observer } from 'mobx-react'
import {
   I18nextProvider,
   //eslint-disable-next-line
   WithTranslation,
   withTranslation
   //eslint-disable-next-line
} from 'react-i18next'
import { observable } from 'mobx'

import {
   initializeSentry,
   captureSentryException
} from '../../utils/SentryUtils'
import i18n from '../../i18n'
import stores from '../../stores'
import FailureView from '../../components/LoadingWrapper/FailureView'

import ChromeBanner from '../../components/ChromeBanner'

import Routes from '../index'

import { CrashViewContainer } from './styledComponents'

initializeSentry()

// FIXME: need to uncomment when we use ib user accounts
// initializeAuthSdk(stores.authStore, stores.userStore)

interface Props extends WithTranslation {
   children?: any
}
@observer
class App extends Component<Props> {
   @observable error
   constructor(props) {
      super(props)
      this.error = null
   }

   componentDidCatch(error, errorInfo) {
      this.setError(error)
      captureSentryException(error, errorInfo)
   }

   setError = (error): void => {
      this.error = error
   }

   onClickRetry = (): void => {
      window.history.back()
      setTimeout(() => {
         window.location.reload()
      }, 500)
   }

   render(): React.ReactNode {
      const { t } = this.props
      if (this.error) {
         return (
            <CrashViewContainer>
               <FailureView
                  failureText={t('common.fallbackUI.failureText')}
                  onRetry={this.onClickRetry}
               />
            </CrashViewContainer>
         )
      }
      return (
         <Provider {...stores}>
            <I18nextProvider i18n={i18n}>
               <ChromeBanner />
               <Routes />
               <ToastContainer
                  position='top-right'
                  autoClose={1000}
                  hideProgressBar={true}
                  newestOnTop={true}
                  closeOnClick
                  rtl={false}
                  draggable
                  pauseOnHover
               />
            </I18nextProvider>
         </Provider>
      )
   }
}

export default withTranslation()(App)
