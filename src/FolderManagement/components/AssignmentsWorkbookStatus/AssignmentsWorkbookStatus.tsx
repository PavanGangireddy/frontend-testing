import React, { ReactElement } from 'react'
import StatusLabel from '../../../Common/components/StatusLabel'
import { StatusContainer } from './styledComponents'

interface AssignmentsWorkbookStatusProps {
   status: string
}

function AssignmentsWorkbookStatus(
   props: AssignmentsWorkbookStatusProps
): ReactElement {
   const { status } = props

   return (
      <StatusContainer>
         <StatusLabel status={status} />
      </StatusContainer>
   )
}

export default AssignmentsWorkbookStatus
