import { create, ApisauceInstance } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import Config from '../../../Common/constants/EnvironmentConstants'

import {
   GetWorkbooksAndFoldersResponse,
   GetSharedWorkbooksAndFoldersResponse,
   PinnedWorkbooksAndStarredFolders,
   GetRootFolderDetailsAPIResponseType,
   ShareFolderRequest,
   ShareWorkbookRequest,
   WorkbookRenameRequestType,
   FolderRenameRequestType,
   MoveFolderRequest,
   MoveWorkbookRequest,
   TrashFoldersAndWorkbooksResponseType,
   SortRequestType,
   GetFolderIdOfAWorkbookResponse,
   BaseFolderType,
   CreateFolderResponse,
   CreateWorkbookResponse
} from '../../stores/types'

import endpoints from '../endpoints'

import DashboardService from '.'

const FOLDER_MANAGEMENT_URL = `${Config.BSS_BASE_URL}workbook_management/`

class DashboardAPI implements DashboardService {
   api: ApisauceInstance
   networkCallWithAPISauce: Function

   constructor(authNetworkCallWithApisauce) {
      this.api = create({
         baseURL: FOLDER_MANAGEMENT_URL
      })
      this.networkCallWithAPISauce = authNetworkCallWithApisauce
   }

   getWorkbooksAndFoldersAPI(
      request: SortRequestType,
      folderId: string
   ): Promise<GetWorkbooksAndFoldersResponse> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.getWorkBooksAndFolders}${folderId}/v1/`,
         request,
         apiMethods.post
      )
   }

   getMoveWorkbooksAndFoldersAPI(
      request: SortRequestType,
      folderId: string
   ): Promise<GetWorkbooksAndFoldersResponse> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.getWorkBooksAndFolders}${folderId}/v1/`,
         request,
         apiMethods.post
      )
   }

   getSharedWorkbooksAndFoldersAPI(): Promise<
      GetSharedWorkbooksAndFoldersResponse
   > {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.getSharedWorkBooksAndFolders}`,
         {},
         apiMethods.post
      )
   }

   getSharedWorkbooksAndFoldersOfASubFolderAPI(
      request: SortRequestType,
      folderId: string
   ): Promise<GetSharedWorkbooksAndFoldersResponse> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.getWorkBooksAndFolders}${folderId}/${endpoints.sharedFolderDetails}`,
         request,
         apiMethods.post
      )
   }

   getPinnedWorkbooksAndStarredFoldersAPI(): Promise<
      PinnedWorkbooksAndStarredFolders
   > {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.pinnedWorkbooksAndStarredFolders,
         {},
         apiMethods.get
      )
   }

   getSearchFoldersAndWorkbooksAPI(request) {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.getSearchFoldersAndWorkbooks,
         request,
         apiMethods.post
      )
   }

   createFolderAPI(request): Promise<CreateFolderResponse> {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.createFolder,
         request,
         apiMethods.post
      )
   }

   createWorkbookAPI(request): Promise<CreateWorkbookResponse> {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.createWorkbook,
         request,
         apiMethods.post
      )
   }

   getRootFolderDetailsAPI(): Promise<GetRootFolderDetailsAPIResponseType> {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.rootFolderDetails,
         {},
         apiMethods.post
      )
   }

   getMoveRootFolderDetailsAPI(): Promise<GetRootFolderDetailsAPIResponseType> {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.rootFolderDetails,
         {},
         apiMethods.post
      )
   }

   addOrRemoveFolderStarAPI(folderId: string): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.folder}${folderId}/star_or_unstar/v1/`,
         {},
         apiMethods.put
      )
   }

   pinOrUnpinWorkbookAPI(workbookId: string): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.workbook}${workbookId}/pin_or_unpin/v1/`,
         {},
         apiMethods.put
      )
   }

   getRolesAPI(): Promise<any> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.getRolesData}v1/`,
         {},
         apiMethods.get
      )
   }

   shareFolderAPI(request: ShareFolderRequest): Promise<any> {
      const { folder_id: folderId, ...otherRequest } = request
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.folders}${folderId}/share/v1/`,
         otherRequest,
         apiMethods.post
      )
   }

   shareWorkbookAPI(request: ShareWorkbookRequest): Promise<any> {
      const { workbook_id: workbookId, ...otherRequest } = request
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.workbooks}${workbookId}/share/v1/`,
         otherRequest,
         apiMethods.post
      )
   }

   renameForWorkbookAPI(
      request: WorkbookRenameRequestType,
      workbookId: string
   ): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.workbooks}${workbookId}/v1/`,
         request,
         apiMethods.put
      )
   }

   renameForFolderAPI(
      request: FolderRenameRequestType,
      folderId: string
   ): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.getWorkBooksAndFolders}${folderId}/v1/`,
         request,
         apiMethods.put
      )
   }

   moveFolderAPI(request: MoveFolderRequest): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.moveFolder,
         request,
         apiMethods.post
      )
   }

   moveWorkbookAPI(request: MoveWorkbookRequest): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.moveWorkbook,
         request,
         apiMethods.post
      )
   }

   deleteFolderAPI(folderId: string): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.getWorkBooksAndFolders}${folderId}/trash/v1/`,
         {},
         apiMethods.delete
      )
   }

   deleteWorkbookAPI(workbookId: string): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.workbooks}${workbookId}/trash/v1/`,
         {},
         apiMethods.delete
      )
   }

   trashFoldersAndWorkbooksAPI(
      request: SortRequestType
   ): Promise<TrashFoldersAndWorkbooksResponseType> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.trashFoldersAndWorkbooks}`,
         request,
         apiMethods.post
      )
   }

   restoreFolderAPI(folderId: string): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.getWorkBooksAndFolders}${folderId}/restore/v1/`,
         {},
         apiMethods.put
      )
   }

   restoreWorkbookAPI(workbookId: string): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.workbooks}${workbookId}/restore/v1/`,
         {},
         apiMethods.put
      )
   }

   deleteForeverFolderAPI(folderId: string): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.getWorkBooksAndFolders}${folderId}/delete/v1/`,
         {},
         apiMethods.delete
      )
   }

   deleteForeverWorkbookAPI(workbookId: string): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.workbooks}${workbookId}/delete/v1/`,
         {},
         apiMethods.delete
      )
   }

   getFolderIdOfAWorkbook(
      workbookId: string
   ): Promise<GetFolderIdOfAWorkbookResponse> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.workbook}${workbookId}/${endpoints.getParentFolderId}`,
         {},
         apiMethods.get
      )
   }

   emptyTrashAPI(): Promise<{}> {
      return this.networkCallWithAPISauce(
         this.api,
         `${endpoints.emptyTrash}`,
         {},
         apiMethods.delete
      )
   }

   getUserProjectsAPI(
      request: SortRequestType
   ): Promise<Array<BaseFolderType>> {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.userProjects,
         request,
         apiMethods.post
      )
   }
}

export default DashboardAPI
