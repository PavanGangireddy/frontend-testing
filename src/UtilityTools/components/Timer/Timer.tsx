import React, { Component } from 'react'
import { observable } from 'mobx'
import { inject, observer } from 'mobx-react'
//eslint-disable-next-line
import { withTranslation, WithTranslation } from 'react-i18next'

import TimerIcon from '../../../Common/icons/RefreshIcon'
import PauseIcon from '../../../Common/icons/NotesIcon'
import PlayIcon from '../../../Common/icons/MoreIcon'
import LoadingWrapper from '../../../Common/components/LoadingWrapper'
// import { getDefaultTimeFormat } from '../../../Common/utils/TimeUtils'
import { getAPIErrorMessage } from '../../../Common/utils/APIUtils'
import { showFailureBottomCenterToast } from '../../../Common/utils/ToastUtils'

import TimerStore from '../../stores/TimerStore'

import {
   TimerLabel,
   TimerLabelText,
   TimeContainer,
   Time,
   TimerWrapper
} from './styledComponents'

interface TimerProps extends WithTranslation {
   entityId: any
   entityType: any
}

interface InjectedProps extends TimerProps {
   timerStore: TimerStore
}

@inject('timerStore')
@observer
class Timer extends Component<TimerProps> {
   @observable time = 0
   @observable intervalId

   componentDidMount() {
      this.getData()
   }

   componentWillUnmount() {
      this.getTimerStore().clearStore()
   }

   getRequestObject = () => {
      const { entityId, entityType } = this.props
      return {
         entity_id: entityId,
         entity_type: entityType
      }
   }

   onFailure = apiError => {
      showFailureBottomCenterToast(getAPIErrorMessage(apiError))
   }

   getData = () => {
      const { getTimer } = this.getTimerStore()
      getTimer(this.getRequestObject(), this.initTime)
   }

   onStartTimer = () => {
      const { startTimer } = this.getTimerStore()
      startTimer(this.getRequestObject(), this.initTime, this.onFailure)
   }

   onStopTimer = () => {
      const { stopTimer } = this.getTimerStore()
      stopTimer(this.getRequestObject(), this.initTime, this.onFailure)
   }

   initTime = () => {
      const { duration, isRunning } = this.getTimerStore().timerDetails
      this.time = duration
      this.intervalId && clearInterval(this.intervalId)
      if (isRunning) {
         this.intervalId = setInterval(() => ++this.time, 1000)
      }
   }

   getInjectedProps = () => this.props as InjectedProps

   getTimerStore = () => this.getInjectedProps().timerStore

   renderPlayOrPauseIcon = () => {
      const { isRunning } = this.getInjectedProps().timerStore.timerDetails

      return isRunning ? (
         <PauseIcon onClick={this.onStopTimer} />
      ) : (
         <PlayIcon onClick={this.onStartTimer} />
      )
   }

   renderSuccessView = observer(() => (
      <TimeContainer>
         {this.renderPlayOrPauseIcon()}
         <Time>{this.time}</Time>
      </TimeContainer>
   ))

   render() {
      const { getTimerAPIStatus, getTimerAPIError } = this.getTimerStore()
      const { t } = this.props
      return (
         <TimerWrapper>
            <TimerLabel>
               <TimerIcon />
               <TimerLabelText>{t('utilityTools:timeTracker')}</TimerLabelText>
            </TimerLabel>
            <LoadingWrapper
               containerStyle={{ height: '80%', width: '28%' }}
               apiStatus={getTimerAPIStatus}
               apiError={getTimerAPIError}
               onRetry={this.getData}
               renderSuccessUI={this.renderSuccessView}
            />
         </TimerWrapper>
      )
   }
}

export default withTranslation()(Timer)
