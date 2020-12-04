import {
   GetDiscussionsRequestObjectType,
   GetDiscussionsResponseObjectType,
   PostDiscussionRequestObjectType,
   GetCommentsRequestObjectType,
   GetCommentsResponseObjectType,
   UpdateDiscussionRequestObjectType,
   DeleteDiscussionRequestObjectType,
   PostCommentRequestObjectType,
   CommentObjectType,
   ReplyObjectType,
   GetRepliesResponseObjectType,
   UpdateCommentRequestObjectType,
   DeleteCommentRequestObjectType,
   UpdateReplyRequestObjectType,
   DeleteReplyRequestObjectType
} from '../../stores/types'

export default interface DiscussionsService {
   getDiscussionsAPI: (
      requestObject: GetDiscussionsRequestObjectType
   ) => Promise<GetDiscussionsResponseObjectType>

   postDiscussionAPI: (
      requestObject: PostDiscussionRequestObjectType
   ) => Promise<{}>

   updateDiscussionAPI: (
      requestObject: UpdateDiscussionRequestObjectType
   ) => Promise<{}>

   deleteDiscussionAPI: (
      requestObject: DeleteDiscussionRequestObjectType
   ) => Promise<{}>

   postCommentAPI: (
      requestObject: PostCommentRequestObjectType
   ) => Promise<CommentObjectType>

   getCommentsAPI: (
      requestObject: GetCommentsRequestObjectType
   ) => Promise<GetCommentsResponseObjectType | any>

   postReplyAPI: (
      requestObject: PostCommentRequestObjectType
   ) => Promise<ReplyObjectType>

   getRepliesAPI: (
      requestObject: GetCommentsRequestObjectType
   ) => Promise<GetRepliesResponseObjectType>

   updateCommentAPI: (
      requestObject: UpdateCommentRequestObjectType
   ) => Promise<CommentObjectType>

   deleteCommentAPI: (
      requestObject: DeleteCommentRequestObjectType
   ) => Promise<{}>

   updateReplyAPI: (
      requestObject: UpdateReplyRequestObjectType
   ) => Promise<ReplyObjectType>

   deleteReplyAPI: (requestObject: DeleteReplyRequestObjectType) => Promise<{}>
}
