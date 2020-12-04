import React, { Component, ReactNode, ReactElement } from 'react'
import { observer } from 'mobx-react'
import { observable, computed } from 'mobx'

import { APIStatus, API_FETCHING, API_SUCCESS } from '@ib/api-constants'

import WorkbookChildDetailsModel from '../../../WorkbookManagement/stores/models/WorkbookChildDetailsModel'

import WorkbookIcon from '../../icons/WorkbookIcon'
import ArrowLeftIcon from '../../icons/ArrowLeftIcon'
import {
   LEFT_MERGE_BUTTON,
   RIGHT_MERGE_BUTTON,
   CARD,
   LIST,
   SECTION,
   PAGE
} from '../../constants/UIConstants'

import SelectField from '../SelectField'
import Button from '../Button'

import {
   Container,
   BackButton,
   Header,
   TitleAndIconContainer,
   TitleText,
   DropDownsContainer,
   DropDownAndLabelContainer,
   DropDownLabel,
   SelectFieldCSS,
   DropDownContainer,
   Footer,
   LeftSideButton,
   LeftButtonText,
   RightSideButton,
   RightButtonText,
   HeaderAndBody,
   ErrorSelectedFieldCSS
} from './styledComponents'

interface MoveWorkbookChildProps {
   workbookId: string
   workbookTitle: string
   workbookChildDetails: WorkbookChildDetailsModel
   isMergingCards: boolean
   onClickMergeButton?: (clickedMergeButton: string, sectionId: string) => void
   mergeButtonStatus?: APIStatus
   onClickCancelButton?: () => void
   onClickMoveHereButton?: (id: string) => void
   moveHereButtonStatus?: APIStatus
   onClickBackButton: () => void
   moveSourceType?: string
}

interface DropDownObjectType {
   value: string
   label: string
}

@observer
class MoveWorkbookChild extends Component<MoveWorkbookChildProps> {
   @observable selectedPage: string | DropDownObjectType
   @observable isSelectedPageEmpty: boolean
   @observable selectedList: string | DropDownObjectType
   @observable isSelectedListEmpty: boolean
   @observable selectedSection: string | DropDownObjectType
   @observable isSelectedSectionEmpty: boolean
   @observable clickedMergeButton: string
   // TODO: Need to update types
   @observable pages: Array<DropDownObjectType>
   @observable currentPageLists: Array<DropDownObjectType>
   @observable currentListSections: Array<DropDownObjectType>

   static defaultProps = {
      mergeButtonStatus: 200,
      moveHereButtonStatus: 200,
      moveSourceType: CARD
   }

   constructor(props) {
      super(props)
      this.selectedPage = ''
      this.selectedList = ''
      this.selectedSection = ''
      this.clickedMergeButton = ''
      this.pages = []
      this.currentPageLists = []
      this.currentListSections = []
      this.isSelectedPageEmpty = false
      this.isSelectedListEmpty = false
      this.isSelectedSectionEmpty = false
   }

   componentDidMount(): void {
      const { workbookChildDetails } = this.props
      if (workbookChildDetails.id) {
         const { pages } = workbookChildDetails
         this.pages = pages.map(page => {
            const { id: value, name: label } = page
            return { value, label }
         })
      }
   }

   onClickMergeButton = (clickedMergeButton: string): void => {
      const { onClickMergeButton } = this.props
      const { value: selectedSectionId } = this
         .selectedSection as DropDownObjectType
      if (this.isPageSelected) {
         if (this.isListSelected) {
            if (this.isSectionSelected) {
               if (onClickMergeButton) {
                  if (clickedMergeButton === LEFT_MERGE_BUTTON) {
                     this.clickedMergeButton = LEFT_MERGE_BUTTON
                     onClickMergeButton(LEFT_MERGE_BUTTON, selectedSectionId)
                  } else if (clickedMergeButton === RIGHT_MERGE_BUTTON) {
                     this.clickedMergeButton = RIGHT_MERGE_BUTTON
                     onClickMergeButton(RIGHT_MERGE_BUTTON, selectedSectionId)
                  } else {
                     this.clickedMergeButton = ''
                  }
               }
            } else {
               this.isSelectedSectionEmpty = true
            }
         } else {
            this.isSelectedListEmpty = true
            this.isSelectedSectionEmpty = true
         }
      } else {
         this.isSelectedPageEmpty = true
         this.isSelectedListEmpty = true
         this.isSelectedSectionEmpty = true
      }
   }

   @computed
   get isPageSelected(): boolean {
      return this.selectedPage !== ''
   }

   @computed
   get isListSelected(): boolean {
      return this.selectedList !== ''
   }

   @computed
   get isSectionSelected(): boolean {
      return this.selectedSection !== ''
   }

   onClickMoveHereButton = (): void => {
      const { moveSourceType, onClickMoveHereButton } = this.props
      const { value: selectedSectionId } = this
         .selectedSection as DropDownObjectType
      const { value: selectedListId } = this.selectedList as DropDownObjectType
      const { value: selectedPageId } = this.selectedPage as DropDownObjectType
      if (onClickMoveHereButton) {
         switch (moveSourceType) {
            case CARD:
               if (this.isPageSelected) {
                  if (this.isListSelected) {
                     if (this.isSectionSelected) {
                        if (selectedSectionId) {
                           onClickMoveHereButton(selectedSectionId)
                        }
                     } else {
                        this.isSelectedSectionEmpty = true
                     }
                  } else {
                     this.isSelectedSectionEmpty = true
                     this.isSelectedListEmpty = true
                  }
               } else {
                  this.isSelectedSectionEmpty = true
                  this.isSelectedListEmpty = true
                  this.isSelectedPageEmpty = true
               }

               break
            case SECTION:
               if (this.isPageSelected) {
                  if (this.isListSelected) {
                     if (selectedListId) {
                        onClickMoveHereButton(selectedListId)
                     }
                  } else {
                     this.isSelectedListEmpty = true
                  }
               } else {
                  this.isSelectedListEmpty = true
                  this.isSelectedPageEmpty = true
               }
               break
            case LIST:
               if (this.isPageSelected) {
                  if (selectedPageId) {
                     onClickMoveHereButton(selectedPageId)
                  }
               } else {
                  this.isSelectedPageEmpty = true
               }
               break
            default:
               break
         }
         if (moveSourceType === PAGE) {
            const { workbookId } = this.props
            onClickMoveHereButton(workbookId)
         }
      }
   }

   onChangePage = (updatedPage: DropDownObjectType): void => {
      const { value: id } = updatedPage
      const { value: currentPageId } = this.selectedPage as DropDownObjectType
      if (currentPageId !== id) {
         this.selectedPage = updatedPage
         const {
            workbookChildDetails: { pages }
         } = this.props
         const currentPage = pages.find(page => page.id === id)
         if (currentPage) {
            const { lists } = currentPage
            this.currentPageLists = lists.map(list => {
               const { id: value, name: label } = list
               return { value, label }
            })
         }
         this.selectedList = ''
         this.selectedSection = ''
      }
      this.isSelectedSectionEmpty = false
      this.isSelectedListEmpty = false
      this.isSelectedPageEmpty = false
   }

   onChangeList = (updatedList: DropDownObjectType): void => {
      const { value: id } = updatedList
      const { value: currentListId } = this.selectedList as DropDownObjectType
      const { value: currentPageId } = this.selectedPage as DropDownObjectType
      if (currentListId !== id) {
         this.selectedList = updatedList
         const {
            workbookChildDetails: { pages }
         } = this.props
         const currentPage = pages.find(page => page.id === currentPageId)
         if (currentPage) {
            const { lists } = currentPage
            const currentList = lists.find(list => list.id === id)
            if (currentList) {
               const { sections } = currentList
               this.currentListSections = sections.map(section => {
                  const { id: value, name: label } = section
                  return { value, label }
               })
            }
            this.selectedSection = ''
         }
      }
      this.isSelectedSectionEmpty = false
      this.isSelectedListEmpty = false
   }

   onChangeSection = (updatedSection: DropDownObjectType): void => {
      this.selectedSection = updatedSection
      this.isSelectedSectionEmpty = false
   }

   renderButtons = observer(
      (): ReactElement => {
         const {
            isMergingCards,
            mergeButtonStatus,
            onClickCancelButton,
            moveHereButtonStatus
         } = this.props
         const leftMergeButtonStatus =
            this.clickedMergeButton === LEFT_MERGE_BUTTON
               ? mergeButtonStatus
               : API_SUCCESS
         const rightMergeButtonStatus =
            this.clickedMergeButton === RIGHT_MERGE_BUTTON
               ? mergeButtonStatus
               : API_SUCCESS
         return isMergingCards ? (
            <>
               <LeftSideButton
                  variant={Button.variants.secondary}
                  size={Button.sizes.large}
                  onClick={(): void =>
                     this.onClickMergeButton(LEFT_MERGE_BUTTON)
                  }
                  isDisabled={leftMergeButtonStatus === API_FETCHING}
                  isLoading={leftMergeButtonStatus === API_FETCHING}
                  id='mergeAndDeleteButton'
               >
                  <LeftButtonText>Merge & Delete</LeftButtonText>
               </LeftSideButton>
               <RightSideButton
                  variant={Button.variants.primary}
                  size={Button.sizes.large}
                  onClick={(): void =>
                     this.onClickMergeButton(RIGHT_MERGE_BUTTON)
                  }
                  isDisabled={rightMergeButtonStatus === API_FETCHING}
                  isLoading={rightMergeButtonStatus === API_FETCHING}
                  id='mergeAndCreateNewButton'
               >
                  <RightButtonText>Merge & Create New</RightButtonText>
               </RightSideButton>
            </>
         ) : (
            <>
               <LeftSideButton
                  variant={Button.variants.secondary}
                  size={Button.sizes.large}
                  onClick={onClickCancelButton}
                  isDisabled={moveHereButtonStatus === API_FETCHING}
                  data-testid={'moveWorkbookChildCancelButton'}
               >
                  <LeftButtonText>Cancel</LeftButtonText>
               </LeftSideButton>
               <RightSideButton
                  variant={Button.variants.primary}
                  size={Button.sizes.large}
                  onClick={this.onClickMoveHereButton}
                  isLoading={moveHereButtonStatus === API_FETCHING}
                  isDisabled={moveHereButtonStatus === API_FETCHING}
                  data-testid={'moveWorkbookChildSubmitButton'}
               >
                  <RightButtonText>Move Here</RightButtonText>
               </RightSideButton>
            </>
         )
      }
   )

   renderPagesDropDown = observer(() => {
      const { moveSourceType } = this.props
      return moveSourceType === LIST ||
         moveSourceType === SECTION ||
         moveSourceType === CARD ? (
         <DropDownAndLabelContainer>
            <DropDownLabel>Select Page</DropDownLabel>
            <DropDownContainer>
               <SelectField
                  selectFieldCSS={
                     this.isSelectedPageEmpty
                        ? ErrorSelectedFieldCSS
                        : SelectFieldCSS
                  }
                  onChange={this.onChangePage}
                  options={this.pages}
                  value={this.selectedPage}
                  data-testid={'workbookPagesDropdown'}
                  isSearchable={false}
               />
            </DropDownContainer>
         </DropDownAndLabelContainer>
      ) : null
   })

   renderListsDropDown = observer(() => {
      const { moveSourceType } = this.props
      return moveSourceType === SECTION || moveSourceType === CARD ? (
         <DropDownAndLabelContainer>
            <DropDownLabel>Select List</DropDownLabel>
            <DropDownContainer>
               <SelectField
                  selectFieldCSS={
                     this.isSelectedListEmpty
                        ? ErrorSelectedFieldCSS
                        : SelectFieldCSS
                  }
                  onChange={this.onChangeList}
                  options={this.currentPageLists}
                  value={this.selectedList}
                  data-testid={'workbookListsDropdown'}
                  isSearchable={false}
               />
            </DropDownContainer>
         </DropDownAndLabelContainer>
      ) : null
   })

   renderSectionsDropDown = observer(() => {
      const { moveSourceType } = this.props
      return moveSourceType === CARD ? (
         <DropDownAndLabelContainer>
            <DropDownLabel>Select Section</DropDownLabel>
            <DropDownContainer>
               <SelectField
                  selectFieldCSS={
                     this.isSelectedSectionEmpty
                        ? ErrorSelectedFieldCSS
                        : SelectFieldCSS
                  }
                  onChange={this.onChangeSection}
                  options={this.currentListSections}
                  value={this.selectedSection}
                  data-testid={'workbookSectionsDropdown'}
                  isSearchable={false}
               />
            </DropDownContainer>
         </DropDownAndLabelContainer>
      ) : null
   })

   render(): ReactNode {
      const { workbookTitle, onClickBackButton } = this.props
      const {
         renderButtons: RenderButtons,
         renderPagesDropDown: RenderPagesDropDown,
         renderListsDropDown: RenderListsDropDown,
         renderSectionsDropDown: RenderSectionsDropDown
      } = this
      return (
         <Container>
            <HeaderAndBody>
               <Header>
                  <BackButton
                     onClick={onClickBackButton}
                     data-testid='moveBackButton'
                  >
                     <ArrowLeftIcon />
                  </BackButton>
                  <TitleAndIconContainer>
                     <WorkbookIcon />
                     <TitleText>{workbookTitle}</TitleText>
                  </TitleAndIconContainer>
               </Header>
               <DropDownsContainer>
                  <RenderPagesDropDown />
                  <RenderListsDropDown />
                  <RenderSectionsDropDown />
               </DropDownsContainer>
            </HeaderAndBody>
            <Footer>
               <RenderButtons />
            </Footer>
         </Container>
      )
   }
}

export default MoveWorkbookChild
