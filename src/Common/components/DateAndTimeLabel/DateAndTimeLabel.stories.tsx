import React from 'react'
import { storiesOf } from '@storybook/react'

import DateAndTimeLabel from '.'

storiesOf('DateAndTime', module).add('DateAndTimeFormatter', () => (
   <DateAndTimeLabel dateAndTime='2020-08-26T15:20:24.556550' />
))
