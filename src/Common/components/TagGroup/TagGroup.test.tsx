import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import TagGroup from '.'

describe('TagGroup tests', () => {
   it('should test if onClick functions fires callback', () => {
      const onClickAdd = jest.fn()
      const onClickClose = jest.fn()
      const onClickTag = jest.fn()
      const tagsList = [
         { label: 'Value1', value: 'VALUE1' },
         { label: 'Value2', value: 'VALUE2' },
         { label: 'Value3', value: 'VALUE3' },
         { label: 'Value4', value: 'VALUE4' },
         { label: 'Value5', value: 'VALUE5' },
         { label: 'Value6', value: 'VALUE6' },
         { label: 'Value7', value: 'VALUE7' },
         { label: 'Value8', value: 'VALUE8' },
         { label: 'Value9', value: 'VALUE9' }
      ]

      const { getByText, getByTestId } = render(
         <TagGroup
            tagsList={tagsList}
            onClickAdd={onClickAdd}
            onClickClose={onClickClose}
            onClickTag={onClickTag}
         />
      )

      fireEvent.click(getByText('Value1'))
      expect(onClickTag).toHaveBeenCalledWith('VALUE1')
      fireEvent.click(getByTestId('closeIcon-Value1'))
      expect(onClickClose).toHaveBeenCalledWith('VALUE1')
      fireEvent.click(getByTestId('addButton'))
      expect(onClickAdd).toHaveBeenCalled()
   })
})
