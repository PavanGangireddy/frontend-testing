export interface CreateSectionAPIRequest {
   list_id: string
   section_name: string
}

export interface Attachment {
   attachment_id: string
   attachment_url: string
   creation_datetime: string
}

export interface CardDetails {
   card_id: string
   card_title: string
   notes: string | null
   priority: number | null
   label: string | null
   due_datetime: string | null
   attachments: Array<Attachment>
}

export interface UpdateCardNameRequest {
   card_title: string
}
export interface UpdateCardNoteRequest {
   card_note: string
}

export interface AddAttachmentRequest {
   url: string
}

export interface AddAttachmentResponse {
   attachment_id: string
}

export interface UpdateAttachmentURLRequest {
   url: string
}
export interface SectionObjectProps {
   sectionId: string
   sectionName: string
}

export interface BaseModelObjectType {
   id: string
   name: string
}

export interface CardResponseType {
   card_id: string
   card_title: string
   has_attachments: boolean
   has_notes: boolean
   priority: number | null
   label: string | null
   card_style_type?: string
}

export interface SectionResponseType {
   section_id: string
   section_name: string
   cards: Array<CardResponseType>
}

export interface ListResponseType {
   list_id: string
   list_name: string
   sections: Array<SectionResponseType>
}

export interface PageResponseType {
   page_id: string
   page_name: string
   page_objective: string
   page_description: string
   lists: Array<ListResponseType>
}

export interface AttachmentDetailsProps {
   attachmentId: string
   url: string
   creationDateTime: string
}

export interface PageObjectiveWithDescriptionType {
   page_objective: string
   description: string
}

export interface PageNameType {
   page_name: string
}

export interface PageIdAndNameResponseType {
   page_id: string
   page_name: string
}

export interface AssignmentDurationType {
   total_time_in_seconds: number
   left_time_in_seconds: number
}

export interface WorkbookResponseType {
   workbook_id: string
   workbook_name: string
   workbook_status?: string
   total_pages: Array<PageIdAndNameResponseType>
   assignment_duration?: AssignmentDurationType | null
   evaluation_type?: string
}

export interface GetWorkbookDetailsAPIResponseType
   extends WorkbookResponseType {
   page: PageResponseType
}

export interface CreateCardRequest {
   section_id: string
   card_title: string
   label: string | null
   priority: number | null
   due_datetime: string | null
}
export interface AddSectionResponse {
   section_id: string
}
export interface CreatePageListAPIRequestType {
   page_id: string
   list_name: string
   order: number
}

export interface CreateSectionResponse {
   section_id: string
}

export interface CreateCardResponse {
   card_id: string
}

export interface ReorderListSectionAPIRequestType {
   list_id: string
   order: number
}

export interface ReorderPageListAPIRequestType {
   order: number
}

export interface ReorderSectionCardAPIRequestType {
   section_id: string
   order: number
}

export interface GetMultipleCardDetailsRequestType {
   card_ids: Array<string>
}

export interface GetMultipleCardDetailsResponseType {
   card_details: Array<CardDetails>
}
export interface RenameListAPIRequestType {
   list_name: string
}
export interface UpdatePriorityRequest {
   priority: number | null
}

export interface UpdateLabelRequest {
   label: string | null
}

export interface UpdateDueDateAndTimeRequest {
   due_datetime: string | null
}

export interface SelectedColorObjectType {
   textColor: string | null
   backgroundColor: string | null
   borderColor: string | null
}

export interface SelectedPriorityObjectType {
   priority: number
}

interface ChildSectionResponse {
   section_id: string
   section_name: string
}

interface ChildListResponse {
   list_id: string
   list_name: string
   sections: Array<ChildSectionResponse>
}

interface ChildPageResponse {
   page_id: string
   page_name: string
   lists: Array<ChildListResponse>
}

export interface GetWorkbookChildDetailsAPIResponse {
   workbook_id: string
   workbook_name: string
   pages: Array<ChildPageResponse>
}

export interface MergeCardsRequestType {
   section_id: string
   card_title: string
   label: string | null
   priority: number | null
   card_notes: string
   attachments: Array<string>
   delete_card_ids: Array<string>
   due_datetime: string | null
}
export interface UpdateSectionNameRequest {
   section_name: string
}

export interface User {
   profile_pic_url: string
   name: string
   role: string
   email: string
}

interface ChildSectionResponse {
   section_id: string
   section_name: string
}

interface ChildListResponse {
   list_id: string
   list_name: string
   sections: Array<ChildSectionResponse>
}

interface ChildPageResponse {
   page_id: string
   page_name: string
   lists: Array<ChildListResponse>
}

export interface MoveListRequestType {
   page_id: string
}

export interface MoveSectionRequestType {
   list_id: string
}

export interface MoveCardRequestType {
   section_id: string
}

export interface CreatePageResponse {
   page_id: string
}

export interface ReorderPageRequest {
   order: number
}

export interface MovePageRequest {
   workbook_id: string
}

export interface AssignmentSubmitResponse {
   total_score: number
   user_score: number
   correct_answers: number
   wrong_answers: number
}

export interface AssignmentPageResponse extends PageResponseType {
   page_status: string
   score_details: AssignmentSubmitResponse | null
}

export interface GetAssignmentWorkbookResponse extends WorkbookResponseType {
   page: AssignmentPageResponse
}

export interface PublishWorkbookRequest {
   workbook_type: string
   group_id: string | null
   evaluation_type: string | null
   start_datetime: string | null
   end_datetime: string | null
   cards_layout: string | null
   duration_in_seconds: number | null
}
