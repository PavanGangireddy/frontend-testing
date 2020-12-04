import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'

import PinnedWorkbooks from '.'

describe.skip('PinnedWorkbooks component test cases', () => {
   let onDoubleClickWorkbook: jest.Mock<any, any>
   let onClickWorkbookMenuItem: jest.Mock<any, any>
   const renderPinnedWorkbooks = (pinnedWorkbooks): ReactNode => (
      <PinnedWorkbooks
         pinnedWorkbooks={pinnedWorkbooks}
         onDoubleClickWorkbook={onDoubleClickWorkbook}
         onClickWorkbookMenuItem={onClickWorkbookMenuItem}
      />
   )

   beforeEach(() => {
      onDoubleClickWorkbook = jest.fn()
      onClickWorkbookMenuItem = jest.fn()
   })

   it('should show PinnedWorkbooks Section', () => {
      const pinnedWorkbooks = [
         {
            id: '0',
            name: 'Workbook 1'
         }
      ]
      const { getByTestId } = render(renderPinnedWorkbooks(pinnedWorkbooks))

      getByTestId(/pinnedWorkbooksSection/)
   })

   it('should show not PinnedWorkbooks Section when there is no starred folders', () => {
      const pinnedWorkbooks = []
      const { queryByTestId } = render(renderPinnedWorkbooks(pinnedWorkbooks))
      expect(queryByTestId('pinnedWorkbooksSection')).toBeNull()
   })
})
