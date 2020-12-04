/*global jest,expect*/
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import getTaskSpecficDiscussions from '../../../fixtures/getTaskSpecficDiscussions.json'
import DiscussionsService from '../../../services/DiscussionsService/index.fixture'

import { UpdateDiscussionRequestObjectType } from '../../types'

import DiscussionModel from '.'

describe('DiscussionModel Tests', () => {
   let apiService: DiscussionsService
   let discussionModel: DiscussionModel
   const fixtureData = getTaskSpecficDiscussions.discussions[0]
   let onSuccess
   let onFailure

   beforeEach(() => {
      apiService = new DiscussionsService()
      discussionModel = new DiscussionModel(fixtureData)
      discussionModel.apiService = apiService
      onSuccess = jest.fn()
      onFailure = jest.fn()
   })

   it('should test initialising discussionModel store', () => {
      expect(discussionModel.discussionId).toBe(fixtureData.discussion_id)
      expect(discussionModel.description).toBe(fixtureData.description)
      expect(discussionModel.title).toBe(fixtureData.title)
      expect(discussionModel.creationDate).toEqual(expect.any(String))
      expect(discussionModel.creationTime).toEqual(expect.any(String))
      expect(discussionModel.userId).toBe(fixtureData.author.user_id)
      expect(discussionModel.userName).toBe(fixtureData.author.name)
      expect(discussionModel.imageURL).toBe(fixtureData.author.profile_pic_url)
      expect(discussionModel.isEditable).toBe(fixtureData.is_editable)
      expect(discussionModel.commentsCount).toBe(
         fixtureData.total_comments_count
      )
      expect(discussionModel.getUpdateDiscussionAPIStatus).toBe(API_INITIAL)
      expect(discussionModel.getUpdateDiscussionAPIError).toBe(null)
      expect(discussionModel.getDeleteDiscussionAPIStatus).toBe(API_INITIAL)
      expect(discussionModel.getDeleteDiscussionAPIError).toBe(null)
      expect(discussionModel.getCommentsAPIStatus).toBe(API_INITIAL)
      expect(discussionModel.getCommentsAPIError).toBe(null)
      expect(discussionModel.getPostCommentAPIStatus).toBe(API_INITIAL)
      expect(discussionModel.getPostCommentAPIError).toBe(null)

      expect(discussionModel.offset).toBe(0)
      expect(discussionModel.limit).toEqual(expect.any(Number))
      expect(discussionModel.comments).toHaveLength(0)
      expect(discussionModel.totalCount).toBe(0)
   })

   it('should test getUpdateDiscussionAPI() data fetching state', () => {
      const mockLoadingPromise = new Promise(() => {})
      const mockObject: UpdateDiscussionRequestObjectType = {
         current_item_id: 'd01',
         title: 'mockTitle',
         description: 'mockDescription'
      }

      apiService.updateDiscussionAPI = jest
         .fn()
         .mockReturnValue(mockLoadingPromise)

      discussionModel.getUpdateDiscussionAPI(mockObject, onSuccess, onFailure)
      expect(discussionModel.getUpdateDiscussionAPIStatus).toBe(API_FETCHING)
   })

   it('should test getUpdateDiscussionAPI() success state', async () => {
      const mockSuccessPromise = Promise.resolve({})
      const mockObject: UpdateDiscussionRequestObjectType = {
         current_item_id: 'd01',
         title: 'mockTitle',
         description: 'mockDescription'
      }

      apiService.updateDiscussionAPI = jest
         .fn()
         .mockReturnValue(mockSuccessPromise)

      await discussionModel.getUpdateDiscussionAPI(
         mockObject,
         onSuccess,
         onFailure
      )
      expect(discussionModel.getUpdateDiscussionAPIStatus).toBe(API_SUCCESS)
   })

   it('should test getUpdateDiscussionAPI() failure state', async () => {
      const mockObject: UpdateDiscussionRequestObjectType = {
         current_item_id: 'd01',
         title: 'mockTitle',
         description: 'mockDescription'
      }

      jest
         .spyOn(apiService, 'updateDiscussionAPI')
         .mockImplementation(() => Promise.reject())

      await discussionModel.getUpdateDiscussionAPI(
         mockObject,
         onSuccess,
         onFailure
      )
      expect(discussionModel.getUpdateDiscussionAPIStatus).toBe(API_FAILED)
   })

   it('should test getDeleteDiscussionAPI() data fetching state', () => {
      const mockLoadingPromise = new Promise(() => {})

      apiService.deleteDiscussionAPI = jest
         .fn()
         .mockReturnValue(mockLoadingPromise)

      discussionModel.getDeleteDiscussionAPI(onSuccess, onFailure)
      expect(discussionModel.getDeleteDiscussionAPIStatus).toBe(API_FETCHING)
   })

   it('should test getDeleteDiscussionAPI() success state', async () => {
      const mockSuccessPromise = Promise.resolve({})

      apiService.deleteDiscussionAPI = jest
         .fn()
         .mockReturnValue(mockSuccessPromise)

      await discussionModel.getDeleteDiscussionAPI(onSuccess, onFailure)
      expect(discussionModel.getDeleteDiscussionAPIStatus).toBe(API_SUCCESS)
   })

   it('should test getDeleteDiscussionAPI() failure state', async () => {
      jest
         .spyOn(apiService, 'deleteDiscussionAPI')
         .mockImplementation(() => Promise.reject())

      await discussionModel.getDeleteDiscussionAPI(onSuccess, onFailure)
      expect(discussionModel.getDeleteDiscussionAPIStatus).toBe(API_FAILED)
   })
})
