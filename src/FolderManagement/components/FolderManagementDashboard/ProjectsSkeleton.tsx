import React, { Component } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { withTranslation } from 'react-i18next'

import IconContainer from '../../../Common/components/IconContainer'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import HomeLoadingSkeleton from '../../../Common/components/HomeLoadingSkeleton/HomeLoadingSkeleton'

import { WorkBookName } from '../common/WorkbookGridItem/styledComponents'

import { mobile } from '../../../Common/utils/MixinUtils'
import { StarredFolderAndFilesLabelText } from '../StarredFoldersAndPinnedWorkbooks/styledComponents'
import { WorkbooksAndFoldersContainer } from '../WorkbooksAndFolders/styledComponents'
import { UnStarredFolderGridItemContainer } from '../common/FolderGridItem/styledComponents'
import { Workbooks } from '../Learnings/styledComponents'
interface WithTranslationProps {
   i18n: any
   tReady: any
   t: any
}
class ProjectsSkeleton extends Component<WithTranslationProps> {
   renderProjects = () => (
      <SkeletonTheme color={'#ddd'} highlightColor={'#aaa'}>
         <UnStarredFolderGridItemContainer>
            <IconContainer>
               <Skeleton height={this.circlesize} width={this.circlesize} />
            </IconContainer>
            <WorkBookName>
               <Skeleton width={100} />
            </WorkBookName>
         </UnStarredFolderGridItemContainer>
      </SkeletonTheme>
   )
   get circlesize() {
      return isMobileDevice ? 30 : 50
   }
   render() {
      const { t } = this.props
      return (
         <WorkbooksAndFoldersContainer data-testid={'loader'}>
            {isMobileDevice ? null : (
               <StarredFolderAndFilesLabelText>
                  {t('folderManagement:home.yourProjects')}
               </StarredFolderAndFilesLabelText>
            )}
            <Workbooks>
               <HomeLoadingSkeleton skeletongridItem={this.renderProjects()} />
            </Workbooks>
         </WorkbooksAndFoldersContainer>
      )
   }
}

export default withTranslation()(ProjectsSkeleton)
