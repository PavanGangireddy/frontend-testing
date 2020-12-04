import React from 'react'
import { storiesOf } from '@storybook/react'

import VerificationMailSent from './VerificationMailSent'

storiesOf('SignUp', module).add('VerificationMailSent Component', () => (
   <VerificationMailSent
      sendVerificationEmailAPI={(): Promise<{}> => Promise.resolve({})}
      sendVerificationEmailAPIStatus={200}
      email='example@email.com'
   />
))
