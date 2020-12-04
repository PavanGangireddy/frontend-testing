import { AssignmentSubmitResponse } from '../../../stores/types'

interface PageService {
   submitAssignmentAPI: (pageId: string) => Promise<AssignmentSubmitResponse>
}

export default PageService
