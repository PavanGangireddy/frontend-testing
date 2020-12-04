import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import getPublishedFolders from '../../fixtures/getPublishedWorkbooks.json'
import { SortRequestType, PublishWorkbookResponse } from '../../stores/types'

import PublishService from '.'

class PublishFixture implements PublishService {
   getPublishedWorkbookAPI(
      request: SortRequestType
   ): Promise<PublishWorkbookResponse> {
      return resolveWithTimeout(getPublishedFolders)
   }
}

export default PublishFixture
