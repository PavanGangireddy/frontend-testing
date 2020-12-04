import React, { ReactNode, ReactElement } from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { API_SUCCESS, APIStatus } from '@ib/api-constants'

import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import LayoutWithSideBar from '../../../Common/components/LayoutWithSideBar'
import BlackCloseIcon from '../../../Common/icons/BlackCloseIcon'
import MoveResource from '../../../Common/components/MoveResource'
import {
   showSuccessBottomCenterToast,
   showFailureBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import MoveResourceBodyWrapper from '../../../Common/components/MoveResourceBodyWrapper'
import { MOVE, FOLDER, WORKBOOK } from '../../../Common/constants/UIConstants'
import UserStore from '../../../UserProfile/stores/UserStore'
import {
   getAPIErrorMessage,
   isAPIFetching
} from '../../../Common/utils/APIUtils'
import LoadingView from '../../../Common/components/LoadingWrapper/LoadingView'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import ShareFeatureLockModal from '../../../Common/components/ShareFeatureLockModal'

import DashboardStore from '../../stores/DashboardStore'
import UserWorkbooksAndFolders from '../../components/UserWorkbooksAndFolders'
import {
   CollapsedFooterWithProfilePic,
   CollapsedHeaderWithIcons,
   ExpandedFooterWithUserProfileLayout,
   RenderMenuItems
} from '../../components/CollapsibleSideNavbarComponents'
import {
   goToWorkbookPage,
   goToHome,
   goToFolder,
   goToSharedWithMeScreen
} from '../../utils/NavigationUtils.ts'
import withWorkbookOrFolderActions from '../../hocs/withWorkbookOrFolderActions'
import {
   home,
   STAR_FOLDER,
   REMOVE_FROM_STARRED,
   PIN,
   UNPIN,
   SHARE,
   SHARED_WITH_ME,
   RENAME,
   MOVE_TO,
   workbook,
   folder,
   DELETE,
   sharedWithMe,
   active
} from '../../constants/UIConstants'
import FolderInfoItem from '../../stores/models/FolderInfoItem'
import WorkbookInfoItem from '../../stores/models/WorkbookInfoItem'
import PathInfoItem from '../../stores/models/PathInfoItem'
import AddWorkbookOrFolderInMobileView from '../../components/AddWorkbookOrFolderInMobileView'

import SearchAndAddButtonsContainer from '../SearchAndAddButtonsContainer'
import {
   MoveFolderOrWorkbookHeader,
   MoveFolderOrWorkbookHeaderTitle,
   CloseIconContainer
} from '../FolderManagementRoute/styledComponents'
import { LoaderContainer, Container } from '../styledComponents'

import NewProjectIcon from '../../../Common/icons/NewProjectIcon'
import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import {
   ActiveFolderFilterBarContainer,
   ActiveProjectDetailsContainer,
   ProjectTitle,
   SearchBarWrapper,
   ProjectIconContainer
} from './styledComponents'

interface InjectedProps extends RouteComponentProps {
   dashboardStore: DashboardStore
   setFolderName: (folderId: string) => void
   openRenameModal: () => void
   setWorkbookName: (workbookId: string) => void
   onActionFolderOrWorkbook: (folderOrWorkbook: string) => void
   onChangeFolderOrWorkbookId: (folderOrWorkbookId: string) => void
   userStore: UserStore
   openDeleteModal: () => void
}

@inject('dashboardStore', 'userStore')
@observer
class ActiveFolderRoute extends React.Component<RouteComponentProps> {
   @observable folderOrWorkbookID
   @observable isFolder
   @observable shareFolderOrWorkbookModalRef
   @observable shareFolderOrWorkbookAPI
   @observable isMovingFolderOrWorkbook: boolean
   // TODO: Need to add type
   moveModalRef
   movingFolderId: string
   movingFolderName!: string
   movingWorkbookId: string
   movingWorkbookName!: string
   @observable isNavigatedFromSharedWithMe = false

   constructor(props) {
      super(props)
      this.shareFolderOrWorkbookModalRef = React.createRef<BaseModalContainer>()
      this.shareFolderOrWorkbookModalRef = React.createRef<BaseModalContainer>()
      if (props.location) {
         if (props.location.state) {
            this.isNavigatedFromSharedWithMe =
               props.location.state.fromSharedWithMe
         }
      }
      this.isMovingFolderOrWorkbook = false
      this.moveModalRef = React.createRef<BaseModalContainer>()
      this.movingFolderId = ''
      this.movingWorkbookId = ''
   }

   componentDidMount() {
      this.doNetworkCallForFoldersAndWorkbooks()
      const { name } = this.getUserStore().userDetails
      if (!name) {
         this.getUserStore().getuserProfileAPI()
      }
   }

   //TODO:need to clear store

   get folderIdFromRoute(): string {
      const {
         match: {
            params: { folderId }
         }
      } = this.props
      return folderId
   }

   doNetworkCallForFoldersAndWorkbooks = (): void => {
      const folderId = this.folderIdFromRoute
      if (this.isNavigatedFromSharedWithMe) {
         this.getDashBoardStore().getSharedWorkbooksAndFoldersOfASubFolderAPI(
            folderId
         )
      } else {
         this.getDashBoardStore().getWorkbooksAndFoldersAPI(folderId)
      }
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getDashBoardStore = (): any => this.getInjectedProps().dashboardStore //TODO:need to update type

   getUserStore = () => this.getInjectedProps().userStore

   onDoubleClickFolder = (folderId: string): void => {
      if (folderId === home) {
         const { history } = this.props
         goToHome(history)
      } else if (folderId === SHARED_WITH_ME) {
         const { history } = this.props
         goToSharedWithMeScreen(history)
      } else {
         const { history } = this.props
         goToFolder(history, folderId, this.isNavigatedFromSharedWithMe)
      }
   }

   onDoubleClickWorkbook = (workbookId: string): void => {
      const { history } = this.props
      const {
         activeFolderInfo: { pathInfo },
         rootFolderId
      } = this.getDashBoardStore()
      let parentFolderId!: string

      if (this.isNavigatedFromSharedWithMe) {
         const { match } = this.props
         const folderId = match.params.folderId
         parentFolderId = folderId
      } else {
         const pathLength = pathInfo.length
         if (pathLength > 0) {
            parentFolderId = pathInfo[pathLength - 1].id
         } else {
            parentFolderId = rootFolderId
         }
      }
      goToWorkbookPage(history, parentFolderId, workbookId)
   }

   onChangeOrder = (orderBy: string): void => {
      const { onChangeOrder } = this.getDashBoardStore()
      onChangeOrder(orderBy)
      this.doNetworkCallForFoldersAndWorkbooks()
   }

   addOrRemoveFolderStar = (folderId: string): void => {
      const {
         addOrRemoveFolderStarAPI,
         addOrRemoveFolderStar
      } = this.getDashBoardStore()
      addOrRemoveFolderStar(folderId)
      addOrRemoveFolderStarAPI(
         folderId,
         this.onFailurePinOrUnpinWorkbookAddOrRemoveStarAPI
      )
   }

   pinOrUnpinWorkbook = (workbookId: string): void => {
      const {
         pinOrUnpinWorkbookAPI,
         pinOrUnpinWorkbook
      } = this.getDashBoardStore()
      pinOrUnpinWorkbook(workbookId)
      pinOrUnpinWorkbookAPI(
         workbookId,
         this.onFailurePinOrUnpinWorkbookAddOrRemoveStarAPI
      )
   }

   onFailurePinOrUnpinWorkbookAddOrRemoveStarAPI = (): void => {
      this.doNetworkCallForFoldersAndWorkbooks()
   }

   onClickCancelOfShare = () => {
      this.shareFolderOrWorkbookModalRef.current?.closeModal()
   }

   get isMovingFolder(): boolean {
      return this.movingFolderId !== ''
   }

   onSuccessMoveFolderOrWorkbook = (): void => {
      this.doNetworkCallForFoldersAndWorkbooks()
      this.isMovingFolderOrWorkbook = false
      const { t } = this.props
      showSuccessBottomCenterToast(
         this.isMovingFolder
            ? `${this.movingFolderName} ${t('folderManagement:home.isMoved')}`
            : `${this.movingWorkbookName} ${t('folderManagement:home.isMoved')}`
      )
      this.closeMoveModal()
   }

   onFailureMoveFolderOrWorkbook = (): void => {
      const { moveFolderAPIError } = this.getDashBoardStore()
      showFailureBottomCenterToast(getAPIErrorMessage(moveFolderAPIError))
   }

   getFolderName = (folderId: string): string => {
      const {
         activeFolderInfo: { folders }
      } = this.getDashBoardStore()
      let folderName = ''
      const folder = folders.find(
         (folder: FolderInfoItem) => folder.id === folderId
      )
      if (folder) {
         folderName = folder.name
      }
      return folderName
   }

   getWorkbookName = (workbookId: string): string => {
      const {
         activeFolderInfo: { workbooks }
      } = this.getDashBoardStore()
      let workbookName = ''
      const workbook = workbooks.find(
         (workbook: WorkbookInfoItem) => workbook.id === workbookId
      )
      if (workbook) {
         workbookName = workbook.name
      }
      return workbookName
   }

   getSharedWithMe = () =>
      this.isNavigatedFromSharedWithMe ? sharedWithMe : active

   @action.bound
   onClickFolderMenuItem = (folderId: string, clickedItem: string): void => {
      const {
         setFolderName,
         openRenameModal,
         onActionFolderOrWorkbook,
         onChangeFolderOrWorkbookId,
         openDeleteModal
      } = this.props
      if (clickedItem === STAR_FOLDER || clickedItem === REMOVE_FROM_STARRED) {
         this.addOrRemoveFolderStar(folderId)
      } else if (clickedItem === RENAME) {
         onChangeFolderOrWorkbookId(folderId)
         setFolderName(folderId, this.getSharedWithMe())
         openRenameModal()
         onActionFolderOrWorkbook(folder)
      } else if (clickedItem === DELETE) {
         onChangeFolderOrWorkbookId(folderId)
         onActionFolderOrWorkbook(folder)
         setFolderName(folderId, this.getSharedWithMe())
         openDeleteModal()
      }
      if (clickedItem === SHARE) {
         this.shareFolderOrWorkbookModalRef.current?.openModal()
         this.shareFolderOrWorkbookAPI = this.getDashBoardStore().shareFolderAPI
         this.isFolder = true
         this.folderOrWorkbookID = folderId
         setFolderName(folderId, this.getSharedWithMe())
      }
      if (clickedItem === MOVE_TO) {
         this.openMoveModal()
         this.movingFolderId = folderId
         this.movingFolderName = this.getFolderName(folderId)
         this.isMovingFolderOrWorkbook = true
         this.movingWorkbookId = ''
      }
   }

   @action.bound
   onClickWorkbookMenuItem = (
      workbookId: string,
      clickedItem: string
   ): void => {
      const {
         setWorkbookName,
         openRenameModal,
         onActionFolderOrWorkbook,
         onChangeFolderOrWorkbookId,
         openDeleteModal
      } = this.props
      if (clickedItem === PIN || clickedItem === UNPIN) {
         this.pinOrUnpinWorkbook(workbookId)
      } else if (clickedItem === RENAME) {
         onChangeFolderOrWorkbookId(workbookId)
         setWorkbookName(workbookId, this.getSharedWithMe())
         openRenameModal()
         onActionFolderOrWorkbook(workbook)
      } else if (clickedItem === DELETE) {
         onChangeFolderOrWorkbookId(workbookId)
         onActionFolderOrWorkbook(workbook)
         setWorkbookName(workbookId, this.getSharedWithMe())
         openDeleteModal()
      }
      if (clickedItem === SHARE) {
         this.shareFolderOrWorkbookModalRef.current?.openModal()
         this.shareFolderOrWorkbookAPI = this.getDashBoardStore().shareWorkbookAPI
         this.isFolder = false
         this.folderOrWorkbookID = workbookId
         setWorkbookName(workbookId, this.getSharedWithMe())
      }
      if (clickedItem === MOVE_TO) {
         this.openMoveModal()
         this.isMovingFolderOrWorkbook = true
         this.movingWorkbookId = workbookId
         this.movingWorkbookName = this.getWorkbookName(workbookId)
         this.movingFolderId = ''
      }
   }

   renderExpandedFooter = (): ReactNode => {
      const {
         logoutAPI,
         logoutAPIStatus,
         userDetails: { name }
      } = this.getUserStore()
      return (
         <ExpandedFooterWithUserProfileLayout
            logoutAPI={logoutAPI}
            logoutAPIStatus={logoutAPIStatus}
            userName={name}
         />
      )
   }

   renderCollapsedFooter = (): ReactNode => {
      const {
         userDetails: { name }
      } = this.getUserStore()
      return <CollapsedFooterWithProfilePic userName={name} />
   }

   renderCollapsedHeaderWithIcons = (): ReactNode => {
      const { role } = this.getUserStore().userDetails
      return <CollapsedHeaderWithIcons role={role} />
   }
   openMoveModal = (): void => {
      this.moveModalRef.current?.openModal()
   }

   closeMoveModal = (): void => {
      this.moveModalRef.current?.closeModal()
   }

   renderMoveModalHeader = (): ReactElement => {
      const { t } = this.props
      return (
         <MoveFolderOrWorkbookHeader>
            <MoveFolderOrWorkbookHeaderTitle>
               {this.isMovingFolder
                  ? t('folderManagement:home.moveFolder')
                  : t('folderManagement:home.moveWorkbook')}
            </MoveFolderOrWorkbookHeaderTitle>
            <CloseIconContainer onClick={this.closeMoveModal}>
               <BlackCloseIcon />
            </CloseIconContainer>
         </MoveFolderOrWorkbookHeader>
      )
   }

   moveFolderAPI = (destinationFolderId: string): void => {
      const { moveFolderAPI } = this.getDashBoardStore()
      const request = {
         folder_id: this.movingFolderId,
         destination_parent_folder_id: destinationFolderId
      }
      moveFolderAPI(
         request,
         this.onSuccessMoveFolderOrWorkbook,
         this.onFailureMoveFolderOrWorkbook
      )
   }

   moveWorkbookAPI = (destinationFolderId: string): void => {
      const { moveWorkbookAPI } = this.getDashBoardStore()
      const request = {
         workbook_id: this.movingWorkbookId,
         folder_id: destinationFolderId
      }
      moveWorkbookAPI(
         request,
         this.onSuccessMoveFolderOrWorkbook,
         this.onFailureMoveFolderOrWorkbook
      )
   }

   renderMoveModalBody = observer(
      (): ReactElement => {
         const {
            getMoveWorkbooksAndFoldersAPI,
            getMoveWorkbooksAndFoldersAPIStatus,
            getMoveWorkbooksAndFoldersAPIError,
            moveActiveFolderInfo,
            moveRootFolderId,
            getMoveRootFolderDetailsAPI,
            getRootFolderDetailsAPIStatus,
            getRootFolderDetailsAPIError,
            moveFolderAPIStatus,
            moveWorkbookAPIStatus,
            clearMoveWorkbooksAndFolders
         } = this.getDashBoardStore()
         return (
            <MoveResourceBodyWrapper
               getWorkbookDetailsAPIStatus={API_SUCCESS}
               onCancel={this.closeMoveModal}
               actionType={MOVE}
               resourceType={this.isMovingFolder ? FOLDER : WORKBOOK}
               getFolderDetailsAPI={getMoveWorkbooksAndFoldersAPI}
               getFolderDetailsAPIStatus={getMoveWorkbooksAndFoldersAPIStatus}
               getFolderDetailsAPIError={getMoveWorkbooksAndFoldersAPIError}
               folderData={moveActiveFolderInfo}
               folderId={this.folderIdFromRoute}
               onMoveFolderResourceAPI={
                  this.isMovingFolder
                     ? this.moveFolderAPI
                     : this.moveWorkbookAPI
               }
               onMoveFolderResourceAPIStatus={
                  this.isMovingFolder
                     ? moveFolderAPIStatus
                     : moveWorkbookAPIStatus
               }
               rootFolderId={moveRootFolderId}
               getRootFolderDetailsAPI={getMoveRootFolderDetailsAPI}
               getRootFolderDetailsAPIStatus={getRootFolderDetailsAPIStatus}
               getRootFolderDetailsAPIError={getRootFolderDetailsAPIError}
               movingFolderId={this.isMovingFolder ? this.movingFolderId : ''}
               clearMoveWorkbooksAndFolders={clearMoveWorkbooksAndFolders}
            />
         )
      }
   )

   renderExpandedMenu = (): ReactNode => {
      const { role } = this.getUserStore().userDetails
      return <RenderMenuItems role={role} />
   }

   getFolders = (): Array<FolderInfoItem> =>
      this.isNavigatedFromSharedWithMe
         ? this.getDashBoardStore().sharedWithMeFolderInfo.folders
         : this.getDashBoardStore().activeFolderInfo.folders

   getWorkbooks = (): Array<WorkbookInfoItem> =>
      this.isNavigatedFromSharedWithMe
         ? this.getDashBoardStore().sharedWithMeFolderInfo.workbooks
         : this.getDashBoardStore().activeFolderInfo.workbooks

   getPathInfo = (): Array<PathInfoItem> =>
      this.isNavigatedFromSharedWithMe
         ? this.getDashBoardStore().sharedWithMeFolderInfo.pathInfo
         : this.getDashBoardStore().activeFolderInfo.pathInfo

   getWorkbooksAndFolderAPIStatus = (): APIStatus =>
      this.isNavigatedFromSharedWithMe
         ? this.getDashBoardStore().getSharedWithMeWorkbooksAndFoldersAPIStatus
         : this.getDashBoardStore().getWorkbooksAndFoldersAPIStatus

   // TODO: Need to update type
   getWorkbooksAndFolderAPIError = (): any =>
      this.isNavigatedFromSharedWithMe
         ? this.getDashBoardStore().getSharedWithMeWorkbooksAndFoldersAPIError
         : this.getDashBoardStore().getWorkbooksAndFoldersAPIError

   onSuccessGetProjectDetails = () => {
      // TODO: need to handle success case
   }
   goToProjectFolder = () => {
      const pathInfo = this.getPathInfo()
      this.onDoubleClickFolder(pathInfo[0].id)
   }

   renderProjectDetails = () => {
      const pathInfo = this.getPathInfo()
      return (
         <ActiveProjectDetailsContainer>
            <ProjectIconContainer onClick={this.goToProjectFolder}>
               <NewProjectIcon width={32} height={32} />
            </ProjectIconContainer>
            <ProjectTitle>
               {pathInfo
                  ? pathInfo[0]
                     ? pathInfo[0].name
                        ? pathInfo[0].name
                        : null
                     : null
                  : null}
            </ProjectTitle>
         </ActiveProjectDetailsContainer>
      )
   }

   renderFilterBar = (): ReactNode => {
      const { renderProjectDetails } = this
      if (isMobileDevice) {
         return <>{renderProjectDetails()}</>
      }
      return (
         <ActiveFolderFilterBarContainer>
            {renderProjectDetails()}
            <SearchBarWrapper>
               <SearchAndAddButtonsContainer
                  showAddWorkbookOrFolderButton={true}
                  isSharedWithMeRoute={this.isNavigatedFromSharedWithMe}
               />
            </SearchBarWrapper>
         </ActiveFolderFilterBarContainer>
      )
   }

   renderSearchBar = (): ReactElement => (
      <SearchAndAddButtonsContainer showAddWorkbookOrFolderButton={false} />
   )

   renderFoldersAndWorkbooksSuccessUI = () => (
      <>
         {this.renderFilterBar()}
         <Container>
            <UserWorkbooksAndFolders
               getWorkbooksAndFoldersAPIStatus={this.getWorkbooksAndFolderAPIStatus()}
               getWorkbooksAndFoldersAPIError={this.getWorkbooksAndFolderAPIError()}
               doNetworkCallForFoldersAndWorkbooks={
                  this.doNetworkCallForFoldersAndWorkbooks
               }
               userWorkbooks={this.getWorkbooks()}
               userFolders={this.getFolders()}
               onChangeOrder={this.onChangeOrder}
               pathInfo={this.getPathInfo()}
               onDoubleClickFolder={this.onDoubleClickFolder}
               onDoubleClickWorkbook={this.onDoubleClickWorkbook}
               onClickFolderMenuItem={this.onClickFolderMenuItem}
               onClickWorkbookMenuItem={this.onClickWorkbookMenuItem}
               isSharedWithMe={this.isNavigatedFromSharedWithMe}
               currentRoute={this.getSharedWithMe()}
            />
         </Container>
      </>
   )

   renderAddWorkbookOrFolderOrNull = (): ReactNode => {
      const {
         createFolderAPI,
         createWorkbookAPI,
         createFolderOrWorkbookAPIStatus,
         createFolderOrWorkbookAPIError,
         rootFolderId,
         getWorkbooksAndFoldersAPI,
         getSharedWorkbooksAndFoldersOfASubFolderAPI,
         getWorkbooksAndFoldersAPIStatus,
         getRootFolderDetailsAPIStatus
      } = this.getDashBoardStore()
      if (isMobileDevice) {
         return (
            <AddWorkbookOrFolderInMobileView
               createFolderAPI={createFolderAPI}
               createWorkbookAPI={createWorkbookAPI}
               createFolderOrWorkbookAPIStatus={createFolderOrWorkbookAPIStatus}
               createFolderOrWorkbookAPIError={createFolderOrWorkbookAPIError}
               rootFolderId={rootFolderId}
               getWorkbooksAndFoldersAPIStatus={getWorkbooksAndFoldersAPIStatus}
               getRootFolderDetailsAPIStatus={getRootFolderDetailsAPIStatus}
               getWorkbooksAndFoldersAPI={getWorkbooksAndFoldersAPI}
               isSharedWithMeRoute={false}
               getSharedWorkbooksAndFoldersOfASubFolderAPI={
                  getSharedWorkbooksAndFoldersOfASubFolderAPI
               }
            />
         )
      }
      return null
   }

   //TODO: need to write a common wrapper for all the routes
   render(): ReactNode {
      const {
         shareFolderOrWorkbookAPIStatus,
         getFolderIdOfAWorkbookAPIStatus
      } = this.getDashBoardStore()
      const {
         userProfileAPIStatus,
         userProfileAPIError,
         getuserProfileAPI
      } = this.getUserStore()
      return (
         <LayoutWithSideBar
            collapsedFooterView={this.renderCollapsedFooter()}
            collapsedHeaderView={this.renderCollapsedHeaderWithIcons()}
            expandedFooterView={this.renderExpandedFooter()}
            expandedHeaderView={this.renderExpandedMenu()}
            status={userProfileAPIStatus}
            error={userProfileAPIError}
            retryFunction={getuserProfileAPI}
            searchBar={this.renderSearchBar}
         >
            {isAPIFetching(getFolderIdOfAWorkbookAPIStatus) ? (
               <LoaderContainer>
                  <LoadingView />
               </LoaderContainer>
            ) : (
               <LoadingWrapper
                  apiStatus={this.getWorkbooksAndFolderAPIStatus()}
                  apiError={this.getWorkbooksAndFolderAPIError()}
                  onRetry={this.doNetworkCallForFoldersAndWorkbooks}
                  renderSuccessUI={this.renderFoldersAndWorkbooksSuccessUI}
               />
            )}
            {/* TODO: implement when there is a group activity */}
            {/* <ShareFolderOrWorkBook
               onCancel={this.onClickCancelOfShare}
               ref={this.shareFolderOrWorkbookModalRef}
               shareFolderOrWorkbookAPI={this.shareFolderOrWorkbookAPI}
               folderOrWorkbookID={this.folderOrWorkbookID}
               isFolder={this.isFolder}
               shareFolderOrWorkbookAPIStatus={shareFolderOrWorkbookAPIStatus}
               name={this.props.name}
            /> */}
            <ShareFeatureLockModal
               onCancel={this.onClickCancelOfShare}
               shareFeatureLockModalRef={this.shareFolderOrWorkbookModalRef}
            />
            <MoveResource
               innerRef={this.moveModalRef}
               renderHeader={this.renderMoveModalHeader}
               renderBody={this.renderMoveModalBody}
               onCancel={this.closeMoveModal}
               type={this.isMovingFolder ? 'Folder' : 'Workbook'}
            />
            {this.renderAddWorkbookOrFolderOrNull()}
         </LayoutWithSideBar>
      )
   }
}

export default withRouter(withWorkbookOrFolderActions(ActiveFolderRoute))
