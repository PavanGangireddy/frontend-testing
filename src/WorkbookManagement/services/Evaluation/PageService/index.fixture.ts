import { resolveWithTimeout } from '../../../../Common/utils/TestUtils'

import assignmentSubmitResponse from '../../../fixtures/assignmentSubmitResponse.json'
import { AssignmentSubmitResponse } from '../../../stores/types'

import PageService from '.'

class PageFixture implements PageService {
   submitAssignmentAPI(): Promise<AssignmentSubmitResponse> {
      return resolveWithTimeout(assignmentSubmitResponse)
   }
}

export default PageFixture
