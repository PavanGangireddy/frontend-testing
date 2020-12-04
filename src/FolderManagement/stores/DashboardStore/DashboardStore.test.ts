import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import getWorkbooksAndFoldersResponse from '../../fixtures/getWorkbooksAndFolders.json'
import starredFoldersAndPinnedWorkbooksInfo from '../../fixtures/starredFoldersAndPinnedWorkbooksInfo.json'
import getRootFolderDetailsResponse from '../../fixtures/getRootFolderDetails.json'
import DashboardFixture from '../../services/DashboardService/index.fixture'
import PublishFixture from '../../services/PublishService/index.fixture'
import getTrashFoldersAndWorkbooks from '../../fixtures/getTrashFoldersAndWorkbooks.json'
import getAssignmnets from '../../fixtures/getAssignments.json'
import AssignmentsFixture from '../../services/AssignmentsService/index.fixture'
import LearningsFixture from '../../services/LearningsService/index.fixture'
import getLearningWorkbooks from '../../fixtures/getLearningWorkbooks.json'
import getAssignmentInstructions from '../../fixtures/getAssignmentInstructions.json'
import getUserProjects from '../../fixtures/getUserProjects.json'

import DashboardStore from '.'

const moveFolderRequestObject = {
   folder_id: '1',
   destination_parent_folder_id: '2'
}

const moveWorkbookRequestObject = {
   workbook_id: '1',
   folder_id: '2'
}

const workbookId = '2'

let dashboardStore,
   dashboardService,
   publishService,
   assignmentsService,
   learnigsService

//TODO: need to write test cases for create Folder and create Workbook apis

describe('DashboardStore API test cases', () => {
   let onSuccess
   let onFailure

   beforeEach(() => {
      dashboardService = new DashboardFixture()
      publishService = new PublishFixture()
      learnigsService = new LearningsFixture()
      onSuccess = jest.fn()
      onFailure = jest.fn()
      assignmentsService = new AssignmentsFixture()
      dashboardStore = new DashboardStore(
         dashboardService,
         assignmentsService,
         publishService,
         learnigsService
      )
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test GetWorkbooksAndFolderAPI initial state', () => {
      expect(dashboardStore.getWorkbooksAndFoldersAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.getWorkbooksAndFoldersAPIError).toBe(null)
   })

   it('should test GetWorkbooksAndFolderAPI posting state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.getWorkbooksAndFoldersAPI = jest.fn(
         () => mockLoadingPromise
      )

      dashboardStore.getWorkbooksAndFoldersAPI('NAME', 'ASC')

      expect(dashboardStore.getWorkbooksAndFoldersAPIStatus).toBe(API_FETCHING)
   })

   it('should test GetWorkbooksAndFolderAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.getWorkbooksAndFoldersAPI = jest.fn(
         () => mockFailurePromise
      )

      await dashboardStore.getWorkbooksAndFoldersAPI('NAME', 'ASC')

      expect(dashboardStore.getWorkbooksAndFoldersAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.getWorkbooksAndFoldersAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   //FIXME: need to resolve this test case
   it.skip('should test GetWorkbooksAndFolderAPI success state', async () => {
      await dashboardStore.getWorkbooksAndFoldersAPI('NAME', 'ASC', () => {})

      expect(dashboardStore.getWorkbooksAndFoldersAPIStatus).toBe(API_SUCCESS)
      expect(dashboardStore.activeFolderInfo.folders[0].name).toBe(
         getWorkbooksAndFoldersResponse.folders[0].folder_name
      )
      expect(dashboardStore.activeFolderInfo.folders.length).toBe(
         getWorkbooksAndFoldersResponse.folders.length
      )
      expect(dashboardStore.activeFolderInfo.workbooks[0].name).toBe(
         getWorkbooksAndFoldersResponse.workbooks[0].workbook_name
      )
   })

   it('should test GetMoveWorkbooksAndFoldersAPI initial state', () => {
      expect(dashboardStore.getMoveWorkbooksAndFoldersAPIStatus).toBe(
         API_INITIAL
      )
      expect(dashboardStore.getMoveWorkbooksAndFoldersAPIError).toBe(null)
   })

   it('should test GetMoveWorkbooksAndFoldersAPI posting state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.getMoveWorkbooksAndFoldersAPI = jest.fn(
         () => mockLoadingPromise
      )

      dashboardStore.getMoveWorkbooksAndFoldersAPI('NAME', 'ASC')

      expect(dashboardStore.getMoveWorkbooksAndFoldersAPIStatus).toBe(
         API_FETCHING
      )
   })

   it('should test GetMoveWorkbooksAndFoldersAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      }).catch(error => error)
      dashboardService.getMoveWorkbooksAndFoldersAPI = jest.fn(
         () => mockFailurePromise
      )

      await dashboardStore.getMoveWorkbooksAndFoldersAPI('NAME', 'ASC')

      expect(dashboardStore.getMoveWorkbooksAndFoldersAPIStatus).toBe(
         API_FAILED
      )
      expect(dashboardStore.getMoveWorkbooksAndFoldersAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   //FIXME: need to resolve this test case
   it.skip('should test GetMoveWorkbooksAndFoldersAPI success state', async () => {
      await dashboardStore.getMoveWorkbooksAndFoldersAPI(
         'NAME',
         'ASC',
         () => {}
      )

      expect(dashboardStore.getMoveWorkbooksAndFoldersAPIStatus).toBe(
         API_SUCCESS
      )
      expect(dashboardStore.moveActiveFolderInfo.folders[0].name).toBe(
         getWorkbooksAndFoldersResponse.folders[0].folder_name
      )
      expect(dashboardStore.moveActiveFolderInfo.folders.length).toBe(
         getWorkbooksAndFoldersResponse.folders.length
      )
      expect(dashboardStore.moveActiveFolderInfo.workbooks[0].name).toBe(
         getWorkbooksAndFoldersResponse.workbooks[0].workbook_name
      )
   })

   it('should test GetPinnedWorkbooksAndStarredFoldersAPI initial state', () => {
      expect(dashboardStore.getPinnedWorkbooksAndStarredFoldersAPIStatus).toBe(
         API_INITIAL
      )
      expect(dashboardStore.getPinnedWorkbooksAndStarredFoldersAPIError).toBe(
         null
      )
   })

   it('should test GetPinnedWorkbooksAndStarredFoldersAPI posting state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.getPinnedWorkbooksAndStarredFoldersAPI = jest.fn(
         () => mockLoadingPromise
      )

      dashboardStore.getPinnedWorkbooksAndStarredFoldersAPI()

      expect(dashboardStore.getPinnedWorkbooksAndStarredFoldersAPIStatus).toBe(
         API_FETCHING
      )
   })

   it('should test GetPinnedWorkbooksAndStarredFoldersAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.getPinnedWorkbooksAndStarredFoldersAPI = jest.fn(
         () => mockFailurePromise
      )

      await dashboardStore.getPinnedWorkbooksAndStarredFoldersAPI()

      expect(dashboardStore.getPinnedWorkbooksAndStarredFoldersAPIStatus).toBe(
         API_FAILED
      )
      expect(dashboardStore.getPinnedWorkbooksAndStarredFoldersAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test GetPinnedWorkbooksAndStarredFoldersAPI success state', async () => {
      await dashboardStore.getPinnedWorkbooksAndStarredFoldersAPI()

      expect(dashboardStore.getPinnedWorkbooksAndStarredFoldersAPIStatus).toBe(
         API_SUCCESS
      )
      expect(dashboardStore.pinnedWorkbooks[0].name).toBe(
         starredFoldersAndPinnedWorkbooksInfo.pinned_workbooks[0].workbook_name
      )
      expect(dashboardStore.pinnedWorkbooks.length).toBe(
         starredFoldersAndPinnedWorkbooksInfo.pinned_workbooks.length
      )
      expect(dashboardStore.starredFolders[0].name).toBe(
         starredFoldersAndPinnedWorkbooksInfo.starred_folders[0].folder_name
      )
   })

   it('should test GetRootFolderDetailsAPI initial state', () => {
      expect(dashboardStore.getRootFolderDetailsAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.getRootFolderDetailsAPIError).toStrictEqual({})
   })

   it('should test GetRootFolderDetailsAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.getRootFolderDetailsAPI = jest.fn(
         () => mockLoadingPromise
      )

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      dashboardStore.getRootFolderDetailsAPI(
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(dashboardStore.getRootFolderDetailsAPIStatus).toBe(API_FETCHING)
   })

   it('should test GetRootFolderDetailsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.getRootFolderDetailsAPI = jest.fn(
         () => mockFailurePromise
      )

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await dashboardStore.getRootFolderDetailsAPI(
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(dashboardStore.getRootFolderDetailsAPIStatus).toBe(API_FAILED)
      expect(mockFailureFunction).toBeCalled()
      expect(dashboardStore.getRootFolderDetailsAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test GetRootFolderDetailsAPI success state', async () => {
      const { root_folder_id: rootFolderId } = getRootFolderDetailsResponse

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await dashboardStore.getRootFolderDetailsAPI(
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(dashboardStore.getRootFolderDetailsAPIStatus).toBe(API_SUCCESS)
      expect(mockSuccessFunction).toBeCalled()
      expect(dashboardStore.rootFolderId).toBe(rootFolderId)
   })

   it('should test GetMoveRootFolderDetailsAPI initial state', () => {
      expect(dashboardStore.getMoveRootFolderDetailsAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.getMoveRootFolderDetailsAPIError).toStrictEqual({})
   })

   it('should test GetMoveRootFolderDetailsAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.getMoveRootFolderDetailsAPI = jest.fn(
         () => mockLoadingPromise
      )

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      dashboardStore.getMoveRootFolderDetailsAPI(
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(dashboardStore.getMoveRootFolderDetailsAPIStatus).toBe(
         API_FETCHING
      )
   })

   // FIXME: Need to fix the test case
   it.skip('should test GetMoveRootFolderDetailsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      }).catch(error => error)
      dashboardService.getMoveRootFolderDetailsAPI = jest.fn(
         () => mockFailurePromise
      )

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await dashboardStore.getMoveRootFolderDetailsAPI(
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(dashboardStore.getMoveRootFolderDetailsAPIStatus).toBe(API_FAILED)
      expect(mockFailureFunction).toBeCalled()
      expect(dashboardStore.getMoveRootFolderDetailsAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test GetMoveRootFolderDetailsAPI success state', async () => {
      const { root_folder_id: rootFolderId } = getRootFolderDetailsResponse

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await dashboardStore.getMoveRootFolderDetailsAPI(
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(dashboardStore.getMoveRootFolderDetailsAPIStatus).toBe(API_SUCCESS)
      expect(mockSuccessFunction).toBeCalled()
      expect(dashboardStore.moveRootFolderId).toBe(rootFolderId)
   })

   it('should test AddOrRemoveFolderStarAPI initial state', () => {
      expect(dashboardStore.addOrRemoveFolderStarAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.addOrRemoveFolderStarAPIError).toStrictEqual({})
   })

   it('should test AddOrRemoveFolderStarAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.addOrRemoveFolderStarAPI = jest.fn(
         () => mockLoadingPromise
      )

      const onFailureMock = jest.fn()

      dashboardStore.addOrRemoveFolderStarAPI('1', onFailureMock)

      expect(dashboardStore.addOrRemoveFolderStarAPIStatus).toBe(API_FETCHING)
   })

   it('should test AddOrRemoveFolderStarAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.addOrRemoveFolderStarAPI = jest.fn(
         () => mockFailurePromise
      )

      const onFailureMock = jest.fn()

      await dashboardStore.addOrRemoveFolderStarAPI('1', onFailureMock)

      expect(dashboardStore.addOrRemoveFolderStarAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.addOrRemoveFolderStarAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(onFailureMock).toBeCalled()
   })

   it('should test AddOrRemoveFolderStarAPI success state', async () => {
      const onFailureMock = jest.fn()

      await dashboardStore.addOrRemoveFolderStarAPI('1', onFailureMock)

      expect(dashboardStore.addOrRemoveFolderStarAPIStatus).toBe(API_SUCCESS)
   })

   it('should test AddOrRemoveFolderStar to remove star of the folder', () => {
      dashboardStore.setGetWorkbooksAndFoldersAPIResponse(
         getWorkbooksAndFoldersResponse
      )
      dashboardStore.setGetPinnedWorkbooksAndStarredFoldersApiResponse(
         starredFoldersAndPinnedWorkbooksInfo
      )

      const starredFoldersLength = dashboardStore.starredFolders.length
      const { folders } = dashboardStore.activeFolderInfo
      const starredFoldersBeforeRemoving = folders.filter(
         folder => folder.isStarred
      )

      dashboardStore.addOrRemoveFolderStar('0')

      const starredFoldersAfterRemoving = folders.filter(
         folder => folder.isStarred
      )

      const folderAfterRemovingStar = folders.find(folder => folder.id === '0')

      expect(dashboardStore.starredFolders.length).toBe(
         starredFoldersLength - 1
      )
      expect(starredFoldersAfterRemoving.length).toBe(
         starredFoldersBeforeRemoving.length - 1
      )
      expect(folderAfterRemovingStar.isStarred).toBe(false)
   })

   it('should test AddOrRemoveFolderStar to add star to the folder', () => {
      dashboardStore.setGetWorkbooksAndFoldersAPIResponse(
         getWorkbooksAndFoldersResponse
      )
      dashboardStore.setGetPinnedWorkbooksAndStarredFoldersApiResponse(
         starredFoldersAndPinnedWorkbooksInfo
      )

      const starredFoldersLength = dashboardStore.starredFolders.length
      const { folders } = dashboardStore.activeFolderInfo
      const starredFoldersBeforeRemoving = folders.filter(
         folder => folder.isStarred
      )

      dashboardStore.addOrRemoveFolderStar('2')

      const starredFoldersAfterRemoving = folders.filter(
         folder => folder.isStarred
      )

      const folderAfterRemovingStar = folders.find(folder => folder.id === '2')

      expect(dashboardStore.starredFolders.length).toBe(
         starredFoldersLength + 1
      )
      expect(starredFoldersAfterRemoving.length).toBe(
         starredFoldersBeforeRemoving.length + 1
      )
      expect(folderAfterRemovingStar.isStarred).toBe(true)
   })

   it('should test AddOrRemoveFolderStar to remove star of the folder that is not in home folder', () => {
      dashboardStore.setGetWorkbooksAndFoldersAPIResponse(
         getWorkbooksAndFoldersResponse
      )
      dashboardStore.setGetPinnedWorkbooksAndStarredFoldersApiResponse(
         starredFoldersAndPinnedWorkbooksInfo
      )

      const starredFoldersLength = dashboardStore.starredFolders.length
      const { folders } = dashboardStore.activeFolderInfo
      const starredFoldersBeforeRemoving = folders.filter(
         folder => folder.isStarred
      )

      dashboardStore.addOrRemoveFolderStar('3')

      const starredFoldersAfterRemoving = folders.filter(
         folder => folder.isStarred
      )

      const folderAfterRemovingStar = folders.find(folder => folder.id === '3')

      expect(dashboardStore.starredFolders.length).toBe(
         starredFoldersLength - 1
      )
      expect(starredFoldersAfterRemoving.length).toBe(
         starredFoldersBeforeRemoving.length
      )
      expect(folderAfterRemovingStar).toBe(undefined)
   })

   it('should test PinOrUnpinWorkbookAPI initial state', () => {
      expect(dashboardStore.pinOrUnpinWorkbookAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.pinOrUnpinWorkbookAPIError).toStrictEqual({})
   })

   it('should test PinOrUnpinWorkbookAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.pinOrUnpinWorkbookAPI = jest.fn(() => mockLoadingPromise)

      const onFailureMock = jest.fn()

      dashboardStore.pinOrUnpinWorkbookAPI('1', onFailureMock)

      expect(dashboardStore.pinOrUnpinWorkbookAPIStatus).toBe(API_FETCHING)
   })

   it('should test PinOrUnpinWorkbookAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.pinOrUnpinWorkbookAPI = jest.fn(() => mockFailurePromise)

      const onFailureMock = jest.fn()

      await dashboardStore.pinOrUnpinWorkbookAPI('1', onFailureMock)

      expect(dashboardStore.pinOrUnpinWorkbookAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.pinOrUnpinWorkbookAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(onFailureMock).toBeCalled()
   })

   it('should test PinOrUnpinWorkbookAPI success state', async () => {
      const onFailureMock = jest.fn()

      await dashboardStore.pinOrUnpinWorkbookAPI('1', onFailureMock)

      expect(dashboardStore.pinOrUnpinWorkbookAPIStatus).toBe(API_SUCCESS)
   })

   it('should test PinOrUnpinWorkbook method to unpin workbook', () => {
      dashboardStore.setGetWorkbooksAndFoldersAPIResponse(
         getWorkbooksAndFoldersResponse
      )
      dashboardStore.setGetPinnedWorkbooksAndStarredFoldersApiResponse(
         starredFoldersAndPinnedWorkbooksInfo
      )

      const pinnedWorkbooksLength = dashboardStore.pinnedWorkbooks.length
      const { workbooks } = dashboardStore.activeFolderInfo
      const pinnedWorkbooksBeforeRemoving = workbooks.filter(
         workbook => workbook.isPinned
      )

      dashboardStore.pinOrUnpinWorkbook('0')

      const pinnedWorkbooksAfterRemoving = workbooks.filter(
         workbook => workbook.isPinned
      )

      const workbookAfterUnpin = workbooks.find(workbook => workbook.id === '0')

      expect(dashboardStore.pinnedWorkbooks.length).toBe(
         pinnedWorkbooksLength - 1
      )
      expect(pinnedWorkbooksAfterRemoving.length).toBe(
         pinnedWorkbooksBeforeRemoving.length - 1
      )
      expect(workbookAfterUnpin.isPinned).toBe(false)
   })

   it('should test PinOrUnpinWorkbook method to pin workbook', () => {
      dashboardStore.setGetWorkbooksAndFoldersAPIResponse(
         getWorkbooksAndFoldersResponse
      )
      dashboardStore.setGetPinnedWorkbooksAndStarredFoldersApiResponse(
         starredFoldersAndPinnedWorkbooksInfo
      )

      const pinnedWorkbooksLength = dashboardStore.pinnedWorkbooks.length
      const { workbooks } = dashboardStore.activeFolderInfo
      const pinnedWorkbooksBeforeAdding = workbooks.filter(
         workbook => workbook.isPinned
      )

      dashboardStore.pinOrUnpinWorkbook('5')
      expect(dashboardStore.pinnedWorkbooks.length).toBe(6)

      const pinnedWorkbooksAfterAdding = workbooks.filter(
         workbook => workbook.isPinned
      )

      const workbookAfterPin = workbooks.find(workbook => workbook.id === '5')

      expect(dashboardStore.pinnedWorkbooks.length).toBe(
         pinnedWorkbooksLength + 1
      )
      expect(pinnedWorkbooksAfterAdding.length).toBe(
         pinnedWorkbooksBeforeAdding.length + 1
      )
      expect(workbookAfterPin.isPinned).toBe(true)
   })

   it('should test PinOrUnpinWorkbook method to unpin workbook that is not in home folder', () => {
      dashboardStore.setGetWorkbooksAndFoldersAPIResponse(
         getWorkbooksAndFoldersResponse
      )
      dashboardStore.setGetPinnedWorkbooksAndStarredFoldersApiResponse(
         starredFoldersAndPinnedWorkbooksInfo
      )

      const pinnedWorkbooksLength = dashboardStore.pinnedWorkbooks.length
      const { workbooks } = dashboardStore.activeFolderInfo
      const pinnedWorkbooksBeforeRemoving = workbooks.filter(
         workbook => workbook.isPinned
      ).length

      dashboardStore.pinOrUnpinWorkbook('6')

      const pinnedWorkbooksAfterRemoving = workbooks.filter(
         workbook => workbook.isPinned
      ).length

      const workbookAfterUnpin = workbooks.find(workbook => workbook.id === '6')

      expect(dashboardStore.pinnedWorkbooks.length).toBe(
         pinnedWorkbooksLength - 1
      )
      expect(pinnedWorkbooksAfterRemoving).toBe(pinnedWorkbooksBeforeRemoving)
      expect(workbookAfterUnpin).toBe(undefined)
   })

   it('should test renameForWorkbookAPI initial state', () => {
      expect(dashboardStore.renameForWorkbookAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.renameForWorkbookAPIError).toStrictEqual(null)
   })

   it('should test renameForWorkbookAPI loading state', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.renameForWorkbookAPI = jest.fn(() => mockLoadingPromise)
      dashboardStore.renameForWorkbookAPI('1', 'orange', onSuccess, onFailure)
      expect(dashboardStore.renameForWorkbookAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test renameForWorkbookAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.renameForWorkbookAPI = jest.fn(() => mockFailurePromise)

      await dashboardStore.renameForWorkbookAPI(
         '1',
         'orange',
         onSuccess,
         onFailure
      )

      expect(dashboardStore.renameForWorkbookAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.renameForWorkbookAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(onFailure).toBeCalled()
   })

   it('should test renameForWorkbookAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      await dashboardStore.renameForWorkbookAPI(
         '1',
         'orange',
         onSuccess,
         onFailure
      )

      expect(dashboardStore.renameForWorkbookAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test renameWorkbook in pin workbook', () => {
      dashboardStore.setGetWorkbooksAndFoldersAPIResponse(
         getWorkbooksAndFoldersResponse
      )
      dashboardStore.setGetPinnedWorkbooksAndStarredFoldersApiResponse(
         starredFoldersAndPinnedWorkbooksInfo
      )

      dashboardStore.renameWorkbook('2', 'orange')

      expect(dashboardStore.pinnedWorkbooks[2].name).toBe('orange')
   })

   it('should test renameWorkbook in All workbook', () => {
      dashboardStore.setGetWorkbooksAndFoldersAPIResponse(
         getWorkbooksAndFoldersResponse
      )

      dashboardStore.renameWorkbook('2', 'orange')

      expect(dashboardStore.activeFolderInfo.workbooks[2].name).toBe('orange')
   })

   it('should test renameForFolderAPI initial state', () => {
      expect(dashboardStore.renameForFolderAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.renameForFolderAPIError).toStrictEqual(null)
   })

   it('should test renameForFolderAPI loading state', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.renameForFolderAPI = jest.fn(() => mockLoadingPromise)
      dashboardStore.renameForFolderAPI('1', 'orange', onSuccess, onFailure)

      expect(dashboardStore.renameForFolderAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test renameForFolderAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.renameForFolderAPI = jest.fn(() => mockFailurePromise)

      await dashboardStore.renameForFolderAPI(
         '1',
         'orange',
         onSuccess,
         onFailure
      )

      expect(dashboardStore.renameForFolderAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.renameForFolderAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(onFailure).toBeCalled()
   })

   it('should test renameForWorkbookAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      await dashboardStore.renameForFolderAPI(
         '1',
         'orange',
         onSuccess,
         onFailure
      )

      expect(dashboardStore.renameForFolderAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test renameWorkbook in starred folder', () => {
      dashboardStore.setGetWorkbooksAndFoldersAPIResponse(
         getWorkbooksAndFoldersResponse
      )
      dashboardStore.setGetPinnedWorkbooksAndStarredFoldersApiResponse(
         starredFoldersAndPinnedWorkbooksInfo
      )

      dashboardStore.renameFolder('0', 'orange')

      expect(dashboardStore.starredFolders[0].name).toBe('orange')
   })

   it('should test renameWorkbook in All folders', () => {
      dashboardStore.setGetWorkbooksAndFoldersAPIResponse(
         getWorkbooksAndFoldersResponse
      )

      dashboardStore.renameFolder('0', 'orange')

      expect(dashboardStore.activeFolderInfo.folders[0].name).toBe('orange')
   })

   it('should test deleteFolderAPI initial state', () => {
      expect(dashboardStore.deleteFolderAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.deleteFolderAPIError).toStrictEqual(null)
   })

   it('should test deleteFolderAPI loading state', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.deleteFolderAPI = jest.fn(() => mockLoadingPromise)
      dashboardStore.deleteFolderAPI('1', onSuccess, onFailure)

      expect(dashboardStore.deleteFolderAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test deleteFolderAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.deleteFolderAPI = jest.fn(() => mockFailurePromise)

      await dashboardStore.deleteFolderAPI('1', onSuccess, onFailure)

      expect(dashboardStore.deleteFolderAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.deleteFolderAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(onFailure).toBeCalled()
   })

   it('should test deleteFolderAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      await dashboardStore.deleteFolderAPI('1', onSuccess, onFailure)

      expect(dashboardStore.deleteFolderAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test deleteFolderAPI in All folders', () => {
      dashboardStore.setGetWorkbooksAndFoldersAPIResponse(
         getWorkbooksAndFoldersResponse
      )
      expect(dashboardStore.activeFolderInfo.folders.length).toBe(3)

      dashboardStore.deleteFolder('0')

      expect(dashboardStore.activeFolderInfo.folders.length).toBe(2)
   })

   it('should test deleteFolderAPI in Starred folders', () => {
      dashboardStore.setGetWorkbooksAndFoldersAPIResponse(
         getWorkbooksAndFoldersResponse
      )
      dashboardStore.setGetPinnedWorkbooksAndStarredFoldersApiResponse(
         starredFoldersAndPinnedWorkbooksInfo
      )
      expect(dashboardStore.starredFolders.length).toBe(3)

      dashboardStore.deleteFolder('0')

      expect(dashboardStore.starredFolders.length).toBe(2)
   })

   it('should test deleteWorkbookAPI initial state', () => {
      expect(dashboardStore.deleteWorkbookAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.deleteWorkbookAPIError).toStrictEqual(null)
   })

   it('should test deleteWorkbookAPI loading state', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.deleteWorkbookAPI = jest.fn(() => mockLoadingPromise)
      dashboardStore.deleteWorkbookAPI('1', onSuccess, onFailure)

      expect(dashboardStore.deleteWorkbookAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test deleteWorkbookAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.deleteWorkbookAPI = jest.fn(() => mockFailurePromise)

      await dashboardStore.deleteWorkbookAPI('1', onSuccess, onFailure)

      expect(dashboardStore.deleteWorkbookAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.deleteWorkbookAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(onFailure).toBeCalled()
   })

   it('should test deleteWorkbookAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      await dashboardStore.deleteWorkbookAPI('1', onSuccess, onFailure)

      expect(dashboardStore.deleteWorkbookAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test deleteWorkbookAPI in All folders', () => {
      dashboardStore.setGetWorkbooksAndFoldersAPIResponse(
         getWorkbooksAndFoldersResponse
      )
      expect(dashboardStore.activeFolderInfo.workbooks.length).toBe(6)

      dashboardStore.deleteWorkbook('0')

      expect(dashboardStore.activeFolderInfo.workbooks.length).toBe(5)
   })

   it('should test deleteWorkbookAPI in Pinned workbooks', () => {
      dashboardStore.setGetWorkbooksAndFoldersAPIResponse(
         getWorkbooksAndFoldersResponse
      )
      dashboardStore.setGetPinnedWorkbooksAndStarredFoldersApiResponse(
         starredFoldersAndPinnedWorkbooksInfo
      )
      expect(dashboardStore.pinnedWorkbooks.length).toBe(5)

      dashboardStore.deleteWorkbook('0')

      expect(dashboardStore.pinnedWorkbooks.length).toBe(4)
   })

   it('should test trashFoldersAndWorkbooksAPI initial state', () => {
      expect(dashboardStore.trashFoldersAndWorkbooksAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.trashFoldersAndWorkbooksAPIError).toBe(null)
   })

   it('should test trashFoldersAndWorkbooksAPI posting state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.trashFoldersAndWorkbooksAPI = jest.fn(
         () => mockLoadingPromise
      )

      dashboardStore.trashFoldersAndWorkbooksAPI()

      expect(dashboardStore.trashFoldersAndWorkbooksAPIStatus).toBe(
         API_FETCHING
      )
   })

   it('should test trashFoldersAndWorkbooksAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.trashFoldersAndWorkbooksAPI = jest.fn(
         () => mockFailurePromise
      )

      await dashboardStore.trashFoldersAndWorkbooksAPI()

      expect(dashboardStore.trashFoldersAndWorkbooksAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.trashFoldersAndWorkbooksAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test trashFoldersAndWorkbooksAPI success state', async () => {
      await dashboardStore.trashFoldersAndWorkbooksAPI()

      expect(dashboardStore.trashFoldersAndWorkbooksAPIStatus).toBe(API_SUCCESS)
      expect(dashboardStore.trashFolderInfo.folders[0].name).toBe(
         getTrashFoldersAndWorkbooks.folders[0].folder_name
      )

      expect(dashboardStore.trashFolderInfo.workbooks[0].name).toBe(
         getTrashFoldersAndWorkbooks.workbooks[0].workbook_name
      )
   })

   it('should test restoreFolderAPI initial state', () => {
      expect(dashboardStore.restoreFolderAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.restoreFolderAPIError).toStrictEqual(null)
   })

   it('should test restoreFolderAPI loading state', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.restoreFolderAPI = jest.fn(() => mockLoadingPromise)
      dashboardStore.restoreFolderAPI('1', onSuccess, onFailure)

      expect(dashboardStore.restoreFolderAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test restoreFolderAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.restoreFolderAPI = jest.fn(() => mockFailurePromise)

      await dashboardStore.restoreFolderAPI('1', onSuccess, onFailure)

      expect(dashboardStore.restoreFolderAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.restoreFolderAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(onFailure).toBeCalled()
   })

   it('should test restoreFolderAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      await dashboardStore.restoreFolderAPI('1', onSuccess, onFailure)

      expect(dashboardStore.restoreFolderAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test restoreWorkbookAPI initial state', () => {
      expect(dashboardStore.restoreWorkbookAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.restoreWorkbookAPIError).toStrictEqual(null)
   })

   it('should test restoreWorkbookAPI loading state', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.restoreWorkbookAPI = jest.fn(() => mockLoadingPromise)
      dashboardStore.restoreWorkbookAPI('1', onSuccess, onFailure)

      expect(dashboardStore.restoreWorkbookAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test restoreWorkbookAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.restoreWorkbookAPI = jest.fn(() => mockFailurePromise)

      await dashboardStore.restoreWorkbookAPI('1', onSuccess, onFailure)

      expect(dashboardStore.restoreWorkbookAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.restoreWorkbookAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(onFailure).toBeCalled()
   })

   it('should test restoreWorkbookAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      await dashboardStore.restoreWorkbookAPI('1', onSuccess, onFailure)

      expect(dashboardStore.restoreWorkbookAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test MoveFolderAPI initial state', () => {
      expect(dashboardStore.moveFolderAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.moveFolderAPIError).toStrictEqual({})
   })

   it('should test MoveFolderAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.moveFolderAPI = jest.fn(() => mockLoadingPromise)

      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      dashboardStore.moveFolderAPI(
         moveFolderRequestObject,
         onSuccess,
         onFailure
      )

      expect(dashboardStore.moveFolderAPIStatus).toBe(API_FETCHING)
   })

   it('should test MoveFolderAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.moveFolderAPI = jest.fn(() => mockFailurePromise)

      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      await dashboardStore.moveFolderAPI(
         moveFolderRequestObject,
         onSuccess,
         onFailure
      )

      expect(dashboardStore.moveFolderAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.moveFolderAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test deleteForeverFolderAPI initial state', () => {
      expect(dashboardStore.deleteForeverFolderAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.deleteForeverFolderAPIError).toStrictEqual(null)
   })

   it('should test deleteForeverFolderAPI loading state', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.deleteForeverFolderAPI = jest.fn(
         () => mockLoadingPromise
      )
      dashboardStore.deleteForeverFolderAPI('1', onSuccess, onFailure)

      expect(dashboardStore.deleteForeverFolderAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test deleteForeverFolderAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.deleteForeverFolderAPI = jest.fn(
         () => mockFailurePromise
      )

      await dashboardStore.deleteForeverFolderAPI('1', onSuccess, onFailure)

      expect(dashboardStore.deleteForeverFolderAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.deleteForeverFolderAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(onFailure).toBeCalled()
   })

   it('should test MoveFolderAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      await dashboardStore.moveFolderAPI(
         moveFolderRequestObject,
         onSuccess,
         onFailure
      )

      expect(dashboardStore.moveFolderAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test MoveWorkbookAPI initial state', () => {
      expect(dashboardStore.moveWorkbookAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.moveWorkbookAPIError).toStrictEqual({})
   })

   it('should test MoveWorkbookAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.moveWorkbookAPI = jest.fn(() => mockLoadingPromise)

      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      dashboardStore.moveWorkbookAPI(
         moveWorkbookRequestObject,
         onSuccess,
         onFailure
      )

      expect(dashboardStore.moveWorkbookAPIStatus).toBe(API_FETCHING)
   })

   it('should test MoveWorkbookAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.moveWorkbookAPI = jest.fn(() => mockFailurePromise)

      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      await dashboardStore.moveWorkbookAPI(
         moveWorkbookRequestObject,
         onSuccess,
         onFailure
      )
      expect(dashboardStore.moveWorkbookAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.moveWorkbookAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(onFailure).toBeCalled()
   })

   it('should test deleteForeverFolderAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      await dashboardStore.trashFoldersAndWorkbooksAPI()
      await dashboardStore.deleteForeverFolderAPI('1', onSuccess, onFailure)

      expect(dashboardStore.deleteForeverFolderAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test deleteForeverFolderAPI in trash', () => {
      dashboardStore.setTrashFoldersAndWorkbooksAPIResponse(
         getTrashFoldersAndWorkbooks
      )
      expect(dashboardStore.trashFolderInfo.folders.length).toBe(3)

      dashboardStore.deleteForeverFolder('0')

      expect(dashboardStore.trashFolderInfo.folders.length).toBe(2)
   })

   it('should test deleteForeverWorkbookAPI initial state', () => {
      expect(dashboardStore.deleteForeverWorkbookAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.deleteForeverWorkbookAPIError).toStrictEqual(null)
   })

   it('should test deleteForeverWorkbookAPI loading state', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.deleteForeverWorkbookAPI = jest.fn(
         () => mockLoadingPromise
      )
      dashboardStore.deleteForeverWorkbookAPI('1', onSuccess, onFailure)

      expect(dashboardStore.deleteForeverWorkbookAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test deleteForeverWorkbookAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })

      dashboardService.deleteForeverWorkbookAPI = jest.fn(
         () => mockFailurePromise
      )

      await dashboardStore.deleteForeverWorkbookAPI('1', onSuccess, onFailure)

      expect(dashboardStore.deleteForeverWorkbookAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.deleteForeverWorkbookAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test MoveWorkbookAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      await dashboardStore.moveWorkbookAPI(
         moveWorkbookRequestObject,
         onSuccess,
         onFailure
      )

      expect(dashboardStore.moveWorkbookAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test deleteForeverWorkbookAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      await dashboardStore.trashFoldersAndWorkbooksAPI()
      await dashboardStore.deleteForeverWorkbookAPI('1', onSuccess, onFailure)

      expect(dashboardStore.deleteForeverWorkbookAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test deleteForeverWorkbookAPI in trash', () => {
      dashboardStore.setTrashFoldersAndWorkbooksAPIResponse(
         getTrashFoldersAndWorkbooks
      )
      expect(dashboardStore.trashFolderInfo.workbooks.length).toBe(6)

      dashboardStore.deleteForeverWorkbook('0')

      expect(dashboardStore.trashFolderInfo.workbooks.length).toBe(5)
   })

   it('should test emptyTrashAPI initial state', () => {
      expect(dashboardStore.emptyTrashAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.emptyTrashAPIError).toStrictEqual(null)
   })

   it('should test emptyTrashAPI loading state', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.emptyTrashAPI = jest.fn(() => mockLoadingPromise)
      dashboardStore.emptyTrashAPI(onSuccess, onFailure)

      expect(dashboardStore.emptyTrashAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test emptyTrashAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.emptyTrashAPI = jest.fn(() => mockFailurePromise)

      await dashboardStore.emptyTrashAPI(onSuccess, onFailure)

      expect(dashboardStore.emptyTrashAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.emptyTrashAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(onFailure).toBeCalled()
   })

   it('should test emptyTrashAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()
      await dashboardStore.emptyTrashAPI(onSuccess, onFailure)

      expect(dashboardStore.emptyTrashAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
   })

   it('should test emptyTrashAPI in trash', () => {
      dashboardStore.setGetWorkbooksAndFoldersAPIResponse(
         getTrashFoldersAndWorkbooks
      )

      dashboardStore.emptyTrash()

      expect(dashboardStore.trashFolderInfo.folders).toStrictEqual([])
      expect(dashboardStore.trashFolderInfo.workbooks).toStrictEqual([])
   })

   it('should test getPublishWorkbook initial state', () => {
      expect(dashboardStore.getPublishedWorkbookAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.getPublishedWorkbookAPIError).toBe(null)
   })

   it('should test getPublishWorkbook loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      publishService.getPublishedWorkbookAPI = jest.fn(() => mockLoadingPromise)
      dashboardStore.getPublishedWorkbookAPI(onSuccess, onFailure)

      expect(dashboardStore.getPublishedWorkbookAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test getPublishWorkbook success state', async () => {
      await dashboardStore.getPublishedWorkbookAPI(onSuccess, onFailure)

      expect(dashboardStore.getPublishedWorkbookAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test getPublishWorkbook failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      publishService.getPublishedWorkbookAPI = jest.fn(() => mockFailurePromise)

      await dashboardStore.getPublishedWorkbookAPI(onSuccess, onFailure)

      expect(dashboardStore.getPublishedWorkbookAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.getPublishedWorkbookAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test GetAssignmentsAPI initial state', () => {
      expect(dashboardStore.getLearningWorkbooksAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.getAssignmentsAPIError).toBe(null)
   })

   it('should test GetAssignmentsAPI posting state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      publishService.getAssignmentsAPI = jest.fn(() => mockLoadingPromise)
      dashboardStore.getAssignmentsAPI()
      expect(dashboardStore.getAssignmentsAPIStatus).toBe(API_FETCHING)
   })

   // TODO: need to handle below test cases

   it('should test GetAssignmentsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      assignmentsService.getAssignmentsAPI = jest.fn(() => mockFailurePromise)

      await dashboardStore.getAssignmentsAPI()

      expect(dashboardStore.getAssignmentsAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.getAssignmentsAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test GetAssignmentsAPI success state', async () => {
      await dashboardStore.getAssignmentsAPI()

      expect(dashboardStore.getAssignmentsAPIStatus).toBe(API_SUCCESS)
      expect(dashboardStore.assignmentsFolderInfo.get('active')[0].name).toBe(
         getAssignmnets.active[0].workbook_name
      )
      expect(dashboardStore.assignmentsFolderInfo.get('active').length).toBe(
         getAssignmnets.active.length
      )
      expect(dashboardStore.assignmentsFolderInfo.get('upcoming')[0].name).toBe(
         getAssignmnets.upcoming[0].workbook_name
      )
      expect(
         dashboardStore.assignmentsFolderInfo.get('completed')[0].name
      ).toBe(getAssignmnets.completed[0].workbook_name)
   })

   it('should test GetLearningWorkbooksAPI initial state', () => {
      expect(dashboardStore.getLearningWorkbooksAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.getLearningWorkbooksAPIError).toBe(null)
   })

   it('should test GetLearningWorkbooksAPI posting state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      learnigsService.getLearningWorkbooksAPI = jest.fn(
         () => mockLoadingPromise
      )
      dashboardStore.getLearningWorkbooksAPI()
      expect(dashboardStore.getLearningWorkbooksAPIStatus).toBe(API_FETCHING)
   })

   it('should test GetLearningWorkbooksAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      learnigsService.getLearningWorkbooksAPI = jest.fn(
         () => mockFailurePromise
      )

      await dashboardStore.getLearningWorkbooksAPI()

      expect(dashboardStore.getLearningWorkbooksAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.getLearningWorkbooksAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test GetLearningWorkbooksAPI success state', async () => {
      await dashboardStore.getLearningWorkbooksAPI()

      expect(dashboardStore.getLearningWorkbooksAPIStatus).toBe(API_SUCCESS)
      expect(dashboardStore.learningWorkbooks.get('workbooks')[0].name).toBe(
         getLearningWorkbooks.workbooks[0].workbook_name
      )
      expect(dashboardStore.learningWorkbooks.get('workbooks').length).toBe(
         getLearningWorkbooks.workbooks.length
      )
   })

   it('should test GetUserProjectsAPI initial state', () => {
      expect(dashboardStore.getUserProjectsAPIStatus).toBe(API_INITIAL)
      expect(dashboardStore.getUserProjectsAPIError).toBe(null)
   })

   it('should test GetUserProjectsAPI posting state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      dashboardService.getUserProjectsAPI = jest.fn(() => mockLoadingPromise)

      dashboardStore.getUserProjectsAPI()

      expect(dashboardStore.getUserProjectsAPIStatus).toBe(API_FETCHING)
   })

   // TODO: need to handle below test cases

   it('should test GetUserProjectsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      dashboardService.getUserProjectsAPI = jest.fn(() => mockFailurePromise)

      await dashboardStore.getUserProjectsAPI()

      expect(dashboardStore.getUserProjectsAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.getUserProjectsAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test GetUserProjectsAPI success state', async () => {
      await dashboardStore.getUserProjectsAPI()

      expect(dashboardStore.getUserProjectsAPIStatus).toBe(API_SUCCESS)
      expect(dashboardStore.activeFolderInfo.folders[0].name).toBe(
         getUserProjects[0].folder_name
      )
      expect(dashboardStore.activeFolderInfo.folders.length).toBe(
         getUserProjects.length
      )
      expect(dashboardStore.activeFolderInfo.workbooks.length).toBe(0)
   })

   it('should test getAssignmentInstructionsAPI initial state', () => {
      expect(dashboardStore.getAssignmentInstructionsAPIStatus).toBe(
         API_INITIAL
      )
      expect(dashboardStore.getAssignmentInstructionsAPIError).toBe(null)
   })

   it('should test getAssignmentInstructionsAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      assignmentsService.getAssignmentInstructionsAPI = jest.fn(
         () => mockLoadingPromise
      )

      dashboardStore.getAssignmentInstructionsAPI(
         workbookId,
         onSuccess,
         onFailure
      )

      expect(dashboardStore.getAssignmentInstructionsAPIStatus).toBe(
         API_FETCHING
      )
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test getAssignmentInstructionsAPI success state', async () => {
      await dashboardStore.getAssignmentInstructionsAPI(
         workbookId,
         onSuccess,
         onFailure
      )

      expect(dashboardStore.getAssignmentInstructionsAPIStatus).toBe(
         API_SUCCESS
      )
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test getAssignmentInstructionsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      assignmentsService.getAssignmentInstructionsAPI = jest.fn(
         () => mockFailurePromise
      )

      await dashboardStore.getAssignmentInstructionsAPI(
         workbookId,
         onSuccess,
         onFailure
      )

      expect(dashboardStore.getAssignmentInstructionsAPIStatus).toBe(API_FAILED)
      expect(dashboardStore.getAssignmentInstructionsAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })
})
