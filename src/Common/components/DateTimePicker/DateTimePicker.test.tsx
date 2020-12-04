import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import DatePicker from '.'

describe('DatePicker component test cases', () => {
   it.skip('should call callback on select date', () => {
      const onChangeDateTime = jest.fn()
      const { getByPlaceholderText } = render(
         <DatePicker
            date={new Date(2015, 4, 5, 10, 20)}
            isValid={true}
            onChangeDateTime={onChangeDateTime}
         />
      )
      const datePicker = getByPlaceholderText('Select Date & Time')

      fireEvent.change(datePicker, { target: { value: '2015-05-05' } })
      expect(onChangeDateTime).toHaveBeenCalled()
   })
})
