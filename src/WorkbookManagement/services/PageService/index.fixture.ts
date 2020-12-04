import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import multipleCardDetailsAPIResponse from '../../fixtures/getMultipleCardDetails.json'
import { GetMultipleCardDetailsResponseType } from '../../stores/types'

import PageService from '.'

class PageFixture implements PageService {
   createPageListAPI() {
      return resolveWithTimeout({})
   }

   reorderListSectionAPI() {
      return resolveWithTimeout({})
   }

   reorderPageListAPI() {
      return resolveWithTimeout({})
   }

   updatePageNameAPI() {
      return resolveWithTimeout({})
   }

   deletePageListAPI(listId: string): Promise<{}> {
      return resolveWithTimeout({})
   }

   reorderSectionCardAPI() {
      return resolveWithTimeout({})
   }

   getMultipleCardDetailsAPI(): Promise<GetMultipleCardDetailsResponseType> {
      return resolveWithTimeout(multipleCardDetailsAPIResponse)
   }

   moveListAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }
}

export default PageFixture
