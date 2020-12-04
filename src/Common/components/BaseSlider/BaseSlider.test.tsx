import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import BaseSlider from '.'

const options = [1, 2, 3, 4]

describe('BaseSlider', () => {
   it('should call before change function on click next and previous index on click prev ', () => {
      const beforeChange = jest.fn()
      const { getByTestId } = render(
         <BaseSlider beforeChange={beforeChange}>
            {options.map(option => (
               <h1 key={option}>{option}</h1>
            ))}
         </BaseSlider>
      )
      const prevArrow = getByTestId('prevArrow')
      const nextArrow = getByTestId('nextArrow')
      fireEvent.click(nextArrow)
      expect(beforeChange).toBeCalled()
      fireEvent.click(prevArrow)
      expect(beforeChange).toBeCalled()
   })
})
