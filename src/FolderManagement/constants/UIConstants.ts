import EditIcon from '../../Common/icons/EditIcon'
import GreyStarIcon from '../../Common/icons/GreyStarIcon'
import SendFillIcon from '../../Common/icons/SendFillIcon'
import DeleteIcon from '../../Common/icons/DeleteIcon'
import Colors from '../../Common/themes/Colors'
import RefreshIcon from '../../Common/icons/RefreshIcon'
import MoveToIcon from '../../Common/icons/MoveToIcon'
import { isMobileDevice } from '../../Common/utils/responsiveUtils'

export const popOverPlacements = {
   rightTop: 'rightTop',
   bottomLeft: 'bottomLeft'
}
export const FOLDER_NAME_MAX_LENGTH = 30
export const WORKBOOK_NAME_MAX_LENGTH = 25

export const itemsViewOptions = {
   GRID: 'GRID',
   LIST: 'LIST'
}

export const orderOptions = [
   { label: 'A to Z', value: 'ASC' },
   { label: 'Z to A', value: 'DESC' }
]

export const sharedWithMeSortOptions = [
   { label: 'Newest to Oldest', value: 'ASC' },
   { label: 'Oldest to Newest', value: 'DESC' }
]

export const PIN = 'pin'
export const UNPIN = 'un pin'
export const STAR_FOLDER = 'star folder'
export const REMOVE_FROM_STARRED = 'remove from starred'
export const SHARE = 'share'
export const MOVE_TO = 'move to'

export const folderMenuData = [
   {
      icon: GreyStarIcon,

      label: 'Remove from starred',
      value: REMOVE_FROM_STARRED,
      id: '0'
   },
   { icon: EditIcon, label: 'Rename', value: 'rename', id: '1' },
   {
      icon: SendFillIcon,
      label: 'Share',
      value: 'share',
      id: '3',
      hiddenInMobile: true
   },
   { icon: MoveToIcon, label: 'Move to', value: MOVE_TO, id: '4' },
   { icon: DeleteIcon, label: 'Delete', value: 'Delete', id: '6' }
]

export const projectMenuData = [
   folderMenuData[1],
   folderMenuData[2],
   folderMenuData[4]
]

export const workbookMenuData = [
   {
      icon: GreyStarIcon,

      label: 'Remove from starred',
      value: UNPIN,
      id: '0'
   },
   { icon: EditIcon, label: 'Rename', value: 'rename', id: '1' },
   {
      icon: SendFillIcon,
      label: 'Share',
      value: 'share',
      id: '2',
      hiddenInMobile: true
   },
   { icon: MoveToIcon, label: 'Move to', value: MOVE_TO, id: '3' },
   { icon: DeleteIcon, label: 'Delete', value: 'Delete', id: '6' }
]

export const home = 'home'

export const SHARED_WITH_ME = 'sharedWithMe'

export const DEFAULT_SORT_BY = 'NAME'

export const PROJECT = 'PROJECT'
export const NORMAL = 'NORMAL'

export const createOptions = {
   folder: 'FOLDER',
   workbook: 'WORKBOOK',
   project: PROJECT
}

export const DEFAULT_ORDER_BY = 'ASC'

export const RENAME = 'rename'

export const folder = 'folder'
export const FOLDER = 'folder'

export const WORKBOOK = 'workbook'
export const workbook = 'workbook'

export const CANCEL = 'Cancel'

export const renameSuccesMessage = 'Successfully updated name' //TODO:confirm message

export const rename = 'RENAME'

export const popUpThemes = {
   RENAME: {
      popupBtnBackground: Colors.blue,
      popupBtnText: isMobileDevice ? 'Rename' : 'Ok',
      popupHeading: 'RENAME'
   }
}

export const DELETE = 'Delete'

export const Delete = 'DELETE'
export const trash = 'trash'
export const TRASH = 'trash'

export const PUBLISH = 'publish'

export const HOME = 'home'

export const DELETE_FOREVER = 'delete forever'

export const trashMenuData = [
   { icon: RefreshIcon, label: 'Restore', value: 'restore', id: '0' },
   {
      icon: DeleteIcon,
      label: 'Delete forever',
      value: DELETE_FOREVER,
      id: '1'
   }
]

export const EMPTY_TRASH = 'Empty Trash'
export const RESTORE = 'restore'

export const sharedWithMeMenuData = [
   { icon: EditIcon, label: 'Rename', value: 'rename', id: '0' },

   {
      icon: SendFillIcon,
      label: 'Share',
      value: 'share',
      id: '3',
      hiddenInMobile: true
   },

   { icon: DeleteIcon, label: 'Delete', value: 'Delete', id: '5' }
]

export const sharedWithMe = 'sharedWithMe'

export const active = 'active'

export const emptyTrash = 'EMPTY_TRASH'

export const ASSIGNMENTS = 'assignments'

export const LEARNER = 'LEARNER'

export const CREATOR = 'CREATOR'

export const ASSIGNMENTS_FOLDER_ID = 'assignmentsFolderId'

export const ACTIVE = 'active'

export const UPCOMING = 'upcoming'

export const COMPLETED = 'completed'

export const assignmentsTabsList = [
   { label: 'Active', value: ACTIVE },
   { label: 'Upcoming', value: UPCOMING },
   { label: 'Completed', value: COMPLETED }
]

export const assignmentsData = [
   {
      name: 'folderManagement:assignments.ongoing',
      sectionName: ACTIVE
   },
   {
      name: 'folderManagement:assignments.upcoming',
      sectionName: UPCOMING
   },
   {
      name: 'folderManagement:assignments.completed',
      sectionName: COMPLETED
   }
]
export const ALL = 'Projects'
export const STARRED_FOLDERS = 'starredFolders'
export const PINNED_WORKBOOKS = 'pinnedWorkbooks'

export const tabsList = [
   { label: 'PROJECTS', value: ALL },
   { label: 'STARRED', value: STARRED_FOLDERS }
]

export const createWorkbookOrFolderdata = [
   { name: 'New Workbook', type: WORKBOOK },
   { name: 'New folder', type: FOLDER }
]

export const createProjectData = [{ name: 'New Project', type: PROJECT }]

export const createModalThemes = {
   folder: {
      modalBtnText: 'Create Folder',
      modalHeading: 'Create Folder'
   },
   workbook: {
      modalBtnText: 'Create Workbook',
      modalHeading: 'Create Workbook'
   },
   project: {
      modalBtnText: 'Create Project',
      modalHeading: 'Create Project'
   }
}

export const LEARNINGS_FOLDER_ID = 'learningsFolderId'

export const WORKBOOKS = 'workbooks'

export const LEARNINGS = 'learnings'
