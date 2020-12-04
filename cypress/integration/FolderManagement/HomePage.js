import {
   loginUser,
   goToHomePage,
   checkCurrentRoute,
   clickOnNthElementWithDataTestID,
   dblclickOnNthElementWithDataTestID,
   clickUsingDataTestID
} from '../../reusableActions/Common'
import {
   stubGetPinnedWorkbooksAndStarredFolders,
   stubGetRootFolderDetails,
   stubGetWorkbooksAndFolders,
   stubGetuserProfile,
   stubGetTrashFoldersAndWorkbooks,
   stubGetSharedWorkbooksAndFolders,
   stubLogout,
   stubActiveFolders,
   stubGetOnClickCurrentFolderInBreadCrumb
} from '../../stubs/FolderManagement'
import {
   TRASH_PATH,
   SHARED_WITH_ME_PATH,
   ACTIVE_FOLDER_PATH,
   HOME_SCREEN_PATH,
   LOGIN_SCREEN_PATH
} from '../../constants/RouteConstants/RouteConstants'
import {
   SIDE_BAR_MENU_ITEM,
   FOLDER_GRID_ITEM,
   ROUTE_PATH,
   LOGOUT
} from '../../constants/FolderManagement'

describe('User Home page ', function() {
   beforeEach(() => {
      cy.server()
      loginUser()
      stubGetPinnedWorkbooksAndStarredFolders()
      stubGetRootFolderDetails()
      stubGetWorkbooksAndFolders()
      stubGetuserProfile()
      goToHomePage()
   })

   it('should navigate to share with me page when we click on share with me in sideBar', function() {
      stubGetSharedWorkbooksAndFolders()
      clickOnNthElementWithDataTestID(SIDE_BAR_MENU_ITEM, 1)
      checkCurrentRoute(SHARED_WITH_ME_PATH)
   })

   it('should navigate to trash page when we click on trash in sideBar', function() {
      stubGetTrashFoldersAndWorkbooks()
      clickOnNthElementWithDataTestID(SIDE_BAR_MENU_ITEM, 2)
      checkCurrentRoute(TRASH_PATH)
   })

   it('should navigate to home when we click on home in sideBar', function() {
      stubGetTrashFoldersAndWorkbooks()
      clickOnNthElementWithDataTestID(SIDE_BAR_MENU_ITEM, 0)
      checkCurrentRoute(HOME_SCREEN_PATH)
   })

   it('should navigate to active folder page when we double click on folder', function() {
      stubActiveFolders()
      dblclickOnNthElementWithDataTestID(FOLDER_GRID_ITEM, 0)
      checkCurrentRoute(ACTIVE_FOLDER_PATH)
   })

   it('should navigate to home page when we click the ALL in breadcrumb', function() {
      stubActiveFolders()
      dblclickOnNthElementWithDataTestID(FOLDER_GRID_ITEM, 2)
      stubGetPinnedWorkbooksAndStarredFolders()
      stubGetRootFolderDetails()
      stubGetWorkbooksAndFolders()
      stubGetuserProfile()
      clickUsingDataTestID(ROUTE_PATH)
      checkCurrentRoute(HOME_SCREEN_PATH)
   })

   it('should navigate to active folder page when we click the Folder in breadcrumb', function() {
      stubActiveFolders()

      dblclickOnNthElementWithDataTestID(FOLDER_GRID_ITEM, 2)
      stubGetOnClickCurrentFolderInBreadCrumb()
      clickUsingDataTestID('Folder')
      checkCurrentRoute(ACTIVE_FOLDER_PATH)
   })

   it('should navigate login page when we click the logout button', function() {
      clickUsingDataTestID(LOGOUT)
      stubLogout()
      clickUsingDataTestID('customPopUpSubmitButton')
      checkCurrentRoute(LOGIN_SCREEN_PATH)
   })
})
