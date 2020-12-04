import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import SelectField from '.'

describe('SelectField component', () => {
   const callback = jest.fn()
   it('should render the SelectField UI component', () => {
      const { getByText, getByTestId, container } = render(
         <SelectField
            options={[
               { value: 'chocolate', label: 'Chocolate' },
               { value: 'strawberry', label: 'Strawberry' },
               { value: 'vanilla', label: 'Vanilla' }
            ]}
            defaultValue={{ value: 'chocolate', label: 'Chocolate' }}
            data-testid={'select'}
            onChange={callback}
         />
      )
      fireEvent.focus(container.querySelector('input'))
      fireEvent.keyDown(container.querySelector('input'), {
         key: 'ArrowDown',
         code: 40
      })
      fireEvent.click(getByText('Strawberry'))
      expect(callback).toBeCalled()
      expect(callback).toHaveBeenCalledWith(
         {
            value: 'strawberry',
            label: 'Strawberry'
         },
         { action: 'select-option', name: undefined, option: undefined }
      )
   })
})
