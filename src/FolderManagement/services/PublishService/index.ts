import { SortRequestType, PublishWorkbookResponse } from '../../stores/types'

export default interface PublishService {
   getPublishedWorkbookAPI: (
      request: SortRequestType
   ) => Promise<PublishWorkbookResponse>
}
