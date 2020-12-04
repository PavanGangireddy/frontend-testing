import React from 'react'
import { storiesOf } from '@storybook/react'

import VerifyEmailForm from '.'

storiesOf(
   'Forms/VerifyEmailForm',
   module
).add('VerifyEmailLinkExpireForm Component', () => (
   <VerifyEmailForm
      goToLoginPage={(): void => {}}
      goToVerificationMailSentPage={(): void => {}}
      sendVerificationMailAPI={(): void => {}}
      sendVerificationMailAPIStatus={200}
      sendVerificationMailAPIError={null}
      error={null}
   />
))
