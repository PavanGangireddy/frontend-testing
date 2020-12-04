import React, { Component, ReactElement, ReactNode } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'
import { APIStatus } from '@ib/api-constants'

import colors from '../../../Common/themes/Colors'
import DiscussionsView from '../../../Discussions/components/DiscussionsView'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import NotesIcon from '../../../Common/icons/NotesIcon'
import LinkIcon from '../../../Common/icons/LinkIcon'
import {
   showFailureBottomCenterToast,
   showSuccessBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import PlusIcon from '../../../Common/icons/PlusIcon'
import { ErrorObjectType } from '../../../Common/stores/types'
import {
   getAPIErrorMessage,
   isAPIFetching
} from '../../../Common/utils/APIUtils'
import { getTextColor } from '../../../Common/utils/ColorUtils'
import EditableTextInput from '../../../Common/components/EditableTextInput'
import { CARD } from '../../../Common/constants/UIConstants'
import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import CustomPopUp from '../../../Common/components/CustomPopUp'
import PopoverMenu from '../../../Common/components/PopoverMenu'
import TabBar from '../../../Common/components/TabBar'
import ChecklistController from '../../../UtilityTools/components/ChecklistController'
import DiscussionsIcon from '../../../Common/icons/DiscussionsIcon'
import ChecklistIcon from '../../../Common/icons/ChecklistIcon'
import { getDateAndTimeFormat } from '../../../Common/utils/DateUtils'
import { validateUrl } from '../../../Common/utils/ValidationUtils'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import MoreIcon from '../../../Common/icons/MoreIcon'
import BottomDrawerModal from '../../../Common/components/BottomDrawer/BottomDrawerModal'

import CardModel from '../../stores/models/CardModel'
import { SelectedColorObjectType } from '../../stores/types'
import { CARD_NOTES_REGEX, SPACE_REGEX } from '../../constants/RegexConstants'
import { MAX_CARD_NAME_LENGTH } from '../../constants/UIConstants'

import Quill from '../Quill'
import Attachment from '../Attachment'
import CardDetailsFilterBar from '../CardDetailsFilterBar'

import { inputFieldType, deletePopOver, SELECTED_TAB, tabs } from './constants'
import {
   CardDetailsContainer,
   Header,
   TitleTypo,
   Children,
   CardDetailsBody,
   SubContainer,
   SubHeader,
   SubTitle,
   AttachmentList,
   TitleStyles,
   ButtonText,
   AddAttachmentButton,
   AddAttachmentsContainer,
   InputBox,
   InputFieldContainer,
   SaveButton,
   SaveButtonText,
   ModalCloseIcon,
   PopOverMenuContainer,
   ListMenuContainer,
   ListMenuItem,
   HeaderActions,
   ButtonsContainer,
   CancelButton,
   CancelButtonText,
   TabsContainer,
   ChecklistContainer,
   QuillDrawerWrapper,
   DrawerHeaderTitleText,
   AddAttachmentDrawerContainer,
   AddNotesButton,
   EditableTextEditorContainer,
   EditableTextStyle,
   NotesContainer,
   NonEditableTextContainerStyles,
   EmptyNotesText,
   EmptyMessageText
} from './styledComponents'
import styles from './styles.module.css'
import MobileCardDetailsHeader from './MobileCardDetailsHeader'

interface WithTranslaionProps {
   tReady: any
   t: any
   i18n: any
}

interface CardDetailsProps extends WithTranslaionProps {
   cardModel: CardModel
   modalRef: any
   openMoveCardModal: () => void
   deleteCardAPI: (
      cardId: string,
      onSuccess: (cardName: string) => void,
      onFailure: (error: any) => void
   ) => void
   deleteCardAPIStatus: APIStatus
   deleteCardAPIError: any
   shouldDisableActions?: boolean
   closeModal?: () => void
   onClickMoveCard: () => void
}

@observer
class CardDetails extends Component<CardDetailsProps> {
   @observable isAddingAttachment: boolean
   @observable cardTitle!: string
   @observable attachmentURL: string
   @observable isInvalidURL: boolean
   @observable cardLabelBackground!: string | null
   @observable cardLabelTextColor!: string | null
   @observable cardPriority!: string | null
   @observable cardNotes!: string
   @observable isEditable = false
   cardDeleteRef
   addAttachmentRef
   notesEditorRef
   addTitleRef
   editNotesRef
   @observable selectedTab: SELECTED_TAB
   attachmentDelRef
   mobileAddAttachmentRef
   addAttachmentDrawerRef
   notesEditorDrawerRef

   constructor(props) {
      super(props)
      this.isAddingAttachment = false
      this.isInvalidURL = true
      this.attachmentURL = ''
      this.cardLabelBackground = null
      this.cardLabelTextColor = null
      this.cardPriority = null
      this.cardNotes = ''
      this.addAttachmentRef = React.createRef()
      this.notesEditorRef = React.createRef()
      this.addTitleRef = React.createRef()
      this.mobileAddAttachmentRef = React.createRef()
      this.cardDeleteRef = React.createRef<BaseModalContainer>()
      this.selectedTab = SELECTED_TAB.DISCUSSIONS
      this.attachmentDelRef = React.createRef<BaseModalContainer>()
      this.addAttachmentDrawerRef = React.createRef<BaseModalContainer>()
      this.notesEditorDrawerRef = React.createRef<BaseModalContainer>()
   }

   openAddAttachmentsDrawer = (): void => {
      this.addAttachmentDrawerRef.current?.openModal()
   }

   resetAddAttachmentData = (): void => {
      this.mobileAddAttachmentRef.current?.resetErrorMessage()
      this.attachmentURL = ''
   }

   closeAddAttachmentsDrawer = (): void => {
      this.resetAddAttachmentData()
      this.addAttachmentDrawerRef.current?.closeModal()
   }

   @action.bound
   onChangeCardLabel = (selectedColorObject: SelectedColorObjectType): void => {
      const { backgroundColor, textColor } = selectedColorObject
      if (this.cardLabelBackground !== backgroundColor) {
         this.cardLabelBackground = backgroundColor ? backgroundColor : ''
         this.cardLabelTextColor = textColor
         const updatedLabel =
            this.cardLabelBackground === colors.white
               ? null
               : this.cardLabelBackground
         this.onUpdateCardLabel(updatedLabel)
      }
   }

   onSuccessUpdateCardLabel = (): void => {
      //TODO: need to handle success state
   }

   onFailureUpdateCardLabel = (error: any): void => {
      const {
         cardModel: { label }
      } = this.props
      this.cardLabelBackground = label

      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
   }

   onUpdateCardLabel = (cardLabel: string | null): void => {
      const {
         cardModel: { updateLabelAPI }
      } = this.props
      const requestObject = {
         label: cardLabel
      }
      updateLabelAPI(
         requestObject,
         this.onSuccessUpdateCardLabel,
         this.onFailureUpdateCardLabel
      )
   }

   onChangeCardPriority = (selectedPriority: string): void => {
      if (this.cardPriority !== selectedPriority) {
         this.cardPriority = selectedPriority
         this.onUpdateCardPriority(parseInt(this.cardPriority))
      }
   }

   onSuccessUpdateCardPriority = (): void => {
      //TODO: need to handle success state
   }

   onFailureUpdateCardPriority = (error: any): void => {
      const {
         cardModel: { priority }
      } = this.props
      this.cardPriority = `${priority}`
      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
   }

   onUpdateCardPriority = (cardPriority: number | null): void => {
      const {
         cardModel: { updatePriorityAPI }
      } = this.props
      const requestObject = {
         priority: cardPriority
      }
      updatePriorityAPI(
         requestObject,
         this.onSuccessUpdateCardPriority,
         this.onFailureUpdateCardPriority
      )
   }

   onSuccessCardDetails = (): void => {
      //TODO: need to handle success state
   }

   onFailureCardDetails = (): void => {
      const {
         cardModel: { cardDetailsAPIError }
      } = this.props
      const errorMessage = getAPIErrorMessage(cardDetailsAPIError)
      showFailureBottomCenterToast(errorMessage)
   }

   onSuccessEditTitle = (): void => {
      //TODO: need to handle success state
   }

   onFailureEditTitle = (): void => {
      const {
         cardModel: {
            updateCardNameAPIError,
            cardDetails: { title }
         }
      } = this.props
      this.cardTitle = title
      this.addTitleRef.current?.setInputTextValue(this.cardTitle)
      const errorMessage = getAPIErrorMessage(updateCardNameAPIError)
      showFailureBottomCenterToast(errorMessage)
   }

   onUpdateCardTitle = (value: string): void => {
      const {
         cardModel: { updateCardNameAPI, id },
         t
      } = this.props
      const request = {
         card_title: value.trim()
      }
      if (value === '')
         showFailureBottomCenterToast(
            t(`workbookManagement:cardDetails.cardTitleCannotBeEmpty`)
         )
      else if (value !== this.cardTitle) {
         this.cardTitle = value
         updateCardNameAPI(
            id,
            request,
            this.onSuccessEditTitle,
            this.onFailureEditTitle
         )
      }
   }

   onCloseModal = (): void => {
      const { closeModal } = this.props
      if (closeModal) closeModal()
   }

   openDeleteModal = (): void => {
      this.cardDeleteRef.current?.openModal()
   }

   closeDeleteModal = (): void => {
      this.cardDeleteRef.current?.closeModal()
   }

   onSuccessCardDeleteAPI = (cardName: string): void => {
      showSuccessBottomCenterToast(`${cardName} is deleted`)
   }

   onFailureCardDeleteAPI = (error: any): void => {
      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
      this.closeDeleteModal()
   }

   onConfirmDeleteCard = (): void => {
      const {
         deleteCardAPI,
         cardModel: { id }
      } = this.props
      deleteCardAPI(
         id,
         this.onSuccessCardDeleteAPI,
         this.onFailureCardDeleteAPI
      )
   }

   renderDeletePopUp = (): ReactElement => {
      const { t, deleteCardAPIStatus } = this.props
      return (
         <CustomPopUp
            ref={this.cardDeleteRef}
            onCancel={this.closeDeleteModal}
            onConfirm={this.onConfirmDeleteCard}
            actionType={deletePopOver.actionType}
            description={t(
               'workbookManagement:cardDetails.areYouSureYouWantToDeleteThisCard'
            )}
            isSubmitButtonLoading={isAPIFetching(deleteCardAPIStatus)}
         />
      )
   }

   openMoveCardModal = (): void => {
      const { openMoveCardModal } = this.props
      this.onCloseModal()
      openMoveCardModal()
   }

   listMenuItems = (): ReactElement => {
      const { t } = this.props
      return (
         <ListMenuContainer>
            <ListMenuItem
               key={'More'}
               as='div'
               onClick={this.openMoveCardModal}
               data-testid={'moveCardMenuItem'}
            >
               {t('workbookManagement:cardDetails.moveCard')}
            </ListMenuItem>
            <ListMenuItem
               key={'delete'}
               as='div'
               onClick={this.openDeleteModal}
               data-testid={'deleteCardMenuItem'}
            >
               {t('workbookManagement:cardDetails.delete')}
            </ListMenuItem>
         </ListMenuContainer>
      )
   }

   renderEditableTextInput = observer(
      (): ReactElement => {
         const {
            cardTitle,
            addTitleRef,
            onUpdateCardTitle,
            cardLabelTextColor,
            props: { shouldDisableActions }
         } = this
         const NonEditableTitleStyles = cardLabelTextColor
            ? { color: cardLabelTextColor }
            : { color: colors.darkBlueGrey }
         return (
            <EditableTextInput
               value={cardTitle}
               ref={addTitleRef}
               textTypo={TitleTypo}
               onUpdateText={onUpdateCardTitle}
               textInputCss={TitleStyles}
               nonEditableTextCSS={NonEditableTitleStyles}
               nonEditableTextContainerCSS={NonEditableTextContainerStyles}
               textInputTestId='cardTitleInput'
               contentTestId='cardTitleInputContent'
               isEditableForSingleClick={!shouldDisableActions}
               maxLength={MAX_CARD_NAME_LENGTH}
               shouldResizeOnChange={false}
               truncateValue={25}
            />
         )
      }
   )

   getColor = () => {
      const { cardLabelBackground } = this
      return cardLabelBackground
         ? getTextColor(cardLabelBackground)
         : colors.darkBlueGrey
   }

   renderCardHeader = observer(
      (): ReactElement => {
         const {
            shouldDisableActions,
            openMoveCardModal,
            deleteCardAPIStatus,
            onClickMoveCard
         } = this.props
         const {
            cardLabelBackground,
            cardLabelTextColor,
            onCloseModal,
            cardTitle,
            renderEditableTextInput: RenderEditableTextInput,
            renderEditableTextInput,
            onConfirmDeleteCard,
            getColor
         } = this
         const NavBarContainerStyles = cardLabelBackground
            ? {
                 background: cardLabelBackground,
                 borderBottom: `1px solid ${colors.lightBlueGrey}`
              }
            : {
                 background: colors.white,
                 borderBottom: `1px solid ${colors.lightBlueGrey}`
              }
         return (
            <>
               {isMobileDevice ? (
                  <MobileCardDetailsHeader
                     onClickBack={onCloseModal}
                     NavBarContainerCSS={NavBarContainerStyles}
                     renderEditableTextInput={renderEditableTextInput}
                     cardTitle={cardTitle}
                     openMoveCardModal={openMoveCardModal}
                     onDeleteCard={onConfirmDeleteCard}
                     deleteCardAPIStatus={deleteCardAPIStatus}
                     shouldDisableActions={shouldDisableActions}
                     onClickMoveCard={onClickMoveCard}
                     cardLabelTextColor={cardLabelTextColor}
                  />
               ) : (
                  <Header
                     cardLabelBackground={cardLabelBackground}
                     cardLabelTextColor={cardLabelTextColor}
                  >
                     <RenderEditableTextInput />
                     <HeaderActions>
                        {!shouldDisableActions && (
                           <PopOverMenuContainer
                              isDisabled={shouldDisableActions}
                           >
                              <PopoverMenu
                                 renderPopoverContent={
                                    !shouldDisableActions
                                       ? this.listMenuItems()
                                       : null
                                 }
                                 renderPopoverTrigger={
                                    <MoreIcon fillColor={getColor()} />
                                 }
                                 triggerTestId='cardDetailsMoreOptionsButton'
                              />
                           </PopOverMenuContainer>
                        )}
                        <ModalCloseIcon
                           onClick={this.onCloseModal}
                           data-testid={'cardDetailsCloseButton'}
                           fill={getColor()}
                        />
                     </HeaderActions>
                     {this.renderDeletePopUp()}
                  </Header>
               )}
            </>
         )
      }
   )

   getCardDetails = (): void => {
      const {
         cardModel: { getCardDetailsAPI, id }
      } = this.props
      getCardDetailsAPI(
         id,
         this.onSuccessCardDetails,
         this.onFailureCardDetails
      )
   }

   onSuccessEditAttachment = (): void => {
      //TODO: need to handle success case
   }

   onEditAttachment = (
      attachmentDetails: any,
      onFailureEditAttachment
   ): void => {
      const {
         cardModel: { updateAttachmentURLAPI }
      } = this.props
      const { attachmentId, url } = attachmentDetails
      const request = { url }
      updateAttachmentURLAPI(
         attachmentId,
         request,
         this.onSuccessEditAttachment,
         onFailureEditAttachment
      )
   }

   renderAttachmentItems = (): React.ReactNode => {
      const {
         cardDetails: { attachments },
         deleteAttachmentAPI,
         deleteAttachmentAPIStatus,
         updateAttachmentURLAPIStatus
      } = this.props.cardModel
      return attachments.map(eachAttachment => (
         <Attachment
            key={eachAttachment.attachmentId}
            details={eachAttachment}
            onEditAttachment={this.onEditAttachment}
            deleteAttachmentAPI={deleteAttachmentAPI}
            deleteAttachmentAPIStatus={deleteAttachmentAPIStatus}
            updateAttachmentURLAPIStatus={updateAttachmentURLAPIStatus}
         />
      ))
   }

   renderAttachments = (): React.ReactNode => {
      const {
         props: { t, shouldDisableActions },
         renderAddAttachments: RenderAddAttachments,
         renderAddAttachmentDrawer
      } = this
      return (
         <SubContainer shouldDisablePointerEvents={shouldDisableActions}>
            <SubHeader>
               <SubTitle>
                  {t(`workbookManagement:cardDetails.attachments`)}
               </SubTitle>
               <LinkIcon />
            </SubHeader>
            <AttachmentList>{this.renderAttachmentItems()}</AttachmentList>
            <RenderAddAttachments />
            {renderAddAttachmentDrawer()}
         </SubContainer>
      )
   }

   onSuccessEditNote = (): void => {
      // TODO: need to handle success state
      this.onCancel()
   }

   onFailureEditNote = (): void => {
      const {
         cardModel: { updateCardNoteAPIError }
      } = this.props
      this.notesEditorRef.current?.setEditorData(this.cardNotes)
      const errorMessage = getAPIErrorMessage(updateCardNoteAPIError)
      showFailureBottomCenterToast(errorMessage)
      this.onCancel()
   }

   validateCardNotes = value =>
      value.replace(CARD_NOTES_REGEX, '').replace(SPACE_REGEX, '')

   onClickSave = (): void => {
      const {
         cardModel: { updateCardNoteAPI, id },
         t
      } = this.props
      let updatedNotes = this.notesEditorRef.current.getEditorData()
      updatedNotes = this.validateCardNotes(updatedNotes) ? updatedNotes : null
      const request = {
         card_note: updatedNotes
      }
      updateCardNoteAPI(
         id,
         request,
         this.onSuccessEditNote,
         this.onFailureEditNote
      )
   }

   openNotesDrawer = (): void => {
      this.notesEditorDrawerRef.current?.openModal()
   }

   onClickEditableTextInputContainer = (): void => {
      this.isEditable = true
      isMobileDevice && this.openNotesDrawer()
   }

   updateCardNotesStatus = (): void => {
      const {
         cardModel: {
            cardDetails: { notes }
         }
      } = this.props
      this.isEditable = false
      this.notesEditorRef.current?.setEditorData(notes)
   }

   onCancel = (): void => {
      this.updateCardNotesStatus()
      this.notesEditorDrawerRef.current?.closeModal()
   }

   renderNotesFooter = observer(
      (): ReactElement => {
         const {
            cardModel: { updateCardNoteAPIStatus },
            t
         } = this.props
         return (
            <ButtonsContainer>
               <CancelButton
                  variant={CancelButton.variants.secondary}
                  onClick={this.onCancel}
                  id='cardNotesCancelButton'
               >
                  <CancelButtonText>
                     {t('workbookManagement:cardDetails.cancel')}
                  </CancelButtonText>
               </CancelButton>
               <SaveButton
                  onClick={this.onClickSave}
                  isLoading={isAPIFetching(updateCardNoteAPIStatus)}
                  id='cardNotesSaveButton'
               >
                  <SaveButtonText>
                     {t('workbookManagement:cardDetails.save')}
                  </SaveButtonText>
               </SaveButton>
            </ButtonsContainer>
         )
      }
   )

   renderNotesDrawerHeader = (): ReactElement => {
      const { t } = this.props
      return (
         <DrawerHeaderTitleText>
            {t('workbookManagement:cardDetails.editNotes')}
         </DrawerHeaderTitleText>
      )
   }

   renderQuillEditor = observer(
      (): ReactElement => {
         const {
            props: {
               cardModel: {
                  cardDetails: { notes }
               },
               t
            },
            notesEditorRef,
            renderNotesFooter: RenderNotesFooter
         } = this
         return (
            <>
               <Quill
                  ref={notesEditorRef}
                  placeholder={t('workbookManagement:cardDetails.addNotes')}
                  value={notes}
                  bounds={'.subContainer'}
               />
               <RenderNotesFooter />
            </>
         )
      }
   )

   renderNotesDrawer = (): ReactElement => {
      const {
         onCancel,
         renderNotesDrawerHeader,
         renderQuillEditor: RenderQuillEditor,
         updateCardNotesStatus
      } = this
      return (
         <BottomDrawerModal
            innerRef={this.notesEditorDrawerRef}
            closeDrawer={onCancel}
            headerContent={renderNotesDrawerHeader()}
            onCloseModal={updateCardNotesStatus}
         >
            <QuillDrawerWrapper>
               <RenderQuillEditor />
            </QuillDrawerWrapper>
         </BottomDrawerModal>
      )
   }

   renderAddNotesButton = () => {
      const {
         onClickEditableTextInputContainer,
         props: { t }
      } = this
      return (
         <AddNotesButton onClick={onClickEditableTextInputContainer}>
            <PlusIcon />
            <ButtonText>
               {t(`workbookManagement:cardDetails.addNotes`)}
            </ButtonText>
         </AddNotesButton>
      )
   }

   isCardsNoteEmpty = (): boolean =>
      this.cardNotes === '' || this.cardNotes === null

   renderAddNotesButtonOrEmptyNotesText = (): ReactNode => {
      const { shouldDisableActions, t } = this.props
      return shouldDisableActions ? (
         <EmptyNotesText>
            {t('workbookManagement:assignmentWorkbook.emptyNotesMessage')}
         </EmptyNotesText>
      ) : (
         this.renderAddNotesButton()
      )
   }

   renderNotes = observer(
      (): ReactElement => {
         const {
            props: {
               cardModel: {
                  cardDetails: { notes }
               },
               t,
               shouldDisableActions
            },
            renderQuillEditor: RenderQuillEditor,
            isEditable,
            onClickEditableTextInputContainer,
            renderNotesDrawer,
            renderAddNotesButtonOrEmptyNotesText,
            isCardsNoteEmpty
         } = this
         this.cardNotes = notes
         return (
            <NotesContainer className='subContainer'>
               <SubHeader>
                  <SubTitle>
                     {t(`workbookManagement:cardDetails.notes`)}
                  </SubTitle>
                  <NotesIcon />
               </SubHeader>
               {isEditable ? (
                  isMobileDevice ? null : (
                     <RenderQuillEditor />
                  )
               ) : isCardsNoteEmpty() ? (
                  renderAddNotesButtonOrEmptyNotesText()
               ) : (
                  <EditableTextEditorContainer
                     onClick={
                        shouldDisableActions
                           ? (): void => {}
                           : onClickEditableTextInputContainer
                     }
                     data-testid={`editableTextEditor`}
                     shouldDisableActions={shouldDisableActions}
                  >
                     <EditableTextStyle
                        as='p'
                        dangerouslySetInnerHTML={{ __html: this.cardNotes }}
                     />
                  </EditableTextEditorContainer>
               )}

               {renderNotesDrawer()}
            </NotesContainer>
         )
      }
   )

   setIsInValidURL = (value: boolean): void => {
      this.isInvalidURL = value
   }

   validateURL = (): ErrorObjectType => validateUrl(this.attachmentURL)

   onChangeAttachmentURL = (event): void => {
      this.attachmentURL = event.target.value
      this.setIsInValidURL(this.validateURL().shouldShowError)
   }

   @action.bound
   onChangeIsAddingAttachment = (value: boolean): void => {
      this.isAddingAttachment = value
      this.addAttachmentRef.current?.inputRef.current?.focus()
   }

   onSuccessAddAttachment = (): void => {
      this.attachmentURL = ''
      this.closeAddAttachmentsDrawer()
      this.addAttachmentRef.current?.inputRef.current?.setError('')
      //TODO: need to handle success state
   }

   onFailureAddAttachment = (): void => {
      const {
         cardModel: { addAttachmentAPIError }
      } = this.props
      const errorMessage = getAPIErrorMessage(addAttachmentAPIError)
      showFailureBottomCenterToast(errorMessage)
   }

   onAddAttachment = (): void => {
      this.mobileAddAttachmentRef.current?.validateInput()
      const {
         cardModel: { addAttachmentAPI, id }
      } = this.props
      const request = {
         url: this.attachmentURL
      }
      if (
         this.attachmentURL !== '' &&
         !validateUrl(this.attachmentURL).shouldShowError
      ) {
         this.onChangeIsAddingAttachment(false)
         addAttachmentAPI(
            id,
            request,
            this.onSuccessAddAttachment,
            this.onFailureAddAttachment
         )
      } else {
         this.attachmentURL === '' &&
            showFailureBottomCenterToast('Attachment Url cannot be empty')
      }
   }

   onKeyDownURL = (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.charCode === 13) {
         this.onAddAttachment()
         this.addAttachmentRef.current?.validateInput()
      }
   }

   verifyURL = () => validateUrl(this.attachmentURL)

   onAddMobileAttachment = (): void => {
      this.verifyURL()
      this.onAddAttachment()
   }

   renderAddAttachmentsFooter = observer(
      (): ReactElement => {
         const {
            closeAddAttachmentsDrawer,
            onAddMobileAttachment,
            props: {
               t,
               cardModel: { addAttachmentAPIStatus }
            }
         } = this
         return (
            <ButtonsContainer>
               <CancelButton
                  variant={CancelButton.variants.secondary}
                  onClick={closeAddAttachmentsDrawer}
                  id='cardNotesCancelButton'
               >
                  <CancelButtonText>
                     {t('workbookManagement:cardDetails.cancel')}
                  </CancelButtonText>
               </CancelButton>
               <SaveButton
                  onClick={onAddMobileAttachment}
                  isLoading={isAPIFetching(addAttachmentAPIStatus)}
                  id='cardNotesSaveButton'
               >
                  <SaveButtonText>
                     {t('workbookManagement:cardDetails.save')}
                  </SaveButtonText>
               </SaveButton>
            </ButtonsContainer>
         )
      }
   )

   renderAddAttachmentDrawerHeaderContent = (): ReactNode => (
      <DrawerHeaderTitleText>Add Attachment</DrawerHeaderTitleText>
   )

   renderAddAttachmentDrawer = (): ReactElement => {
      const {
         closeAddAttachmentsDrawer,
         mobileAddAttachmentRef,
         renderAddAttachmentsFooter: RenderAddAttachmentsFooter,
         attachmentURL,
         onChangeAttachmentURL,
         verifyURL,
         resetAddAttachmentData
      } = this
      return (
         <BottomDrawerModal
            innerRef={this.addAttachmentDrawerRef}
            headerContent={this.renderAddAttachmentDrawerHeaderContent()}
            closeDrawer={closeAddAttachmentsDrawer}
            onCloseModal={resetAddAttachmentData}
         >
            <AddAttachmentDrawerContainer>
               <InputBox
                  value={attachmentURL}
                  onChange={onChangeAttachmentURL}
                  ref={mobileAddAttachmentRef}
                  validate={verifyURL}
                  testId='mobileAddAttachmentInput'
               />
               <RenderAddAttachmentsFooter />
            </AddAttachmentDrawerContainer>
         </BottomDrawerModal>
      )
   }

   get noAttachments(): boolean {
      const {
         cardModel: {
            cardDetails: { attachments }
         }
      } = this.props
      return attachments.length === 0
   }

   renderAddAttachmentButton = (): ReactNode => {
      const { shouldDisableActions, t } = this.props
      return this.noAttachments && shouldDisableActions ? (
         <EmptyMessageText>
            {t('workbookManagement:assignmentWorkbook.noAttachmentsMessage')}
         </EmptyMessageText>
      ) : (
         <AddAttachmentButton
            onClick={
               isMobileDevice
                  ? this.openAddAttachmentsDrawer
                  : (): void => this.onChangeIsAddingAttachment(true)
            }
            id='addAttachmentAddButton'
         >
            <PlusIcon />
            <ButtonText>
               {t('workbookManagement:cardDetails.addAttachments')}
            </ButtonText>
         </AddAttachmentButton>
      )
   }

   renderAddAttachments = observer(
      (): ReactElement => {
         const {
            props: { t, shouldDisableActions }
         } = this
         return (
            <AddAttachmentsContainer
               shouldDisablePointerEvents={shouldDisableActions}
            >
               {!isMobileDevice && (
                  <InputFieldContainer
                     isAddingAttachment={this.isAddingAttachment}
                  >
                     <InputBox
                        ref={this.addAttachmentRef}
                        value={this.attachmentURL}
                        onKeyPress={this.onKeyDownURL}
                        onChange={this.onChangeAttachmentURL}
                        type={inputFieldType.text}
                        validate={this.validateURL}
                        placeholder={t(
                           `workbookManagement:cardDetails.pasteUrl`
                        )}
                        testId='addAttachmentInput'
                     />
                  </InputFieldContainer>
               )}
               {this.renderAddAttachmentButton()}
            </AddAttachmentsContainer>
         )
      }
   )

   @action.bound
   onDeleteLabel = (): void => {
      const selectedColor = {
         backgroundColor: null,
         borderColor: null,
         textColor: null
      }

      this.cardLabelBackground = colors.white
      this.cardLabelTextColor = colors.darkBlueGrey
      this.onChangeCardLabel(selectedColor)
   }

   onDeletePriority = (): void => {
      this.cardPriority = ''
      this.onUpdateCardPriority(null)
   }

   onSuccessUpdateDueDateAndTime = (): void => {
      //TODO: Need to handle this case
   }

   onFailureUpdateDueDateAndTime = (error: any): void => {
      showFailureBottomCenterToast(getAPIErrorMessage(error))
   }

   updateDueDateAndTime = (value: string | null): void => {
      const {
         cardModel: {
            updateDueDateAndTimeAPI,
            cardDetails: { dueDateAndTime }
         }
      } = this.props
      if (dueDateAndTime !== value) {
         const request = { due_datetime: value }
         updateDueDateAndTimeAPI(
            request,
            this.onSuccessUpdateDueDateAndTime,
            this.onFailureUpdateDueDateAndTime
         )
      }
   }

   onCloseDateTimePicker = (date): void => {
      if (date) {
         const formattedDate = getDateAndTimeFormat(date)
         this.updateDueDateAndTime(formattedDate)
      }
   }

   onDeleteDueDateAndTime = (): void => {
      this.updateDueDateAndTime(null)
   }

   renderDiscussions = () => {
      const {
         cardModel: {
            cardDetails: { id }
         },
         shouldDisableActions
      } = this.props
      return (
         <DiscussionsView
            entityId={id}
            entityType={CARD}
            shouldDisableActions={shouldDisableActions}
         />
      )
   }

   changeTab = (selectedTab: SELECTED_TAB): void => {
      this.selectedTab = selectedTab
   }

   renderSelectedTabComponent = observer(
      ({ cardId }): ReactElement => {
         const { DISCUSSIONS } = SELECTED_TAB
         const { shouldDisableActions } = this.props
         return this.selectedTab === DISCUSSIONS ? (
            this.renderDiscussions()
         ) : (
            <ChecklistContainer
               shouldDisablePointerEvents={shouldDisableActions}
            >
               <ChecklistController entityId={cardId} entityType={CARD} />
            </ChecklistContainer>
         )
      }
   )

   updateTabBarIcons = (): void => {
      const { DISCUSSIONS, CHECKLIST } = SELECTED_TAB
      if (this.selectedTab === DISCUSSIONS) {
         tabs[0]['icon'] = <DiscussionsIcon fill={colors.primary500Default} />
      } else {
         tabs[0]['icon'] = <DiscussionsIcon />
      }
      if (this.selectedTab === CHECKLIST) {
         tabs[1]['icon'] = <ChecklistIcon fill={colors.primary500Default} />
      } else {
         tabs[1]['icon'] = <ChecklistIcon />
      }
   }

   renderCardDetailsFilterBar = observer(
      ({ cardLabelBackground, priority, dueDateAndTime }) => {
         const { shouldDisableActions } = this.props
         return shouldDisableActions ? null : (
            <CardDetailsFilterBar
               onChangeCardLabel={this.onChangeCardLabel}
               onDeleteLabel={this.onDeleteLabel}
               onDeletePriority={this.onDeletePriority}
               selectedPriority={priority}
               selectedColor={cardLabelBackground}
               onChangeCardPriority={this.onChangeCardPriority}
               onCloseDateTimePicker={this.onCloseDateTimePicker}
               selectedDueDateAndTime={dueDateAndTime}
               onDeleteDueDateAndTime={this.onDeleteDueDateAndTime}
               shouldDisableActions={shouldDisableActions}
            />
         )
      }
   )

   renderSuccessUI = observer(() => {
      const {
         renderCardHeader: RenderCardHeader,
         renderSelectedTabComponent: RenderSelectedTabComponent,
         renderNotes: RenderNotes,
         updateTabBarIcons,
         renderCardDetailsFilterBar: RenderCardDetailsFilterBar
      } = this
      const {
         cardModel: {
            id,
            cardDetails: { title, label, priority, dueDateAndTime }
         }
      } = this.props
      this.cardLabelBackground =
         this.cardLabelBackground !== null ? this.cardLabelBackground : label
      this.cardLabelTextColor =
         this.cardLabelTextColor !== null
            ? this.cardLabelTextColor
            : getTextColor(this.cardLabelBackground)
      this.cardTitle = title
      this.cardPriority =
         this.cardPriority !== null ? this.cardPriority : `${priority}`
      updateTabBarIcons()
      return (
         <>
            <RenderCardHeader />
            <CardDetailsBody>
               <RenderNotes />
               <RenderCardDetailsFilterBar
                  cardLabelBackground={this.cardLabelBackground}
                  priority={this.cardPriority}
                  dueDateAndTime={dueDateAndTime}
               />
               {this.renderAttachments()}
               {!isMobileDevice && (
                  <TabsContainer>
                     <TabBar
                        tabsList={tabs}
                        onClickTab={this.changeTab}
                        defaultSelectedTab={this.selectedTab}
                     />
                     <RenderSelectedTabComponent cardId={id} />
                  </TabsContainer>
               )}
            </CardDetailsBody>
         </>
      )
   })

   render(): React.ReactNode {
      const {
         modalRef,
         cardModel: { getCardDetailsAPIStatus, cardDetailsAPIError }
      } = this.props
      this.onChangeIsAddingAttachment(false)
      return (
         <CardDetailsContainer>
            <BaseModalContainer
               ref={modalRef}
               hideCloseIcon
               dialogClass={styles.cardDetailsModalStyles}
               isOutSideClick={true}
            >
               <Children>
                  <LoadingWrapper
                     apiStatus={getCardDetailsAPIStatus}
                     apiError={cardDetailsAPIError}
                     renderSuccessUI={this.renderSuccessUI}
                     onRetry={this.getCardDetails}
                  />
               </Children>
            </BaseModalContainer>
         </CardDetailsContainer>
      )
   }
}

export default withTranslation()(CardDetails)
