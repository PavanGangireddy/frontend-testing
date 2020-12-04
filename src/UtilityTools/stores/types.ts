export interface GetChecklistRequestType {
   entity_id: string
   entity_type: string
}

export interface ChecklistItemType {
   checklist_item_id: string
   text: string
   is_checked: boolean
}

export interface GetChecklistResponseType {
   checklist: Array<ChecklistItemType>
}

export interface NewChecklistItemType {
   entity_id: string
   entity_type: string
   text: string
   is_checked: boolean
}

export interface PostChecklistItemResponseType {
   checklist_item_id: string
}

export interface PutChecklistItemRequestType {
   text: string
   is_checked: boolean
}

export interface TimerRequestType {
   entity_id: string
   entity_type: string
}

export interface TimerResponseType {
   duration_in_seconds: number
   is_running: boolean
}

export interface NewCheckListType {
   text: string
   isChecked: boolean
}
