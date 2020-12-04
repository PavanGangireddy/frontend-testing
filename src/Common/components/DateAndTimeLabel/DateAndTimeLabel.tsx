import React, { Component, ReactElement } from 'react'

import { getDateAndTimeFormat } from '../../utils/DateUtils'

import { DateAndTimeLabelContainer, Label } from './styledComponents'

interface DateAndTimeLabelProps {
   dateAndTime: string
   containerCSS?: React.CSSProperties
   labelCSS?: React.CSSProperties
   labelTypo?: any
   format?: string
}
class DateAndTimeLabel extends Component<DateAndTimeLabelProps> {
   static defaultProps = {
      labelTypo: Label
   }

   render(): ReactElement {
      const {
         dateAndTime,
         containerCSS,
         labelCSS,
         labelTypo: LabelTypo,
         format
      } = this.props
      //NOTE: since we are not including timezone indicator in our date string there will be cross browser issues in this, to fix it in majority cases we are converting the date to the following format (ref: https://stackoverflow.com/questions/13363673/javascript-date-is-invalid-on-ios)
      const convertedDateAndTimeFormatToSupportAllDevices = dateAndTime
         .split('-')
         .join('/')
         .split('.')[0]
      const dateTimeLabel = getDateAndTimeFormat(
         new Date(convertedDateAndTimeFormatToSupportAllDevices),
         format
      )
      return (
         <DateAndTimeLabelContainer css={containerCSS}>
            <LabelTypo css={labelCSS}>{dateTimeLabel}</LabelTypo>
         </DateAndTimeLabelContainer>
      )
   }
}

export default DateAndTimeLabel
