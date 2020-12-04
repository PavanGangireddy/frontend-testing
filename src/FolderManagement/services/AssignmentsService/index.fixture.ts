import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import getAssignments from '../../fixtures/getAssignments.json'
import getAssignmentInstructions from '../../fixtures/getAssignmentInstructions.json'

import {
   GetAssignmentsResponseType,
   AssignmentInstructionsResponse
} from '../../stores/types'

import AssignmentsService from '.'

class AssignmentsFixture implements AssignmentsService {
   getAssignmentsAPI(): Promise<GetAssignmentsResponseType> {
      return resolveWithTimeout(getAssignments)
   }

   getAssignmentInstructionsAPI(): Promise<AssignmentInstructionsResponse> {
      return resolveWithTimeout(getAssignmentInstructions)
   }
}

export default AssignmentsFixture
