import React, { ReactElement } from 'react'

import AssignmentNameWithIcon from '../AssignmentNameWithIcon'
import AssignmentProgressIndicator from '../AssignmentProgressIndicator'
import AssignmentsDatetime from '../AssignmentsDatetime'
import AssignmentsWorkbookStatus from '../AssignmentsWorkbookStatus'

interface ActiveAssignmentsRowProps {
   data
}

function ActiveAssignmentsRow(props: ActiveAssignmentsRowProps): ReactElement {
   const {
      data: {
         name,
         deadline,
         userSecuredScore,
         totalScore,
         submittedDatetime,
         status
      }
   } = props
   return (
      <>
         <AssignmentNameWithIcon workbookName={name} />
         <AssignmentsDatetime dateTime={deadline} />
         <AssignmentProgressIndicator
            userSecuredScore={userSecuredScore}
            totalScore={totalScore}
         />
         <AssignmentsDatetime dateTime={submittedDatetime} />
         <AssignmentsWorkbookStatus status={status} />
      </>
   )
}

export default ActiveAssignmentsRow
