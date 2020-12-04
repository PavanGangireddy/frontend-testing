import {
   CreatePageListAPIRequestType,
   ReorderListSectionAPIRequestType,
   ReorderPageListAPIRequestType,
   PageNameType,
   ReorderSectionCardAPIRequestType,
   GetMultipleCardDetailsRequestType,
   MoveListRequestType
} from '../../stores/types'

interface PageService {
   createPageListAPI: (
      requestObject: CreatePageListAPIRequestType
   ) => Promise<{}>

   deletePageListAPI: (listID: string) => Promise<{}>

   reorderListSectionAPI: (
      sectionId: string,
      request: ReorderListSectionAPIRequestType
   ) => Promise<{}>

   reorderPageListAPI: (
      listId: string,
      request: ReorderPageListAPIRequestType
   ) => Promise<{}>

   updatePageNameAPI: (
      workbookId: string,
      requestObject: PageNameType
   ) => Promise<{}>

   reorderSectionCardAPI: (
      cardId: string,
      request: ReorderSectionCardAPIRequestType
   ) => Promise<{}>

   getMultipleCardDetailsAPI: (
      request: GetMultipleCardDetailsRequestType
   ) => Promise<any>

   moveListAPI: (listId: string, request: MoveListRequestType) => Promise<{}>
}

export default PageService
