import {
   GetChecklistResponseType,
   NewChecklistItemType,
   GetChecklistRequestType,
   PostChecklistItemResponseType,
   PutChecklistItemRequestType
} from '../../stores/types'

export default interface ChecklistService {
   getChecklist(
      requestObject: GetChecklistRequestType
   ): Promise<GetChecklistResponseType>

   postChecklistItem(
      newItem: NewChecklistItemType
   ): Promise<PostChecklistItemResponseType>

   putChecklistItem(
      itemId: string,
      updatedItem: PutChecklistItemRequestType
   ): Promise<{}>

   removeChecklistItemAPI(itemId: string): Promise<{}>
}
