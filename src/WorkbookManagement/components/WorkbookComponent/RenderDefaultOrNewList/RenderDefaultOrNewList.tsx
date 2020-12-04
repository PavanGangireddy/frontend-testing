import React from 'react'
import { observer } from 'mobx-react'
import { APIStatus } from '@ib/api-constants'
import { DraggableProvided } from 'react-beautiful-dnd'

import { isMobileDevice } from '../../../../Common/utils/responsiveUtils'
import BaseModalContainer from '../../../../Common/components/BaseModalContainer'

import WorkbookModel from '../../../stores/models/WorkbookModel'
import WorkbookChildDetailsModel from '../../../stores/models/WorkbookChildDetailsModel'
import PageModel from '../../../stores/models/PageModel'
import ListModel from '../../../stores/models/ListModel'
import CardModel from '../../../stores/models/CardModel'

import AddList from '../../AddList'
import PageList from '../../PageList'
import BottomDrawerModal from '../../../../Common/components/BottomDrawer/BottomDrawerModal'

interface RenderDefaultOrNewListProps {
   isCreating: boolean | undefined
   list: ListModel
   listOrder: number
   // TODO: Need to update type
   listContainerRef: any
   activePageId: string
   getPageDetails: () => void
   activePageDetails: PageModel | null
   addNewList: (listId: string) => void
   removeNewList: (listId: string) => void
   draggableProvided: DraggableProvided
   onToggleCardSelection: (card: CardModel) => void
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
   onSuccessListOperation: (order: number) => void
   isZoomedOut?: boolean
   toggleIsZoomedOut?: Function
   setIsSectionOrCardCreationInProgress?: Function
   listContainerMaxHeight: number
}

@observer
class RenderDefaultOrNewList extends React.Component<
   RenderDefaultOrNewListProps
> {
   addListDrawerRef

   constructor(props) {
      super(props)
      this.addListDrawerRef = React.createRef<BaseModalContainer>()
   }

   onSuccessListOperation = (): void => {
      const { listOrder, onSuccessListOperation } = this.props
      onSuccessListOperation(listOrder)
   }

   removeNewList = (): void => {
      const {
         list: { id },
         removeNewList
      } = this.props
      removeNewList(id)
   }

   closeAddListDrawer = (): void => {
      this.removeNewList()
      this.addListDrawerRef.current?.closeModal()
   }

   render() {
      const {
         isCreating,
         listOrder,
         list,
         getPageDetails,
         activePageDetails,
         listContainerRef,
         activePageId,
         addNewList,
         removeNewList,
         draggableProvided,
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
         isDragUpdated,
         isZoomedOut,
         toggleIsZoomedOut,
         setIsSectionOrCardCreationInProgress,
         listContainerMaxHeight
      } = this.props
      const { id: listId, name: listName, updateName, listSectionsArray } = list

      if (isCreating && isMobileDevice) {
         return (
            <BottomDrawerModal
               innerRef={this.addListDrawerRef}
               closeDrawer={this.closeAddListDrawer}
               headerContent={null}
               haveHeader={false}
               mounted={true}
               onCloseModal={this.removeNewList}
            >
               <AddList
                  listContainerRef={listContainerRef}
                  pageId={activePageId}
                  listId={listId}
                  order={listOrder}
                  listName={listName}
                  onChangeListName={updateName}
                  onClickAddListButton={activePageDetails?.createPageListAPI}
                  onClickCancelButton={this.closeAddListDrawer}
                  createListAPIError={activePageDetails?.createPageListAPIError}
                  createListAPIStatus={
                     activePageDetails?.createPageListAPIStatus
                  }
                  getPageDetails={getPageDetails}
               />
            </BottomDrawerModal>
         )
      }
      return isCreating ? (
         <AddList
            listContainerRef={listContainerRef}
            pageId={activePageId}
            listId={listId}
            order={listOrder}
            listName={listName}
            onChangeListName={updateName}
            onClickAddListButton={activePageDetails?.createPageListAPI}
            onClickCancelButton={removeNewList}
            createListAPIError={activePageDetails?.createPageListAPIError}
            createListAPIStatus={activePageDetails?.createPageListAPIStatus}
            getPageDetails={getPageDetails}
         />
      ) : (
         activePageDetails && (
            <PageList
               list={list}
               sections={listSectionsArray}
               onClickAddListButton={addNewList}
               draggableProvided={draggableProvided}
               onClickDeleteListButton={activePageDetails?.deleteListAPI}
               deleteListAPIStatus={activePageDetails?.deleteListAPIStatus}
               getDeleteListAPIError={activePageDetails?.getDeleteListAPIError}
               onToggleCardSelection={onToggleCardSelection}
               setMaxWidth={setMaxWidth}
               moveListAPI={activePageDetails.moveListAPI}
               moveListAPIStatus={activePageDetails.moveListAPIStatus}
               moveListAPIError={activePageDetails.moveListAPIError}
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
               moveSection={moveSection}
               moveCard={moveCard}
               clearMoveWorkbooksAndFolders={clearMoveWorkbooksAndFolders}
               clearWorkbookChildDetails={clearWorkbookChildDetails}
               isDragUpdated={isDragUpdated}
               isCardSelectionEnabled={isCardSelectionEnabled}
               enableSelectionForAllCards={enableSelectionForAllCards}
               disableSelectionForAllCard={disableSelectionForAllCard}
               shouldDisableActions={shouldDisableActions}
               isSubmitted={isSubmitted}
               isAssignmentWorkbook={isAssignmentWorkbook}
               isCompletedAssignmentWorkbook={isCompletedAssignmentWorkbook}
               openMobileMoveCardDrawer={openMobileMoveCardDrawer}
               onSuccessListOperation={this.onSuccessListOperation}
               isZoomedOut={isZoomedOut}
               toggleIsZoomedOut={toggleIsZoomedOut}
               setIsSectionOrCardCreationInProgress={
                  setIsSectionOrCardCreationInProgress
               }
               listContainerMaxHeight={listContainerMaxHeight}
            />
         )
      )
   }
}

export default RenderDefaultOrNewList
