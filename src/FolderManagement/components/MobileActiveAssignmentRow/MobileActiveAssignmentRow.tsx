import React, { Component, ReactNode } from 'react'

import MobileAssignmentRow from '../MobileAssignmentRow'
import ProgressIndicatorWithScore from '../ProgressIndicatorWithScore'

import {
   EmptyCell,
   MobileActiveAssignmentRowContainer,
   progressIndicatorContainerCss,
   RightSection
} from './styledComponents'

interface MobileActiveAssignmentRowProps {
   data
}
class MobileActiveAssignmentRow extends Component<
   MobileActiveAssignmentRowProps
> {
   render(): ReactNode {
      const {
         data: { name, deadline, status, userSecuredScore, totalScore }
      } = this.props
      return (
         <MobileActiveAssignmentRowContainer>
            <MobileAssignmentRow
               assignmentName={name}
               dateAndTime={deadline}
               status={status}
            />
            <RightSection>
               {userSecuredScore !== null && totalScore !== null ? (
                  <ProgressIndicatorWithScore
                     securedScore={userSecuredScore}
                     totalScore={totalScore}
                     progressIndicatorContainerCss={
                        progressIndicatorContainerCss
                     }
                  />
               ) : (
                  <EmptyCell>-</EmptyCell>
               )}
            </RightSection>
         </MobileActiveAssignmentRowContainer>
      )
   }
}

export default MobileActiveAssignmentRow
