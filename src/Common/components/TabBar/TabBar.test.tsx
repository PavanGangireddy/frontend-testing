import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import TabBar from '.'

describe('TabBar tests', () => {
   it('should test if onClick tab function fires a callback', () => {
      const onClickTab = jest.fn()
      const { getByTestId } = render(
         <TabBar
            tabsList={[
               { label: 'Comments', value: 'COMMENTS' },
               { label: 'History', value: 'HISTORY' }
            ]}
            onClickTab={onClickTab}
         />
      )
      fireEvent.click(getByTestId('HISTORY'))
      expect(onClickTab).toHaveBeenCalledWith('HISTORY')
   })
})
