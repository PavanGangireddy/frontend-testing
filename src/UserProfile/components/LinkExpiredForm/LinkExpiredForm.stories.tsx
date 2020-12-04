import React from 'react'
import { storiesOf } from '@storybook/react'

import LinkExpiredForm from '.'

storiesOf('Forms/LinkExpiredForm', module).add(
   'ForgotPasswordForm Component',
   () => (
      <LinkExpiredForm
         sendEmailAPI={() => {}}
         sendEmailAPIStatus={200}
         onSuccessSendEmailAPI={() => alert('mail send')}
         onClickReturnToLogin={() => alert('navigate to login')}
      />
   )
)
