import { TimerRequestType, TimerResponseType } from '../../stores/types'

export default interface TimerService {
   getTimer: (requestObject: TimerRequestType) => Promise<TimerResponseType>

   startTimer: (requestObject: TimerRequestType) => Promise<TimerResponseType>

   stopTimer: (requestObject: TimerRequestType) => Promise<TimerResponseType>
}
