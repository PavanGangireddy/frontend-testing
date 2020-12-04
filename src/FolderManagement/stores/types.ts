interface BaseWorkbookAndFolderInfoItemType {
   last_modified: string
   is_published_by_us: boolean
}

export interface BaseFolderType extends BaseWorkbookAndFolderInfoItemType {
   folder_id: string
   folder_name: string
}

export interface FolderInfoItemType extends BaseFolderType {
   is_starred: boolean
   folder_type: string
   is_locked?: boolean
}

export interface WorkbookInfoItemType
   extends BaseWorkbookAndFolderInfoItemType {
   workbook_id: string
   workbook_name: string
   is_pinned: boolean
}

export interface Owner {
   name: string
   url: string
}

export interface SharedFolderInfoItemType extends FolderInfoItemType {
   owner?: Owner
}

export interface SharedWorkbookInfoItemType extends WorkbookInfoItemType {
   owner?: Owner
}

export interface PathType {
   folder_name: string
   folder_id: string
   folder_type: string
}

export interface GetWorkbooksAndFoldersResponse {
   folders: Array<FolderInfoItemType>
   workbooks: Array<WorkbookInfoItemType>
   path: Array<PathType>
}

export interface GetSharedWorkbooksAndFoldersResponse {
   folders: Array<SharedFolderInfoItemType>
   workbooks: Array<SharedWorkbookInfoItemType>
   path?: Array<PathType>
}

export interface GetFolderIdOfAWorkbookResponse {
   parent_folder_id: string
}

export interface PinnedWorkbook {
   workbook_id: string
   workbook_name: string
}

export interface StarredFolder {
   folder_id: string
   folder_name: string
}

export interface PinnedWorkbookWithPublishStatus extends PinnedWorkbook {
   is_published_by_us: boolean
}

export interface StarredFolderWithPublishStatus extends StarredFolder {
   is_published_by_us: boolean
}

export interface PinnedWorkbooksAndStarredFolders {
   pinned_workbooks: Array<PinnedWorkbookWithPublishStatus>
   starred_folders: Array<StarredFolderWithPublishStatus>
}

export interface GetSearchFoldersAndWorkbooksRequest {
   search_field: string
   value: string
}

export interface CreateFolderRequest {
   parent_folder_id: string
   folder_name: string
}

export interface CreateFolderResponse {
   folder_id: string
}

export interface CreateWorkbookRequest {
   folder_id: string
   workbook_id: string
}

export interface CreateWorkbookResponse {
   workbook_id: string
}

export interface GetRootFolderDetailsAPIResponseType {
   root_folder_id: string
}

export interface UpdateNameRequestType {
   id: string
   name: string
}

interface RoleDataObject {
   role: string
   display_name: string
}

export interface GetRolesAPIResponseType {
   roles: RoleDataObject[]
}

export interface ShareFolderRequest {
   folder_id: string
   email: string
   role: string
}

export interface ShareWorkbookRequest {
   workbook_id: string
   email: string
   role: string
}

export interface WorkbookRenameRequestType {
   workbook_name: string
}

export interface FolderRenameRequestType {
   folder_name: string
}

export interface MoveFolderRequest {
   folder_id: string
   destination_parent_folder_id: string
}

export interface MoveWorkbookRequest {
   workbook_id: string
   folder_id: string
}

export interface TrashFoldersAndWorkbooksResponseType {
   folders: Array<FolderInfoItemType>
   workbooks: Array<WorkbookInfoItemType>
}

export interface PublishedWorkbookType {
   workbook_id: string
   workbook_name: string
   published_date_time: string
   total_selected_users_count: number
   published_users_count: number
}

export interface SortRequestType {
   sort_by: string
   order_by: string
}

export interface PublishWorkbookResponse {
   published_workbooks: Array<PublishedWorkbookType>
}

export interface UpcomingWorkbookResponseType extends PinnedWorkbook {
   available_on: string
   deadline: string
}

export interface CompletedWorkbookResponseType extends PinnedWorkbook {
   user_secured_score: number | null
   total_score: number | null
   submitted_datetime: string | null
}
export interface ActiveWorkbookResponseType
   extends PinnedWorkbook,
      CompletedWorkbookResponseType {
   deadline: string
   status: string
}

export interface GetAssignmentsResponseType {
   active: Array<ActiveWorkbookResponseType>
   upcoming: Array<UpcomingWorkbookResponseType>
   completed: Array<CompletedWorkbookResponseType>
   assignments_folder_id: string
}

export interface GetLearningsResponseType {
   workbooks: Array<PinnedWorkbook>
   learnings_folder_id: string
}

export interface UserGuideMultimedia {
   multimedia_url: string
   format_type: string
}

export interface AssignmentInstructionsResponse {
   objective: string | null
   description: string | null
}
