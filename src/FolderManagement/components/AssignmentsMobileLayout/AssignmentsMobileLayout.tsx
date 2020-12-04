import React, { Component, ReactElement } from 'react'
import { observer } from 'mobx-react'

import { ACTIVE, COMPLETED, UPCOMING } from '../../constants/UIConstants'
import ActiveAssignmentWorkbook from '../../stores/models/ActiveAssignmentWorkbook'
import UpcomingAssignmentWorkbook from '../../stores/models/UpcomingAssignmentWorkbook'
import CompletedAssignmentWorkbook from '../../stores/models/CompletedAssignmentWorkbook'

import MobileActiveAssignmentRow from '../MobileActiveAssignmentRow'
import MobileUpcomingAssignmentRow from '../MobileUpcomingAssignmentRow'
import MobileCompletedAssignmentRow from '../MobileCompletedAssignmentRow'
import AssignmentsTable from '../AssignmentsTable'

interface AssignmentsMobileLayoutProps {
   selectedTab: string
   assignments: Map<
      string,
      | Array<
           | ActiveAssignmentWorkbook
           | UpcomingAssignmentWorkbook
           | CompletedAssignmentWorkbook
        >
      | string
   >
   openActiveAssignmentWorkbook: (id: string, workbookStatus: string) => void
   onClickUpcomingAssignmentWorkbook: (id: string) => void
   onClickCompletedAssignmentWorkbook: (id: string) => void
}

@observer
class AssignmentsMobileLayout extends Component<AssignmentsMobileLayoutProps> {
   // TODO: Need to add return type
   getActiveTabAssignmentWorkbooksData = () => {
      const {
         selectedTab,
         assignments,
         openActiveAssignmentWorkbook,
         onClickUpcomingAssignmentWorkbook,
         onClickCompletedAssignmentWorkbook
      } = this.props
      switch (selectedTab) {
         case ACTIVE:
            return {
               headerComponent: null,
               rowComponent: MobileActiveAssignmentRow,
               headerData: {},
               rows: assignments.get(ACTIVE),
               onClickWorkbook: openActiveAssignmentWorkbook
            }
         case UPCOMING:
            return {
               headerComponent: null,
               rowComponent: MobileUpcomingAssignmentRow,
               headerData: {},
               rows: assignments.get(UPCOMING),
               onClickWorkbook: onClickUpcomingAssignmentWorkbook
            }
         case COMPLETED:
            return {
               headerComponent: null,
               rowComponent: MobileCompletedAssignmentRow,
               headerData: {},
               rows: assignments.get(COMPLETED),
               onClickWorkbook: onClickCompletedAssignmentWorkbook
            }
         default:
            return {
               headerComponent: null,
               rowComponent: MobileActiveAssignmentRow,
               headerData: {},
               rows: assignments.get(ACTIVE),
               onClickWorkbook: openActiveAssignmentWorkbook
            }
      }
   }

   render(): ReactElement {
      const {
         headerComponent,
         rowComponent,
         ...activeTabAssignmentWorkbooksData
      } = this.getActiveTabAssignmentWorkbooksData()
      return (
         <AssignmentsTable
            headerComponent={headerComponent}
            rowComponent={rowComponent}
            data={activeTabAssignmentWorkbooksData}
         />
      )
   }
}

export default AssignmentsMobileLayout
