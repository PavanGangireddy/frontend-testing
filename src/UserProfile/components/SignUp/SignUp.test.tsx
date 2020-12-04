import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import SignUp from '.'

describe('SignInForm', () => {
   let onClickLoginButton
   let onSubmitSignUpForm

   beforeEach(() => {
      onClickLoginButton = jest.fn()
      onSubmitSignUpForm = jest.fn()
   })

   it('should render typed username', () => {
      const fullName = 'test-full-name'
      const { getByTestId } = render(
         <SignUp
            onClickLoginButton={onClickLoginButton}
            onSubmitSignUpForm={onSubmitSignUpForm}
            signUpAPIStatus={200}
         />
      )

      const fullNameField = getByTestId('fullNameInput')
      fireEvent.change(fullNameField, { target: { value: fullName } })
      expect(fullNameField.value).toBe(fullName)
   })

   it('should render typed email', () => {
      const email = 'test@gmail.com'
      const { getByTestId } = render(
         <SignUp
            onClickLoginButton={onClickLoginButton}
            onSubmitSignUpForm={onSubmitSignUpForm}
            signUpAPIStatus={200}
         />
      )

      const emailField = getByTestId('signUpEmail')
      fireEvent.change(emailField, { target: { value: email } })

      expect(emailField.value).toBe(email)
   })

   it('should render typed password', () => {
      const password = 'password'
      const { getByTestId } = render(
         <SignUp
            onClickLoginButton={onClickLoginButton}
            onSubmitSignUpForm={onSubmitSignUpForm}
            signUpAPIStatus={200}
         />
      )

      const passwordField = getByTestId('passwordInput')
      fireEvent.change(passwordField, { target: { value: password } })

      expect(passwordField.value).toBe(password)
   })

   it('should render typed confirm password', () => {
      const confirmPassword = 'password'
      const { getByTestId } = render(
         <SignUp
            onClickLoginButton={onClickLoginButton}
            onSubmitSignUpForm={onSubmitSignUpForm}
            signUpAPIStatus={200}
         />
      )

      const confirmPasswordField = getByTestId('confirmPasswordInput')
      fireEvent.change(confirmPasswordField, {
         target: { value: confirmPassword }
      })
      expect(confirmPasswordField.value).toBe(confirmPassword)
   })

   it('should show error messages when we click create an account first', () => {
      const { getByTestId, getAllByText } = render(
         <SignUp
            onClickLoginButton={onClickLoginButton}
            onSubmitSignUpForm={onSubmitSignUpForm}
            signUpAPIStatus={200}
         />
      )
      const createAccountButton = getByTestId('createAccountButton')
      fireEvent.click(createAccountButton)
      expect(getAllByText('* Required').length).toBe(4)
   })

   // FIXME: need to handle these test case
   it('should create account when we enter correct details', () => {
      const fullName = 'test-full-name'
      const email = 'test@gmail.com'
      const password = 'password'
      const confirmPassword = 'password'
      const { getByTestId } = render(
         <SignUp
            onClickLoginButton={onClickLoginButton}
            onSubmitSignUpForm={onSubmitSignUpForm}
            signUpAPIStatus={200}
         />
      )
      const fullNameField = getByTestId('fullNameInput')
      fireEvent.change(fullNameField, { target: { value: fullName } })
      const emailField = getByTestId('signUpEmail')
      fireEvent.change(emailField, { target: { value: email } })
      const passwordField = getByTestId('passwordInput')
      fireEvent.change(passwordField, { target: { value: password } })
      const confirmPasswordField = getByTestId('confirmPasswordInput')
      fireEvent.change(confirmPasswordField, {
         target: { value: confirmPassword }
      })
      const createAccountButton = getByTestId('createAccountButton')
      fireEvent.click(createAccountButton)
      // expect(onSubmitSignUpForm).toHaveBeenCalledWith(fullName, email, password)
   })

   it('should redirect to login when we click login button ', () => {
      const { getByTestId } = render(
         <SignUp
            onClickLoginButton={onClickLoginButton}
            onSubmitSignUpForm={onSubmitSignUpForm}
            signUpAPIStatus={200}
         />
      )
      const loginButton = getByTestId('redirectToLoginButton')
      fireEvent.click(loginButton)
      expect(onClickLoginButton).toBeCalled()
   })
})
