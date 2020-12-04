import { validateEmptyInputField, validateFormattedTextFied } from '.'

describe('ValidationUtils', () => {
   it('Should test validateEmptyInputField()', () => {
      const validString = 'test.user@ibhubs.co',
         invalidEmptyString = ''

      expect(validateEmptyInputField(validString).shouldShowError).toBeFalsy()

      expect(
         validateEmptyInputField(invalidEmptyString).shouldShowError
      ).toBeTruthy()
   })

   it('Should test validateFormattedTextFied()', () => {
      const validString = '<p>hello</p>',
         invalidEmptyString = '',
         invalidFormattedEmptyString = '<p></p>',
         invaidFormattedString = '<p><br/><p>'

      expect(validateFormattedTextFied(validString).shouldShowError).toBeFalsy()

      expect(
         validateFormattedTextFied(invalidEmptyString).shouldShowError
      ).toBeTruthy()

      expect(
         validateFormattedTextFied(invalidFormattedEmptyString).shouldShowError
      ).toBeTruthy()

      expect(
         validateFormattedTextFied(invaidFormattedString).shouldShowError
      ).toBeTruthy()
   })
})
