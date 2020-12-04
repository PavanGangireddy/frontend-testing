import React, { Component } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { withTranslation } from 'react-i18next'

import IconContainer from '../../../Common/components/IconContainer'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import HomeLoadingSkeleton from '../../../Common/components/HomeLoadingSkeleton/HomeLoadingSkeleton'

import { FolderAndFilesSkeletonCard } from '../common/FoldersAndFilesSkeleton/styledComponents'
import { WorkBookName } from '../common/WorkbookGridItem/styledComponents'

import { SubContainer, Title, Workbooks } from './styledComponents'
interface WithTranslationProps {
   i18n: any
   tReady: any
   t: any
}
class LearningsSkeleton extends Component<WithTranslationProps> {
   renderLearning = () => (
      <SkeletonTheme color={'#ddd'} highlightColor={'#aaa'}>
         <FolderAndFilesSkeletonCard>
            <IconContainer>
               <Skeleton height={this.circlesize} width={this.circlesize} />
            </IconContainer>
            <WorkBookName>
               <Skeleton width={100} />
            </WorkBookName>
         </FolderAndFilesSkeletonCard>
      </SkeletonTheme>
   )
   get circlesize() {
      return isMobileDevice ? 30 : 50
   }
   render() {
      const { t } = this.props
      return (
         <>
            <SubContainer>
               <Title>{t('folderManagement:learning.learning')}</Title>
            </SubContainer>
            <Workbooks>
               <HomeLoadingSkeleton
                  count={8}
                  skeletongridItem={this.renderLearning()}
               />
            </Workbooks>
         </>
      )
   }
}

export default withTranslation()(LearningsSkeleton)
