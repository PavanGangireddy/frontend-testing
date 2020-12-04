import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import getLearningsWorkbooks from '../../fixtures/getLearningWorkbooks.json'

import { GetLearningsResponseType } from '../../stores/types'

import LearningsService from '.'

class LearningsFixture implements LearningsService {
   getLearningWorkbooksAPI(): Promise<GetLearningsResponseType> {
      return resolveWithTimeout(getLearningsWorkbooks)
   }
}

export default LearningsFixture
