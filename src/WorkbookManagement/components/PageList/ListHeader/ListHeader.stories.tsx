import React from 'react'
import { storiesOf } from '@storybook/react'
import { styled } from 'twin.macro'
import { Draggable } from 'react-beautiful-dnd'

import getWorkbookChildDetailsResponse from '../../../fixtures/getWorkbookChildDetailsAPIResponse.json'
import WorkbookChildDetailsModel from '../../../stores/models/WorkbookChildDetailsModel'

import WorkbookModel from '../../../stores/models/WorkbookModel'
import getWorkBookDetails from '../../../fixtures/getWorkbookDetailsAPIResponse.json'

import ListHeader from './ListHeader'

const Div = styled.div``

const onSuccess = (): void => {}

const onFailure = (): void => {}

const workbookChildDetails = new WorkbookChildDetailsModel(
   getWorkbookChildDetailsResponse
)

const workbookDetails = new WorkbookModel(getWorkBookDetails)

storiesOf('WorkbookManagement/Workbook/PageList', module).add(
   'PageSection',
   () => (
      <Div>
         <ListHeader
            listId={'1'}
            listName={'List 1'}
            onClickAddListButton={() => {}}
            draggableProvided={Draggable.arguments}
            onClickDeleteListButton={() => {}}
            updateName={() => {}}
            renameListAPI={(onSuccess, onFailure) => {}}
            renameListAPIStatus={200}
            renameListAPIError={'error'}
            moveListAPI={() => {}}
            moveListAPIStatus={200}
            moveListAPIError={'error'}
            getWorkbookChildDetailsAPI={() => {}}
            getWorkbookChildDetailsAPIStatus={200}
            // TODO: Need to update type
            getWorkbookChildDetailsAPIError={null}
            getWorkbooksAndFoldersAPI={() => {}}
            getWorkbooksAndFoldersStatus={200}
            // TODO: Need to update type
            getWorkbooksAndFoldersError={200}
            activeFolderInfo={''}
            workbookChildDetails={workbookChildDetails}
            getRootFolderDetailsAPI={() => {}}
            getRootFolderDetailsAPIStatus={200}
            // TODO: Need to update the type
            getRootFolderDetailsAPIError={null}
            rootFolderId={'1234'}
            workbookDetails={workbookDetails}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
            onSuccessListOperation={(): void => {}}
         />
      </Div>
   )
)
