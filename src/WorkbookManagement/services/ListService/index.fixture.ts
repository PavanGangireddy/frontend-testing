import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import createSectionResponse from '../../fixtures/createSectionResponse.json'

import ListService from '.'

class ListFixture implements ListService {
   createSectionAPI() {
      return resolveWithTimeout(createSectionResponse)
   }

   deleteSectionAPI() {
      return resolveWithTimeout({})
   }

   renameListAPI(requestObject, listId) {
      return resolveWithTimeout({})
   }

   moveSectionAPI(): Promise<{}> {
      return resolveWithTimeout({})
   }
}

export default ListFixture
