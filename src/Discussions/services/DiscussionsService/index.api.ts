import { create, ApisauceInstance } from 'apisauce'

import { apiMethods } from '../../../Common/constants/APIConstants'
import Config from '../../../Common/constants/EnvironmentConstants'

import endpoints from '../endpoints'

import DiscussionsService from '.'

const DISCUSSIONS_URL = `${Config.BSS_BASE_URL}bss_discussions/`
export default class DiscussionsAPI implements DiscussionsService {
   api: ApisauceInstance
   networkCallWithApisauce: Function

   constructor(networkCallWithApisauce: Function) {
      this.api = create({
         baseURL: DISCUSSIONS_URL
      })
      this.networkCallWithApisauce = networkCallWithApisauce
   }

   getDiscussionsAPI = ({ offset, limit, ...requestObect }) => {
      const { api, networkCallWithApisauce } = this
      const { getDiscussions } = endpoints
      const endpoint = `${getDiscussions}?offset=${offset}&limit=${limit}`
      return networkCallWithApisauce(
         api,
         endpoint,
         requestObect,
         apiMethods.post
      )
   }

   postDiscussionAPI = requestObect => {
      const { api, networkCallWithApisauce } = this
      return networkCallWithApisauce(
         api,
         endpoints.postDiscussion,
         requestObect,
         apiMethods.post
      )
   }

   updateDiscussionAPI = ({ current_item_id, ...requestObect }) => {
      const { api, networkCallWithApisauce } = this
      const { discussion, updateDiscussion } = endpoints
      const endpoint = `${discussion + current_item_id}/${updateDiscussion}`
      return networkCallWithApisauce(
         api,
         endpoint,
         requestObect,
         apiMethods.put
      )
   }

   deleteDiscussionAPI = ({ current_item_id }) => {
      const { api, networkCallWithApisauce } = this
      const { discussion, deleteDiscussion } = endpoints
      const endpoint = `${discussion + current_item_id}/${deleteDiscussion}`
      return networkCallWithApisauce(api, endpoint, {}, apiMethods.delete)
   }

   getCommentsAPI = ({ parent_item_id }) => {
      const { api, networkCallWithApisauce } = this
      const { discussion, getComments } = endpoints
      const endpoint = `${discussion + parent_item_id}/${getComments}`
      return networkCallWithApisauce(api, endpoint, {}, apiMethods.get)
   }

   postCommentAPI = ({ parent_item_id, ...requestObect }) => {
      const { api, networkCallWithApisauce } = this
      const { discussion, postComment } = endpoints
      const endpoint = `${discussion + parent_item_id}/${postComment}`
      return networkCallWithApisauce(
         api,
         endpoint,
         requestObect,
         apiMethods.post
      )
   }

   updateCommentAPI = ({ current_item_id, ...requestObect }) => {
      const { api, networkCallWithApisauce } = this
      const { comment, updateComment } = endpoints
      const endpoint = `${comment + current_item_id}/${updateComment}`
      return networkCallWithApisauce(
         api,
         endpoint,
         requestObect,
         apiMethods.put
      )
   }

   deleteCommentAPI = ({ current_item_id }) => {
      const { api, networkCallWithApisauce } = this
      const { comment, deleteComment } = endpoints
      const endpoint = `${comment + current_item_id}/${deleteComment}`
      return networkCallWithApisauce(api, endpoint, {}, apiMethods.delete)
   }

   getRepliesAPI = ({ parent_item_id }) => {
      const { api, networkCallWithApisauce } = this
      const { comment, getReplies } = endpoints
      const endpoint = `${comment + parent_item_id}/${getReplies}`
      return networkCallWithApisauce(api, endpoint, {}, apiMethods.get)
   }

   postReplyAPI = ({ parent_item_id, ...requestObect }) => {
      const { api, networkCallWithApisauce } = this
      const { comment, postReply } = endpoints
      const endpoint = `${comment + parent_item_id}/${postReply}`
      return networkCallWithApisauce(
         api,
         endpoint,
         requestObect,
         apiMethods.post
      )
   }

   updateReplyAPI = ({ current_item_id, ...requestObect }) => {
      const { api, networkCallWithApisauce } = this
      const { comment, updateReply } = endpoints
      const endpoint = `${comment + current_item_id}/${updateReply}`
      return networkCallWithApisauce(
         api,
         endpoint,
         requestObect,
         apiMethods.put
      )
   }

   deleteReplyAPI = ({ current_item_id }) => {
      const { api, networkCallWithApisauce } = this
      const { comment, deleteReply } = endpoints
      const endpoint = `${comment + current_item_id}/${deleteReply}`
      return networkCallWithApisauce(api, endpoint, {}, apiMethods.delete)
   }
}
