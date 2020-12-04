import React, { Component, ReactElement } from 'react'
import { observer } from 'mobx-react'

import { ACTIVE, COMPLETED, UPCOMING } from '../../constants/UIConstants'
import ActiveAssignmentWorkbook from '../../stores/models/ActiveAssignmentWorkbook'
import UpcomingAssignmentWorkbook from '../../stores/models/UpcomingAssignmentWorkbook'
import CompletedAssignmentWorkbook from '../../stores/models/CompletedAssignmentWorkbook'

import {
   activeAssignmentsTableHeader,
   completedAssignmentsTableHeader,
   upcomingAssignmentsTableHeader
} from '../Assignments/constants'
import AssignmentsTable from '../AssignmentsTable'
import ActiveAssignmentsTableHeader from '../ActiveAssignmentsTableHeader'
import UpcomingAssignmentsTableHeader from '../UpcomingAssignmentsTableHeader'
import CompletedAssignmentsTableHeader from '../CompletedAssignmentsTableHeader'
import ActiveAssignmentsRow from '../ActiveAssignmentsRow'
import UpcomingAssignmentsRow from '../UpcomingAssignmentsRow'
import CompletedAssignmentsRow from '../CompletedAssignmentsRow'

interface AssignmentsDesktopLayoutProps {
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
class AssignmentsDesktopLayout extends Component<
   AssignmentsDesktopLayoutProps
> {
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
               headerComponent: ActiveAssignmentsTableHeader,
               rowComponent: ActiveAssignmentsRow,
               headerData: activeAssignmentsTableHeader,
               rows: assignments.get(ACTIVE),
               onClickWorkbook: openActiveAssignmentWorkbook
            }
         case UPCOMING:
            return {
               headerComponent: UpcomingAssignmentsTableHeader,
               rowComponent: UpcomingAssignmentsRow,
               headerData: upcomingAssignmentsTableHeader,
               rows: assignments.get(UPCOMING),
               onClickWorkbook: onClickUpcomingAssignmentWorkbook
            }
         case COMPLETED:
            return {
               headerComponent: CompletedAssignmentsTableHeader,
               rowComponent: CompletedAssignmentsRow,
               headerData: completedAssignmentsTableHeader,
               rows: assignments.get(COMPLETED),
               onClickWorkbook: onClickCompletedAssignmentWorkbook
            }
         default:
            return {
               headerComponent: ActiveAssignmentsTableHeader,
               rowComponent: ActiveAssignmentsRow,
               headerData: activeAssignmentsTableHeader,
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

export default AssignmentsDesktopLayout
