import React, { Component, ReactNode, ReactElement } from 'react'
import { APIStatus } from '@ib/api-constants'
import { withTranslation } from 'react-i18next'
import {
   Draggable,
   DraggableProvided,
   Droppable,
   DroppableProvided
} from 'react-beautiful-dnd'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import PlusIcon from '../../../Common/icons/PlusIcon'
import Colors from '../../../Common/themes/Colors'
import { getAPIErrorMessage } from '../../../Common/utils/APIUtils'
import {
   showFailureBottomCenterToast,
   showSuccessBottomCenterToast
} from '../../../Common/utils/ToastUtils'

import SectionModel from '../../stores/models/SectionModel'
import ListModel from '../../stores/models/ListModel'
import WorkbookChildDetailsModel from '../../stores/models/WorkbookChildDetailsModel'
import { MoveListRequestType } from '../../stores/types'
import CardModel from '../../stores/models/CardModel'
import WorkbookModel from '../../stores/models/WorkbookModel'
import {
   DROPPABLE_LIST,
   LIST_CONTAINER_IDENTIFIER
} from '../../constants/UIConstants'

import ListSection from '../ListSection'
import AddSection from '../AddSection'

import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import ListHeader from './ListHeader'
import {
   ListContainer,
   SectionsContainer,
   AddSectionButton,
   AddSectionButtonContainer,
   AddSectionButtonText,
   DraggableListContainer,
   SectionDroppableArea
} from './styledComponents'

// FIXME: Need to fix WithTranslation Props
interface WithTranslation {
   i18n: any
   tReady: any
   t: any
}

interface PageListProps extends WithTranslation {
   list: ListModel
   sections: Array<SectionModel>
   onClickAddListButton: (listId: string) => void
   draggableProvided: DraggableProvided
   onClickDeleteListButton?: (listId: string) => void
   deleteListAPIStatus?: APIStatus
   getDeleteListAPIError?: any
   onToggleCardSelection: (card: CardModel) => void
   setMaxWidth: Function
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
   onSuccessListOperation: () => void
   isZoomedOut?: boolean
   toggleIsZoomedOut?: Function
   setIsSectionOrCardCreationInProgress?: Function
   listContainerMaxHeight: number
}

@observer
class PageList extends Component<PageListProps> {
   @observable isCreatingNewSection: boolean

   constructor(props) {
      super(props)
      this.isCreatingNewSection = false
   }

   onClickAddSectionButton = (): void => {
      const {
         isZoomedOut,
         toggleIsZoomedOut,
         setIsSectionOrCardCreationInProgress
      } = this.props
      isZoomedOut && toggleIsZoomedOut && toggleIsZoomedOut()
      this.isCreatingNewSection = true
      setIsSectionOrCardCreationInProgress &&
         setIsSectionOrCardCreationInProgress(this.isCreatingNewSection)
   }

   closeCreateSection = (): void => {
      const { setIsSectionOrCardCreationInProgress } = this.props
      this.isCreatingNewSection = false
      setIsSectionOrCardCreationInProgress &&
         setIsSectionOrCardCreationInProgress(this.isCreatingNewSection)
   }

   renderAddNewSection = (): ReactNode => {
      const {
         list: {
            id,
            createSectionAPIStatus,
            createSectionAPIError,
            createSectionAPI
         }
      } = this.props
      return (
         <AddSection
            listId={id}
            createSectionAPI={createSectionAPI}
            getCreateSectionAPIStatus={createSectionAPIStatus}
            getCreateSectionAPIError={createSectionAPIError}
            onCloseAddSection={this.closeCreateSection}
            onSuccessCreateSectionAPI={this.closeCreateSection}
         />
      )
   }

   isUserActionsEnabled = (): boolean => {
      const { shouldDisableActions } = this.props
      return !shouldDisableActions
   }

   renderAddSectionButton = observer(() => {
      const { t } = this.props
      return this.isUserActionsEnabled() ? (
         <AddSectionButtonContainer>
            {this.isCreatingNewSection ? (
               this.renderAddNewSection()
            ) : (
               <AddSectionButton
                  onClick={this.onClickAddSectionButton}
                  data-testid='listAddSectionButton'
               >
                  <PlusIcon width={16} height={16} fill={Colors.blueGrey} />
                  <AddSectionButtonText>
                     {t('workbookManagement:homeScreen.addSection')}
                  </AddSectionButtonText>
               </AddSectionButton>
            )}
         </AddSectionButtonContainer>
      ) : null
   })

   onSuccessDeleteSection = (name: string) => {
      //TODO: need to handle success case
      showSuccessBottomCenterToast(`${name} section is deleted`)
   }

   onFailureDeleteSection = error => {
      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
   }

   onDeleteSection = (
      sectionId: string,
      closeSectionDeleteModal,
      closeSectionDeleteDrawer
   ) => {
      const {
         list: { deleteSectionAPI }
      } = this.props
      deleteSectionAPI(
         sectionId,
         name => {
            if (isMobileDevice) {
               closeSectionDeleteDrawer()
            } else {
               closeSectionDeleteModal()
            }
            this.onSuccessDeleteSection(name)
         },
         this.onFailureDeleteSection
      )
   }

   renderSections = observer(
      (): ReactElement => {
         const {
            list: {
               id: listId,
               moveSectionAPIStatus,
               moveSectionAPIError,
               moveSectionAPI,
               deleteSectionAPIStatus
            },
            sections,
            onToggleCardSelection,
            setMaxWidth,
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
            openMobileMoveCardDrawer,
            isZoomedOut,
            toggleIsZoomedOut,
            setIsSectionOrCardCreationInProgress
         } = this.props
         const { renderAddSectionButton: RenderSectionAddSectionButton } = this
         return (
            <>
               {sections.map((section, index) => {
                  const { id, name, cardValues } = section
                  return (
                     <Draggable
                        draggableId={id}
                        key={id}
                        index={index}
                        isDragDisabled={shouldDisableActions}
                     >
                        {(provided: DraggableProvided): ReactElement => (
                           <DraggableListContainer
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                           >
                              <ListSection
                                 section={section}
                                 id={id}
                                 sectionName={name}
                                 cards={cardValues}
                                 isFirstSection={index === 0}
                                 draggableProvided={provided}
                                 onToggleCardSelection={onToggleCardSelection}
                                 onDeleteSection={this.onDeleteSection}
                                 moveSectionAPI={moveSectionAPI}
                                 moveSectionAPIStatus={moveSectionAPIStatus}
                                 moveSectionAPIError={moveSectionAPIError}
                                 setMaxWidth={setMaxWidth}
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
                                 getRootFolderDetailsAPI={
                                    getRootFolderDetailsAPI
                                 }
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
                                 clearWorkbookChildDetails={
                                    clearWorkbookChildDetails
                                 }
                                 isDragUpdated={this.props.isDragUpdated}
                                 isCardSelectionEnabled={isCardSelectionEnabled}
                                 enableSelectionForAllCards={
                                    enableSelectionForAllCards
                                 }
                                 disableSelectionForAllCard={
                                    disableSelectionForAllCard
                                 }
                                 shouldDisableActions={shouldDisableActions}
                                 isSubmitted={isSubmitted}
                                 isAssignmentWorkbook={isAssignmentWorkbook}
                                 isCompletedAssignmentWorkbook={
                                    isCompletedAssignmentWorkbook
                                 }
                                 deleteSectionAPIStatus={deleteSectionAPIStatus}
                                 listId={listId}
                                 openMobileMoveCardDrawer={
                                    openMobileMoveCardDrawer
                                 }
                                 isZoomedOut={isZoomedOut}
                                 toggleIsZoomedOut={toggleIsZoomedOut}
                                 setIsSectionOrCardCreationInProgress={
                                    setIsSectionOrCardCreationInProgress
                                 }
                              />
                           </DraggableListContainer>
                        )}
                     </Draggable>
                  )
               })}
               <RenderSectionAddSectionButton />
            </>
         )
      }
   )

   render(): ReactNode {
      const {
         list: {
            id,
            name: listName,
            updateName,
            renameListAPI,
            renameListAPIStatus,
            renameListAPIError
         },
         moveListAPI,
         moveListAPIStatus,
         moveListAPIError,
         onClickAddListButton,
         draggableProvided,
         onClickDeleteListButton,
         deleteListAPIStatus,
         getDeleteListAPIError,
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
         clearMoveWorkbooksAndFolders,
         clearWorkbookChildDetails,
         shouldDisableActions,
         onSuccessListOperation,
         isZoomedOut,
         toggleIsZoomedOut,
         listContainerMaxHeight
      } = this.props
      const { renderSections: RenderSections } = this
      //NOTE: here we are using LIST_CONTAINER_IDENTIFIER to calculate the width of the list
      return (
         <ListContainer
            className={LIST_CONTAINER_IDENTIFIER}
            data-testid='pageList'
            listContainerMaxHeight={listContainerMaxHeight}
         >
            <ListHeader
               listId={id}
               listName={listName}
               onClickAddListButton={onClickAddListButton}
               draggableProvided={draggableProvided}
               onClickDeleteListButton={onClickDeleteListButton}
               getDeleteListAPIError={getDeleteListAPIError}
               deleteListAPIStatus={deleteListAPIStatus}
               updateName={updateName}
               renameListAPI={renameListAPI}
               renameListAPIStatus={renameListAPIStatus}
               renameListAPIError={renameListAPIError}
               moveListAPI={moveListAPI}
               moveListAPIStatus={moveListAPIStatus}
               moveListAPIError={moveListAPIError}
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
               clearMoveWorkbooksAndFolders={clearMoveWorkbooksAndFolders}
               clearWorkbookChildDetails={clearWorkbookChildDetails}
               shouldDisableActions={shouldDisableActions}
               onSuccessListOperation={onSuccessListOperation}
               isZoomedOut={isZoomedOut}
               toggleIsZoomedOut={toggleIsZoomedOut}
            />
            <SectionsContainer>
               <Droppable droppableId={id} type={DROPPABLE_LIST}>
                  {(provided: DroppableProvided): ReactElement => (
                     <SectionDroppableArea
                        ref={provided.innerRef}
                        data-testid='droppableList'
                     >
                        <RenderSections />
                        {provided.placeholder}
                     </SectionDroppableArea>
                  )}
               </Droppable>
            </SectionsContainer>
         </ListContainer>
      )
   }
}

export default withTranslation()(PageList)
