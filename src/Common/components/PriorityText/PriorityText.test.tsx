import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import PriorityText from '.'

describe('PriorityText tests', () => {
   it('should test the content is being displayed', () => {
      const { getByText } = render(<PriorityText priorityContent={1} />)
      expect(getByText('1')).toBeDefined()
   })
   it('should test if onClickPriority fires a callback', () => {
      const onClickPriority = jest.fn()
      const { getByText } = render(
         <PriorityText priorityContent={1} onClickPriority={onClickPriority} />
      )
      fireEvent.click(getByText('1'))
      expect(onClickPriority).toHaveBeenCalled()
   })
})
