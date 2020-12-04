import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import LinkExpiredForm from '.'

describe('Forgot PasswordForm tests', () => {
   let sendEmailAPI
   let onSuccessSendEmailAPI
   let onClickReturnToLogin

   beforeEach(() => {
      sendEmailAPI = jest.fn()
      onSuccessSendEmailAPI = jest.fn()
      onClickReturnToLogin = jest.fn()
   })

   it('should render typed email', () => {
      const email = 'sample@gmail.com'
      const { getByTestId } = render(
         <LinkExpiredForm
            sendEmailAPI={sendEmailAPI}
            sendEmailAPIStatus={200}
            onSuccessSendEmailAPI={onSuccessSendEmailAPI}
            onClickReturnToLogin={onClickReturnToLogin}
         />
      )
      const emailField = getByTestId('linkExpiredEmail')
      fireEvent.change(emailField, { target: { value: email } })
      expect(emailField.value).toBe(email)
   })

   it('should redirect to login when we click return to login', () => {
      const { getByTestId } = render(
         <LinkExpiredForm
            sendEmailAPI={sendEmailAPI}
            sendEmailAPIStatus={200}
            onSuccessSendEmailAPI={onSuccessSendEmailAPI}
            onClickReturnToLogin={onClickReturnToLogin}
         />
      )
      const returnToLogin = getByTestId('redirectToLoginButton')
      fireEvent.click(returnToLogin)
      expect(onClickReturnToLogin).toBeCalled()
   })

   it('should check whether error is displayed or not', () => {
      const { getByTestId, getByText } = render(
         <LinkExpiredForm
            sendEmailAPI={sendEmailAPI}
            sendEmailAPIStatus={200}
            onSuccessSendEmailAPI={onSuccessSendEmailAPI}
            onClickReturnToLogin={onClickReturnToLogin}
         />
      )
      const sendEmailButton = getByTestId('sendEmailButton')
      fireEvent.click(sendEmailButton)
      getByText('* Required')
   })

   it('should check whether error is displayed or not', () => {
      const email = 'sample@gmail.com'
      const { getByTestId } = render(
         <LinkExpiredForm
            sendEmailAPI={sendEmailAPI}
            sendEmailAPIStatus={200}
            onSuccessSendEmailAPI={onSuccessSendEmailAPI}
            onClickReturnToLogin={onClickReturnToLogin}
         />
      )
      const emailField = getByTestId('linkExpiredEmail')
      fireEvent.change(emailField, { target: { value: email } })
      const sendEmailButton = getByTestId('sendEmailButton')
      fireEvent.click(sendEmailButton)
      const request = {
         email: email
      }
      expect(sendEmailAPI).toHaveBeenCalledWith(
         request,
         expect.any(Function),
         expect.any(Function)
      )
   })
})
