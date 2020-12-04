import React from 'react'
import { toast, Slide } from 'react-toastify'
import { css } from 'glamor'
import 'react-toastify/dist/ReactToastify.css'

import './styles.css'
import { ToastErrorMessage, ToastSuccessMessage } from './ToastMessages'

let toastId: string | number

function dismissToast(): void {
   if (toast.isActive(toastId)) {
      toast.dismiss(toastId)
   }
}

export function showBottomCenterToast(
   ToastComponent,
   message: string,
   props
): void {
   dismissToast()
   toastId = toast(
      ({ closeToast }) => (
         <ToastComponent message={message} closeToast={closeToast} />
      ),
      {
         bodyClassName: css({
            fontFamily: 'HKGrostek',
            display: 'flex',
            alignItems: 'center'
         }),
         transition: Slide,
         position: 'bottom-center',
         autoClose: 1500,
         closeButton: false,
         closeOnClick: false,

         ...props
      }
   )
}

export function showFailureBottomCenterToast(
   message: string,
   props = {}
): void {
   showBottomCenterToast(ToastErrorMessage, message, {
      className: 'toast-failure',
      ...props
   })
}

export function showSuccessBottomCenterToast(
   message: string,
   props = {}
): void {
   showBottomCenterToast(ToastSuccessMessage, message, {
      className: 'toast-success',
      ...props
   })
}
