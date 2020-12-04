import React from 'react'
import { storiesOf } from '@storybook/react'

import AuthStore from '../../stores/AuthStore'
import AuthFixture from '../../services/AuthService/index.fixture'

import ResetPasswordForm from '.'

const authStore = new AuthStore(new AuthFixture())
storiesOf('Forms/ResetPasswordForm', module).add(
   'ResetPasswordForm Component',
   () => (
      <ResetPasswordForm
         updatePasswordAPI={() => {}}
         updatePasswordAPIStatus={200}
         onSuccessUpdatePasswordAPI={() => alert('mail send')}
         onFailureUpdatePasswordAPI={() => alert('mail send')}
         onClickReturnToLogin={() => alert('return to login')}
         token={'1234'}
      />
   )
)
