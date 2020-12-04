import { GetLearningsResponseType } from '../../stores/types'

export default interface LearningsService {
   getLearningWorkbooksAPI: () => Promise<GetLearningsResponseType>
}
