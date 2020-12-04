import {
   API_INITIAL,
   API_FETCHING,
   API_FAILED,
   API_SUCCESS
} from '@ib/api-constants'

import TimerService from '../../services/TimerService'
import timerData from '../../fixtures/timer-response.json'
import TimerFixtureService from '../../services/TimerService/index.fixture'

import TimerStore from '.'

describe('Timer tests', () => {
   let timerStore: TimerStore
   let timerService: TimerService
   const entityDetails = { entity_id: 'iBST01', entity_type: 'STAGE_TASK' }
   const mockOnSuccess = jest.fn()
   const mockOnFailure = jest.fn()

   beforeEach(() => {
      timerService = new TimerFixtureService()
      timerStore = new TimerStore(timerService)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test if store is initialised or not', () => {
      const {
         getTimerAPIStatus,
         getTimerAPIError,
         startTimerAPIStatus,
         startTimerAPIError,
         stopTimerAPIStatus,
         stopTimerAPIError,
         timerDetails
      } = timerStore
      const { duration, isRunning } = timerDetails

      expect(getTimerAPIStatus).toBe(API_INITIAL)
      expect(getTimerAPIError).toBe(null)
      expect(startTimerAPIStatus).toBe(API_INITIAL)
      expect(startTimerAPIError).toBe(null)
      expect(stopTimerAPIStatus).toBe(API_INITIAL)
      expect(stopTimerAPIError).toBe(null)
      expect(duration).toBe(0)
      expect(isRunning).toBe(false)
   })

   it('should test getTimerAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockGetTimerAPI = jest.fn()
      mockGetTimerAPI.mockReturnValue(mockFetchingPromise)
      timerService.getTimer = mockGetTimerAPI

      timerStore.getTimer(entityDetails, mockOnSuccess, mockOnFailure)
      expect(timerStore.getTimerAPIStatus).toBe(API_FETCHING)
      expect(timerStore.getTimerAPIError).toBe(null)
   })

   it('should test getTimerAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while fetching timer!'))
      )

      const mockGetTimerAPI = jest.fn()
      mockGetTimerAPI.mockReturnValue(mockFailurePromise)
      timerService.getTimer = mockGetTimerAPI

      await timerStore.getTimer(entityDetails, mockOnSuccess, mockOnFailure)
      expect(timerStore.getTimerAPIStatus).toBe(API_FAILED)
      expect(mockOnFailure).toBeCalled()
      expect(timerStore.getTimerAPIError).toBe('Error while fetching timer!')
   })

   it('should test getTimerAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve =>
         resolve(timerData.getTimer)
      )

      const mockGetTimerAPI = jest.fn()
      mockGetTimerAPI.mockReturnValue(mockSuccessPromise)
      timerService.getTimer = mockGetTimerAPI

      await timerStore.getTimer(entityDetails, mockOnSuccess, mockOnFailure)
      expect(timerStore.getTimerAPIStatus).toBe(API_SUCCESS)
      expect(mockOnSuccess).toBeCalled()
      expect(timerStore.getTimerAPIError).toBe(null)
      expect(timerStore.timerDetails.duration).toBe(0)
      expect(timerStore.timerDetails.isRunning).toBe(false)
   })

   it('should test startTimerAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockStartTimerAPI = jest.fn()
      mockStartTimerAPI.mockReturnValue(mockFetchingPromise)
      timerService.startTimer = mockStartTimerAPI

      timerStore.startTimer(entityDetails, mockOnSuccess, mockOnFailure)
      expect(timerStore.startTimerAPIStatus).toBe(API_FETCHING)
      expect(timerStore.startTimerAPIError).toBe(null)
   })

   it('should test startTimerAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while starting timer!'))
      )

      const mockStartTimerAPI = jest.fn()
      mockStartTimerAPI.mockReturnValue(mockFailurePromise)
      timerService.startTimer = mockStartTimerAPI

      await timerStore.startTimer(entityDetails, mockOnSuccess, mockOnFailure)
      expect(timerStore.startTimerAPIStatus).toBe(API_FAILED)
      expect(mockOnFailure).toBeCalled()
      expect(timerStore.startTimerAPIError).toBe('Error while starting timer!')
   })

   it('should test startTimerAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve =>
         resolve(timerData.startTimer)
      )

      const mockStartTimerAPI = jest.fn()
      mockStartTimerAPI.mockReturnValue(mockSuccessPromise)
      timerService.startTimer = mockStartTimerAPI

      await timerStore.startTimer(entityDetails, mockOnSuccess, mockOnFailure)
      expect(timerStore.startTimerAPIStatus).toBe(API_SUCCESS)
      expect(mockOnSuccess).toBeCalled()
      expect(timerStore.startTimerAPIError).toBe(null)
      expect(timerStore.timerDetails.duration).toBe(
         timerData.startTimer.duration_in_seconds
      )
      expect(timerStore.timerDetails.isRunning).toBe(
         timerData.startTimer.is_running
      )
   })

   it('should test stopTimerAPI fetching state', () => {
      const mockFetchingPromise = new Promise(_ => {})

      const mockStopTimerAPI = jest.fn()
      mockStopTimerAPI.mockReturnValue(mockFetchingPromise)
      timerService.stopTimer = mockStopTimerAPI

      timerStore.stopTimer(entityDetails, mockOnSuccess, mockOnFailure)
      expect(timerStore.stopTimerAPIStatus).toBe(API_FETCHING)
      expect(timerStore.stopTimerAPIError).toBe(null)
   })

   it('should test stopTimerAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) =>
         reject(new Error('Error while stopping timer!'))
      )

      const mockStopTimerAPI = jest.fn()
      mockStopTimerAPI.mockReturnValue(mockFailurePromise)
      timerService.stopTimer = mockStopTimerAPI

      await timerStore.stopTimer(entityDetails, mockOnSuccess, mockOnFailure)
      expect(timerStore.stopTimerAPIStatus).toBe(API_FAILED)
      expect(mockOnFailure).toBeCalled()
      expect(timerStore.stopTimerAPIError).toBe('Error while stopping timer!')
   })

   it('should test stopTimerAPI success state', async () => {
      const mockSuccessPromise = new Promise(resolve =>
         resolve(timerData.stopTimer)
      )

      const mockStopTimerAPI = jest.fn()
      mockStopTimerAPI.mockReturnValue(mockSuccessPromise)
      timerService.stopTimer = mockStopTimerAPI

      await timerStore.stopTimer(entityDetails, mockOnSuccess, mockOnFailure)
      expect(timerStore.stopTimerAPIStatus).toBe(API_SUCCESS)
      expect(mockOnSuccess).toBeCalled()
      expect(timerStore.stopTimerAPIError).toBe(null)
      expect(timerStore.timerDetails.duration).toBe(
         timerData.stopTimer.duration_in_seconds
      )
      expect(timerStore.timerDetails.isRunning).toBe(
         timerData.stopTimer.is_running
      )
   })

   it('should test if store is cleared or not', () => {
      const {
         getTimerAPIStatus,
         getTimerAPIError,
         startTimerAPIStatus,
         startTimerAPIError,
         stopTimerAPIStatus,
         stopTimerAPIError,
         timerDetails
      } = timerStore
      const { duration, isRunning } = timerDetails

      expect(getTimerAPIStatus).toBe(API_INITIAL)
      expect(getTimerAPIError).toBe(null)
      expect(startTimerAPIStatus).toBe(API_INITIAL)
      expect(startTimerAPIError).toBe(null)
      expect(stopTimerAPIStatus).toBe(API_INITIAL)
      expect(stopTimerAPIError).toBe(null)
      expect(duration).toBe(0)
      expect(isRunning).toBe(false)
   })
})
