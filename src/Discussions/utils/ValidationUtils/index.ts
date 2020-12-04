import i18n from '../../../Common/i18n'

export interface ValidationResponseType {
   errorMessage: string
   shouldShowError: boolean
}

const errorsFori18n = {
   noError: 'common:errorMessage.noError',
   required: 'common:common.validationErrorMessages.fieldRequired'
}

const NON_EMPTY_TEXT_REGEX = /[\S]/
const NON_EMPTY_FORMATTED_TEXT_REGEX = /(?:>\s*\w{1,})/

export const validateFormattedTextFied = (
   stringValue: string
): ValidationResponseType => {
   if (stringValue.match(NON_EMPTY_FORMATTED_TEXT_REGEX))
      return {
         shouldShowError: false,
         errorMessage: i18n.t(errorsFori18n.noError)
      }
   return {
      shouldShowError: true,
      errorMessage: i18n.t(errorsFori18n.required)
   }
}

export const validateEmptyInputField = (
   stringValue: string
): ValidationResponseType => {
   if (stringValue.match(NON_EMPTY_TEXT_REGEX))
      return {
         shouldShowError: false,
         errorMessage: i18n.t(errorsFori18n.noError)
      }
   return {
      shouldShowError: true,
      errorMessage: i18n.t(errorsFori18n.required)
   }
}
