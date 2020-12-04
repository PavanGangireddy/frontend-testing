import React from 'react'
import { storiesOf } from '@storybook/react'
import tw, { styled } from 'twin.macro'

import { action } from '@storybook/addon-actions'
import workbookChildDetails from '../../../WorkbookManagement/fixtures/getWorkbookChildDetailsAPIResponse.json'
import WorkbookChildDetailsModel from '../../../WorkbookManagement/stores/models/WorkbookChildDetailsModel'
import getFolderWorkbookDetails from '../../../FolderManagement/fixtures/getWorkbooksAndFolders.json'
import DashboardFixture from '../../../FolderManagement/services/DashboardService/index.fixture'
import PublishFixture from '../../../FolderManagement/services/PublishService/index.fixture'
import DashboardStore from '../../../FolderManagement/stores/DashboardStore'
import AssignmentsFixture from '../../../FolderManagement/services/AssignmentsService/index.fixture'
import LearningsFixture from '../../../FolderManagement/services/LearningsService/index.fixture'

import {
   FOLDER,
   MOVE,
   MERGE,
   LIST,
   SECTION,
   CARD
} from '../../constants/UIConstants'

import BlackCloseIcon from '../../icons/BlackCloseIcon'

import BaseModalContainer from '../BaseModalContainer'
import MoveResource from '../MoveResource'

import MoveResourceBodyWrapper from '.'

const Container = styled.div``

const HeaderContainer = styled.div`
   ${tw`flex items-center justify-around w-full h-64px`}
`

const CloseIconContainer = styled.div`
   ${tw`cursor-pointer`}
`

const workbookChildDetailsModel = new WorkbookChildDetailsModel(
   workbookChildDetails
)

const dashboardfixture = new DashboardFixture()
const publishFixture = new PublishFixture()
const assignmentsfixture = new AssignmentsFixture()
const learningsFixture = new LearningsFixture()
const dashboardStore = new DashboardStore(
   dashboardfixture,
   assignmentsfixture,
   publishFixture,
   learningsFixture
)
dashboardStore.setGetWorkbooksAndFoldersAPIResponse(getFolderWorkbookDetails)

const modalRef = React.createRef<BaseModalContainer>()

function openModal(): void {
   modalRef.current?.openModal()
}

function closeModal(): void {
   modalRef.current?.closeModal()
}

function renderHeader(props: any): React.ReactNode {
   const { onCancel } = props
   return (
      <HeaderContainer>
         Header
         <CloseIconContainer onClick={onCancel}>
            <BlackCloseIcon />
         </CloseIconContainer>
      </HeaderContainer>
   )
}

function folderMoved(id) {
   alert(id)
   closeModal()
}

function renderMoveFolder(props: any): React.ReactNode {
   const { onCancel } = props
   return (
      <MoveResourceBodyWrapper
         getWorkbookDetailsAPIStatus={200}
         onCancel={onCancel}
         actionType={MOVE}
         resourceType={FOLDER}
         getFolderDetailsAPI={id => alert(id)}
         getFolderDetailsAPIStatus={200}
         getFolderDetailsAPIError={
            dashboardStore.getWorkbooksAndFoldersAPIError
         }
         folderData={dashboardStore.activeFolderInfo}
         folderId={'1'}
         onMoveFolderResourceAPI={folderMoved}
         onMoveFolderResourceAPIStatus={0}
         clearWorkbooksAndFolder={(): void => {}}
      />
   )
}

function renderMergeCardBody(props: any): React.ReactNode {
   const { onCancel } = props
   return (
      <MoveResourceBodyWrapper
         getWorkbookDetailsAPIStatus={200}
         onCancel={onCancel}
         actionType={MERGE}
         resourceType={CARD}
         getFolderDetailsAPI={id => alert(id)}
         getFolderDetailsAPIStatus={200}
         getFolderDetailsAPIError={
            dashboardStore.getWorkbooksAndFoldersAPIError
         }
         folderData={dashboardStore.activeFolderInfo}
         workbookId={'2'}
         onMoveFolderResourceAPI={action('list moved')}
         onMoveFolderResourceAPIStatus={0}
         workbookData={workbookChildDetailsModel}
         onMergeAPI={() => alert('merge api called')}
         onMergeAPIStatus={200}
         getWorkbookDetailsAPI={id => alert(id)}
         getWorkbookDetailsAPIError={'error'}
         clearWorkbooksAndFolder={(): void => {}}
      />
   )
}

function renderMoveCard(props: any): React.ReactNode {
   const { onCancel } = props
   return (
      <MoveResourceBodyWrapper
         getWorkbookDetailsAPIStatus={200}
         onCancel={onCancel}
         actionType={MOVE}
         resourceType={CARD}
         getFolderDetailsAPI={id => alert(id)}
         getFolderDetailsAPIStatus={200}
         getFolderDetailsAPIError={
            dashboardStore.getWorkbooksAndFoldersAPIError
         }
         folderData={dashboardStore.activeFolderInfo}
         workbookId={'2'}
         onMoveFolderResourceAPI={() => alert('card moved')}
         onMoveFolderResourceAPIStatus={0}
         workbookData={workbookChildDetailsModel}
         getWorkbookDetailsAPI={action('get workbook details')}
         getWorkbookDetailsAPIError={'error'}
         clearWorkbooksAndFolder={(): void => {}}
      />
   )
}

function renderMoveSection(props: any): React.ReactNode {
   const { onCancel } = props
   return (
      <MoveResourceBodyWrapper
         getWorkbookDetailsAPIStatus={200}
         onCancel={onCancel}
         actionType={MOVE}
         resourceType={SECTION}
         getFolderDetailsAPI={id => alert(id)}
         getFolderDetailsAPIStatus={200}
         getFolderDetailsAPIError={
            dashboardStore.getWorkbooksAndFoldersAPIError
         }
         folderData={dashboardStore.activeFolderInfo}
         workbookId={'2'}
         onMoveFolderResourceAPI={() => alert('section moved')}
         onMoveFolderResourceAPIStatus={0}
         workbookData={workbookChildDetailsModel}
         getWorkbookDetailsAPI={action('get workbook details')}
         getWorkbookDetailsAPIError={'error'}
         clearWorkbooksAndFolder={(): void => {}}
      />
   )
}

function renderMoveListBody(props: any): React.ReactNode {
   const { onCancel } = props
   return (
      <MoveResourceBodyWrapper
         getWorkbookDetailsAPIStatus={200}
         onCancel={onCancel}
         actionType={MOVE}
         resourceType={LIST}
         getFolderDetailsAPI={id => alert(id)}
         getFolderDetailsAPIStatus={200}
         getFolderDetailsAPIError={
            dashboardStore.getWorkbooksAndFoldersAPIError
         }
         folderData={dashboardStore.activeFolderInfo}
         workbookId={'2'}
         onMoveFolderResourceAPI={() => alert('section moved')}
         onMoveFolderResourceAPIStatus={0}
         workbookData={workbookChildDetailsModel}
         getWorkbookDetailsAPI={action('get workbook details')}
         getWorkbookDetailsAPIError={'error'}
         clearWorkbooksAndFolder={(): void => {}}
      />
   )
}

storiesOf('OverLays/Resource Wrapper', module)
   .add('move Workbook or folder', () => (
      <>
         <MoveResource
            innerRef={modalRef}
            renderHeader={renderHeader}
            renderBody={renderMoveFolder}
            onCancel={closeModal}
            type='Folder'
         />
         <Container>
            <button onClick={() => openModal()}>click me</button>
         </Container>
      </>
   ))
   .add('merge card ', () => (
      <>
         <MoveResource
            innerRef={modalRef}
            renderHeader={renderHeader}
            renderBody={renderMergeCardBody}
            onCancel={closeModal}
            type=''
         />
         <Container>
            <button onClick={() => openModal()}>click me</button>
         </Container>
      </>
   ))
   .add('move card ', () => (
      <>
         <MoveResource
            innerRef={modalRef}
            renderHeader={renderHeader}
            renderBody={renderMoveCard}
            onCancel={closeModal}
            type='Card'
         />
         <Container>
            <button onClick={() => openModal()}>click me</button>
         </Container>
      </>
   ))
   .add('move section ', () => (
      <>
         <MoveResource
            innerRef={modalRef}
            renderHeader={renderHeader}
            renderBody={renderMoveSection}
            onCancel={closeModal}
            type='Section'
         />
         <Container>
            <button onClick={() => openModal()}>click me</button>
         </Container>
      </>
   ))
   .add('move list ', () => (
      <>
         <MoveResource
            innerRef={modalRef}
            renderHeader={renderHeader}
            renderBody={renderMoveListBody}
            onCancel={closeModal}
            type='List'
         />
         <Container>
            <button onClick={() => openModal()}>click me</button>
         </Container>
      </>
   ))
