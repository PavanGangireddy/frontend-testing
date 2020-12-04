import React, { ReactElement } from 'react'

import {
   AssignmentDateTimeLabelContainer,
   AssignmentLabelText,
   AssignmentNameLabelContainer,
   AssignmentScoreLabelContainer
} from '../Assignments/styledComponents'

interface CompletedAssignmentsTableHeaderProps {
   labels
}

function CompletedAssignmentsTableHeader(
   props: CompletedAssignmentsTableHeaderProps
): ReactElement {
   const {
      labels: { assignments, submittedOn, score }
   } = props
   return (
      <>
         <AssignmentNameLabelContainer>
            <AssignmentLabelText>{assignments}</AssignmentLabelText>
         </AssignmentNameLabelContainer>
         <AssignmentDateTimeLabelContainer>
            <AssignmentLabelText>{submittedOn}</AssignmentLabelText>
         </AssignmentDateTimeLabelContainer>
         <AssignmentScoreLabelContainer>
            <AssignmentLabelText>{score}</AssignmentLabelText>
         </AssignmentScoreLabelContainer>
      </>
   )
}

export default CompletedAssignmentsTableHeader
