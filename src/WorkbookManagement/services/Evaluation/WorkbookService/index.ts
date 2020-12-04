import {
   AssignmentPageResponse,
   GetAssignmentWorkbookResponse,
   PublishWorkbookRequest
} from '../../../stores/types'

interface WorkbookService {
   getAssignmentWorkbookDetailsAPI: (
      workbookId: string
   ) => Promise<GetAssignmentWorkbookResponse>

   publishWorkbookAPI: (
      workbookId: string,
      request: PublishWorkbookRequest
   ) => Promise<{}>

   getAssignmentPageDetailsAPI: (
      pageId: string
   ) => Promise<AssignmentPageResponse>
}

export default WorkbookService
