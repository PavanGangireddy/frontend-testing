import React, { Component, ReactNode, ReactElement } from 'react'
import { observable, action, computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import {
   DragDropContext,
   Droppable,
   DroppableProvided,
   DraggableProvided,
   Draggable,
   DropResult
} from 'react-beautiful-dnd'

import { APIStatus, API_SUCCESS } from '@ib/api-constants'

import Colors from '../../../Common/themes/Colors'
import PlusIcon from '../../../Common/icons/PlusIcon'
import {
   showFailureBottomCenterToast,
   showSuccessBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import {
   isMobileDevice,
   isTabletDevice
} from '../../../Common/utils/responsiveUtils'
import {
   getAPIErrorMessage,
   isAPIFetching
} from '../../../Common/utils/APIUtils'
import UsersGroupModel from '../../../UserProfile/stores/models/UsersGroupModel'
import Button from '../../../Common/components/Button'
import IconContainer from '../../../Common/components/IconContainer'
import GroupCopyIcon from '../../../Common/icons/GroupCopyIcon'
import PublishIcon from '../../../Common/icons/PublishIcon'
import TickIcon from '../../../Common/icons/TickIcon'
import ZoomInIcon from '../../../Common/icons/ZoomInIcon'
import ZoomOutIcon from '../../../Common/icons/ZoomOutIcon'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import CustomPopUp from '../../../Common/components/CustomPopUp'
import { SUBMIT } from '../../../FolderManagement/components/CollapsibleSideNavbarComponents/constants'
import MobileBottomCustomDrawer from '../../../Common/components/MobileBottomCustomDrawer'

import BaseModel from '../../stores/models/BaseModel'
import PageModel from '../../stores/models/PageModel'
import ListModel from '../../stores/models/ListModel'
import {
   DROPPABLE_LIST,
   DROPPABLE_LISTS_CONTAINER,
   horizontal,
   DROPPABLE_SECTION,
   DROPPABLE_PAGE_CONTAINER,
   ASSIGNMENT
} from '../../constants/UIConstants'
//FIXME: need to fix way of sending services to list model
import ListService from '../../services/ListService/index.fixture'
import SectionService from '../../services/SectionService/index.fixture'
import CardService from '../../services/CardService/index.fixture'
import CardModel from '../../stores/models/CardModel'
import { chunkArray } from '../../utils/DragAndDropUtils'
import {
   MergeCardsRequestType,
   ReorderPageRequest,
   MovePageRequest,
   PublishWorkbookRequest
} from '../../stores/types'
import WorkbookModel from '../../stores/models/WorkbookModel'
import WorkbookChildDetailsModel from '../../stores/models/WorkbookChildDetailsModel'

import PageHeader from '../PageHeader'
import WorkbookFooter from '../WorkbookFooter'
import PublishWorkbookPopUpWrapper from '../PublishWorkbookPopUpWrapper'
import MobilePagesList from '../MobilePagesList'

import MobileMoveCard from '../MobileMoveCard'
import ChromeBannerUIStore from '../../../Common/stores/ChromeBannerUIStore'
import EmptyWorkbook from './EmptyWorkbook'
import RenderDefaultOrNewList from './RenderDefaultOrNewList'
import {
   WorkbookContainer,
   PageTitleAndObjectiveContainer,
   ListsContainer,
   WorkbookFooterContainer,
   ListParent,
   EmptyWorkbookContainer,
   AddListButton,
   ButtonText,
   ListDraggableContainer,
   ListsDroppable,
   MobileWorkbookFooter,
   ShowPagesButton,
   PrimaryButton,
   PrimaryButtonText,
   ViewResultsButton,
   ViewResultsButtonText,
   AssignmentWorkbookButtonContainer,
   MobileViewResultsButton,
   MobileViewResultsButtonText,
   StyledCarousel,
   ZoomingButton,
   DotsContainer,
   DotElement,
   ContainerWithFullHeightAndFlex,
   MobileWorkbookFooterWithAssignmentButton,
   DrawerTitleText
} from './styledComponents'
import MergeHeader from './MergeHeader'
import MergeCards from './MergeCards'

// FIXME: Need to fix WithTranslation Props
interface WithTranslation {
   i18n: any
   tReady: any
   t: any
}

interface WorkbookComponentProps extends WithTranslation {
   id: string
   totalPages: Array<BaseModel>
   activePageDetails: PageModel | null
   updatePageObjectiveWithDescriptionAPI: Function
   getWorkbookDetails: () => void
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
   getMoveWorkbooksAndFoldersAPI: any
   getMoveWorkbooksAndFoldersStatus: APIStatus
   // TODO: Need to update type
   getMoveWorkbooksAndFoldersError: any
   moveActiveFolderInfo: any
   workbookChildDetails: WorkbookChildDetailsModel | {}
   getRootFolderDetailsAPI: (onSuccess: () => void) => void
   getRootFolderDetailsAPIStatus: APIStatus
   // TODO: Need to update the type
   getRootFolderDetailsAPIError: any
   rootFolderId: string
   workbookDetails: WorkbookModel
   createPageAPI: (
      onSuccess: (pageId: string) => void,
      onFailure: () => void
   ) => void
   createPageAPIStatus: APIStatus
   // TODO: Need to update the type
   createPageAPIError: any
   getPageDetails: (id: string, onSuccess) => void
   getPageDetailsAPIStatus: APIStatus
   // TODO: Need to update the type
   getPageDetailsAPIError: any
   reorderPageAPI: (
      pageId: string,
      request: ReorderPageRequest,
      onFailure: () => void
   ) => void
   reorderPage: (pageId: string, order: number) => void
   movePageAPI: (
      pageId: string,
      request: MovePageRequest,
      onSuccess: () => void,
      onFailure: () => void
   ) => void
   movePageAPIStatus: APIStatus
   // TODO: Need to add type
   movePageAPIError: any
   clearMoveWorkbooksAndFolders: () => void
   clearWorkbookChildDetails: () => void
   updatePageName: (id: string, name: string) => void

   clearStore: () => void
   updatePageObjectiveWithDescriptionAPIStatus: APIStatus

   // assignment props
   isCreator?: boolean
   isAssignmentWorkbook?: boolean
   isCompletedAssignmentWorkbook?: boolean
   shouldDisableActions?: boolean
   onSuccessSubmitAssignment?: () => void
   onClickViewResultsButton?: () => void
   isSubmitted?: boolean
   isAssignmentCompleted?: boolean
   getUsersGroupsAPI?: (
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) => void
   getUsersGroupAPIStatus?: APIStatus
   // TODO: Need to add type
   getUsersGroupAPIError?: any
   publishWorkbookAPI?: (
      id: string,
      request: PublishWorkbookRequest,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) => void
   publishWorkbookAPIStatus?: APIStatus
   // TODO: Need to add type
   publishWorkbookAPIError?: any
   userGroups?: Map<string, UsersGroupModel>
   notAttempted?: boolean
   getAssignmentWorkbookDetails?: () => void
}

interface InjectedProps extends WorkbookComponentProps {
   chromeBannerUIStore: ChromeBannerUIStore
}

const slidesPerPageSettings = {
   mobileSmall: 1,
   mobileBig: 1,
   tablet: 4,
   desktop: 10
}

@inject('chromeBannerUIStore')
@observer
class WorkbookComponent extends Component<WorkbookComponentProps> {
   @observable activePageId!: string
   @observable activePageLists: Array<ListModel>
   isListCreatingInProgress: boolean
   currentlyCreatingList: null | { index: number; list: ListModel }
   // TODO: Need to add type
   listContainerRef
   @observable shouldShowMergeHeader: boolean
   @observable selectedCards: Array<any>
   @observable isMergingCards: boolean
   // TODO: Need to add type
   publishModalRef
   carousalRef
   @observable scrolledSlidesCount
   @observable isPagesDrawerVisible: boolean
   @observable isDragUpdated?: boolean
   @observable showTickIcon!: boolean
   @observable isZoomedOut: boolean
   @observable isCardSelectionEnabled!: boolean
   @observable isSectionOrCardCreationInProgress: boolean

   @observable isDraggingInProgress?: boolean
   submitConfirmationRef
   @observable isVisibleSubmitConfirmationDrawer: boolean

   moveCardDrawerModalRef

   constructor(props) {
      super(props)
      this.activePageLists = []
      this.listContainerRef = React.createRef<HTMLDivElement>()
      this.isListCreatingInProgress = false
      this.currentlyCreatingList = null
      this.shouldShowMergeHeader = false
      this.selectedCards = []
      this.isMergingCards = false
      this.isDragUpdated = false
      this.publishModalRef = React.createRef<HTMLDivElement>()
      this.carousalRef = React.createRef<HTMLDivElement>()
      this.isPagesDrawerVisible = false
      this.isZoomedOut = false
      this.scrolledSlidesCount = 0
      this.isDraggingInProgress = false
      this.isSectionOrCardCreationInProgress = false
      this.moveCardDrawerModalRef = React.createRef<BaseModalContainer>()
      this.submitConfirmationRef = React.createRef<BaseModalContainer>()
      this.isVisibleSubmitConfirmationDrawer = false
   }

   static defaultProps = {
      isCreator: false,
      isAssignmentWorkbook: false,
      shouldDisableActions: false,
      onSuccessSubmitAssignment: (): void => {},
      onClickViewResultsButton: (): void => {},
      invalidCardIds: []
   }

   listContainerMaxHeight!: number

   componentDidMount(): void {
      this.updateActivePageLists()
      this.selectedCards = []
      const mobileWorkbookFooterContainer = document.getElementById(
         'mobileWorkbookFooterContainer'
      )
      const listsDroppable = document.getElementById('listsDroppable')
      if (mobileWorkbookFooterContainer && listsDroppable) {
         this.listContainerMaxHeight =
            mobileWorkbookFooterContainer?.offsetTop - listsDroppable?.offsetTop
      }
   }

   componentWillUnmount() {
      const { clearStore } = this.props
      clearStore()
   }

   toggleIsZoomedOut = () => (this.isZoomedOut = !this.isZoomedOut)

   setIsSectionOrCardCreationInProgress = (value: boolean): void => {
      this.isSectionOrCardCreationInProgress = value
   }

   addNewList = (currentClickedListId: string): void => {
      if (this.isListCreatingInProgress) {
         const { t } = this.props
         showFailureBottomCenterToast(
            t('workbookManagement:homeScreen.addListRestrictMessage')
         )
      } else {
         const initialDataForList = {
            list_id: uuidv4(),
            list_name: '',
            sections: []
         }
         const currentListIndex = this.activePageLists.findIndex(
            list => list.id === currentClickedListId
         )
         //TODO: need to fix way of sending services to list model
         const listService = new ListService()
         const sectionService = new SectionService()
         const cardService = new CardService()

         const newList = new ListModel(
            initialDataForList,
            listService,
            sectionService,
            cardService,
            true
         )
         this.activePageLists.splice(currentListIndex + 1, 0, newList)
         this.currentlyCreatingList = {
            index: currentListIndex + 1,
            list: newList
         }
         this.isListCreatingInProgress = true
      }
   }

   removeNewList = (newListId: string): void => {
      this.activePageLists = this.activePageLists.filter(
         list => list.id !== newListId
      )
      this.isListCreatingInProgress = false
      this.currentlyCreatingList = null
   }

   renderAddListButton = (): ReactNode => {
      const { t } = this.props
      return (
         <AddListButton onClick={this.addNewList}>
            <PlusIcon />
            <ButtonText>
               {t('workbookManagement:homeScreen.addList')}
            </ButtonText>
         </AddListButton>
      )
   }

   @computed
   get selectedCardsLength(): number {
      return this.selectedCards.length
   }

   @action
   toggleCardSelection = (cardModel: CardModel): void => {
      const cardIndex = this.selectedCards.findIndex(
         card => card.id === cardModel.id
      )
      if (cardIndex === -1) {
         this.selectedCards.push(cardModel)
      } else {
         this.selectedCards = this.selectedCards.filter(
            card => card.id !== cardModel.id
         )
      }
      if (this.selectedCardsLength > 0) {
         this.shouldShowMergeHeader = true
      } else {
         if (isMobileDevice || isTabletDevice) {
            this.shouldShowMergeHeader = true
         } else {
            this.shouldShowMergeHeader = false
         }
      }
   }

   maxWidth
   setMaxWidth = maxWidth => {
      this.maxWidth = maxWidth
   }
   onSlideVisible = (index: number) => {
      this.scrolledSlidesCount = index
   }

   renderActivePageDetails = () => {
      const {
         activePageDetails,
         getWorkbookChildDetailsAPI,
         getWorkbookChildDetailsAPIStatus,
         getWorkbookChildDetailsAPIError,
         getMoveWorkbooksAndFoldersAPI,
         getMoveWorkbooksAndFoldersStatus,
         getMoveWorkbooksAndFoldersError,
         moveActiveFolderInfo,
         workbookChildDetails,
         getRootFolderDetailsAPI,
         getRootFolderDetailsAPIStatus,
         getRootFolderDetailsAPIError,
         rootFolderId,
         workbookDetails,
         clearMoveWorkbooksAndFolders,
         clearWorkbookChildDetails,
         shouldDisableActions,
         isSubmitted,
         isAssignmentCompleted,
         isAssignmentWorkbook,
         isCompletedAssignmentWorkbook
      } = this.props
      const { isZoomedOut } = this

      if (activePageDetails) {
         const { moveSection, moveCard } = activePageDetails
         return this.activePageLists.map((page, index) => (
            <Draggable draggableId={page.id} index={index} key={page.id}>
               {(draggableProvided: DraggableProvided): ReactElement => (
                  <ListDraggableContainer
                     ref={draggableProvided.innerRef}
                     {...draggableProvided.draggableProps}
                     isZoomedOut={isZoomedOut}
                  >
                     <ListParent isZoomedOut={isZoomedOut}>
                        <RenderDefaultOrNewList
                           isCreating={page.isCreating}
                           list={page}
                           listOrder={index}
                           listContainerRef={this.listContainerRef}
                           activePageId={activePageDetails.id}
                           getPageDetails={this.getActivePageDetails}
                           activePageDetails={activePageDetails}
                           addNewList={this.addNewList}
                           removeNewList={this.removeNewList}
                           draggableProvided={draggableProvided}
                           onToggleCardSelection={this.toggleCardSelection}
                           setMaxWidth={this.setMaxWidth}
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
                              getMoveWorkbooksAndFoldersAPI
                           }
                           getWorkbooksAndFoldersStatus={
                              getMoveWorkbooksAndFoldersStatus
                           }
                           getWorkbooksAndFoldersError={
                              getMoveWorkbooksAndFoldersError
                           }
                           activeFolderInfo={moveActiveFolderInfo}
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
                           moveSection={moveSection}
                           moveCard={moveCard}
                           clearMoveWorkbooksAndFolders={
                              clearMoveWorkbooksAndFolders
                           }
                           clearWorkbookChildDetails={clearWorkbookChildDetails}
                           isDragUpdated={this.isDragUpdated}
                           isCardSelectionEnabled={this.isCardSelectionEnabled}
                           enableSelectionForAllCards={
                              this.enableSelectionForAllCards
                           }
                           disableSelectionForAllCard={
                              this.disableSelectionForAllCard
                           }
                           shouldDisableActions={shouldDisableActions}
                           isSubmitted={isSubmitted || isAssignmentCompleted}
                           isAssignmentWorkbook={isAssignmentWorkbook}
                           isCompletedAssignmentWorkbook={
                              isCompletedAssignmentWorkbook
                           }
                           openMobileMoveCardDrawer={
                              this.openMobileMoveCardDrawer
                           }
                           onSuccessListOperation={this.onSuccessListOperation}
                           isZoomedOut={isZoomedOut}
                           toggleIsZoomedOut={this.toggleIsZoomedOut}
                           setIsSectionOrCardCreationInProgress={
                              this.setIsSectionOrCardCreationInProgress
                           }
                           listContainerMaxHeight={this.listContainerMaxHeight}
                        />
                     </ListParent>
                  </ListDraggableContainer>
               )}
            </Draggable>
         ))
      }
   }

   // TODO: Need to update return type
   renderLists = observer((): any => {
      const { activePageDetails } = this.props
      if (activePageDetails) {
         if (this.activePageLists.length === 0) {
            return this.renderAddListButton()
         }
         return (
            <>
               {isMobileDevice ? (
                  <StyledCarousel
                     isZoomedOut={this.isZoomedOut}
                     onSlideVisible={this.onSlideVisible}
                     slidesPerPageSettings={slidesPerPageSettings}
                     sliderRef={this.carousalRef}
                  >
                     {this.renderActivePageDetails()}
                  </StyledCarousel>
               ) : (
                  this.renderActivePageDetails()
               )}
            </>
         )
      }
   })

   getDestinationListIndex = (
      sourceIndex: number,
      destinationIndex: number
   ): number => {
      if (this.isListCreatingInProgress) {
         const currentlyCreatingList = this.activePageLists.find(
            list => list.isCreating
         )
         const currentlyCreatingListIndex = this.activePageLists.findIndex(
            list => list.id === currentlyCreatingList?.id
         )
         if (currentlyCreatingList) {
            this.currentlyCreatingList = {
               index: currentlyCreatingListIndex,
               list: currentlyCreatingList
            }
         }
         let updatedCurrentlyCreatingListIndex = currentlyCreatingListIndex
         let updatedListIndex!: number
         if (currentlyCreatingListIndex === destinationIndex) {
            if (sourceIndex < currentlyCreatingListIndex) {
               updatedListIndex = destinationIndex - 1
               updatedCurrentlyCreatingListIndex =
                  currentlyCreatingListIndex - 1
            } else if (sourceIndex > currentlyCreatingListIndex) {
               updatedListIndex = destinationIndex
               updatedCurrentlyCreatingListIndex =
                  currentlyCreatingListIndex + 1
            }
         } else if (currentlyCreatingListIndex > destinationIndex) {
            updatedListIndex = destinationIndex
            if (sourceIndex > currentlyCreatingListIndex) {
               updatedCurrentlyCreatingListIndex =
                  currentlyCreatingListIndex + 1
            }
         } else if (currentlyCreatingListIndex < destinationIndex) {
            updatedListIndex = destinationIndex - 1
            if (sourceIndex < currentlyCreatingListIndex) {
               updatedCurrentlyCreatingListIndex =
                  currentlyCreatingListIndex - 1
            }
         }
         if (this.currentlyCreatingList) {
            this.currentlyCreatingList.index = updatedCurrentlyCreatingListIndex
         }
         return updatedListIndex
      }
      return destinationIndex
   }

   addNewlyCreatingList = (currentListIndex: number | null): void => {
      if (this.currentlyCreatingList && this.isListCreatingInProgress) {
         const { index, list } = this.currentlyCreatingList
         if (currentListIndex) {
            if (currentListIndex < index) {
               this.activePageLists.splice(index - 1, 0, list)
            } else {
               this.activePageLists.splice(index, 0, list)
            }
         } else {
            this.activePageLists.splice(index, 0, list)
         }
      }
   }

   onSuccessListOperation = (currentListIndex: number): void => {
      this.updateActivePageLists()
      this.addNewlyCreatingList(currentListIndex)
   }

   updateActivePageLists = (): void => {
      const { activePageDetails } = this.props
      if (activePageDetails) {
         this.activePageLists = Array.from(activePageDetails.lists.values())
      }
   }

   onFailureReorderAPI = (): void => {
      const {
         getWorkbookDetails,
         isAssignmentWorkbook,
         getAssignmentWorkbookDetails
      } = this.props
      if (isAssignmentWorkbook) {
         getAssignmentWorkbookDetails && getAssignmentWorkbookDetails()
      } else {
         getWorkbookDetails()
      }
   }

   updateListOrder = (): void => {
      this.updateActivePageLists()
      this.addNewlyCreatingList(null)
   }

   isFirstRow

   getCardIndex = (
      cards: Array<CardModel>,
      rowIndex: number,
      index: number,
      updatedSourceIndex: number | undefined
   ): number => {
      const cardsData = chunkArray(cards, this.maxWidth)
      let previousRowsElementsCount = 0
      for (let i = 0; i < rowIndex; i++) {
         previousRowsElementsCount += cardsData[i].length
      }

      const isSourceGreaterThanDestination =
         updatedSourceIndex !== undefined
            ? updatedSourceIndex >= previousRowsElementsCount + index
            : true

      let updatedIndex!: number

      if (isSourceGreaterThanDestination) {
         updatedIndex = previousRowsElementsCount + index
      } else {
         if (previousRowsElementsCount === 0) {
            updatedIndex = index
            this.isFirstRow = true
         } else {
            updatedIndex = previousRowsElementsCount + index - 1
            this.isFirstRow = false
         }
      }
      return updatedIndex
   }

   onDragEnd = (result: DropResult): void => {
      if (!result.destination) {
         return
      }

      const { type, draggableId, source, destination } = result
      const { activePageDetails, reorderPageAPI, reorderPage } = this.props
      switch (type) {
         case DROPPABLE_LIST:
            if (activePageDetails) {
               const {
                  changeListSectionOrder,
                  reorderListSectionAPI
               } = activePageDetails
               const { droppableId: sourceListId } = source
               const {
                  droppableId: destinationListId,
                  index: sectionDestinationIndex
               } = destination
               changeListSectionOrder(
                  sourceListId,
                  destinationListId,
                  draggableId,
                  sectionDestinationIndex
               )
               reorderListSectionAPI(
                  draggableId,
                  {
                     list_id: destinationListId,
                     order: sectionDestinationIndex + 1
                  },
                  this.onFailureReorderAPI
               )
            }
            break
         case DROPPABLE_LISTS_CONTAINER:
            if (activePageDetails) {
               const {
                  changePageListOrder,
                  reorderPageListAPI
               } = activePageDetails
               const { index: destinationIndex } = destination
               const { index: sourceIndex } = source
               const listDestinationIndex = this.getDestinationListIndex(
                  sourceIndex,
                  destinationIndex
               )
               if (sourceIndex !== listDestinationIndex) {
                  changePageListOrder(draggableId, listDestinationIndex)
                  this.updateListOrder()
                  reorderPageListAPI(
                     draggableId,
                     {
                        order: listDestinationIndex + 1
                     },
                     this.onFailureReorderAPI
                  )
               }
            }
            break
         case DROPPABLE_SECTION:
            if (activePageDetails) {
               const {
                  changeSectionCardOrder,
                  reorderSectionCardAPI
               } = activePageDetails
               const {
                  droppableId: sourceSectionRowId,
                  index: sourceIndex
               } = source
               const {
                  droppableId: destinationSectionRowId,
                  index: destinationIndex
               } = destination
               const sourceSectionRowIndex = parseInt(
                  sourceSectionRowId.split('#')[2]
               )
               const destinationSectionRowIndex = parseInt(
                  destinationSectionRowId.split('#')[2]
               )
               const sourceSectionId = sourceSectionRowId.split('#')[1]
               const destinationSectionId = destinationSectionRowId.split(
                  '#'
               )[1]
               const { lists } = activePageDetails
               let sectionSourceList!: ListModel,
                  sectionDestinationList!: ListModel
               lists.forEach(list => {
                  const { sections } = list
                  if (sections.get(sourceSectionId)) {
                     sectionSourceList = list
                  }
                  if (sections.get(destinationSectionId)) {
                     sectionDestinationList = list
                  }
               })
               const { sections: sourceListSections } = sectionSourceList
               const sourceSection = sourceListSections.get(sourceSectionId)
               const {
                  sections: destinationListSections
               } = sectionDestinationList
               const destinationSection = destinationListSections.get(
                  destinationSectionId
               )
               let sourceSectionCards!: Array<CardModel>,
                  destinationSectionCards!: Array<CardModel>
               if (sourceSection && destinationSection) {
                  sourceSectionCards = Array.from(sourceSection.cards.values())
                  destinationSectionCards = Array.from(
                     destinationSection.cards.values()
                  )
               }

               let sectionCardDestinationOrder!: number
               if (sourceSectionId === destinationSectionId) {
                  if (sourceSectionRowId === destinationSectionRowId) {
                     const updatedSourceIndex = this.getCardIndex(
                        sourceSectionCards,
                        sourceSectionRowIndex,
                        sourceIndex,
                        undefined
                     )
                     const getCardIndex = this.getCardIndex(
                        sourceSectionCards,
                        destinationSectionRowIndex,
                        destinationIndex,
                        updatedSourceIndex
                     )
                     if (
                        updatedSourceIndex >= getCardIndex ||
                        updatedSourceIndex === 0 ||
                        this.isFirstRow
                     ) {
                        sectionCardDestinationOrder = getCardIndex
                        if (updatedSourceIndex === getCardIndex) {
                           sectionCardDestinationOrder = getCardIndex + 1
                        }
                        if (sourceIndex === destinationIndex) {
                           sectionCardDestinationOrder = getCardIndex
                        }
                     } else {
                        sectionCardDestinationOrder = getCardIndex + 1
                     }
                  } else {
                     const updatedSourceIndex = this.getCardIndex(
                        sourceSectionCards,
                        sourceSectionRowIndex,
                        sourceIndex,
                        undefined
                     )
                     sectionCardDestinationOrder = this.getCardIndex(
                        sourceSectionCards,
                        destinationSectionRowIndex,
                        destinationIndex,
                        updatedSourceIndex
                     )
                  }
               } else {
                  sectionCardDestinationOrder = this.getCardIndex(
                     destinationSectionCards,
                     destinationSectionRowIndex,
                     destinationIndex,
                     undefined
                  )
               }
               changeSectionCardOrder(
                  sourceSectionId,
                  destinationSectionId,
                  draggableId,
                  sectionCardDestinationOrder
               )
               reorderSectionCardAPI(
                  draggableId,
                  {
                     section_id: destinationSectionId,
                     order: sectionCardDestinationOrder + 1
                  },
                  this.onFailureReorderAPI
               )
            }
            break
      }
      if (type === DROPPABLE_PAGE_CONTAINER) {
         const {
            source: { index: sourcePageOrder },
            destination: { index: destinationPageOrder }
         } = result
         if (sourcePageOrder !== destinationPageOrder) {
            reorderPage(draggableId, destinationPageOrder)
            const request = { order: destinationPageOrder + 1 }
            reorderPageAPI(draggableId, request, this.onFailureReorderAPI)
         }
      }
      this.isDragUpdated = false
      this.changeDraggingInProgress(false)
   }

   onDragUpdate = () => {
      this.isDragUpdated = true
   }

   changeDraggingInProgress = state => {
      this.isDraggingInProgress = state
   }

   onBeforeCapture = () => {
      this.changeDraggingInProgress(true)
   }

   onFailureSubmitAssignment = (): void => {
      const { activePageDetails } = this.props
      if (activePageDetails) {
         const { submitAssignmentAPIError } = activePageDetails
         showFailureBottomCenterToast(
            getAPIErrorMessage(submitAssignmentAPIError)
         )
      }
   }

   onSuccessSubmitAssignment = () => {
      const { onSuccessSubmitAssignment } = this.props
      if (onSuccessSubmitAssignment) {
         this.closeConfirmationPopUp()
         this.closeSubmitConfirmationDrawer()
         onSuccessSubmitAssignment()
      }
   }

   submitAssignment = (): void => {
      const { activePageDetails, onSuccessSubmitAssignment } = this.props
      if (activePageDetails && onSuccessSubmitAssignment) {
         const { id, submitAssignmentAPI } = activePageDetails
         submitAssignmentAPI(
            id,
            this.onSuccessSubmitAssignment,
            this.onFailureSubmitAssignment
         )
      }
   }

   openConfirmationPopUp = () => {
      this.submitConfirmationRef.current?.openModal()
   }

   closeConfirmationPopUp = () => {
      this.submitConfirmationRef.current?.closeModal()
   }

   renderSubmitConfirmationPopUp = () => {
      const {
         submitConfirmationRef,
         closeConfirmationPopUp,
         props: { t, activePageDetails },
         submitAssignment
      } = this
      if (activePageDetails) {
         const { submitAssignmentAPIStatus } = activePageDetails
         return (
            <CustomPopUp
               ref={submitConfirmationRef}
               onCancel={closeConfirmationPopUp}
               onConfirm={submitAssignment}
               actionType={SUBMIT}
               description={t(
                  'workbookManagement:assignmentWorkbook.areYouSureYouWantToSubmitAssignment'
               )}
               isSubmitButtonLoading={isAPIFetching(submitAssignmentAPIStatus)}
            />
         )
      }
   }

   renderAssignmentWorkbookButton = (): JSX.Element | null => {
      const {
         isCreator,
         isAssignmentWorkbook,
         isSubmitted,
         onClickViewResultsButton,
         t,
         isAssignmentCompleted,
         isCompletedAssignmentWorkbook,
         activePageDetails,
         workbookDetails: { totalTimeInSeconds },
         notAttempted
      } = this.props
      if (
         (!isCreator && !isAssignmentWorkbook) ||
         (isCompletedAssignmentWorkbook && notAttempted)
      ) {
         return null
      }
      if (isCreator) {
         return (
            <PrimaryButton
               onClick={this.openPublishModal}
               data-testid='publishButton'
            >
               <PublishIcon />
               <PrimaryButtonText>
                  {t('workbookManagement:publishWorkbook.publish')}
               </PrimaryButtonText>
            </PrimaryButton>
         )
      }
      if (isSubmitted) {
         return isMobileDevice ? (
            <MobileViewResultsButton
               onClick={onClickViewResultsButton}
               data-testid='mobileViewResultsButton'
            >
               <MobileViewResultsButtonText>
                  {t('workbookManagement:assignmentWorkbook.viewResults')}
               </MobileViewResultsButtonText>
            </MobileViewResultsButton>
         ) : (
            <ViewResultsButton
               onClick={onClickViewResultsButton}
               data-testid='viewResultsButton'
            >
               <ViewResultsButtonText>
                  {t('workbookManagement:assignmentWorkbook.viewResults')}
               </ViewResultsButtonText>
            </ViewResultsButton>
         )
      } else if (totalTimeInSeconds && !isSubmitted && !isAssignmentCompleted) {
         if (activePageDetails) {
            const { submitAssignmentAPIStatus } = activePageDetails
            return (
               <PrimaryButton
                  onClick={
                     isMobileDevice
                        ? this.openSubmitConfirmationDrawer
                        : this.openConfirmationPopUp
                  }
                  isLoading={isAPIFetching(submitAssignmentAPIStatus)}
                  data-testid='assignmentSubmitButton'
               >
                  <TickIcon width={16} height={16} fill={Colors.white} />
                  <PrimaryButtonText>
                     {t('workbookManagement:assignmentWorkbook.submit')}
                  </PrimaryButtonText>
               </PrimaryButton>
            )
         }
      }
      return null
   }

   isMobileWorkbookFooterButtonDisplayed = () => {
      const {
         isAssignmentWorkbook,
         isCreator,
         isSubmitted,
         isAssignmentCompleted,
         workbookDetails: { totalTimeInSeconds }
      } = this.props

      return (
         isAssignmentWorkbook &&
         (isCreator ||
            isSubmitted ||
            (totalTimeInSeconds && !isSubmitted && !isAssignmentCompleted))
      )
   }

   renderMobileWorkbookPageAndZoomButton = (): ReactNode => {
      const { shouldDisableActions } = this.props
      return this.isMergingCards ||
         this.isSectionOrCardCreationInProgress ? null : (
         <MobileWorkbookFooter>
            <ShowPagesButton
               shape={Button.shapes.round}
               onClick={this.openPagesDrawer}
               shouldHidePagesButton={shouldDisableActions}
            >
               <GroupCopyIcon width={15} height={18} />
            </ShowPagesButton>
            {this.renderDots()}
            <ZoomingButton onClick={this.toggleIsZoomedOut}>
               {this.isZoomedOut ? (
                  <ZoomInIcon width={24} height={24} />
               ) : (
                  <ZoomOutIcon width={24} height={24} />
               )}
            </ZoomingButton>
         </MobileWorkbookFooter>
      )
   }

   openSubmitConfirmationDrawer = (): void => {
      this.isVisibleSubmitConfirmationDrawer = true
   }

   closeSubmitConfirmationDrawer = (): void => {
      this.isVisibleSubmitConfirmationDrawer = false
   }

   renderSubmitConfirmationDrawerHeaderContent = () => {
      const { t } = this.props
      return (
         <DrawerTitleText>
            {t('workbookManagement:assignmentWorkbook.submitAssignment')}
         </DrawerTitleText>
      )
   }

   renderSubmitConfirmationDrawer = (): ReactNode => {
      const {
         isVisibleSubmitConfirmationDrawer,
         closeSubmitConfirmationDrawer,
         props: { activePageDetails },
         submitAssignment,
         renderSubmitConfirmationDrawerHeaderContent
      } = this
      if (activePageDetails) {
         const { submitAssignmentAPIStatus } = activePageDetails
         return (
            <MobileBottomCustomDrawer
               headerContent={renderSubmitConfirmationDrawerHeaderContent()}
               isVisible={isVisibleSubmitConfirmationDrawer}
               closeDrawer={closeSubmitConfirmationDrawer}
               isCancelButtonDisabled={isAPIFetching(submitAssignmentAPIStatus)}
               isDeleteButtonDisabled={isAPIFetching(submitAssignmentAPIStatus)}
               isDeleteButtonLoading={isAPIFetching(submitAssignmentAPIStatus)}
               onClickDeleteButton={submitAssignment}
               drawerType={SUBMIT}
               type={ASSIGNMENT}
            />
         )
      }
   }

   renderMobileAssignmentWorkbookButton = (): ReactNode => {
      const workbookAssignmentButton = this.renderAssignmentWorkbookButton()
      return workbookAssignmentButton ? (
         <AssignmentWorkbookButtonContainer>
            {workbookAssignmentButton}
         </AssignmentWorkbookButtonContainer>
      ) : null
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getChromeBannerUIStore = () => this.getInjectedProps().chromeBannerUIStore

   renderContent = observer(
      (): ReactElement => {
         const {
            totalPages,
            activePageDetails,
            updatePageObjectiveWithDescriptionAPI,
            isCreator,
            isAssignmentWorkbook,
            shouldDisableActions,
            onSuccessSubmitAssignment,
            onClickViewResultsButton,
            isSubmitted,
            isAssignmentCompleted,
            updatePageObjectiveWithDescriptionAPIStatus,
            workbookDetails: { totalTimeInSeconds, leftTimeInSeconds }
         } = this.props
         const {
            renderLists: RenderLists,
            submitAssignment,
            isMobileWorkbookFooterButtonDisplayed,
            isDraggingInProgress,
            renderSubmitConfirmationPopUp
         } = this
         const {
            shouldDisplayViewInChromeMessageBanner
         } = this.getChromeBannerUIStore()
         if (totalPages.length > 0 && activePageDetails) {
            const {
               objective: activePageObjective,
               description: activePageDescription,
               id,
               submitAssignmentAPI,
               submitAssignmentAPIStatus,
               submitAssignmentAPIError,
               name
            } = activePageDetails
            return (
               <>
                  <PageTitleAndObjectiveContainer>
                     <PageHeader
                        pageObjective={activePageObjective}
                        pageDescription={activePageDescription}
                        updatePageObjectiveWithDescriptionAPI={
                           updatePageObjectiveWithDescriptionAPI
                        }
                        isCreator={isCreator}
                        isAssignmentWorkbook={isAssignmentWorkbook}
                        isSubmitted={isSubmitted}
                        shouldDisableActions={shouldDisableActions}
                        pageId={id}
                        submitAssignmentAPI={submitAssignmentAPI}
                        submitAssignmentAPIStatus={submitAssignmentAPIStatus}
                        submitAssignmentAPIError={submitAssignmentAPIError}
                        onSuccessSubmitAssignment={
                           onSuccessSubmitAssignment
                              ? onSuccessSubmitAssignment
                              : (): void => {}
                        }
                        onClickViewResultsButton={
                           onClickViewResultsButton
                              ? onClickViewResultsButton
                              : (): void => {}
                        }
                        isAssignmentCompleted={isAssignmentCompleted}
                        onClickPublishButton={this.openPublishModal}
                        updatePageObjectiveWithDescriptionAPIStatus={
                           updatePageObjectiveWithDescriptionAPIStatus
                        }
                        isMergeActive={this.shouldShowMergeHeader}
                        name={name}
                        assignmentWorkbookButton={
                           this.renderAssignmentWorkbookButton
                        }
                        leftTime={leftTimeInSeconds}
                        totalTimeInSeconds={totalTimeInSeconds}
                        submitAssignment={submitAssignment}
                     />
                     {isAssignmentWorkbook && renderSubmitConfirmationPopUp()}
                     {isAssignmentWorkbook &&
                        this.renderSubmitConfirmationDrawer()}
                  </PageTitleAndObjectiveContainer>
                  <ListsContainer
                     ref={this.listContainerRef}
                     shouldDisplayViewInChromeMessageBanner={
                        shouldDisplayViewInChromeMessageBanner
                     }
                  >
                     <DragDropContext
                        onDragEnd={this.onDragEnd}
                        onDragUpdate={this.onDragUpdate}
                        onBeforeCapture={this.onBeforeCapture}
                     >
                        <Droppable
                           droppableId={DROPPABLE_LISTS_CONTAINER}
                           type={DROPPABLE_LISTS_CONTAINER}
                           direction={horizontal}
                        >
                           {(provided: DroppableProvided): ReactElement => (
                              <ListsDroppable
                                 ref={provided.innerRef}
                                 {...provided.droppableProps}
                                 data-testid='listsDroppable'
                                 isDraggingInProgress={isDraggingInProgress}
                                 isMobileWorkbookFooterButtonDisplayed={isMobileWorkbookFooterButtonDisplayed()}
                                 listContainerMaxHeight={
                                    this.listContainerMaxHeight
                                 }
                                 id='listsDroppable'
                              >
                                 <RenderLists />
                                 {provided.placeholder}
                              </ListsDroppable>
                           )}
                        </Droppable>
                     </DragDropContext>
                  </ListsContainer>
                  {isMobileDevice ? (
                     <MobileWorkbookFooterWithAssignmentButton id='mobileWorkbookFooterContainer'>
                        {this.renderMobileAssignmentWorkbookButton()}
                        {this.renderMobileWorkbookPageAndZoomButton()}
                     </MobileWorkbookFooterWithAssignmentButton>
                  ) : null}
               </>
            )
         }
         return (
            <EmptyWorkbookContainer>
               {/* TODO: Need to add onClick event for `Add page` button */}
               <EmptyWorkbook onClickAddPageButton={() => {}} />
            </EmptyWorkbookContainer>
         )
      }
   )

   startMergingCards = (): void => {
      this.isMergingCards = true
   }

   stopMergingCards = (): void => {
      this.isMergingCards = false
      this.selectedCards = []
      const { activePageDetails } = this.props
      activePageDetails?.clearMultipleCardsData()
   }

   clearSelectedCards = (): void => {
      this.shouldShowMergeHeader = false
      this.selectedCards = []
      const { activePageDetails } = this.props
      activePageDetails?.clearCardsSelectedState()
      this.disableSelectionForAllCard()
   }

   getActivePageDetails = (): void => {
      const { getPageDetails, activePageDetails } = this.props
      if (activePageDetails) {
         getPageDetails(activePageDetails.id, this.updateActivePageLists)
      }
      this.isListCreatingInProgress = false
      this.stopMergingCards()
   }

   getPageDetails = (id: string): void => {
      const { getPageDetails } = this.props
      this.isListCreatingInProgress = false
      this.clearSelectedCards()
      getPageDetails(id, this.updateActivePageLists)
   }

   @action.bound
   enableSelectionForAllCards = (): void => {
      this.isCardSelectionEnabled = true
      if (isMobileDevice || isTabletDevice) {
         this.shouldShowMergeHeader = true
      }
      this.updateActivePageLists()
   }

   disableSelectionForAllCard = (): void => {
      this.isCardSelectionEnabled = false
      this.updateActivePageLists()
      this.addNewlyCreatingList(null)
   }

   renderPageDetails = observer(
      (): ReactElement => {
         const { renderContent: RenderContent, activePageLists } = this
         const {
            id,
            activePageDetails,
            mergeCardsAPI,
            mergeCardsAPIStatus,
            mergeCardsAPIError,
            getWorkbookChildDetailsAPI,
            getWorkbookChildDetailsAPIStatus,
            getWorkbookChildDetailsAPIError,
            getMoveWorkbooksAndFoldersAPI,
            getMoveWorkbooksAndFoldersStatus,
            getMoveWorkbooksAndFoldersError,
            moveActiveFolderInfo,
            workbookChildDetails,
            workbookDetails,
            getRootFolderDetailsAPI,
            getRootFolderDetailsAPIStatus,
            getRootFolderDetailsAPIError,
            clearMoveWorkbooksAndFolders,
            clearWorkbookChildDetails
         } = this.props
         let getMultipleCardDetailsAPIStatus!: APIStatus,
            // TODO: Need to update type
            getMultipleCardDetailsAPIError!: any,
            getMultipleCardDetailsAPI!: any,
            cardsDetails!: Array<CardModel>
         if (activePageDetails) {
            getMultipleCardDetailsAPIStatus =
               activePageDetails.getMultipleCardDetailsAPIStatus
            getMultipleCardDetailsAPIError =
               activePageDetails.getMultipleCardDetailsAPIError
            getMultipleCardDetailsAPI =
               activePageDetails.getMultipleCardDetailsAPI
            cardsDetails = activePageDetails.cardsDetails
         }
         return this.isMergingCards ? (
            <MergeCards
               workbookId={id}
               selectedCards={this.selectedCards}
               getMultipleCardDetailsAPIStatus={getMultipleCardDetailsAPIStatus}
               getMultipleCardDetailsAPIError={getMultipleCardDetailsAPIError}
               getMultipleCardDetailsAPI={getMultipleCardDetailsAPI}
               cardsDetails={cardsDetails}
               clearSelectedCards={this.clearSelectedCards}
               mergeCardsAPI={mergeCardsAPI}
               mergeCardsAPIStatus={mergeCardsAPIStatus}
               mergeCardsAPIError={mergeCardsAPIError}
               getWorkbookChildDetailsAPI={getWorkbookChildDetailsAPI}
               getWorkbookChildDetailsAPIStatus={
                  getWorkbookChildDetailsAPIStatus
               }
               getWorkbookChildDetailsAPIError={getWorkbookChildDetailsAPIError}
               getWorkbooksAndFoldersAPI={getMoveWorkbooksAndFoldersAPI}
               getWorkbooksAndFoldersStatus={getMoveWorkbooksAndFoldersStatus}
               getWorkbooksAndFoldersError={getMoveWorkbooksAndFoldersError}
               activeFolderInfo={moveActiveFolderInfo}
               workbookChildDetails={workbookChildDetails}
               getActivePageDetails={this.getActivePageDetails}
               workbookDetails={workbookDetails}
               getRootFolderDetailsAPI={getRootFolderDetailsAPI}
               getRootFolderDetailsAPIStatus={getRootFolderDetailsAPIStatus}
               getRootFolderDetailsAPIError={getRootFolderDetailsAPIError}
               onClickCloseButton={this.stopMergingCards}
               clearMoveWorkbooksAndFolders={clearMoveWorkbooksAndFolders}
               clearWorkbookChildDetails={clearWorkbookChildDetails}
            />
         ) : (
            <RenderContent />
         )
      }
   )

   openPublishModal = (): void => {
      this.publishModalRef.current?.openModal()
   }

   closePublishModal = (): void => {
      this.publishModalRef.current?.closeModal()
   }

   onSuccessPublishWorkbook = (): void => {
      const { t } = this.props
      this.closePublishModal()
      showSuccessBottomCenterToast(
         t(`workbookManagement:publishWorkbook.publishedSuccessfully`)
      )
   }

   onFailurePublishWorkbook = (): void => {
      const { publishWorkbookAPIError } = this.props
      showFailureBottomCenterToast(getAPIErrorMessage(publishWorkbookAPIError))
   }

   publishWorkbookAPI = (request: PublishWorkbookRequest): void => {
      const { id, publishWorkbookAPI } = this.props
      if (publishWorkbookAPI) {
         publishWorkbookAPI(
            id,
            request,
            this.onSuccessPublishWorkbook,
            this.onFailurePublishWorkbook
         )
      }
   }

   onClickMobilePage = (id: string): void => {
      this.closePagesDrawer()
      this.getPageDetails(id)
   }

   openPagesDrawer = (): void => {
      this.isPagesDrawerVisible = true
   }

   closePagesDrawer = (): void => {
      this.isPagesDrawerVisible = false
   }

   // TODO: Need to add return type
   onSuccessCreatePage = async (pageId: string) => {
      this.closePagesDrawer()
      const { getPageDetails } = this.props
      await getPageDetails(pageId, this.updateActivePageLists)
   }

   onFailureCreatePage = (): void => {
      const { createPageAPIError } = this.props
      showFailureBottomCenterToast(getAPIErrorMessage(createPageAPIError))
   }

   // TODO: Need to add return type
   createNewPage = async () => {
      const { createPageAPI } = this.props
      await createPageAPI(this.onSuccessCreatePage, this.onFailureCreatePage)
   }

   renderPagesList = observer(() => {
      const {
         totalPages,
         createPageAPIStatus,
         shouldDisableActions,
         activePageDetails
      } = this.props
      const activePageId = activePageDetails ? activePageDetails.id : null
      return (
         <MobilePagesList
            pages={totalPages}
            isVisible={this.isPagesDrawerVisible}
            closeDrawer={this.closePagesDrawer}
            onClickPage={this.onClickMobilePage}
            onClickAddPage={this.createNewPage}
            createPageAPIStatus={createPageAPIStatus}
            shouldDisableActions={shouldDisableActions}
            activePageId={activePageId}
         />
      )
   })

   /* Start: Mobile Move Card Methods */
   @observable cardContainedListId
   @observable cardContainedSectionId
   @observable cardId
   @observable cardName
   @observable viewCardDetails
   @observable moveCardAPI
   @observable moveCardAPIStatus
   @observable moveCardAPIError
   @observable moveCard
   @observable hideCardDetails
   @observable cardLabel

   @action
   openMobileMoveCardDrawer = (
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
   ): void => {
      this.cardContainedListId = listId
      this.cardContainedSectionId = sectionId
      this.cardId = cardId
      this.cardName = cardName
      this.viewCardDetails = viewCardDetails
      this.hideCardDetails = hideCardDetails
      this.moveCardAPI = moveCardAPI
      this.moveCardAPIStatus = moveCardAPIStatus
      this.moveCardAPIError = moveCardAPIError
      this.moveCard = moveCard
      this.cardLabel = label
      this.moveCardDrawerModalRef.current?.openModal()
   }

   closeMobileMoveCardDrawer = (): void => {
      this.moveCardDrawerModalRef.current?.closeModal()
   }

   onSuccessMoveCardAPI = (
      cardName: string,
      sourceCardId: string,
      destinationSectionId: string
   ) => {
      this.hideCardDetails()
      this.moveCard(sourceCardId, destinationSectionId)
      showSuccessBottomCenterToast(`${cardName} is moved`)
   }

   onFailureMoveCardAPI = error => {
      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
   }

   onClickMoveCard = (sectionId): void => {
      this.closeMobileMoveCardDrawer()
      this.moveCardAPI(
         this.cardId,
         { section_id: sectionId },
         this.onSuccessMoveCardAPI,
         this.onFailureMoveCardAPI
      )
   }
   /* End: Mobile Move Card Methods */

   renderDots = () => {
      const { isZoomedOut } = this
      return isZoomedOut ? null : (
         <DotsContainer>
            {this.activePageLists.map((page, index) => (
               <IconContainer key={page.id}>
                  <DotElement isSelected={index === this.scrolledSlidesCount} />
               </IconContainer>
            ))}
         </DotsContainer>
      )
   }

   render(): ReactNode {
      const {
         id,
         totalPages,
         activePageDetails,
         getPageDetailsAPIStatus,
         getPageDetailsAPIError,
         createPageAPIStatus,
         movePageAPI,
         movePageAPIStatus,
         movePageAPIError,
         getMoveWorkbooksAndFoldersAPI,
         getMoveWorkbooksAndFoldersStatus,
         getMoveWorkbooksAndFoldersError,
         moveActiveFolderInfo,
         getRootFolderDetailsAPI,
         getRootFolderDetailsAPIStatus,
         getRootFolderDetailsAPIError,
         rootFolderId,
         getWorkbookChildDetailsAPI,
         getWorkbookChildDetailsAPIStatus,
         getWorkbookChildDetailsAPIError,
         workbookChildDetails,
         getWorkbookDetails,
         clearMoveWorkbooksAndFolders,
         createPageAPI,
         createPageAPIError,
         updatePageName,
         shouldDisableActions,
         getUsersGroupsAPI,
         getUsersGroupAPIStatus,
         getUsersGroupAPIError,
         publishWorkbookAPIStatus,
         userGroups,
         isAssignmentWorkbook
      } = this.props
      let updatePageNameAPI!: Function, activePageId!: string
      if (activePageDetails) {
         updatePageNameAPI = activePageDetails.updatePageNameAPI
         activePageId = activePageDetails.id
      }
      const { renderPagesList: RenderPagesList } = this
      //FIXME: allow user to scroll entire page when displaying result
      return (
         <ContainerWithFullHeightAndFlex>
            <PublishWorkbookPopUpWrapper
               innerRef={this.publishModalRef}
               onCancel={this.closePublishModal}
               getUsersGroupsAPI={
                  getUsersGroupsAPI ? getUsersGroupsAPI : (): void => {}
               }
               getUsersGroupAPIStatus={
                  getUsersGroupAPIStatus ? getUsersGroupAPIStatus : API_SUCCESS
               }
               getUsersGroupAPIError={getUsersGroupAPIError}
               userGroups={userGroups ? userGroups : new Map()}
               publishAssignmentWorkbookAPI={this.publishWorkbookAPI}
               publishAssignmentWorkbookAPIStatus={
                  publishWorkbookAPIStatus
                     ? publishWorkbookAPIStatus
                     : API_SUCCESS
               }
            />
            <MobileMoveCard
               innerRef={this.moveCardDrawerModalRef}
               closeDrawer={this.closeMobileMoveCardDrawer}
               lists={this.activePageLists}
               activeListId={this.cardContainedListId}
               activeSectionId={this.cardContainedSectionId}
               activeCardId={this.cardId}
               activeCardName={this.cardName}
               viewCardDetails={this.viewCardDetails}
               moveCard={this.onClickMoveCard}
               isAssignmentWorkbook={isAssignmentWorkbook}
               cardLabel={this.cardLabel}
            />
            <WorkbookContainer>
               {this.shouldShowMergeHeader ? (
                  <MergeHeader
                     onClickCloseButton={this.clearSelectedCards}
                     onClickMergeButton={this.startMergingCards}
                     selectedCardsCount={this.selectedCardsLength}
                  />
               ) : null}
               <LoadingWrapper
                  apiStatus={getPageDetailsAPIStatus}
                  apiError={getPageDetailsAPIError}
                  renderSuccessUI={this.renderPageDetails}
               />
               <WorkbookFooterContainer>
                  {isMobileDevice ? (
                     <RenderPagesList />
                  ) : (
                     <WorkbookFooter
                        pages={totalPages}
                        activePageId={activePageId}
                        updatePageNameAPI={updatePageNameAPI}
                        createPageAPI={createPageAPI}
                        createPageAPIError={createPageAPIError}
                        onClickPage={this.getPageDetails}
                        createPageAPIStatus={createPageAPIStatus}
                        onDragEnd={this.onDragEnd}
                        isMergingCards={this.isMergingCards}
                        movePageAPI={movePageAPI}
                        movePageAPIStatus={movePageAPIStatus}
                        movePageAPIError={movePageAPIError}
                        rootFolderId={rootFolderId}
                        getRootFolderDetailsAPI={getRootFolderDetailsAPI}
                        getRootFolderDetailsAPIStatus={
                           getRootFolderDetailsAPIStatus
                        }
                        getRootFolderDetailsAPIError={
                           getRootFolderDetailsAPIError
                        }
                        getWorkbooksAndFoldersAPI={
                           getMoveWorkbooksAndFoldersAPI
                        }
                        getWorkbooksAndFoldersStatus={
                           getMoveWorkbooksAndFoldersStatus
                        }
                        getWorkbooksAndFoldersError={
                           getMoveWorkbooksAndFoldersError
                        }
                        activeFolderInfo={moveActiveFolderInfo}
                        getWorkbookChildDetailsAPI={getWorkbookChildDetailsAPI}
                        getWorkbookChildDetailsAPIStatus={
                           getWorkbookChildDetailsAPIStatus
                        }
                        getWorkbookChildDetailsAPIError={
                           getWorkbookChildDetailsAPIError
                        }
                        workbookChildDetails={workbookChildDetails}
                        getWorkbookDetails={getWorkbookDetails}
                        workbookId={id}
                        clearMoveWorkbooksAndFolders={
                           clearMoveWorkbooksAndFolders
                        }
                        getPageDetails={this.getPageDetails}
                        updatePageName={updatePageName}
                        shouldDisableActions={shouldDisableActions}
                     />
                  )}
               </WorkbookFooterContainer>
            </WorkbookContainer>
         </ContainerWithFullHeightAndFlex>
      )
   }
}

export default withTranslation()(WorkbookComponent)
