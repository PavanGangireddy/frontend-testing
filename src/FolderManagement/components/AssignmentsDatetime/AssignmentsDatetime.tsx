import React, { ReactElement } from 'react'

import DateAndTimeLabel from '../../../Common/components/DateAndTimeLabel'

import { ASSIGNMENTS_DATE_TIME_FORMAT } from '../Assignments/constants'

import { DateTimeContainer, EmptyCell } from './styledComponents'

interface AssignmentsDatetimeProps {
   dateTime: string
}

function AssignmentsDatetime(props: AssignmentsDatetimeProps): ReactElement {
   const { dateTime } = props

   return (
      <DateTimeContainer>
         {dateTime ? (
            <DateAndTimeLabel
               dateAndTime={dateTime}
               format={ASSIGNMENTS_DATE_TIME_FORMAT}
            />
         ) : (
            <EmptyCell>-</EmptyCell>
         )}
      </DateTimeContainer>
   )
}

export default AssignmentsDatetime
