import React from 'react'
import { storiesOf } from '@storybook/react'

import StatusLabel from '.'

storiesOf('Forms/Buttons', module)
   .add('Button/statusLabel/submitted', () => (
      <StatusLabel status='SUBMITTED' />
   ))
   .add('Button/statusLabel/yetToStart', () => (
      <StatusLabel status='YET_TO_START' />
   ))
   .add('Button/statusLabel/inProgress', () => (
      <StatusLabel status='IN_PROGRESS' />
   ))
