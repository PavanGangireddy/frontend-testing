import React from 'react'
import { storiesOf } from '@storybook/react'

import LoginForm from '.'

storiesOf('Forms/LoginForm', module).add('LoginForm Component', () => (
   <LoginForm
      verifyLoginAPIStatus={200}
      onSuccessVerifyLoginAPI={(): any => {
         alert('login clicked')
      }}
      onClickForgotPassword={(): void =>
         alert('Navigate to forgot passed screen')
      }
      goToSendVerificationMailPage={(): void => {}}
      goToSignUpPage={(): void => {}}
      verifyLoginAPI={() => {}}
   />
))
