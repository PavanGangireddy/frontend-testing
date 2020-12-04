import React, { Component, ReactNode, ReactElement } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { withTranslation } from 'react-i18next'
import { APIStatus } from '@ib/api-constants'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import { showFailureBottomCenterToast } from '../../../Common/utils/ToastUtils'
import Image from '../../../Common/components/Image'

import { assignmentsTabsList } from '../../constants/UIConstants'
import ActiveAssignmentWorkbook from '../../stores/models/ActiveAssignmentWorkbook'
import UpcomingAssignmentWorkbook from '../../stores/models/UpcomingAssignmentWorkbook'
import CompletedAssignmentWorkbook from '../../stores/models/CompletedAssignmentWorkbook'

import AssignmentsTabBar from '../AssignmentsTabBar'
import AssignmentsDesktopLayout from '../AssignmentsDesktopLayout'
import AssignmentsMobileLayout from '../AssignmentsMobileLayout'

import AssignmentSkeleton from './AssignmentSkeleton'

import {
   AssignmentsContainer,
   ContainerStyle,
   NoAssignmentsMessage,
   NoAssignmentsView,
   NoAssignmentsImageContainer
} from './styledComponents'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

export interface AssignmentsProps extends WithTranslationProps {
   assignmentsFolderInfo: Map<
      string,
      | Array<
           | ActiveAssignmentWorkbook
           | UpcomingAssignmentWorkbook
           | CompletedAssignmentWorkbook
        >
      | string
   >
   onClickWorkbook: (workbookId: string, workbookStatus?: string) => void
   getAssignmentsAPIStatus: APIStatus
   // TODO:need to add type
   getAssignmentsAPIError: any
   doNetworkCallForAssignments: () => void
}

@observer
class Assignments extends Component<AssignmentsProps> {
   @observable selectedTab: string

   constructor(props) {
      super(props)
      this.selectedTab = assignmentsTabsList[0].value
   }

   onClickAssignmentsTab = (selectedTab: string): void => {
      this.selectedTab = selectedTab
   }

   openActiveAssignmentWorkbook = (
      id: string,
      workbookStatus: string
   ): void => {
      const { onClickWorkbook } = this.props
      onClickWorkbook(id, workbookStatus)
   }

   onClickUpcomingAssignmentWorkbook = (id: string): void => {
      const { t } = this.props
      showFailureBottomCenterToast(
         t('folderManagement:assignments.upcomingWorkbookErrorToastMessage')
      )
   }

   onClickCompletedAssignmentWorkbook = (id: string): void => {
      const { onClickWorkbook } = this.props
      onClickWorkbook(id)
   }

   renderDesktopOrMobileLayout = (): ReactElement => {
      const { assignmentsFolderInfo } = this.props
      return isMobileDevice ? (
         <AssignmentsMobileLayout
            selectedTab={this.selectedTab}
            assignments={assignmentsFolderInfo}
            openActiveAssignmentWorkbook={this.openActiveAssignmentWorkbook}
            onClickUpcomingAssignmentWorkbook={
               this.onClickUpcomingAssignmentWorkbook
            }
            onClickCompletedAssignmentWorkbook={
               this.onClickCompletedAssignmentWorkbook
            }
         />
      ) : (
         <AssignmentsDesktopLayout
            selectedTab={this.selectedTab}
            assignments={assignmentsFolderInfo}
            openActiveAssignmentWorkbook={this.openActiveAssignmentWorkbook}
            onClickUpcomingAssignmentWorkbook={
               this.onClickUpcomingAssignmentWorkbook
            }
            onClickCompletedAssignmentWorkbook={
               this.onClickCompletedAssignmentWorkbook
            }
         />
      )
   }

   renderNoAssignmentsView = observer(() => {
      const { selectedTab } = this
      const { t } = this.props

      return (
         <NoAssignmentsView>
            <NoAssignmentsMessage>
               {t(`folderManagement:assignments.noAssignments`, {
                  assignmentType: selectedTab
               })}
            </NoAssignmentsMessage>
            <NoAssignmentsImageContainer>
               <Image
                  src={
                     'https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/2c82f25c-1b34-49a0-a027-472bbadd2a0d.svg'
                  }
                  alt='no-assignments'
               />
            </NoAssignmentsImageContainer>
         </NoAssignmentsView>
      )
   })

   hasAssignments = () => {
      const { assignmentsFolderInfo } = this.props
      return assignmentsFolderInfo.get(this.selectedTab)?.length !== 0
   }

   renderBasedOnAssignmentCount = observer(() => {
      const {
         renderDesktopOrMobileLayout: RenderDesktopOrMobileLayout,
         renderNoAssignmentsView: RenderNoAssignmentsView
      } = this
      if (this.hasAssignments()) return <RenderDesktopOrMobileLayout />
      return <RenderNoAssignmentsView />
   })

   renderSuccessUI = observer(
      (): ReactElement => {
         const {
            renderBasedOnAssignmentCount: RenderBasedOnAssignmentCount
         } = this
         return (
            <AssignmentsContainer hasAssignments={this.hasAssignments()}>
               <AssignmentsTabBar
                  selectedTab={this.selectedTab}
                  onClickAssignmentsTab={this.onClickAssignmentsTab}
               />
               <RenderBasedOnAssignmentCount />
            </AssignmentsContainer>
         )
      }
   )

   renderLoadingView = () => <AssignmentSkeleton />

   render(): ReactNode {
      const {
         getAssignmentsAPIStatus,
         getAssignmentsAPIError,
         doNetworkCallForAssignments
      } = this.props
      return (
         <LoadingWrapper
            renderLoadingView={this.renderLoadingView}
            apiStatus={100}
            apiError={getAssignmentsAPIError}
            onRetry={doNetworkCallForAssignments}
            renderSuccessUI={this.renderSuccessUI}
            failureMessageTestId='assignmentsFailureMessage'
            retryButtonTestId='assignmentsRetryButton'
            loaderTestId='assignmentsLoader'
            containerClassName={ContainerStyle}
         />
      )
   }
}

export default withTranslation('translation', { withRef: true })(Assignments)
