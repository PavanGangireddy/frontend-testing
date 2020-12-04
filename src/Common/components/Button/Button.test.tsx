import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Button from '.'

describe('Button', () => {
   it('should test if the function passed is called on click', () => {
      const onPressMockFunction = jest.fn()
      const { getByText } = render(
         <Button
            variant={Button.variants.primary}
            onClick={onPressMockFunction}
         >
            Login
         </Button>
      )
      fireEvent.click(getByText('Login'))
      expect(onPressMockFunction).toBeCalled()
   })
})
