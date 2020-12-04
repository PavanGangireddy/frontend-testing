import { observable, action } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import TimerService from '../../services/TimerService'
import { TimerRequestType, TimerResponseType } from '../types'

type TimerDetailsType = {
   duration: number
   isRunning: boolean
}

export default class TimerStore {
   @observable getTimerAPIStatus!: APIStatus
   @observable getTimerAPIError!: any
   @observable startTimerAPIStatus!: APIStatus
   @observable startTimerAPIError!: any
   @observable stopTimerAPIStatus!: APIStatus
   @observable stopTimerAPIError!: any

   @observable timerDetails!: TimerDetailsType
   timerService: TimerService

   constructor(timerService: TimerService) {
      this.timerService = timerService
      this.init()
   }

   @action.bound
   init() {
      this.getTimerAPIStatus = API_INITIAL
      this.startTimerAPIStatus = API_INITIAL
      this.stopTimerAPIStatus = API_INITIAL
      this.getTimerAPIError = null
      this.startTimerAPIError = null
      this.stopTimerAPIError = null
      this.timerDetails = { duration: 0, isRunning: false }
   }

   @action.bound
   setGetTimerAPIStatus(apiStatus: APIStatus) {
      this.getTimerAPIStatus = apiStatus
   }

   @action.bound
   setGetTimerAPIError(apiError: any) {
      this.getTimerAPIError = apiError
   }

   @action.bound
   setTimerAPIResponse(apiResponse: TimerResponseType | null) {
      if (apiResponse) {
         const { duration_in_seconds, is_running } = apiResponse
         this.timerDetails.duration = duration_in_seconds
         this.timerDetails.isRunning = is_running
      }
   }

   @action.bound
   getTimer(
      requestObject: TimerRequestType,
      onSuccess: () => void,
      onFailure?: (e: any) => void
   ) {
      const getTimerPromise = this.timerService.getTimer(requestObject)
      const {
         setGetTimerAPIStatus,
         setTimerAPIResponse,
         setGetTimerAPIError
      } = this
      return bindPromiseWithOnSuccess(getTimerPromise)
         .to(setGetTimerAPIStatus, res => {
            setTimerAPIResponse(res)
            onSuccess()
         })
         .catch(e => {
            setGetTimerAPIError(e)
            onFailure && onFailure(e)
         })
   }

   @action.bound
   setStartTimerAPIStatus(apiStatus: APIStatus) {
      this.startTimerAPIStatus = apiStatus
   }

   @action.bound
   setStartTimerAPIError(apiError: any) {
      this.startTimerAPIError = apiError
   }

   @action.bound
   startTimer(
      requestObject: TimerRequestType,
      onSuccess: () => void,
      onFailure: (e: any) => void
   ) {
      const startTimerPromise = this.timerService.startTimer(requestObject)
      const {
         setStartTimerAPIStatus,
         setTimerAPIResponse,
         setStartTimerAPIError
      } = this
      return bindPromiseWithOnSuccess(startTimerPromise)
         .to(setStartTimerAPIStatus, res => {
            setTimerAPIResponse(res)
            onSuccess()
         })
         .catch(e => {
            setStartTimerAPIError(e)
            onFailure(e)
         })
   }

   @action.bound
   setStopTimerAPIStatus(apiStatus: APIStatus) {
      this.stopTimerAPIStatus = apiStatus
   }

   @action.bound
   setStopTimerAPIError(apiError: any) {
      this.stopTimerAPIError = apiError
   }

   @action.bound
   stopTimer(
      requestObject: TimerRequestType,
      onSuccess: () => void,
      onFailure: (e: any) => void
   ) {
      const stopTimerPromise = this.timerService.stopTimer(requestObject)
      const {
         setStopTimerAPIStatus,
         setTimerAPIResponse,
         setStopTimerAPIError
      } = this
      return bindPromiseWithOnSuccess(stopTimerPromise)
         .to(setStopTimerAPIStatus, res => {
            setTimerAPIResponse(res)
            onSuccess()
         })
         .catch(e => {
            setStopTimerAPIError(e)
            onFailure(e)
         })
   }

   @action.bound
   clearStore() {
      this.init()
   }
}
