import React, { ReactNode, ReactElement } from 'react'
import { observer, inject } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

import LayoutWithSideBar from '../../../Common/components/LayoutWithSideBar'
import UserStore from '../../../UserProfile/stores/UserStore'
import { getAPIErrorMessage } from '../../../Common/utils/APIUtils'
import { showFailureBottomCenterToast } from '../../../Common/utils/ToastUtils'

import DashboardStore from '../../stores/DashboardStore'
import {
   CollapsedFooterWithProfilePic,
   CollapsedHeaderWithIcons,
   ExpandedFooterWithUserProfileLayout,
   RenderMenuItems
} from '../../components/CollapsibleSideNavbarComponents'
import { PUBLISH, LEARNER, ASSIGNMENTS } from '../../constants/UIConstants'
import PublishedWorkbooksDashboard from '../../components/PublishedWorkbooksDashboard'
import { goToHome } from '../../utils/NavigationUtils.ts'

import SearchAndAddButtonsContainer from '../SearchAndAddButtonsContainer'
import { Container } from '../styledComponents'

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
class PublishDashboardRoute extends React.Component<RouteComponentProps> {
   constructor(props) {
      super(props)
   }

   async componentDidMount() {
      const { name } = this.getUserStore().userDetails
      if (!name) {
         await this.getUserStore().getuserProfileAPI()
      }
      const { role } = this.getUserStore().userDetails
      if (role === LEARNER) {
         const { history } = this.props
         goToHome(history)
      }
      this.doNetworkCallForPublishedWorkbooks()
   }

   onSuccessGetPublishedWorkbooks = (): void => {
      // TODO: need to handle Success Case
   }

   onFailureGetPublishedWorkbooks = (error: any) => {
      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
   }

   doNetworkCallForPublishedWorkbooks = (): void => {
      const { getPublishedWorkbookAPI } = this.getDashBoardStore()
      getPublishedWorkbookAPI(
         this.onSuccessGetPublishedWorkbooks,
         this.onFailureGetPublishedWorkbooks
      )
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getDashBoardStore = () => this.getInjectedProps().dashboardStore

   getUserStore = () => this.getInjectedProps().userStore

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

   renderSearchBar = (): ReactElement => (
      <SearchAndAddButtonsContainer showAddWorkbookOrFolderButton={false} />
   )

   //TODO: need to write a common wrapper for all the routes
   render(): ReactNode {
      const {
         getPublishedWorkbookAPIStatus,
         publishedWorkbooks,
         onChangeOrder,
         getPublishedWorkbookAPIError
      } = this.getDashBoardStore()
      const {
         userProfileAPIStatus,
         userProfileAPIError,
         getuserProfileAPI
      } = this.getUserStore()
      const { doNetworkCallForPublishedWorkbooks } = this
      return (
         <LayoutWithSideBar
            collapsedFooterView={this.renderCollapsedFooter()}
            collapsedHeaderView={this.renderCollapsedHeaderWithIcons()}
            expandedFooterView={this.renderExpandedFooter()}
            expandedHeaderView={this.renderExpandedMenu()}
            status={userProfileAPIStatus}
            error={userProfileAPIError}
            retryFunction={getuserProfileAPI}
            searchBar={this.renderSearchBar}
         >
            <SearchAndAddButtonsContainer
               showAddWorkbookOrFolderButton={false}
            />
            <Container>
               <PublishedWorkbooksDashboard
                  currentRoute={PUBLISH}
                  publishedWorkbooks={publishedWorkbooks}
                  onChangeOrder={onChangeOrder}
                  doNetworkCallForPublishedWorkbooks={
                     doNetworkCallForPublishedWorkbooks
                  }
                  getPublishedWorkbookAPIStatus={getPublishedWorkbookAPIStatus}
                  getPublishedWorkbookAPIError={getPublishedWorkbookAPIError}
               />
            </Container>
         </LayoutWithSideBar>
      )
   }
}
export default withTranslation()(withRouter(PublishDashboardRoute))
