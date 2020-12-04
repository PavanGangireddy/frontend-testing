import React from 'react'
import { storiesOf } from '@storybook/react'

import VerifyEmailSuccessForm from '.'

storiesOf(
   'Forms/VerifyEmailForm',
   module
).add('VerifyEmailSuccessForm Component', () => (
   <VerifyEmailSuccessForm goToLoginPage={(): void => {}} />
))
