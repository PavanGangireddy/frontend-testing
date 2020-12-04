import React, { Component } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { isMobileDevice } from '../../../../Common/utils/responsiveUtils'
import IconContainer from '../../../../Common/components/IconContainer'
import { WorkBookName } from '../WorkbookGridItem/styledComponents'
import { UnStarredFolderGridItemContainer } from './styledComponents'

class UnStarredFolderSkeleton extends Component {
   get circlesize() {
      return isMobileDevice ? 40 : 60
   }
   render() {
      return (
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
   }
}

export default UnStarredFolderSkeleton
