import React, { ReactElement } from 'react'

import AssignmentNameWithIcon from '../AssignmentNameWithIcon'
import AssignmentsDatetime from '../AssignmentsDatetime'

interface UpcomingAssignmentsRowProps {
   data
}

function UpcomingAssignmentsRow(
   props: UpcomingAssignmentsRowProps
): ReactElement {
   const {
      data: { name, availableOn, deadline }
   } = props
   return (
      <>
         <AssignmentNameWithIcon workbookName={name} />
         <AssignmentsDatetime dateTime={availableOn} />
         <AssignmentsDatetime dateTime={deadline} />
      </>
   )
}

export default UpcomingAssignmentsRow
