import React, { Component, ReactNode, ReactElement } from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import { withTranslation } from 'react-i18next'

import { APIStatus } from '@ib/api-constants'

import ChevronDown from '../../../../Common/icons/ChevronDown'
import LeftMergeIcon from '../../../../Common/icons/LeftMergeIcon'
import RightMergeIcon from '../../../../Common/icons/RightMergeIcon'
import LinkIcon from '../../../../Common/icons/LinkIcon'
import NotesIcon from '../../../../Common/icons/NotesIcon'
import LeftUndoIcon from '../../../../Common/icons/LeftUndoIcon'
import RightUndoIcon from '../../../../Common/icons/RightUndoIcon'
import PlusIcon from '../../../../Common/icons/PlusIcon'
import CloseIcon from '../../../../Common/icons/CloseIcon'
import ReactSelectDropDownArrow from '../../../../Common/icons/ReactSelectDropDownArrow'
import ColorPalette from '../../../../Common/components/ColorPalette'
import PriorityGroup from '../../../../Common/components/PriorityGroup'
import Button from '../../../../Common/components/Button'
import LoadingWrapper from '../../../../Common/components/LoadingWrapper'
import colors from '../../../../Common/themes/Colors'
import BaseModalContainer from '../../../../Common/components/BaseModalContainer'
import MoveResource from '../../../../Common/components/MoveResource'
import MoveResourceBodyWrapper from '../../../../Common/components/MoveResourceBodyWrapper'
import { showFailureBottomCenterToast } from '../../../../Common/utils/ToastUtils'
import {
   MERGE,
   CARD,
   LEFT_MERGE_BUTTON
} from '../../../../Common/constants/UIConstants'
import { getAPIErrorMessage } from '../../../../Common/utils/APIUtils'

import {
   GetMultipleCardDetailsResponseType,
   MergeCardsRequestType
} from '../../../stores/types'
import WorkbookModel from '../../../stores/models/WorkbookModel'
import CardModel from '../../../stores/models/CardModel'
import WorkbookChildDetailsModel from '../../../stores/models/WorkbookChildDetailsModel'
import {
   priorityList,
   LEFT,
   RIGHT,
   NOTE,
   mobileTabsList
} from '../../../constants/UIConstants'
import CardFixture from '../../../services/CardService/index.fixture'

import SectionCard from '../../SectionCard'
import Attachment from '../../Attachment'
import Quill from '../../Quill'

import SelectedCards from '../SelectedCards'
import { isEmpty } from '../../../../Common/utils/ValidationUtils'

import { isMobileDevice } from '../../../../Common/utils/responsiveUtils'
import BottomDrawerWithHeader from '../../../../Common/components/BottomDrawerWithHeader'
import BottomDrawer from '../../../../Common/components/BottomDrawer'
import TabBar from '../../../../Common/components/TabBar'
import AttachmentPreviewGroup from '../../AttachmentPreviewGroup'
import MergePopUpHeader from './MergePopUpHeader'
import {
   MergeCardsContainer,
   MergeCardsHeader,
   MergeCardsTitle,
   MergeCardsWrapper,
   CardsWrapper,
   LeftAndRightCardSection,
   CardsDropDownIcon,
   MiddleCardSection,
   MergedCardTitle,
   TitlesWrapper,
   SectionTitleLabel,
   LeftAndRightTitleSection,
   MiddleTitleSection,
   TitleInputField,
   NotesWrapper,
   LeftAndRightNotesSection,
   MiddleNotesSection,
   AttachmentsWrapper,
   LeftAndRightAttachmentsSection,
   MiddleAttachmentsSection,
   LabelsWrapper,
   LeftAndRightLabelsSection,
   MiddleLabelsSection,
   PriorityWrapper,
   LeftAndRightPrioritySection,
   MiddlePrioritySection,
   LeftIconContainer,
   RightIconContainer,
   NotesLeftIconContainer,
   NotesRightIconContainer,
   SectionTitleAndIconContainer,
   TitleIconContainer,
   NextButtonContainer,
   NextButton,
   NextButtonDisabledText,
   AddAttachmentsContainer,
   InputFieldContainer,
   InputBox,
   AddAttachmentButton,
   ButtonText,
   InputFieldWithCloseButton,
   CloseButton,
   PriorityGroupContainer,
   ColorPalletteContainer,
   CardSection,
   InputFieldWithClearButton,
   InputClearButton,
   NextButtonActiveText,
   EditableTextStyle,
   NotesContainer,
   NotesEditorContainer,
   MobileMiddleSection,
   CloseMergeCardsButton,
   AddAttachmentsHeaderContainer,
   AddAttachmentHeaderTitle,
   AddAttachmentsOverLayContainer,
   AddAttachmentButtonsContainer,
   AttachButton,
   AttachButtonText,
   MobileLayout,
   tabListContainerCSS,
   MobileMergeCardsContainer,
   MobileTopAndBottomSection,
   MobileContentTitleAndContent,
   TabBarContainer,
   itemCSS,
   MobileMergedCardTitle,
   tabContainerCSS,
   AttachmentsContainer
} from './styledComponents'
import MobileMergeNavBar from './MobileMergeNavBar'

const mobileTabs = {
   title: 'TITLE',
   note: 'NOTE',
   attachment: 'ATTACHMENT',
   label: 'LABEL',
   priority: 'PRIORITY'
}
// FIXME: Need to fix WithTranslation Props
interface WithTranslation {
   i18n: any
   tReady: any
   t: any
}

interface MergeStatus {
   isTitleMerged: boolean
   isNotesMerged: boolean
   areAttachmentsMerged: boolean
   isLabelMerged: boolean
   isPriorityMerged: boolean
}

interface MergeCardsProps extends WithTranslation {
   workbookId: string
   selectedCards: Array<CardModel>
   getMultipleCardDetailsAPIStatus: APIStatus
   // TODO: Need to update type
   getMultipleCardDetailsAPIError: any
   getMultipleCardDetailsAPI: (request: {
      card_ids: Array<string>
   }) => Promise<GetMultipleCardDetailsResponseType>
   cardsDetails: Array<CardModel>
   clearSelectedCards: () => void
   mergeCardsAPI: (
      request: MergeCardsRequestType,
      onSuccess: () => void,
      onFailure: () => void
   ) => void
   mergeCardsAPIStatus: APIStatus
   // TODO: Need to update type
   mergeCardsAPIError: any
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
   getActivePageDetails: () => void
   workbookDetails: WorkbookModel
   getRootFolderDetailsAPI: (onSuccess: () => void) => void
   getRootFolderDetailsAPIStatus: APIStatus
   // TODO: Need to update the type
   getRootFolderDetailsAPIError: any
   onClickCloseButton: () => void
   clearMoveWorkbooksAndFolders: () => void
   clearWorkbookChildDetails: () => void
}

@observer
class MergeCards extends Component<MergeCardsProps> {
   @observable title: string
   @observable notes: string
   @observable attachments: Array<{
      attachmentId: string
      url: string
      creationDateTime: string
   }>
   @observable label: string
   @observable priority: string
   @observable leftSideCardMergeStatus!: MergeStatus
   @observable rightSideCardMergeStatus!: MergeStatus
   // TODO: Need to update types
   @observable activeLeftCardDetails!: CardModel
   @observable activeRightCardDetails!: CardModel
   @observable isAddingAttachment: boolean
   @observable attachmentURL: string
   @observable shouldLeftSideSelectedCardsVisible: boolean
   @observable shouldRightSideSelectedCardsVisible: boolean
   @observable isNextButtonDisabled: boolean
   @observable selectedTab: string
   // TODO: Need to update type
   mergeModalRef
   notesEditorRef
   @observable cardsMergeStatus: Map<string, MergeStatus>

   constructor(props) {
      super(props)
      this.title = ''
      this.notes = ''
      this.attachments = []
      this.label = ''
      this.priority = ''
      this.initLeftCardMergeStatus()
      this.initRightCardMergeStatus()
      this.isAddingAttachment = false
      this.attachmentURL = ''
      this.shouldLeftSideSelectedCardsVisible = false
      this.shouldRightSideSelectedCardsVisible = false
      this.isNextButtonDisabled = true
      this.mergeModalRef = React.createRef<BaseModalContainer>()
      this.notesEditorRef = React.createRef<Quill>()
      this.cardsMergeStatus = new Map()
      this.initCardsMergeStatus()
      this.selectedTab = mobileTabsList[0].value
   }

   componentDidMount(): void {
      this.getCardsDetails()
   }

   initCardsMergeStatus = (): void => {
      const { selectedCards } = this.props
      const initCardMergeStatus = {
         isTitleMerged: false,
         isNotesMerged: false,
         areAttachmentsMerged: false,
         isLabelMerged: false,
         isPriorityMerged: false
      }
      selectedCards.forEach(card => {
         this.cardsMergeStatus.set(card.id, initCardMergeStatus)
      })
   }

   initLeftCardMergeStatus = (): void => {
      this.leftSideCardMergeStatus = {
         isTitleMerged: false,
         isNotesMerged: false,
         areAttachmentsMerged: false,
         isLabelMerged: false,
         isPriorityMerged: false
      }
   }

   initRightCardMergeStatus = (): void => {
      this.rightSideCardMergeStatus = {
         isTitleMerged: false,
         isNotesMerged: false,
         areAttachmentsMerged: false,
         isLabelMerged: false,
         isPriorityMerged: false
      }
   }

   getCardsDetails = (): void => {
      const {
         selectedCards,
         getMultipleCardDetailsAPI,
         clearSelectedCards
      } = this.props
      const cardIds = selectedCards.map(card => card.id)
      getMultipleCardDetailsAPI({ card_ids: cardIds })
      clearSelectedCards()
   }

   onUpdateNotesData = value => {
      this.notes = value
   }

   checkMergeTitle = (): void => {
      if (this.title.trim().length > 0) {
         this.isNextButtonDisabled = false
      } else {
         this.isNextButtonDisabled = true
      }
   }

   // TODO: Need to update type
   onChangeTitle = (event: any): void => {
      this.title = event.target.value
      this.checkMergeTitle()
   }

   clearTitle = (): void => {
      this.title = ''
      this.isNextButtonDisabled = true
   }

   clearNotes = (): void => {
      this.notes = ''
      this.notesEditorRef.current.setEditorData(this.notes)
   }

   @action
   onChangeLabelColor = (labelDetails: {
      backgroundColor: string
      borderColor: string
   }): void => {
      const { backgroundColor } = labelDetails
      this.label = backgroundColor
   }

   @action
   onChangePriority = (updatedPriority: string): void => {
      this.priority = updatedPriority
   }

   getCardStatus = (cardId: string): MergeStatus | undefined =>
      this.cardsMergeStatus.get(cardId)

   @action
   onClickLeftTitleButton = (): void => {
      const { id } = this.activeLeftCardDetails
      const cardMergeStatus = this.getCardStatus(id)
      const { name } = this.activeLeftCardDetails
      if (cardMergeStatus) {
         if (cardMergeStatus.isTitleMerged) {
            this.leftSideCardMergeStatus.isTitleMerged = false
            cardMergeStatus.isTitleMerged = false
            this.title = this.title.replace(name, '')
            this.title = this.title.trim()
         } else {
            this.leftSideCardMergeStatus.isTitleMerged = true
            cardMergeStatus.isTitleMerged = true
            if (this.title.length !== 0) {
               this.title += ' '
            }
            this.title += name
         }
         this.checkMergeTitle()
      }
   }

   @action
   onClickLeftNotesButton = (): void => {
      const { id } = this.activeLeftCardDetails
      const cardMergeStatus = this.getCardStatus(id)
      if (cardMergeStatus) {
         const {
            cardDetails: { notes }
         } = this.activeLeftCardDetails
         if (cardMergeStatus.isNotesMerged) {
            this.leftSideCardMergeStatus.isNotesMerged = false
            cardMergeStatus.isNotesMerged = false
            this.notes = this.notesEditorRef.current
               ?.getEditorData()
               .replace(notes, '')
         } else {
            this.leftSideCardMergeStatus.isNotesMerged = true
            cardMergeStatus.isNotesMerged = true
            if (
               this.notesEditorRef.current?.getEditorData() === '<p><br></p>'
            ) {
               this.notes = notes
            } else {
               this.notes = this.notesEditorRef.current?.getEditorData() + notes
            }
         }
         this.notesEditorRef.current?.setEditorData(this.notes)
      }
   }

   @action
   onClickLeftAttachmentsButton = (): void => {
      const { id } = this.activeLeftCardDetails
      const cardMergeStatus = this.getCardStatus(id)
      if (cardMergeStatus) {
         const {
            cardDetails: { attachments }
         } = this.activeLeftCardDetails
         if (cardMergeStatus.areAttachmentsMerged) {
            this.leftSideCardMergeStatus.areAttachmentsMerged = false
            cardMergeStatus.areAttachmentsMerged = false
            attachments.forEach(attachment => {
               this.attachments = this.attachments.filter(
                  localAttachment =>
                     localAttachment.attachmentId !== attachment.attachmentId
               )
            })
         } else {
            this.leftSideCardMergeStatus.areAttachmentsMerged = true
            cardMergeStatus.areAttachmentsMerged = true
            attachments.forEach(attachment => {
               this.attachments.push(attachment)
            })
         }
      }
   }

   @action
   onClickLeftLabelButton = (): void => {
      const { id } = this.activeLeftCardDetails
      const cardMergeStatus = this.getCardStatus(id)
      if (cardMergeStatus) {
         const {
            cardDetails: { label }
         } = this.activeLeftCardDetails
         if (cardMergeStatus.isLabelMerged) {
            this.leftSideCardMergeStatus.isLabelMerged = false
            cardMergeStatus.isLabelMerged = false
            if (label === this.label) {
               this.label = ''
            }
         } else {
            this.leftSideCardMergeStatus.isLabelMerged = true
            cardMergeStatus.isLabelMerged = true
            this.label = label
         }
      }
   }

   @action
   onClickLeftPriorityButton = (): void => {
      const { id } = this.activeLeftCardDetails
      const cardMergeStatus = this.getCardStatus(id)
      if (cardMergeStatus) {
         const {
            cardDetails: { priority }
         } = this.activeLeftCardDetails
         if (cardMergeStatus.isPriorityMerged) {
            this.leftSideCardMergeStatus.isPriorityMerged = false
            cardMergeStatus.isPriorityMerged = false
            if (priority.toString() === this.priority) {
               this.priority = '0'
            }
         } else {
            this.leftSideCardMergeStatus.isPriorityMerged = true
            cardMergeStatus.isPriorityMerged = true
            this.priority = priority.toString()
         }
      }
   }

   renderLeftMergeOrUndoIcon = (isMerged: boolean): ReactNode =>
      isMerged ? <LeftUndoIcon /> : <RightMergeIcon />

   @action
   onClickRightTitleButton = (): void => {
      const { id } = this.activeRightCardDetails
      const cardMergeStatus = this.getCardStatus(id)
      if (cardMergeStatus) {
         const { name } = this.activeRightCardDetails
         if (cardMergeStatus.isTitleMerged) {
            this.rightSideCardMergeStatus.isTitleMerged = false
            cardMergeStatus.isTitleMerged = false
            this.title = this.title.replace(name, '')
            this.title = this.title.trim()
         } else {
            this.rightSideCardMergeStatus.isTitleMerged = true
            cardMergeStatus.isTitleMerged = true
            if (this.title.length !== 0) {
               this.title += ' '
            }
            this.title += name
         }
         this.checkMergeTitle()
      }
   }

   @action
   onClickRightNotesButton = (): void => {
      const { id } = this.activeRightCardDetails
      const cardMergeStatus = this.getCardStatus(id)
      if (cardMergeStatus) {
         const {
            cardDetails: { notes }
         } = this.activeRightCardDetails
         if (cardMergeStatus.isNotesMerged) {
            this.rightSideCardMergeStatus.isNotesMerged = false
            cardMergeStatus.isNotesMerged = false
            this.notes = this.notesEditorRef.current
               ?.getEditorData()
               .replace(notes, '')
         } else {
            this.rightSideCardMergeStatus.isNotesMerged = true
            cardMergeStatus.isNotesMerged = true
            if (
               this.notesEditorRef.current?.getEditorData() === '<p><br></p>'
            ) {
               this.notes = notes
            } else {
               this.notes = this.notesEditorRef.current?.getEditorData() + notes
            }
         }
         this.notesEditorRef.current?.setEditorData(this.notes)
      }
   }

   @action
   onClickRightAttachmentsButton = (): void => {
      const { id } = this.activeRightCardDetails
      const cardMergeStatus = this.getCardStatus(id)
      if (cardMergeStatus) {
         const {
            cardDetails: { attachments }
         } = this.activeRightCardDetails
         if (cardMergeStatus.areAttachmentsMerged) {
            this.rightSideCardMergeStatus.areAttachmentsMerged = false
            cardMergeStatus.areAttachmentsMerged = false
            attachments.forEach(attachment => {
               this.attachments = this.attachments.filter(
                  localAttachment =>
                     localAttachment.attachmentId !== attachment.attachmentId
               )
            })
         } else {
            this.rightSideCardMergeStatus.areAttachmentsMerged = true
            cardMergeStatus.areAttachmentsMerged = true
            attachments.forEach(attachment => {
               this.attachments.push(attachment)
            })
         }
      }
   }

   @action
   onClickRightLabelButton = (): void => {
      const { id } = this.activeRightCardDetails
      const cardMergeStatus = this.getCardStatus(id)
      if (cardMergeStatus) {
         const {
            cardDetails: { label }
         } = this.activeRightCardDetails
         if (cardMergeStatus.isLabelMerged) {
            this.rightSideCardMergeStatus.isLabelMerged = false
            cardMergeStatus.isLabelMerged = false
            if (label === this.label) {
               this.label = ''
            }
         } else {
            this.rightSideCardMergeStatus.isLabelMerged = true
            cardMergeStatus.isLabelMerged = true
            this.label = label
         }
      }
   }

   @action
   onClickRightPriorityButton = (): void => {
      const { id } = this.activeRightCardDetails
      const cardMergeStatus = this.getCardStatus(id)
      if (cardMergeStatus) {
         const {
            cardDetails: { priority }
         } = this.activeRightCardDetails
         if (cardMergeStatus.isPriorityMerged) {
            this.rightSideCardMergeStatus.isPriorityMerged = false
            cardMergeStatus.isPriorityMerged = false
            if (priority.toString() === this.priority) {
               this.priority = '0'
            }
         } else {
            this.rightSideCardMergeStatus.isPriorityMerged = true
            cardMergeStatus.isPriorityMerged = true
            this.priority = priority.toString()
         }
      }
   }

   renderRightMergeOrUndoIcon = (isMerged: boolean): ReactNode =>
      isMerged ? <RightUndoIcon /> : <LeftMergeIcon />

   // TODO: Need to update type
   onChangeAttachmentURL = (event: any): void => {
      this.attachmentURL = event.target.value
   }

   onChangeIsAddingAttachment = (isAddingAttachment: boolean): void => {
      if (this.attachmentURL) {
         this.attachmentURL = ''
      }
      this.isAddingAttachment = isAddingAttachment
   }

   onClickEditAttachment = (attachmentDetails: {
      attachmentId: string
      url: string
   }): void => {
      const { attachmentId, url } = attachmentDetails
      const attachment = this.attachments.find(
         attachment => attachment.attachmentId === attachmentId
      )
      if (attachment) {
         attachment.url = url
      }
   }

   onClickDeleteAttachment = (attachmentId: string): void => {
      this.attachments = this.attachments.filter(
         attachment => attachment.attachmentId !== attachmentId
      )
   }

   onPressKeyInsideAttachmentInput = (
      event: React.KeyboardEvent<HTMLInputElement>
   ): void => {
      if (event.charCode === 13 && this.attachmentURL !== '') {
         const date = new Date().toLocaleDateString()
         this.attachments.push({
            url: this.attachmentURL,
            attachmentId: uuidv4(),
            creationDateTime: date
         })
         this.onChangeIsAddingAttachment(false)
         this.attachmentURL = ''
      }
   }
   addAttachments = () => {
      const date = new Date().toLocaleDateString()
      this.attachments.push({
         url: this.attachmentURL,
         attachmentId: uuidv4(),
         creationDateTime: date
      })
      this.onChangeIsAddingAttachment(false)
      this.attachmentURL = ''
   }

   renderAttachmentInputField = (shouldShowCloseButton = false): any => {
      const { t } = this.props
      return this.isAddingAttachment ? (
         <InputFieldWithCloseButton>
            <InputFieldContainer>
               <InputBox
                  value={this.attachmentURL}
                  onChange={this.onChangeAttachmentURL}
                  onKeyPress={this.onPressKeyInsideAttachmentInput}
                  placeholder={t('workbookManagement:cardDetails.pasteUrl')}
               />
            </InputFieldContainer>
            {shouldShowCloseButton ? null : (
               <CloseButton
                  onClick={(): void => this.onChangeIsAddingAttachment(false)}
               >
                  <CloseIcon fill={colors.black} width={16} height={16} />
               </CloseButton>
            )}
         </InputFieldWithCloseButton>
      ) : null
   }

   renderAddAttachments = observer(
      (): ReactElement => {
         const { t } = this.props
         return (
            <AddAttachmentsContainer>
               {this.renderAttachmentInputField()}
               <AddAttachmentButton
                  onClick={(): void => this.onChangeIsAddingAttachment(true)}
                  data-testid='mergeCardsAddAttachmentsButton'
               >
                  <PlusIcon />
                  <ButtonText>
                     {t('workbookManagement:cardDetails.addAttachments').slice(
                        0,
                        -1
                     )}
                  </ButtonText>
               </AddAttachmentButton>
            </AddAttachmentsContainer>
         )
      }
   )

   renderHeaderContent = (): ReactNode => (
      <AddAttachmentsHeaderContainer>
         <AddAttachmentHeaderTitle>Add Attachment</AddAttachmentHeaderTitle>
      </AddAttachmentsHeaderContainer>
   )

   renderAddAttachmentsOverLay = observer(
      (): ReactElement => {
         const { t } = this.props
         return (
            <>
               <AddAttachmentButton
                  onClick={(): void => this.onChangeIsAddingAttachment(true)}
                  data-testid='mergeCardsAddAttachmentsButton'
               >
                  <PlusIcon />
                  <ButtonText>
                     {t('workbookManagement:cardDetails.addAttachments').slice(
                        0,
                        -1
                     )}
                  </ButtonText>
               </AddAttachmentButton>
               <BottomDrawerWithHeader
                  isVisible={this.isAddingAttachment}
                  closeDrawer={() => this.onChangeIsAddingAttachment(false)}
                  headerContent={this.renderHeaderContent()}
               >
                  <AddAttachmentsOverLayContainer>
                     {this.renderAttachmentInputField(true)}
                     <AddAttachmentButtonsContainer>
                        <AttachButton onClick={this.addAttachments}>
                           <AttachButtonText>Attach</AttachButtonText>
                        </AttachButton>
                     </AddAttachmentButtonsContainer>
                  </AddAttachmentsOverLayContainer>
               </BottomDrawerWithHeader>
            </>
         )
      }
   )

   // TODO: Need to mention return type
   renderLeftSideSelectedCards = observer((): any => {
      const { cardsDetails, workbookChildDetails, workbookDetails } = this.props
      if (this.shouldLeftSideSelectedCardsVisible) {
         if (isMobileDevice)
            return (
               <BottomDrawer
                  isVisible={true}
                  closeDrawer={() => this.toggleSelectedCardsVisibility(LEFT)}
               >
                  <SelectedCards
                     activeLeftSideCardId={this.activeLeftCardDetails.id}
                     activeRightSideCardId={this.activeRightCardDetails.id}
                     clickedSide={LEFT}
                     selectedCards={cardsDetails}
                     onClickCard={this.changeActiveCard}
                     workbookChildDetails={workbookChildDetails}
                     workbookDetails={workbookDetails}
                  />
               </BottomDrawer>
            )
         return (
            <SelectedCards
               activeLeftSideCardId={this.activeLeftCardDetails.id}
               activeRightSideCardId={this.activeRightCardDetails.id}
               clickedSide={LEFT}
               selectedCards={cardsDetails}
               onClickCard={this.changeActiveCard}
               workbookChildDetails={workbookChildDetails}
               workbookDetails={workbookDetails}
            />
         )
      }
      return null
   })

   // TODO: Need to mention return type
   renderRightSideSelectedCards = observer((): any => {
      const { cardsDetails, workbookChildDetails, workbookDetails } = this.props
      if (this.shouldRightSideSelectedCardsVisible) {
         if (isMobileDevice)
            return (
               <BottomDrawer
                  isVisible={true}
                  closeDrawer={() => this.toggleSelectedCardsVisibility(RIGHT)}
               >
                  <SelectedCards
                     activeLeftSideCardId={this.activeLeftCardDetails.id}
                     activeRightSideCardId={this.activeRightCardDetails.id}
                     clickedSide={RIGHT}
                     selectedCards={cardsDetails}
                     onClickCard={this.changeActiveCard}
                     workbookChildDetails={workbookChildDetails}
                     workbookDetails={workbookDetails}
                  />
               </BottomDrawer>
            )
         return (
            <SelectedCards
               activeLeftSideCardId={this.activeLeftCardDetails.id}
               activeRightSideCardId={this.activeRightCardDetails.id}
               clickedSide={RIGHT}
               selectedCards={cardsDetails}
               onClickCard={this.changeActiveCard}
               workbookChildDetails={workbookChildDetails}
               workbookDetails={workbookDetails}
            />
         )
      }
      return null
   })

   @action
   toggleSelectedCardsVisibility = (clickedSide: string): any => {
      if (clickedSide === LEFT) {
         this.shouldRightSideSelectedCardsVisible = false
         this.shouldLeftSideSelectedCardsVisible = !this
            .shouldLeftSideSelectedCardsVisible
      } else if (clickedSide === RIGHT) {
         this.shouldLeftSideSelectedCardsVisible = false
         this.shouldRightSideSelectedCardsVisible = !this
            .shouldRightSideSelectedCardsVisible
      }
   }

   renderDownOrUpArrow = observer(({ clickedSide }): any => {
      if (clickedSide === LEFT) {
         return this.shouldLeftSideSelectedCardsVisible ? (
            <ReactSelectDropDownArrow
               width={16}
               height={16}
               fill={colors.darkBlueGrey}
            />
         ) : (
            <ChevronDown width={16} height={16} />
         )
      }
      return this.shouldRightSideSelectedCardsVisible ? (
         <ReactSelectDropDownArrow
            width={16}
            height={16}
            fill={colors.darkBlueGrey}
         />
      ) : (
         <ChevronDown width={16} height={16} />
      )
   })

   @action
   changeLeftCardMergeStatus = (cardId: string): void => {
      const cardStatus = this.cardsMergeStatus.get(cardId)
      if (cardStatus) {
         this.leftSideCardMergeStatus = cardStatus
      }
   }

   @action
   changeRightCardMergeStatus = (cardId: string): void => {
      const cardStatus = this.cardsMergeStatus.get(cardId)
      if (cardStatus) {
         this.rightSideCardMergeStatus = cardStatus
      }
   }

   @action
   changeActiveCard = (clickedSide: string, newActiveCardId: string): any => {
      const { cardsDetails } = this.props
      if (clickedSide === LEFT) {
         const { id: currentActiveCardId } = this.activeLeftCardDetails
         if (currentActiveCardId !== newActiveCardId) {
            const cardDetails = cardsDetails.find(
               card => card.id === newActiveCardId
            )
            if (cardDetails) {
               this.activeLeftCardDetails = cardDetails
            }
            this.changeLeftCardMergeStatus(newActiveCardId)
         }
      } else if (clickedSide === RIGHT) {
         const { id: currentActiveCardId } = this.activeRightCardDetails
         if (currentActiveCardId !== newActiveCardId) {
            const cardDetails = cardsDetails.find(
               card => card.id === newActiveCardId
            )
            if (cardDetails) {
               this.activeRightCardDetails = cardDetails
            }
            this.changeRightCardMergeStatus(newActiveCardId)
         }
      }
      this.shouldRightSideSelectedCardsVisible = false
      this.shouldLeftSideSelectedCardsVisible = false
   }

   @action
   setActiveCardDetails = (): void => {
      const { cardsDetails } = this.props
      if (!this.activeLeftCardDetails && !this.activeRightCardDetails) {
         this.activeLeftCardDetails = cardsDetails[0]
         this.activeRightCardDetails = cardsDetails[1]
      }
   }

   renderNextButtonText = (): ReactNode => {
      const { t } = this.props
      return this.isNextButtonDisabled ? (
         <NextButtonDisabledText>
            {t('workbookManagement:mergeCards.next')}
         </NextButtonDisabledText>
      ) : (
         <NextButtonActiveText>
            {t('workbookManagement:mergeCards.next')}
         </NextButtonActiveText>
      )
   }

   getMergedCardData = (
      sectionId: string,
      clickedButton: string
   ): MergeCardsRequestType => {
      const { cardsDetails } = this.props
      const attachments = this.attachments.map(attachment => attachment.url)
      let deleteCardIds: Array<string> = []
      if (clickedButton === LEFT_MERGE_BUTTON) {
         deleteCardIds = cardsDetails.map(card => card.id)
      } else {
         deleteCardIds = []
      }
      const request = {
         section_id: sectionId,
         card_title: this.title,
         label: this.label === '' ? null : this.label,
         priority: this.priority !== '' ? parseInt(this.priority) : null,
         card_notes: this.notes,
         attachments: attachments,
         delete_card_ids: deleteCardIds,
         due_datetime: null
      }
      return request
   }

   openMergeModal = (): void => {
      this.mergeModalRef.current?.openModal()
   }

   closeMergeModal = (): void => {
      this.mergeModalRef.current?.closeModal()
   }

   renderMergePopUpHeader = (): ReactNode => {
      const id = uuidv4()
      const hasAttachments = this.attachments.length > 0
      const hasNotes = this.notes !== ''
      const priority = this.priority === '' ? null : parseInt(this.priority)
      const label = this.label === '' ? null : this.label
      const cardService = new CardFixture()
      const mergedCard = new CardModel(
         {
            card_id: id,
            card_title: this.title,
            has_attachments: hasAttachments,
            has_notes: hasNotes,
            priority: priority,
            label: label
         },
         null,
         cardService
      )
      const {
         getWorkbookChildDetailsAPI,
         getWorkbookChildDetailsAPIStatus,
         getWorkbookChildDetailsAPIError,
         getWorkbooksAndFoldersAPI,
         getWorkbooksAndFoldersStatus,
         getWorkbooksAndFoldersError,
         activeFolderInfo,
         workbookChildDetails,
         workbookDetails
      } = this.props
      return (
         <MergePopUpHeader
            onClickCloseButton={this.closeMergeModal}
            renderCard={
               <SectionCard
                  id={id}
                  cardName={this.title}
                  hasAttachments={this.attachments.length > 0}
                  hasNotes={this.notes !== ''}
                  onToggleCardSelection={(): void => {}}
                  card={mergedCard}
                  isDisabled={true}
                  moveCardAPI={() => {}}
                  moveCardAPIStatus={200}
                  moveCardAPIError={null}
                  getWorkbookChildDetailsAPI={getWorkbookChildDetailsAPI}
                  getWorkbookChildDetailsAPIStatus={
                     getWorkbookChildDetailsAPIStatus
                  }
                  getWorkbookChildDetailsAPIError={
                     getWorkbookChildDetailsAPIError
                  }
                  getWorkbooksAndFoldersAPI={getWorkbooksAndFoldersAPI}
                  getWorkbooksAndFoldersStatus={getWorkbooksAndFoldersStatus}
                  getWorkbooksAndFoldersError={getWorkbooksAndFoldersError}
                  activeFolderInfo={activeFolderInfo}
                  workbookChildDetails={workbookChildDetails}
                  getRootFolderDetailsAPI={() => {}}
                  getRootFolderDetailsAPIStatus={200}
                  getRootFolderDetailsAPIError={null}
                  rootFolderId={'1234'}
                  workbookDetails={workbookDetails}
                  deleteCardAPI={() => {}}
                  deleteCardAPIStatus={200}
                  deleteCardAPIError={null}
                  moveCard={(): void => {}}
                  clearMoveWorkbooksAndFolders={(): void => {}}
                  clearWorkbookChildDetails={(): void => {}}
                  maxWidth='50%'
               />
            }
         />
      )
   }

   onFailureMergeCards = (): void => {
      const { mergeCardsAPIError } = this.props
      showFailureBottomCenterToast(getAPIErrorMessage(mergeCardsAPIError))
   }

   onSuccessMergeCards = (): void => {
      const { getActivePageDetails } = this.props
      this.closeMergeModal()
      getActivePageDetails()
   }

   mergeCards = (clickedSide: string, sectionId: string): void => {
      const { mergeCardsAPI } = this.props
      const request = this.getMergedCardData(sectionId, clickedSide)
      mergeCardsAPI(request, this.onSuccessMergeCards, this.onFailureMergeCards)
   }

   setSelectedTab = (tab: string) => {
      if (this.selectedTab === NOTE) {
         this.notesEditorRef.current?.onBlur()
      }

      this.selectedTab = tab
   }

   /***************** mobile only methods start *****************/

   renderMergedCardTitle = () => {
      const { t } = this.props
      return (
         <MobileMergedCardTitle>
            {t('workbookManagement:mergeCards.mergedCard')}
         </MobileMergedCardTitle>
      )
   }

   setTopAndBottomSectionProps = (
      renderCardContent,
      onClickMergeIcon: Function,
      isDisabled: boolean,
      isContentMerged: boolean
   ) => ({
      renderCardContent,
      onClickMergeIcon,
      isDisabled,
      isContentMerged
   })

   renderMergingSectionBasedOnSelectedTab = () => {
      let topSectionProps, middleSectionProps, bottomSectionProps
      const { renderMergedCardTitle: MergedCardTitle } = this
      const { t } = this.props
      this.setActiveCardDetails()
      const { renderAddAttachmentsOverLay: RenderAddAttachmentsOverLay } = this
      let leftCardLabel = '',
         rightCardLabel = ''
      if (this.activeLeftCardDetails) {
         const label = this.activeLeftCardDetails.label
         if (label) {
            leftCardLabel = label
         }
      }
      if (this.activeRightCardDetails) {
         const label = this.activeRightCardDetails.label
         if (label) {
            rightCardLabel = label
         }
      }
      const {
         name: leftCardTitle,
         cardDetails: {
            notes: leftCardNotes,
            attachments: leftCardAttachments,
            priority: leftCardPriority
         }
      } = this.activeLeftCardDetails
      const {
         name: rightCardTitle,
         cardDetails: {
            notes: rightCardNotes,
            attachments: rightCardAttachments,
            priority: rightCardPriority
         }
      } = this.activeRightCardDetails
      const isLeftCardTitleEmpty = isEmpty(leftCardTitle)
      const isLeftCardNotesEmpty = isEmpty(leftCardNotes)
      const areLeftCardAttachmentsEmpty = leftCardAttachments.length === 0
      const isLeftCardLabelEmpty = isEmpty(leftCardLabel)
      const isLeftCardPriorityEmpty = isEmpty(leftCardPriority)
      const isRightCardTitleEmpty = isEmpty(rightCardTitle)
      const isRightCardNotesEmpty = isEmpty(rightCardNotes)
      const areRightCardAttachmentsEmpty = rightCardAttachments.length === 0
      const isRightCardLabelEmpty = isEmpty(rightCardLabel)
      const isRightCardPriorityEmpty = isEmpty(rightCardPriority)
      switch (this.selectedTab) {
         case mobileTabs.title:
            topSectionProps = this.setTopAndBottomSectionProps(
               () => (
                  <TitleInputField
                     value={this.activeLeftCardDetails.name}
                     disabled={true}
                  />
               ),
               this.onClickLeftTitleButton,
               isLeftCardTitleEmpty,
               this.leftSideCardMergeStatus.isTitleMerged
            )
            bottomSectionProps = this.setTopAndBottomSectionProps(
               () => (
                  <TitleInputField
                     value={this.activeRightCardDetails.name}
                     disabled={true}
                  />
               ),
               this.onClickRightTitleButton,
               isRightCardTitleEmpty,
               this.rightSideCardMergeStatus.isTitleMerged
            )

            middleSectionProps = () => (
               <>
                  <MergedCardTitle />
                  <InputFieldWithClearButton>
                     <TitleInputField
                        value={this.title}
                        onChange={this.onChangeTitle}
                        placeholder={t(
                           'workbookManagement:mergeCards.enterTitle'
                        )}
                        testId='mergeCardsTitleInput'
                     />
                  </InputFieldWithClearButton>
               </>
            )
            break
         case mobileTabs.note:
            topSectionProps = this.setTopAndBottomSectionProps(
               () => (
                  <NotesContainer>
                     <EditableTextStyle
                        as='p'
                        dangerouslySetInnerHTML={{
                           __html: this.activeLeftCardDetails.cardDetails.notes
                        }}
                     />
                  </NotesContainer>
               ),
               this.onClickLeftNotesButton,
               isLeftCardNotesEmpty,
               this.leftSideCardMergeStatus.isNotesMerged
            )
            middleSectionProps = () => (
               <>
                  <MergedCardTitle />
                  <InputFieldWithClearButton>
                     <NotesEditorContainer
                        className='notesEditorContainer'
                        isMobileDevice={isMobileDevice}
                     >
                        <Quill
                           key={'mobileMergeNotesEditorContainer'}
                           ref={this.notesEditorRef}
                           placeholder={t(
                              'workbookManagement:mergeCards.enterNote'
                           )}
                           value={this.notes}
                           bounds={'.notesEditorContainer'}
                           data-testid='mergeCardsNotesInput'
                           onBlur={this.onUpdateNotesData}
                        />
                     </NotesEditorContainer>
                  </InputFieldWithClearButton>
               </>
            )
            bottomSectionProps = this.setTopAndBottomSectionProps(
               () => (
                  <NotesContainer>
                     <EditableTextStyle
                        as='p'
                        dangerouslySetInnerHTML={{
                           __html: this.activeRightCardDetails.cardDetails.notes
                        }}
                     />
                  </NotesContainer>
               ),
               this.onClickRightNotesButton,
               isRightCardNotesEmpty,
               this.rightSideCardMergeStatus.isNotesMerged
            )

            break
         case mobileTabs.attachment:
            topSectionProps = this.setTopAndBottomSectionProps(
               () => (
                  <AttachmentPreviewGroup
                     attachments={
                        this.activeLeftCardDetails.cardDetails.attachments
                     }
                  />
               ),
               this.onClickLeftAttachmentsButton,
               areLeftCardAttachmentsEmpty,
               this.leftSideCardMergeStatus.areAttachmentsMerged
            )
            middleSectionProps = () => (
               <>
                  <MergedCardTitle />
                  <AttachmentPreviewGroup attachments={this.attachments} />

                  <RenderAddAttachmentsOverLay />
               </>
            )
            bottomSectionProps = this.setTopAndBottomSectionProps(
               () => (
                  <AttachmentPreviewGroup
                     attachments={
                        this.activeRightCardDetails.cardDetails.attachments
                     }
                  />
               ),
               this.onClickRightAttachmentsButton,
               areRightCardAttachmentsEmpty,
               this.rightSideCardMergeStatus.areAttachmentsMerged
            )
            break
         case mobileTabs.label:
            topSectionProps = this.setTopAndBottomSectionProps(
               () => (
                  <ColorPalletteContainer>
                     {' '}
                     <ColorPalette
                        onChangeSelectedColor={(): void => {}}
                        selectedColor={leftCardLabel}
                        isDisabled={true}
                     />
                  </ColorPalletteContainer>
               ),
               this.onClickLeftLabelButton,
               isLeftCardLabelEmpty,
               this.leftSideCardMergeStatus.isLabelMerged
            )
            middleSectionProps = () => (
               <>
                  {' '}
                  <MergedCardTitle />
                  <ColorPalletteContainer>
                     <ColorPalette
                        onChangeSelectedColor={this.onChangeLabelColor}
                        selectedColor={this.label}
                        colorLabelTestId='mergeCardColorLabel'
                        dropDownColorTestId='mergeCardDropDownColor'
                        intensityColorTestId='mergeCardIntensityColor'
                     />
                  </ColorPalletteContainer>
               </>
            )
            bottomSectionProps = this.setTopAndBottomSectionProps(
               () => (
                  <ColorPalletteContainer>
                     <ColorPalette
                        onChangeSelectedColor={(): void => {}}
                        selectedColor={rightCardLabel}
                        isDisabled={true}
                     />
                  </ColorPalletteContainer>
               ),
               this.onClickRightLabelButton,
               isRightCardLabelEmpty,
               this.rightSideCardMergeStatus.isLabelMerged
            )
            break
         case mobileTabs.priority:
            topSectionProps = this.setTopAndBottomSectionProps(
               () => (
                  <MobileContentTitleAndContent>
                     <SectionTitleLabel>
                        {t('workbookManagement:cardDetails.priority')}
                     </SectionTitleLabel>
                     <PriorityGroupContainer>
                        <PriorityGroup
                           priorityList={priorityList}
                           selectedValue={this.activeLeftCardDetails.cardDetails.priority.toString()}
                           onClickPriorityText={(): void => {}}
                        />
                     </PriorityGroupContainer>
                  </MobileContentTitleAndContent>
               ),
               this.onClickLeftPriorityButton,
               isLeftCardPriorityEmpty,
               this.leftSideCardMergeStatus.isPriorityMerged
            )
            middleSectionProps = () => (
               <>
                  <MergedCardTitle />
                  <MobileContentTitleAndContent>
                     {' '}
                     <SectionTitleLabel>
                        {t('workbookManagement:cardDetails.priority')}
                     </SectionTitleLabel>
                     <PriorityGroupContainer>
                        <PriorityGroup
                           priorityList={priorityList}
                           selectedValue={this.priority}
                           onClickPriorityText={this.onChangePriority}
                           priorityTestId='mergeCardPriorityButton'
                        />
                     </PriorityGroupContainer>
                  </MobileContentTitleAndContent>
               </>
            )
            bottomSectionProps = this.setTopAndBottomSectionProps(
               () => (
                  <MobileContentTitleAndContent>
                     <SectionTitleLabel>
                        {t('workbookManagement:cardDetails.priority')}
                     </SectionTitleLabel>
                     <PriorityGroupContainer>
                        <PriorityGroup
                           priorityList={priorityList}
                           selectedValue={this.activeRightCardDetails.cardDetails.priority.toString()}
                           onClickPriorityText={(): void => {}}
                        />
                     </PriorityGroupContainer>
                  </MobileContentTitleAndContent>
               ),
               this.onClickRightPriorityButton,
               isRightCardPriorityEmpty,
               this.rightSideCardMergeStatus.isPriorityMerged
            )
            break
      }
      return (
         <>
            {this.renderMobileTopSection(topSectionProps)}
            {this.renderMobileMiddleSection(middleSectionProps)}
            {this.renderMobileBottomSection(bottomSectionProps)}
         </>
      )
   }

   renderMobileTopSection = ({
      renderCardContent: RenderCardContent,
      onClickMergeIcon,
      isDisabled,
      isContentMerged
   }) => {
      const {
         getWorkbookChildDetailsAPI,
         getWorkbookChildDetailsAPIStatus,
         getWorkbookChildDetailsAPIError,
         getWorkbooksAndFoldersAPI,
         getWorkbooksAndFoldersStatus,
         getWorkbooksAndFoldersError,
         activeFolderInfo,
         workbookChildDetails,
         workbookDetails
      } = this.props
      const {
         renderLeftSideSelectedCards: RenderLeftSideSelectedCards,
         renderDownOrUpArrow: RenderDownOrUpArrow
      } = this

      return (
         <MobileTopAndBottomSection>
            <CardSection
               onClick={(): void => this.toggleSelectedCardsVisibility(LEFT)}
               data-testid='selectedMergeCardsLeftSection'
            >
               <SectionCard
                  id={this.activeLeftCardDetails.id}
                  cardName={this.activeLeftCardDetails.name}
                  hasAttachments={this.activeLeftCardDetails.hasAttachments}
                  hasNotes={this.activeLeftCardDetails.hasNotes}
                  onToggleCardSelection={(): void => {}}
                  card={this.activeLeftCardDetails}
                  isDisabled={true}
                  moveCardAPI={() => {}}
                  moveCardAPIStatus={200}
                  moveCardAPIError={null}
                  getWorkbookChildDetailsAPI={getWorkbookChildDetailsAPI}
                  getWorkbookChildDetailsAPIStatus={
                     getWorkbookChildDetailsAPIStatus
                  }
                  getWorkbookChildDetailsAPIError={
                     getWorkbookChildDetailsAPIError
                  }
                  getWorkbooksAndFoldersAPI={getWorkbooksAndFoldersAPI}
                  getWorkbooksAndFoldersStatus={getWorkbooksAndFoldersStatus}
                  getWorkbooksAndFoldersError={getWorkbooksAndFoldersError}
                  activeFolderInfo={activeFolderInfo}
                  workbookChildDetails={workbookChildDetails}
                  getRootFolderDetailsAPI={() => {}}
                  getRootFolderDetailsAPIStatus={200}
                  getRootFolderDetailsAPIError={null}
                  rootFolderId={'1234'}
                  workbookDetails={workbookDetails}
                  deleteCardAPI={() => {}}
                  deleteCardAPIStatus={200}
                  deleteCardAPIError={null}
                  moveCard={(): void => {}}
                  clearMoveWorkbooksAndFolders={(): void => {}}
                  clearWorkbookChildDetails={(): void => {}}
                  width={'calc(100% - 32px)'} //TODO: should use variable in place of 32
               />
               <CardsDropDownIcon>
                  <RenderDownOrUpArrow clickedSide={LEFT} />
               </CardsDropDownIcon>
            </CardSection>
            <RenderLeftSideSelectedCards />

            <RenderCardContent />
            <LeftIconContainer
               onClick={onClickMergeIcon}
               isDisabled={isDisabled}
               disabled={isDisabled}
               data-testid='leftCardTitleMergeOrUndoButton'
               isMobileDevice={isMobileDevice}
            >
               {this.renderLeftMergeOrUndoIcon(isContentMerged)}
            </LeftIconContainer>
         </MobileTopAndBottomSection>
      )
   }

   renderMobileMiddleSection = cardContent => (
      <MobileMiddleSection>{cardContent()}</MobileMiddleSection>
   )

   renderMobileBottomSection = ({
      renderCardContent: RenderCardContent,
      onClickMergeIcon,
      isDisabled,
      isContentMerged
   }) => {
      const {
         getWorkbookChildDetailsAPI,
         getWorkbookChildDetailsAPIStatus,
         getWorkbookChildDetailsAPIError,
         getWorkbooksAndFoldersAPI,
         getWorkbooksAndFoldersStatus,
         getWorkbooksAndFoldersError,
         activeFolderInfo,
         workbookChildDetails,
         workbookDetails
      } = this.props
      const {
         renderRightSideSelectedCards: RenderRightSideSelectedCards,
         renderDownOrUpArrow: RenderDownOrUpArrow
      } = this

      return (
         <MobileTopAndBottomSection>
            <RenderCardContent />
            <CardSection
               onClick={(): void => this.toggleSelectedCardsVisibility(RIGHT)}
               data-testid='selectedMergeCardsRightSection'
            >
               <SectionCard
                  id={this.activeRightCardDetails.id}
                  cardName={this.activeRightCardDetails.name}
                  hasAttachments={this.activeRightCardDetails.hasAttachments}
                  hasNotes={this.activeRightCardDetails.hasNotes}
                  onToggleCardSelection={(): void => {}}
                  card={this.activeRightCardDetails}
                  isDisabled={true}
                  moveCardAPI={() => {}}
                  moveCardAPIStatus={200}
                  moveCardAPIError={null}
                  getWorkbookChildDetailsAPI={getWorkbookChildDetailsAPI}
                  getWorkbookChildDetailsAPIStatus={
                     getWorkbookChildDetailsAPIStatus
                  }
                  getWorkbookChildDetailsAPIError={
                     getWorkbookChildDetailsAPIError
                  }
                  getWorkbooksAndFoldersAPI={getWorkbooksAndFoldersAPI}
                  getWorkbooksAndFoldersStatus={getWorkbooksAndFoldersStatus}
                  getWorkbooksAndFoldersError={getWorkbooksAndFoldersError}
                  activeFolderInfo={activeFolderInfo}
                  workbookChildDetails={workbookChildDetails}
                  getRootFolderDetailsAPI={() => {}}
                  getRootFolderDetailsAPIStatus={200}
                  getRootFolderDetailsAPIError={null}
                  rootFolderId={'1234'}
                  workbookDetails={workbookDetails}
                  deleteCardAPI={() => {}}
                  deleteCardAPIStatus={200}
                  deleteCardAPIError={null}
                  moveCard={(): void => {}}
                  clearMoveWorkbooksAndFolders={(): void => {}}
                  clearWorkbookChildDetails={(): void => {}}
                  width={'calc(100% - 32px)'} //TODO: need to use variable in place of 32
               />
               <CardsDropDownIcon>
                  <RenderDownOrUpArrow clickedSide={RIGHT} />
               </CardsDropDownIcon>
            </CardSection>
            <RenderRightSideSelectedCards />
            <RightIconContainer
               onClick={onClickMergeIcon}
               isDisabled={isDisabled}
               disabled={isDisabled}
               data-testid='rightCardTitleMergeOrUndoButton'
               isMobileDevice={isMobileDevice}
            >
               {this.renderRightMergeOrUndoIcon(isContentMerged)}
            </RightIconContainer>
         </MobileTopAndBottomSection>
      )
   }

   /***************** mobile only methods End *****************/

   renderMoveResources = (): ReactNode => {
      const {
         workbookId,
         mergeCardsAPIStatus,
         mergeCardsAPIError,
         getWorkbookChildDetailsAPI,
         getWorkbookChildDetailsAPIStatus,
         getWorkbookChildDetailsAPIError,
         getWorkbooksAndFoldersAPI,
         getWorkbooksAndFoldersStatus,
         getWorkbooksAndFoldersError,
         activeFolderInfo,
         workbookChildDetails,
         getRootFolderDetailsAPI,
         getRootFolderDetailsAPIStatus,
         getRootFolderDetailsAPIError,
         clearMoveWorkbooksAndFolders,
         clearWorkbookChildDetails
      } = this.props
      return (
         <MoveResourceBodyWrapper
            onCancel={this.closeMergeModal}
            actionType={MERGE}
            resourceType={CARD}
            getFolderDetailsAPI={getWorkbooksAndFoldersAPI}
            getFolderDetailsAPIStatus={getWorkbooksAndFoldersStatus}
            getFolderDetailsAPIError={getWorkbooksAndFoldersError}
            folderData={activeFolderInfo}
            onMoveFolderResourceAPI={(): void => {}}
            onMoveFolderResourceAPIStatus={200}
            onMergeAPI={this.mergeCards}
            onMergeAPIStatus={mergeCardsAPIStatus}
            onMergeAPIError={mergeCardsAPIError}
            getWorkbookDetailsAPI={getWorkbookChildDetailsAPI}
            getWorkbookDetailsAPIStatus={getWorkbookChildDetailsAPIStatus}
            getWorkbookDetailsAPIError={getWorkbookChildDetailsAPIError}
            workbookId={workbookId}
            workbookData={workbookChildDetails}
            getRootFolderDetailsAPI={getRootFolderDetailsAPI}
            getRootFolderDetailsAPIStatus={getRootFolderDetailsAPIStatus}
            getRootFolderDetailsAPIError={getRootFolderDetailsAPIError}
            clearMoveWorkbooksAndFolders={clearMoveWorkbooksAndFolders}
            clearWorkbookChildDetails={clearWorkbookChildDetails}
         />
      )
   }

   renderContent = observer(
      (): ReactElement => {
         const {
            t,
            onClickCloseButton,
            getWorkbookChildDetailsAPI,
            getWorkbookChildDetailsAPIStatus,
            getWorkbookChildDetailsAPIError,
            getWorkbooksAndFoldersAPI,
            getWorkbooksAndFoldersStatus,
            getWorkbooksAndFoldersError,
            activeFolderInfo,
            workbookChildDetails,
            workbookDetails
         } = this.props
         this.setActiveCardDetails()
         const {
            renderAddAttachments: RenderAddAttachments,
            renderDownOrUpArrow: RenderDownOrUpArrow,
            renderLeftSideSelectedCards: RenderLeftSideSelectedCards,
            renderRightSideSelectedCards: RenderRightSideSelectedCards
         } = this
         let leftCardLabel = '',
            rightCardLabel = ''
         if (this.activeLeftCardDetails) {
            const label = this.activeLeftCardDetails.label
            if (label) {
               leftCardLabel = label
            }
         }
         if (this.activeRightCardDetails) {
            const label = this.activeRightCardDetails.label
            if (label) {
               rightCardLabel = label
            }
         }
         const {
            name: leftCardTitle,
            cardDetails: {
               notes: leftCardNotes,
               attachments: leftCardAttachments,
               priority: leftCardPriority
            }
         } = this.activeLeftCardDetails
         const {
            name: rightCardTitle,
            cardDetails: {
               notes: rightCardNotes,
               attachments: rightCardAttachments,
               priority: rightCardPriority
            }
         } = this.activeRightCardDetails
         const isLeftCardTitleEmpty = isEmpty(leftCardTitle)
         const isLeftCardNotesEmpty = isEmpty(leftCardNotes)
         const areLeftCardAttachmentsEmpty = leftCardAttachments.length === 0
         const isLeftCardLabelEmpty = isEmpty(leftCardLabel)
         const isLeftCardPriorityEmpty = isEmpty(leftCardPriority)
         const isRightCardTitleEmpty = isEmpty(rightCardTitle)
         const isRightCardNotesEmpty = isEmpty(rightCardNotes)
         const areRightCardAttachmentsEmpty = rightCardAttachments.length === 0
         const isRightCardLabelEmpty = isEmpty(rightCardLabel)
         const isRightCardPriorityEmpty = isEmpty(rightCardPriority)
         if (isMobileDevice)
            return (
               <MobileLayout>
                  <MobileMergeNavBar
                     onClickBackIcon={onClickCloseButton}
                     onClickNextButton={this.openMergeModal}
                     nextBtnIsDisabled={this.isNextButtonDisabled}
                  />
                  <TabBarContainer>
                     <TabBar
                        tabsList={mobileTabsList}
                        onClickTab={this.setSelectedTab}
                        defaultSelectedTab={this.selectedTab}
                        containerCSS={tabListContainerCSS}
                        tabContainerCSS={tabContainerCSS}
                        itemCSS={itemCSS}
                     />
                  </TabBarContainer>
                  <MobileMergeCardsContainer>
                     {this.renderMergingSectionBasedOnSelectedTab()}
                  </MobileMergeCardsContainer>
                  <MoveResource
                     innerRef={this.mergeModalRef}
                     renderHeader={this.renderMergePopUpHeader}
                     renderBody={this.renderMoveResources}
                     onCancel={this.closeMergeModal}
                     type='Merge'
                     goToList={onClickCloseButton}
                     shouldShowBody={false}
                     shouldShowCloseIcon={true}
                  />
               </MobileLayout>
            )
         return (
            <MergeCardsContainer>
               <MergeCardsHeader>
                  <MergeCardsTitle>
                     {t('workbookManagement:mergeCards.mergeCards')}
                  </MergeCardsTitle>
                  <CloseMergeCardsButton
                     onClick={onClickCloseButton}
                     data-testid='mergeCardsCloseButton'
                  >
                     <CloseIcon fill={colors.black} width={16} height={16} />
                  </CloseMergeCardsButton>
               </MergeCardsHeader>

               <MergeCardsWrapper>
                  <CardsWrapper>
                     <LeftAndRightCardSection>
                        <CardSection
                           onClick={(): void =>
                              this.toggleSelectedCardsVisibility(LEFT)
                           }
                           data-testid='selectedMergeCardsLeftSection'
                        >
                           <SectionCard
                              id={this.activeLeftCardDetails.id}
                              cardName={this.activeLeftCardDetails.name}
                              hasAttachments={
                                 this.activeLeftCardDetails.hasAttachments
                              }
                              hasNotes={this.activeLeftCardDetails.hasNotes}
                              onToggleCardSelection={(): void => {}}
                              card={this.activeLeftCardDetails}
                              isDisabled={true}
                              moveCardAPI={() => {}}
                              moveCardAPIStatus={200}
                              moveCardAPIError={null}
                              getWorkbookChildDetailsAPI={
                                 getWorkbookChildDetailsAPI
                              }
                              getWorkbookChildDetailsAPIStatus={
                                 getWorkbookChildDetailsAPIStatus
                              }
                              getWorkbookChildDetailsAPIError={
                                 getWorkbookChildDetailsAPIError
                              }
                              getWorkbooksAndFoldersAPI={
                                 getWorkbooksAndFoldersAPI
                              }
                              getWorkbooksAndFoldersStatus={
                                 getWorkbooksAndFoldersStatus
                              }
                              getWorkbooksAndFoldersError={
                                 getWorkbooksAndFoldersError
                              }
                              activeFolderInfo={activeFolderInfo}
                              workbookChildDetails={workbookChildDetails}
                              getRootFolderDetailsAPI={() => {}}
                              getRootFolderDetailsAPIStatus={200}
                              getRootFolderDetailsAPIError={null}
                              rootFolderId={'1234'}
                              workbookDetails={workbookDetails}
                              deleteCardAPI={() => {}}
                              deleteCardAPIStatus={200}
                              deleteCardAPIError={null}
                              moveCard={(): void => {}}
                              clearMoveWorkbooksAndFolders={(): void => {}}
                              clearWorkbookChildDetails={(): void => {}}
                              maxWidth='75%'
                           />
                           <CardsDropDownIcon>
                              <RenderDownOrUpArrow clickedSide={LEFT} />
                           </CardsDropDownIcon>
                        </CardSection>
                        <RenderLeftSideSelectedCards />
                     </LeftAndRightCardSection>
                     <MiddleCardSection>
                        <MergedCardTitle>
                           {t('workbookManagement:mergeCards.mergedCard')}
                        </MergedCardTitle>
                     </MiddleCardSection>
                     <LeftAndRightCardSection>
                        <CardSection
                           onClick={(): void =>
                              this.toggleSelectedCardsVisibility(RIGHT)
                           }
                           data-testid='selectedMergeCardsRightSection'
                        >
                           <SectionCard
                              id={this.activeRightCardDetails.id}
                              cardName={this.activeRightCardDetails.name}
                              hasAttachments={
                                 this.activeRightCardDetails.hasAttachments
                              }
                              hasNotes={this.activeRightCardDetails.hasNotes}
                              onToggleCardSelection={(): void => {}}
                              card={this.activeRightCardDetails}
                              isDisabled={true}
                              moveCardAPI={() => {}}
                              moveCardAPIStatus={200}
                              moveCardAPIError={null}
                              getWorkbookChildDetailsAPI={
                                 getWorkbookChildDetailsAPI
                              }
                              getWorkbookChildDetailsAPIStatus={
                                 getWorkbookChildDetailsAPIStatus
                              }
                              getWorkbookChildDetailsAPIError={
                                 getWorkbookChildDetailsAPIError
                              }
                              getWorkbooksAndFoldersAPI={
                                 getWorkbooksAndFoldersAPI
                              }
                              getWorkbooksAndFoldersStatus={
                                 getWorkbooksAndFoldersStatus
                              }
                              getWorkbooksAndFoldersError={
                                 getWorkbooksAndFoldersError
                              }
                              activeFolderInfo={activeFolderInfo}
                              workbookChildDetails={workbookChildDetails}
                              getRootFolderDetailsAPI={() => {}}
                              getRootFolderDetailsAPIStatus={200}
                              getRootFolderDetailsAPIError={null}
                              rootFolderId={'1234'}
                              workbookDetails={workbookDetails}
                              deleteCardAPI={() => {}}
                              deleteCardAPIStatus={200}
                              deleteCardAPIError={null}
                              moveCard={(): void => {}}
                              clearMoveWorkbooksAndFolders={(): void => {}}
                              clearWorkbookChildDetails={(): void => {}}
                              maxWidth='75%'
                           />
                           <CardsDropDownIcon>
                              <RenderDownOrUpArrow clickedSide={RIGHT} />
                           </CardsDropDownIcon>
                        </CardSection>
                        <RenderRightSideSelectedCards />
                     </LeftAndRightCardSection>
                  </CardsWrapper>
                  <TitlesWrapper>
                     <LeftAndRightTitleSection>
                        <SectionTitleLabel>
                           {t('workbookManagement:mergeCards.title')}
                        </SectionTitleLabel>
                        <TitleInputField
                           value={this.activeLeftCardDetails.name}
                           disabled={true}
                        />
                        <LeftIconContainer
                           onClick={this.onClickLeftTitleButton}
                           isDisabled={isLeftCardTitleEmpty}
                           disabled={isLeftCardTitleEmpty}
                           data-testid='leftCardTitleMergeOrUndoButton'
                        >
                           {this.renderLeftMergeOrUndoIcon(
                              this.leftSideCardMergeStatus.isTitleMerged
                           )}
                        </LeftIconContainer>
                     </LeftAndRightTitleSection>
                     <MiddleTitleSection>
                        <SectionTitleLabel>
                           {t('workbookManagement:mergeCards.title')}
                        </SectionTitleLabel>
                        <InputFieldWithClearButton>
                           <TitleInputField
                              value={this.title}
                              onChange={this.onChangeTitle}
                              placeholder={t(
                                 'workbookManagement:mergeCards.enterTitle'
                              )}
                              testId='mergeCardsTitleInput'
                           />
                           <InputClearButton
                              onClick={this.clearTitle}
                              data-testid='mergeCardsTitleClearButton'
                           >
                              <CloseIcon fill={colors.coolGrey} />
                           </InputClearButton>
                        </InputFieldWithClearButton>
                     </MiddleTitleSection>
                     <LeftAndRightTitleSection>
                        <RightIconContainer
                           onClick={this.onClickRightTitleButton}
                           isDisabled={isRightCardTitleEmpty}
                           disabled={isRightCardTitleEmpty}
                           data-testid='rightCardTitleMergeOrUndoButton'
                        >
                           {this.renderRightMergeOrUndoIcon(
                              this.rightSideCardMergeStatus.isTitleMerged
                           )}
                        </RightIconContainer>
                        <SectionTitleLabel>
                           {t('workbookManagement:mergeCards.title')}
                        </SectionTitleLabel>
                        <TitleInputField
                           value={this.activeRightCardDetails.name}
                           disabled={true}
                        />
                     </LeftAndRightTitleSection>
                  </TitlesWrapper>
                  <NotesWrapper>
                     <LeftAndRightNotesSection>
                        <SectionTitleAndIconContainer>
                           <SectionTitleLabel>
                              {t('workbookManagement:cardDetails.notes')}
                           </SectionTitleLabel>
                           <TitleIconContainer>
                              <NotesIcon width={12} height={12} />
                           </TitleIconContainer>
                        </SectionTitleAndIconContainer>
                        <NotesContainer>
                           <EditableTextStyle
                              as='p'
                              dangerouslySetInnerHTML={{
                                 __html: this.activeLeftCardDetails.cardDetails
                                    .notes
                              }}
                           />
                        </NotesContainer>
                        <NotesLeftIconContainer
                           onClick={this.onClickLeftNotesButton}
                           isDisabled={isLeftCardNotesEmpty}
                           disabled={isLeftCardNotesEmpty}
                           data-testid='leftCardNotesMergeOrUndoButton'
                        >
                           {this.renderLeftMergeOrUndoIcon(
                              this.leftSideCardMergeStatus.isNotesMerged
                           )}
                        </NotesLeftIconContainer>
                     </LeftAndRightNotesSection>
                     <MiddleNotesSection>
                        <SectionTitleAndIconContainer>
                           <SectionTitleLabel>
                              {t('workbookManagement:cardDetails.notes')}
                           </SectionTitleLabel>
                           <TitleIconContainer>
                              <NotesIcon width={12} height={12} />
                           </TitleIconContainer>
                        </SectionTitleAndIconContainer>
                        <InputFieldWithClearButton>
                           <NotesEditorContainer className='notesEditorContainer'>
                              <Quill
                                 key={'desktopMergeNotesEditorContainer'}
                                 ref={this.notesEditorRef}
                                 placeholder={t(
                                    'workbookManagement:mergeCards.enterNote'
                                 )}
                                 value={this.notes}
                                 bounds={'.notesEditorContainer'}
                                 data-testid='mergeCardsNotesInput'
                                 onBlur={this.onUpdateNotesData}
                              />
                           </NotesEditorContainer>
                           <InputClearButton
                              onClick={this.clearNotes}
                              data-testid='mergeCardsNotesClearButton'
                           >
                              <CloseIcon fill={colors.coolGrey} />
                           </InputClearButton>
                        </InputFieldWithClearButton>
                     </MiddleNotesSection>
                     <LeftAndRightNotesSection>
                        <NotesRightIconContainer
                           onClick={this.onClickRightNotesButton}
                           isDisabled={isRightCardNotesEmpty}
                           disabled={isRightCardNotesEmpty}
                           data-testid='rightCardNotesMergeOrUndoButton'
                        >
                           {this.renderRightMergeOrUndoIcon(
                              this.rightSideCardMergeStatus.isNotesMerged
                           )}
                        </NotesRightIconContainer>
                        <SectionTitleAndIconContainer>
                           <SectionTitleLabel>
                              {t('workbookManagement:cardDetails.notes')}
                           </SectionTitleLabel>
                           <TitleIconContainer>
                              <NotesIcon width={12} height={12} />
                           </TitleIconContainer>
                        </SectionTitleAndIconContainer>
                        <NotesContainer>
                           <EditableTextStyle
                              as='p'
                              dangerouslySetInnerHTML={{
                                 __html: this.activeRightCardDetails.cardDetails
                                    .notes
                              }}
                           />
                        </NotesContainer>
                     </LeftAndRightNotesSection>
                  </NotesWrapper>
                  <AttachmentsWrapper>
                     <LeftAndRightAttachmentsSection>
                        <SectionTitleAndIconContainer>
                           <SectionTitleLabel>
                              {t('workbookManagement:cardDetails.attachments')}
                           </SectionTitleLabel>
                           <TitleIconContainer>
                              <LinkIcon width={16} height={8} />
                           </TitleIconContainer>
                        </SectionTitleAndIconContainer>
                        <AttachmentsContainer>
                           {this.activeLeftCardDetails.cardDetails.attachments.map(
                              eachAttachment => (
                                 <Attachment
                                    key={eachAttachment.attachmentId}
                                    details={eachAttachment}
                                    onEditAttachment={(): void => {}}
                                    deleteAttachmentAPI={(): void => {}}
                                    isDisabled={true}
                                    deleteAttachmentAPIStatus={200}
                                    updateAttachmentURLAPIStatus={200}
                                 />
                              )
                           )}
                        </AttachmentsContainer>
                        <LeftIconContainer
                           onClick={this.onClickLeftAttachmentsButton}
                           isDisabled={areLeftCardAttachmentsEmpty}
                           disabled={areLeftCardAttachmentsEmpty}
                           data-testid='leftCardAttachmentsMergeOrUndoButton'
                        >
                           {this.renderLeftMergeOrUndoIcon(
                              this.leftSideCardMergeStatus.areAttachmentsMerged
                           )}
                        </LeftIconContainer>
                     </LeftAndRightAttachmentsSection>
                     <MiddleAttachmentsSection>
                        <SectionTitleAndIconContainer>
                           <SectionTitleLabel>
                              {t('workbookManagement:cardDetails.attachments')}
                           </SectionTitleLabel>
                           <TitleIconContainer>
                              <LinkIcon width={16} height={8} />
                           </TitleIconContainer>
                        </SectionTitleAndIconContainer>
                        <AttachmentsContainer>
                           {this.attachments.map(eachAttachment => (
                              <Attachment
                                 key={eachAttachment.attachmentId}
                                 details={eachAttachment}
                                 onEditAttachment={this.onClickEditAttachment}
                                 deleteAttachmentAPI={
                                    this.onClickDeleteAttachment
                                 }
                                 deleteAttachmentAPIStatus={200}
                                 updateAttachmentURLAPIStatus={200}
                              />
                           ))}
                        </AttachmentsContainer>
                        <RenderAddAttachments />
                     </MiddleAttachmentsSection>
                     <LeftAndRightAttachmentsSection>
                        <RightIconContainer
                           onClick={this.onClickRightAttachmentsButton}
                           isDisabled={areRightCardAttachmentsEmpty}
                           disabled={areRightCardAttachmentsEmpty}
                           data-testid='rightCardAttachmentsMergeOrUndoButton'
                        >
                           {this.renderRightMergeOrUndoIcon(
                              this.rightSideCardMergeStatus.areAttachmentsMerged
                           )}
                        </RightIconContainer>
                        <SectionTitleAndIconContainer>
                           <SectionTitleLabel>
                              {t('workbookManagement:cardDetails.attachments')}
                           </SectionTitleLabel>
                           <TitleIconContainer>
                              <LinkIcon width={16} height={8} />
                           </TitleIconContainer>
                        </SectionTitleAndIconContainer>
                        <AttachmentsContainer>
                           {this.activeRightCardDetails.cardDetails.attachments.map(
                              eachAttachment => (
                                 <Attachment
                                    key={eachAttachment.attachmentId}
                                    details={eachAttachment}
                                    onEditAttachment={(): void => {}}
                                    deleteAttachmentAPI={(): void => {}}
                                    isDisabled={true}
                                    deleteAttachmentAPIStatus={200}
                                    updateAttachmentURLAPIStatus={200}
                                 />
                              )
                           )}
                        </AttachmentsContainer>
                     </LeftAndRightAttachmentsSection>
                  </AttachmentsWrapper>
                  <LabelsWrapper>
                     <LeftAndRightLabelsSection>
                        <ColorPalletteContainer>
                           <ColorPalette
                              onChangeSelectedColor={(): void => {}}
                              selectedColor={leftCardLabel}
                              isDisabled={true}
                           />
                        </ColorPalletteContainer>
                        <LeftIconContainer
                           onClick={this.onClickLeftLabelButton}
                           isDisabled={isLeftCardLabelEmpty}
                           disabled={isLeftCardLabelEmpty}
                           data-testid='leftCardLabelMergeOrUndoButton'
                        >
                           {this.renderLeftMergeOrUndoIcon(
                              this.leftSideCardMergeStatus.isLabelMerged
                           )}
                        </LeftIconContainer>
                     </LeftAndRightLabelsSection>
                     <MiddleLabelsSection>
                        <ColorPalletteContainer>
                           <ColorPalette
                              onChangeSelectedColor={this.onChangeLabelColor}
                              selectedColor={this.label}
                              colorLabelTestId='mergeCardColorLabel'
                              dropDownColorTestId='mergeCardDropDownColor'
                              intensityColorTestId='mergeCardIntensityColor'
                           />
                        </ColorPalletteContainer>
                     </MiddleLabelsSection>
                     <LeftAndRightLabelsSection>
                        <RightIconContainer
                           onClick={this.onClickRightLabelButton}
                           isDisabled={isRightCardLabelEmpty}
                           disabled={isRightCardLabelEmpty}
                           data-testid='rightCardLabelMergeOrUndoButton'
                        >
                           {this.renderRightMergeOrUndoIcon(
                              this.rightSideCardMergeStatus.isLabelMerged
                           )}
                        </RightIconContainer>
                        <ColorPalletteContainer>
                           <ColorPalette
                              onChangeSelectedColor={(): void => {}}
                              selectedColor={rightCardLabel}
                              isDisabled={true}
                           />
                        </ColorPalletteContainer>
                     </LeftAndRightLabelsSection>
                  </LabelsWrapper>
                  <PriorityWrapper>
                     <LeftAndRightPrioritySection>
                        <SectionTitleLabel>
                           {t('workbookManagement:cardDetails.priority')}
                        </SectionTitleLabel>
                        <PriorityGroupContainer>
                           <PriorityGroup
                              priorityList={priorityList}
                              selectedValue={this.activeLeftCardDetails.cardDetails.priority.toString()}
                              onClickPriorityText={(): void => {}}
                           />
                        </PriorityGroupContainer>
                        <LeftIconContainer
                           onClick={this.onClickLeftPriorityButton}
                           isDisabled={isLeftCardPriorityEmpty}
                           disabled={isLeftCardPriorityEmpty}
                           data-testid='leftCardPriorityMergeOrUndoButton'
                        >
                           {this.renderLeftMergeOrUndoIcon(
                              this.leftSideCardMergeStatus.isPriorityMerged
                           )}
                        </LeftIconContainer>
                     </LeftAndRightPrioritySection>
                     <MiddlePrioritySection>
                        <SectionTitleLabel>
                           {t('workbookManagement:cardDetails.priority')}
                        </SectionTitleLabel>
                        <PriorityGroupContainer>
                           <PriorityGroup
                              priorityList={priorityList}
                              selectedValue={this.priority}
                              onClickPriorityText={this.onChangePriority}
                              priorityTestId='mergeCardPriorityButton'
                           />
                        </PriorityGroupContainer>
                     </MiddlePrioritySection>
                     <LeftAndRightPrioritySection>
                        <RightIconContainer
                           onClick={this.onClickRightPriorityButton}
                           isDisabled={isRightCardPriorityEmpty}
                           disabled={isRightCardPriorityEmpty}
                           data-testid='rightCardPriorityMergeOrUndoButton'
                        >
                           {this.renderRightMergeOrUndoIcon(
                              this.rightSideCardMergeStatus.isPriorityMerged
                           )}
                        </RightIconContainer>
                        <SectionTitleLabel>
                           {t('workbookManagement:cardDetails.priority')}
                        </SectionTitleLabel>
                        <PriorityGroupContainer>
                           <PriorityGroup
                              priorityList={priorityList}
                              selectedValue={this.activeRightCardDetails.cardDetails.priority.toString()}
                              onClickPriorityText={(): void => {}}
                           />
                        </PriorityGroupContainer>
                     </LeftAndRightPrioritySection>
                  </PriorityWrapper>
                  <NextButtonContainer>
                     <MoveResource
                        innerRef={this.mergeModalRef}
                        renderHeader={this.renderMergePopUpHeader}
                        renderBody={this.renderMoveResources}
                        onCancel={this.closeMergeModal}
                        type='Merge'
                     />
                     {isMobileDevice ? null : (
                        <NextButton
                           variant={Button.variants.secondary}
                           disabled={this.isNextButtonDisabled}
                           isDisabled={this.isNextButtonDisabled}
                           onClick={this.openMergeModal}
                           id='mergeCardsNextButton'
                        >
                           {this.renderNextButtonText()}
                        </NextButton>
                     )}
                  </NextButtonContainer>
               </MergeCardsWrapper>
            </MergeCardsContainer>
         )
      }
   )

   render(): ReactNode {
      const {
         getMultipleCardDetailsAPIStatus,
         getMultipleCardDetailsAPIError
      } = this.props
      return (
         <LoadingWrapper
            apiStatus={getMultipleCardDetailsAPIStatus}
            apiError={getMultipleCardDetailsAPIError}
            renderSuccessUI={this.renderContent}
            onRetry={this.getCardsDetails}
         />
      )
   }
}

export default withTranslation()(MergeCards)
