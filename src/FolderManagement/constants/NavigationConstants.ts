import Config from '../../Common/constants/EnvironmentConstants'

const USER_ACCOUNTS_BASE_URL = Config.USER__ACCOUNTS_BASE_URL

export const WORKBOOK_PAGE_PREFIX = '/workbook/'
export const WORKBOOK_PAGE_PATH = `${WORKBOOK_PAGE_PREFIX}:workbookId`
export const WORKBOOK_PAGE_SCREEN = 'workbook-page-screen'
export const ACTIVE_FOLDER_PREFIX = '/folder-management/'
export const ACTIVE_FOLDER_PATH = `${ACTIVE_FOLDER_PREFIX}:folderId`
export const ACTIVE_SCREEN = 'active-screen'
export const SHARED_WITH_ME_PATH = '/shared-with-me/'
export const SHARED_WITH_ME_SCREEN = 'shared-with-me-screen'
export const TRASH_PATH = '/trash/'
export const TRASH_SCREEN = 'trash-screen'
export const PUBLISH_DASHBOARD_PATH = '/publish/'
export const PUBLISH_DASHBOARD_SCREEN = 'trash-screen'
export const ASSIGNMENTS_PATH = '/assignments/'
export const ASSIGNMENTS_SCREEN = 'assignments-screen'
export const LEARNINGS_PATH = '/learnings/'
export const LEARNINGS_SCREEN = 'learnings-screen'
export const USER_PROFILE_PATH = `${USER_ACCOUNTS_BASE_URL}/profile`
export const PERSONAL_PROJECTS_SCREEN = 'personal-projects-screen'
export const PERSONAL_PROJECTS_PATH = `/personal-projects/`
