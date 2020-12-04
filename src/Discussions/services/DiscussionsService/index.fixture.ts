import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import getTaskSpecficDiscussions from '../../fixtures/getTaskSpecficDiscussions.json'
import getDiscussionSpecficComments from '../../fixtures/getDiscussionSpecficComments.json'
import getCommentSpecficReplies from '../../fixtures/getCommentSpecficReplies.json'

import DiscussionsService from '.'

export default class DiscussionsFixture implements DiscussionsService {
   getDiscussionsAPI = requestObect => {
      const { offset, limit } = requestObect
      return resolveWithTimeout({
         discussions: getTaskSpecficDiscussions.discussions.slice(
            offset,
            offset + limit
         ),
         total_count: getTaskSpecficDiscussions.total_count
      })
   }

   postDiscussionAPI = requestObect => resolveWithTimeout({})

   setIsClarifiedStatusAPI = requestObect => resolveWithTimeout({})

   updateDiscussionAPI = requestObect => resolveWithTimeout({})

   deleteDiscussionAPI = requestObect => resolveWithTimeout({})

   getCommentsAPI = requestObject =>
      resolveWithTimeout(getDiscussionSpecficComments)

   postCommentAPI = requestObect => {
      const { ...data } = getDiscussionSpecficComments.comments[0]
      return resolveWithTimeout(data)
   }

   updateCommentAPI = requestObect =>
      resolveWithTimeout(getDiscussionSpecficComments.comments[0])

   deleteCommentAPI = requestObect => resolveWithTimeout({})

   getRepliesAPI = requestObject => {
      const { parent_item_id } = requestObject
      const { replies } = getCommentSpecficReplies
      return resolveWithTimeout({
         replies: parent_item_id ? replies.slice(0, parent_item_id) : replies
      })
   }

   postReplyAPI = requestObject =>
      resolveWithTimeout(getCommentSpecficReplies.replies[0])

   updateReplyAPI = requestObect =>
      resolveWithTimeout(getCommentSpecficReplies.replies[0])

   deleteReplyAPI = requestObect => resolveWithTimeout({})
}
