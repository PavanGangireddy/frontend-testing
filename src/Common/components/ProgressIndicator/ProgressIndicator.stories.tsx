import React from 'react'
import { storiesOf } from '@storybook/react'

import ProgressIndicator from '.'

storiesOf('ProgressIndicator', module).add('ProgressIndicator', () => (
   <ProgressIndicator securedScore={60} totalScore={120} />
))
