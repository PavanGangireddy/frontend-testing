import React from 'react'
import { storiesOf } from '@storybook/react'
import tw, { styled } from 'twin.macro'

import getFolderWorkbookDetails from '../../../FolderManagement/fixtures/getWorkbooksAndFolders.json'
import DashboardFixture from '../../../FolderManagement/services/DashboardService/index.fixture'
import PublishFixture from '../../../FolderManagement/services/PublishService/index.fixture'
import DashboardStore from '../../../FolderManagement/stores/DashboardStore'
import AssignmentsFixture from '../../../FolderManagement/services/AssignmentsService/index.fixture'
import LearningsFixture from '../../../FolderManagement/services/LearningsService/index.fixture'

import { FOLDER } from '../../constants/UIConstants'

import BlackCloseIcon from '../../icons/BlackCloseIcon'

import BaseModalContainer from '../BaseModalContainer'
import MoveFolderChild from '../MoveFolderChild'

import { folderData } from './constants'
import MoveResource from '.'

const Container = styled.div``

const HeaderContainer = styled.div`
   ${tw`flex items-center justify-around w-full h-64px`}
`
const BodyContainer = styled.div`
   ${tw`flex flex-1 items-center justify-center `}
`

const CloseIconContainer = styled.div`
   ${tw`cursor-pointer`}
`

const CloseButton = styled.button`
   ${tw`cursor-pointer`}
`

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

function renderBody(props: any): React.ReactNode {
   const { onCancel } = props
   return (
      <BodyContainer>
         Body
         <CloseButton onClick={onCancel}>Cancel</CloseButton>
      </BodyContainer>
   )
}

function moveHere(folderId) {
   closeModal()
   alert(folderId)
}

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

function onClickBack() {
   const {
      activeFolderInfo,
      activeFolderInfo: { pathInfo }
   } = dashboardStore
   const length = pathInfo.length
   const { id } = activeFolderInfo.pathInfo[length - 1]
   alert(id)
}

function renderMoveFolderChild(props: any): React.ReactNode {
   const { onCancel } = props

   return (
      <MoveFolderChild
         onCancel={onCancel}
         type={FOLDER}
         resourceData={folderData}
         activeFolderInfo={dashboardStore.activeFolderInfo}
         onClickWorkbook={workbookId => alert(workbookId)}
         onClickFolder={folderId => alert(folderId)}
         isFolderWorkbookMove={false}
         onClickBack={onClickBack}
         apiStatus={0}
         onClickMoveHere={moveHere}
         isDisableNavigate={true}
      />
   )
}

storiesOf('OverLays/Resource', module)
   .add('move Resource Default View', () => (
      <>
         <MoveResource
            innerRef={modalRef}
            renderHeader={renderHeader}
            renderBody={renderBody}
            onCancel={closeModal}
            type={'Folder'}
         />
         <Container>
            <button onClick={() => openModal()}>click me</button>
         </Container>
      </>
   ))
   .add('move Resource Resource List View', () => (
      <>
         <MoveResource
            innerRef={modalRef}
            renderHeader={renderHeader}
            renderBody={renderMoveFolderChild}
            onCancel={closeModal}
            type={'List'}
         />
         <Container>
            <button onClick={() => openModal()}>click me</button>
         </Container>
      </>
   ))
