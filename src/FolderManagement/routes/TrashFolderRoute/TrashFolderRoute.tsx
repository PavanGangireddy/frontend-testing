import React, { ReactNode, ReactElement } from 'react'
import { observable, action, reaction } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import LayoutWithSideBar from '../../../Common/components/LayoutWithSideBar'
import UserStore from '../../../UserProfile/stores/UserStore'
import {
   showSuccessBottomCenterToast,
   showFailureBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import CustomPopUp from '../../../Common/components/CustomPopUp'
import { isAPIFetching } from '../../../Common/utils/APIUtils'
import LoadingView from '../../../Common/components/LoadingWrapper/LoadingView'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import MobileBottomDeleteDrawer from '../../../Common/components/MobileBottomCustomDrawer'
import StarredFolderIcon from '../../../Common/icons/StarredFolderIcon'
import WorkbookIcon from '../../../Common/icons/WorkbookIcon'
import FolderIcon from '../../../Common/icons/FolderIcon'
import StarredWorkbookIcon from '../../../Common/icons/StarredWorkbookIcon'

import DashboardStore from '../../stores/DashboardStore'
import UserWorkbooksAndFolders from '../../components/UserWorkbooksAndFolders'
import {
   CollapsedFooterWithProfilePic,
   CollapsedHeaderWithIcons,
   ExpandedFooterWithUserProfileLayout,
   RenderMenuItems
} from '../../components/CollapsibleSideNavbarComponents'
import {
   trash,
   RESTORE,
   DELETE_FOREVER,
   WORKBOOK,
   Delete,
   FOLDER,
   emptyTrash
} from '../../constants/UIConstants'

import SearchAndAddButtonsContainer from '../SearchAndAddButtonsContainer'
import {
   LoaderContainer,
   Container,
   Header,
   IconWrapper,
   NameContainer,
   Name,
   EmptyTrashHeader,
   TrashHeaderWrapper
} from '../styledComponents'
import { Title } from '../../components/common/WorkbooksAndFoldersFilterBar/styledComponents'
import TrashRouteLoadingSkeleton from './TrashRouteLoadingSkeleton'

interface WithTranslationProps {
   i18n: any
   tReady: any
   t: any
}

interface InjectedProps extends RouteComponentProps, WithTranslationProps {
   dashboardStore: DashboardStore
   userStore: UserStore
}

@inject('dashboardStore', 'userStore')
@observer
class TrashFolderRoute extends React.Component<RouteComponentProps> {
   @observable folderOrWorkbookId
   @observable isFolder
   @observable shareFolderOrWorkbookModalRef
   @observable shareFolderOrWorkbookAPI
   @observable name
   @observable actionsOnFolderOrWorkbook
   @observable deleteForeverAPIStatus
   @observable isVisibleOpenDeleteDrawer
   @observable folderOrWorkbookMiniInfo
   @observable isVisibleEmptyTrashDrawer
   deleteForeverModalRef: React.RefObject<BaseModalContainer>
   emptyTrashModalRef: React.RefObject<BaseModalContainer>
   constructor(props) {
      super(props)
      this.shareFolderOrWorkbookModalRef = React.createRef<BaseModalContainer>()
      this.deleteForeverModalRef = React.createRef()
      this.emptyTrashModalRef = React.createRef()
      this.isVisibleOpenDeleteDrawer = false
      this.isVisibleEmptyTrashDrawer = false
   }

   componentDidMount() {
      const { name } = this.getUserStore().userDetails
      if (!name) {
         this.getUserStore().getuserProfileAPI()
      }
      this.doNetworkCallForFoldersAndWorkbooks()
   }

   componentWillUnmount() {
      this.deleteForeverAPIStatusAsFolderAPIStatus()
      this.deleteForeverAPIStatusAsWorkbookAPIStatus()
   }

   //TODO:need to clear the store

   doNetworkCallForFoldersAndWorkbooks = () => {
      this.getDashBoardStore().trashFoldersAndWorkbooksAPI()
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getDashBoardStore = () => this.getInjectedProps().dashboardStore

   getUserStore = () => this.getInjectedProps().userStore

   onDoubleClickFolder = async (folderId: string): Promise<void> => {}

   onDoubleClickWorkbook = (workbookId: string): void => {}

   onChangeOrder = (orderBy: string, folderId: string): void => {
      const { onChangeOrder } = this.getDashBoardStore()
      onChangeOrder(orderBy)
      this.doNetworkCallForFoldersAndWorkbooks()
   }

   setFolderName = (folderId: string): void => {
      const {
         trashFolderInfo: { folders }
      } = this.getDashBoardStore()
      const folderMiniInfo = folders.find(folder => folder.id === folderId)

      this.name = folderMiniInfo.name
      this.folderOrWorkbookMiniInfo = folderMiniInfo
   }

   setWorkbookName = (workbookId: string): void => {
      const {
         trashFolderInfo: { workbooks }
      } = this.getDashBoardStore()
      const workbookMiniInfo = workbooks.find(
         workbook => workbook.id === workbookId
      )

      this.name = workbookMiniInfo.name
      this.folderOrWorkbookMiniInfo = workbookMiniInfo
   }

   onSuccessRestoreToastMessage = (): void => {
      const { t } = this.props
      showSuccessBottomCenterToast(
         `${this.name} ${t('folderManagement:trash.restoreSuccessMessage')}`
      )
   }

   onFailureRestoreFolderToastMessage = (): void => {
      const { restoreFolderAPIError } = this.getDashBoardStore()
      showFailureBottomCenterToast(restoreFolderAPIError)
   }

   openDeleteForeverModal = (): void => {
      this.deleteForeverModalRef.current?.openModal()
   }

   closeDeleteForeverModal = (): void => {
      this.deleteForeverModalRef.current?.closeModal()
   }

   deleteForeverAPIStatusAsFolderAPIStatus = reaction(
      () => this.getDashBoardStore().deleteForeverFolderAPIStatus,
      () =>
         (this.deleteForeverAPIStatus = this.getDashBoardStore().deleteForeverFolderAPIStatus)
   )

   deleteForeverAPIStatusAsWorkbookAPIStatus = reaction(
      () => this.getDashBoardStore().deleteForeverWorkbookAPIStatus,
      () =>
         (this.deleteForeverAPIStatus = this.getDashBoardStore().deleteForeverWorkbookAPIStatus)
   )

   onSuccessDeleteForeverToastMessage = (): void => {
      const { t } = this.props
      showSuccessBottomCenterToast(
         `${this.name} ${t('folderManagement:home.deletionSuccessMessage')}`
      )
      if (isMobileDevice) {
         this.onClickCloseDeleteDrawer()
      } else {
         this.closeDeleteForeverModal()
      }
   }

   onFailureFolderDeleteForeverToastMessage = (): void => {
      const { deleteForeverFolderAPIError } = this.getDashBoardStore()
      showFailureBottomCenterToast(deleteForeverFolderAPIError)
   }

   onFailureWorkbookDeleteForeverToastMessage = (): void => {
      const { deleteForeverWorkbookAPIError } = this.getDashBoardStore()
      showFailureBottomCenterToast(deleteForeverWorkbookAPIError)
   }

   onConfirmDelete = async (): Promise<void> => {
      const {
         deleteForeverFolderAPI,
         deleteForeverWorkbookAPI
      } = this.getDashBoardStore()
      if (this.actionsOnFolderOrWorkbook === FOLDER) {
         await deleteForeverFolderAPI(
            this.folderOrWorkbookId,
            this.onSuccessDeleteForeverToastMessage,
            this.onFailureFolderDeleteForeverToastMessage
         )
      } else {
         await deleteForeverWorkbookAPI(
            this.folderOrWorkbookId,
            this.onSuccessDeleteForeverToastMessage,
            this.onFailureWorkbookDeleteForeverToastMessage
         )
      }
   }

   @action.bound
   onClickFolderMenuItem = async (
      folderId: string,
      clickedItem: string
   ): Promise<void> => {
      const { restoreFolderAPI } = this.getDashBoardStore()
      this.folderOrWorkbookId = folderId
      this.actionsOnFolderOrWorkbook = FOLDER
      this.setFolderName(folderId)
      switch (clickedItem) {
         case RESTORE:
            await restoreFolderAPI(
               folderId,
               this.onSuccessRestoreToastMessage,
               this.onFailureRestoreFolderToastMessage
            )
            this.doNetworkCallForFoldersAndWorkbooks()
            return
         case DELETE_FOREVER:
            {
               if (isMobileDevice) {
                  this.onClickOpenDeleteDrawer()
               } else {
                  this.openDeleteForeverModal()
               }
            }

            return
      }
   }

   onFailureRestoreWorkbookToastMessage = (): void => {
      const { restoreWorkbookAPIError } = this.getDashBoardStore()
      showFailureBottomCenterToast(restoreWorkbookAPIError)
   }

   @action.bound
   onClickWorkbookMenuItem = async (
      workbookId: string,
      clickedItem: string
   ): Promise<void> => {
      const { restoreWorkbookAPI } = this.getDashBoardStore()
      this.folderOrWorkbookId = workbookId
      this.actionsOnFolderOrWorkbook = WORKBOOK
      this.setWorkbookName(workbookId)
      switch (clickedItem) {
         case RESTORE:
            await restoreWorkbookAPI(
               workbookId,
               this.onSuccessRestoreToastMessage,
               this.onFailureRestoreWorkbookToastMessage
            )
            this.doNetworkCallForFoldersAndWorkbooks()
            return
         case DELETE_FOREVER:
            {
               if (isMobileDevice) {
                  this.onClickOpenDeleteDrawer()
               } else {
                  this.openDeleteForeverModal()
               }
            }
            return
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

   isEmptyTrash = (): boolean => {
      const {
         trashFolderInfo: { folders, workbooks }
      } = this.getDashBoardStore()

      if (folders || workbooks) {
         if (folders.length !== 0 || workbooks.length !== 0) {
            return false
         }
         return true
      }

      return true
   }

   deletionMessageForFolderOrWorkbook = (): string => {
      const { t } = this.props
      if (isMobileDevice) {
         if (this.actionsOnFolderOrWorkbook === FOLDER) {
            return t(`folderManagement:trash.folderPermanently`)
         }
         return t(`folderManagement:trash.workbookPermanently`)
      }
      if (this.actionsOnFolderOrWorkbook === FOLDER) {
         return 'deletionMessageForFolder'
      }
      return 'deletionMessageForWorkbook'
   }

   openEmptyTrashModal = (): void => {
      if (isMobileDevice) {
         this.onClickOpenEmptyTrashDrawer()
      } else {
         this.emptyTrashModalRef.current?.openModal()
      }
   }

   closeEmptyTrashModal = (): void => {
      if (isMobileDevice) {
         this.onClickCloseEmptyTrashDrawer()
      } else {
         this.emptyTrashModalRef.current?.closeModal()
      }
   }

   onSuccessEmptyTrashToastMessage = () => {
      const { t } = this.props
      showSuccessBottomCenterToast(
         `${t('folderManagement:trash.emptyTrashSuccessToastMessage')}`
      )
      this.closeEmptyTrashModal()
   }

   onFailureEmptyTrashToastMessage = () => {
      const { emptyTrashAPIError } = this.getDashBoardStore()
      showFailureBottomCenterToast(emptyTrashAPIError)
   }

   onConfirmEmptyTrash = async (): Promise<void> => {
      const { emptyTrashAPI } = this.getDashBoardStore()

      await emptyTrashAPI(
         this.onSuccessEmptyTrashToastMessage,
         this.onFailureEmptyTrashToastMessage
      )
   }

   onClickEmptyTrash = (): void => {
      this.openEmptyTrashModal()
   }

   renderFilterBar = (): ReactNode => {
      if (isMobileDevice) {
         return null
      }
      return (
         <TrashHeaderWrapper>
            <SearchAndAddButtonsContainer
               showAddWorkbookOrFolderButton={false}
               currentRoute={trash}
               isEmptyTrash={this.isEmptyTrash()}
               onClickEmptyTrash={this.onClickEmptyTrash}
            />
         </TrashHeaderWrapper>
      )
   }

   renderSearchBar = (): ReactElement => (
      <SearchAndAddButtonsContainer showAddWorkbookOrFolderButton={false} />
   )

   onClickCloseDeleteDrawer = (): void => {
      this.isVisibleOpenDeleteDrawer = false
   }

   onClickOpenDeleteDrawer = (): void => {
      this.isVisibleOpenDeleteDrawer = true
   }
   renderIcon = (): ReactNode => {
      if (this.folderOrWorkbookMiniInfo) {
         if (this.actionsOnFolderOrWorkbook === FOLDER) {
            const {
               folderOrWorkbookMiniInfo: { isStarred }
            } = this
            return isStarred ? <StarredFolderIcon /> : <FolderIcon />
         }
         const {
            folderOrWorkbookMiniInfo: { isPinned }
         } = this
         if (isPinned) {
            return <StarredWorkbookIcon />
         }
         return <WorkbookIcon />
      }
   }

   renderHeaderContent = (): ReactNode => {
      const { name } = this
      return (
         <Header>
            <IconWrapper>{this.renderIcon()}</IconWrapper>
            <NameContainer>
               <Name>{name}</Name>
            </NameContainer>
         </Header>
      )
   }

   onClickCloseEmptyTrashDrawer = (): void => {
      this.isVisibleEmptyTrashDrawer = false
   }

   onClickOpenEmptyTrashDrawer = (): void => {
      this.isVisibleEmptyTrashDrawer = true
   }

   renderEmptyTrashHeaderContent = (): ReactNode => {
      const { t } = this.props
      return (
         <EmptyTrashHeader>
            {t(`folderManagement:trash.delete`)}
         </EmptyTrashHeader>
      )
   }

   //TODO: need to write a common wrapper for all the routes
   render(): ReactNode {
      const {
         trashFoldersAndWorkbooksAPIStatus,
         trashFoldersAndWorkbooksAPIError,
         trashFolderInfo: { folders, workbooks },
         emptyTrashAPIStatus,
         getFolderIdOfAWorkbookAPIStatus
      } = this.getDashBoardStore()
      const {
         userProfileAPIStatus,
         userProfileAPIError,
         getuserProfileAPI
      } = this.getUserStore()
      const { t } = this.props
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
            {this.isEmptyTrash() ? null : this.renderFilterBar()}

            {isAPIFetching(getFolderIdOfAWorkbookAPIStatus) ? (
               <LoaderContainer>
                  <LoadingView />
               </LoaderContainer>
            ) : (
               <Container isEmptyTrash={this.isEmptyTrash()}>
                  <UserWorkbooksAndFolders
                     renderLoadingView={() => <TrashRouteLoadingSkeleton />}
                     getWorkbooksAndFoldersAPIStatus={100}
                     getWorkbooksAndFoldersAPIError={
                        trashFoldersAndWorkbooksAPIError
                     }
                     doNetworkCallForFoldersAndWorkbooks={
                        this.doNetworkCallForFoldersAndWorkbooks
                     }
                     userWorkbooks={workbooks}
                     userFolders={folders}
                     onChangeOrder={this.onChangeOrder}
                     pathInfo={[]}
                     onDoubleClickFolder={this.onDoubleClickFolder}
                     onDoubleClickWorkbook={this.onDoubleClickWorkbook}
                     onClickFolderMenuItem={this.onClickFolderMenuItem}
                     onClickWorkbookMenuItem={this.onClickWorkbookMenuItem}
                     currentRoute={trash}
                     isEmptyTrash={this.isEmptyTrash()}
                     onClickEmptyTrash={this.onClickEmptyTrash}
                  />
               </Container>
            )}
            <CustomPopUp
               ref={this.deleteForeverModalRef}
               onCancel={this.closeDeleteForeverModal}
               onConfirm={this.onConfirmDelete}
               actionType={Delete}
               description={t(
                  `folderManagement:trash.${this.deletionMessageForFolderOrWorkbook()}`
               )}
               isSubmitButtonLoading={isAPIFetching(
                  this.deleteForeverAPIStatus
               )}
               isCancelButtonDisabed={isAPIFetching(
                  this.deleteForeverAPIStatus
               )}
            />
            <CustomPopUp
               ref={this.emptyTrashModalRef}
               onCancel={this.closeEmptyTrashModal}
               onConfirm={this.onConfirmEmptyTrash}
               actionType={emptyTrash}
               description={t(`folderManagement:trash.emptyTrashMessage`)}
               isSubmitButtonLoading={isAPIFetching(emptyTrashAPIStatus)}
               isCancelButtonDisabed={isAPIFetching(emptyTrashAPIStatus)}
            />
            {isMobileDevice ? (
               <>
                  <MobileBottomDeleteDrawer
                     isVisible={this.isVisibleOpenDeleteDrawer}
                     headerContent={this.renderHeaderContent()}
                     closeDrawer={this.onClickCloseDeleteDrawer}
                     type={this.deletionMessageForFolderOrWorkbook()}
                     onClickDeleteButton={this.onConfirmDelete}
                     isDeleteButtonLoading={isAPIFetching(
                        this.deleteForeverAPIStatus
                     )}
                     isCancelButtonDisabled={isAPIFetching(
                        this.deleteForeverAPIStatus
                     )}
                  />
                  <MobileBottomDeleteDrawer
                     isVisible={this.isVisibleEmptyTrashDrawer}
                     headerContent={this.renderEmptyTrashHeaderContent()}
                     closeDrawer={this.onClickCloseEmptyTrashDrawer}
                     type={t(`folderManagement:trash.trashFiles`)}
                     onClickDeleteButton={this.onConfirmEmptyTrash}
                     isDeleteButtonLoading={isAPIFetching(emptyTrashAPIStatus)}
                     isCancelButtonDisabled={isAPIFetching(emptyTrashAPIStatus)}
                  />
               </>
            ) : null}
         </LayoutWithSideBar>
      )
   }
}
export default withTranslation()(withRouter(TrashFolderRoute))
