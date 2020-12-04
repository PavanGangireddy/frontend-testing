import React, { Component } from 'react'
import { observer } from 'mobx-react'
import 'styled-components/macro'
import { observable, action, computed } from 'mobx'
//eslint-disable-next-line
import { withTranslation, WithTranslation } from 'react-i18next'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import Colors from '../../themes/Colors'
import CalenderIcon from '../../icons/CalenderIcon'
import { DATE_PICKER_DATE_FORMAT } from '../../constants/DateConstants'
import { getDateObjectFromDateString } from '../../utils/DateUtils'

import ErrorMessage from '../ErrorMessage'

import {
   DateContainer,
   IconWrapper,
   DatePickerAndIconWrapper
} from './styledComponents'
import './styles.css'

interface DatePickerProps extends WithTranslation {
   onChangeDateTime: (date: Date) => void
   containerClassName?: string
   date: string | null
   validate?: () => any
   disabled?: boolean
   containerCSS?: React.CSSProperties
   showIcon?: boolean
   [x: string]: any
   timeIntervals?: number
   dateTimePickerTestId?: string
}
@observer
class DateTimePicker extends Component<DatePickerProps> {
   @observable startDate: Date | null
   datePickerRef
   @observable error = ''
   @observable isActive: boolean

   static defaultProps = {
      validate: () => ({
         shouldShowError: false,
         errorMessage: ''
      }),
      disabled: false,
      showMonthDropdown: true,
      showYearDropdown: true,
      scrollableYearDropdown: true,
      dateFormat: DATE_PICKER_DATE_FORMAT,
      showIcon: true,
      timeIntervals: 30,
      dateTimePickerTestId: 'reactDateTimePicker'
   }

   constructor(props: DatePickerProps) {
      super(props)
      this.startDate = props.date
         ? getDateObjectFromDateString(props.date)
         : null
      this.isActive = false
   }

   @action.bound setError(errorText: string): void {
      this.error = errorText
   }

   getSelectedDueDate = (): Date | null => this.startDate

   onBlur = (): void => {
      const { validate } = this.props
      if (validate) {
         const result = validate()
         if (result.shouldShowError) {
            this.setError(result.errorMessage)
         } else {
            this.setError('')
         }
      }
   }

   onFocus = (): void => {
      this.setError('')
   }

   @computed get isError(): boolean {
      return this.error !== ''
   }

   handleChange = (date): void => {
      const { onChangeDateTime } = this.props
      this.startDate = date
      if (onChangeDateTime) {
         onChangeDateTime(date)
      }
   }

   captureDatePickerRef = (ref): void => {
      this.datePickerRef = ref
      if (this.datePickerRef && this.datePickerRef.input) {
         this.datePickerRef.input.readOnly = true
      }
   }

   changeIsActive = () => {
      this.isActive = !this.isActive
   }

   render() {
      const {
         t,
         containerClassName,
         containerCSS,
         disabled,
         errorId,
         showIcon,
         timeIntervals,
         dateTimePickerTestId,
         ...other
      } = this.props
      return (
         <DateContainer className={containerClassName} css={containerCSS}>
            <DatePickerAndIconWrapper data-testid={dateTimePickerTestId}>
               {showIcon ? (
                  <IconWrapper>
                     <CalenderIcon
                        fill={this.isActive ? Colors.brightBlue : Colors.steel}
                     />
                  </IconWrapper>
               ) : null}

               <ReactDatePicker
                  timeIntervals={timeIntervals}
                  onCalendarOpen={this.changeIsActive}
                  onCalendarClose={this.changeIsActive}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  selected={this.startDate}
                  onChange={this.handleChange}
                  showTimeSelect
                  placeholderText={t(
                     'common:common.dateTimePicker.selectDateAndTime'
                  )}
                  dateFormat='d MMMM yyyy - h:mm aa'
                  className={
                     !this.isError
                        ? disabled
                           ? 'dateFieldStyles dateFieldDisabled'
                           : 'dateFieldStyles'
                        : 'dateFieldStyles dateFieldStylesOnError'
                  }
                  {...other}
               />
            </DatePickerAndIconWrapper>
            {this.isError && (
               <ErrorMessage
                  errorMessage={`* ${this.error}`}
                  errorId={errorId}
               />
            )}
         </DateContainer>
      )
   }
}

export default withTranslation('translations', { withRef: true })(
   DateTimePicker
)
