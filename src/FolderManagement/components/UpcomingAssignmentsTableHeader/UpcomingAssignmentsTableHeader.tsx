import React, { ReactElement } from 'react'

import {
   AssignmentDateTimeLabelContainer,
   AssignmentLabelText,
   AssignmentNameLabelContainer
} from '../Assignments/styledComponents'

interface UpcomingAssignmentsTableHeaderProps {
   labels
}

function UpcomingAssignmentsTableHeader(
   props: UpcomingAssignmentsTableHeaderProps
): ReactElement {
   const {
      labels: { assignments, availableOn, deadline }
   } = props
   return (
      <>
         <AssignmentNameLabelContainer>
            <AssignmentLabelText>{assignments}</AssignmentLabelText>
         </AssignmentNameLabelContainer>
         <AssignmentDateTimeLabelContainer>
            <AssignmentLabelText>{availableOn}</AssignmentLabelText>
         </AssignmentDateTimeLabelContainer>
         <AssignmentDateTimeLabelContainer>
            <AssignmentLabelText>{deadline}</AssignmentLabelText>
         </AssignmentDateTimeLabelContainer>
      </>
   )
}

export default UpcomingAssignmentsTableHeader
