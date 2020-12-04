import React, { ReactElement } from 'react'

import AssignmentNameWithIcon from '../AssignmentNameWithIcon'
import AssignmentProgressIndicator from '../AssignmentProgressIndicator'
import AssignmentsDatetime from '../AssignmentsDatetime'

interface CompletedAssignmentsRowProps {
   data
}

function CompletedAssignmentsRow(
   props: CompletedAssignmentsRowProps
): ReactElement {
   const {
      data: { name, userSecuredScore, totalScore, submittedDatetime }
   } = props
   return (
      <>
         <AssignmentNameWithIcon workbookName={name} />
         <AssignmentsDatetime dateTime={submittedDatetime} />
         <AssignmentProgressIndicator
            userSecuredScore={userSecuredScore}
            totalScore={totalScore}
         />
      </>
   )
}

export default CompletedAssignmentsRow
