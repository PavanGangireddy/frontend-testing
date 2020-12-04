import React, { lazy } from 'react'

import { ProtectedRoute } from '../../Common/utils/RouteUtils'

import {
   WORKBOOK_DETAILS_SCREEN,
   WORKBOOK_DETAILS_SCREEN_PATH,
   ASSIGNMENT_WORKBOOK_PATH,
   ASSIGNMENT_WORKBOOK_SCREEN
} from '../constants/NavigationConstants'

import WorkbookHomeRoute from './WorkbookHomeRoute'
const assignmentWorkbookRoute = lazy(() => import('./AssignmentWorkbookRoute'))

const routes = [
   <ProtectedRoute
      exact
      key={WORKBOOK_DETAILS_SCREEN}
      path={WORKBOOK_DETAILS_SCREEN_PATH}
      component={WorkbookHomeRoute}
   />,
   <ProtectedRoute
      exact
      key={ASSIGNMENT_WORKBOOK_SCREEN}
      path={ASSIGNMENT_WORKBOOK_PATH}
      component={assignmentWorkbookRoute}
   />
]

export default routes
