import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import ResetPasswordForm from '.'

describe('Reset Password Form tests', () => {
   let updatePasswordAPI
   let onSuccessUpdatePasswordAPI
   let onFailureUpdatePasswordAPI
   let onClickReturnToLogin

   beforeEach(() => {
      updatePasswordAPI = jest.fn()
      onSuccessUpdatePasswordAPI = jest.fn()
      onFailureUpdatePasswordAPI = jest.fn()
      onClickReturnToLogin = jest.fn()
   })

   it('should render typed password', () => {
      const password = 'password'
      const { getByTestId } = render(
         <ResetPasswordForm
            updatePasswordAPI={updatePasswordAPI}
            updatePasswordAPIStatus={200}
            onSuccessUpdatePasswordAPI={onSuccessUpdatePasswordAPI}
            onFailureUpdatePasswordAPI={onFailureUpdatePasswordAPI}
            onClickReturnToLogin={onClickReturnToLogin}
            token={'token'}
         />
      )

      const passwordField = getByTestId('passwordInput')
      fireEvent.change(passwordField, { target: { value: password } })
      expect(passwordField.value).toBe(password)
   })

   it('should render typed confirm password', () => {
      const confirmPassword = 'confirmPassword'
      const { getByTestId } = render(
         <ResetPasswordForm
            updatePasswordAPI={updatePasswordAPI}
            updatePasswordAPIStatus={200}
            onSuccessUpdatePasswordAPI={onSuccessUpdatePasswordAPI}
            onFailureUpdatePasswordAPI={onFailureUpdatePasswordAPI}
            onClickReturnToLogin={onClickReturnToLogin}
            token={'token'}
         />
      )

      const confirmPasswordField = getByTestId('confirmPasswordInput')
      fireEvent.change(confirmPasswordField, {
         target: { value: confirmPassword }
      })
      expect(confirmPasswordField.value).toBe(confirmPassword)
   })

   it('should render update password after entering correct details', () => {
      const password = 'password'
      const confirmPassword = 'password'
      const token = '5jc-f23254c62c94d949dbd7'
      const { getByTestId } = render(
         <ResetPasswordForm
            updatePasswordAPI={updatePasswordAPI}
            updatePasswordAPIStatus={200}
            onSuccessUpdatePasswordAPI={onSuccessUpdatePasswordAPI}
            onFailureUpdatePasswordAPI={onFailureUpdatePasswordAPI}
            onClickReturnToLogin={onClickReturnToLogin}
            token={token}
         />
      )

      const passwordField = getByTestId('passwordInput')
      fireEvent.change(passwordField, { target: { value: password } })
      const confirmPasswordField = getByTestId('confirmPasswordInput')
      fireEvent.change(confirmPasswordField, {
         target: { value: confirmPassword }
      })
      const updatePasswordButton = getByTestId('updatePasswordButton')
      fireEvent.click(updatePasswordButton)
      const requestObject = {
         new_password: password,
         confirm_password: confirmPassword
      }
      expect(updatePasswordAPI).toHaveBeenCalledWith(
         requestObject,
         token,
         onSuccessUpdatePasswordAPI,
         onFailureUpdatePasswordAPI
      )
   })

   it('should render error messages', () => {
      const { getByTestId, getAllByText } = render(
         <ResetPasswordForm
            updatePasswordAPI={updatePasswordAPI}
            updatePasswordAPIStatus={200}
            onSuccessUpdatePasswordAPI={onSuccessUpdatePasswordAPI}
            onFailureUpdatePasswordAPI={onFailureUpdatePasswordAPI}
            onClickReturnToLogin={onClickReturnToLogin}
            token={'token'}
         />
      )

      const updatePasswordButton = getByTestId('updatePasswordButton')
      fireEvent.click(updatePasswordButton)
      expect(getAllByText('* Required').length).toBe(2)
   })

   it('should redirect to login when we click return to login', () => {
      const { getByTestId } = render(
         <ResetPasswordForm
            updatePasswordAPI={updatePasswordAPI}
            updatePasswordAPIStatus={200}
            onSuccessUpdatePasswordAPI={onSuccessUpdatePasswordAPI}
            onFailureUpdatePasswordAPI={onFailureUpdatePasswordAPI}
            onClickReturnToLogin={onClickReturnToLogin}
            token={'token'}
         />
      )

      const redirectToLoginButton = getByTestId('redirectToLoginButton')
      fireEvent.click(redirectToLoginButton)
      expect(onClickReturnToLogin).toBeCalled()
   })
})
