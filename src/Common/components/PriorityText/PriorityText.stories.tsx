import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number, boolean } from '@storybook/addon-knobs'

import PriorityText from '.'

storiesOf('Labels and Badges/PriorityText', module)
   .addDecorator(withKnobs)
   .add('with priority content 1', () => (
      <PriorityText priorityContent={number('priorityNumber', 1)} />
   ))
   .add('with priority content 1 and isSelected true', () => (
      <PriorityText
         priorityContent={number('priorityNumber', 1)}
         isSelected={boolean('isSelected', true)}
      />
   ))
