import { resolveWithTimeout } from '../../../Common/utils/TestUtils'

import timerResponse from '../../fixtures/timer-response.json'

import TimerService from '.'

export default class TimerFixtureService implements TimerService {
   getTimer = _req_obj => resolveWithTimeout(timerResponse.getTimer)

   startTimer = _req_obj => resolveWithTimeout(timerResponse.startTimer)

   stopTimer = _req_obj => resolveWithTimeout(timerResponse.stopTimer)
}
