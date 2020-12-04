import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import PriorityGroup from '.'

describe('PriorityGroup tests', () => {
   it('should test if onClick fires an callback', () => {
      const onClickPriorityText = jest.fn()
      const priorityList = [
         { label: '1', value: '1' },
         { label: '2', value: '2' },
         { label: '3', value: '3' },
         { label: '4', value: '4' },
         { label: '5', value: '5' }
      ]
      const { getByText } = render(
         <PriorityGroup
            priorityList={priorityList}
            onClickPriorityText={onClickPriorityText}
         />
      )
      fireEvent.click(getByText('1'))
      expect(onClickPriorityText).toHaveBeenCalledWith('1')
   })
})
