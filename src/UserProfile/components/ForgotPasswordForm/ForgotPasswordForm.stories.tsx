import React from 'react'
import { storiesOf } from '@storybook/react'

import ForgotPasswordForm from '.'

storiesOf(
   'Forms/ForgotPasswordForm',
   module
).add('ForgotPasswordForm Component', () => (
   <ForgotPasswordForm
      sendEmailAPI={() => {}}
      sendEmailAPIStatus={200}
      onSuccessSendEmailAPI={() => alert('mail send')}
      onClickReturnToLogin={() => alert('return to login')}
   />
))
