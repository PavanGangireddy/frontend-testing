import { format } from 'date-fns'

import {
   SERVER_DATE_FORMAT,
   DISCUSSIONS_DATE_TIME_FORMAT
} from '../../constants/DateConstants'

export const getDateFormat = (date: string) => {
   //NOTE: since we are not including timezone indicator in our date string there will be cross browser issues in this, to fix it in majority cases we are converting the date to the following format (ref: https://stackoverflow.com/questions/13363673/javascript-date-is-invalid-on-ios)
   const updatedFormatForCrossBrowserSupport = date
      .split('-')
      .join('/')
      .split('.')[0]
   return format(new Date(updatedFormatForCrossBrowserSupport), 'MMMM d, p')
}

export const getDateAndTimeFormat = (
   date: Date,
   formatToConvert = SERVER_DATE_FORMAT
) => format(date, formatToConvert)

export const getDateObjectFromDateString = (date: string): Date => {
   const dateAndTimeArray = date.split(' ')
   const dateArray = dateAndTimeArray[0].split('-')
   const timeArray = dateAndTimeArray[1].split(':')
   return new Date(
      parseInt(dateArray[0]),
      parseInt(dateArray[1]) - 1,
      parseInt(dateArray[2]),
      parseInt(timeArray[0].trim()),
      parseInt(timeArray[1])
   )
}

export const getCurrentDate = () => {
   const date = new Date()
   return `${date.getFullYear()}-${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
   }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
}

export function getDateFromDateObject(
   date: Date,
   customFormat = DISCUSSIONS_DATE_TIME_FORMAT
): string {
   return format(date, customFormat)
}
