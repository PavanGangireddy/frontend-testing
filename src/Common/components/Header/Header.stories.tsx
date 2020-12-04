import React from 'react'
import { storiesOf } from '@storybook/react'

import AuthFixture from '../../../UserProfile/services/AuthService/index.fixture'
import AuthStore from '../../../UserProfile/stores/AuthStore'

import Header from '.'

const authStore = new AuthStore(new AuthFixture())

const navButtons = () => <button type='button'>Add Resource</button>
storiesOf('Miscellaneous', module)
   .add('Header Component with home button', () => (
      <Header shouldShowHome authStore={authStore} />
   ))
   .add('Header Component with out home button', () => (
      <Header shouldShowHome={false} authStore={authStore} />
   ))
   .add('Header Component with renderNavButtons', () => (
      <Header
         shouldShowHome
         renderNavButtons={navButtons}
         authStore={authStore}
      />
   ))
