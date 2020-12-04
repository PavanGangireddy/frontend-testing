import { History } from 'history'

import { HOME_SCREEN_PATH } from '../../../Common/constants/NavigationConstants'
import { ASSIGNMENT_WORKBOOK_PREFIX } from '../../../WorkbookManagement/constants/NavigationConstants'

import {
   ACTIVE_FOLDER_PREFIX,
   WORKBOOK_PAGE_PREFIX,
   SHARED_WITH_ME_PATH,
   TRASH_PATH,
   ASSIGNMENTS_PATH,
   PUBLISH_DASHBOARD_PATH,
   LEARNINGS_PATH,
   USER_PROFILE_PATH,
   PERSONAL_PROJECTS_PATH
} from '../../constants/NavigationConstants'

export function goToWorkbookPage(
   history: History,
   folderId,
   workbookId: string
): void {
   history.push(
      `${ACTIVE_FOLDER_PREFIX}${folderId}${WORKBOOK_PAGE_PREFIX}${workbookId}`
   )
}

export function goToHome(history: History) {
   history.push(HOME_SCREEN_PATH)
}

export function goToSharedWithMeScreen(history: History) {
   history.push(SHARED_WITH_ME_PATH)
}

export function goToFolder(
   history: History,
   folderId: string,
   fromSharedWithMe = false
): void {
   const location = {
      pathname: `${ACTIVE_FOLDER_PREFIX}${folderId}`,
      state: { fromSharedWithMe }
   }
   history.push(location)
}

export function goToTrashFolder(history: History) {
   history.push(TRASH_PATH)
}

export function goToAssignmentsFolder(history: History) {
   history.push(ASSIGNMENTS_PATH)
}

export function goToPublishDashboard(history: History) {
   history.push(PUBLISH_DASHBOARD_PATH)
}

export function goToLearningsFolder(history: History) {
   history.push(LEARNINGS_PATH)
}

export const goToUserProfile = () => {
   window.open(USER_PROFILE_PATH)
}

export function goToAssignmentWorkbook(history: History, workbookId: string) {
   history.push(`${ASSIGNMENT_WORKBOOK_PREFIX}${workbookId}`)
}

export function goToPage(history: History, path: string) {
   history.push(path)
}

export function goToPersonalProjects(history: History) {
   history.push(PERSONAL_PROJECTS_PATH)
}
