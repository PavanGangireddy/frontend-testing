import React, { ReactNode } from 'react'
import { observer, inject } from 'mobx-react'
import { observable, reaction } from 'mobx'
import { withTranslation } from 'react-i18next'
import { APIStatus, API_INITIAL } from '@ib/api-constants'

import BaseModalContainer from '../../Common/components/BaseModalContainer'
import CustomPopUp from '../../Common/components/CustomPopUp'
import {
   showFailureBottomCenterToast,
   showSuccessBottomCenterToast
} from '../../Common/utils/ToastUtils'
import {
   isAPIFetching,
   isAPIFailed,
   isAPISuccess
} from '../../Common/utils/APIUtils'
import { isMobileDevice } from '../../Common/utils/responsiveUtils'
import MobileBottomDeleteDrawer from '../../Common/components/MobileBottomCustomDrawer'
import StarredFolderIcon from '../../Common/icons/StarredFolderIcon'
import FolderIcon from '../../Common/icons/FolderIcon'
import WorkbookIcon from '../../Common/icons/WorkbookIcon'
import ProjectIcon from '../../Common/icons/ProjectIcon'
import StarredWorkbookIcon from '../../Common/icons/StarredWorkbookIcon'

import DashboardStore from '../stores/DashboardStore'
import {
   folder,
   Delete,
   home,
   SHARED_WITH_ME,
   HOME,
   FOLDER_NAME_MAX_LENGTH,
   WORKBOOK_NAME_MAX_LENGTH,
   FOLDER,
   PROJECT
} from '../constants/UIConstants'
import Rename from '../components/common/Rename'

import IDMFolderIcon from '../../Common/icons/IDMFolderIcon'
import IDMWorkbookIcon from '../../Common/icons/IDMWorkbookIcon'
import { Header, IconWrapper, Container, Name } from './styledComponents'

interface WithTranslationProps {
   i18n: any
   tReady: any
   t: any
}

interface InjectedProps extends WithTranslationProps {
   dashboardStore: DashboardStore
}

function withWorkbookOrFolderActions<T>(
   WrappedComponent: React.ComponentType<T>
) {
   @inject('dashboardStore')
   @observer
   class RenameComponent extends React.Component<T & InjectedProps> {
      @observable name!: string
      @observable actionsOnFolderOrWorkbook!: string
      @observable renameAPIStatus: APIStatus
      @observable renameAPIError!: any //TODO:type
      @observable folderOrWorkbookId!: string
      @observable deleteAPIStatus!: APIStatus
      @observable deleteAPIError!: any //TODO:need to write type
      @observable currentRoute!: any
      @observable isVisibleOpenDeleteDrawer: boolean
      @observable isVisibleRenameDrawer: boolean
      @observable folderOrWorkbookMiniInfo: any

      captureModalRef: React.RefObject<BaseModalContainer>
      deleteModalRef: React.RefObject<BaseModalContainer>

      constructor(props) {
         super(props)
         this.captureModalRef = React.createRef()
         this.deleteModalRef = React.createRef()
         this.renameAPIStatus = API_INITIAL
         this.isVisibleOpenDeleteDrawer = false
         this.isVisibleRenameDrawer = false
      }

      componentWillUnmount() {
         this.renameAPIStatusAsFolderAPIStatus()
         this.renameAPIStatusAsWorkbookAPIStatus()
         this.deleteAPIStatusAsFolderAPIStatus()
         this.deleteAPIStatusAsWorkbookAPIStatus()
      }

      getInjectedProps = (): InjectedProps => this.props as InjectedProps

      getDashBoardStore = (): any => this.getInjectedProps().dashboardStore //TODO:need to write type

      onChangeFolderOrWorkbookId = (folderOrWorkbookId: string): void => {
         this.folderOrWorkbookId = folderOrWorkbookId
      }

      onActionFolderOrWorkbook = (folderOrWorkbook: string): void => {
         this.actionsOnFolderOrWorkbook = folderOrWorkbook
      }

      openRenameModal = (): void => {
         if (isMobileDevice) {
            this.onClickOpenRenameDrawer()
         } else {
            this.captureModalRef.current?.openModal()
         }
      }

      closeRenameModal = (): void => {
         if (isMobileDevice) {
            this.onClickCloseRenameDrawer()
         } else {
            this.captureModalRef.current?.closeModal()
         }
      }

      renameAPIStatusAsFolderAPIStatus = reaction(
         () => this.getDashBoardStore().renameForFolderAPIStatus,
         () =>
            (this.renameAPIStatus = this.getDashBoardStore().renameForFolderAPIStatus)
      )

      renameAPIStatusAsWorkbookAPIStatus = reaction(
         () => this.getDashBoardStore().renameForWorkbookAPIStatus,
         () =>
            (this.renameAPIStatus = this.getDashBoardStore().renameForWorkbookAPIStatus)
      )

      onSuccessRenameToastMessage = (): void => {
         const { t } = this.props
         showSuccessBottomCenterToast(
            t('folderManagement:rename.renameSuccesMessage')
         )
         this.closeRenameModal()
      }

      onFailureFolderRenameToastMessage = (): void => {
         const { renameForFolderAPIError } = this.getDashBoardStore()
         showFailureBottomCenterToast(renameForFolderAPIError)
      }

      onFailureWorkbookRenameToastMessage = (): void => {
         const { renameForWorkbookAPIError } = this.getDashBoardStore()
         showFailureBottomCenterToast(renameForWorkbookAPIError)
      }

      onConfirmRename = async (
         name: string,
         onSuccessRename: Function,
         onFailureRename: Function
      ): Promise<void> => {
         const {
            renameForFolderAPI,
            renameForWorkbookAPI
         } = this.getDashBoardStore()

         if (this.actionsOnFolderOrWorkbook === folder) {
            await renameForFolderAPI(
               this.folderOrWorkbookId,
               name,
               this.onSuccessRenameToastMessage,
               this.onFailureFolderRenameToastMessage
            )
         } else {
            await renameForWorkbookAPI(
               this.folderOrWorkbookId,
               name,
               this.onSuccessRenameToastMessage,
               this.onFailureWorkbookRenameToastMessage
            )
         }

         if (isAPISuccess(this.renameAPIStatus)) {
            onSuccessRename(undefined)
         } else if (isAPIFailed(this.renameAPIStatus)) {
            onFailureRename(this.name)
         }
      }

      setFolderName = (folderId: string, currentRoute = home): void => {
         const {
            activeFolderInfo: { folders },
            starredFolders,
            sharedWithMeFolderInfo
         } = this.getDashBoardStore()
         let folderMiniInfo
         if (currentRoute === SHARED_WITH_ME) {
            folderMiniInfo = sharedWithMeFolderInfo.folders.find(
               folder => folder.id === folderId
            )
         } else {
            if (folders) {
               folderMiniInfo = folders.find(folder => folder.id === folderId)
            }
            if (!folderMiniInfo) {
               if (starredFolders) {
                  folderMiniInfo = starredFolders.find(
                     folder => folder.id === folderId
                  )
                  folderMiniInfo.isStarred = true
               }
            }
         }
         this.name = folderMiniInfo.name
         this.folderOrWorkbookMiniInfo = folderMiniInfo
      }

      setWorkbookName = (workbookId: string, currentRoute = home): void => {
         const {
            activeFolderInfo: { workbooks },
            pinnedWorkbooks,
            sharedWithMeFolderInfo
         } = this.getDashBoardStore()
         let workbookMiniInfo
         if (currentRoute === SHARED_WITH_ME) {
            workbookMiniInfo = sharedWithMeFolderInfo.workbooks.find(
               workbook => workbook.id === workbookId
            )
         } else {
            if (workbooks) {
               workbookMiniInfo = workbooks.find(
                  workbook => workbook.id === workbookId
               )
            }
            if (!workbookMiniInfo) {
               if (pinnedWorkbooks) {
                  workbookMiniInfo = pinnedWorkbooks.find(
                     workbook => workbook.id === workbookId
                  )
                  workbookMiniInfo.isPinned = true
               }
            }
         }

         this.name = workbookMiniInfo.name
         this.folderOrWorkbookMiniInfo = workbookMiniInfo
      }

      openDeleteModal = (): void => {
         if (isMobileDevice) {
            this.onClickOpenDeleteDrawer()
         } else {
            this.deleteModalRef.current?.openModal()
         }
      }

      closeDeleteModal = (): void => {
         this.deleteModalRef.current?.closeModal()
      }

      deleteAPIStatusAsFolderAPIStatus = reaction(
         () => this.getDashBoardStore().deleteFolderAPIStatus,
         () =>
            (this.deleteAPIStatus = this.getDashBoardStore().deleteFolderAPIStatus)
      )

      deleteAPIStatusAsWorkbookAPIStatus = reaction(
         () => this.getDashBoardStore().deleteWorkbookAPIStatus,
         () =>
            (this.deleteAPIStatus = this.getDashBoardStore().deleteWorkbookAPIStatus)
      )

      onSuccessDeleteToastMessage = (): void => {
         const { t } = this.props
         showSuccessBottomCenterToast(
            `${this.name} ${t('folderManagement:home.deletionSuccessMessage')}`
         )
         this.reloadHomePage()
         this.currentRoute = undefined
         if (isMobileDevice) {
            this.onClickCloseDeleteDrawer()
         } else {
            this.closeDeleteModal()
         }
      }

      onFailureFolderDeleteToastMessage = (): void => {
         const { deleteFolderAPIError } = this.getDashBoardStore()
         showFailureBottomCenterToast(deleteFolderAPIError)
      }

      onFailureWorkbookDeleteToastMessage = (): void => {
         const { deleteWorkbookAPIError } = this.getDashBoardStore()
         showFailureBottomCenterToast(deleteWorkbookAPIError)
      }

      onConfirmDelete = async (): Promise<void> => {
         const { deleteFolderAPI, deleteWorkbookAPI } = this.getDashBoardStore()
         if (this.actionsOnFolderOrWorkbook === folder) {
            await deleteFolderAPI(
               this.folderOrWorkbookId,
               this.onSuccessDeleteToastMessage,
               this.onFailureFolderDeleteToastMessage
            )
         } else {
            await deleteWorkbookAPI(
               this.folderOrWorkbookId,
               this.onSuccessDeleteToastMessage,
               this.onFailureWorkbookDeleteToastMessage
            )
         }
      }
      reloadHomePage = (): void => {
         if (this.currentRoute === HOME) {
            this.getDashBoardStore().getPinnedWorkbooksAndStarredFoldersAPI()
            this.getDashBoardStore().getUserProjectsAPI()
         }
      }

      onChangeCurrentRoute = (route: string): void => {
         this.currentRoute = route
      }

      deletionMessageForFolderOrWorkbook = (): string => {
         const { t } = this.props
         if (isMobileDevice) {
            if (this.actionsOnFolderOrWorkbook === folder) {
               const { type } = this.folderOrWorkbookMiniInfo
               if (type === PROJECT) {
                  return t(`folderManagement:home.project`)
               }
               return t(`folderManagement:home.folder`)
            }
            return t(`folderManagement:home.workbook`)
         }
         if (this.actionsOnFolderOrWorkbook === folder) {
            const { type } = this.folderOrWorkbookMiniInfo
            if (type === PROJECT) {
               return 'deletionMessageForProject'
            }
            return 'deletionMessageForFolder'
         }
         return 'deletionMessageForWorkbook'
      }

      isFolder = () => this.actionsOnFolderOrWorkbook === folder

      getMaxLength = (): number => {
         if (this.actionsOnFolderOrWorkbook === folder) {
            return FOLDER_NAME_MAX_LENGTH
         }
         return WORKBOOK_NAME_MAX_LENGTH
      }

      onClickCloseDeleteDrawer = (): void => {
         this.isVisibleOpenDeleteDrawer = false
      }

      onClickOpenDeleteDrawer = (): void => {
         this.isVisibleOpenDeleteDrawer = true
      }

      renderIcon = (): ReactNode => {
         if (this.folderOrWorkbookMiniInfo) {
            if (this.actionsOnFolderOrWorkbook === FOLDER) {
               const { type } = this.folderOrWorkbookMiniInfo
               if (type === PROJECT) {
                  return <ProjectIcon />
               }
               const {
                  folderOrWorkbookMiniInfo: { isStarred, isPublishedByUs }
               } = this
               return isPublishedByUs ? (
                  <IDMFolderIcon />
               ) : isStarred ? (
                  <StarredFolderIcon />
               ) : (
                  <FolderIcon />
               )
            }
            const {
               folderOrWorkbookMiniInfo: { isPinned, isPublishedByUs }
            } = this
            if (isPublishedByUs) {
               return <IDMWorkbookIcon />
            }
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
               <Container>
                  <Name>{name}</Name>
               </Container>
            </Header>
         )
      }

      onClickCloseRenameDrawer = (): void => {
         this.isVisibleRenameDrawer = false
      }

      onClickOpenRenameDrawer = (): void => {
         this.isVisibleRenameDrawer = true
      }

      render(): ReactNode {
         const props = this.props as T
         const { t } = this.props
         return (
            <>
               <WrappedComponent
                  {...props}
                  setFolderName={this.setFolderName}
                  openRenameModal={this.openRenameModal}
                  setWorkbookName={this.setWorkbookName}
                  onActionFolderOrWorkbook={this.onActionFolderOrWorkbook}
                  onChangeFolderOrWorkbookId={this.onChangeFolderOrWorkbookId}
                  openDeleteModal={this.openDeleteModal}
                  name={this.name}
                  onChangeCurrentRoute={this.onChangeCurrentRoute}
               />
               <Rename
                  currentName={this.name}
                  ref={this.captureModalRef}
                  onCancel={() => this.closeRenameModal()}
                  onConfirm={this.onConfirmRename}
                  renameAPIStatus={this.renameAPIStatus}
                  maxLength={this.getMaxLength()}
                  isVisibleRenameDrawer={this.isVisibleRenameDrawer}
                  onClickCloseRenameDrawer={this.onClickCloseRenameDrawer}
                  renderHeaderContent={this.renderHeaderContent()}
               />
               <CustomPopUp
                  ref={this.deleteModalRef}
                  onCancel={this.closeDeleteModal}
                  onConfirm={this.onConfirmDelete}
                  actionType={Delete}
                  description={t(
                     `folderManagement:home.${this.deletionMessageForFolderOrWorkbook()}`
                  )}
                  isSubmitButtonLoading={isAPIFetching(this.deleteAPIStatus)}
                  isCancelButtonDisabed={isAPIFetching(this.deleteAPIStatus)}
               />
               {isMobileDevice ? (
                  <MobileBottomDeleteDrawer
                     isVisible={this.isVisibleOpenDeleteDrawer}
                     headerContent={this.renderHeaderContent()}
                     closeDrawer={this.onClickCloseDeleteDrawer}
                     type={this.deletionMessageForFolderOrWorkbook()}
                     onClickDeleteButton={this.onConfirmDelete}
                     isDeleteButtonLoading={isAPIFetching(this.deleteAPIStatus)}
                     isCancelButtonDisabled={isAPIFetching(
                        this.deleteAPIStatus
                     )}
                  />
               ) : null}
            </>
         )
      }
   }
   return withTranslation('translation', { withRef: true })(RenameComponent)
}

export default withWorkbookOrFolderActions
