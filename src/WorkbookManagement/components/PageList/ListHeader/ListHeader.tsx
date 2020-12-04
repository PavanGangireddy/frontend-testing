import React, { Component, ReactNode } from 'react'
import { APIStatus } from '@ib/api-constants'
import { withTranslation } from 'react-i18next'
import { DraggableProvided } from 'react-beautiful-dnd'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'

import MoveResource from '../../../../Common/components/MoveResource'
import MoveResourceBodyWrapper from '../../../../Common/components/MoveResourceBodyWrapper'
import PlusIcon from '../../../../Common/icons/PlusIcon'
import Colors from '../../../../Common/themes/Colors'
import PopoverMenu from '../../../../Common/components/PopoverMenu'
import CustomPopUp from '../../../../Common/components/CustomPopUp'
import BaseModalContainer from '../../../../Common/components/BaseModalContainer'
import EditableTextInput from '../../../../Common/components/EditableTextInput'
import { MOVE, LIST } from '../../../../Common/constants/UIConstants'
import {
   isMobileDevice,
   isTabletDevice
} from '../../../../Common/utils/responsiveUtils'
import {
   showSuccessBottomCenterToast,
   showFailureBottomCenterToast
} from '../../../../Common/utils/ToastUtils'
import {
   getAPIErrorMessage,
   isAPIFetching
} from '../../../../Common/utils/APIUtils'
import { validateEmpty } from '../../../../Common/utils/ValidationUtils'
import WorkbookChildDetailsModel from '../../../stores/models/WorkbookChildDetailsModel'
import BlackCloseIcon from '../../../../Common/icons/BlackCloseIcon'
import MoreIcon from '../../../../Common/icons/MoreIcon'
import IconContainer from '../../../../Common/components/IconContainer'
import MobileBottomDeleteDrawerModal from '../../../../Common/components/MobileBottomCustomDrawer/MobileBottomDeleteDrawerModal'

import WorkbookModel from '../../../stores/models/WorkbookModel'
import { DELETE, MAX_LENGTH_OF_LIST_NAME } from '../../../constants/UIConstants'
import { MoveListRequestType } from '../../../stores/types'

import MobileActions from '../../MobileActions'
import MobileRenameAction from '../../MobileRenameAction'

import {
   ListHeaderContainer,
   ListName,
   LeftSection,
   RightSection,
   MoreIconContainer,
   AddListButtonText,
   AddListButton,
   AddListButtonContainer,
   ListMenuContainer,
   ListMenuItem,
   nonEditableTextContainerCSS,
   MoveListHeader,
   MoveListHeaderTitle,
   CloseIconContainer,
   ListNameTextInputCss,
   TitleText,
   nonEditableTextCSS,
   nonEditableTextCSSWithDisabledActions
} from './styledComponents'

// FIXME: Need to fix WithTranslation Props
interface WithTranslation {
   i18n: any
   tReady: any
   t: any
}

interface ListHeaderProps extends WithTranslation {
   listId: string
   listName: string
   onClickAddListButton: (listId: string) => void
   draggableProvided: DraggableProvided
   onClickDeleteListButton?: Function
   deleteListAPIStatus?: APIStatus
   getDeleteListAPIError?: any
   updateName: (name: string) => void
   renameListAPI: (
      onSuccess: Function,
      onFailure: Function,
      value: string
   ) => any //TODO:need to update type
   renameListAPIStatus: APIStatus
   renameListAPIError: any //TODO:need to update type
   moveListAPI: (
      listId: string,
      request: MoveListRequestType,
      onSuccess: (listName: string) => void,
      onFailure: (error) => void
   ) => void
   moveListAPIStatus: APIStatus
   moveListAPIError: any
   getWorkbookChildDetailsAPI: (workbookId: string) => void
   getWorkbookChildDetailsAPIStatus: APIStatus
   // TODO: Need to update type
   getWorkbookChildDetailsAPIError: any
   getWorkbooksAndFoldersAPI: any
   getWorkbooksAndFoldersStatus: APIStatus
   // TODO: Need to update type
   getWorkbooksAndFoldersError: any
   activeFolderInfo: any
   workbookChildDetails: WorkbookChildDetailsModel | {}
   getRootFolderDetailsAPI: (onSuccess: () => void) => void
   getRootFolderDetailsAPIStatus: APIStatus
   // TODO: Need to update the type
   getRootFolderDetailsAPIError: any
   rootFolderId: string
   workbookDetails: WorkbookModel
   clearMoveWorkbooksAndFolders: () => void
   clearWorkbookChildDetails: () => void
   shouldDisableActions?: boolean
   onSuccessListOperation: () => void
   isZoomedOut?: boolean
   toggleIsZoomedOut?: Function
}

const popoverStyle = {
   top: 'unset',
   right: '0px',
   position: 'absolute'
}

// NOTE: Here popoverStyle is added as ipad fix for popovermenu positioning as shown in zeplin

@observer
class ListHeader extends Component<ListHeaderProps> {
   @observable listName!: string
   captureModalRef = React.createRef<BaseModalContainer>()
   ListNameRef
   moveListRef
   isNameUpdated: boolean
   listActionsDrawerRef
   listDeleteDrawerRef
   listRenameDrawerRef

   constructor(props) {
      super(props)
      this.ListNameRef = React.createRef()
      this.moveListRef = React.createRef<BaseModalContainer>()
      this.listName = this.props.listName
      this.isNameUpdated = false
      this.listActionsDrawerRef = React.createRef<BaseModalContainer>()
      this.listDeleteDrawerRef = React.createRef<BaseModalContainer>()
      this.listRenameDrawerRef = React.createRef<BaseModalContainer>()
   }

   openMoveListModal = () => {
      if (isMobileDevice) {
         this.closeListActionsDrawer()
      }
      this.moveListRef.current?.openModal()
   }

   closeMoveListModal = () => {
      this.moveListRef.current?.closeModal()
   }

   onClickAddListButton = (): void => {
      const {
         onClickAddListButton,
         listId,
         toggleIsZoomedOut,
         isZoomedOut
      } = this.props
      isZoomedOut && toggleIsZoomedOut && toggleIsZoomedOut()
      onClickAddListButton(listId)
   }

   onClickDeleteList = (): void => {
      this.captureModalRef.current?.openModal()
   }

   closeDeleteModal = (): void => {
      this.captureModalRef.current?.closeModal()
   }

   listMenuItems = (): ReactNode => {
      const { t } = this.props
      return (
         <ListMenuContainer>
            <ListMenuItem
               as='div'
               onClick={this.openMoveListModal}
               data-testid='listMoveButton'
            >
               {t('workbookManagement:homeScreen.moveMenuItemText')}
            </ListMenuItem>
            <ListMenuItem
               as='div'
               onClick={this.onClickDeleteList}
               data-testid='listDeleteButton'
            >
               {t('workbookManagement:homeScreen.deleteMenuItemText')}
            </ListMenuItem>
         </ListMenuContainer>
      )
   }

   onSuccessfulDeletion = (): void => {
      const { listName, t, onSuccessListOperation } = this.props
      onSuccessListOperation()
      showSuccessBottomCenterToast(
         `${listName} ${t(
            'workbookManagement:homeScreen.listDeletionSuccessText'
         )}`
      )
      isMobileDevice ? this.closeDeleteListDrawer() : this.closeDeleteModal()
   }

   onDeletionFailure = (): void => {
      const { getDeleteListAPIError } = this.props
      showFailureBottomCenterToast(getAPIErrorMessage(getDeleteListAPIError))
      isMobileDevice ? this.closeDeleteListDrawer() : this.closeDeleteModal()
   }

   deleteList = (): void => {
      const { onClickDeleteListButton, listId } = this.props
      if (onClickDeleteListButton)
         onClickDeleteListButton(
            listId,
            this.onSuccessfulDeletion,
            this.onDeletionFailure
         )
   }

   isDeletionInProgress = () => isAPIFetching(this.props.deleteListAPIStatus)

   onSuccessListName = (updatedListName: string): void => {
      const { listName, t } = this.props
      this.listName = listName
      if (isMobileDevice) {
         this.isNameUpdated = true
         this.listName = updatedListName
         this.ListNameRef.current.setInputTextValue(updatedListName)
         this.closeRenameDrawer()
      }
      showSuccessBottomCenterToast(
         `${t('workbookManagement:list.successMessage')}`
      )
   }

   onFailureListName = (): void => {
      const { renameListAPIError, listName } = this.props
      if (!isMobileDevice) {
         this.ListNameRef.current.setInputTextValue(listName)
      }
      showFailureBottomCenterToast(renameListAPIError)
   }

   onUpdateListName = (value: string): void => {
      const { renameListAPI } = this.props

      if (!validateEmpty(value).shouldShowError) {
         renameListAPI(
            () => this.onSuccessListName(value),
            this.onFailureListName,
            value
         )
      }
   }

   renderMoveListHeader = props => {
      const { onCancel } = props
      const { t } = this.props
      return (
         <MoveListHeader>
            <MoveListHeaderTitle>
               {t('workbookManagement:homeScreen.moveList')}
            </MoveListHeaderTitle>
            <CloseIconContainer
               onClick={onCancel}
               data-testid='moveListCloseButton'
            >
               <BlackCloseIcon />
            </CloseIconContainer>
         </MoveListHeader>
      )
   }

   getMoveListRequestObject = (pageId: string) => ({
      page_id: pageId
   })

   onSuccessMoveListAPI = (listName: string) => {
      const { onSuccessListOperation } = this.props
      onSuccessListOperation()
      showSuccessBottomCenterToast(`${listName} is moved`)
      this.closeMoveListModal()
   }

   onFailureMoveListAPI = error => {
      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
   }

   onMoveListAPI = (pageId: string) => {
      const { moveListAPI, listId } = this.props
      moveListAPI(
         listId,
         this.getMoveListRequestObject(pageId),
         this.onSuccessMoveListAPI,
         this.onFailureMoveListAPI
      )
   }

   renderMoveListBody = observer(props => {
      const { onCancel } = props
      const {
         moveListAPIStatus,
         getWorkbooksAndFoldersAPI,
         getWorkbooksAndFoldersStatus,
         getWorkbooksAndFoldersError,
         activeFolderInfo,
         rootFolderId,
         getRootFolderDetailsAPI,
         getRootFolderDetailsAPIStatus,
         getRootFolderDetailsAPIError,
         getWorkbookChildDetailsAPI,
         getWorkbookChildDetailsAPIStatus,
         getWorkbookChildDetailsAPIError,
         workbookDetails: { id },
         workbookChildDetails,
         clearMoveWorkbooksAndFolders,
         clearWorkbookChildDetails
      } = this.props
      return (
         <MoveResourceBodyWrapper
            onCancel={onCancel}
            actionType={MOVE}
            resourceType={LIST}
            onMoveFolderResourceAPI={this.onMoveListAPI}
            onMoveFolderResourceAPIStatus={moveListAPIStatus}
            getFolderDetailsAPI={getWorkbooksAndFoldersAPI}
            getFolderDetailsAPIStatus={getWorkbooksAndFoldersStatus}
            getFolderDetailsAPIError={getWorkbooksAndFoldersError}
            folderData={activeFolderInfo}
            getWorkbookDetailsAPI={getWorkbookChildDetailsAPI}
            getWorkbookDetailsAPIStatus={getWorkbookChildDetailsAPIStatus}
            getWorkbookDetailsAPIError={getWorkbookChildDetailsAPIError}
            workbookId={id}
            workbookData={workbookChildDetails}
            rootFolderId={rootFolderId}
            getRootFolderDetailsAPI={getRootFolderDetailsAPI}
            getRootFolderDetailsAPIStatus={getRootFolderDetailsAPIStatus}
            getRootFolderDetailsAPIError={getRootFolderDetailsAPIError}
            clearMoveWorkbooksAndFolders={clearMoveWorkbooksAndFolders}
            clearWorkbookChildDetails={clearWorkbookChildDetails}
         />
      )
   })

   renderMoveListModal = () => (
      <MoveResource
         innerRef={this.moveListRef}
         renderHeader={this.renderMoveListHeader}
         renderBody={this.renderMoveListBody}
         onCancel={this.closeMoveListModal}
         type='List'
      />
   )

   openListActionsDrawer = (): void => {
      const { isZoomedOut, toggleIsZoomedOut } = this.props
      isZoomedOut && toggleIsZoomedOut && toggleIsZoomedOut()
      this.listActionsDrawerRef.current?.openModal()
   }

   closeListActionsDrawer = (): void => {
      this.listActionsDrawerRef.current?.closeModal()
   }

   openDeleteListDrawer = (): void => {
      this.closeListActionsDrawer()
      this.listDeleteDrawerRef.current?.openModal()
   }

   closeDeleteListDrawer = (): void => {
      this.listDeleteDrawerRef.current?.closeModal()
   }

   renderDeleteListHeaderContent = (): ReactNode => {
      const { listName } = this.props
      return <TitleText>{listName}</TitleText>
   }

   openRenameDrawer = (): void => {
      this.closeListActionsDrawer()
      this.listRenameDrawerRef.current?.openModal()
      this.isNameUpdated = false
   }

   resetListName = (): void => {
      const { listName } = this.props
      if (!this.isNameUpdated) {
         this.listName = listName
      }
   }

   closeRenameDrawer = (): void => {
      this.listRenameDrawerRef.current?.closeModal()
      this.resetListName()
   }

   onChangeListName = (event): void => {
      this.listName = event.target.value
   }

   renderListMobileActions = observer(() => {
      const { listId, listName } = this.props
      return (
         <MobileActions
            innerRef={this.listActionsDrawerRef}
            closeDrawer={this.closeListActionsDrawer}
            isList={true}
            id={listId}
            name={listName}
            onClickRename={this.openRenameDrawer}
            onClickMove={this.openMoveListModal}
            onClickDelete={this.openDeleteListDrawer}
         />
      )
   })

   renderListDeleteDrawer = observer(() => {
      const { deleteListAPIStatus } = this.props
      return (
         <MobileBottomDeleteDrawerModal
            headerContent={this.renderDeleteListHeaderContent()}
            innerRef={this.listDeleteDrawerRef}
            closeDrawer={this.closeDeleteListDrawer}
            isDeleteButtonLoading={isAPIFetching(deleteListAPIStatus)}
            onClickDeleteButton={this.deleteList}
         />
      )
   })

   renderListRenameDrawer = observer(() => {
      const { renameListAPIStatus } = this.props
      return (
         <MobileRenameAction
            innerRef={this.listRenameDrawerRef}
            closeDrawer={this.closeRenameDrawer}
            name={this.listName}
            onClickRenameButton={this.onUpdateListName}
            isList={true}
            apiStatus={renameListAPIStatus}
            onChangeName={this.onChangeListName}
            onCloseModal={this.resetListName}
         />
      )
   })

   isUserActionsEnabled = (): boolean => {
      const { shouldDisableActions } = this.props
      return !shouldDisableActions
   }

   renderMoreIcon = (): ReactNode => (
      <IconContainer>
         <MoreIcon />
      </IconContainer>
   )

   renderAddListAndActionsButtons = (): ReactNode => {
      const { t, isZoomedOut } = this.props
      return this.isUserActionsEnabled() ? (
         <RightSection>
            <AddListButtonContainer>
               <AddListButton
                  onClick={this.onClickAddListButton}
                  data-testid='pageListAddButton'
               >
                  <PlusIcon width={16} height={16} fill={Colors.steel} />
                  <AddListButtonText>
                     {t('workbookManagement:homeScreen.addList')}
                  </AddListButtonText>
               </AddListButton>
            </AddListButtonContainer>
            <MoreIconContainer
               onClick={
                  isMobileDevice ? this.openListActionsDrawer : (): void => {}
               }
            >
               {isMobileDevice ? (
                  this.renderMoreIcon()
               ) : (
                  <PopoverMenu
                     renderPopoverContent={this.listMenuItems()}
                     triggerTestId='listMoreOptionsButton'
                     openStyle={isTabletDevice ? popoverStyle : {}}
                     renderPopoverTrigger={this.renderMoreIcon()}
                  />
               )}
            </MoreIconContainer>
         </RightSection>
      ) : null
   }

   render(): ReactNode {
      const {
         listName,
         t,
         draggableProvided,
         shouldDisableActions
      } = this.props
      const {
         renderListMobileActions: RenderListMobileActions,
         renderListDeleteDrawer: RenderListDeleteDrawer,
         renderListRenameDrawer: RenderListRenameDrawer
      } = this
      return (
         <>
            <RenderListMobileActions />
            <RenderListDeleteDrawer />
            <RenderListRenameDrawer />
            <ListHeaderContainer
               {...draggableProvided.dragHandleProps}
               shouldDisablePointerEvents={shouldDisableActions}
            >
               <LeftSection>
                  <EditableTextInput
                     value={listName}
                     ref={this.ListNameRef}
                     textTypo={ListName}
                     onUpdateText={this.onUpdateListName}
                     textInputCss={ListNameTextInputCss}
                     nonEditableTextContainerCSS={nonEditableTextContainerCSS}
                     maxLength={MAX_LENGTH_OF_LIST_NAME}
                     textInputTestId='listNameInput'
                     contentTestId='listNameInputContent'
                     shouldResizeOnChange={false}
                     nonEditableTextCSS={
                        shouldDisableActions
                           ? nonEditableTextCSSWithDisabledActions
                           : nonEditableTextCSS
                     }
                  />
               </LeftSection>
               {this.renderAddListAndActionsButtons()}
               <CustomPopUp
                  ref={this.captureModalRef}
                  onCancel={this.closeDeleteModal}
                  onConfirm={this.deleteList}
                  actionType={DELETE}
                  description={t(
                     'workbookManagement:homeScreen.deleteConfirmationMessage'
                  )}
                  isSubmitButtonLoading={this.isDeletionInProgress()}
               />
               {this.renderMoveListModal()}
            </ListHeaderContainer>
         </>
      )
   }
}

export default withTranslation()(ListHeader)
