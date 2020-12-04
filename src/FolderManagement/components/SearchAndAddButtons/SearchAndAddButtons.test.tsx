import React, { ReactNode } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { API_INITIAL } from '@ib/api-constants'

import SearchAndAddButtons from '.'

describe('SearchAndAddButtoncomponent test cases', () => {
   let onChangeText
   let createFolderAPI
   let createWorkbookAPI
   let getWorkbooksAndFoldersAPI
   let getSharedWorkbooksAndFoldersOfASubFolderAPI
   let getFolderIdOfAWorkbookAPI
   const renderSearchAndAddButton = (): ReactNode => (
      <SearchAndAddButtons
         onChangeText={onChangeText}
         optionsData={{}}
         createFolderAPI={createFolderAPI}
         createWorkbookAPI={createWorkbookAPI}
         createFolderOrWorkbookAPIStatus={API_INITIAL}
         createFolderOrWorkbookAPIError={API_INITIAL}
         rootFolderId={'0'}
         getWorkbooksAndFoldersAPIStatus={API_INITIAL}
         getRootFolderDetailsAPIStatus={API_INITIAL}
         getWorkbooksAndFoldersAPI={getWorkbooksAndFoldersAPI}
         showAddWorkbookOrFolderButton={true}
         isSharedWithMeRoute={false}
         currentRoute={'home'}
         isEmptyTrash={false}
         getSharedWorkbooksAndFoldersOfASubFolderAPI={
            getSharedWorkbooksAndFoldersOfASubFolderAPI
         }
         getFolderIdOfAWorkbookAPI={getFolderIdOfAWorkbookAPI}
      />
   )

   beforeEach(() => {
      onChangeText = jest.fn()
      createFolderAPI = jest.fn()
      createWorkbookAPI = jest.fn()
      getWorkbooksAndFoldersAPI = jest.fn()
      getSharedWorkbooksAndFoldersOfASubFolderAPI = jest.fn()
      getFolderIdOfAWorkbookAPI = jest.fn()
   })

   it('should show SearchBar', () => {
      const { getByText } = render(
         <Router history={createMemoryHistory()}>
            {renderSearchAndAddButton()}
         </Router>
      )
      getByText('Search')
   })

   it('should show typed value in searchBar', () => {
      const { container } = render(
         <Router history={createMemoryHistory()}>
            {renderSearchAndAddButton()}
         </Router>
      )
      const searchBar = container.querySelector('input')
      fireEvent.change(searchBar, { target: { value: 'Orange' } })
      expect(searchBar.value).toBe('Orange')
   })
})
