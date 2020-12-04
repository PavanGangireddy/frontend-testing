import React, { Component, ReactNode } from 'react'

import MobileAssignmentRow from '../MobileAssignmentRow'

interface MobileUpcomingAssignmentRowProps {
   data
}
class MobileUpcomingAssignmentRow extends Component<
   MobileUpcomingAssignmentRowProps
> {
   render(): ReactNode {
      const {
         data: { name, availableOn }
      } = this.props
      return (
         <MobileAssignmentRow assignmentName={name} dateAndTime={availableOn} />
      )
   }
}

export default MobileUpcomingAssignmentRow
