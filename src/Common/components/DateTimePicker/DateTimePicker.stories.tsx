import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import DateTimePicker from '.'

const validate = () => ({
   shouldShowError: true,
   errorMessage: '123'
})

storiesOf('Date time Picker', module).add(
   'ui date time picker component',
   () => (
      <DateTimePicker
         validate={validate}
         date={''}
         isValid={true}
         onChangeDateTime={action('date selected')}
      />
   )
)
