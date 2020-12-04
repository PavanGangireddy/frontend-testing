import React from 'react'
import { render } from '@testing-library/react'

import WorkbookGridItem from '.'

describe('WorkbookGridItem', () => {
   let onDoubleClickWorkbook

   beforeEach(() => {
      const onDoubleClickWorkbook = jest.fn()
   })

   it('should test name of the workbook', () => {
      const { getAllByText, getByText } = render(
         <WorkbookGridItem
            id='0'
            name='project'
            currentRoute={'home'}
            isPinned={false}
            onDoubleClickWorkbook={onDoubleClickWorkbook}
            isPublishedByUs={false}
         />
      )
      getByText(/project/)
   })

   it('should test if we  pass isPinned as false', () => {
      const { getByTestId } = render(
         <WorkbookGridItem
            id='0'
            name='project'
            currentRoute={'home'}
            isPinned={false}
            onDoubleClickWorkbook={onDoubleClickWorkbook}
            isPublishedByUs={false}
         />
      )
      getByTestId('workbookIcon')
   })

   it('should test if we  pass isPinned as true', () => {
      const { getByTestId } = render(
         <WorkbookGridItem
            id='0'
            name='project'
            currentRoute={'home'}
            isPinned={true}
            onDoubleClickWorkbook={onDoubleClickWorkbook}
            isPublishedByUs={false}
         />
      )
      getByTestId('pinnedWorkbookIcon')
   })

   //TODO:nedd to test the on hover test cases
})
