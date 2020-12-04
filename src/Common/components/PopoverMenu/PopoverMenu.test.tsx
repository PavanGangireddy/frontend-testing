import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import PopoverMenu from '.'

describe('PopoverMenu', () => {
   it('should test if the popover content is rendered on click on trigger', () => {
      const { getByText, getByTestId } = render(
         <PopoverMenu
            renderPopoverTrigger={
               <span style={{ color: 'black' }}>Click Me</span>
            }
            renderPopoverContent={
               <span data-testid='targetText' style={{ color: 'black' }}>
                  Hello world
               </span>
            }
         />
      )
      fireEvent.click(getByText('Click Me'))
      expect(getByTestId(/targetText/i).textContent).toBe('Hello world')
   })
})
