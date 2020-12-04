import React from 'react'
import { render } from '@testing-library/react'

import StarredFolders from '.'

describe.skip('StarredFolders component test cases', () => {
   let onDoubleClickFolder
   let onClickFolderMenuItem
   beforeEach(() => {
      onDoubleClickFolder = jest.fn()
      onClickFolderMenuItem = jest.fn()
   })
   it('should show StarredFolders Section', () => {
      const { getByTestId } = render(
         <StarredFolders
            starredFolders={[
               {
                  id: '0',
                  name: 'Folder 1',
                  isPublishedByUs: true
               }
            ]}
            onDoubleClickFolder={onDoubleClickFolder}
            onClickFolderMenuItem={onClickFolderMenuItem}
         />
      )

      getByTestId(/starredFoldersSection/)
   })

   it('should show not StarredFolders Section when there is no starred folders', () => {
      const { queryByTestId } = render(
         <StarredFolders
            starredFolders={[]}
            onDoubleClickFolder={onDoubleClickFolder}
            onClickFolderMenuItem={onClickFolderMenuItem}
         />
      )
      expect(queryByTestId('starredFoldersSection')).toBeNull()
   })
})
