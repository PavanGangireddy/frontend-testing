import {
   GetAssignmentsResponseType,
   AssignmentInstructionsResponse
} from '../../stores/types'

export default interface AssignmentsService {
   getAssignmentsAPI: () => Promise<GetAssignmentsResponseType>

   getAssignmentInstructionsAPI: (
      workbookId: string
   ) => Promise<AssignmentInstructionsResponse>
}
