import React, { ReactNode, ReactElement } from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { API_SUCCESS } from '@ib/api-constants'

import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import LayoutWithSideBar from '../../../Common/components/LayoutWithSideBar'
import UserStore from '../../../UserProfile/stores/UserStore'
import {
   showSuccessBottomCenterToast,
   showFailureBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import {
   getAPIErrorMessage,
   isAPIFetching
} from '../../../Common/utils/APIUtils'
import MoveResource from '../../../Common/components/MoveResource'
import { MOVE, FOLDER, WORKBOOK } from '../../../Common/constants/UIConstants'
import MoveResourceBodyWrapper from '../../../Common/components/MoveResourceBodyWrapper'
import BlackCloseIcon from '../../../Common/icons/BlackCloseIcon'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import ShareFeatureLockModal from '../../../Common/components/ShareFeatureLockModal'

import DashboardStore from '../../stores/DashboardStore'
import FolderManagementDashBoard from '../../components/FolderManagementDashboard'
import {
   CollapsedFooterWithProfilePic,
   CollapsedHeaderWithIcons,
   ExpandedFooterWithUserProfileLayout,
   RenderMenuItems
} from '../../components/CollapsibleSideNavbarComponents'
import { goToWorkbookPage, goToFolder } from '../../utils/NavigationUtils.ts'
import withWorkbookOrFolderActions from '../../hocs/withWorkbookOrFolderActions'
import {
   REMOVE_FROM_STARRED,
   STAR_FOLDER,
   PIN,
   UNPIN,
   SHARE,
   RENAME,
   MOVE_TO,
   DELETE,
   folder,
   workbook,
   home,
   HOME
} from '../../constants/UIConstants'
import WorkbookInfoItem from '../../stores/models/WorkbookInfoItem'
import FolderInfoItem from '../../stores/models/FolderInfoItem'
import BaseWorkbookAndFolderInfoItem from '../../stores/models/BaseWorkbookAndFolderInfoItem'
import AddWorkbookOrFolderInMobileView from '../../components/AddWorkbookOrFolderInMobileView'
import WelcomeMessageUIStore from '../../stores/WelcomeMessageUIStore'
import HomeProjectsHeader from '../../components/HomeProjectsHeader'

import SearchAndAddButtonsContainer from '../SearchAndAddButtonsContainer'
import { HomeLoaderContainer, LoaderContainer } from '../styledComponents'

import LoadingView from '../../../Common/components/LoadingWrapper/LoadingView'
import {
   CloseIconContainer,
   MoveFolderOrWorkbookHeader,
   MoveFolderOrWorkbookHeaderTitle
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
   onChangeCurrentRoute?: (route: string) => void
   welcomeMessageUIStore: WelcomeMessageUIStore
}

@inject('dashboardStore', 'userStore', 'welcomeMessageUIStore')
@observer
class FolderManagementDashBoardRoute extends React.Component<
   RouteComponentProps
> {
   @observable folderOrWorkbookID
   @observable isFolder
   @observable shareFolderOrWorkbookModalRef
   @observable shareFolderOrWorkbookAPI
   @observable isMovingFolderOrWorkbook: boolean
   @observable isPinnedOrStarred

   // TODO: Need to add type
   moveModalRef
   movingFolderId: string
   movingFolderName!: string
   movingWorkbookId: string
   movingWorkbookName!: string

   constructor(props) {
      super(props)
      this.shareFolderOrWorkbookModalRef = React.createRef<BaseModalContainer>()
      this.isMovingFolderOrWorkbook = false
      this.moveModalRef = React.createRef<BaseModalContainer>()
      this.movingFolderId = ''
      this.movingWorkbookId = ''
   }

   async componentDidMount() {
      this.getRootFolderDetails()
      const { name } = this.getUserStore().userDetails
      if (!name) {
         await this.getUserStore().getuserProfileAPI()
      }
      this.doNetworkCallForStarredFoldersAndPinnedWorkbooks()
   }

   //TODO:need to clear the store
   doNetworkCallForStarredFoldersAndPinnedWorkbooks = (): void => {
      this.getDashBoardStore().getPinnedWorkbooksAndStarredFoldersAPI()
   }

   getUserProjects = (): void => {
      const { getUserProjectsAPI } = this.getDashBoardStore()
      getUserProjectsAPI()
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getDashBoardStore = (): any => this.getInjectedProps().dashboardStore //TODO:need update type

   getUserStore = () => this.getInjectedProps().userStore

   get welcomeMessageUIStore(): WelcomeMessageUIStore {
      const { welcomeMessageUIStore } = this.getInjectedProps()
      return welcomeMessageUIStore
   }

   onDoubleClickWorkbook = (workbookId: string): void => {
      const { history } = this.props
      const {
         activeFolderInfo: { pathInfo },
         rootFolderId
      } = this.getDashBoardStore()
      let parentFolderId!: string
      if (pathInfo) {
         const pathLength = pathInfo.length
         if (pathLength > 0) {
            parentFolderId = pathInfo[pathLength - 1].id
         } else {
            parentFolderId = rootFolderId
         }
      }
      this.hideWelcomeMessage()
      goToWorkbookPage(history, parentFolderId, workbookId)
   }

   onSuccessGetRootFolderDetailsAPI = (): void => {
      this.getUserProjects()
   }

   getRootFolderDetails = (): void => {
      this.getDashBoardStore().getRootFolderDetailsAPI(
         this.onSuccessGetRootFolderDetailsAPI
      )
   }

   hideWelcomeMessage = (): void => {
      const { hideWelcomeMessage } = this.welcomeMessageUIStore
      hideWelcomeMessage()
   }

   onDoubleClickFolder = (folderId: string): void => {
      const { history } = this.props
      this.hideWelcomeMessage()
      goToFolder(history, folderId)
   }

   onChangeOrder = (orderBy: string, folderId: string): void => {
      const { onChangeOrder } = this.getDashBoardStore()
      onChangeOrder(orderBy)
      this.getUserProjects()
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
      this.doNetworkCallForStarredFoldersAndPinnedWorkbooks()
   }

   onClickCancelOfShare = () => {
      this.shareFolderOrWorkbookModalRef.current?.closeModal()
   }

   get isMovingFolder(): boolean {
      return this.movingFolderId !== ''
   }

   get isMovingFolderPresentInHome(): boolean {
      const {
         activeFolderInfo: { folders }
      } = this.getDashBoardStore()
      if (folders) {
         return (
            folders.find(folder => folder.id === this.movingFolderId) !==
            undefined
         )
      }
      return false
   }

   get isMovingWorkbookPresentInHome(): boolean {
      const {
         activeFolderInfo: { workbooks }
      } = this.getDashBoardStore()
      if (workbooks) {
         return (
            workbooks.find(
               workbook => workbook.id === this.movingWorkbookId
            ) !== undefined
         )
      }
      return false
   }

   onSuccessMoveFolderOrWorkbook = (): void => {
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
         activeFolderInfo: { folders },
         starredFolders
      } = this.getDashBoardStore()
      let folderName = ''
      const starredFolder: BaseWorkbookAndFolderInfoItem = starredFolders.find(
         (folder: BaseWorkbookAndFolderInfoItem) => folder.id === folderId
      )
      if (folders) {
         const folder = folders.find(
            (folder: FolderInfoItem) => folder.id === folderId
         )
         if (folder) {
            folderName = folder.name
         } else if (starredFolder) {
            folderName = starredFolder.name
         }
      } else if (starredFolders) {
         if (starredFolder) {
            folderName = starredFolder.name
         }
      }
      return folderName
   }

   getWorkbookName = (workbookId: string): string => {
      const {
         activeFolderInfo: { workbooks },
         pinnedWorkbooks
      } = this.getDashBoardStore()
      let workbookName = ''
      const pinnedWorkbook: BaseWorkbookAndFolderInfoItem = pinnedWorkbooks.find(
         (workbook: BaseWorkbookAndFolderInfoItem) => workbook.id === workbookId
      )
      if (workbooks) {
         const workbook = workbooks.find(
            (workbook: WorkbookInfoItem) => workbook.id === workbookId
         )
         if (workbook) {
            workbookName = workbook.name
         } else if (pinnedWorkbook) {
            workbookName = pinnedWorkbook.name
         }
      } else if (pinnedWorkbooks) {
         if (pinnedWorkbook) {
            workbookName = pinnedWorkbook.name
         }
      }
      return workbookName
   }

   @action.bound
   onClickFolderMenuItem = (folderId: string, clickedItem: string): void => {
      const {
         setFolderName,
         openRenameModal,
         onActionFolderOrWorkbook,
         onChangeFolderOrWorkbookId,
         openDeleteModal,
         onChangeCurrentRoute
      } = this.props

      if (clickedItem === STAR_FOLDER || clickedItem === REMOVE_FROM_STARRED) {
         this.addOrRemoveFolderStar(folderId)
      } else if (clickedItem === RENAME) {
         onChangeFolderOrWorkbookId(folderId)
         setFolderName(folderId)
         openRenameModal()
         onActionFolderOrWorkbook(folder)
      } else if (clickedItem === DELETE) {
         onChangeFolderOrWorkbookId(folderId)
         setFolderName(folderId)
         onActionFolderOrWorkbook(folder)
         openDeleteModal()
         onChangeCurrentRoute(home)
      }
      if (clickedItem === SHARE) {
         this.shareFolderOrWorkbookModalRef.current?.openModal()
         this.shareFolderOrWorkbookAPI = this.getDashBoardStore().shareFolderAPI
         this.isFolder = true
         this.folderOrWorkbookID = folderId
         setFolderName(folderId)
         this.isPinnedOrStarred = this.isClickFolderStarred(folderId)
      }
      if (clickedItem === MOVE_TO) {
         this.openMoveModal()
         this.isMovingFolderOrWorkbook = true
         this.movingWorkbookId = ''
         this.movingFolderId = folderId
         this.movingFolderName = this.getFolderName(folderId)
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
         openDeleteModal,
         onChangeCurrentRoute
      } = this.props

      if (clickedItem === PIN || clickedItem === UNPIN) {
         this.pinOrUnpinWorkbook(workbookId)
      } else if (clickedItem === RENAME) {
         onChangeFolderOrWorkbookId(workbookId)
         setWorkbookName(workbookId)
         openRenameModal()
         onActionFolderOrWorkbook(workbook)
      } else if (clickedItem === DELETE) {
         onChangeFolderOrWorkbookId(workbookId)
         onActionFolderOrWorkbook(workbook)
         setWorkbookName(workbookId)
         openDeleteModal()
         onChangeCurrentRoute(home)
      }
      if (clickedItem === SHARE) {
         this.shareFolderOrWorkbookModalRef.current?.openModal()
         this.shareFolderOrWorkbookAPI = this.getDashBoardStore().shareWorkbookAPI
         this.isFolder = false
         this.folderOrWorkbookID = workbookId
         setWorkbookName(workbookId)
         this.isPinnedOrStarred = true
      }
      if (clickedItem === MOVE_TO) {
         this.openMoveModal()
         this.isMovingFolderOrWorkbook = true
         this.movingWorkbookId = workbookId
         this.movingFolderId = ''
         this.movingWorkbookName = this.getWorkbookName(workbookId)
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
      this.isMovingFolderOrWorkbook = false
   }

   renderMoveModalHeader = observer(
      (): ReactElement => {
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
   )

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
               folderId={moveRootFolderId}
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
      return (
         <RenderMenuItems
            role={role}
            hideWelcomeMessage={this.hideWelcomeMessage}
         />
      )
   }

   renderSearchBar = (): ReactElement => (
      <SearchAndAddButtonsContainer showAddWorkbookOrFolderButton={false} />
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
         getRootFolderDetailsAPIStatus,
         newlyCreatedFolderId
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
               isHomeRoute={true}
               goToFolder={this.onDoubleClickFolder}
               newlyCreatedFolderId={newlyCreatedFolderId}
            />
         )
      }
      return null
   }

   isClickFolderStarred = (id: string): boolean => {
      const { starredFolders } = this.getDashBoardStore()
      return starredFolders.findIndex(folder => folder.id === id) !== -1
   }

   //TODO: need to write a common wrapper for all the routes
   render(): ReactNode {
      const {
         getPinnedWorkbooksAndStarredFoldersAPIStatus,
         getPinnedWorkbooksAndStarredFoldersAPIError,
         pinnedWorkbooks,
         starredFolders,
         activeFolderInfo: { workbooks, folders, pathInfo },
         getRootFolderDetailsAPIStatus,
         getRootFolderDetailsAPIError,
         shareFolderOrWorkbookAPIStatus,
         getFolderIdOfAWorkbookAPIStatus,
         getUserProjectsAPIStatus,
         getUserProjectsAPIError
      } = this.getDashBoardStore()
      const {
         userProfileAPIStatus,
         userProfileAPIError,
         getuserProfileAPI,
         userDetails
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
            {isAPIFetching(
               getFolderIdOfAWorkbookAPIStatus,
               userProfileAPIStatus
            ) ? (
               <LoaderContainer>
                  <HomeLoaderContainer>
                     <LoadingView />
                  </HomeLoaderContainer>
               </LoaderContainer>
            ) : (
               <>
                  <FolderManagementDashBoard
                     getWorkbooksAndFoldersAPIStatus={getUserProjectsAPIStatus}
                     getWorkbooksAndFoldersAPIError={getUserProjectsAPIError}
                     getPinnedWorkbooksAndStarredFoldersAPIStatus={
                        getPinnedWorkbooksAndStarredFoldersAPIStatus
                     }
                     getPinnedWorkbooksAndStarredFoldersAPIError={
                        getPinnedWorkbooksAndStarredFoldersAPIError
                     }
                     doNetworkCallForStarredFoldersAndPinnedWorkbooks={
                        this.doNetworkCallForStarredFoldersAndPinnedWorkbooks
                     }
                     doNetworkCallForFoldersAndWorkbooks={this.getUserProjects}
                     pinnedWorkbooks={pinnedWorkbooks}
                     starredFolders={starredFolders}
                     workbooks={workbooks}
                     folders={folders}
                     onChangeOrder={this.onChangeOrder}
                     pathInfo={pathInfo}
                     onDoubleClickWorkbook={this.onDoubleClickWorkbook}
                     getRootFolderDetailsAPIStatus={
                        getRootFolderDetailsAPIStatus
                     }
                     getRootFolderDetailsAPIError={getRootFolderDetailsAPIError}
                     getRootFolderDetails={this.getRootFolderDetails}
                     onDoubleClickFolder={this.onDoubleClickFolder}
                     onClickFolderMenuItem={this.onClickFolderMenuItem}
                     onClickWorkbookMenuItem={this.onClickWorkbookMenuItem}
                     userDetails={userDetails}
                     getDashBoardStore={this.getDashBoardStore}
                  />
               </>
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
               isHomeRoute={true}
               isPinnedOrStarred={this.isPinnedOrStarred}
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
            {/* {this.renderAddWorkbookOrFolderOrNull()} */}
         </LayoutWithSideBar>
      )
   }
}

export default withRouter(
   withWorkbookOrFolderActions(FolderManagementDashBoardRoute)
)
