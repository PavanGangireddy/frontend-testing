import React, { Component, ReactNode } from 'react'
import { withTranslation } from 'react-i18next'

import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import HomeLoadingSkeleton from '../../../Common/components/HomeLoadingSkeleton/HomeLoadingSkeleton'
import FolderAndFilesSkeleton from '../common/FoldersAndFilesSkeleton/FolderAndFilesSkeleton'
import {
   StarredFoldersAndFilesHeader,
   StarredFolderAndFilesLabelText,
   StarredFoldersAndFiles
} from './styledComponents'

interface WithTranslationProps {
   i18n: any
   tReady: any
   t: any
}
class StarredFolderAndPinnedWorkBooksSkeleton extends Component<
   WithTranslationProps
> {
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
   render() {
      return (
         <>
            {this.renderStarredFoldersAndFilesLabel()}
            <StarredFoldersAndFiles data-testid={'loader'}>
               <HomeLoadingSkeleton
                  skeletongridItem={<FolderAndFilesSkeleton />}
               />
            </StarredFoldersAndFiles>
         </>
      )
   }
}

export default withTranslation()(StarredFolderAndPinnedWorkBooksSkeleton)
