import React from 'react'
import { storiesOf } from '@storybook/react'

import ProgressBarComponent from '.'

storiesOf('ProgressBar', module)
   .add('UI ProgressBarComponent on shouldShowHint false', () => (
      <ProgressBarComponent percentage={70} shouldShowProgessHint={false} />
   ))
   .add('UI ProgressBarComponent on shouldShowHint true', () => (
      <ProgressBarComponent percentage={70} shouldShowProgessHint={true} />
   ))
