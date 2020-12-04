import React from 'react'
import { storiesOf } from '@storybook/react'
import { API_INITIAL } from '@ib/api-constants'
import { BrowserRouter } from 'react-router-dom'

import { home } from '../../constants/UIConstants'

import SearchAndAddButtons from '.'

storiesOf('Search and Add Workbook Container', module).add(
   'Search and Add Workbook Container',
   () => (
      <BrowserRouter>
         <SearchAndAddButtons
            onChangeText={() => {}}
            optionsData={{}}
            createWorkbookAPI={() => {}}
            createFolderAPI={() => {}}
            rootFolderId=''
            getWorkbooksAndFoldersAPIStatus={API_INITIAL}
            getRootFolderDetailsAPIStatus={API_INITIAL}
            getWorkbooksAndFoldersAPI={() => {}}
            showAddWorkbookOrFolderButton={true}
            isSharedWithMeRoute={false}
            currentRoute={home}
            isEmptyTrash={false}
            getSharedWorkbooksAndFoldersOfASubFolderAPI={() => {}}
            getFolderIdOfAWorkbookAPI={() => {}}
         />
      </BrowserRouter>
   )
)
