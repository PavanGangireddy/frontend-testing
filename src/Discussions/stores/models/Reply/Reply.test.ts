/*global jest,expect*/
import {
   API_INITIAL,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import getCommentSpecficReplies from '../../../fixtures/getCommentSpecficReplies.json'
import DiscussionsService from '../../../services/DiscussionsService/index.fixture'

import { UpdateReplyRequestObjectType } from '../../types'

import ReplyModal from '.'

describe('ReplyModal Tests', () => {
   let apiService: DiscussionsService
   let replyModal: ReplyModal
   const fixtureData = getCommentSpecficReplies.replies[0]

   beforeEach(() => {
      apiService = new DiscussionsService()
      replyModal = new ReplyModal(
         {
            apiService,
            parentCommentId: 'p01',
            setPostReplyAPIResponse: jest.fn,
            deleteReplyFn: jest.fn
         },
         fixtureData
      )
   })

   it('should test initialising replyModal store', () => {
      expect(replyModal.replyId).toBe(fixtureData.comment_id)
      expect(replyModal.description).toEqual(expect.any(String))
      expect(replyModal.creationDate).toEqual(expect.any(String))
      expect(replyModal.creationTime).toEqual(expect.any(String))
      expect(replyModal.userId).toBe(fixtureData.author.user_id)
      expect(replyModal.userName).toBe(fixtureData.author.name)
      expect(replyModal.imageURL).toBe(fixtureData.author.profile_pic_url)
      expect(replyModal.isEditable).toBe(fixtureData.is_editable)
      expect(replyModal.multimedia.length).toBe(fixtureData.multimedia.length)
      expect(replyModal.getDeleteReplyAPIStatus).toBe(API_INITIAL)
      expect(replyModal.getDeleteReplyAPIError).toBe(null)
      expect(replyModal.getUpdateReplyAPIStatus).toBe(API_INITIAL)
      expect(replyModal.getUpdateReplyAPIError).toBe(null)
   })

   it('should test updateReply() data fetching state', () => {
      const mockLoadingPromise = new Promise(() => {})
      const mockObject: UpdateReplyRequestObjectType = {
            current_item_id: 'c01',
            comment_content: 'mockDescription',
            multimedia: []
         },
         onSuccess = jest.fn(),
         onFailure = jest.fn()

      apiService.updateReplyAPI = jest.fn().mockReturnValue(mockLoadingPromise)

      replyModal.updateReply(mockObject, onSuccess, onFailure)
      expect(replyModal.getUpdateReplyAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test updateReply() success state', async () => {
      const mockSuccessPromise = Promise.resolve(
         getCommentSpecficReplies.replies[0]
      )
      const mockObject: UpdateReplyRequestObjectType = {
            current_item_id: 'c01',
            comment_content: 'mockDescription',
            multimedia: []
         },
         onSuccess = jest.fn(),
         onFailure = jest.fn()

      apiService.updateReplyAPI = jest.fn().mockReturnValue(mockSuccessPromise)

      await replyModal.updateReply(mockObject, onSuccess, onFailure)
      expect(replyModal.getUpdateReplyAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test updateReply() failure state', async () => {
      const mockObject: UpdateReplyRequestObjectType = {
            current_item_id: 'c01',
            comment_content: 'mockDescription',
            multimedia: []
         },
         onSuccess = jest.fn(),
         onFailure = jest.fn()

      jest
         .spyOn(apiService, 'updateReplyAPI')
         .mockImplementation(() => Promise.reject())

      await replyModal.updateReply(mockObject, onSuccess, onFailure)
      expect(replyModal.getUpdateReplyAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test deleteReply() data fetching state', () => {
      const mockLoadingPromise = new Promise(() => {}),
         onSuccess = jest.fn(),
         onFailure = jest.fn()

      apiService.deleteReplyAPI = jest.fn().mockReturnValue(mockLoadingPromise)

      replyModal.deleteReply(onSuccess, onFailure)
      expect(replyModal.getDeleteReplyAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test deleteReply() success state', async () => {
      const mockSuccessPromise = Promise.resolve({}),
         onSuccess = jest.fn(),
         onFailure = jest.fn()

      apiService.deleteReplyAPI = jest.fn().mockReturnValue(mockSuccessPromise)

      await replyModal.deleteReply(onSuccess, onFailure)
      expect(replyModal.getDeleteReplyAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test deleteReply() failure state', async () => {
      const onSuccess = jest.fn(),
         onFailure = jest.fn()

      jest
         .spyOn(apiService, 'deleteReplyAPI')
         .mockImplementation(() => Promise.reject())

      await replyModal.deleteReply(onSuccess, onFailure)
      expect(replyModal.getDeleteReplyAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })
})
