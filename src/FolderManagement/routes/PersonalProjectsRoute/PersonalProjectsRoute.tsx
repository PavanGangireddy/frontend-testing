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

import { LoaderContainer, PersonalProjectContainer } from '../styledComponents'
import PersonalProjectsComponent from '../../components/PersonalProjectsComponent'

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
class PersonalProjectsRoute extends React.Component<RouteComponentProps> {
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

   //TODO: need to write a common wrapper for all the routes
   render(): ReactNode {
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
            <PersonalProjectContainer>
               <PersonalProjectsComponent isPersonalProjectsLocked={true} />
            </PersonalProjectContainer>
         </LayoutWithSideBar>
      )
   }
}
export default withTranslation()(withRouter(PersonalProjectsRoute))
