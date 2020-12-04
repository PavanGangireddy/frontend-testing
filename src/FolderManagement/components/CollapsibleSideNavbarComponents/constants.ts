import { HOME_SCREEN_PATH } from '../../../Common/constants/NavigationConstants'

import {
   ASSIGNMENTS_PATH,
   LEARNINGS_PATH,
   SHARED_WITH_ME_PATH,
   TRASH_PATH,
   PUBLISH_DASHBOARD_PATH,
   PERSONAL_PROJECTS_PATH
} from '../../constants/NavigationConstants'

export const PLAIN_FOLDER = 'PlainFolder'
export const TWO_PERSONS_GROUP = 'TwoPersonsGroup'
export const CLOCK = 'Clock'
export const DELETE = 'Delete'
export const ASSIGNMENTS_ICON = 'Assignments'
export const BOOK = 'book'
export const SEND = 'send'
export const PERSONAL_PROJECT = 'Personal Projects'

export const sideNavbarDataForLearner = [
   { iconName: PLAIN_FOLDER, itemName: 'Home', currentRoute: HOME_SCREEN_PATH },
   {
      iconName: PERSONAL_PROJECT,
      itemName: 'Personal Projects',
      currentRoute: PERSONAL_PROJECTS_PATH
   },
   {
      iconName: ASSIGNMENTS_ICON,
      itemName: 'Assignments',
      currentRoute: ASSIGNMENTS_PATH
   },
   { iconName: BOOK, itemName: 'Learning', currentRoute: LEARNINGS_PATH },
   { iconName: DELETE, itemName: 'Trash', currentRoute: TRASH_PATH }
]

export const sideNavbarDataForCreator = [
   { iconName: PLAIN_FOLDER, itemName: 'Home', currentRoute: HOME_SCREEN_PATH },
   {
      iconName: PERSONAL_PROJECT,
      itemName: 'Personal Projects',
      currentRoute: PERSONAL_PROJECTS_PATH
   },
   {
      iconName: SEND,
      itemName: 'Published by me',
      currentRoute: PUBLISH_DASHBOARD_PATH
   },
   {
      iconName: TWO_PERSONS_GROUP,
      itemName: 'Shared with me',
      hiddenInMobile: true,
      currentRoute: SHARED_WITH_ME_PATH
   },
   { iconName: DELETE, itemName: 'Trash', currentRoute: TRASH_PATH }
]

export const LOGOUT = 'LOGOUT'

export const SUBMIT = 'SUBMIT'

export const HOME = 'Home'
export const SHARED_WITH_ME = 'Shared with me'
export const RECENT = 'Recent'
export const TRASH = 'Trash'
export const ASSIGNMENTS = 'Assignments'
export const PUBLISH_BY_ME = 'Published by me'
export const LEARNING = 'Learning'

export const AVATAR = {
   extraSmall: 'XS',
   circle: 'CIRCLE',
   outline: 'OUTLINE',
   alt: 'profile-pic',
   name: 'name',
   large: ''
}
