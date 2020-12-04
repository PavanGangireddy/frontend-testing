import React, { lazy } from 'react'

import {
   HOME_SCREEN_PATH,
   HOME_SCREEN
} from '../../Common/constants/NavigationConstants'
import withLocationPathAsKey from '../../Common/hocs/withLocationPathAsKey'
import { ProtectedRoute } from '../../Common/utils/RouteUtils'

import {
   ACTIVE_FOLDER_PATH,
   ACTIVE_SCREEN,
   SHARED_WITH_ME_PATH,
   SHARED_WITH_ME_SCREEN,
   TRASH_PATH,
   TRASH_SCREEN,
   PUBLISH_DASHBOARD_SCREEN,
   PUBLISH_DASHBOARD_PATH,
   ASSIGNMENTS_PATH,
   ASSIGNMENTS_SCREEN,
   LEARNINGS_PATH,
   LEARNINGS_SCREEN,
   PERSONAL_PROJECTS_SCREEN,
   PERSONAL_PROJECTS_PATH
} from '../constants/NavigationConstants'

const folderManagementDashBoardRoute = lazy(() =>
   import('./FolderManagementRoute')
)
const activeFolderRoute = lazy(() => import('./ActiveFolderRoute'))
const sharedWithMeFolderRoute = lazy(() => import('./SharedWithMeFolderRoute'))
const trashFolderRoute = lazy(() => import('./TrashFolderRoute'))
const publishDashboardRoute = lazy(() => import('./PublishDashboardRoute'))
const assignmentsFolderRoute = lazy(() => import('./AssignmentsFolderRoute'))
const learningsFolderRoute = lazy(() => import('./LearningsFolderRoute'))
const personalProjectsRoute = lazy(() => import('./PersonalProjectsRoute'))

const folderManagementRoutes = [
   <ProtectedRoute
      exact
      path={HOME_SCREEN_PATH}
      key={HOME_SCREEN}
      component={folderManagementDashBoardRoute}
   />,
   <ProtectedRoute
      exact
      path={ACTIVE_FOLDER_PATH}
      key={ACTIVE_SCREEN}
      component={withLocationPathAsKey(activeFolderRoute)}
   />,
   <ProtectedRoute
      exact
      path={SHARED_WITH_ME_PATH}
      key={SHARED_WITH_ME_SCREEN}
      component={sharedWithMeFolderRoute}
   />,
   <ProtectedRoute
      exact
      path={TRASH_PATH}
      key={TRASH_SCREEN}
      component={trashFolderRoute}
   />,
   <ProtectedRoute
      exact
      path={PUBLISH_DASHBOARD_PATH}
      key={PUBLISH_DASHBOARD_SCREEN}
      component={publishDashboardRoute}
   />,
   <ProtectedRoute
      exact
      path={ASSIGNMENTS_PATH}
      key={ASSIGNMENTS_SCREEN}
      component={assignmentsFolderRoute}
   />,
   <ProtectedRoute
      exact
      path={LEARNINGS_PATH}
      key={LEARNINGS_SCREEN}
      component={learningsFolderRoute}
   />,
   <ProtectedRoute
      exact
      path={PERSONAL_PROJECTS_PATH}
      key={PERSONAL_PROJECTS_SCREEN}
      component={personalProjectsRoute}
   />
]

export default folderManagementRoutes
