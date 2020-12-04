import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, object, text } from '@storybook/addon-knobs'
import tw, { css } from 'twin.macro'

import PriorityGroup from '.'

const priorityList = [
   { label: '1', value: '1' },
   { label: '2', value: '2' },
   { label: '3', value: '3' },
   { label: '4', value: '4' },
   { label: '5', value: '5' }
]

const containerCSS = css`
   ${tw`m-16px`}
`

storiesOf('Labels and Badges/PriorityGroup', module)
   .addDecorator(withKnobs)
   .add('withAllProps', () => (
      <PriorityGroup
         priorityList={object('priorityList', priorityList)}
         onClickPriorityText={action('clicked priority')}
         selectedValue={text('selectedValue', '5')}
         containerCSS={object('containerCSS', containerCSS)}
      />
   ))
