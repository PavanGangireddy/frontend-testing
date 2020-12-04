import {
   GetWorkbookDetailsAPIResponseType,
   PageObjectiveWithDescriptionType,
   GetWorkbookChildDetailsAPIResponse,
   MergeCardsRequestType,
   User,
   CreatePageResponse,
   PageResponseType,
   ReorderPageRequest,
   MovePageRequest
} from '../../stores/types'

interface WorkbookService {
   getWorkbookDetailsAPI: (
      workbookId: string
   ) => Promise<GetWorkbookDetailsAPIResponseType>

   updatePageObjectiveWithDescriptionAPI: (
      workbookId: string,
      requestObject: PageObjectiveWithDescriptionType
   ) => Promise<any>

   getWorkbookChildDetailsAPI: (
      workbookId: string
   ) => Promise<GetWorkbookChildDetailsAPIResponse>

   mergeCardsAPI: (request: MergeCardsRequestType) => Promise<{}>

   getSharedUsersDetailsAPI: (workbookId: string) => Promise<Array<User>>

   createPageAPI: (workbookId: string) => Promise<CreatePageResponse>

   getPageDetailsAPI: (pageId: string) => Promise<PageResponseType>

   reorderPageAPI: (pageId: string, request: ReorderPageRequest) => Promise<{}>

   movePageAPI: (pageId: string, request: MovePageRequest) => Promise<{}>
}

export default WorkbookService
