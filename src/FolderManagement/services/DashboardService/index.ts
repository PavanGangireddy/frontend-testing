import {
   PinnedWorkbooksAndStarredFolders,
   GetSearchFoldersAndWorkbooksRequest,
   CreateFolderRequest,
   CreateWorkbookRequest,
   GetWorkbooksAndFoldersResponse,
   GetSharedWorkbooksAndFoldersResponse,
   GetRootFolderDetailsAPIResponseType,
   ShareFolderRequest,
   ShareWorkbookRequest,
   GetRolesAPIResponseType,
   WorkbookRenameRequestType,
   FolderRenameRequestType,
   MoveFolderRequest,
   MoveWorkbookRequest,
   SortRequestType,
   TrashFoldersAndWorkbooksResponseType,
   GetFolderIdOfAWorkbookResponse,
   BaseFolderType,
   CreateFolderResponse,
   CreateWorkbookResponse
} from '../../stores/types'

export default interface DashboardService {
   getWorkbooksAndFoldersAPI: (
      request: SortRequestType,
      folderId: string
   ) => Promise<GetWorkbooksAndFoldersResponse>

   getMoveWorkbooksAndFoldersAPI: (
      request: SortRequestType,
      folderId: string
   ) => Promise<GetWorkbooksAndFoldersResponse>

   getFolderIdOfAWorkbook: (
      workbookId: string
   ) => Promise<GetFolderIdOfAWorkbookResponse>

   getSharedWorkbooksAndFoldersAPI: () => Promise<
      GetSharedWorkbooksAndFoldersResponse
   >

   getSharedWorkbooksAndFoldersOfASubFolderAPI: (
      request: SortRequestType,
      folderId: string
   ) => Promise<GetSharedWorkbooksAndFoldersResponse>

   getPinnedWorkbooksAndStarredFoldersAPI: () => Promise<
      PinnedWorkbooksAndStarredFolders
   >

   //TODO: add return types
   getSearchFoldersAndWorkbooksAPI: (
      requestObject: GetSearchFoldersAndWorkbooksRequest
   ) => Promise<any>

   createFolderAPI: (
      requestObject: CreateFolderRequest
   ) => Promise<CreateFolderResponse>

   shareFolderAPI: (requestObject: ShareFolderRequest) => Promise<any>

   shareWorkbookAPI: (requestObject: ShareWorkbookRequest) => Promise<any>

   getRolesAPI: () => Promise<GetRolesAPIResponseType>

   createWorkbookAPI: (
      requestObject: CreateWorkbookRequest
   ) => Promise<CreateWorkbookResponse>

   getRootFolderDetailsAPI: () => Promise<GetRootFolderDetailsAPIResponseType>

   getMoveRootFolderDetailsAPI: () => Promise<
      GetRootFolderDetailsAPIResponseType
   >

   addOrRemoveFolderStarAPI: (folderId: string) => Promise<{}>

   pinOrUnpinWorkbookAPI: (workbookId: string) => Promise<{}>

   renameForFolderAPI: (
      request: FolderRenameRequestType,
      folderId: string
   ) => Promise<{}>

   renameForWorkbookAPI: (
      request: WorkbookRenameRequestType,
      workbookId: string
   ) => Promise<{}>

   moveFolderAPI: (request: MoveFolderRequest) => Promise<{}>

   moveWorkbookAPI: (request: MoveWorkbookRequest) => Promise<{}>
   deleteFolderAPI: (folderId: string) => Promise<{}>

   deleteWorkbookAPI: (workbookId: string) => Promise<{}>

   trashFoldersAndWorkbooksAPI: (
      request: SortRequestType
   ) => Promise<TrashFoldersAndWorkbooksResponseType>

   restoreFolderAPI: (folderId: string) => Promise<{}>

   restoreWorkbookAPI: (workbookId: string) => Promise<{}>

   deleteForeverFolderAPI: (folderId: string) => Promise<{}>

   deleteForeverWorkbookAPI: (workbookId: string) => Promise<{}>

   emptyTrashAPI: () => Promise<{}>

   getUserProjectsAPI: (
      request: SortRequestType
   ) => Promise<Array<BaseFolderType>>
}
