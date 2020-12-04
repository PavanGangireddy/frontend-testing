import { parse } from 'querystring'
import React, { Component, ReactNode } from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { APIStatus } from '@ib/api-constants'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { withTranslation } from 'react-i18next'
import { History } from 'history'
import NotesIcon from '../../../Common/icons/NotesIcon'
import LinkIcon from '../../../Common/icons/LinkIcon'
import TickIcon from '../../../Common/icons/TickIcon'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import colors from '../../../Common/themes/Colors'
import { trimName } from '../../../Common/utils/NameUtils'
import PriorityText from '../../../Common/components/PriorityText'
import WorkbookChildDetailsModel from '../../stores/models/WorkbookChildDetailsModel'
import WorkbookModel from '../../stores/models/WorkbookModel'
import { MoveCardRequestType } from '../../stores/types'
import MoveResourceBodyWrapper from '../../../Common/components/MoveResourceBodyWrapper'
import { MOVE, CARD } from '../../../Common/constants/UIConstants'
import MoveResource from '../../../Common/components/MoveResource'
import BlackCloseIcon from '../../../Common/icons/BlackCloseIcon'
import CloseErrorIcon from '../../../Common/icons/CloseErrorIcon'
import {
   showSuccessBottomCenterToast,
   showFailureBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import { getAPIErrorMessage } from '../../../Common/utils/APIUtils'
import { getTextColor } from '../../../Common/utils/ColorUtils'
import {
   isMobileDevice,
   isTabletDevice
} from '../../../Common/utils/responsiveUtils'

import CardModel from '../../stores/models/CardModel'
import {
   MAX_CARD_NAME_LENGTH,
   WRONGLY_ANSWERED_CARD,
   CORRECT_CARD
} from '../../constants/UIConstants'

import CardDetails from '../CardDetails'

import CorrectIcon from '../../../Common/icons/CorrectIcon'
import {
   CardContainer,
   CardName,
   IconContainer,
   CardSelectBox,
   PriorityWrapper,
   MoveCardHeader,
   MoveCardHeaderTitle,
   CloseIconContainer,
   InvalidCardErrorIconContainer
} from './styledComponents'

//FIXME: need to fix this Props
interface WithTranslationProps {
   tReady: any
   t: any
   i18n: any
}

interface SectionCardProps extends WithTranslationProps, RouteComponentProps {
   id: string
   cardName: string
   hasAttachments: boolean
   hasNotes: boolean
   card: CardModel
   onToggleCardSelection: (id: string) => void
   isDisabled?: boolean
   isDragging?: boolean
   moveCardAPI: (
      sectionId: string,
      request: MoveCardRequestType,
      onSuccess: (
         sectionName: string,
         sourceCardId: string,
         destinationSectionId: string
      ) => void,
      onFailure: (error: any) => void
   ) => void
   moveCardAPIStatus: APIStatus
   moveCardAPIError: any
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
   deleteCardAPI: (
      cardId: string,
      onSuccess: (cardName: string) => void,
      onFailure: (errror: any) => void
   ) => void
   deleteCardAPIStatus: APIStatus
   deleteCardAPIError: any
   moveCard: (sourceCardId: string, destinationSectionId: string) => void
   clearMoveWorkbooksAndFolders: () => void
   clearWorkbookChildDetails: () => void
   maxWidth?: string
   isCardSelectionEnabled?: boolean
   enableSelectionForAllCards?: Function
   disableSelectionForAllCard?: Function
   isDragUpdated?: boolean
   shouldDisableActions?: boolean
   history: History
   location: {
      search: string
   }
   isAssignmentWorkbook?: boolean
   isCompletedAssignmentWorkbook?: boolean
   isSubmitted?: boolean
   listId?: string
   sectionId?: string
   openMobileMoveCardDrawer?: (
      listId,
      sectionId,
      cardId,
      cardName,
      viewCardDetails,
      hideCardDetails,
      moveCardAPI,
      moveCardAPIStatus,
      moveCardAPIError,
      moveCard,
      label
   ) => void
   width?: string
   isZoomedOut?: boolean
}

@observer
class SectionCard extends Component<SectionCardProps> {
   modalRef: any
   @observable isCardHovered: boolean
   @observable openCard!: string
   moveCardRef

   static defaultProps = {
      isDisabled: false
   }

   constructor(props) {
      super(props)
      this.modalRef = React.createRef<BaseModalContainer>()
      this.moveCardRef = React.createRef<BaseModalContainer>()
      this.isCardHovered = false
   }

   componentDidMount() {
      const {
         location: { search },
         id
      } = this.props
      const queryParams = parse(search)
      this.openCard = queryParams['?card_id'] as string
      if (this.openCard === id) this.openModal()
   }

   openModal = (): any => {
      if (this.modalRef) {
         this.modalRef.current?.openModal()
         const { history, id } = this.props
         history.replace({
            search: `?card_id=${id}`
         })
         this.getCardDetails()
      }
   }

   closeModal = (): void => {
      if (this.modalRef) {
         this.modalRef.current?.closeModal()
         const { history } = this.props
         history.replace({
            search: ``
         })
      }
   }

   onSuccessCardDetails = () => {
      //TODO: need to handle Success case
   }

   onFailureCardDetails = () => {
      //TODO: need to handle failure case
   }

   getCardDetails = () => {
      const {
         card: { getCardDetailsAPI, id }
      } = this.props
      getCardDetailsAPI(
         id,
         this.onSuccessCardDetails,
         this.onFailureCardDetails
      )
   }

   getColor = () => {
      const {
         card: { label }
      } = this.props
      return label ? getTextColor(label) : colors.darkBlueGrey
   }

   renderNotesIcon = (): ReactNode => {
      const {
         props: { hasNotes },
         getColor
      } = this
      return hasNotes ? (
         <IconContainer hasIcon={true} data-testid='cardNotesIcon'>
            <NotesIcon fillColor={getColor()} />
         </IconContainer>
      ) : null
   }

   renderAttachmentsIcon = (): ReactNode => {
      const {
         props: { hasAttachments },
         getColor
      } = this
      return hasAttachments ? (
         <IconContainer
            hasIcon={hasAttachments}
            data-testid='cardAttachmentsIcon'
         >
            <LinkIcon fillColor={getColor()} />
         </IconContainer>
      ) : null
   }

   renderCardDetails = () => {
      const {
         card,
         deleteCardAPI,
         deleteCardAPIStatus,
         deleteCardAPIError,
         shouldDisableActions
      } = this.props
      const { closeModal } = this
      return (
         <CardDetails
            cardModel={card}
            modalRef={this.modalRef}
            openMoveCardModal={this.openMoveCardModal}
            deleteCardAPI={deleteCardAPI}
            deleteCardAPIStatus={deleteCardAPIStatus}
            deleteCardAPIError={deleteCardAPIError}
            shouldDisableActions={shouldDisableActions}
            closeModal={closeModal}
            onClickMoveCard={this.openMobileMoveCardDrawer}
         />
      )
   }

   onMouseEnter = (): void => {
      this.isCardHovered = true
   }

   onMouseLeave = (): void => {
      this.isCardHovered = false
   }

   toggleCardSelection = (event): void => {
      event.stopPropagation()
      const {
         id,
         onToggleCardSelection,
         card: { toggleCardSelection }
      } = this.props
      onToggleCardSelection(id)
      toggleCardSelection()
      const {
         card: { isSelected }
      } = this.props
      this.isCardHovered = isSelected
   }

   renderCardSelectBox = observer(() => {
      const {
         card: { isSelected, cardStyleType }
      } = this.props
      return isSelected ? (
         <CardSelectBox
            isSelected={isSelected}
            onClick={this.toggleCardSelection}
            data-testid='cardSelectBox'
         >
            <IconContainer isNotesIcon={false}>
               <TickIcon
                  width={10}
                  height={10}
                  fill={isSelected ? colors.coolGrey : colors.white}
               />
            </IconContainer>
         </CardSelectBox>
      ) : this.isCardHovered ? (
         <CardSelectBox
            isSelected={isSelected}
            onClick={this.toggleCardSelection}
            data-testid='cardSelectBox'
         >
            <IconContainer isNotesIcon={false}>
               <TickIcon width={10} height={10} fill={colors.white} />
            </IconContainer>
         </CardSelectBox>
      ) : cardStyleType === WRONGLY_ANSWERED_CARD ? (
         <InvalidCardErrorIconContainer>
            <CloseErrorIcon />
         </InvalidCardErrorIconContainer>
      ) : cardStyleType === CORRECT_CARD ? (
         <InvalidCardErrorIconContainer cardStyleType={cardStyleType}>
            <CorrectIcon
               width={16}
               height={16}
               backgroundFill={colors.greenishTeal}
               tickMarkFill={colors.white}
            />
         </InvalidCardErrorIconContainer>
      ) : null
   })

   openMoveCardModal = () => {
      this.moveCardRef.current?.openModal()
   }

   closeMoveCardModal = () => {
      this.moveCardRef.current?.closeModal()
   }

   getMoveSectionRequestObject = sectionId => ({
      section_id: sectionId
   })

   onSuccessMoveCardAPI = (
      cardName: string,
      sourceCardId: string,
      destinationSectionId: string
   ) => {
      const { moveCard } = this.props
      moveCard(sourceCardId, destinationSectionId)
      showSuccessBottomCenterToast(`${cardName} is moved`)
   }

   onFailureMoveCardAPI = error => {
      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
   }

   onMoveCardAPI = sectionId => {
      const { moveCardAPI, id } = this.props
      moveCardAPI(
         id,
         this.getMoveSectionRequestObject(sectionId),
         this.onSuccessMoveCardAPI,
         this.onFailureMoveCardAPI
      )
   }

   renderMoveCardBody = observer(props => {
      const { onCancel } = props
      const {
         moveCardAPIStatus,
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
            resourceType={CARD}
            onMoveFolderResourceAPI={this.onMoveCardAPI}
            onMoveFolderResourceAPIStatus={moveCardAPIStatus}
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

   renderMoveCardHeader = props => {
      const { onCancel } = props
      const { t } = this.props
      return (
         <MoveCardHeader>
            <MoveCardHeaderTitle>
               {t('workbookManagement:cardDetails.moveCard')}
            </MoveCardHeaderTitle>
            <CloseIconContainer
               onClick={onCancel}
               data-testid='moveCardCloseButton'
            >
               <BlackCloseIcon />
            </CloseIconContainer>
         </MoveCardHeader>
      )
   }

   renderMoveCardModel = () => (
      <MoveResource
         innerRef={this.moveCardRef}
         renderHeader={this.renderMoveCardHeader}
         renderBody={this.renderMoveCardBody}
         onCancel={this.closeMoveCardModal}
         type='Card'
      />
   )

   hasPriority = (): boolean => {
      const {
         card: { priority }
      } = this.props
      return priority !== null
   }

   buttonPressTimer

   @action.bound
   handleButtonPress = e => {
      const { isCardSelectionEnabled } = this.props
      this.buttonPressTimer = setTimeout(() => {
         this.props.enableSelectionForAllCards &&
            !isCardSelectionEnabled &&
            this.props.enableSelectionForAllCards()
         if (!isCardSelectionEnabled) {
            const {
               card: { id, toggleCardSelection },
               onToggleCardSelection
            } = this.props
            onToggleCardSelection(id)
            toggleCardSelection()
         }
      }, 1000)
   }

   @action.bound
   handleButtonRelease = () => {
      if (this.buttonPressTimer) clearTimeout(this.buttonPressTimer)
   }

   openMobileMoveCardDrawer = (): void => {
      const {
         listId,
         sectionId,
         id,
         cardName,
         openMobileMoveCardDrawer,
         moveCardAPI,
         moveCardAPIStatus,
         moveCardAPIError,
         moveCard,
         card: { label }
      } = this.props
      if (openMobileMoveCardDrawer) {
         openMobileMoveCardDrawer(
            listId,
            sectionId,
            id,
            cardName,
            this.openModal,
            this.closeModal,
            moveCardAPI,
            moveCardAPIStatus,
            moveCardAPIError,
            moveCard,
            label
         )
      }
   }

   get isOnGoingAssignmentInMobile(): boolean | undefined {
      const {
         isAssignmentWorkbook,
         isSubmitted,
         isCompletedAssignmentWorkbook
      } = this.props
      return (
         isAssignmentWorkbook &&
         !isSubmitted &&
         !isCompletedAssignmentWorkbook &&
         isMobileDevice
      )
   }

   getOnClickFunctionForCard = (): Function => {
      const { isDisabled, isCardSelectionEnabled } = this.props
      return isDisabled
         ? (): void => {}
         : isCardSelectionEnabled && (isMobileDevice || isTabletDevice)
         ? this.toggleCardSelection
         : this.isOnGoingAssignmentInMobile
         ? this.openMobileMoveCardDrawer
         : this.openModal
   }

   canSelectCardForMergingInMobileOrTablet = () => {
      const { isCardSelectionEnabled } = this.props
      return isCardSelectionEnabled && (isMobileDevice || isTabletDevice)
   }

   render(): ReactNode {
      const {
         cardName,
         hasNotes,
         hasAttachments,
         card: { priority, label, isSelected, cardStyleType },
         isDisabled,
         maxWidth,
         shouldDisableActions,
         isAssignmentWorkbook,
         width,
         isZoomedOut
      } = this.props
      const { renderCardSelectBox: RenderCardSelectBox } = this

      const isCardDisabled = isDisabled || shouldDisableActions
      const textColor = label ? getTextColor(label) : colors.darkBlueGrey

      return (
         <>
            <CardContainer
               onClick={this.getOnClickFunctionForCard()}
               label={label}
               onMouseEnter={
                  isCardDisabled || isMobileDevice || isTabletDevice
                     ? (): void => {}
                     : this.onMouseEnter
               }
               onMouseLeave={
                  isCardDisabled ? (): void => {} : this.onMouseLeave
               }
               onTouchStart={
                  isAssignmentWorkbook || isZoomedOut
                     ? (): void => {}
                     : this.handleButtonPress
               }
               onTouchEnd={this.handleButtonRelease}
               isSelected={isSelected}
               data-testid='sectionCard'
               maxWidth={maxWidth}
               width={width}
               canSelectCardForMergingInMobileOrTablet={this.canSelectCardForMergingInMobileOrTablet()}
               cardStyleType={cardStyleType}
            >
               <CardName
                  title={cardName}
                  hasNotesIcon={
                     hasNotes || hasAttachments || this.hasPriority()
                  }
                  textColor={textColor}
               >
                  {trimName(cardName, MAX_CARD_NAME_LENGTH)}
               </CardName>
               {this.renderNotesIcon()}
               {this.renderAttachmentsIcon()}
               {priority && (
                  <PriorityWrapper>
                     <PriorityText priorityContent={priority} />
                  </PriorityWrapper>
               )}
               <RenderCardSelectBox />
            </CardContainer>
            {this.renderCardDetails()}
            {this.renderMoveCardModel()}
         </>
      )
   }
}

export default withRouter(withTranslation()(SectionCard))
