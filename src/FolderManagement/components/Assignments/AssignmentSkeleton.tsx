import React, { Component } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { withTranslation } from 'react-i18next'

import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import HomeLoadingSkeleton from '../../../Common/components/HomeLoadingSkeleton/HomeLoadingSkeleton'

import { RowContainerSkeleton } from '../AssignmentsTable/styledComponents'
import AssignmentsTabBar from '../AssignmentsTabBar'
import { activeAssignmentsTableHeader } from '../Assignments/constants'
import ActiveAssignmentsTableHeader from '../ActiveAssignmentsTableHeader'
import { NameAndIconContainer } from '../AssignmentNameWithIcon/styledComponents'
import { DateTimeContainer } from '../AssignmentsDatetime/styledComponents'
import { ResultContainer } from '../AssignmentProgressIndicator/styledComponents'
import { StatusContainer } from '../AssignmentsWorkbookStatus/styledComponents'

import { LoaderWrapper, WrapperCss } from './styledComponents'
interface WithTranslationProps {
   i18n: any
   tReady: any
   t: any
}
class AssignmentSkeleton extends Component<WithTranslationProps> {
   get circlesize() {
      return isMobileDevice ? 30 : 50
   }

   get cellWidth() {
      return isMobileDevice ? 50 : 100
   }

   renderAssgnment = () => (
      <SkeletonTheme color={'#ddd'} highlightColor={'#aaa'}>
         <RowContainerSkeleton>
            <NameAndIconContainer>
               <Skeleton height={this.circlesize} width={this.circlesize} />
            </NameAndIconContainer>
            <DateTimeContainer>
               <Skeleton width={this.cellWidth} />
            </DateTimeContainer>
            <ResultContainer>
               <Skeleton width={this.cellWidth} />
            </ResultContainer>
            <DateTimeContainer>
               <Skeleton width={this.cellWidth} />
            </DateTimeContainer>
            <StatusContainer>
               <Skeleton width={this.cellWidth} />
            </StatusContainer>
         </RowContainerSkeleton>
      </SkeletonTheme>
   )

   renderHeaderData = () =>
      isMobileDevice ? null : (
         <RowContainerSkeleton>
            <ActiveAssignmentsTableHeader
               labels={activeAssignmentsTableHeader}
            />
         </RowContainerSkeleton>
      )
   render() {
      const { t } = this.props
      return (
         <>
            <AssignmentsTabBar
               selectedTab={''}
               onClickAssignmentsTab={() => {}}
            />
            <LoaderWrapper>
               {this.renderHeaderData()}
               <HomeLoadingSkeleton
                  WrapperCss={WrapperCss}
                  count={8}
                  skeletongridItem={this.renderAssgnment()}
               />
            </LoaderWrapper>
         </>
      )
   }
}

export default withTranslation()(AssignmentSkeleton)
