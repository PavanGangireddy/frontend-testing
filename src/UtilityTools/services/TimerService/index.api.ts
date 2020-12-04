import { ApisauceInstance, create } from 'apisauce'

import config from '../../../Common/constants/EnvironmentConstants'
import { apiMethods } from '../../../Common/constants/APIConstants'

import { TimerRequestType } from '../../stores/types'

import endpoints from '../endpoints'

import TimerService from '.'

const TIMER_URL = `${config.BASE_URL}api/ib_utility_tools/`

export default class TimerServiceAPI implements TimerService {
   api: ApisauceInstance
   networkCallWithApisauce: Function

   constructor(networkCallWithApisauce: Function) {
      this.api = create({
         baseURL: TIMER_URL
      })
      this.networkCallWithApisauce = networkCallWithApisauce
   }

   getTimer = (requestObject: TimerRequestType) =>
      this.networkCallWithApisauce(
         this.api,
         endpoints.getTimer,
         requestObject,
         apiMethods.post
      )

   startTimer = (requestObject: TimerRequestType) =>
      this.networkCallWithApisauce(
         this.api,
         endpoints.startTimer,
         requestObject,
         apiMethods.post
      )

   stopTimer = (requestObject: TimerRequestType) =>
      this.networkCallWithApisauce(
         this.api,
         endpoints.stopTimer,
         requestObject,
         apiMethods.post
      )
}
