import React from 'react'
import { storiesOf } from '@storybook/react'

import StarredFolders from '.'

const StarredFoldersData = [
   {
      name: 'blue',
      id: '0',
      isPublishedByUs: true
   },
   {
      name: 'green',
      id: '1',
      isPublishedByUs: false
   },
   {
      name: 'blue',
      id: '2',
      isPublishedByUs: true
   },
   {
      name: 'blue',
      id: '3',
      isPublishedByUs: false
   },
   {
      name: 'blue',
      id: '4',
      isPublishedByUs: false
   },
   {
      name: 'blue',
      id: '0',
      isPublishedByUs: true
   },
   {
      name: 'green',
      id: '1',
      isPublishedByUs: false
   },
   {
      name: 'blue',
      id: '2',
      isPublishedByUs: true
   },
   {
      name: 'blue',
      id: '3',
      isPublishedByUs: false
   },
   {
      name: 'blue',
      id: '4',
      isPublishedByUs: false
   }
]

const onDoubleClickFolder = (folderId: string): void => {}

storiesOf('WorkbookManagement/StarredFolders', module).add(
   'StarredFolders',
   () => (
      <StarredFolders
         starredFolders={StarredFoldersData}
         onDoubleClickFolder={onDoubleClickFolder}
         onClickFolderMenuItem={() => {}}
      />
   )
)
