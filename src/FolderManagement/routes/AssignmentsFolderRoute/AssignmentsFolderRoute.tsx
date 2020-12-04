import React, { ReactNode } from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import LayoutWithSideBar from '../../../Common/components/LayoutWithSideBar'
import UserStore from '../../../UserProfile/stores/UserStore'
import { isAPIFetching } from '../../../Common/utils/APIUtils'
import LoadingView from '../../../Common/components/LoadingWrapper/LoadingView'
import { YET_TO_START } from '../../../WorkbookManagement/constants/UIConstants'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'

import DashboardStore from '../../stores/DashboardStore'
import {
   CollapsedFooterWithProfilePic,
   CollapsedHeaderWithIcons,
   ExpandedFooterWithUserProfileLayout,
   RenderMenuItems
} from '../../components/CollapsibleSideNavbarComponents'
import { CREATOR } from '../../constants/UIConstants'
import Assignments from '../../components/Assignments'
import {
   goToHome,
   goToAssignmentWorkbook
} from '../../utils/NavigationUtils.ts'
import AssignmentInstructionsModal from '../../components/AssignmentInstructionsModal'

import { LoaderContainer } from '../styledComponents'
import { AssignmentsContainer } from './styledComponents'

interface WithTranslationProps {
   i18n: any
   tReady: any
   t: any
}

interface InjectedProps extends RouteComponentProps, WithTranslationProps {
   dashboardStore: DashboardStore
   userStore: UserStore
}

@inject('dashboardStore', 'userStore')
@observer
class AssignmentsFolderRoute extends React.Component<RouteComponentProps> {
   modalRef
   @observable instructionWorkbookId!: string

   constructor(props) {
      super(props)
      this.modalRef = React.createRef<BaseModalContainer>()
   }

   async componentDidMount() {
      const { name } = this.getUserStore().userDetails
      if (!name) {
         await this.getUserStore().getuserProfileAPI()
      }
      const { role } = this.getUserStore().userDetails
      if (role === CREATOR) {
         const { history } = this.props
         goToHome(history)
      }
      this.doNetworkCallForAssignments()
   }

   //TODO:need to clear the store

   doNetworkCallForAssignments = () => {
      this.getDashBoardStore().getAssignmentsAPI()
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getDashBoardStore = () => this.getInjectedProps().dashboardStore

   getUserStore = () => this.getInjectedProps().userStore

   onDoubleClickWorkbook = (
      workbookId: string,
      workbookStatus: string | null = null
   ): void => {
      this.instructionWorkbookId = workbookId
      if (workbookStatus === YET_TO_START) {
         this.modalRef.current?.openModal()
         this.getAssignmentInstructionsAPI()
      } else this.goToAssignmentWorkbook()
   }

   goToAssignmentWorkbook = () => {
      const {
         instructionWorkbookId,
         props: { history }
      } = this
      goToAssignmentWorkbook(history, instructionWorkbookId)
   }

   renderExpandedFooter = (): ReactNode => {
      const {
         logoutAPI,
         logoutAPIStatus,
         userDetails: { name }
      } = this.getUserStore()
      return (
         <ExpandedFooterWithUserProfileLayout
            logoutAPI={logoutAPI}
            logoutAPIStatus={logoutAPIStatus}
            userName={name}
         />
      )
   }

   renderCollapsedFooter = (): ReactNode => {
      const {
         userDetails: { name }
      } = this.getUserStore()
      return <CollapsedFooterWithProfilePic userName={name} />
   }

   renderCollapsedHeaderWithIcons = (): ReactNode => {
      const { role } = this.getUserStore().userDetails
      return <CollapsedHeaderWithIcons role={role} />
   }

   renderExpandedMenu = (): ReactNode => {
      const { role } = this.getUserStore().userDetails
      return <RenderMenuItems role={role} />
   }

   getAssignmentInstructionsAPI = () => {
      const { getAssignmentInstructionsAPI } = this.getDashBoardStore()
      getAssignmentInstructionsAPI(this.instructionWorkbookId)
   }

   renderAssignmentInstructions = () => {
      const {
         getAssignmentInstructionsAPIStatus,
         getAssignmentInstructionsAPIError,
         getAssignmentInstructionsAPIResponse
      } = this.getDashBoardStore()
      const { getAssignmentInstructionsAPI, goToAssignmentWorkbook } = this
      return (
         <AssignmentInstructionsModal
            modalRef={this.modalRef}
            getAssignmentInstructionsAPI={getAssignmentInstructionsAPI}
            getAssignmentInstructionsAPIStatus={
               getAssignmentInstructionsAPIStatus
            }
            getAssignmentInstructionsAPIError={
               getAssignmentInstructionsAPIError
            }
            getAssignmentInstructionsAPIResponse={
               getAssignmentInstructionsAPIResponse
            }
            onClickStartAssignment={goToAssignmentWorkbook}
         />
      )
   }

   //TODO: need to write a common wrapper for all the routes
   render(): ReactNode {
      const {
         getAssignmentsAPIStatus,
         getAssignmentsAPIError,
         assignmentsFolderInfo,
         getFolderIdOfAWorkbookAPIStatus
      } = this.getDashBoardStore()
      const {
         userProfileAPIStatus,
         userProfileAPIError,
         getuserProfileAPI
      } = this.getUserStore()
      return (
         <LayoutWithSideBar
            collapsedFooterView={this.renderCollapsedFooter()}
            collapsedHeaderView={this.renderCollapsedHeaderWithIcons()}
            expandedFooterView={this.renderExpandedFooter()}
            expandedHeaderView={this.renderExpandedMenu()}
            status={userProfileAPIStatus}
            error={userProfileAPIError}
            retryFunction={getuserProfileAPI}
            searchBar={() => null}
         >
            {isAPIFetching(getFolderIdOfAWorkbookAPIStatus) ? (
               <LoaderContainer>
                  <LoadingView />
               </LoaderContainer>
            ) : (
               <AssignmentsContainer>
                  <Assignments
                     assignmentsFolderInfo={assignmentsFolderInfo}
                     getAssignmentsAPIStatus={getAssignmentsAPIStatus}
                     getAssignmentsAPIError={getAssignmentsAPIError}
                     doNetworkCallForAssignments={
                        this.doNetworkCallForAssignments
                     }
                     onClickWorkbook={this.onDoubleClickWorkbook}
                  />
               </AssignmentsContainer>
            )}
            {this.renderAssignmentInstructions()}
         </LayoutWithSideBar>
      )
   }
}
export default withTranslation()(withRouter(AssignmentsFolderRoute))
