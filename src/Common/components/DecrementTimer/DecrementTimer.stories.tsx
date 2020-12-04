import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import tw, { css } from 'twin.macro'

import DecrementTimer from '.'

storiesOf('Miscellaneous/DecrementTimer', module).add(
   'DecrementTimer Component',
   () => (
      <DecrementTimer
         onComplete={action('onComplete')}
         onTimeUpdate={action('onTimeUpdateTriggered')}
         timeInSeconds={3700}
         containerCss={css`
            ${tw`text-red-500`}
         `}
      />
   )
)
