import React, { Component } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import IconContainer from '../../../../Common/components/IconContainer'
import { isMobileDevice } from '../../../../Common/utils/responsiveUtils'
import { WorkBookName } from '../WorkbookGridItem/styledComponents'
import { FolderAndFilesSkeletonCard } from './styledComponents'

class FolderAndFilesSkeleton extends Component {
   get circlesize() {
      return isMobileDevice ? 30 : 50
   }
   render() {
      return (
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
   }
}

export default FolderAndFilesSkeleton
