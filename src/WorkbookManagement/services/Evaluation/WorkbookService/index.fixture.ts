import { resolveWithTimeout } from '../../../../Common/utils/TestUtils'

import {
   AssignmentPageResponse,
   GetAssignmentWorkbookResponse
} from '../../../stores/types'
import getAssignmentWorkbookDetailsAPIResponse from '../../../fixtures/getAssignmentWorkbookResponse.json'
import getAssignmentPageDetailsAPIResponse from '../../../fixtures/getAssignmentPageResponse.json'

import WorkbookService from '.'

class WorkbookFixture implements WorkbookService {
   getAssignmentWorkbookDetailsAPI(): Promise<GetAssignmentWorkbookResponse> {
      return resolveWithTimeout(getAssignmentWorkbookDetailsAPIResponse)
   }

   publishWorkbookAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   getAssignmentPageDetailsAPI(): Promise<AssignmentPageResponse> {
      return resolveWithTimeout(getAssignmentPageDetailsAPIResponse)
   }
}

export default WorkbookFixture
