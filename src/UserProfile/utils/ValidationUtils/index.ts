import i18n from '../../../Common/i18n'
import {
   validateEmpty,
   isEmpty
} from '../../../Common/utils/ValidationUtils/index'

interface ErrorObject {
   shouldShowError: boolean
   errorMessage: string
}

const emailIdRegularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const phoneNumberRegularExpression = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/
const passwordRegularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/
const fullNameRegularExpression = /^[A-Z a-z]+$/

export function validateEmailId(emailId: string): ErrorObject {
   if (validateEmpty(emailId).shouldShowError) {
      return validateEmpty(emailId)
   }
   const trimmedEmailId: string = emailId.trim()
   if (emailIdRegularExpression.test(trimmedEmailId)) {
      return { shouldShowError: false, errorMessage: '' }
   }
   return {
      shouldShowError: true,
      errorMessage: i18n.t('userProfile:invalidEmail')
   }
}

export function validateFullName(fullName: string): ErrorObject {
   if (validateEmpty(fullName).shouldShowError) {
      return validateEmpty(fullName)
   } else if (
      fullNameRegularExpression.test(fullName) &&
      fullName.length > 3 &&
      fullName.length < 50
   ) {
      return { shouldShowError: false, errorMessage: '' }
   }
   return {
      shouldShowError: true,
      errorMessage: i18n.t('userProfile:notAValidName')
   }
}

export function validateName(sectionName: string): ErrorObject {
   if (validateEmpty(sectionName).shouldShowError) {
      return validateEmpty(sectionName)
   }
   return {
      shouldShowError: false,
      errorMessage: ''
   }
}

export function validatePassword(password: string): ErrorObject {
   if (validateEmpty(password).shouldShowError) {
      return validateEmpty(password)
   } else if (password.length < 8) {
      return {
         shouldShowError: true,
         errorMessage: i18n.t('userProfile:passwordShouldHaveMinimumLength')
      }
   }
   return { shouldShowError: false, errorMessage: '' }
}

export function validatePhoneNumber(phoneNumber: string): ErrorObject {
   if (validateEmpty(phoneNumber).shouldShowError) {
      return validateEmpty(phoneNumber)
   } else if (phoneNumberRegularExpression.test(phoneNumber)) {
      return { shouldShowError: false, errorMessage: '' }
   }
   return {
      shouldShowError: true,
      errorMessage: i18n.t('loginForm.invalidMobileNumber')
   }
}

export function validatePhoneNumberWithoutRequiredCheck(
   phoneNumber: string
): ErrorObject {
   if (isEmpty(phoneNumber)) {
      return { shouldShowError: false, errorMessage: '' }
   }
   if (phoneNumberRegularExpression.test(phoneNumber)) {
      return { shouldShowError: false, errorMessage: '' }
   }
   return {
      shouldShowError: true,
      errorMessage: i18n.t('userProfile:invalidMobileNumber')
   }
}

export function arePasswordsMatched(
   password: string,
   confirmPassword: string
): boolean {
   return password === confirmPassword
}

export function validateStrongPassword(password: string): ErrorObject {
   if (validateEmpty(password).shouldShowError) {
      return validateEmpty(password)
   } else if (passwordRegularExpression.test(password)) {
      return {
         shouldShowError: false,
         errorMessage: ''
      }
   }
   return {
      shouldShowError: true,
      errorMessage: i18n.t('userProfile:strongPasswordCriteria')
   }
}

export function validatePhoneOrEmail(text: string): ErrorObject {
   if (validateEmpty(text).shouldShowError) {
      return validateEmpty(text)
   }
   const phoneNumberError: ErrorObject = validatePhoneNumber(text)
   const emailError: ErrorObject = validateEmailId(text)
   if (phoneNumberError.shouldShowError && !emailError.shouldShowError) {
      return emailError
   } else if (!phoneNumberError.shouldShowError && emailError.shouldShowError) {
      return phoneNumberError
   }
   return {
      shouldShowError: true,
      errorMessage: i18n.t('userProfile:invalidPhoneNumberOrEmail')
   }
}
