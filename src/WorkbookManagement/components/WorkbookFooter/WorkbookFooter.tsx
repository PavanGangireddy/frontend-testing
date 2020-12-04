import React, { Component, ReactNode, ReactElement } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { withTranslation, WithTranslation } from 'react-i18next' // eslint-disable-line
import {
   Droppable,
   DroppableProvided,
   DragDropContext,
   Draggable,
   DraggableProvided,
   DropResult
} from 'react-beautiful-dnd'

import { APIStatus } from '@ib/api-constants'

import PlusIcon from '../../../Common/icons/PlusIcon'
import ChevronDownIcon from '../../../Common/icons/ChevronDownIcon'
import Colors from '../../../Common/themes/Colors'
import EditableTextInput from '../../../Common/components/EditableTextInput'
import {
   showFailureBottomCenterToast,
   showSuccessBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import {
   getAPIErrorMessage,
   isAPIFetching
} from '../../../Common/utils/APIUtils'
import { isEmpty } from '../../../Common/utils/ValidationUtils'
import ChevronRightIcon from '../../../Common/icons/ChevronRightIcon'
import ChevronLeftIcon from '../../../Common/icons/ChevronLeftIcon'
import PopoverMenu from '../../../Common/components/PopoverMenu'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import MoveResource from '../../../Common/components/MoveResource'
import MoveResourceBodyWrapper from '../../../Common/components/MoveResourceBodyWrapper'
import { MOVE, PAGE } from '../../../Common/constants/UIConstants'
import BlackCloseIcon from '../../../Common/icons/BlackCloseIcon'

import {
   horizontal,
   DROPPABLE_PAGE_CONTAINER,
   MAX_LENGTH_OF_PAGE_NAME
} from '../../constants/UIConstants'
import { MovePageRequest } from '../../stores/types'
import WorkbookChildDetailsModel from '../../stores/models/WorkbookChildDetailsModel'

import {
   FooterContainer,
   AddIconContainer,
   PageDetailsContainer,
   PageButtonContainer,
   ActivePageName,
   NormalPageName,
   pageNameTextCSS,
   pageNameTextInputCSS,
   LeftSection,
   RightSection,
   ButtonWithIcon,
   LeftScrollButton,
   DroppableContainer,
   ListMenuContainer,
   ListMenuItem,
   MovePageHeader,
   MovePageTitle,
   CloseMovePageButton
} from './styledComponents'

interface WorkbookFooterProps extends WithTranslation {
   pages: Array<{ id: string; name: string }>
   activePageId: string
   updatePageNameAPI: Function
   createPageAPI: (
      onSuccess: (pageId: string) => void,
      onFailure: () => void
   ) => void
   createPageAPIError: any
   onClickPage: (id: string) => void
   createPageAPIStatus: APIStatus
   onDragEnd: (result) => void
   isMergingCards: boolean
   movePageAPI: (
      id: string,
      request: MovePageRequest,
      onSuccess: () => void,
      onFailure: () => void
   ) => void
   movePageAPIStatus: APIStatus
   // TODO: Need to add return type
   movePageAPIError: any
   getWorkbooksAndFoldersAPI: () => void
   getWorkbooksAndFoldersStatus: APIStatus
   // TODO: Need to add return types
   getWorkbooksAndFoldersError: any
   activeFolderInfo: any
   getRootFolderDetailsAPI: (onSuccess: () => void) => void
   getRootFolderDetailsAPIStatus: APIStatus
   // TODO: Need to add return type
   getRootFolderDetailsAPIError: any
   rootFolderId: string
   getWorkbookChildDetailsAPI: (id: string) => void
   getWorkbookChildDetailsAPIStatus: APIStatus
   // TODO: Need to add return type
   getWorkbookChildDetailsAPIError: any
   workbookChildDetails: WorkbookChildDetailsModel | {}
   getWorkbookDetails: () => void
   workbookId: string
   clearMoveWorkbooksAndFolders: () => void
   getPageDetails: (pageId: string) => void
   updatePageName: (id: string, name: string) => void
   shouldDisableActions?: boolean
}

@observer
class WorkbookFooter extends Component<WorkbookFooterProps> {
   @observable currentPageName: string
   pageNameRef
   // TODO: Need to add type
   pagesContainerRef
   shouldShowScrollButtons!: boolean
   @observable isLeftScrollButtonDisabled: boolean
   @observable isRightScrollButtonDisabled: boolean
   // TODO: Need to add type
   movePageModalRef
   currentPageId: string
   @observable isPageDragging: boolean

   constructor(props) {
      super(props)
      this.pageNameRef = React.createRef<EditableTextInput>()
      this.currentPageName = ''
      this.pagesContainerRef = React.createRef<HTMLDivElement>()
      this.isLeftScrollButtonDisabled = true
      this.isRightScrollButtonDisabled = false
      this.movePageModalRef = React.createRef<BaseModalContainer>()
      this.currentPageId = ''
      this.isPageDragging = false
   }

   componentDidMount(): void {
      this.addScrollEventListener()
      this.updateScrollButtonsVisibility()
      this.updateScrollButtonsStatus()
   }

   componentWillUnmount(): void {
      const pagesContainer = this.pagesContainerRef.current
      if (pagesContainer) {
         pagesContainer.removeEventListener(
            'scroll',
            this.updateScrollButtonsStatus
         )
      }
   }

   addScrollEventListener = (): void => {
      const pagesContainer = this.pagesContainerRef.current
      if (pagesContainer) {
         pagesContainer.addEventListener(
            'scroll',
            this.updateScrollButtonsStatus
         )
      }
   }

   updateScrollButtonsStatus = (): void => {
      this.updateLeftScrollButtonStatus()
      this.updateRightScrollButtonStatus()
   }

   updateScrollButtonsVisibility = (): void => {
      const pagesContainer = this.pagesContainerRef.current
      if (pagesContainer) {
         if (
            pagesContainer.scrollWidth > pagesContainer.clientWidth &&
            !this.isPageDragging
         ) {
            this.shouldShowScrollButtons = true
         } else {
            this.shouldShowScrollButtons = false
         }
      } else {
         this.shouldShowScrollButtons = true
      }
   }

   displayErrorOnAPIFailure = (error: any): void => {
      showFailureBottomCenterToast(getAPIErrorMessage(error))
      this.pageNameRef.current.setInputTextValue(this.currentPageName)
   }

   onUpdatePageName = (value: string): void => {
      if (this.currentPageName === value) return
      if (isEmpty(value)) {
         const { t } = this.props
         showFailureBottomCenterToast(
            t(
               'workbookManagement:homeScreen.pageNameShouldNotBeEmptyErrorMessage'
            )
         )
         return
      }
      const { updatePageNameAPI, updatePageName, activePageId } = this.props
      const request = {
         page_name: value
      }
      updatePageNameAPI(
         request,
         () => {
            this.currentPageName = value
            updatePageName(activePageId, value)
         },
         this.displayErrorOnAPIFailure
      )
   }

   renderPageName = observer(
      ({ activePageId, id, name }): ReactElement => {
         if (activePageId === id) {
            this.currentPageName = name
            return (
               <EditableTextInput
                  ref={this.pageNameRef}
                  value={name}
                  textTypo={ActivePageName}
                  onUpdateText={this.onUpdatePageName}
                  textInputCss={pageNameTextInputCSS}
                  nonEditableTextContainerCSS={pageNameTextCSS}
                  maxLength={MAX_LENGTH_OF_PAGE_NAME}
                  textInputTestId='pageNameInput'
                  contentTestId='pageNameInputContent'
               />
            )
         }
         return <NormalPageName title={name}>{name}</NormalPageName>
      }
   )

   renderIcon = observer(
      ({ activePageId, id }): ReactElement => (
         <PopoverMenu
            renderPopoverTrigger={
               <ChevronDownIcon
                  fill={
                     activePageId === id ? Colors.darkBlueGrey : Colors.steel
                  }
                  width={10}
                  height={10}
               />
            }
            renderPopoverContent={this.listMenuItems(id)}
            triggerTestId='pageMoreOptionsButton'
         />
      )
   )

   getPageDetails = (pageId: string): void => {
      const { onClickPage, activePageId, isMergingCards, t } = this.props
      if (isMergingCards) {
         showFailureBottomCenterToast(
            t('workbookManagement:mergeCards.pageNavigationWarning')
         )
      } else {
         if (pageId !== activePageId) {
            onClickPage(pageId)
         }
      }
   }

   openMovePageModal = (pageId: string): void => {
      this.currentPageId = pageId
      this.movePageModalRef.current?.openModal()
   }

   closeMovePageModal = (): void => {
      this.movePageModalRef.current?.closeModal()
   }

   renderMovePageHeader = (): ReactElement => {
      const { t } = this.props
      return (
         <MovePageHeader>
            <MovePageTitle>
               {t('workbookManagement:homeScreen.movePage')}
            </MovePageTitle>
            <CloseMovePageButton
               onClick={this.closeMovePageModal}
               data-testid='pageMoveCloseButton'
            >
               <BlackCloseIcon />
            </CloseMovePageButton>
         </MovePageHeader>
      )
   }

   onFailureMovePage = (): void => {
      const { movePageAPIError } = this.props
      showFailureBottomCenterToast(getAPIErrorMessage(movePageAPIError))
   }

   getPageName = (): string => {
      const { pages } = this.props
      const page = pages.find(page => page.id === this.currentPageId)
      if (page) {
         return page.name
      }
      return ''
   }

   onSuccessMovePage = (): void => {
      const { t } = this.props
      this.closeMovePageModal()
      showSuccessBottomCenterToast(
         `${this.getPageName()} ${t('workbookManagement:homeScreen.isMoved')}`
      )
      const { getWorkbookDetails } = this.props
      getWorkbookDetails()
   }

   movePage = (workbookId: string): void => {
      const request = { workbook_id: workbookId }
      const { movePageAPI } = this.props
      movePageAPI(
         this.currentPageId,
         request,
         this.onSuccessMovePage,
         this.onFailureMovePage
      )
   }

   renderMoveListBody = observer(
      (): ReactElement => {
         const {
            movePageAPIStatus,
            getWorkbooksAndFoldersAPI,
            getWorkbooksAndFoldersStatus,
            getWorkbooksAndFoldersError,
            activeFolderInfo,
            getRootFolderDetailsAPI,
            getRootFolderDetailsAPIStatus,
            getRootFolderDetailsAPIError,
            rootFolderId,
            getWorkbookChildDetailsAPI,
            getWorkbookChildDetailsAPIStatus,
            getWorkbookChildDetailsAPIError,
            workbookChildDetails,
            workbookId,
            clearMoveWorkbooksAndFolders
         } = this.props
         return (
            <MoveResourceBodyWrapper
               onCancel={this.closeMovePageModal}
               actionType={MOVE}
               resourceType={PAGE}
               onMoveFolderResourceAPI={this.movePage}
               onMoveFolderResourceAPIStatus={movePageAPIStatus}
               getFolderDetailsAPI={getWorkbooksAndFoldersAPI}
               getFolderDetailsAPIStatus={getWorkbooksAndFoldersStatus}
               getFolderDetailsAPIError={getWorkbooksAndFoldersError}
               folderData={activeFolderInfo}
               rootFolderId={rootFolderId}
               getRootFolderDetailsAPI={getRootFolderDetailsAPI}
               getRootFolderDetailsAPIStatus={getRootFolderDetailsAPIStatus}
               getRootFolderDetailsAPIError={getRootFolderDetailsAPIError}
               getWorkbookDetailsAPI={getWorkbookChildDetailsAPI}
               getWorkbookDetailsAPIStatus={getWorkbookChildDetailsAPIStatus}
               getWorkbookDetailsAPIError={getWorkbookChildDetailsAPIError}
               workbookData={workbookChildDetails}
               disabledWorkbookId={workbookId}
               clearMoveWorkbooksAndFolders={clearMoveWorkbooksAndFolders}
            />
         )
      }
   )

   listMenuItems = (pageId: string): ReactNode => {
      const { t } = this.props
      return (
         <ListMenuContainer>
            <ListMenuItem
               as='div'
               onClick={(): void => this.openMovePageModal(pageId)}
               data-testid='movePageButton'
            >
               {t('workbookManagement:homeScreen.moveMenuItemText')}
            </ListMenuItem>
         </ListMenuContainer>
      )
   }

   // TODO: Need to improve styling - borderRadius
   renderPageButtons = observer((): any => {
      const {
         pages,
         activePageId,
         shouldDisableActions,
         createPageAPIStatus
      } = this.props
      const { renderPageName: RenderPageName, renderIcon: RenderIcon } = this
      return pages.map((page, index) => {
         const { id, name } = page
         return (
            <Draggable
               draggableId={id}
               key={id}
               index={index}
               isDragDisabled={shouldDisableActions}
            >
               {(provided: DraggableProvided): ReactElement => (
                  <PageButtonContainer
                     isActive={id === activePageId}
                     onClick={(): void => this.getPageDetails(id)}
                     {...provided.dragHandleProps}
                     {...provided.draggableProps}
                     ref={provided.innerRef}
                     data-testid='pageButton'
                     isDisabled={
                        isAPIFetching(createPageAPIStatus) ||
                        shouldDisableActions
                     }
                  >
                     <RenderPageName
                        activePageId={activePageId}
                        id={id}
                        name={name}
                     />
                     <RenderIcon activePageId={activePageId} id={id} />
                  </PageButtonContainer>
               )}
            </Draggable>
         )
      })
   })

   updateLeftScrollButtonStatus = (): void => {
      if (this.canScrollLeft) {
         this.isLeftScrollButtonDisabled = false
      } else {
         this.isLeftScrollButtonDisabled = true
      }
   }

   get canScrollLeft(): boolean {
      const pagesContainer = this.pagesContainerRef.current
      if (pagesContainer) {
         return pagesContainer.scrollLeft > 0
      }
      return false
   }

   scrollLeft = (): void => {
      const pagesContainer = this.pagesContainerRef.current
      if (this.canScrollLeft) {
         pagesContainer.scrollLeft -= Number(pagesContainer.scrollWidth / 4)
      }
      this.updateScrollButtonsStatus()
   }

   updateRightScrollButtonStatus = (): void => {
      if (this.canScrollRight) {
         this.isRightScrollButtonDisabled = false
      } else {
         this.isRightScrollButtonDisabled = true
      }
   }

   get canScrollRight(): boolean {
      const pagesContainer = this.pagesContainerRef.current
      if (pagesContainer) {
         return (
            pagesContainer.scrollLeft <
            pagesContainer.scrollWidth - pagesContainer.offsetWidth
         )
      }
      return false
   }

   scrollRight = (): void => {
      const pagesContainer = this.pagesContainerRef.current
      if (this.canScrollRight) {
         pagesContainer.scrollLeft += Number(pagesContainer.scrollWidth / 4)
      }
      this.updateScrollButtonsStatus()
   }

   renderRightSection = (): ReactNode =>
      this.shouldShowScrollButtons ? (
         <RightSection>
            <LeftScrollButton
               onClick={this.scrollLeft}
               disabled={this.isLeftScrollButtonDisabled}
               isDisabled={this.isLeftScrollButtonDisabled}
               data-testid='pagesLeftScrollButton'
            >
               {this.isLeftScrollButtonDisabled ? (
                  <ChevronLeftIcon
                     width={10}
                     height={10}
                     fill={Colors.coolGrey}
                  />
               ) : (
                  <ChevronLeftIcon width={10} height={10} />
               )}
            </LeftScrollButton>
            <ButtonWithIcon
               onClick={this.scrollRight}
               disabled={this.isRightScrollButtonDisabled}
               isDisabled={this.isRightScrollButtonDisabled}
               data-testid='pagesRightScrollButton'
            >
               {this.isRightScrollButtonDisabled ? (
                  <ChevronRightIcon
                     width={10}
                     height={10}
                     fill={Colors.coolGrey}
                  />
               ) : (
                  <ChevronRightIcon width={10} height={10} />
               )}
            </ButtonWithIcon>
         </RightSection>
      ) : null

   // TODO: Need to add return type
   onSuccessCreatePage = async (pageId: string) => {
      const { getPageDetails } = this.props
      await getPageDetails(pageId)
      this.scrollToEnd()
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

   scrollToEnd = (): void => {
      const pagesContainer = this.pagesContainerRef.current
      if (pagesContainer) {
         pagesContainer.scrollLeft = pagesContainer.scrollWidth
      }
   }

   updatePageDraggingStatus = (): void => {
      this.isPageDragging = true
   }

   // TODO: Need to add return type
   onDragEnd = async (result: DropResult) => {
      const { onDragEnd } = this.props
      await onDragEnd(result)
      this.isPageDragging = false
   }

   isUserActionsEnabled = (): boolean => {
      const { shouldDisableActions } = this.props
      return !shouldDisableActions
   }

   renderAddPageButton = observer(() => {
      const { createPageAPIStatus } = this.props
      return this.isUserActionsEnabled() ? (
         <AddIconContainer>
            <ButtonWithIcon
               onClick={this.createNewPage}
               disabled={isAPIFetching(createPageAPIStatus)}
               isDisabled={isAPIFetching(createPageAPIStatus)}
               data-testid='addPageButton'
            >
               <PlusIcon />
            </ButtonWithIcon>
         </AddIconContainer>
      ) : null
   })

   render(): ReactNode {
      const {
         renderAddPageButton: RenderAddPageButton,
         renderPageButtons: RenderPageButtons
      } = this
      this.updateScrollButtonsVisibility()
      return (
         <FooterContainer>
            <LeftSection>
               {<RenderAddPageButton />}
               <DragDropContext
                  onDragEnd={this.onDragEnd}
                  onDragStart={this.updatePageDraggingStatus}
               >
                  <Droppable
                     droppableId={DROPPABLE_PAGE_CONTAINER}
                     type={DROPPABLE_PAGE_CONTAINER}
                     direction={horizontal}
                  >
                     {(provided: DroppableProvided): ReactElement => (
                        <DroppableContainer ref={this.pagesContainerRef}>
                           <PageDetailsContainer
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              data-testid='pagesDroppable'
                           >
                              <RenderPageButtons />
                              {provided.placeholder}
                           </PageDetailsContainer>
                        </DroppableContainer>
                     )}
                  </Droppable>
               </DragDropContext>
            </LeftSection>
            {this.renderRightSection()}
            <MoveResource
               innerRef={this.movePageModalRef}
               renderHeader={this.renderMovePageHeader}
               renderBody={this.renderMoveListBody}
               onCancel={this.closeMovePageModal}
               type='Page'
            />
         </FooterContainer>
      )
   }
}

export default withTranslation()(WorkbookFooter)
