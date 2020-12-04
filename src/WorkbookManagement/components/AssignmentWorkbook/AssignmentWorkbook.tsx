import React, { Component, ReactElement } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import { APIStatus } from '@ib/api-constants'

import UsersGroupModel from '../../../UserProfile/stores/models/UsersGroupModel'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

import BaseModel from '../../stores/models/BaseModel'
import PageModel from '../../stores/models/PageModel'
import {
   MergeCardsRequestType,
   ReorderPageRequest,
   MovePageRequest,
   PublishWorkbookRequest
} from '../../stores/types'
import WorkbookChildDetailsModel from '../../stores/models/WorkbookChildDetailsModel'
import WorkbookModel from '../../stores/models/WorkbookModel'
import { SUBMITTED, YET_TO_START } from '../../constants/UIConstants'
import { CARDS_SEGREGATION } from '../../constants/AssignmentWorkbookConstants'

import WorkbookComponent from '../WorkbookComponent'
import AssignmentResultsSideBar from '../AssignmentResultsSideBar'
import AssignmentResultsBottomDrawer from '../AssignmentResultsSideBar/AssignmentResultsBottomDrawer'

interface AssignmentWorkbookProps {
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

   // NOTE: Props for assignment
   isCreator: boolean
   isAssignmentCompleted: boolean
   getUsersGroupsAPI: (
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) => void
   getUsersGroupAPIStatus: APIStatus
   // TODO: Need to add type
   getUsersGroupAPIError: any
   publishWorkbookAPI: (
      id: string,
      request: PublishWorkbookRequest,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) => void
   publishWorkbookAPIStatus: APIStatus
   // TODO: Need to add type
   publishWorkbookAPIError: any
   userGroups: Map<string, UsersGroupModel>
   isCompletedAssignmentWorkbook?: boolean
   evaluationType: string
   getAssignmentWorkbookDetails: () => void
}

@observer
class AssignmentWorkbook extends Component<AssignmentWorkbookProps> {
   @observable shouldShowResults: boolean
   @observable assignmentStatus!: string | null

   constructor(props) {
      super(props)
      this.shouldShowResults = false
   }

   componentDidMount(): void {
      const { activePageDetails } = this.props
      if (activePageDetails) {
         const { pageStatus } = activePageDetails
         this.assignmentStatus = pageStatus
      }
   }

   updateAssignmentStatus = (): void => {
      this.assignmentStatus = SUBMITTED
   }

   get shouldDisableActions(): boolean {
      const { isCreator, evaluationType } = this.props
      return !isCreator && evaluationType === CARDS_SEGREGATION
   }

   showSideBar = (): void => {
      this.shouldShowResults = true
   }

   hideSideBar = (): void => {
      this.shouldShowResults = false
   }

   onSuccessSubmitAssignment = (): void => {
      this.shouldShowResults = true
      this.updateAssignmentStatus()
      const { getAssignmentWorkbookDetails } = this.props
      getAssignmentWorkbookDetails()
   }

   render(): ReactElement {
      const {
         id,
         totalPages,
         activePageDetails,
         updatePageObjectiveWithDescriptionAPI,
         getWorkbookDetails,
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
         getRootFolderDetailsAPI,
         getRootFolderDetailsAPIStatus,
         getRootFolderDetailsAPIError,
         rootFolderId,
         workbookDetails,
         createPageAPI,
         createPageAPIStatus,
         createPageAPIError,
         getPageDetails,
         getPageDetailsAPIStatus,
         getPageDetailsAPIError,
         reorderPageAPI,
         reorderPage,
         movePageAPI,
         movePageAPIStatus,
         movePageAPIError,
         clearMoveWorkbooksAndFolders,
         clearWorkbookChildDetails,
         updatePageName,
         clearStore,
         isCreator,
         isAssignmentCompleted,
         getUsersGroupsAPI,
         getUsersGroupAPIStatus,
         getUsersGroupAPIError,
         publishWorkbookAPI,
         publishWorkbookAPIStatus,
         publishWorkbookAPIError,
         userGroups,
         updatePageObjectiveWithDescriptionAPIStatus,
         isCompletedAssignmentWorkbook,
         getAssignmentWorkbookDetails
      } = this.props
      let totalScore!: number,
         userScore!: number,
         correctAnswersCount!: number,
         wrongAnswersCount!: number
      if (activePageDetails) {
         const { assignmentResult } = activePageDetails
         if (assignmentResult) {
            totalScore = assignmentResult.totalScore
            userScore = assignmentResult.userScore
            correctAnswersCount = assignmentResult.correctAnswersCount
            wrongAnswersCount = assignmentResult.wrongAnswersCount
         }
      }
      return (
         <>
            <WorkbookComponent
               id={id}
               totalPages={totalPages}
               activePageDetails={activePageDetails}
               updatePageObjectiveWithDescriptionAPI={
                  updatePageObjectiveWithDescriptionAPI
               }
               getWorkbookDetails={getWorkbookDetails}
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
                  getMoveWorkbooksAndFoldersStatus
               }
               getMoveWorkbooksAndFoldersError={getMoveWorkbooksAndFoldersError}
               moveActiveFolderInfo={moveActiveFolderInfo}
               workbookChildDetails={workbookChildDetails}
               getRootFolderDetailsAPI={getRootFolderDetailsAPI}
               getRootFolderDetailsAPIStatus={getRootFolderDetailsAPIStatus}
               getRootFolderDetailsAPIError={getRootFolderDetailsAPIError}
               rootFolderId={rootFolderId}
               workbookDetails={workbookDetails}
               createPageAPI={createPageAPI}
               createPageAPIError={createPageAPIError}
               getPageDetails={getPageDetails}
               getPageDetailsAPIStatus={getPageDetailsAPIStatus}
               getPageDetailsAPIError={getPageDetailsAPIError}
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
               isCreator={isCreator}
               isAssignmentWorkbook={true}
               isSubmitted={this.assignmentStatus === SUBMITTED}
               isAssignmentCompleted={isAssignmentCompleted}
               shouldDisableActions={this.shouldDisableActions}
               onSuccessSubmitAssignment={this.onSuccessSubmitAssignment}
               onClickViewResultsButton={this.showSideBar}
               getUsersGroupsAPI={getUsersGroupsAPI}
               getUsersGroupAPIStatus={getUsersGroupAPIStatus}
               getUsersGroupAPIError={getUsersGroupAPIError}
               publishWorkbookAPI={publishWorkbookAPI}
               publishWorkbookAPIStatus={publishWorkbookAPIStatus}
               publishWorkbookAPIError={publishWorkbookAPIError}
               userGroups={userGroups}
               isCompletedAssignmentWorkbook={isCompletedAssignmentWorkbook}
               notAttempted={this.assignmentStatus === YET_TO_START}
               getAssignmentWorkbookDetails={getAssignmentWorkbookDetails}
            />
            {this.shouldShowResults ? (
               isMobileDevice ? (
                  <AssignmentResultsBottomDrawer
                     isVisible={this.shouldShowResults}
                     closeDrawer={this.hideSideBar}
                     totalScore={totalScore}
                     securedScore={userScore}
                     wrongAnswersCount={wrongAnswersCount}
                     correctAnswersCount={correctAnswersCount}
                  />
               ) : (
                  <AssignmentResultsSideBar
                     totalScore={totalScore}
                     securedScore={userScore}
                     correctAnswersCount={correctAnswersCount}
                     wrongAnswersCount={wrongAnswersCount}
                     onClickCloseSideBarButton={this.hideSideBar}
                  />
               )
            ) : null}
         </>
      )
   }
}

export default AssignmentWorkbook
