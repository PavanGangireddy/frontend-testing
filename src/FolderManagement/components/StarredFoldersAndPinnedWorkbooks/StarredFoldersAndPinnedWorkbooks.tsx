import React, { Component, ReactNode, ReactElement } from 'react'
import { observer } from 'mobx-react'
import { APIStatus } from '@ib/api-constants'
import { withTranslation } from 'react-i18next'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import { WithTranslation } from '../../../Common/types'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

import { STARRED_FOLDERS } from '../../constants/UIConstants'

import PinnedWorkbooks from '../PinnedWorkbooks'
import StarredFolders from '../StarredFolders'
import EmptyStarredFolderAndFiles from '../EmptyStarredFolderAndFiles'

import {
   loaderContainerClassName,
   StarredFolderAndFilesLabelText,
   StarredFoldersAndFiles,
   StarredFoldersAndFilesContainer,
   StarredFoldersAndFilesHeader
} from './styledComponents'
import StarredFolderAndPinnedWorkBooksSkeleton from './StarredFolderAndPinnedWorkBooksSkeleton'

export interface FoldersAndWorkbooksDataProps {
   name: string
   id: string
   isPublishedByUs: boolean
}

interface StarredFoldersAndPinnedWorkbooksProps extends WithTranslation {
   getPinnedWorkbooksAndStarredFoldersAPIStatus: APIStatus
   pinnedWorkbooks: Array<FoldersAndWorkbooksDataProps>
   starredFolders: Array<FoldersAndWorkbooksDataProps>
   getPinnedWorkbooksAndStarredFoldersAPIError: any
   doNetworkCallForStarredFoldersAndPinnedWorkbooks: () => void
   onDoubleClickWorkbook: (workbookId: string) => void
   onDoubleClickFolder: (folderId: string) => void
   onClickFolderMenuItem: (folderId: string, clickedItem: string) => void
   onClickWorkbookMenuItem: (workbookId: string, clickedItem: string) => void
   currentTab?: string
}

@observer
class StarredFoldersAndPinnedWorkbooks extends Component<
   StarredFoldersAndPinnedWorkbooksProps
> {
   renderMobileOrDesktopStarredFolderAndFiles = (): ReactNode => {
      const {
         currentTab,
         pinnedWorkbooks,
         starredFolders,
         onDoubleClickWorkbook,
         onDoubleClickFolder,
         onClickFolderMenuItem,
         onClickWorkbookMenuItem
      } = this.props
      if (currentTab === STARRED_FOLDERS) {
         return (
            <StarredFoldersAndFiles>
               <StarredFolders
                  starredFolders={starredFolders}
                  onDoubleClickFolder={onDoubleClickFolder}
                  onClickFolderMenuItem={onClickFolderMenuItem}
               />
               <PinnedWorkbooks
                  pinnedWorkbooks={pinnedWorkbooks}
                  onDoubleClickWorkbook={onDoubleClickWorkbook}
                  onClickWorkbookMenuItem={onClickWorkbookMenuItem}
               />
            </StarredFoldersAndFiles>
         )
      }
      return (
         <StarredFoldersAndFiles>
            <PinnedWorkbooks
               pinnedWorkbooks={pinnedWorkbooks}
               onDoubleClickWorkbook={onDoubleClickWorkbook}
               onClickWorkbookMenuItem={onClickWorkbookMenuItem}
            />
            <StarredFolders
               starredFolders={starredFolders}
               onDoubleClickFolder={onDoubleClickFolder}
               onClickFolderMenuItem={onClickFolderMenuItem}
            />
         </StarredFoldersAndFiles>
      )
   }

   renderStarredFoldersAndFilesLabel = (): ReactNode => {
      const { t } = this.props
      return isMobileDevice ? null : (
         <StarredFoldersAndFilesHeader>
            <StarredFolderAndFilesLabelText>
               {t('folderManagement:home.starredFoldersAndFiles')}
            </StarredFolderAndFilesLabelText>
         </StarredFoldersAndFilesHeader>
      )
   }

   renderStarredFoldersAndPinnedWorkbooks = observer(
      (): ReactElement => {
         const { pinnedWorkbooks, starredFolders } = this.props
         return (
            <StarredFoldersAndFilesContainer>
               {this.renderStarredFoldersAndFilesLabel()}
               {pinnedWorkbooks.length === 0 && starredFolders.length === 0 ? (
                  <EmptyStarredFolderAndFiles />
               ) : (
                  this.renderMobileOrDesktopStarredFolderAndFiles()
               )}
            </StarredFoldersAndFilesContainer>
         )
      }
   )

   renderLoadingView = () => <StarredFolderAndPinnedWorkBooksSkeleton />

   render(): ReactNode {
      const {
         getPinnedWorkbooksAndStarredFoldersAPIStatus,
         getPinnedWorkbooksAndStarredFoldersAPIError,
         doNetworkCallForStarredFoldersAndPinnedWorkbooks
      } = this.props
      return (
         <LoadingWrapper
            apiStatus={getPinnedWorkbooksAndStarredFoldersAPIStatus}
            apiError={getPinnedWorkbooksAndStarredFoldersAPIError}
            onRetry={doNetworkCallForStarredFoldersAndPinnedWorkbooks}
            renderSuccessUI={this.renderStarredFoldersAndPinnedWorkbooks}
            failureMessageTestId='starredFoldersAndPinnedWorkbooksfailureMessage'
            retryButtonTestId='starredFoldersAndPinnedWorkbooksRetryButton'
            loaderTestId='starredFoldersAndPinnedWorkbooksLoader'
            containerClassName={loaderContainerClassName}
            renderLoadingView={this.renderLoadingView}
         />
      )
   }
}

export default withTranslation()(StarredFoldersAndPinnedWorkbooks)
