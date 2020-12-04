import { observable, action } from 'mobx'
import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import DiscussionsService from '../../../services/DiscussionsService'
import {
   getDateAndTimeInDiscussionsFormat,
   descriptionFormatDecoder
} from '../../../utils/DiscussionUtils'

import {
   CommentObjectType,
   GetRepliesResponseObjectType,
   ReplyObjectType,
   UpdateReplyObjectType,
   PostReplyObjectType
} from '../../types'

import Multimedia from '../MultiMedia'
import Reply from '../Reply'

export default class CommentModal {
   apiService!: DiscussionsService
   deleteCommentFn: Function

   commentId: string
   description!: string
   creationDate: string
   creationTime: string
   userId: string
   userName: string
   imageURL: string
   isEditable: boolean
   mentionedUsersList: Array<{ userId: string; username: string }> = []
   multimedia: Multimedia[] = []
   @observable repliesCount: number

   @observable getRepliesAPIStatus!: APIStatus
   @observable getRepliesAPIError!: Error | null
   @observable getPostReplyAPIStatus!: APIStatus
   @observable getPostReplyAPIError!: Error | null
   @observable getUpdateCommentAPIStatus!: APIStatus
   @observable getUpdateCommentAPIError!: Error | null
   @observable getDeleteCommentAPIStatus!: APIStatus
   @observable getDeleteCommentAPIError!: Error | null
   @observable replies!: Reply[]

   constructor({ apiService, deleteCommentFn }, data: CommentObjectType) {
      this.apiService = apiService
      this.deleteCommentFn = deleteCommentFn

      const {
         comment_id: commentId,
         created_at: createdAt,
         author: {
            user_id: userId,
            name: userName,
            profile_pic_url: profilePicURL
         },
         is_editable: isEditable,
         total_replies_count: repliesCount,
         comment_content: description,
         multimedia: multimedia
      } = data
      this.commentId = commentId
      this.userId = userId
      this.userName = userName
      this.imageURL = profilePicURL

      const dateTimeObject = new Date(createdAt)
      const [date, time] = getDateAndTimeInDiscussionsFormat(
         dateTimeObject
      ).split(' / ')
      this.creationDate = date
      this.creationTime = time

      this.isEditable = isEditable
      this.repliesCount = repliesCount

      this.assignUpdatableData({ description, multimedia })

      this.init()
   }

   @action.bound
   assignUpdatableData({ description, multimedia }) {
      this.description = descriptionFormatDecoder(description)
      this.multimedia = multimedia.map(media => new Multimedia(media))
   }

   @action.bound
   init() {
      this.getDeleteCommentAPIStatus = this.getUpdateCommentAPIStatus = this.getPostReplyAPIStatus = this.getRepliesAPIStatus = API_INITIAL
      this.getDeleteCommentAPIError = this.getUpdateCommentAPIError = this.getPostReplyAPIError = this.getRepliesAPIError = null
      this.replies = []
   }

   @action.bound
   setGetUpdateCommentAPIStatus(status) {
      this.getUpdateCommentAPIStatus = status
   }

   @action.bound
   setUpdateCommentResponse(updatedData) {
      if (updatedData) {
         const {
            comment_content: description,
            multimedia: multimedia
         } = updatedData
         this.assignUpdatableData({
            description,
            multimedia
         })
      }
   }

   @action.bound
   setGetUpdateCommentAPIError(error) {
      this.getUpdateCommentAPIError = error
   }

   @action.bound
   updateComment(
      data: UpdateReplyObjectType,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) {
      const {
         commentId: current_item_id,
         setGetUpdateCommentAPIStatus,
         setUpdateCommentResponse,
         setGetUpdateCommentAPIError,
         apiService
      } = this
      const requestObject = { current_item_id, ...data }
      const getUpdateCommentPromise = apiService.updateCommentAPI(requestObject)
      return bindPromiseWithOnSuccess(getUpdateCommentPromise)
         .to(setGetUpdateCommentAPIStatus, response => {
            setUpdateCommentResponse(response)
            onSuccess()
         })
         .catch(error => {
            setGetUpdateCommentAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setGetDeleteCommentAPIStatus(status) {
      this.getDeleteCommentAPIStatus = status
   }

   @action.bound
   setDeleteCommentAPIResponse() {
      const { deleteCommentFn, commentId } = this
      deleteCommentFn(commentId)
   }

   @action.bound
   setGetDeleteCommentAPIError(error) {
      this.getDeleteCommentAPIError = error
   }

   @action.bound
   deleteComment(onSuccess: () => void, onFailure: (error: any) => void) {
      const {
         commentId: current_item_id,
         setGetDeleteCommentAPIStatus,
         setDeleteCommentAPIResponse,
         setGetDeleteCommentAPIError,
         apiService
      } = this
      const getDeleteCommentPromise = apiService.deleteCommentAPI({
         current_item_id
      })
      return bindPromiseWithOnSuccess(getDeleteCommentPromise)
         .to(setGetDeleteCommentAPIStatus, () => {
            setDeleteCommentAPIResponse()
            onSuccess()
         })
         .catch(error => {
            setGetDeleteCommentAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   incrementRepliesCount() {
      this.repliesCount++
   }

   @action.bound
   deleteReplyFn(replyId) {
      this.replies = this.replies.filter(reply => reply.replyId !== replyId)
      this.repliesCount = this.replies.length
   }

   @action.bound
   setGetPostReplyAPIStatus(apiStatus) {
      this.getPostReplyAPIStatus = apiStatus
   }

   getReplyModelInstance = data => {
      const {
         apiService,
         deleteReplyFn,
         setPostReplyAPIResponse,
         commentId: parentCommentId
      } = this
      return new Reply(
         {
            apiService,
            parentCommentId,
            setPostReplyAPIResponse,
            deleteReplyFn
         },
         data
      )
   }

   @action.bound
   setPostReplyAPIResponse(response: ReplyObjectType | null) {
      if (response) {
         const { getReplyModelInstance } = this
         this.replies.push(getReplyModelInstance(response))
         this.incrementRepliesCount()
      }
   }

   @action.bound
   setGetPostReplyAPIError(error) {
      this.getPostReplyAPIError = error
   }

   @action.bound
   postReply(
      data: PostReplyObjectType,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) {
      const {
         apiService,
         commentId: parent_item_id,
         setGetPostReplyAPIStatus,
         setPostReplyAPIResponse,
         setGetPostReplyAPIError
      } = this
      const promise = apiService.postReplyAPI({ parent_item_id, ...data })
      return bindPromiseWithOnSuccess(promise)
         .to(setGetPostReplyAPIStatus, response => {
            setPostReplyAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            setGetPostReplyAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setGetRepliesAPIStatus(apiStatus) {
      this.getRepliesAPIStatus = apiStatus
   }

   @action.bound
   setRepliesAPIResponse(response: GetRepliesResponseObjectType | null) {
      if (response) {
         const { replies } = response
         const { getReplyModelInstance } = this
         this.replies = replies.map(getReplyModelInstance)
      }
   }

   @action.bound
   setGetRepliesAPIError(error) {
      this.getRepliesAPIError = error
   }

   @action.bound
   getReplies(onSuccess: () => void, onFailure: (error: any) => void) {
      const {
         commentId: parent_item_id,
         apiService,
         setRepliesAPIResponse,
         setGetRepliesAPIStatus,
         setGetRepliesAPIError
      } = this
      const promise = apiService.getRepliesAPI({ parent_item_id })
      return bindPromiseWithOnSuccess(promise)
         .to(setGetRepliesAPIStatus, response => {
            setRepliesAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            setGetRepliesAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   clearModal() {
      this.init()
   }
}
