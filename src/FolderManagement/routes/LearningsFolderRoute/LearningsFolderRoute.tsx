import React, { ReactNode } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import LayoutWithSideBar from '../../../Common/components/LayoutWithSideBar'
import UserStore from '../../../UserProfile/stores/UserStore'
import { isAPIFetching } from '../../../Common/utils/APIUtils'
import LoadingView from '../../../Common/components/LoadingWrapper/LoadingView'

import DashboardStore from '../../stores/DashboardStore'
import {
   CollapsedFooterWithProfilePic,
   CollapsedHeaderWithIcons,
   ExpandedFooterWithUserProfileLayout,
   RenderMenuItems
} from '../../components/CollapsibleSideNavbarComponents'
import { CREATOR, LEARNINGS_FOLDER_ID } from '../../constants/UIConstants'
import { goToWorkbookPage, goToHome } from '../../utils/NavigationUtils.ts'
import Learnings from '../../components/Learnings'

import { LoaderContainer, Container } from '../styledComponents'

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
class LearningsFolderRoute extends React.Component<RouteComponentProps> {
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
      this.doNetworkCallForLearnigWorkbooks()
   }

   doNetworkCallForLearnigWorkbooks = () => {
      this.getDashBoardStore().getLearningWorkbooksAPI()
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getDashBoardStore = () => this.getInjectedProps().dashboardStore

   getUserStore = () => this.getInjectedProps().userStore

   onDoubleClickWorkbook = (workbookId: string): void => {
      const { history } = this.props
      const { learningWorkbooks } = this.getDashBoardStore()
      goToWorkbookPage(
         history,
         learningWorkbooks.get(LEARNINGS_FOLDER_ID),
         workbookId
      )
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

   //TODO: need to write a common wrapper for all the routes
   render(): ReactNode {
      const {
         getLearningWorkbooksAPIStatus,
         getLearningWorkbooksAPIError,
         learningWorkbooks,
         getFolderIdOfAWorkbookAPIStatus
      } = this.getDashBoardStore()
      const {
         userProfileAPIStatus,
         userProfileAPIError,
         getuserProfileAPI
      } = this.getUserStore()
      const { t } = this.props
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
               <Container>
                  <Learnings
                     learningWorkbooks={learningWorkbooks}
                     getLearningWorkbooksAPIStatus={
                        getLearningWorkbooksAPIStatus
                     }
                     getLearningWorkbooksAPIError={getLearningWorkbooksAPIError}
                     doNetworkCallForLearningWorkbooks={
                        this.doNetworkCallForLearnigWorkbooks
                     }
                     onDoubleClickWorkbook={this.onDoubleClickWorkbook}
                  />
               </Container>
            )}
         </LayoutWithSideBar>
      )
   }
}
export default withTranslation()(withRouter(LearningsFolderRoute))
