import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import workbookDetailsAPIResponse from '../../fixtures/getWorkbookDetailsAPIResponse.json'
import getSharedUsersResponse from '../../fixtures/getSharedUsersResponse.json'
import workbookChildDetailsAPIResponse from '../../fixtures/getWorkbookChildDetailsAPIResponse.json'
import createPageResponse from '../../fixtures/createPageResponse.json'
import getPageDetailsResponse from '../../fixtures/getPageDetailsResponse.json'

import {
   GetWorkbookChildDetailsAPIResponse,
   CreatePageResponse,
   PageResponseType
} from '../../stores/types'

import WorkbookService from '.'

class WorkbookFixture implements WorkbookService {
   getWorkbookDetailsAPI() {
      return resolveWithTimeout(workbookDetailsAPIResponse)
   }

   updatePageObjectiveWithDescriptionAPI() {
      return resolveWithTimeout({})
   }

   getWorkbookChildDetailsAPI(): Promise<GetWorkbookChildDetailsAPIResponse> {
      return resolveWithTimeout(workbookChildDetailsAPIResponse)
   }

   mergeCardsAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   getSharedUsersDetailsAPI() {
      return resolveWithTimeout(getSharedUsersResponse)
   }

   createPageAPI(): Promise<CreatePageResponse> {
      return resolveWithTimeout(createPageResponse)
   }

   getPageDetailsAPI(): Promise<PageResponseType> {
      return resolveWithTimeout(getPageDetailsResponse)
   }

   reorderPageAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }

   movePageAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }
}

export default WorkbookFixture
