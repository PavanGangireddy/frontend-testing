// NOTE: Discussions
export interface EntityObjectType {
   entity_id: string
   entity_type: string
}
export interface GetDiscussionsObjectType {
   offset: number
   limit: number
   filter_by: string
   sort_by: string
}
export interface GetDiscussionsRequestObjectType
   extends GetDiscussionsObjectType,
      EntityObjectType {}
export interface DiscussionObjectType {
   discussion_id: string
   description: string
   title: string
   created_at: string
   author: {
      user_id: string
      name: string
      profile_pic_url: string
   }
   is_editable: boolean
   total_comments_count: number
}
export interface GetDiscussionsResponseObjectType {
   discussions: DiscussionObjectType[]
   total_count: number
}

export interface PostDiscussionObjectType {
   title: string
   description: string
}
export interface PostDiscussionRequestObjectType
   extends EntityObjectType,
      PostDiscussionObjectType {}
export interface EntityItemObjectType {
   current_item_id: string
}
export type UpdateDiscussionObjectType = PostDiscussionObjectType
export interface UpdateDiscussionRequestObjectType
   extends EntityItemObjectType,
      UpdateDiscussionObjectType {}

export type SetIsClarifiedRequestObjectType = EntityItemObjectType
export type DeleteDiscussionRequestObjectType = EntityItemObjectType

// NOTE: Comments & Replies
export interface CommentsAndRepliesParentEntityObject {
   parent_item_id: string
}
export interface MultimediaRequestObjectType {
   url: string
   thumbnail_url: string
   format_type: 'IMAGE' | 'VIDEO' | string
}
export interface MultimediaResponseObjectType
   extends MultimediaRequestObjectType {
   multimedia_id: string
}
export interface MentionUserIdsResponseObjectType {
   user_id: string
   name: string
}
export interface PostReplyObjectType {
   comment_content: string
   multimedia: MultimediaRequestObjectType[]
}
export interface PostReplyRequestObjectType
   extends CommentsAndRepliesParentEntityObject,
      PostReplyObjectType {}
export type PostCommentRequestObjectType = PostReplyRequestObjectType

export interface GetRepliesRequestObjectType
   extends CommentsAndRepliesParentEntityObject {
   offset?: number
   limit?: number
}
export type GetCommentsRequestObjectType = GetRepliesRequestObjectType
export interface ReplyObjectType {
   comment_id: string
   comment_content: string
   is_editable: boolean
   created_at: string
   author: {
      user_id: string
      name: string
      profile_pic_url: string
   }
   multimedia: MultimediaResponseObjectType[]
}
export interface CommentObjectType extends ReplyObjectType {
   total_replies_count: number
}
export interface GetCommentsResponseObjectType {
   comments: CommentObjectType[]
}

export interface GetRepliesResponseObjectType {
   replies: ReplyObjectType[]
}

export type UpdateReplyObjectType = PostReplyObjectType
export interface UpdateReplyRequestObjectType
   extends EntityItemObjectType,
      UpdateReplyObjectType {}

export type UpdateCommentRequestObjectType = UpdateReplyRequestObjectType

export type DeleteReplyRequestObjectType = EntityItemObjectType
export type DeleteCommentRequestObjectType = EntityItemObjectType

export interface MultiMediaResponseObjectType
   extends MultimediaRequestObjectType {
   multimedia_id: string
}
