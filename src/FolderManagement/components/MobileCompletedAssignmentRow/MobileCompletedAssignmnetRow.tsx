import React, { Component, ReactNode } from 'react'

import MobileAssignmentRow from '../MobileAssignmentRow'
import ProgressIndicatorWithScore from '../ProgressIndicatorWithScore'

import {
   EmptyCell,
   MobileCompletedAssignmentRowContainer,
   progressIndicatorContainerCss
} from './styledComponents'

interface MobileCompletedAssignmentRowProps {
   data
}
class MobileCompletedAssignmentRow extends Component<
   MobileCompletedAssignmentRowProps
> {
   render(): ReactNode {
      const {
         data: { name, submittedDatetime, userSecuredScore, totalScore, status }
      } = this.props
      return (
         <MobileCompletedAssignmentRowContainer>
            <MobileAssignmentRow
               assignmentName={name}
               dateAndTime={submittedDatetime}
               status={status}
            />
            {userSecuredScore !== null && totalScore !== null ? (
               <ProgressIndicatorWithScore
                  securedScore={userSecuredScore}
                  totalScore={totalScore}
                  progressIndicatorContainerCss={progressIndicatorContainerCss}
               />
            ) : (
               <EmptyCell>-</EmptyCell>
            )}
         </MobileCompletedAssignmentRowContainer>
      )
   }
}

export default MobileCompletedAssignmentRow
