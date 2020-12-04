import React, { Component, ReactNode } from 'react'
import { APIStatus } from '@ib/api-constants'
import { computed, observable } from 'mobx'
import { inject, observer } from 'mobx-react'

import { withTranslation } from 'react-i18next'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import TabBar from '../../../Common/components/TabBar'

import { tabsList, ALL } from '../../constants/UIConstants'

import WorkbookInfoItem from '../../stores/models/WorkbookInfoItem'
import FolderInfoItem from '../../stores/models/FolderInfoItem'
import BaseWorkbookAndFolderInfoItem from '../../stores/models/BaseWorkbookAndFolderInfoItem'
import PathInfoItem from '../../stores/models/PathInfoItem'
import WelcomeMessageUIStore from '../../stores/WelcomeMessageUIStore'

import UserWorkbooksAndFolders from '../UserWorkbooksAndFolders'
import StarredFoldersAndPinnedWorkbooks from '../StarredFoldersAndPinnedWorkbooks'
import UserWelcomeGreetings from '../UserWelcomeGreetings'

import HomeProjectsHeader from '../HomeProjectsHeader'
import { WithTranslation } from '../../../Common/types'
import {
   Container,
   TabBarContainer,
   UserWorkbooksAndFoldersContainer,
   TabContainerCSS,
   WelcomeBackMessage,
   WelcomeMessageContainer
} from './styledComponents'
import ProjectsSkeleton from './ProjectsSkeleton'

interface FolderManagementDashBoardProps extends WithTranslation {
   pinnedWorkbooks: Array<BaseWorkbookAndFolderInfoItem>
   starredFolders: Array<BaseWorkbookAndFolderInfoItem>
   workbooks: Array<WorkbookInfoItem>
   folders: Array<FolderInfoItem>
   getWorkbooksAndFoldersAPIStatus: APIStatus
   getPinnedWorkbooksAndStarredFoldersAPIStatus: APIStatus
   getWorkbooksAndFoldersAPIError: Error
   getPinnedWorkbooksAndStarredFoldersAPIError: Error
   doNetworkCallForStarredFoldersAndPinnedWorkbooks: () => void
   doNetworkCallForFoldersAndWorkbooks: (folderId: string) => void
   pathInfo: Array<PathInfoItem>
   onDoubleClickWorkbook: (workbookId: string) => void
   getRootFolderDetailsAPIStatus: APIStatus
   getRootFolderDetailsAPIError: Error
   getRootFolderDetails: () => void
   onChangeOrder: (sortBy: string, orderBy: string, folderId: string) => void
   onDoubleClickFolder: (folderId: string) => void
   onClickFolderMenuItem: (folderId: string, clickedItem: string) => void
   onClickWorkbookMenuItem: (workbookId: string, clickedItem: string) => void
   userDetails
   getDashBoardStore: Function
}

interface InjectedProps extends FolderManagementDashBoardProps {
   welcomeMessageUIStore: WelcomeMessageUIStore
}

@inject('welcomeMessageUIStore')
@observer
class FolderManagementDashBoard extends Component<
   FolderManagementDashBoardProps
> {
   @observable currentTab: string
   constructor(props) {
      super(props)
      this.currentTab = ALL
   }

   @computed
   get injectedProps(): InjectedProps {
      return this.props as InjectedProps
   }

   get welcomeMessageUIStore(): WelcomeMessageUIStore {
      const { welcomeMessageUIStore } = this.injectedProps
      return welcomeMessageUIStore
   }

   onChangeTab = currentTab => {
      this.currentTab = currentTab
   }

   welcomeBackMessage = (): string => {
      const {
         userDetails: { name },
         t
      } = this.props
      const { shouldShowWelcomeMessage } = this.welcomeMessageUIStore
      return shouldShowWelcomeMessage && name !== undefined
         ? `${t('folderManagement:home.welcomeBack')} ${name}!`
         : ``
   }

   renderFilterBar = (): ReactNode => {
      const {
         userDetails: { isFirstTime },
         onDoubleClickFolder,
         getDashBoardStore
      } = this.props
      const { shouldShowWelcomeMessage } = this.welcomeMessageUIStore
      if (isMobileDevice || (isFirstTime && shouldShowWelcomeMessage)) {
         return null
      }
      return (
         <HomeProjectsHeader
            message={this.welcomeBackMessage()}
            dashboardStore={getDashBoardStore()}
            goToFolder={onDoubleClickFolder}
         />
      )
   }
   renderLoadingView = () => <ProjectsSkeleton />
   renderTabContent = () => {
      const {
         getWorkbooksAndFoldersAPIStatus,
         getPinnedWorkbooksAndStarredFoldersAPIStatus,
         getWorkbooksAndFoldersAPIError,
         getPinnedWorkbooksAndStarredFoldersAPIError,
         pinnedWorkbooks,
         starredFolders,
         workbooks,
         folders,
         onChangeOrder,
         pathInfo,
         doNetworkCallForStarredFoldersAndPinnedWorkbooks,
         doNetworkCallForFoldersAndWorkbooks,
         onDoubleClickWorkbook,
         getRootFolderDetailsAPIStatus,
         getRootFolderDetailsAPIError,
         getRootFolderDetails,
         onDoubleClickFolder,
         onClickFolderMenuItem,
         onClickWorkbookMenuItem
      } = this.props
      if (this.currentTab === ALL) {
         return (
            <UserWorkbooksAndFoldersContainer>
               <UserWorkbooksAndFolders
                  renderLoadingView={this.renderLoadingView}
                  getWorkbooksAndFoldersAPIStatus={
                     getWorkbooksAndFoldersAPIStatus
                  }
                  getWorkbooksAndFoldersAPIError={
                     getWorkbooksAndFoldersAPIError
                  }
                  pathInfo={pathInfo}
                  onChangeOrder={onChangeOrder}
                  userWorkbooks={workbooks}
                  userFolders={folders}
                  doNetworkCallForFoldersAndWorkbooks={
                     doNetworkCallForFoldersAndWorkbooks
                  }
                  onDoubleClickWorkbook={onDoubleClickWorkbook}
                  getRootFolderDetailsAPIStatus={getRootFolderDetailsAPIStatus}
                  getRootFolderDetailsAPIError={getRootFolderDetailsAPIError}
                  getRootFolderDetails={getRootFolderDetails}
                  onDoubleClickFolder={onDoubleClickFolder}
                  onClickFolderMenuItem={onClickFolderMenuItem}
                  onClickWorkbookMenuItem={onClickWorkbookMenuItem}
               />
            </UserWorkbooksAndFoldersContainer>
         )
      }
      return this.renderStarredFoldersAndPinnedWorkbooks()
   }

   renderStarredFoldersAndPinnedWorkbooks = (): ReactNode => {
      const {
         getPinnedWorkbooksAndStarredFoldersAPIStatus,
         getPinnedWorkbooksAndStarredFoldersAPIError,
         pinnedWorkbooks,
         starredFolders,
         doNetworkCallForStarredFoldersAndPinnedWorkbooks,
         onDoubleClickWorkbook,
         onDoubleClickFolder,
         onClickFolderMenuItem,
         onClickWorkbookMenuItem,
         userDetails
      } = this.props
      const { shouldShowWelcomeMessage } = this.welcomeMessageUIStore
      const { name, isFirstTime } = userDetails
      return isFirstTime ? (
         shouldShowWelcomeMessage ? (
            <UserWelcomeGreetings userName={name} />
         ) : null
      ) : (
         <StarredFoldersAndPinnedWorkbooks
            getPinnedWorkbooksAndStarredFoldersAPIStatus={
               getPinnedWorkbooksAndStarredFoldersAPIStatus
            }
            getPinnedWorkbooksAndStarredFoldersAPIError={
               getPinnedWorkbooksAndStarredFoldersAPIError
            }
            pinnedWorkbooks={pinnedWorkbooks}
            starredFolders={starredFolders}
            doNetworkCallForStarredFoldersAndPinnedWorkbooks={
               doNetworkCallForStarredFoldersAndPinnedWorkbooks
            }
            onDoubleClickWorkbook={onDoubleClickWorkbook}
            onDoubleClickFolder={onDoubleClickFolder}
            onClickFolderMenuItem={onClickFolderMenuItem}
            onClickWorkbookMenuItem={onClickWorkbookMenuItem}
         />
      )
   }

   renderContentBasedOnDevice = () => {
      const {
         getWorkbooksAndFoldersAPIStatus,
         getWorkbooksAndFoldersAPIError,
         workbooks,
         folders,
         onChangeOrder,
         pathInfo,
         doNetworkCallForFoldersAndWorkbooks,
         onDoubleClickWorkbook,
         getRootFolderDetailsAPIStatus,
         getRootFolderDetailsAPIError,
         getRootFolderDetails,
         onDoubleClickFolder,
         onClickFolderMenuItem,
         onClickWorkbookMenuItem,
         userDetails: { isFirstTime, name }
      } = this.props
      const { shouldShowWelcomeMessage } = this.welcomeMessageUIStore
      if (isMobileDevice) {
         return (
            <>
               {isFirstTime ? (
                  shouldShowWelcomeMessage ? (
                     <UserWelcomeGreetings userName={name} />
                  ) : null
               ) : (
                  <>
                     {shouldShowWelcomeMessage ? (
                        <WelcomeMessageContainer>
                           <WelcomeBackMessage>
                              {this.welcomeBackMessage()}
                           </WelcomeBackMessage>
                        </WelcomeMessageContainer>
                     ) : null}
                     <TabBar
                        tabsList={tabsList}
                        onClickTab={this.onChangeTab}
                        defaultSelectedTab={ALL}
                        containerCSS={TabBarContainer}
                        tabContainerCSS={TabContainerCSS}
                     />
                  </>
               )}
               {this.renderTabContent()}
            </>
         )
      }
      return (
         <>
            {this.renderStarredFoldersAndPinnedWorkbooks()}
            <UserWorkbooksAndFolders
               renderLoadingView={this.renderLoadingView}
               getWorkbooksAndFoldersAPIStatus={getWorkbooksAndFoldersAPIStatus}
               getWorkbooksAndFoldersAPIError={getWorkbooksAndFoldersAPIError}
               pathInfo={pathInfo}
               onChangeOrder={onChangeOrder}
               userWorkbooks={workbooks}
               userFolders={folders}
               doNetworkCallForFoldersAndWorkbooks={
                  doNetworkCallForFoldersAndWorkbooks
               }
               onDoubleClickWorkbook={onDoubleClickWorkbook}
               getRootFolderDetailsAPIStatus={getRootFolderDetailsAPIStatus}
               getRootFolderDetailsAPIError={getRootFolderDetailsAPIError}
               getRootFolderDetails={getRootFolderDetails}
               onDoubleClickFolder={onDoubleClickFolder}
               onClickFolderMenuItem={onClickFolderMenuItem}
               onClickWorkbookMenuItem={onClickWorkbookMenuItem}
            />
         </>
      )
   }
   render(): ReactNode {
      return (
         <>
            {this.renderFilterBar()}
            <Container>{this.renderContentBasedOnDevice()}</Container>
         </>
      )
   }
}

export default withTranslation()(FolderManagementDashBoard)
