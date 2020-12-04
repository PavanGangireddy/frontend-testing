import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Tag from '.'

describe('Tag tests', () => {
   it('should test if onClick function fires a callback', () => {
      const onClickTagName = jest.fn()
      const onClickClose = jest.fn()
      const { getByText, getByTestId } = render(
         <Tag
            tagName={'Value'}
            onClickTagName={onClickTagName}
            onClickClose={onClickClose}
         />
      )

      fireEvent.click(getByText('Value'))
      expect(onClickTagName).toHaveBeenCalled()
      fireEvent.click(getByTestId('closeIcon-Value'))
      expect(onClickClose).toHaveBeenCalled()
   })
})
