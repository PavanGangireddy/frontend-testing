import React from 'react'
import { render } from '@testing-library/react'
import { API_FETCHING, API_FAILED, API_SUCCESS } from '@ib/api-constants'

import StarredFoldersAndPinnedWorkbooks from '.'

describe('StarredFoldersAndPinnedWorkbooks', () => {
   let doNetworkCallForStarredFoldersAndPinnedWorkbooks
   let onDoubleClickWorkbook
   let onClickFolderMenuItem
   let onClickWorkbookMenuItem
   let onDoubleClickFolder
   beforeEach(() => {
      doNetworkCallForStarredFoldersAndPinnedWorkbooks = jest.fn()
      onDoubleClickWorkbook = jest.fn()
      onClickFolderMenuItem = jest.fn()
      onClickWorkbookMenuItem = jest.fn()
      onDoubleClickFolder = jest.fn()
   })
   it('should StarredFoldersAndPinnedWorkbooks fetching state', () => {
      const { getByTestId } = render(
         <StarredFoldersAndPinnedWorkbooks
            getPinnedWorkbooksAndStarredFoldersAPIStatus={API_FETCHING}
            getPinnedWorkbooksAndStarredFoldersAPIError={null}
            doNetworkCallForStarredFoldersAndPinnedWorkbooks={
               doNetworkCallForStarredFoldersAndPinnedWorkbooks
            }
            pinnedWorkbooks={[]}
            starredFolders={[]}
            onDoubleClickWorkbook={onDoubleClickWorkbook}
            onDoubleClickFolder={onDoubleClickFolder}
            onClickFolderMenuItem={onClickFolderMenuItem}
            onClickWorkbookMenuItem={onClickWorkbookMenuItem}
         />
      )
      getByTestId(/loader/)
   })

   it('should StarredFoldersAndPinnedWorkbooks failure state', () => {
      const { getByTestId } = render(
         <StarredFoldersAndPinnedWorkbooks
            getPinnedWorkbooksAndStarredFoldersAPIStatus={API_FAILED}
            getPinnedWorkbooksAndStarredFoldersAPIError={'error'}
            doNetworkCallForStarredFoldersAndPinnedWorkbooks={
               doNetworkCallForStarredFoldersAndPinnedWorkbooks
            }
            pinnedWorkbooks={[]}
            starredFolders={[]}
            onDoubleClickWorkbook={onDoubleClickWorkbook}
            onDoubleClickFolder={onDoubleClickFolder}
            onClickFolderMenuItem={onClickFolderMenuItem}
            onClickWorkbookMenuItem={onClickWorkbookMenuItem}
         />
      )
      getByTestId(/retryButton/)
   })

   it('should StarredFoldersAndPinnedWorkbooks success state', () => {
      const { getByText } = render(
         <StarredFoldersAndPinnedWorkbooks
            getPinnedWorkbooksAndStarredFoldersAPIStatus={API_SUCCESS}
            getPinnedWorkbooksAndStarredFoldersAPIError={null}
            doNetworkCallForStarredFoldersAndPinnedWorkbooks={
               doNetworkCallForStarredFoldersAndPinnedWorkbooks
            }
            pinnedWorkbooks={[
               {
                  id: '0',
                  name: 'Workbook 1',
                  isPublishedByUs: true
               }
            ]}
            starredFolders={[]}
            onDoubleClickWorkbook={onDoubleClickWorkbook}
            onDoubleClickFolder={onDoubleClickFolder}
            onClickFolderMenuItem={onClickFolderMenuItem}
            onClickWorkbookMenuItem={onClickWorkbookMenuItem}
         />
      )
      getByText(/Workbook 1/)
   })

   it('should not show StarredFoldersAndPinnedWorkbooks section', () => {
      const { queryByTestId } = render(
         <StarredFoldersAndPinnedWorkbooks
            getPinnedWorkbooksAndStarredFoldersAPIStatus={API_SUCCESS}
            getPinnedWorkbooksAndStarredFoldersAPIError={null}
            doNetworkCallForStarredFoldersAndPinnedWorkbooks={
               doNetworkCallForStarredFoldersAndPinnedWorkbooks
            }
            pinnedWorkbooks={[]}
            starredFolders={[]}
            onDoubleClickWorkbook={onDoubleClickWorkbook}
            onDoubleClickFolder={onDoubleClickFolder}
            onClickFolderMenuItem={onClickFolderMenuItem}
            onClickWorkbookMenuItem={onClickWorkbookMenuItem}
         />
      )
      expect(queryByTestId(/starredFoldersSection/)).toBeNull()
      expect(queryByTestId(/pinnedWorkbooksSection/)).toBeNull()
   })
})
