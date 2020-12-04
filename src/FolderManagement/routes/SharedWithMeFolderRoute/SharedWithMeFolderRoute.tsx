import React, { ReactNode, ReactElement } from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import UserStore from '../../../UserProfile/stores/UserStore'
import { isAPIFetching } from '../../../Common/utils/APIUtils'
import { showFailureBottomCenterToast } from '../../../Common/utils/ToastUtils'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import LayoutWithSideBar from '../../../Common/components/LayoutWithSideBar'
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
   goToFolder,
   goToSharedWithMeScreen
} from '../../utils/NavigationUtils.ts'
import {
   STAR_FOLDER,
   REMOVE_FROM_STARRED,
   PIN,
   UNPIN,
   SHARE,
   SHARED_WITH_ME,
   RENAME,
   WORKBOOK,
   DELETE,
   FOLDER,
   sharedWithMe
} from '../../constants/UIConstants'
import withWorkbookOrFolderActions from '../../hocs/withWorkbookOrFolderActions'

import SearchAndAddButtonsContainer from '../SearchAndAddButtonsContainer'
import { LoaderContainer, Container } from '../styledComponents'

interface InjectedProps extends RouteComponentProps {
   dashboardStore: DashboardStore
   userStore: UserStore
   setFolderName: (folderId: string) => void
   openRenameModal: () => void
   setWorkbookName: (workbookId: string) => void
   onActionFolderOrWorkbook: (folderOrWorkbook: string) => void
   onChangeFolderOrWorkbookId: (folderOrWorkbookId: string) => void
   openDeleteModal: () => void
}

@inject('dashboardStore', 'userStore')
@observer
class SharedWithMeFolderRoute extends React.Component<RouteComponentProps> {
   @observable folderOrWorkbookID
   @observable isFolder
   @observable shareFolderOrWorkbookModalRef
   @observable shareFolderOrWorkbookAPI
   constructor(props) {
      super(props)
      this.shareFolderOrWorkbookModalRef = React.createRef<BaseModalContainer>()
   }
   componentDidMount() {
      const { name } = this.getUserStore().userDetails
      if (!name) {
         this.getUserStore().getuserProfileAPI()
      }
      this.doNetworkCallForFoldersAndWorkbooks()
   }

   //TODO:need to clear store

   doNetworkCallForFoldersAndWorkbooks = () => {
      this.getDashBoardStore().getSharedWorkbooksAndFoldersAPI()
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getDashBoardStore = () => this.getInjectedProps().dashboardStore

   getUserStore = () => this.getInjectedProps().userStore

   onDoubleClickFolder = (folderId: string) => {
      if (folderId === SHARED_WITH_ME) {
         const { history } = this.props
         goToSharedWithMeScreen(history)
      } else {
         const { history } = this.props
         goToFolder(history, folderId, true)
      }
   }

   onDoubleClickWorkbook = async (workbookId: string) => {
      const { history } = this.props
      const { getFolderIdOfAWorkbookAPI } = this.getDashBoardStore()
      await getFolderIdOfAWorkbookAPI(
         workbookId,
         folderIdOfAWorkbook =>
            goToWorkbookPage(history, folderIdOfAWorkbook, workbookId),
         showFailureBottomCenterToast
      )
      return
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
         setFolderName(folderId, sharedWithMe)
         openRenameModal()
         onActionFolderOrWorkbook(FOLDER)
      } else if (clickedItem === DELETE) {
         onChangeFolderOrWorkbookId(folderId)
         onActionFolderOrWorkbook(FOLDER)
         setFolderName(folderId, sharedWithMe)
         openDeleteModal()
      }
      if (clickedItem === SHARE) {
         this.shareFolderOrWorkbookModalRef.current?.openModal()
         this.shareFolderOrWorkbookAPI = this.getDashBoardStore().shareFolderAPI
         setFolderName(folderId, sharedWithMe)
         this.isFolder = true
         this.folderOrWorkbookID = folderId
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
         setWorkbookName(workbookId, sharedWithMe)
         openRenameModal()
         onActionFolderOrWorkbook(WORKBOOK)
      } else if (clickedItem === DELETE) {
         onChangeFolderOrWorkbookId(workbookId)
         onActionFolderOrWorkbook(WORKBOOK)
         setWorkbookName(workbookId, sharedWithMe)
         openDeleteModal()
      }
      if (clickedItem === SHARE) {
         this.shareFolderOrWorkbookModalRef.current?.openModal()
         this.shareFolderOrWorkbookAPI = this.getDashBoardStore().shareWorkbookAPI
         this.isFolder = false
         this.folderOrWorkbookID = workbookId
         setWorkbookName(workbookId, sharedWithMe)
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
   renderExpandedMenu = (): ReactNode => {
      const { role } = this.getUserStore().userDetails
      return <RenderMenuItems role={role} />
   }

   renderFilterBar = (): ReactNode => {
      if (isMobileDevice) {
         return null
      }
      return (
         <SearchAndAddButtonsContainer
            showAddWorkbookOrFolderButton={false}
            isSharedWithMeRoute={true}
         />
      )
   }

   renderSearchBar = (): ReactElement => (
      <SearchAndAddButtonsContainer showAddWorkbookOrFolderButton={false} />
   )

   //TODO: need to write a common wrapper for all the routes
   render() {
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
            {this.renderFilterBar()}

            {isAPIFetching(getFolderIdOfAWorkbookAPIStatus) ? (
               <LoaderContainer>
                  <LoadingView />
               </LoaderContainer>
            ) : (
               <Container>
                  <UserWorkbooksAndFolders
                     getWorkbooksAndFoldersAPIStatus={
                        this.getDashBoardStore()
                           .getSharedWithMeWorkbooksAndFoldersAPIStatus
                     }
                     getWorkbooksAndFoldersAPIError={
                        this.getDashBoardStore()
                           .getSharedWithMeWorkbooksAndFoldersAPIError
                     }
                     doNetworkCallForFoldersAndWorkbooks={
                        this.doNetworkCallForFoldersAndWorkbooks
                     }
                     userWorkbooks={
                        this.getDashBoardStore().sharedWithMeFolderInfo
                           .workbooks
                     }
                     userFolders={
                        this.getDashBoardStore().sharedWithMeFolderInfo.folders
                     }
                     onChangeOrder={this.onChangeOrder}
                     pathInfo={
                        this.getDashBoardStore().sharedWithMeFolderInfo.pathInfo
                     }
                     onDoubleClickFolder={this.onDoubleClickFolder}
                     onDoubleClickWorkbook={this.onDoubleClickWorkbook}
                     onClickFolderMenuItem={this.onClickFolderMenuItem}
                     onClickWorkbookMenuItem={this.onClickWorkbookMenuItem}
                     isSharedWithMe={true}
                     currentRoute={sharedWithMe}
                  />
               </Container>
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
         </LayoutWithSideBar>
      )
   }
}

export default withRouter(withWorkbookOrFolderActions(SharedWithMeFolderRoute))
