import { observable, action } from 'mobx'
import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { getDateFromDateObject } from '../../../../Common/utils/DateUtils'
import { DISCUSSIONS_DATE_TIME_FORMAT } from '../../../../Common/constants/DateConstants'

import DiscussionsService from '../../../services/DiscussionsService'

import {
   DiscussionObjectType,
   GetCommentsResponseObjectType,
   PostCommentRequestObjectType,
   CommentObjectType
} from '../../types'

import Comment from '../Comment'

export default class DiscussionModal {
   apiService!: DiscussionsService
   refreshDataFn!: Function

   discussionId: string
   @observable title: string
   @observable description: string
   creationDate: string
   creationTime: string
   userId: string
   userName: string
   imageURL: string
   isEditable: boolean
   @observable commentsCount: number

   @observable getUpdateDiscussionAPIStatus!: APIStatus
   @observable getUpdateDiscussionAPIError!: Error | null
   @observable getDeleteDiscussionAPIStatus!: APIStatus
   @observable getDeleteDiscussionAPIError!: Error | null
   @observable getCommentsAPIStatus!: APIStatus
   @observable getCommentsAPIError!: Error | null
   @observable getPostCommentAPIStatus!: APIStatus
   @observable getPostCommentAPIError!: Error | null
   @observable offset!: number
   @observable limit!: number
   @observable comments!: Comment[]
   @observable totalCount!: number

   constructor(data: DiscussionObjectType) {
      const {
         discussion_id: discussionId,
         title,
         description,
         created_at: createdAt,
         author: {
            user_id: userId,
            name: userName,
            profile_pic_url: profilePicURL
         },
         is_editable: isEditable,
         total_comments_count: commentsCount
      } = data
      this.discussionId = discussionId
      this.title = title
      this.description = description
      this.userId = userId
      this.userName = userName
      this.imageURL = profilePicURL

      const createdAtDate = createdAt
         .split('-')
         .join('/')
         .split('.')[0]
      const dateTimeObject = new Date(createdAtDate)
      const [date, time] = getDateFromDateObject(
         dateTimeObject,
         DISCUSSIONS_DATE_TIME_FORMAT
      ).split(' / ')
      this.creationDate = date
      this.creationTime = time

      this.isEditable = isEditable
      this.commentsCount = commentsCount
      this.init()
   }

   @action.bound
   init() {
      this.getPostCommentAPIStatus = this.getCommentsAPIStatus = this.getDeleteDiscussionAPIStatus = this.getUpdateDiscussionAPIStatus = API_INITIAL
      this.getPostCommentAPIError = this.getCommentsAPIError = this.getDeleteDiscussionAPIError = this.getUpdateDiscussionAPIError = null

      this.offset = 0
      // NOTE: Adjust the limit according to the usage/ screen coverage
      this.limit = 100
      this.totalCount = 0
      this.comments = []
   }

   @action.bound
   setGetUpdateDiscussionAPIStatus(status) {
      this.getUpdateDiscussionAPIStatus = status
   }

   @action.bound
   setUpdateDiscussionResponse(updatedData) {
      if (updatedData) {
         const { title, description } = updatedData
         this.title = title
         this.description = description
      }
   }

   @action.bound
   setGetUpdateDiscussionAPIError(error) {
      this.getUpdateDiscussionAPIError = error
   }

   @action.bound
   getUpdateDiscussionAPI(
      data: { title: string; description: string },
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) {
      const {
         discussionId: current_item_id,
         setGetUpdateDiscussionAPIStatus,
         setUpdateDiscussionResponse,
         setGetUpdateDiscussionAPIError,
         apiService
      } = this
      const requestObject = { current_item_id, ...data }
      const getUpdateDiscussionPromise = apiService.updateDiscussionAPI(
         requestObject
      )
      return bindPromiseWithOnSuccess(getUpdateDiscussionPromise)
         .to(setGetUpdateDiscussionAPIStatus, () => {
            setUpdateDiscussionResponse(data)
            onSuccess()
         })
         .catch(error => {
            setGetUpdateDiscussionAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setGetDeleteDiscussionAPIStatus(status) {
      this.getDeleteDiscussionAPIStatus = status
   }

   @action.bound
   setGetDeleteDiscussionAPIError(error) {
      this.getDeleteDiscussionAPIError = error
   }

   @action.bound
   setDeleteDiscussionAPIResponse() {
      const { refreshDataFn } = this
      refreshDataFn && refreshDataFn()
   }

   @action.bound
   getDeleteDiscussionAPI(
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) {
      const {
         discussionId: current_item_id,
         setGetDeleteDiscussionAPIStatus,
         setDeleteDiscussionAPIResponse,
         setGetDeleteDiscussionAPIError,
         apiService
      } = this
      const getDeleteDiscussionPromise = apiService.deleteDiscussionAPI({
         current_item_id
      })
      return bindPromiseWithOnSuccess(getDeleteDiscussionPromise)
         .to(setGetDeleteDiscussionAPIStatus, () => {
            setDeleteDiscussionAPIResponse()
            onSuccess()
         })
         .catch(error => {
            setGetDeleteDiscussionAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   incrementCommentsCount() {
      this.commentsCount++
   }

   @action.bound
   decrementCommentsCount() {
      this.commentsCount--
   }

   @action.bound
   setGetPostCommentAPIStatus(apiStatus) {
      this.getPostCommentAPIStatus = apiStatus
   }

   @action.bound
   deleteCommentFn(deleteId) {
      const { comments, commentsCount } = this
      this.comments = comments.filter(({ commentId }) => commentId !== deleteId)
      this.commentsCount = commentsCount - 1
   }

   getCommentsModelInstance = data => {
      const { apiService, deleteCommentFn } = this
      return new Comment({ apiService, deleteCommentFn }, data)
   }

   @action.bound
   setPostCommentAPIResponse(response: CommentObjectType | null) {
      if (response) {
         const { getCommentsModelInstance } = this
         this.comments.push(getCommentsModelInstance(response))
         this.incrementCommentsCount()
      }
   }

   @action.bound
   setGetPostCommentAPIError(error) {
      this.getPostCommentAPIError = error
   }

   @action.bound
   postComment(
      data: PostCommentRequestObjectType,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) {
      const {
         discussionId: parent_item_id,
         apiService,
         setGetPostCommentAPIStatus,
         setPostCommentAPIResponse,
         setGetPostCommentAPIError
      } = this
      const promise = apiService.postCommentAPI({ ...data, parent_item_id })
      return bindPromiseWithOnSuccess(promise)
         .to(setGetPostCommentAPIStatus, response => {
            setPostCommentAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            setGetPostCommentAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   modifyOffsetValue() {
      // TODO: use this functionality for pagination in comments & when cicked on LoadMoreComments....
      this.offset = this.comments.length
   }

   @action.bound
   setGetCommentsAPIStatus(apiStatus) {
      this.getCommentsAPIStatus = apiStatus
   }

   @action.bound
   setCommentsAPIResponse(response: GetCommentsResponseObjectType | null) {
      if (response) {
         const { comments } = response
         const { offset, getCommentsModelInstance } = this
         // TODO: use totalCount to resrict the loadmore functionality
         this.comments.splice(
            offset,
            comments.length,
            ...comments.map(getCommentsModelInstance)
         )
      }
   }

   @action.bound
   setGetCommentsAPIError(error) {
      this.getCommentsAPIError = error
   }

   @action.bound
   getComments(data?: any, onSuccess = data => {}, onFailure = data => {}) {
      const {
         discussionId: parent_item_id,
         apiService,
         setCommentsAPIResponse,
         setGetCommentsAPIStatus,
         setGetCommentsAPIError
      } = this
      const promise = apiService.getCommentsAPI({ parent_item_id })
      return bindPromiseWithOnSuccess(promise)
         .to(setGetCommentsAPIStatus, response => {
            setCommentsAPIResponse(response)
         })
         .catch(error => {
            setGetCommentsAPIError(error)
         })
   }

   @action.bound
   clearModal() {
      this.init()
   }
}
