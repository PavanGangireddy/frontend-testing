import React from 'react'
import { storiesOf } from '@storybook/react'
import { styled } from 'twin.macro'
import { Draggable } from 'react-beautiful-dnd'

import WorkbookChildDetailsModel from '../../../stores/models/WorkbookChildDetailsModel'
import WorkbookModel from '../../../stores/models/WorkbookModel'
import getWorkbookChildDetailsResponse from '../../../fixtures/getWorkbookChildDetailsAPIResponse.json'
import getWorkBookDetails from '../../../fixtures/getWorkbookDetailsAPIResponse.json'

import SectionHeader from './SectionHeader'

const Div = styled.div``

const workbookChildDetails = new WorkbookChildDetailsModel(
   getWorkbookChildDetailsResponse
)

const workbookDetails = new WorkbookModel(getWorkBookDetails)

storiesOf('WorkbookManagement/Workbook/SectionHeader', module)
   .add('Section Header Collapsed', () => (
      <Div>
         <SectionHeader
            sectionId={'1234'}
            sectionName='Section Priority Lock'
            isCollapsed={true}
            onClickToggleButton={() => {}}
            draggableProvided={Draggable.arguments}
            updateSectionNameAPI={() => {}}
            onDeleteSection={() => alert('section deleted')}
            moveSectionAPI={() => alert('section moved')}
            moveSectionAPIStatus={200}
            moveSectionAPIError={'error'}
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
            rootFolderId={''}
            workbookDetails={workbookDetails}
            moveSection={(): void => {}}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
            updateSectionNameAPIStatus={200}
            deleteSectionAPIStatus={200}
         />
      </Div>
   ))
   .add('Section Header Not Collapsed', () => (
      <Div>
         <SectionHeader
            sectionId='1234'
            sectionName='Section Priority Lock'
            isCollapsed={false}
            onClickToggleButton={() => {}}
            draggableProvided={Draggable.arguments}
            updateSectionNameAPI={() => {}}
            onDeleteSection={() => alert('section deleted')}
            moveSectionAPI={() => alert('section moved')}
            moveSectionAPIStatus={200}
            moveSectionAPIError={'error'}
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
            rootFolderId={''}
            workbookDetails={workbookDetails}
            moveSection={(): void => {}}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
            updateSectionNameAPIStatus={200}
            deleteSectionAPIStatus={200}
         />
      </Div>
   ))
