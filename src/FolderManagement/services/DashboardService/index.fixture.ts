import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import getWorkbooksAndFoldersResponse from '../../fixtures/getWorkbooksAndFolders.json'
import getSharedWorkbooksAndFoldersResponse from '../../fixtures/getSharedWorkbooksAndFolders.json'
import starredFoldersAndPinnedWorkbooksInfo from '../../fixtures/starredFoldersAndPinnedWorkbooksInfo.json'
import searchFoldersAndWorkbooksAPIResponse from '../../fixtures/searchFoldersAndWorkbooksAPIResponse.json'
import getRootFolderDetailsResponse from '../../fixtures/getRootFolderDetails.json'
import getRolesData from '../../fixtures/getRolesData.json'
import getTrashFoldersAndWorkbooks from '../../fixtures/getTrashFoldersAndWorkbooks.json'
import getFolderId from '../../fixtures/getFolderId.json'
import getUserProjectsResponse from '../../fixtures/getUserProjects.json'
import createFolderResponse from '../../fixtures/createFolderResponse.json'
import createWorkbookResponse from '../../fixtures/createWorkbookResponse.json'

import {
   GetWorkbooksAndFoldersResponse,
   GetSharedWorkbooksAndFoldersResponse,
   PinnedWorkbooksAndStarredFolders,
   GetRootFolderDetailsAPIResponseType,
   GetRolesAPIResponseType,
   SortRequestType,
   TrashFoldersAndWorkbooksResponseType,
   GetFolderIdOfAWorkbookResponse,
   BaseFolderType,
   CreateFolderResponse
} from '../../stores/types'

import DashboardService from '.'

class DashboardFixture implements DashboardService {
   getWorkbooksAndFoldersAPI(): Promise<GetWorkbooksAndFoldersResponse> {
      return resolveWithTimeout(getWorkbooksAndFoldersResponse)
   }

   getMoveWorkbooksAndFoldersAPI(): Promise<GetWorkbooksAndFoldersResponse> {
      return resolveWithTimeout(getWorkbooksAndFoldersResponse)
   }

   getSharedWorkbooksAndFoldersAPI(): Promise<
      GetSharedWorkbooksAndFoldersResponse
   > {
      return resolveWithTimeout(getSharedWorkbooksAndFoldersResponse)
   }

   getFolderIdOfAWorkbook(): Promise<GetFolderIdOfAWorkbookResponse> {
      return resolveWithTimeout(getFolderId)
   }

   getSharedWorkbooksAndFoldersOfASubFolderAPI(): Promise<
      GetSharedWorkbooksAndFoldersResponse
   > {
      return resolveWithTimeout(getSharedWorkbooksAndFoldersResponse)
   }

   getPinnedWorkbooksAndStarredFoldersAPI(): Promise<
      PinnedWorkbooksAndStarredFolders
   > {
      return resolveWithTimeout(starredFoldersAndPinnedWorkbooksInfo)
   }

   getSearchFoldersAndWorkbooksAPI() {
      return resolveWithTimeout(searchFoldersAndWorkbooksAPIResponse)
   }

   createFolderAPI(): Promise<CreateFolderResponse> {
      return resolveWithTimeout(createFolderResponse)
   }

   createWorkbookAPI() {
      return resolveWithTimeout(createWorkbookResponse)
   }

   getRootFolderDetailsAPI(): Promise<GetRootFolderDetailsAPIResponseType> {
      return resolveWithTimeout(getRootFolderDetailsResponse)
   }

   getMoveRootFolderDetailsAPI(): Promise<GetRootFolderDetailsAPIResponseType> {
      return resolveWithTimeout(getRootFolderDetailsResponse)
   }

   addOrRemoveFolderStarAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   pinOrUnpinWorkbookAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   getRolesAPI(): Promise<GetRolesAPIResponseType> {
      return resolveWithTimeout(getRolesData)
   }

   shareFolderAPI(): Promise<any> {
      return resolveWithTimeout({})
   }

   shareWorkbookAPI(): Promise<any> {
      return resolveWithTimeout({})
   }

   renameForWorkbookAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   renameForFolderAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   moveFolderAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   moveWorkbookAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   deleteFolderAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   deleteWorkbookAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   trashFoldersAndWorkbooksAPI(
      request: SortRequestType
   ): Promise<TrashFoldersAndWorkbooksResponseType> {
      return resolveWithTimeout(getTrashFoldersAndWorkbooks)
   }

   restoreFolderAPI(folderId: string): Promise<{}> {
      return resolveWithTimeout({})
   }

   restoreWorkbookAPI(workbookId: string): Promise<{}> {
      return resolveWithTimeout({})
   }

   deleteForeverFolderAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   deleteForeverWorkbookAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   emptyTrashAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   getUserProjectsAPI(): Promise<Array<BaseFolderType>> {
      return resolveWithTimeout(getUserProjectsResponse)
   }
}

export default DashboardFixture
