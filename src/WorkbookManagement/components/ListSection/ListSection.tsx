import React, { Component, ReactNode, ReactElement } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { withTranslation } from 'react-i18next'
import {
   DraggableProvided,
   Droppable,
   DroppableProvided,
   Draggable
} from 'react-beautiful-dnd'

import { APIStatus } from '@ib/api-constants'
import PlusIcon from '../../../Common/icons/PlusIcon'
import Colors from '../../../Common/themes/Colors'
import {
   isTabletDevice,
   isMobileDevice
} from '../../../Common/utils/responsiveUtils'

import CardModel from '../../stores/models/CardModel'
import {
   DROPPABLE_SECTION,
   horizontal,
   LIST_CONTAINER_IDENTIFIER
} from '../../constants/UIConstants'
import SectionModel from '../../stores/models/SectionModel'
import { chunkArray } from '../../utils/DragAndDropUtils'
import WorkbookChildDetailsModel from '../../stores/models/WorkbookChildDetailsModel'
import WorkbookModel from '../../stores/models/WorkbookModel'

import SectionCard from '../SectionCard'
import AddCard from '../AddCard'

import { MoveSectionRequestType } from '../../stores/types'
import SectionHeader from './SectionHeader'
import {
   SectionContainer,
   SectionCardsContainer,
   AddCardButtonContainer,
   AddCardButtonText,
   AddCardButton,
   DroppableSection,
   DraggableCard,
   EmptyCard
} from './styledComponents'

// FIXME: Need to fix WithTranslation Props
interface WithTranslation {
   i18n: any
   tReady: any
   t: any
}

interface ListSectionProps extends WithTranslation {
   section: SectionModel
   id: string
   sectionName: string
   cards: Array<CardModel>
   isFirstSection: boolean
   draggableProvided: DraggableProvided
   onToggleCardSelection: (card: CardModel) => void
   onDeleteSection: (sectionId: string, closeModal, closeDrawer) => void
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
   setMaxWidth: Function
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
   moveCard: (sourceCardId: string, destinationSectionId: string) => void
   clearMoveWorkbooksAndFolders: () => void
   clearWorkbookChildDetails: () => void
   isDragUpdated?: boolean
   isCardSelectionEnabled?: boolean
   enableSelectionForAllCards?: Function
   disableSelectionForAllCard?: Function
   shouldDisableActions?: boolean
   isSubmitted?: boolean
   isAssignmentWorkbook?: boolean
   isCompletedAssignmentWorkbook?: boolean
   deleteSectionAPIStatus: APIStatus
   listId?: string
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
   isZoomedOut?: boolean
   toggleIsZoomedOut?: Function
   setIsSectionOrCardCreationInProgress?: Function
}

@observer
class ListSection extends Component<ListSectionProps> {
   @observable isCollapsed!: boolean
   @observable isCreatingNewCard: boolean
   isDraggingOver: boolean
   @observable sectionName!: string
   @observable showCards

   constructor(props) {
      super(props)
      this.initSectionCollapsedState()
      this.isCreatingNewCard = false
      this.isDraggingOver = false
      this.showCards = false
   }

   updatedCards
   maxContentWidth
   componentDidMount() {
      const element = document.getElementsByClassName(LIST_CONTAINER_IDENTIFIER)
      if (element[0] !== undefined) {
         this.showCards = true
         this.maxContentWidth = element[0].clientWidth
         this.updatedCards = chunkArray(this.props.cards, this.maxContentWidth)
      }
      const { isAssignmentWorkbook } = this.props
      if (isAssignmentWorkbook) {
         this.isCollapsed = false
      }
   }

   initSectionCollapsedState = (): void => {
      const { isFirstSection } = this.props
      this.isCollapsed = isFirstSection ? false : true
   }

   toggleSectionView = (): void => {
      this.isCollapsed = !this.isCollapsed
   }

   onClickAddNewCardButton = (): void => {
      const {
         isZoomedOut,
         toggleIsZoomedOut,
         setIsSectionOrCardCreationInProgress
      } = this.props
      isZoomedOut && toggleIsZoomedOut && toggleIsZoomedOut()
      this.isCreatingNewCard = true
      setIsSectionOrCardCreationInProgress &&
         setIsSectionOrCardCreationInProgress(this.isCreatingNewCard)
   }

   closeAddNewCardSection = (): void => {
      const { setIsSectionOrCardCreationInProgress } = this.props
      this.isCreatingNewCard = false
      setIsSectionOrCardCreationInProgress &&
         setIsSectionOrCardCreationInProgress(this.isCreatingNewCard)
   }

   isUserActionsEnabled = (): boolean => {
      const { shouldDisableActions } = this.props
      return !shouldDisableActions
   }

   renderAddCardButton = observer(() => {
      const { t, section } = this.props
      return this.isUserActionsEnabled() ? (
         <AddCardButtonContainer>
            {this.isCreatingNewCard ? (
               <AddCard
                  SectionModel={section}
                  onCloseAddCard={this.closeAddNewCardSection}
                  onClickMore={() => {}}
               />
            ) : (
               <AddCardButton
                  onClick={this.onClickAddNewCardButton}
                  data-testid={`sectionAddCardButton`}
               >
                  <PlusIcon width={16} height={16} fill={Colors.blueGrey} />
                  <AddCardButtonText>
                     {t('workbookManagement:homeScreen.addCard')}
                  </AddCardButtonText>
               </AddCardButton>
            )}
         </AddCardButtonContainer>
      ) : null
   })

   toggleCardSelection = (cardId: string): void => {
      const { cards, onToggleCardSelection } = this.props
      const card = cards.find(card => card.id === cardId)
      if (card) {
         onToggleCardSelection(card)
      }
   }

   isCardDragDisabled = (): boolean => {
      const {
         isSubmitted,
         isAssignmentWorkbook,
         isCardSelectionEnabled
      } = this.props
      if (isSubmitted) {
         return true
      }
      if (isAssignmentWorkbook && (isMobileDevice || isTabletDevice)) {
         return false
      }
      if (!isCardSelectionEnabled && (isMobileDevice || isTabletDevice)) {
         return true
      }
      return false
   }

   renderCards = observer(({ cards }) =>
      cards.map((card: CardModel, index: number) => {
         const { id, name, hasAttachments, hasNotes } = card
         const {
            section: {
               id: sectionId,
               moveCardAPI,
               moveCardAPIStatus,
               moveCardAPIError,
               deleteCardAPIError,
               deleteCardAPIStatus,
               deleteCardAPI
            },
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
            rootFolderId,
            workbookDetails,
            moveCard,
            clearMoveWorkbooksAndFolders,
            clearWorkbookChildDetails,
            isCardSelectionEnabled,
            enableSelectionForAllCards,
            disableSelectionForAllCard,
            shouldDisableActions,
            isSubmitted,
            isAssignmentWorkbook,
            isCompletedAssignmentWorkbook,
            listId,
            openMobileMoveCardDrawer,
            isZoomedOut
         } = this.props
         return (
            <Draggable
               draggableId={id}
               key={id}
               index={index}
               isDragDisabled={this.isCardDragDisabled()}
            >
               {(provided: DraggableProvided): ReactElement => (
                  <DraggableCard
                     ref={provided.innerRef}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     data-testid={`draggableCardHandle`}
                  >
                     <SectionCard
                        id={id}
                        cardName={name}
                        hasAttachments={hasAttachments}
                        hasNotes={hasNotes}
                        card={card}
                        onToggleCardSelection={this.toggleCardSelection}
                        moveCardAPI={moveCardAPI}
                        moveCardAPIStatus={moveCardAPIStatus}
                        moveCardAPIError={moveCardAPIError}
                        getWorkbookChildDetailsAPI={getWorkbookChildDetailsAPI}
                        getWorkbookChildDetailsAPIStatus={
                           getWorkbookChildDetailsAPIStatus
                        }
                        getWorkbookChildDetailsAPIError={
                           getWorkbookChildDetailsAPIError
                        }
                        getWorkbooksAndFoldersAPI={getWorkbooksAndFoldersAPI}
                        getWorkbooksAndFoldersStatus={
                           getWorkbooksAndFoldersStatus
                        }
                        getWorkbooksAndFoldersError={
                           getWorkbooksAndFoldersError
                        }
                        activeFolderInfo={activeFolderInfo}
                        workbookChildDetails={workbookChildDetails}
                        getRootFolderDetailsAPI={getRootFolderDetailsAPI}
                        getRootFolderDetailsAPIStatus={
                           getRootFolderDetailsAPIStatus
                        }
                        getRootFolderDetailsAPIError={
                           getRootFolderDetailsAPIError
                        }
                        rootFolderId={rootFolderId}
                        workbookDetails={workbookDetails}
                        deleteCardAPI={deleteCardAPI}
                        deleteCardAPIStatus={deleteCardAPIStatus}
                        deleteCardAPIError={deleteCardAPIError}
                        moveCard={moveCard}
                        clearMoveWorkbooksAndFolders={
                           clearMoveWorkbooksAndFolders
                        }
                        clearWorkbookChildDetails={clearWorkbookChildDetails}
                        isDragging={this.props.isDragUpdated}
                        isCardSelectionEnabled={isCardSelectionEnabled}
                        enableSelectionForAllCards={enableSelectionForAllCards}
                        disableSelectionForAllCard={disableSelectionForAllCard}
                        shouldDisableActions={shouldDisableActions}
                        isAssignmentWorkbook={isAssignmentWorkbook}
                        isCompletedAssignmentWorkbook={
                           isCompletedAssignmentWorkbook
                        }
                        isSubmitted={isSubmitted}
                        listId={listId}
                        sectionId={sectionId}
                        openMobileMoveCardDrawer={openMobileMoveCardDrawer}
                        isZoomedOut={isZoomedOut}
                     />
                  </DraggableCard>
               )}
            </Draggable>
         )
      })
   )

   onDeleteSection = (closeModal, closeDrawer) => {
      const {
         section: { id },
         onDeleteSection
      } = this.props
      onDeleteSection(id, closeModal, closeDrawer)
   }

   render(): ReactNode {
      const {
         section: { name, updateSectionNameAPI, updateSectionNameAPIStatus },
         draggableProvided,
         id,
         cards,
         moveSectionAPI,
         moveSectionAPIStatus,
         moveSectionAPIError,
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
         rootFolderId,
         workbookDetails,
         moveSection,
         clearMoveWorkbooksAndFolders,
         clearWorkbookChildDetails,
         shouldDisableActions,
         deleteSectionAPIStatus,
         isZoomedOut,
         toggleIsZoomedOut,
         isFirstSection
      } = this.props
      this.updatedCards =
         this.showCards && chunkArray(cards, this.maxContentWidth)
      this.props.setMaxWidth(this.maxContentWidth)

      const {
         renderCards: RenderCards,
         renderAddCardButton: RenderAddCardButton
      } = this
      return (
         <SectionContainer
            data-testid={`listSection`}
            isFirstSection={isFirstSection}
         >
            <SectionHeader
               sectionName={name}
               isCollapsed={this.isCollapsed}
               onClickToggleButton={this.toggleSectionView}
               draggableProvided={draggableProvided}
               updateSectionNameAPI={updateSectionNameAPI}
               updateSectionNameAPIStatus={updateSectionNameAPIStatus}
               onDeleteSection={this.onDeleteSection}
               moveSectionAPI={moveSectionAPI}
               moveSectionAPIStatus={moveSectionAPIStatus}
               moveSectionAPIError={moveSectionAPIError}
               getWorkbookChildDetailsAPI={getWorkbookChildDetailsAPI}
               getWorkbookChildDetailsAPIStatus={
                  getWorkbookChildDetailsAPIStatus
               }
               getWorkbookChildDetailsAPIError={getWorkbookChildDetailsAPIError}
               getWorkbooksAndFoldersAPI={getWorkbooksAndFoldersAPI}
               getWorkbooksAndFoldersStatus={getWorkbooksAndFoldersStatus}
               getWorkbooksAndFoldersError={getWorkbooksAndFoldersError}
               activeFolderInfo={activeFolderInfo}
               workbookChildDetails={workbookChildDetails}
               getRootFolderDetailsAPI={getRootFolderDetailsAPI}
               getRootFolderDetailsAPIStatus={getRootFolderDetailsAPIStatus}
               getRootFolderDetailsAPIError={getRootFolderDetailsAPIError}
               rootFolderId={rootFolderId}
               workbookDetails={workbookDetails}
               sectionId={id}
               moveSection={moveSection}
               clearMoveWorkbooksAndFolders={clearMoveWorkbooksAndFolders}
               clearWorkbookChildDetails={clearWorkbookChildDetails}
               shouldDisableActions={shouldDisableActions}
               deleteSectionAPIStatus={deleteSectionAPIStatus}
               isZoomedOut={isZoomedOut}
               toggleIsZoomedOut={toggleIsZoomedOut}
            />
            {this.showCards ? (
               this.isCollapsed ? null : this.updatedCards.length > 0 ? (
                  this.updatedCards.map((cards, index) => (
                     <Droppable
                        droppableId={`${DROPPABLE_SECTION}#${id}#${index}`}
                        type={DROPPABLE_SECTION}
                        direction={horizontal}
                        key={`${DROPPABLE_SECTION}#${id}#${index}`}
                     >
                        {(provided: DroppableProvided): ReactElement => (
                           <DroppableSection
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              data-testid={`droppableSection`}
                           >
                              <SectionCardsContainer
                                 isCollapsed={this.isCollapsed}
                              >
                                 <RenderCards cards={cards} />
                                 {provided.placeholder}
                              </SectionCardsContainer>
                           </DroppableSection>
                        )}
                     </Droppable>
                  ))
               ) : (
                  <Droppable
                     droppableId={`${DROPPABLE_SECTION}#${id}#${0}`}
                     type={DROPPABLE_SECTION}
                     direction={horizontal}
                     key={`${DROPPABLE_SECTION}#${id}#${0}`}
                  >
                     {(provided: DroppableProvided): ReactElement => (
                        <DroppableSection
                           ref={provided.innerRef}
                           {...provided.droppableProps}
                           data-testid={`droppableSection`}
                        >
                           <SectionCardsContainer
                              isCollapsed={this.isCollapsed}
                           >
                              <EmptyCard />
                              {provided.placeholder}
                           </SectionCardsContainer>
                        </DroppableSection>
                     )}
                  </Droppable>
               )
            ) : null}

            {!this.isCollapsed ? <RenderAddCardButton /> : null}
         </SectionContainer>
      )
   }
}

export default withTranslation()(ListSection)
