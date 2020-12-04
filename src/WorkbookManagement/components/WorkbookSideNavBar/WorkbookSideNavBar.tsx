import React, { Component, ReactNode } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import { withTranslation } from 'react-i18next'

import HomeIcon from '../../../Common/icons/HomeIcon'
import ArrowLeftIcon from '../../../Common/icons/ArrowLeftIcon'
import AssignmentSingleFillIcon from '../../../Common/icons/AssignmentSingleFillIcon'
import TwoPersonsGroupIcon from '../../../Common/icons/TwoPersonsGroupIcon'
import UserDetails from '../../../UserProfile/stores/UserStore/models/UserDetails'
import { LEARNER } from '../../../FolderManagement/constants/UIConstants'
import ChromeBannerUIStore from '../../../Common/stores/ChromeBannerUIStore'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import SendIcon from '../../../Common/icons/SendIcon'
import LearningIcon from '../../../Common/icons/LearningIcon'
import PersonalProjectIcon from '../../../Common/icons/PersonalProjectIcon'
import IDMLogo from '../../../Common/icons/IDMLogo'
import Colors from '../../../Common/themes/Colors'

import WorkbookStore from '../../stores/WorkbookStore'
import { CREATOR } from '../../constants/UIConstants'

import Avatar from '../../../Common/components/Avatar'
import {
   ShortNavBarContainer,
   SubFilterContainer,
   IconContainer,
   LogoContainer
} from './styledComponents'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface WorkbookSideNavBarProps extends WithTranslationProps {
   workbookStore: WorkbookStore
   goToHome: () => void
   goToAssignments: () => void
   goToLearnings: () => void
   goToSharedWithMe: () => void
   goToPublishDashboard: () => void
   userDetails: UserDetails | null
   goToPersonalProjects: () => void
   goBackToPreviousRoute: () => void
   userName: string
}

interface InjectedProps extends WorkbookSideNavBarProps {
   chromeBannerUIStore: ChromeBannerUIStore
}

@inject('chromeBannerUIStore')
@observer
class WorkbookSideNavBar extends Component<WorkbookSideNavBarProps> {
   @observable isNavBarOpen: boolean
   shareFeatureLockModalRef

   constructor(props) {
      super(props)
      this.isNavBarOpen = true
      this.shareFeatureLockModalRef = React.createRef<BaseModalContainer>()
   }

   renderSideNavbarBasedOnUserRole = (): ReactNode => {
      const {
         goToAssignments,
         goToLearnings,
         goToPublishDashboard,
         userDetails
      } = this.props
      let userRole = LEARNER
      if (userDetails) {
         userRole = userDetails.role
      }
      return userRole === CREATOR ? (
         <IconContainer
            onClick={goToPublishDashboard}
            data-testid='workbookPublishDashboardNavigationButton'
            title='Published By Me'
         >
            <SendIcon />
         </IconContainer>
      ) : (
         <>
            <IconContainer
               onClick={goToAssignments}
               data-testid='workbookAssignmentsNavigationButton'
               title='Assignments'
            >
               <AssignmentSingleFillIcon />
            </IconContainer>
            <IconContainer
               onClick={goToLearnings}
               data-testid='workbookLearningsNavigationButton'
               title='Learnings'
            >
               <LearningIcon />
            </IconContainer>
         </>
      )
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getChromeBannerUIStore = () => this.getInjectedProps().chromeBannerUIStore

   renderSuccessSideNavBar = (): React.ReactNode => {
      const {
         shouldDisplayViewInChromeMessageBanner
      } = this.getChromeBannerUIStore()

      const {
         goToHome,
         goToSharedWithMe,
         goToPersonalProjects,
         goBackToPreviousRoute,
         userName,
         t
      } = this.props

      return (
         <ShortNavBarContainer
            shouldDisplayViewInChromeMessageBanner={
               shouldDisplayViewInChromeMessageBanner
            }
         >
            <SubFilterContainer>
               <LogoContainer>
                  <IDMLogo />
               </LogoContainer>
               <IconContainer
                  onClick={goBackToPreviousRoute}
                  data-testid='workbookBackButton'
                  title='Back'
               >
                  <ArrowLeftIcon
                     width={24}
                     height={24}
                     fill={Colors.lightBlueGrey}
                  />
               </IconContainer>
               <IconContainer
                  onClick={goToHome}
                  data-testid='workbookHomeNavigationButton'
                  title='Home'
               >
                  <HomeIcon />
               </IconContainer>
               <IconContainer
                  onClick={goToPersonalProjects}
                  data-testid='workbookPersonalProjectsNavigationButton'
                  title='Personal Projects'
               >
                  <PersonalProjectIcon />
               </IconContainer>
               {this.renderSideNavbarBasedOnUserRole()}
               <IconContainer
                  onClick={goToSharedWithMe}
                  data-testid='workbookSharedWithMeNavigationButton'
                  title='Shared With Me'
               >
                  <TwoPersonsGroupIcon />
               </IconContainer>
            </SubFilterContainer>

            <SubFilterContainer>
               <Avatar
                  name={userName}
                  size={Avatar.sizes.medium}
                  variant={Avatar.variants.circle}
                  type={Avatar.types.outline}
                  alt={t('common:avatar.alt')}
               />
            </SubFilterContainer>
         </ShortNavBarContainer>
      )
   }

   render(): React.ReactNode {
      return <>{this.renderSuccessSideNavBar()}</>
   }
}

export default withTranslation()(WorkbookSideNavBar)
