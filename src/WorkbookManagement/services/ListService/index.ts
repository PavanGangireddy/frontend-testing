import {
   CreateSectionAPIRequest,
   CreateSectionResponse,
   RenameListAPIRequestType,
   MoveSectionRequestType,
   MoveListRequestType
} from '../../stores/types'

interface ListService {
   createSectionAPI: (
      requestObject: CreateSectionAPIRequest
   ) => Promise<CreateSectionResponse>

   deleteSectionAPI: (sectionId: string) => Promise<{}>

   renameListAPI: (
      requestObject: RenameListAPIRequestType,
      listId: string
   ) => Promise<{}>

   moveSectionAPI: (
      sectionId: string,
      request: MoveSectionRequestType
   ) => Promise<{}>
}

export default ListService
