import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import createCardResponse from '../../fixtures/createCardResponse.json'

import SectionService from '.'

class SectionFixture implements SectionService {
   createCardAPI() {
      return resolveWithTimeout(createCardResponse)
   }

   updateSectionNameAPI(sectionId, requestObject) {
      return resolveWithTimeout({})
   }

   deleteCardAPI() {
      return resolveWithTimeout({})
   }

   moveCardAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }
}

export default SectionFixture
