import React, { Component, ReactNode } from 'react'
import { observer } from 'mobx-react'
import { DraggableProvided } from 'react-beautiful-dnd'
import { withTranslation } from 'react-i18next'
import { APIStatus } from '@ib/api-constants'
import { observable } from 'mobx'

import {
   showSuccessBottomCenterToast,
   showFailureBottomCenterToast
} from '../../../../Common/utils/ToastUtils'
import MoveResourceBodyWrapper from '../../../../Common/components/MoveResourceBodyWrapper'
import {
   getAPIErrorMessage,
   isAPIFetching
} from '../../../../Common/utils/APIUtils'
import HamburgerTwoLineIcon from '../../../../Common/icons/HamburgerTwoLineIcon'
import ChevronDownIcon from '../../../../Common/icons/ChevronDownIcon'
import ChevronRightIcon from '../../../../Common/icons/ChevronRightIcon'
import EditableTextInput from '../../../../Common/components/EditableTextInput'
import PopoverMenu from '../../../../Common/components/PopoverMenu'
import BaseModalContainer from '../../../../Common/components/BaseModalContainer'
import CustomPopUp from '../../../../Common/components/CustomPopUp'
import { SECTION, MOVE } from '../../../../Common/constants/UIConstants'
import MoveResource from '../../../../Common/components/MoveResource'
import BlackCloseIcon from '../../../../Common/icons/BlackCloseIcon'
import {
   isMobileDevice,
   isTabletDevice
} from '../../../../Common/utils/responsiveUtils'
import MoreIcon from '../../../../Common/icons/MoreIcon'
import IconContainer from '../../../../Common/components/IconContainer'
import MobileBottomDeleteDrawerModal from '../../../../Common/components/MobileBottomCustomDrawer/MobileBottomDeleteDrawerModal'

import WorkbookChildDetailsModel from '../../../stores/models/WorkbookChildDetailsModel'
import WorkbookModel from '../../../stores/models/WorkbookModel'
import {
   MoveSectionRequestType,
   UpdateSectionNameRequest
} from '../../../stores/types'
import { DELETE, MAX_SECTION_NAME_LENGTH } from '../../../constants/UIConstants'

import MobileActions from '../../MobileActions'
import MobileRenameAction from '../../MobileRenameAction'

import { actionType } from './constants'
import {
   SectionHeaderContainer,
   SectionTitleAndIconContainer,
   SectionTitleTypo,
   ToggleAndMoreIconContainer,
   ButtonContainer,
   ToggleButtonContainer,
   SectionDragHandle,
   SectionNameStyles,
   ListMenuContainer,
   ListMenuItem,
   MoveSectionHeader,
   MoveSectionHeaderTitle,
   CloseIconContainer,
   TitleText,
   nonEditableTextCSS,
   nonEditableTextContainerCSS,
   nonEditableTextCSSWithDisabledActions
} from './styledComponents'

//FIXME: need to fix the WithTranslation in i18n-next , so instead of that we use WithTranslationProps here
interface WithTranslationProps {
   i18n: any
   tReady: boolean
   t: any
}

interface SectionHeaderProps extends WithTranslationProps {
   sectionId: string
   sectionName: string
   isCollapsed: boolean
   onClickToggleButton: () => void
   draggableProvided: DraggableProvided
   updateSectionNameAPI: (
      requestObject: UpdateSectionNameRequest,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) => void
   updateSectionNameAPIStatus: APIStatus
   onDeleteSection: (closeModal, closeDrawer) => void
   moveSectionAPI: (
      sectionId: string,
      request: MoveSectionRequestType,
      onSuccess: (
         sectionName: string,
         sectionId: string,
         listId: string
      ) => void,
      onFailure: (error: any) => void
   ) => void
   moveSectionAPIStatus: APIStatus
   moveSectionAPIError: any
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
   moveSection: (sourceSectionId: string, destinationListId: string) => void
   clearMoveWorkbooksAndFolders: () => void
   clearWorkbookChildDetails: () => void
   shouldDisableActions?: boolean
   deleteSectionAPIStatus: APIStatus
   isZoomedOut?: boolean
   toggleIsZoomedOut?: Function
}

const popoverStyle = {
   top: 'unset',
   right: '8px',
   position: 'absolute'
}

// NOTE: Here popoverStyle is added as ipad fix for popovermenu positioning as shown in zeplin

@observer
class SectionHeader extends Component<SectionHeaderProps> {
   sectionNameRef
   sectionDeleteRef
   moveSectionRef
   @observable sectionName: string
   isNameUpdated: boolean
   sectionActionsDrawerRef
   sectionDeleteDrawerRef
   sectionRenameDrawerRef

   constructor(props) {
      super(props)
      this.sectionNameRef = React.createRef()
      this.sectionDeleteRef = React.createRef<BaseModalContainer>()
      this.moveSectionRef = React.createRef<BaseModalContainer>()
      this.sectionName = props.sectionName
      this.isNameUpdated = false
      this.sectionActionsDrawerRef = React.createRef<BaseModalContainer>()
      this.sectionDeleteDrawerRef = React.createRef<BaseModalContainer>()
      this.sectionRenameDrawerRef = React.createRef<BaseModalContainer>()
   }

   openMoveSectionModal = () => {
      if (isMobileDevice) {
         this.closeSectionActionsDrawer()
      }
      this.moveSectionRef.current?.openModal()
   }

   closeMoveSectionModal = () => {
      this.moveSectionRef.current?.closeModal()
   }

   renderToggleButtonIcon = (): ReactNode => {
      const { isCollapsed } = this.props
      return isCollapsed ? (
         <ChevronRightIcon width={10} height={10} />
      ) : (
         <ChevronDownIcon width={10} height={10} />
      )
   }

   onSuccessUpdateSectionName = (updatedSectionName: string): void => {
      //TODO: need to handle success case
      if (isMobileDevice) {
         this.isNameUpdated = true
         this.sectionName = updatedSectionName
         this.sectionNameRef.current.setInputTextValue(updatedSectionName)
         this.closeRenameDrawer()
      }
      showSuccessBottomCenterToast('Section name updated Successfully')
   }

   onFailureUpdateSectionName = error => {
      const { sectionName } = this.props
      //FIXME: need to handle width for section name
      const errorMessage = getAPIErrorMessage(error)
      this.sectionNameRef.current?.setInputTextValue(sectionName)
      showFailureBottomCenterToast(errorMessage)
   }

   onUpdateSectionName = (value: string) => {
      const { updateSectionNameAPI } = this.props
      const requestObject = {
         section_name: value
      }
      updateSectionNameAPI(
         requestObject,
         () => this.onSuccessUpdateSectionName(value),
         this.onFailureUpdateSectionName
      )
   }

   listMenuItems = () => {
      const { t } = this.props
      return (
         <ListMenuContainer>
            <ListMenuItem
               key={MOVE}
               as='div'
               onClick={this.openMoveSectionModal}
               data-testid={`sectionMoveButton`}
            >
               {t('workbookManagement:section:moveSection')}
            </ListMenuItem>
            <ListMenuItem
               key={DELETE}
               as='div'
               onClick={this.openModal}
               data-testid={`sectionDeleteButton`}
            >
               {t('workbookManagement:section:delete')}
            </ListMenuItem>
         </ListMenuContainer>
      )
   }

   openModal = () => {
      if (this.sectionDeleteRef) this.sectionDeleteRef.current?.openModal()
   }

   closeModal = () => {
      if (this.sectionDeleteRef) this.sectionDeleteRef.current?.closeModal()
   }

   onConfirmDeleteSection = () => {
      const { onDeleteSection } = this.props
      onDeleteSection(this.closeModal, this.closeSectionDeleteDrawer)
   }

   renderDeletePopUp = observer(() => {
      const { t, deleteSectionAPIStatus } = this.props
      return (
         <CustomPopUp
            ref={this.sectionDeleteRef}
            onCancel={this.closeModal}
            onConfirm={this.onConfirmDeleteSection}
            actionType={actionType.delete}
            description={t(
               'workbookManagement:section:areYouSureYouWantToDeleteThisSection'
            )}
            isSubmitButtonLoading={isAPIFetching(deleteSectionAPIStatus)}
         />
      )
   })

   getMoveSectionRequestObject = listId => ({
      list_id: listId
   })

   onSuccessMoveSectionAPI = (
      sectionName: string,
      sourceSectionId: string,
      destinationListId: string
   ): void => {
      const { moveSection } = this.props
      moveSection(sourceSectionId, destinationListId)
      showSuccessBottomCenterToast(`${sectionName} is moved`)
      this.closeMoveSectionModal()
   }

   onFailureMoveListAPI = error => {
      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
   }

   onFailureMoveSectionAPI = (error: any): void => {
      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
   }

   onMoveSectionAPI = (listId: string) => {
      const { moveSectionAPI, sectionId } = this.props
      moveSectionAPI(
         sectionId,
         this.getMoveSectionRequestObject(listId),
         this.onSuccessMoveSectionAPI,
         this.onFailureMoveSectionAPI
      )
   }

   renderMoveSectionBody = observer(props => {
      const { onCancel } = props
      const {
         moveSectionAPIStatus,
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
            resourceType={SECTION}
            onMoveFolderResourceAPI={this.onMoveSectionAPI}
            onMoveFolderResourceAPIStatus={moveSectionAPIStatus}
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

   renderMoveSectionHeader = props => {
      const { onCancel } = props
      const { t } = this.props
      return (
         <MoveSectionHeader>
            <MoveSectionHeaderTitle>
               {t('workbookManagement:homeScreen.moveSection')}
            </MoveSectionHeaderTitle>
            <CloseIconContainer
               onClick={onCancel}
               data-testid={`moveSectionCloseButton`}
            >
               <BlackCloseIcon />
            </CloseIconContainer>
         </MoveSectionHeader>
      )
   }

   renderMoveSectionModal = () => (
      <MoveResource
         innerRef={this.moveSectionRef}
         renderHeader={this.renderMoveSectionHeader}
         renderBody={this.renderMoveSectionBody}
         onCancel={this.closeMoveSectionModal}
         type='Section'
      />
   )

   openSectionActionsDrawer = (): void => {
      const { toggleIsZoomedOut, isZoomedOut } = this.props
      isZoomedOut && toggleIsZoomedOut && toggleIsZoomedOut()
      this.sectionActionsDrawerRef.current?.openModal()
   }

   closeSectionActionsDrawer = (): void => {
      this.sectionActionsDrawerRef.current?.closeModal()
   }

   openSectionDeleteDrawer = (): void => {
      this.closeSectionActionsDrawer()
      this.sectionDeleteDrawerRef.current?.openModal()
   }

   closeSectionDeleteDrawer = (): void => {
      this.sectionDeleteDrawerRef.current?.closeModal()
   }

   renderDeleteListHeaderContent = (): ReactNode => {
      const { sectionName } = this.props
      return <TitleText>{sectionName}</TitleText>
   }

   openRenameDrawer = (): void => {
      this.closeSectionActionsDrawer()
      this.sectionRenameDrawerRef.current?.openModal()
      this.isNameUpdated = false
   }

   resetSectionName = (): void => {
      const { sectionName } = this.props
      if (!this.isNameUpdated) {
         this.sectionName = sectionName
      }
   }

   closeRenameDrawer = (): void => {
      this.sectionRenameDrawerRef.current?.closeModal()
      this.resetSectionName()
   }

   onChangeSectionName = (event): void => {
      this.sectionName = event.target.value
   }

   renderSectionMobileActions = observer(() => {
      const { sectionId, sectionName } = this.props
      return (
         <MobileActions
            innerRef={this.sectionActionsDrawerRef}
            closeDrawer={this.closeSectionActionsDrawer}
            isList={false}
            id={sectionId}
            name={sectionName}
            onClickRename={this.openRenameDrawer}
            onClickMove={this.openMoveSectionModal}
            onClickDelete={this.openSectionDeleteDrawer}
         />
      )
   })

   renderSectionDeleteDrawer = observer(() => {
      const { deleteSectionAPIStatus } = this.props
      return (
         <MobileBottomDeleteDrawerModal
            headerContent={this.renderDeleteListHeaderContent()}
            innerRef={this.sectionDeleteDrawerRef}
            closeDrawer={this.closeSectionDeleteDrawer}
            onClickDeleteButton={this.onConfirmDeleteSection}
            isDeleteButtonLoading={isAPIFetching(deleteSectionAPIStatus)}
         />
      )
   })

   renderSectionRenameDrawer = observer(() => {
      const { updateSectionNameAPIStatus } = this.props
      return (
         <MobileRenameAction
            innerRef={this.sectionRenameDrawerRef}
            closeDrawer={this.closeRenameDrawer}
            name={this.sectionName}
            onClickRenameButton={this.onUpdateSectionName}
            isList={false}
            apiStatus={updateSectionNameAPIStatus}
            onChangeName={this.onChangeSectionName}
            onCloseModal={this.resetSectionName}
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

   renderSectionActions = observer(() =>
      this.isUserActionsEnabled() ? (
         <ButtonContainer
            onClick={
               isMobileDevice ? this.openSectionActionsDrawer : (): void => {}
            }
         >
            {isMobileDevice ? (
               this.renderMoreIcon()
            ) : (
               <PopoverMenu
                  renderPopoverContent={this.listMenuItems()}
                  triggerTestId='sectionMoreOptionsButton'
                  openStyle={isTabletDevice ? popoverStyle : {}}
                  renderPopoverTrigger={this.renderMoreIcon()}
               />
            )}
         </ButtonContainer>
      ) : null
   )

   render(): ReactNode {
      const {
         sectionName,
         onClickToggleButton,
         draggableProvided,
         shouldDisableActions
      } = this.props
      const {
         renderSectionMobileActions: RenderSectionMobileActions,
         renderSectionDeleteDrawer: RenderSectionDeleteDrawer,
         renderSectionRenameDrawer: RenderSectionRenameDrawer,
         renderDeletePopUp: RenderDeletePopUp,
         renderSectionActions: RenderSectionActions
      } = this
      return (
         <>
            <RenderSectionMobileActions />
            <RenderSectionDeleteDrawer />
            <RenderSectionRenameDrawer />
            <SectionHeaderContainer>
               <SectionTitleAndIconContainer>
                  <SectionDragHandle
                     {...draggableProvided.dragHandleProps}
                     data-testid='draggableSectionHandle'
                  >
                     <IconContainer>
                        <HamburgerTwoLineIcon />
                     </IconContainer>
                  </SectionDragHandle>
                  <EditableTextInput
                     value={sectionName}
                     ref={this.sectionNameRef}
                     textTypo={SectionTitleTypo}
                     onUpdateText={this.onUpdateSectionName}
                     textInputCss={SectionNameStyles}
                     maxLength={MAX_SECTION_NAME_LENGTH}
                     textInputTestId='sectionNameInput'
                     contentTestId='sectionNameInputContent'
                     shouldResizeOnChange={false}
                     isEditableForSingleClick={
                        !isMobileDevice && !shouldDisableActions
                     }
                     nonEditableTextCSS={
                        shouldDisableActions
                           ? nonEditableTextCSSWithDisabledActions
                           : nonEditableTextCSS
                     }
                     nonEditableTextContainerCSS={nonEditableTextContainerCSS}
                  />
               </SectionTitleAndIconContainer>
               <ToggleAndMoreIconContainer>
                  <ToggleButtonContainer
                     onClick={onClickToggleButton}
                     data-testid='sectionToggleButton'
                  >
                     <IconContainer>
                        {this.renderToggleButtonIcon()}
                     </IconContainer>
                  </ToggleButtonContainer>
                  <RenderSectionActions />
                  <RenderDeletePopUp />
               </ToggleAndMoreIconContainer>
               {this.renderMoveSectionModal()}
            </SectionHeaderContainer>
         </>
      )
   }
}

export default withTranslation()(SectionHeader)
