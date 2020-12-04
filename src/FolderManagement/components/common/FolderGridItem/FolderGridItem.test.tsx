import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { NORMAL } from '../../../constants/UIConstants'

import FolderGridItem from './FolderGridItem'

describe('FolderGridItem component test cases', () => {
   let onDoubleClickFolder
   let onClickFolderMenuItem

   beforeEach(() => {
      onDoubleClickFolder = jest.fn()
      onClickFolderMenuItem = jest.fn()
   })

   it('should show given name', () => {
      const { getByText } = render(
         <FolderGridItem
            id={'1'}
            name={'Drilldown on corona'}
            isStarred={false}
            onDoubleClickFolder={onDoubleClickFolder}
            type={NORMAL}
            currentRoute={'home'}
            onClickFolderMenuItem={onClickFolderMenuItem}
            isPublishedByUs={true}
         />
      )

      getByText(/Drilldown on corona/)
   })

   it('should render starred folder icon', () => {
      const { getByTestId } = render(
         <FolderGridItem
            id={'1'}
            name={'Drilldown on corona'}
            isStarred={true}
            onDoubleClickFolder={onDoubleClickFolder}
            type={NORMAL}
            currentRoute={'home'}
            onClickFolderMenuItem={onClickFolderMenuItem}
            isPublishedByUs={false}
         />
      )

      getByTestId('starredFolderIcon')
   })

   it('should render normal folder icon', () => {
      const { getByTestId } = render(
         <FolderGridItem
            id={'1'}
            name={'Drilldown on corona'}
            isStarred={false}
            onDoubleClickFolder={onDoubleClickFolder}
            type={NORMAL}
            currentRoute={'home'}
            onClickFolderMenuItem={onClickFolderMenuItem}
            isPublishedByUs={false}
         />
      )
      getByTestId('folderIcon')
   })

   it('should test the onDoubleClick', () => {
      const { getByTestId } = render(
         <FolderGridItem
            id={'1'}
            name={'Drilldown on corona'}
            isStarred={false}
            onDoubleClickFolder={onDoubleClickFolder}
            testId={'folderGridItem'}
            type={NORMAL}
            currentRoute={'home'}
            onClickFolderMenuItem={onClickFolderMenuItem}
            isPublishedByUs={false}
         />
      )
      fireEvent.click(getByTestId(/folderGridItem/))
      expect(onDoubleClickFolder).toHaveBeenCalled()
   })

   it('should rename callBack function called when we click the rename', () => {
      const { getAllByTestId } = render(
         <FolderGridItem
            id={'1'}
            name={'Drilldown on corona'}
            isStarred={false}
            onDoubleClickFolder={onDoubleClickFolder}
            testId={'folderGridItem'}
            type={NORMAL}
            currentRoute={'home'}
            onClickFolderMenuItem={onClickFolderMenuItem}
            isPublishedByUs={false}
         />
      )
      const folderMenuItem = getAllByTestId('folderMenuItem')
      fireEvent.click(folderMenuItem[0])
      expect(onClickFolderMenuItem).toHaveBeenCalled()
   })
})
