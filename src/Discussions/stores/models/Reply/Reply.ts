import { observable, action } from 'mobx'
import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import DiscussionsService from '../../../services/DiscussionsService'
import {
   getDateAndTimeInDiscussionsFormat,
   descriptionFormatDecoder
} from '../../../utils/DiscussionUtils'

import {
   ReplyObjectType,
   UpdateReplyObjectType,
   PostReplyObjectType
} from '../../types'

import Multimedia from '../MultiMedia'

export default class ReplyModal {
   apiService: DiscussionsService
   parentCommentId: string
   setPostReplyAPIResponse: Function
   deleteReplyFn: Function

   replyId: string
   description!: string
   creationDate: string
   creationTime: string
   userId: string
   userName: string
   imageURL: string
   isEditable: boolean
   multimedia: Multimedia[] = []

   @observable getUpdateReplyAPIStatus!: APIStatus
   @observable getUpdateReplyAPIError!: Error | null
   @observable getDeleteReplyAPIStatus!: APIStatus
   @observable getDeleteReplyAPIError!: Error | null
   @observable getPostReplyAPIStatus!: APIStatus
   @observable getPostReplyAPIError!: Error | null

   constructor(
      { apiService, setPostReplyAPIResponse, parentCommentId, deleteReplyFn },
      data: ReplyObjectType
   ) {
      this.apiService = apiService
      this.parentCommentId = parentCommentId
      this.setPostReplyAPIResponse = setPostReplyAPIResponse
      this.deleteReplyFn = deleteReplyFn

      const {
         comment_id: replyId,
         comment_content: description,
         created_at: createdAt,
         author: {
            user_id: userId,
            name: userName,
            profile_pic_url: profilePicURL
         },
         is_editable: isEditable,
         multimedia: multimedia
      } = data
      this.replyId = replyId
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
      this.getDeleteReplyAPIStatus = this.getUpdateReplyAPIStatus = this.getPostReplyAPIStatus = API_INITIAL
      this.getDeleteReplyAPIError = this.getUpdateReplyAPIError = this.getPostReplyAPIError = null
   }

   @action.bound
   setGetUpdateReplyAPIStatus(status) {
      this.getUpdateReplyAPIStatus = status
   }

   @action.bound
   setUpdateReplyResponse(updatedData) {
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
   setGetUpdateReplyAPIError(error) {
      this.getUpdateReplyAPIError = error
   }

   @action.bound
   updateReply(
      data: UpdateReplyObjectType,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) {
      const {
         replyId: current_item_id,
         setGetUpdateReplyAPIStatus,
         setUpdateReplyResponse,
         setGetUpdateReplyAPIError,
         apiService
      } = this
      const requestObject = { current_item_id, ...data }
      const getUpdateReplyPromise = apiService.updateReplyAPI(requestObject)
      return bindPromiseWithOnSuccess(getUpdateReplyPromise)
         .to(setGetUpdateReplyAPIStatus, response => {
            setUpdateReplyResponse(response)
            onSuccess()
         })
         .catch(error => {
            setGetUpdateReplyAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setGetDeleteReplyAPIStatus(status) {
      this.getDeleteReplyAPIStatus = status
   }

   @action.bound
   setDeleteReplyAPIResponse() {
      const { deleteReplyFn, replyId } = this
      deleteReplyFn(replyId)
   }

   @action.bound
   setGetDeleteReplyAPIError(error) {
      this.getDeleteReplyAPIError = error
   }

   @action.bound
   deleteReply(onSuccess: () => void, onFailure: (error: any) => void) {
      const {
         replyId: current_item_id,
         setGetDeleteReplyAPIStatus,
         setDeleteReplyAPIResponse,
         setGetDeleteReplyAPIError,
         apiService
      } = this
      const getDeleteReplyPromise = apiService.deleteReplyAPI({
         current_item_id
      })
      return bindPromiseWithOnSuccess(getDeleteReplyPromise)
         .to(setGetDeleteReplyAPIStatus, () => {
            setDeleteReplyAPIResponse()
            onSuccess()
         })
         .catch(error => {
            setGetDeleteReplyAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setGetPostReplyAPIStatus(apiStatus) {
      this.getPostReplyAPIStatus = apiStatus
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
         parentCommentId: parent_item_id,
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
   clearModal() {
      this.init()
   }
}
