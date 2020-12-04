import React, { ReactElement } from 'react'

import CloseIcon from '../../icons/CloseIcon'
import ErrorFillIcon from '../../icons/ErrorFillIcon'
import CircleTickIcon from '../../icons/CircleTickIcon'

import colors from '../../themes/Colors'

import { isMobileDevice } from '../responsiveUtils'

import {
   SuccessIconContainer,
   ErrorIconContainer,
   CloseIconContainer,
   ToastContainer,
   ErrorMessage,
   SuccessMessage,
   MobileSuccessMessage,
   MobileFailureMessage
} from './styledComponents'

export const ToastErrorMessage = (props: {
   message: string
   closeToast: () => void
}): ReactElement => {
   const { message, closeToast } = props
   return (
      <ToastContainer>
         <ErrorIconContainer>
            <ErrorFillIcon />
         </ErrorIconContainer>
         {isMobileDevice ? (
            <MobileFailureMessage as='div'>{message}</MobileFailureMessage>
         ) : (
            <ErrorMessage as='div'>{message}</ErrorMessage>
         )}
         <CloseIconContainer onClick={closeToast}>
            <CloseIcon fill={colors.darkBlueGrey} />
         </CloseIconContainer>
      </ToastContainer>
   )
}

export const ToastSuccessMessage = (props: {
   message: string
   closeToast: () => void
}): ReactElement => {
   const { message, closeToast } = props
   return (
      <ToastContainer>
         <SuccessIconContainer>
            <CircleTickIcon />
         </SuccessIconContainer>
         {isMobileDevice ? (
            <MobileSuccessMessage as='div'>{message}</MobileSuccessMessage>
         ) : (
            <SuccessMessage as='div'>{message}</SuccessMessage>
         )}
         <CloseIconContainer onClick={closeToast}>
            <CloseIcon
               fill={isMobileDevice ? colors.white : colors.darkBlueGrey}
            />
         </CloseIconContainer>
      </ToastContainer>
   )
}
