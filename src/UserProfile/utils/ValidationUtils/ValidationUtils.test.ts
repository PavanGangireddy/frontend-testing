import {
   validateFullName,
   validateEmailId,
   validatePassword,
   validatePhoneNumber,
   validatePhoneNumberWithoutRequiredCheck,
   arePasswordsMatched,
   validateStrongPassword,
   validatePhoneOrEmail
} from '.'

describe('Validation Utils test cases', () => {
   it('should test for email validation', () => {
      const validEmail = 'abc@gmail.com'
      const inValidEmail = 'a@gmailCom'
      expect(validateEmailId(validEmail).shouldShowError).toBe(false)
      expect(validateEmailId(inValidEmail).shouldShowError).toBe(true)
      expect(validateEmailId('').shouldShowError).toBe(true)
   })

   it('should test for email validation with leading and trailing spaces', () => {
      const validEmail = ' abc@gmail.com  '
      const inValidEmail = 'a @gmailCom'
      expect(validateEmailId(validEmail).shouldShowError).toBe(false)
      expect(validateEmailId(inValidEmail).shouldShowError).toBe(true)
      expect(validateEmailId('').shouldShowError).toBe(true)
   })

   it('should test for password validation', () => {
      const validPassword = 'my@passWord'
      const passwordWithSpaces = '             '
      const passwordWithFiveCharcters = 'mypas'
      expect(validatePassword(validPassword).shouldShowError).toBe(false)
      expect(validatePassword(passwordWithSpaces).shouldShowError).toBe(true)
      expect(validatePassword(passwordWithFiveCharcters).shouldShowError).toBe(
         true
      )
      expect(validatePassword('').shouldShowError).toBe(true)
   })

   it('should test for phone number validation', () => {
      const validPhoneNumber = '9146788912'
      const phoneNumberWithCharacters = '9550550web'
      expect(validatePhoneNumber(validPhoneNumber).shouldShowError).toBe(false)
      expect(
         validatePhoneNumber(phoneNumberWithCharacters).shouldShowError
      ).toBe(true)
      expect(validatePhoneNumber('').shouldShowError).toBe(true)
   })

   it('should test for phone number validation without mandatory field', () => {
      const validPhoneNumber = '9146788912'
      const phoneNumberWithCharacters = '9550550web'
      const emptyValue = ''
      expect(
         validatePhoneNumberWithoutRequiredCheck(validPhoneNumber)
            .shouldShowError
      ).toBe(false)
      expect(
         validatePhoneNumberWithoutRequiredCheck(phoneNumberWithCharacters)
            .shouldShowError
      ).toBe(true)
      expect(
         validatePhoneNumberWithoutRequiredCheck(emptyValue).shouldShowError
      ).toBe(false)
   })

   it('should test arePasswordsMatched function', () => {
      const password = 'my@Password'
      const confirmPassword = 'my@Password'
      const invalidPassword = 's@mplePassword'
      expect(arePasswordsMatched(password, confirmPassword)).toBe(true)
      expect(arePasswordsMatched(password, invalidPassword)).toBe(false)
   })

   it('should test validateStrongPassword function', () => {
      const validPassword = 'strongP@ssword1'
      const passwordWithOutNumbers = 'strong@Pass'
      const passwordWithOutCapitalCharacter = 'strong@132'
      const passwordWithOutSmallCharacter = 'STRONG@132'
      const passwordWithOutSpecialCharacter = 'stronGpassWord1'
      expect(validateStrongPassword(validPassword).shouldShowError).toBe(false)
      expect(
         validateStrongPassword(passwordWithOutNumbers).shouldShowError
      ).toBe(true)
      expect(
         validateStrongPassword(passwordWithOutCapitalCharacter).shouldShowError
      ).toBe(true)
      expect(
         validateStrongPassword(passwordWithOutSmallCharacter).shouldShowError
      ).toBe(true)
      expect(
         validateStrongPassword(passwordWithOutSpecialCharacter).shouldShowError
      ).toBe(true)
      expect(validateStrongPassword('').shouldShowError).toBe(true)
   })

   it('should test validateFullName function', () => {
      const validFullName = 'JohnWesly'
      const fullNameWithSingleCharacter = 'h'
      const fullNameWithNumbers = 'JohnWesly678'
      const fullNameWithOnlySpaces = '              '
      const fullNameWithSpaces = 'John Wesly'
      expect(validateFullName(validFullName).shouldShowError).toBe(false)
      expect(validateFullName(fullNameWithSpaces).shouldShowError).toBe(false)
      expect(
         validateFullName(fullNameWithSingleCharacter).shouldShowError
      ).toBe(true)
      expect(validateFullName(fullNameWithNumbers).shouldShowError).toBe(true)
      expect(validateFullName(fullNameWithOnlySpaces).shouldShowError).toBe(
         true
      )
   })

   it('should test for validatePhoneOrEmail util function', () => {
      expect(validatePhoneOrEmail('').shouldShowError).toBe(true)
      expect(validatePhoneOrEmail('abc@gmail').shouldShowError).toBe(true)
      expect(validatePhoneOrEmail('abc@gmail.com').shouldShowError).toBe(false)
      expect(validatePhoneOrEmail('abc').shouldShowError).toBe(true)
      expect(validatePhoneOrEmail('9908001132').shouldShowError).toBe(false)
      expect(validatePhoneOrEmail('990990990').shouldShowError).toBe(true)
   })
})
