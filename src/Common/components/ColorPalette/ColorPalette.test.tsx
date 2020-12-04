import React from 'react'
import { render } from '@testing-library/react'

import ColorPalette from '.'

describe('ColorPalette', () => {
   it('should test defaultColor', () => {
      const onChangeSelectedColor = jest.fn()
      const { getByTestId } = render(
         <ColorPalette onChangeSelectedColor={onChangeSelectedColor} />
      )
      getByTestId('selected-color') //TODO:need do cssStyles testcases
   })
})
