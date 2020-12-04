import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import LoginForm from '.'

describe.skip('login tests', () => {
   let verifyLoginAPI
   let onSuccessVerifyLoginAPI
   let onClickForgotPassword
   let goToSendVerificationMailPage
   let goToSignUpPage

   beforeEach(() => {
      verifyLoginAPI = jest.fn()
      onSuccessVerifyLoginAPI = jest.fn()
      onClickForgotPassword = jest.fn()
      goToSendVerificationMailPage = jest.fn()
      goToSignUpPage = jest.fn()
   })

   it('should render typed email', () => {
      const email = 'sample@gmail.com'
      const { getByTestId } = render(
         <LoginForm
            verifyLoginAPIStatus={200}
            onSuccessVerifyLoginAPI={onSuccessVerifyLoginAPI}
            onClickForgotPassword={onClickForgotPassword}
            goToSendVerificationMailPage={goToSendVerificationMailPage}
            goToSignUpPage={goToSignUpPage}
            // TODO: need to remove in alpha or in beta env
            verifyLoginAPI={() => {}}
         />
      )

      const emailField = getByTestId('loginEmailInput')
      fireEvent.change(emailField, { target: { value: email } })
      expect(emailField.value).toBe(email)
   })

   it('should render login after entering correct details', () => {
      const password = 'password'
      const { getByTestId } = render(
         <LoginForm
            verifyLoginAPIStatus={200}
            onSuccessVerifyLoginAPI={onSuccessVerifyLoginAPI}
            onClickForgotPassword={onClickForgotPassword}
            goToSendVerificationMailPage={goToSendVerificationMailPage}
            goToSignUpPage={goToSignUpPage}
            // TODO: need to remove in alpha or in beta env
            verifyLoginAPI={() => {}}
         />
      )

      const passwordField = getByTestId('loginPasswordInput')
      fireEvent.change(passwordField, { target: { value: password } })
      expect(passwordField.value).toBe(password)
   })

   it('should render typed password', () => {
      const email = 'sample@gmail.com'
      const password = 'password'
      const { getByTestId } = render(
         <LoginForm
            verifyLoginAPIStatus={200}
            onSuccessVerifyLoginAPI={onSuccessVerifyLoginAPI}
            onClickForgotPassword={onClickForgotPassword}
            goToSendVerificationMailPage={goToSendVerificationMailPage}
            goToSignUpPage={goToSignUpPage}
            // TODO: need to remove in alpha or in beta env
            verifyLoginAPI={() => {}}
         />
      )

      const emailField = getByTestId('loginEmailInput')
      fireEvent.change(emailField, { target: { value: email } })
      const passwordField = getByTestId('loginPasswordInput')
      fireEvent.change(passwordField, { target: { value: password } })
      const loginButton = getByTestId('loginSubmitButton')
      fireEvent.click(loginButton)
      const requestObject = {
         email: email,
         password: password
      }
      expect(verifyLoginAPI).toHaveBeenCalledWith(
         requestObject,
         expect.any(Function),
         expect.any(Function)
      )
   })

   it('should test whether error message is displayed or not', () => {
      const { getByTestId, getAllByText } = render(
         <LoginForm
            verifyLoginAPIStatus={200}
            onSuccessVerifyLoginAPI={onSuccessVerifyLoginAPI}
            onClickForgotPassword={onClickForgotPassword}
            goToSendVerificationMailPage={goToSendVerificationMailPage}
            goToSignUpPage={goToSignUpPage}
            // TODO: need to remove in alpha or in beta env
            verifyLoginAPI={() => {}}
         />
      )
      const loginButton = getByTestId('loginSubmitButton')
      fireEvent.click(loginButton)
      expect(getAllByText('* Required').length).toBe(2)
   })

   it('should test whether it redirects to signUp page or not', () => {
      const { getByTestId } = render(
         <LoginForm
            verifyLoginAPIStatus={200}
            onSuccessVerifyLoginAPI={onSuccessVerifyLoginAPI}
            onClickForgotPassword={onClickForgotPassword}
            goToSendVerificationMailPage={goToSendVerificationMailPage}
            goToSignUpPage={goToSignUpPage}
            // TODO: need to remove in alpha or in beta env
            verifyLoginAPI={() => {}}
         />
      )
      const signUpButton = getByTestId('signUpButton')
      fireEvent.click(signUpButton)
      expect(goToSignUpPage).toBeCalled()
   })

   it('should test whether it redirects to forgot password page or not', () => {
      const { getByTestId } = render(
         <LoginForm
            verifyLoginAPIStatus={200}
            onSuccessVerifyLoginAPI={onSuccessVerifyLoginAPI}
            onClickForgotPassword={onClickForgotPassword}
            goToSendVerificationMailPage={goToSendVerificationMailPage}
            goToSignUpPage={goToSignUpPage}
            // TODO: need to remove in alpha or in beta env
            verifyLoginAPI={() => {}}
         />
      )
      const forgotPasswordButton = getByTestId('forgotPasswordButton')
      fireEvent.click(forgotPasswordButton)
      expect(onClickForgotPassword).toBeCalled()
   })
})
