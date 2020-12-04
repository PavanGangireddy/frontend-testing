import React, { Component, ReactNode, ReactElement } from 'react'
import { observable, action, flow } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { History } from 'history'

import { APIStatus } from '@ib/api-constants'

import { getAPIErrorMessage } from '../../../Common/utils/APIUtils'
import ReactSelectDropDownArrow from '../../../Common/icons/ReactSelectDropDownArrow'
import Colors from '../../../Common/themes/Colors'
import EditableTextArea from '../../../Common/components/EditableTextArea'
import {
   Typo20DarkBlueGreyHKGroteskMedium,
   Typo14SteelHKGroteskRegular,
   Typo20DarkBlueGreyHKGroteskRegular
} from '../../../Common/styleGuide/Typos'
import { showFailureBottomCenterToast } from '../../../Common/utils/ToastUtils'
import ClipboardListIcon from '../../../Common/icons/ClipboardListIcon'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import MobileNavBar from '../../../Common/components/MobileNavBar'
import ArrowLeftIcon from '../../../Common/icons/ArrowLeftIcon'
import { goToPreviousPage } from '../../../Common/utils/NavigationUtils'
import MoreIcon from '../../../Common/icons/MoreIcon'
import ChevronDown from '../../../Common/icons/ChevronDown'
import { isEmpty } from '../../../Common/utils/ValidationUtils'
import ChromeBannerUIStore from '../../../Common/stores/ChromeBannerUIStore'

import {
   MAX_LENGTH_OF_PAGE_OBJECTIVE,
   PAGE_DESCRIPTION_PLACEHOLDER,
   PAGE_OBJECTIVE_PLACEHOLDER
} from '../../constants/UIConstants'

import PageObjectiveAndDescriptionModal from '../PageObjectiveAndDescriptionModal'
import PageObjectiveEdit from '../PageObjectiveEdit'
import PageDescriptionEdit from '../PageDescriptionEdit'
import MobilePageActions from '../MobilePageActions'

import {
   PageHeaderContainer,
   ToggleButtonContainer,
   headingTextAreaCss,
   descriptionTextAreaCss,
   PageDescriptionContainer,
   PageDescriptionCss,
   DropDownContainer,
   PageTitleAndDescription,
   ClipboardIconContainer,
   SubContainer,
   ButtonContainer,
   NavBarLeftSection,
   PageObjectiveContainer,
   ObjectiveText,
   NavBarRightSection,
   MoreIconContainer,
   PageObjectiveIconContainer,
   RotateOneEighty,
   AssignmentActionsWrapper,
   DecrementTimeWrapper,
   TimeLeftTitle,
   ProgressBar,
   StatusContainer,
   DecrementTimerComponent,
   MobileProgressBar
} from './styledComponents'

// FIXME: Need to fix i18next
interface WithTranslationProps {
   t: any
   i18n: any
   tReady: any
}

interface PageHeaderProps extends WithTranslationProps {
   pageObjective: string
   pageDescription: string
   updatePageObjectiveWithDescriptionAPI: Function
   isMergeActive: boolean
   isCreator?: boolean
   isAssignmentWorkbook?: boolean
   isSubmitted?: boolean
   shouldDisableActions?: boolean
   pageId: string
   submitAssignmentAPI: (
      pageId: string,
      onSuccess: () => void,
      onFailure: () => void
   ) => void
   submitAssignmentAPIStatus: APIStatus
   updatePageObjectiveWithDescriptionAPIStatus: APIStatus
   history: History
   name: string
   assignmentWorkbookButton: () => JSX.Element
   leftTime?: number
   totalTimeInSeconds?: number
   isAssignmentCompleted: boolean
   submitAssignment: () => void
}
interface InjectedProps extends PageHeaderProps {
   chromeBannerUIStore: ChromeBannerUIStore
}

@inject('chromeBannerUIStore')
@observer
class PageHeader extends Component<PageHeaderProps> {
   @observable isCollapsed: boolean
   @observable isToggleButtonHovered: boolean
   @observable currentObjective = ''
   @observable currentDescription = ''
   pageObjectiveRef
   pageDescriptionRef
   pageObjectiveAndDescriptionRef
   @observable isEditPageObjectiveVisible: boolean
   @observable isEditPageDescriptionVisible: boolean
   @observable isPageObjectiveAndDescriptionModalOpened: boolean
   @observable objective: string
   isObjectiveUpdated: boolean
   @observable description: string
   isDescriptionUpdated: boolean
   @observable isPageActionsVisible: boolean
   @observable remainingSeconds: number

   constructor(props) {
      super(props)
      this.isCollapsed = false
      this.isToggleButtonHovered = false
      this.pageDescriptionRef = React.createRef<EditableTextArea>()
      this.pageObjectiveRef = React.createRef<EditableTextArea>()
      this.pageObjectiveAndDescriptionRef = React.createRef<
         BaseModalContainer
      >()
      this.isEditPageObjectiveVisible = false
      this.isEditPageDescriptionVisible = false
      this.isPageObjectiveAndDescriptionModalOpened = false
      this.objective = props.pageObjective
      this.isObjectiveUpdated = false
      this.description = props.pageDescription
      this.isDescriptionUpdated = false
      this.isPageActionsVisible = false
      this.remainingSeconds = props.leftTime
   }

   @action
   togglePageHeaderView = (): void => {
      this.isCollapsed = !this.isCollapsed
      this.isToggleButtonHovered = !this.isToggleButtonHovered
   }

   displayErrorOnAPIFailure = (error: any): void => {
      this.pageObjectiveRef.current.setInputText(this.currentObjective)
      this.pageDescriptionRef.current.setInputText(this.currentDescription)
      showFailureBottomCenterToast(getAPIErrorMessage(error))
   }

   onUpdatePageDescription = (updatedPageDescription: string): void => {
      const { updatePageObjectiveWithDescriptionAPI } = this.props
      const request = {
         page_objective: this.pageObjectiveRef.current.getInputTextValue(),
         description: updatedPageDescription.trim()
      }
      updatePageObjectiveWithDescriptionAPI(
         request,
         () => {},
         this.displayErrorOnAPIFailure
      )
   }

   onUpdatePageObjective = (updatedPageObjective: string): void => {
      const { updatePageObjectiveWithDescriptionAPI } = this.props
      const request = {
         page_objective: updatedPageObjective,
         description: this.pageDescriptionRef.current.getInputTextValue()
      }
      updatePageObjectiveWithDescriptionAPI(
         request,
         () => {},
         this.displayErrorOnAPIFailure
      )
   }

   @action.bound
   setCurrentPageObjectiveAndDescription = () => {
      const { pageObjective, pageDescription } = this.props
      this.currentObjective = pageObjective
      this.currentDescription = pageDescription
   }

   renderClipboardListIcon = (): ReactNode => {
      const { isCreator, isAssignmentWorkbook } = this.props
      return isCreator || isAssignmentWorkbook ? (
         <ClipboardIconContainer>
            <ClipboardListIcon />
         </ClipboardIconContainer>
      ) : null
   }

   renderContent = observer(() => {
      const {
         pageObjective,
         pageDescription,
         shouldDisableActions,
         isMergeActive
      } = this.props
      this.setCurrentPageObjectiveAndDescription()
      return !this.isCollapsed ? (
         <PageTitleAndDescription
            data-testid='pageTitleAndDescription'
            shouldDisablePointerEvents={shouldDisableActions || isMergeActive}
         >
            <EditableTextArea
               ref={this.pageObjectiveRef}
               value={pageObjective}
               textTypo={Typo20DarkBlueGreyHKGroteskMedium}
               onUpdateText={this.onUpdatePageObjective}
               textAreaCss={headingTextAreaCss}
               containerStyles={PageDescriptionCss}
               placeholderText={PAGE_OBJECTIVE_PLACEHOLDER}
               placeHolderTextTypo={Typo20DarkBlueGreyHKGroteskRegular}
               textAreaTestId='pageTitleTextArea'
               contentTestId='pageTitleContent'
               maxLength={MAX_LENGTH_OF_PAGE_OBJECTIVE}
            />
            <PageDescriptionContainer>
               <EditableTextArea
                  ref={this.pageDescriptionRef}
                  value={pageDescription}
                  textTypo={Typo14SteelHKGroteskRegular}
                  onUpdateText={this.onUpdatePageDescription}
                  textAreaCss={descriptionTextAreaCss}
                  containerStyles={PageDescriptionCss}
                  placeholderText={PAGE_DESCRIPTION_PLACEHOLDER}
                  textAreaTestId='pageDescriptionTextArea'
                  contentTestId='pageDescriptionContent'
                  hasShiftEnter={true}
               />
            </PageDescriptionContainer>
         </PageTitleAndDescription>
      ) : null
   })

   @action
   onMouseEnter = (): void => {
      this.isToggleButtonHovered = true
   }

   @action
   onMouseLeave = (): void => {
      this.isToggleButtonHovered = false
   }

   // TODO: Need to update icons and hover Styling
   renderToggleIcon = (): ReactNode => (
      <DropDownContainer isCollapsed={this.isCollapsed}>
         <ReactSelectDropDownArrow
            width={10}
            height={10}
            fill={this.isCollapsed ? Colors.white : Colors.black}
         />
      </DropDownContainer>
   )

   renderToggleButton = (): ReactNode => {
      const { isCreator, isAssignmentWorkbook } = this.props
      return !isCreator && !isAssignmentWorkbook ? (
         <ToggleButtonContainer
            isCollapsed={this.isCollapsed}
            onClick={this.togglePageHeaderView}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            data-testid='pageTitleAndDescriptionToggleButton'
         >
            {this.renderToggleIcon()}
         </ToggleButtonContainer>
      ) : null
   }

   savePageObjective = (pageObjective: string): void => {
      const {
         updatePageObjectiveWithDescriptionAPI,
         pageDescription
      } = this.props
      const request = {
         page_objective: pageObjective,
         description: pageDescription
      }
      updatePageObjectiveWithDescriptionAPI(
         request,
         () => {
            this.closeEditPageObjectiveDrawer()
         },
         this.displayErrorOnAPIFailure
      )
   }

   savePageDescription = (pageDescription: string): void => {
      const {
         updatePageObjectiveWithDescriptionAPI,
         pageObjective
      } = this.props
      const request = {
         page_objective: pageObjective,
         description: pageDescription
      }
      updatePageObjectiveWithDescriptionAPI(
         request,
         () => {
            this.closeEditPageDescriptionDrawer()
         },
         this.displayErrorOnAPIFailure
      )
   }

   openPageObjectAndDescriptionModal = (): void => {
      if (this.pageObjectiveAndDescriptionRef) {
         this.isPageObjectiveAndDescriptionModalOpened = true
         this.pageObjectiveAndDescriptionRef.current?.openModal()
      }
   }

   closePageObjectAndDescriptionModal = (): void => {
      if (this.pageObjectiveAndDescriptionRef) {
         this.isPageObjectiveAndDescriptionModalOpened = false
         this.pageObjectiveAndDescriptionRef.current?.closeModal()
      }
   }

   onClosePageObjectAndDescriptionModal = (): void => {
      this.isPageObjectiveAndDescriptionModalOpened = false
   }

   openEditPageObjectiveDrawer = (): void => {
      this.isPageActionsVisible = false
      this.isObjectiveUpdated = false
      this.closePageObjectAndDescriptionModal()
      this.isEditPageObjectiveVisible = true
   }

   closeEditPageObjectiveDrawer = (): void => {
      const { pageObjective } = this.props
      if (!this.isObjectiveUpdated) {
         this.objective = pageObjective
      }
      this.isEditPageObjectiveVisible = false
   }

   openEditPageDescriptionDrawer = (): void => {
      this.isPageActionsVisible = false
      this.isDescriptionUpdated = false
      this.closePageObjectAndDescriptionModal()
      this.isEditPageDescriptionVisible = true
   }

   closeEditPageDescriptionDrawer = (): void => {
      const { pageDescription } = this.props
      if (!this.isDescriptionUpdated) {
         this.description = pageDescription
      }
      this.isEditPageDescriptionVisible = false
   }

   goToPreviousPage = (): void => {
      const { history } = this.props
      // TODO: need to update this util
      goToPreviousPage(history)
   }

   renderNavBarLeftSection = (): ReactNode => (
      <NavBarLeftSection onClick={this.goToPreviousPage}>
         <ArrowLeftIcon width={24} height={24} fill={Colors.white} />
      </NavBarLeftSection>
   )

   renderDownOrUpArrowIcon = observer(
      (): ReactElement =>
         this.isPageObjectiveAndDescriptionModalOpened ? (
            <RotateOneEighty>
               <ChevronDown fill={Colors.white} width={16} height={16} />
            </RotateOneEighty>
         ) : (
            <ChevronDown fill={Colors.white} width={16} height={16} />
         )
   )

   renderNavBarBody = (): ReactElement => {
      const { pageObjective } = this.props
      const {
         renderDownOrUpArrowIcon: RenderDownOrUpArrowIcon,
         isTimerVisible
      } = this
      const isPageObjectiveEmpty = isEmpty(pageObjective)
      return (
         <PageObjectiveContainer
            onClick={this.openPageObjectAndDescriptionModal}
         >
            <ObjectiveText isEmpty={isPageObjectiveEmpty}>
               {isPageObjectiveEmpty
                  ? PAGE_OBJECTIVE_PLACEHOLDER
                  : pageObjective}
            </ObjectiveText>
            <PageObjectiveIconContainer>
               <RenderDownOrUpArrowIcon />
            </PageObjectiveIconContainer>
         </PageObjectiveContainer>
      )
   }

   renderNavBarRightSection = (): ReactNode => {
      const { isAssignmentWorkbook } = this.props
      return (
         <>
            {this.isTimerVisible() ? (
               this.renderTimer()
            ) : isAssignmentWorkbook ? null : (
               <NavBarRightSection>
                  <MoreIconContainer onClick={this.openPageActionsDrawer}>
                     <MoreIcon
                        width={16}
                        height={16}
                        fillColor={Colors.white}
                     />
                  </MoreIconContainer>
               </NavBarRightSection>
            )}
         </>
      )
   }

   onChangePageObjective = (event): void => {
      this.objective = event.target.value
   }

   onChangePageDescription = (event): void => {
      this.description = event.target.value
   }

   openPageActionsDrawer = (): void => {
      this.isPageActionsVisible = true
   }

   closePageActionsDrawer = (): void => {
      this.isPageActionsVisible = false
   }

   renderPageActions = observer(() => {
      const { name, shouldDisableActions } = this.props
      return this.isPageActionsVisible ? (
         <MobilePageActions
            isVisible={this.isPageActionsVisible}
            closeDrawer={this.closePageActionsDrawer}
            name={name}
            onClickEditPageDescriptionButton={
               this.openEditPageDescriptionDrawer
            }
            onClickEditPageObjectiveButton={this.openEditPageObjectiveDrawer}
            shouldDisableActions={shouldDisableActions}
         />
      ) : null
   })

   renderPageObjectiveEditComponent = observer(() => {
      const { updatePageObjectiveWithDescriptionAPIStatus } = this.props
      return (
         <PageObjectiveEdit
            isVisible={this.isEditPageObjectiveVisible}
            closeDrawer={this.closeEditPageObjectiveDrawer}
            pageObjective={this.objective}
            updatePageObjectiveStatus={
               updatePageObjectiveWithDescriptionAPIStatus
            }
            onClickSaveButton={this.savePageObjective}
            onChangePageObjective={this.onChangePageObjective}
         />
      )
   })

   renderPageDescriptionEditComponent = observer(() => {
      const { updatePageObjectiveWithDescriptionAPIStatus } = this.props
      return (
         <PageDescriptionEdit
            isVisible={this.isEditPageDescriptionVisible}
            closeDrawer={this.closeEditPageDescriptionDrawer}
            pageDescription={this.description}
            updatePageDescriptionStatus={
               updatePageObjectiveWithDescriptionAPIStatus
            }
            onClickSaveButton={this.savePageDescription}
            onChangePageDescription={this.onChangePageDescription}
         />
      )
   })

   updateTimerValue = () => {
      this.remainingSeconds -= 1
   }

   renderTimer = () => {
      const {
         props: { leftTime, t, submitAssignment }
      } = this
      return (
         <DecrementTimeWrapper>
            <TimeLeftTitle progress={this.getProgressPercentage()}>
               {t('workbookManagement:publishWorkbook.timeLeft')}
            </TimeLeftTitle>
            <DecrementTimerComponent
               onComplete={submitAssignment}
               onTimeUpdate={this.updateTimerValue}
               timeInSeconds={leftTime ? leftTime : 0}
               progress={this.getProgressPercentage()}
            />
         </DecrementTimeWrapper>
      )
   }

   getProgressPercentage = (): number => {
      const {
         remainingSeconds,
         props: { totalTimeInSeconds }
      } = this
      if (totalTimeInSeconds)
         return (remainingSeconds / totalTimeInSeconds) * 100
      return 0
   }

   renderProgressBar = (): React.ReactNode => (
      <ProgressBar progress={this.getProgressPercentage()}>
         <StatusContainer
            isExamStarted={true}
            progress={this.getProgressPercentage()}
         />
      </ProgressBar>
   )

   isTimerVisible = () => {
      const {
         props: { totalTimeInSeconds, isAssignmentCompleted, isSubmitted }
      } = this
      return totalTimeInSeconds && !isSubmitted && !isAssignmentCompleted
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getChromeBannerUIStore = () => this.getInjectedProps().chromeBannerUIStore

   render(): ReactNode {
      const {
         renderContent: RenderContent,
         renderPageActions: RenderPageActions,
         renderPageDescriptionEditComponent: RenderPageDescriptionEditComponent,
         renderPageObjectiveEditComponent: RenderPageObjectiveEditComponent,
         isTimerVisible
      } = this
      const {
         isMergeActive,
         pageObjective,
         pageDescription,
         assignmentWorkbookButton: AssignmentWorkbookButton,
         isAssignmentWorkbook,
         shouldDisableActions,
         isCreator
      } = this.props
      const {
         shouldDisplayViewInChromeMessageBanner
      } = this.getChromeBannerUIStore()
      return isMobileDevice ? (
         <>
            <MobileNavBar
               renderLeftEnhancer={this.renderNavBarLeftSection()}
               renderBody={this.renderNavBarBody}
               renderRightEnhancer={this.renderNavBarRightSection()}
            />
            <PageObjectiveAndDescriptionModal
               objective={pageObjective}
               description={pageDescription}
               onClickObjective={this.openEditPageObjectiveDrawer}
               onClickDescription={this.openEditPageDescriptionDrawer}
               innerRef={this.pageObjectiveAndDescriptionRef}
               onCloseModal={this.onClosePageObjectAndDescriptionModal}
               shouldDisableActions={shouldDisableActions}
            />
            <RenderPageActions />
            <RenderPageObjectiveEditComponent />
            <RenderPageDescriptionEditComponent />
            <MobileProgressBar>
               {isTimerVisible() && this.renderProgressBar()}
            </MobileProgressBar>
         </>
      ) : (
         <>
            <PageHeaderContainer
               isCollapsed={this.isCollapsed}
               isMergeActive={isMergeActive}
               shouldDisplayViewInChromeMessageBanner={
                  shouldDisplayViewInChromeMessageBanner
               }
               id={'workbookPageHeader'}
            >
               <SubContainer>
                  {this.renderClipboardListIcon()}
                  <RenderContent />
                  <AssignmentActionsWrapper
                     isAssignmentWorkbook={isAssignmentWorkbook}
                     isCreator={isCreator}
                  >
                     {isTimerVisible() && this.renderTimer()}
                     <ButtonContainer>
                        <AssignmentWorkbookButton />
                     </ButtonContainer>
                  </AssignmentActionsWrapper>
               </SubContainer>
               {this.renderToggleButton()}
            </PageHeaderContainer>
            {isTimerVisible() && this.renderProgressBar()}
         </>
      )
   }
}

export default withRouter(withTranslation()(PageHeader))
