import {
   CreateCardRequest,
   CreateCardResponse,
   UpdateSectionNameRequest,
   MoveCardRequestType
} from '../../stores/types'

interface SectionService {
   createCardAPI: (
      requestObject: CreateCardRequest
   ) => Promise<CreateCardResponse>

   updateSectionNameAPI: (
      sectionId: string,
      requestObject: UpdateSectionNameRequest
   ) => Promise<{}>

   deleteCardAPI: (cardId: string) => Promise<{}>

   moveCardAPI: (cardId: string, request: MoveCardRequestType) => Promise<{}>
}

export default SectionService
