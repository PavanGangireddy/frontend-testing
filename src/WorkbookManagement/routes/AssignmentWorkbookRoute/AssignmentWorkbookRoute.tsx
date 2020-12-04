import React, { Component, ReactNode, ReactElement } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { computed } from 'mobx'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import {
   goToAssignmentsFolder,
   goToHome,
   goToLearningsFolder,
   goToPublishDashboard,
   goToSharedWithMeScreen,
   goToPersonalProjects
} from '../../../FolderManagement/utils/NavigationUtils.ts'
import DashboardStore from '../../../FolderManagement/stores/DashboardStore'
import UserStore from '../../../UserProfile/stores/UserStore'
import UserDetails from '../../../UserProfile/stores/UserStore/models/UserDetails'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

import WorkbookSideNavBar from '../../components/WorkbookSideNavBar'
import WorkbookStore from '../../stores/WorkbookStore'
import AssignmentWorkbook from '../../components/AssignmentWorkbook'
import { COMPLETED, CREATOR } from '../../constants/UIConstants'

import { Container } from './styledComponents'

interface MatchParams {
   workbookId: string
}

// FIXME: Need to fix empty props
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WorkbookHomeRouteProps extends RouteComponentProps<MatchParams> {}

interface InjectedProps extends WorkbookHomeRouteProps {
   workbookStore: WorkbookStore
   dashboardStore: DashboardStore
   userStore: UserStore
}

// TODO: Need to update prop types
// TODO: Need to write tests for the Route
@inject('workbookStore', 'dashboardStore', 'userStore')
@observer
class WorkbookHomeRoute extends Component<any> {
   async componentDidMount() {
      if (!this.userDetails) {
         const { userStore } = this.props
         await userStore.getuserProfileAPI()
      }
      this.getAssignmentWorkbookDetails()
   }

   @computed
   get injectedProps(): InjectedProps {
      return this.props as InjectedProps
   }

   @computed
   get workbookStore(): WorkbookStore {
      const { workbookStore } = this.injectedProps
      return workbookStore
   }

   @computed
   get dashboardStore(): DashboardStore {
      const { dashboardStore } = this.injectedProps
      return dashboardStore
   }

   @computed
   get userStore(): UserStore {
      const { userStore } = this.injectedProps
      return userStore
   }

   get workbookIdFromRoute(): string {
      const {
         match: {
            params: { workbookId }
         }
      } = this.props
      return workbookId
   }

   goToHome = (): void => {
      const { history } = this.props
      goToHome(history)
   }

   goToAssignments = (): void => {
      const { history } = this.props
      goToAssignmentsFolder(history)
   }

   goToLearnings = (): void => {
      const { history } = this.props
      goToLearningsFolder(history)
   }

   goToSharedWithMe = (): void => {
      const { history } = this.props
      goToSharedWithMeScreen(history)
   }

   getWorkbookDetails = (): void => {
      this.workbookStore.getWorkbookDetailsAPI(this.workbookIdFromRoute)
   }

   goToPublishDashboard = (): void => {
      const { history } = this.props
      goToPublishDashboard(history)
   }

   goToPersonalProjects = (): void => {
      const { history } = this.props
      goToPersonalProjects(history)
   }

   goBackToPreviousRoute = (): void => {
      const { history } = this.props
      history.goBack()
   }

   getAssignmentPageDetails = (pageId: string, onSuccess: () => void): void => {
      const { getAssignmentPageDetailsAPI } = this.workbookStore
      getAssignmentPageDetailsAPI(pageId, onSuccess)
   }

   getAssignmentWorkbookDetails = (): void => {
      this.workbookStore.getAssignmentWorkbookDetailsAPI(
         this.workbookIdFromRoute
      )
   }

   get userDetails(): UserDetails | null {
      const {
         userStore: { userDetails }
      } = this.props
      if (userDetails.role) {
         return userDetails
      }
      return null
   }

   get isCreator(): boolean {
      if (this.userDetails) {
         const { role } = this.userDetails
         if (role === CREATOR) {
            return true
         }
         return false
      }
      return false
   }

   renderWorkbookComponent = observer(
      (): ReactElement => {
         const {
            workbookDetails: { id, pages, status, evaluationType },
            activePageDetails,
            updatePageObjectiveWithDescriptionAPI,
            mergeCardsAPI,
            mergeCardsAPIStatus,
            mergeCardsAPIError,
            getWorkbookChildDetailsAPI,
            getWorkbookChildDetailsAPIStatus,
            getWorkbookChildDetailsAPIError,
            workbookChildDetails,
            workbookDetails,
            createPageAPI,
            createPageAPIStatus,
            createPageAPIError,
            getAssignmentPageDetailsAPIStatus,
            getAssignmentPageDetailsAPIError,
            reorderPageAPI,
            reorderPage,
            movePageAPI,
            movePageAPIStatus,
            movePageAPIError,
            clearWorkbookChildDetails,
            updatePageName,
            clearStore,
            publishWorkbookAPI,
            publishWorkbookAPIStatus,
            publishWorkbookAPIError,
            updatePageObjectiveWithDescriptionAPIStatus
         } = this.workbookStore
         const {
            getMoveWorkbooksAndFoldersAPI,
            getMoveWorkbooksAndFoldersAPIStatus,
            getMoveWorkbooksAndFoldersAPIError,
            moveActiveFolderInfo,
            getMoveRootFolderDetailsAPI,
            getMoveRootFolderDetailsAPIStatus,
            getMoveRootFolderDetailsAPIError,
            moveRootFolderId,
            clearMoveWorkbooksAndFolders
         } = this.dashboardStore
         const {
            getUsersGroupsAPI,
            getUsersGroupAPIStatus,
            getUsersGroupAPIError,
            userGroups
         } = this.userStore
         const pagesArray = Array.from(pages.values())
         return (
            <AssignmentWorkbook
               id={id}
               totalPages={pagesArray}
               activePageDetails={activePageDetails}
               updatePageObjectiveWithDescriptionAPI={
                  updatePageObjectiveWithDescriptionAPI
               }
               getWorkbookDetails={this.getWorkbookDetails}
               mergeCardsAPI={mergeCardsAPI}
               mergeCardsAPIStatus={mergeCardsAPIStatus}
               mergeCardsAPIError={mergeCardsAPIError}
               getWorkbookChildDetailsAPI={getWorkbookChildDetailsAPI}
               getWorkbookChildDetailsAPIStatus={
                  getWorkbookChildDetailsAPIStatus
               }
               getWorkbookChildDetailsAPIError={getWorkbookChildDetailsAPIError}
               getMoveWorkbooksAndFoldersAPI={getMoveWorkbooksAndFoldersAPI}
               getMoveWorkbooksAndFoldersStatus={
                  getMoveWorkbooksAndFoldersAPIStatus
               }
               getMoveWorkbooksAndFoldersError={
                  getMoveWorkbooksAndFoldersAPIError
               }
               moveActiveFolderInfo={moveActiveFolderInfo}
               workbookChildDetails={workbookChildDetails}
               getRootFolderDetailsAPI={getMoveRootFolderDetailsAPI}
               getRootFolderDetailsAPIStatus={getMoveRootFolderDetailsAPIStatus}
               getRootFolderDetailsAPIError={getMoveRootFolderDetailsAPIError}
               rootFolderId={moveRootFolderId}
               workbookDetails={workbookDetails}
               createPageAPI={createPageAPI}
               createPageAPIError={createPageAPIError}
               getPageDetails={this.getAssignmentPageDetails}
               getPageDetailsAPIStatus={getAssignmentPageDetailsAPIStatus}
               getPageDetailsAPIError={getAssignmentPageDetailsAPIError}
               createPageAPIStatus={createPageAPIStatus}
               reorderPageAPI={reorderPageAPI}
               reorderPage={reorderPage}
               movePageAPI={movePageAPI}
               movePageAPIStatus={movePageAPIStatus}
               movePageAPIError={movePageAPIError}
               clearMoveWorkbooksAndFolders={clearMoveWorkbooksAndFolders}
               clearWorkbookChildDetails={clearWorkbookChildDetails}
               updatePageName={updatePageName}
               clearStore={clearStore}
               updatePageObjectiveWithDescriptionAPIStatus={
                  updatePageObjectiveWithDescriptionAPIStatus
               }
               isCreator={this.isCreator}
               isAssignmentCompleted={status === COMPLETED}
               getUsersGroupsAPI={getUsersGroupsAPI}
               getUsersGroupAPIStatus={getUsersGroupAPIStatus}
               getUsersGroupAPIError={getUsersGroupAPIError}
               publishWorkbookAPI={publishWorkbookAPI}
               publishWorkbookAPIStatus={publishWorkbookAPIStatus}
               publishWorkbookAPIError={publishWorkbookAPIError}
               userGroups={userGroups}
               isCompletedAssignmentWorkbook={status === COMPLETED}
               evaluationType={evaluationType}
               getAssignmentWorkbookDetails={this.getAssignmentWorkbookDetails}
            />
         )
      }
   )

   renderSideNavbar = observer(() => {
      const {
         userDetails: { name }
      } = this.userStore
      return !isMobileDevice ? (
         <WorkbookSideNavBar
            workbookStore={this.workbookStore}
            goToHome={this.goToHome}
            goToAssignments={this.goToAssignments}
            goToLearnings={this.goToLearnings}
            goToSharedWithMe={this.goToSharedWithMe}
            goToPublishDashboard={this.goToPublishDashboard}
            userDetails={this.userDetails}
            goToPersonalProjects={this.goToPersonalProjects}
            goBackToPreviousRoute={this.goBackToPreviousRoute}
            userName={name}
         />
      ) : null
   })

   render(): ReactNode {
      const {
         getAssignmentWorkbookDetailsAPIStatus,
         getAssignmentWorkbookDetailsAPIError
      } = this.workbookStore

      const { renderSideNavbar: RenderSideNavbar } = this
      return (
         <Container>
            <RenderSideNavbar />
            <LoadingWrapper
               apiStatus={getAssignmentWorkbookDetailsAPIStatus}
               apiError={getAssignmentWorkbookDetailsAPIError}
               renderSuccessUI={this.renderWorkbookComponent}
               onRetry={this.getAssignmentWorkbookDetails}
            />
         </Container>
      )
   }
}

export default withRouter(WorkbookHomeRoute)
