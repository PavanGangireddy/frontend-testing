import React from 'react'
import { storiesOf } from '@storybook/react'

import SignUp from './SignUp'

storiesOf('SignUp', module).add('SignUp Form Component', () => (
   <SignUp
      onClickLoginButton={(): void => {}}
      onSubmitSignUpForm={(): void => {}}
      signUpAPIStatus={200}
   />
))
