import React, { ReactElement } from 'react'

import {
   AssignmentDateTimeLabelContainer,
   AssignmentLabelText,
   AssignmentNameLabelContainer,
   AssignmentScoreLabelContainer,
   AssignmentStatusLabelContainer
} from '../Assignments/styledComponents'

interface ActiveAssignmentsTableHeaderProps {
   labels
}

function ActiveAssignmentsTableHeader(
   props: ActiveAssignmentsTableHeaderProps
): ReactElement {
   const {
      labels: { assignments, deadline, score, submittedDateAndTime, status }
   } = props
   return (
      <>
         <AssignmentNameLabelContainer>
            <AssignmentLabelText>{assignments}</AssignmentLabelText>
         </AssignmentNameLabelContainer>
         <AssignmentDateTimeLabelContainer>
            <AssignmentLabelText>{deadline}</AssignmentLabelText>
         </AssignmentDateTimeLabelContainer>
         <AssignmentScoreLabelContainer>
            <AssignmentLabelText>{score}</AssignmentLabelText>
         </AssignmentScoreLabelContainer>
         <AssignmentDateTimeLabelContainer>
            <AssignmentLabelText>{submittedDateAndTime}</AssignmentLabelText>
         </AssignmentDateTimeLabelContainer>
         <AssignmentStatusLabelContainer>
            <AssignmentLabelText>{status}</AssignmentLabelText>
         </AssignmentStatusLabelContainer>
      </>
   )
}

export default ActiveAssignmentsTableHeader
