/*global jest,expect*/
import {
   API_FETCHING,
   API_SUCCESS,
   API_INITIAL,
   API_FAILED
} from '@ib/api-constants'

import getDiscussionSpecficComments from '../../../fixtures/getDiscussionSpecficComments.json'
import getCommentSpecficReplies from '../../../fixtures/getCommentSpecficReplies.json'
import DiscussionsService from '../../../services/DiscussionsService/index.fixture'

import {
   PostReplyRequestObjectType,
   UpdateReplyRequestObjectType
} from '../../types'

import CommentModal from '.'

describe('CommentModal Tests', () => {
   let apiService: DiscussionsService
   let commentModal: CommentModal
   const fixtureData = getDiscussionSpecficComments.comments[0]

   beforeEach(() => {
      apiService = new DiscussionsService()
      commentModal = new CommentModal(
         { apiService, deleteCommentFn: jest.fn() },
         fixtureData
      )
   })

   it('should test initialising commentModal store', () => {
      expect(commentModal.commentId).toBe(fixtureData.comment_id)
      expect(commentModal.description).toEqual(expect.any(String))
      expect(commentModal.creationDate).toEqual(expect.any(String))
      expect(commentModal.creationTime).toEqual(expect.any(String))
      expect(commentModal.userId).toBe(fixtureData.author.user_id)
      expect(commentModal.userName).toBe(fixtureData.author.name)
      expect(commentModal.imageURL).toBe(fixtureData.author.profile_pic_url)
      expect(commentModal.isEditable).toBe(fixtureData.is_editable)
      expect(commentModal.repliesCount).toBe(fixtureData.total_replies_count)

      expect(commentModal.multimedia.length).toBe(fixtureData.multimedia.length)
      expect(commentModal.getDeleteCommentAPIStatus).toBe(API_INITIAL)
      expect(commentModal.getDeleteCommentAPIError).toBe(null)
      expect(commentModal.getUpdateCommentAPIStatus).toBe(API_INITIAL)
      expect(commentModal.getUpdateCommentAPIError).toBe(null)
      expect(commentModal.getPostReplyAPIStatus).toBe(API_INITIAL)
      expect(commentModal.getPostReplyAPIError).toBe(null)
      expect(commentModal.getRepliesAPIStatus).toBe(API_INITIAL)
      expect(commentModal.getRepliesAPIError).toBe(null)
   })

   it('should test updateComment() data fetching state', () => {
      const mockLoadingPromise = new Promise(() => {})
      const mockObject: UpdateReplyRequestObjectType = {
            current_item_id: 'c01',
            comment_content: 'mockDescription',
            multimedia: []
         },
         onSuccess = jest.fn(),
         onFailure = jest.fn()

      apiService.updateCommentAPI = jest
         .fn()
         .mockReturnValue(mockLoadingPromise)

      commentModal.updateComment(mockObject, onSuccess, onFailure)
      expect(commentModal.getUpdateCommentAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test incrementRepliesCount()', () => {
      const mockNumberValue = 12
      commentModal.repliesCount = mockNumberValue
      commentModal.incrementRepliesCount()
      expect(commentModal.repliesCount).toBe(mockNumberValue + 1)
   })

   it('should test updateComment() success state', async () => {
      const mockSuccessPromise = Promise.resolve(
         getDiscussionSpecficComments.comments[0]
      )
      const mockObject: UpdateReplyRequestObjectType = {
            current_item_id: 'c01',
            comment_content: 'mockDescription',
            multimedia: []
         },
         onSuccess = jest.fn(),
         onFailure = jest.fn()

      apiService.updateCommentAPI = jest
         .fn()
         .mockReturnValue(mockSuccessPromise)

      await commentModal.updateComment(mockObject, onSuccess, onFailure)
      expect(commentModal.getUpdateCommentAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test updateComment() failure state', async () => {
      const mockObject: UpdateReplyRequestObjectType = {
            current_item_id: 'c01',
            comment_content: 'mockDescription',
            multimedia: []
         },
         onSuccess = jest.fn(),
         onFailure = jest.fn()

      jest
         .spyOn(apiService, 'updateCommentAPI')
         .mockImplementation(() => Promise.reject())

      await commentModal.updateComment(mockObject, onSuccess, onFailure)
      expect(commentModal.getUpdateCommentAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test deleteComment() data fetching state', () => {
      const mockLoadingPromise = new Promise(() => {}),
         onSuccess = jest.fn(),
         onFailure = jest.fn()

      apiService.deleteCommentAPI = jest
         .fn()
         .mockReturnValue(mockLoadingPromise)

      commentModal.deleteComment(onSuccess, onFailure)
      expect(commentModal.getDeleteCommentAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test deleteComment() success state', async () => {
      const mockSuccessPromise = Promise.resolve({}),
         onSuccess = jest.fn(),
         onFailure = jest.fn()

      apiService.deleteCommentAPI = jest
         .fn()
         .mockReturnValue(mockSuccessPromise)

      await commentModal.deleteComment(onSuccess, onFailure)
      expect(commentModal.getDeleteCommentAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(commentModal.deleteCommentFn).toBeCalledWith(
         commentModal.commentId
      )
      expect(onFailure).not.toBeCalled()
   })

   it('should test deleteComment() failure state', async () => {
      const onSuccess = jest.fn(),
         onFailure = jest.fn()

      jest
         .spyOn(apiService, 'deleteCommentAPI')
         .mockImplementation(() => Promise.reject())

      await commentModal.deleteComment(onSuccess, onFailure)
      expect(commentModal.getDeleteCommentAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test postReply() data fetching state', () => {
      const mockObject: PostReplyRequestObjectType = {
            parent_item_id: 'p01',
            comment_content: 'c01',
            multimedia: []
         },
         mockLoadingPromise = new Promise(() => {}),
         onSuccess = jest.fn(),
         onFailure = jest.fn()

      apiService.postReplyAPI = jest.fn().mockReturnValue(mockLoadingPromise)

      commentModal.postReply(mockObject, onSuccess, onFailure)
      expect(commentModal.getPostReplyAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test postReply() success state', async () => {
      const mockObject: PostReplyRequestObjectType = {
            parent_item_id: 'p01',
            comment_content: 'c01',
            multimedia: []
         },
         mockSuccessPromise = Promise.resolve(
            getDiscussionSpecficComments.comments[0]
         ),
         onSuccess = jest.fn(),
         onFailure = jest.fn()

      apiService.postReplyAPI = jest.fn().mockReturnValue(mockSuccessPromise)
      jest.spyOn(commentModal, 'incrementRepliesCount')
      await commentModal.postReply(mockObject, onSuccess, onFailure)
      expect(commentModal.getPostReplyAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(commentModal.incrementRepliesCount).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test postReply() failure state', async () => {
      const mockObject: PostReplyRequestObjectType = {
            parent_item_id: 'p01',
            comment_content: 'c01',
            multimedia: []
         },
         onSuccess = jest.fn(),
         onFailure = jest.fn()

      jest
         .spyOn(apiService, 'postReplyAPI')
         .mockImplementation(() => Promise.reject())

      await commentModal.postReply(mockObject, onSuccess, onFailure)
      expect(commentModal.getPostReplyAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test getReplies() data fetching state', () => {
      const mockLoadingPromise = new Promise(() => {}),
         onSuccess = jest.fn(),
         onFailure = jest.fn()

      apiService.getRepliesAPI = jest.fn().mockReturnValue(mockLoadingPromise)

      commentModal.getReplies(onSuccess, onFailure)
      expect(commentModal.getRepliesAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test getReplies() success state', async () => {
      const mockSuccessPromise = Promise.resolve(getCommentSpecficReplies),
         onSuccess = jest.fn(),
         onFailure = jest.fn()

      apiService.getRepliesAPI = jest.fn().mockReturnValue(mockSuccessPromise)

      await commentModal.getReplies(onSuccess, onFailure)
      expect(commentModal.getRepliesAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test getReplies() failure state', async () => {
      const onSuccess = jest.fn(),
         onFailure = jest.fn()

      jest
         .spyOn(apiService, 'getRepliesAPI')
         .mockImplementation(() => Promise.reject())

      await commentModal.getReplies(onSuccess, onFailure)
      expect(commentModal.getRepliesAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test clearStore()', () => {
      jest.spyOn(commentModal, 'init')
      commentModal.clearModal()
      expect(commentModal.init).toBeCalled()
   })
})
