import React, { ReactElement } from 'react'

import DateAndTimeLabel from '../../../Common/components/DateAndTimeLabel'
import StatusLabel from '../../../Common/components/StatusLabel'
import AssignmentIconClipBoardVariant from '../../../Common/icons/AssignmentIconClipBoardVariant'

import { ASSIGNMENTS_DATE_TIME_FORMAT } from '../Assignments/constants'

import {
   AssignmentContainer,
   IconWrapper,
   Details,
   AssignmentName,
   SubContainer,
   DateTimeLabelTypo
} from './styledComponents'

function MobileAssignmentRow(props: any): ReactElement {
   const { dateAndTime, assignmentName, status } = props

   const renderDateAndTime = () =>
      dateAndTime ? (
         <DateAndTimeLabel
            dateAndTime={dateAndTime}
            labelTypo={DateTimeLabelTypo}
            format={ASSIGNMENTS_DATE_TIME_FORMAT}
         />
      ) : (
         '-'
      )

   return (
      <AssignmentContainer>
         <IconWrapper>
            <AssignmentIconClipBoardVariant width={32} height={32} />
         </IconWrapper>
         <Details>
            <AssignmentName>{assignmentName}</AssignmentName>
            <SubContainer>
               {renderDateAndTime()}
               {status ? <StatusLabel status={status} /> : null}
            </SubContainer>
         </Details>
      </AssignmentContainer>
   )
}

export default MobileAssignmentRow

MobileAssignmentRow.defaultProps = {
   status: null
}
