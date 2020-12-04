import React, { Component, ReactNode, ReactElement } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next' //eslint-disable-line
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { APIStatus } from '@ib/api-constants'
import { History } from 'history'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import {
   getLoadingStatus,
   isAPIFailed,
   isAPIFetching
} from '../../../Common/utils/APIUtils'
import {
   showSuccessBottomCenterToast,
   showFailureBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import CloseIcon from '../../../Common/icons/CloseIcon'
import Colors from '../../../Common/themes/Colors'
import {
   validateEmpty,
   ErrorObject
} from '../../../Common/utils/ValidationUtils'
import TextInput from '../../../Common/components/TextInput'
import { FOLDER } from '../../../Common/constants/UIConstants'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import BottomDrawerWithHeader from '../../../Common/components/BottomDrawerWithHeader'

import DashboardStore from '../../stores/DashboardStore'

import {
   itemsViewOptions,
   orderOptions,
   sharedWithMeSortOptions,
   createOptions,
   home,
   trash,
   FOLDER_NAME_MAX_LENGTH,
   WORKBOOK_NAME_MAX_LENGTH,
   PROJECT,
   HOME
} from '../../constants/UIConstants'
import WorkbookInfoItem from '../../stores/models/WorkbookInfoItem'
import FolderInfoItem from '../../stores/models/FolderInfoItem'
import PathInfoItem from '../../stores/models/PathInfoItem'
import { goToWorkbookPage } from '../../utils/NavigationUtils.ts'

import WorkbooksAndFoldersFilterBar from '../common/WorkbooksAndFoldersFilterBar'
import WorkbooksAndFolders from '../WorkbooksAndFolders'
import NoDataView from '../NoDataView'

import {
   UserWorkbooksAndFoldersContainer,
   WorkbooksAndFoldersContainer,
   ModalHeading,
   BaseInputContainer,
   FooterMainContainer,
   CancelButton,
   CancelButtonText,
   CreateButton,
   CreateButtonText,
   ModalBodyContainer,
   StyledIconContainer,
   NoDataContainer,
   DrawerHeading,
   InputCSS,
   loaderContainerClassName,
   EmptyTrash
} from './styledComponents'

interface UserWorkbooksAndFoldersProps
   extends RouteComponentProps,
      WithTranslation {
   onChangeOrder: (orderBy: string, folderId: string) => void
   userWorkbooks: Array<WorkbookInfoItem>
   userFolders: Array<FolderInfoItem>
   pathInfo: Array<PathInfoItem>
   getWorkbooksAndFoldersAPIStatus: APIStatus
   getWorkbooksAndFoldersAPIError: Error
   doNetworkCallForFoldersAndWorkbooks: (folderId: string) => void
   onDoubleClickWorkbook: (workbookId: string) => void
   getRootFolderDetailsAPIStatus: APIStatus
   getRootFolderDetailsAPIError: Error
   getRootFolderDetails: () => void
   onDoubleClickFolder: (folderId: string) => void
   match: any //TODO:need to write type
   onClickFolderMenuItem: (folderId: string, clickedItem: string) => void
   onClickWorkbookMenuItem: (workbookId: string, clickedItem: string) => void
   isSharedWithMe: boolean
   currentRoute: string
   isEmptyTrash?: boolean
   onClickEmptyTrash?: () => void
   history: History
   renderLoadingView?: () => ReactNode
}

interface InjectedProps extends UserWorkbooksAndFoldersProps {
   dashboardStore: DashboardStore
}

//TODO: Need to refactor props and add i18n strings

@inject('dashboardStore')
@observer
class UserWorkbooksAndFolders extends Component<InjectedProps> {
   @observable itemsView: string
   @observable orderBy: { label: string; value: string }
   @observable folderId!: string
   @observable folderOrWorkbookName: string
   @observable createType: string
   @observable isVisibleCreateWorkbookOrFolder: boolean
   modalRef
   folderOrWorkbookNameRef

   static defaultProps = {
      isSharedWithMe: false,
      currentRoute: home
   }

   constructor(props) {
      super(props)
      this.itemsView = itemsViewOptions.GRID
      this.orderBy = this.getSortOptions()[0]
      this.modalRef = React.createRef<BaseModalContainer>()
      this.folderOrWorkbookNameRef = React.createRef<TextInput>()
      this.createType = ''
      this.folderOrWorkbookName = ''
      this.isVisibleCreateWorkbookOrFolder = false
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getDashBoardStore = (): DashboardStore =>
      this.getInjectedProps().dashboardStore

   openModal = (ref): void => {
      if (isMobileDevice) {
         this.onClickCreateWorkbookOrFolderDrawer()
      } else {
         ref.current.openModal()
      }
   }

   closeModal = (ref): void => {
      this.resetFolderOrWorkbookName()
      if (isMobileDevice) {
         this.onClickCloseCreateWorkbookOrFolderDrawer()
      } else {
         ref.current.closeModal()
      }
   }

   componentDidMount() {
      const { match } = this.props
      this.folderId = match.params.folderId
   }

   onClickGridView = (): void => {
      this.itemsView = itemsViewOptions.GRID
   }

   onClickListView = (): void => {
      this.itemsView = itemsViewOptions.LIST
   }

   @action.bound
   onChangeOrder = (updatedOrder): void => {
      this.orderBy = updatedOrder
      const { onChangeOrder } = this.props
      onChangeOrder(this.orderBy.value, this.folderId)
   }

   onClickAddProject = (type: string): void => {
      this.createType = type
      this.openModal(this.modalRef)
   }

   onClickAddFolder = (type: string): void => {
      this.createType = type
      this.openModal(this.modalRef)
   }

   onClickAddWorkbook = (type: string): void => {
      this.createType = type
      this.openModal(this.modalRef)
   }

   renderCreateModalHeader = (): React.ReactNode => (
      <ModalHeading>{`Create ${this.createType.toLowerCase()}`}</ModalHeading>
   )

   renderCreateDrawerHeader = (): ReactNode => {
      const { t } = this.props
      return (
         <DrawerHeading>{`Create ${this.createType.toLowerCase()}`}</DrawerHeading>
      )
   }

   onFolderOrWorkbookNameChange = (e): void => {
      this.folderOrWorkbookName = e.target.value
   }

   validateInput = (): ErrorObject => validateEmpty(this.folderOrWorkbookName)

   isFolder = (): boolean => this.createType === FOLDER

   isProject = (): boolean => this.createType === PROJECT

   getInputMaxLength = (): number => {
      if (this.isFolder() || this.isProject()) {
         return FOLDER_NAME_MAX_LENGTH
      }
      return WORKBOOK_NAME_MAX_LENGTH
   }

   renderInput = (): React.ReactNode => (
      <BaseInputContainer>
         <TextInput
            ref={this.folderOrWorkbookNameRef}
            placeholder={`Enter ${this.createType.toLowerCase()} name`}
            value={this.folderOrWorkbookName}
            onChange={this.onFolderOrWorkbookNameChange}
            validate={this.validateInput}
            maxLength={this.getInputMaxLength()}
            inputCSS={InputCSS}
         />
      </BaseInputContainer>
   )

   isHomeFolderPage = (folderId: string): boolean => folderId === undefined

   getFolderID = (): string => {
      const { match } = this.props
      const { rootFolderId } = this.getDashBoardStore()
      const folderId = match.params.folderId
      if (this.isHomeFolderPage(folderId)) {
         return rootFolderId
      }
      return folderId
   }

   resetFolderOrWorkbookName = (): void => {
      this.folderOrWorkbookName = ''
   }

   onCreationSuccess = (folderId: string, workbookId: string | null): void => {
      const { history } = this.props
      const {
         getWorkbooksAndFoldersAPI,
         getSharedWorkbooksAndFoldersOfASubFolderAPI,
         newlyCreatedFolderId
      } = this.getDashBoardStore()
      const { t, currentRoute, onDoubleClickFolder } = this.props
      this.resetFolderOrWorkbookName()
      showSuccessBottomCenterToast(
         `${t('folderManagement:home.createWorkbookOrFolderSucceesMessage')}`
      )
      this.closeModal(this.modalRef)
      if (this.props.isSharedWithMe) {
         getSharedWorkbooksAndFoldersOfASubFolderAPI(folderId)
      } else {
         if (currentRoute === home) {
            onDoubleClickFolder(newlyCreatedFolderId)
         } else {
            if (workbookId) {
               goToWorkbookPage(history, folderId, workbookId)
            } else {
               getWorkbooksAndFoldersAPI(folderId)
            }
         }
      }
   }

   onCreationFailure = (): void => {
      const { createFolderOrWorkbookAPIError } = this.getDashBoardStore()
      this.resetFolderOrWorkbookName()
      showFailureBottomCenterToast(createFolderOrWorkbookAPIError)
      this.closeModal(this.modalRef)
   }

   isReadyToCreate = (): boolean =>
      !this.folderOrWorkbookNameRef.current?.isError

   onCreate = (e): void => {
      e.preventDefault()
      const { createFolderAPI, createWorkbookAPI } = this.getDashBoardStore()
      this.folderOrWorkbookName = this.folderOrWorkbookName.trim()
      this.folderOrWorkbookNameRef.current?.validateInput()

      if (this.isReadyToCreate()) {
         const folderId = this.getFolderID()
         let requestObject
         if (
            this.createType === createOptions.folder ||
            this.createType === PROJECT
         ) {
            requestObject = {
               parent_folder_id: folderId,
               folder_name: this.folderOrWorkbookName
            }
            createFolderAPI(
               requestObject,
               () => this.onCreationSuccess(folderId, null),
               this.onCreationFailure
            )
         } else {
            requestObject = {
               folder_id: folderId,
               workbook_name: this.folderOrWorkbookName
            }
            createWorkbookAPI(
               requestObject,
               (workbookId: string) =>
                  this.onCreationSuccess(folderId, workbookId),
               this.onCreationFailure
            )
         }
      }
   }

   renderModalFooter = (): React.ReactNode => {
      const { createFolderOrWorkbookAPIStatus } = this.getDashBoardStore()
      return (
         <FooterMainContainer>
            <CancelButton
               onClick={(): void => this.closeModal(this.modalRef)}
               variant={CancelButton.variants.secondary}
               disabled={isAPIFetching(createFolderOrWorkbookAPIStatus)}
               id={'cancelButton'}
               type={'reset'}
            >
               <CancelButtonText>{'Cancel'}</CancelButtonText>
            </CancelButton>
            <CreateButton
               type={'submit'}
               variant='primary'
               isLoading={isAPIFetching(createFolderOrWorkbookAPIStatus)}
               id={'createButton'}
            >
               <CreateButtonText>{'Create'}</CreateButtonText>
            </CreateButton>
         </FooterMainContainer>
      )
   }

   renderCreateFolderOrWorkbookDrawerContent = (): React.ReactNode => (
      <>
         <ModalBodyContainer onSubmit={this.onCreate}>
            {this.renderInput()}
            {this.renderModalFooter()}
         </ModalBodyContainer>
      </>
   )

   renderCreateFolderOrWorkbookPopup = (): React.ReactNode => {
      if (isMobileDevice) {
         return (
            <BottomDrawerWithHeader
               isVisible={this.isVisibleCreateWorkbookOrFolder}
               closeDrawer={this.onClickCloseCreateWorkbookOrFolderDrawer}
               headerContent={this.renderCreateDrawerHeader()}
            >
               {this.renderCreateFolderOrWorkbookDrawerContent()}
            </BottomDrawerWithHeader>
         )
      }

      return (
         <BaseModalContainer ref={this.modalRef} hideCloseIcon>
            <ModalBodyContainer onSubmit={this.onCreate}>
               {this.renderCreateModalHeader()}
               {this.renderInput()}
               {this.renderModalFooter()}
            </ModalBodyContainer>
            <StyledIconContainer
               onClick={(): void => this.closeModal(this.modalRef)}
            >
               <CloseIcon fill={Colors.darkBlueGrey} />
            </StyledIconContainer>
         </BaseModalContainer>
      )
   }

   getSortOptions = () =>
      this.props.isSharedWithMe ? sharedWithMeSortOptions : orderOptions

   renderEmptyTrash = () => {
      const { isEmptyTrash, t } = this.props
      return isEmptyTrash ? (
         <EmptyTrash>
            {t('folderManagement:noDataView.nothingInHere')}
         </EmptyTrash>
      ) : null
   }

   renderWorkBooksAndFooter = () => {
      const {
         pathInfo,
         onDoubleClickFolder,
         isSharedWithMe,
         currentRoute,
         onClickEmptyTrash,
         isEmptyTrash
      } = this.props
      return isEmptyTrash ? null : (
         <WorkbooksAndFoldersFilterBar
            pathInfo={pathInfo}
            itemsView={this.itemsView}
            orderOptions={this.getSortOptions()}
            orderBy={this.orderBy}
            onDoubleClickFolder={onDoubleClickFolder}
            onChangeOrder={this.onChangeOrder}
            onClickGridViewButton={this.onClickGridView}
            onClickListViewButton={this.onClickListView}
            isSharedWithMe={isSharedWithMe}
            currentRoute={currentRoute}
            isEmptyTrash={isEmptyTrash}
            onClickEmptyTrash={onClickEmptyTrash}
         />
      )
   }

   renderUserWorkbooksAndFolders = observer((): ReactElement | null => {
      const {
         userFolders,
         userWorkbooks,
         pathInfo,
         onDoubleClickFolder,
         onDoubleClickWorkbook,
         onClickFolderMenuItem,
         onClickWorkbookMenuItem,
         isSharedWithMe,
         currentRoute,
         onClickEmptyTrash,
         isEmptyTrash
      } = this.props
      let currentFolderType = PROJECT
      if (pathInfo.length > 0) {
         currentFolderType = pathInfo[pathInfo.length - 1].type
      }
      if (userFolders === undefined) {
         return null
      }
      const isNotHomeRoute = currentRoute !== HOME
      if (userFolders.length !== 0 || userWorkbooks.length !== 0) {
         return (
            <UserWorkbooksAndFoldersContainer
               shouldAddMobilePadding={isNotHomeRoute}
               isEmptyTrash={false}
            >
               <WorkbooksAndFoldersFilterBar
                  pathInfo={pathInfo}
                  itemsView={this.itemsView}
                  orderOptions={this.getSortOptions()}
                  orderBy={this.orderBy}
                  onDoubleClickFolder={onDoubleClickFolder}
                  onChangeOrder={this.onChangeOrder}
                  onClickGridViewButton={this.onClickGridView}
                  onClickListViewButton={this.onClickListView}
                  isSharedWithMe={isSharedWithMe}
                  currentRoute={currentRoute}
                  isEmptyTrash={isEmptyTrash}
                  onClickEmptyTrash={onClickEmptyTrash}
               />
               <WorkbooksAndFoldersContainer>
                  <WorkbooksAndFolders
                     itemsView={this.itemsView}
                     workbooks={userWorkbooks}
                     folders={userFolders}
                     onDoubleClickFolder={onDoubleClickFolder}
                     onDoubleClickWorkbook={onDoubleClickWorkbook}
                     onClickFolderMenuItem={onClickFolderMenuItem}
                     onClickWorkbookMenuItem={onClickWorkbookMenuItem}
                     isSharedWithMe={isSharedWithMe}
                     currentRoute={currentRoute}
                  />
               </WorkbooksAndFoldersContainer>
            </UserWorkbooksAndFoldersContainer>
         )
      } else if (currentRoute === trash) {
         return (
            <UserWorkbooksAndFoldersContainer
               isEmptyTrash={true}
               data-testid={'trashFolderEmptyView'}
            >
               {this.renderWorkBooksAndFooter()}
               {this.renderEmptyTrash()}
            </UserWorkbooksAndFoldersContainer>
         )
      } else if (pathInfo.length === 0) {
         if (isSharedWithMe) {
            const { t } = this.props
            return (
               <NoDataContainer as='p' data-testid={'noSharedData'}>
                  {t('folderManagement:noDataView.noSharedData')}
               </NoDataContainer>
            )
         }
         return (
            <NoDataView
               onClickAddFolder={this.onClickAddFolder}
               onClickAddWorkbook={this.onClickAddWorkbook}
               isHomeRoute={currentRoute === home}
               type={currentFolderType}
            />
         )
      }
      return (
         <UserWorkbooksAndFoldersContainer
            data-testid={'noDataViewInActiveFolder'}
         >
            <WorkbooksAndFoldersFilterBar
               pathInfo={pathInfo}
               itemsView={this.itemsView}
               orderOptions={this.getSortOptions()}
               orderBy={this.orderBy}
               onDoubleClickFolder={onDoubleClickFolder}
               onChangeOrder={this.onChangeOrder}
               onClickGridViewButton={this.onClickGridView}
               onClickListViewButton={this.onClickListView}
               isSharedWithMe={isSharedWithMe}
               currentRoute={currentRoute}
            />
            <NoDataView
               onClickAddFolder={this.onClickAddFolder}
               onClickAddWorkbook={this.onClickAddWorkbook}
               type={currentFolderType}
            />
         </UserWorkbooksAndFoldersContainer>
      )
   })

   onClickCloseCreateWorkbookOrFolderDrawer = (): void => {
      this.isVisibleCreateWorkbookOrFolder = false
   }

   onClickCreateWorkbookOrFolderDrawer = (): void => {
      this.isVisibleCreateWorkbookOrFolder = true
   }

   render(): ReactNode {
      const {
         getWorkbooksAndFoldersAPIStatus,
         getWorkbooksAndFoldersAPIError,
         doNetworkCallForFoldersAndWorkbooks,
         getRootFolderDetailsAPIStatus,
         getRootFolderDetailsAPIError,
         getRootFolderDetails,
         isSharedWithMe,
         renderLoadingView
      } = this.props
      const retryAPICallback = isSharedWithMe
         ? () => {
              doNetworkCallForFoldersAndWorkbooks(this.folderId)
           }
         : isAPIFailed(getRootFolderDetailsAPIStatus)
         ? getRootFolderDetails
         : () => {
              doNetworkCallForFoldersAndWorkbooks(this.folderId)
           }
      const apiError = isSharedWithMe
         ? getWorkbooksAndFoldersAPIError
         : isAPIFailed(getRootFolderDetailsAPIStatus)
         ? getWorkbooksAndFoldersAPIError
         : getRootFolderDetailsAPIError

      const apiStatus = isSharedWithMe
         ? getWorkbooksAndFoldersAPIStatus
         : getLoadingStatus(
              getWorkbooksAndFoldersAPIStatus,
              getRootFolderDetailsAPIStatus
           )
      return (
         <>
            <LoadingWrapper
               apiStatus={apiStatus}
               apiError={apiError}
               onRetry={retryAPICallback}
               renderSuccessUI={this.renderUserWorkbooksAndFolders}
               failureMessageTestId='userFoldersAndWorkbooksfailureMessage'
               retryButtonTestId='userFoldersAndWorkbooksRetryButton'
               loaderTestId='userFoldersAndWorkbooksLoader'
               containerClassName={loaderContainerClassName}
               renderLoadingView={renderLoadingView}
            />
            {this.renderCreateFolderOrWorkbookPopup()}
         </>
      )
   }
}

export default withRouter(withTranslation()(UserWorkbooksAndFolders))
