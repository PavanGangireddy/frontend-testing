import i18n from '../../i18n/'

export interface ErrorObject {
   shouldShowError: boolean
   errorMessage: string
}

const urlRegularExpression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i //eslint-disable-line

export const isEmpty = (validationString: string): boolean => {
   if (validationString) {
      return validationString.toString().replace(/\s/g, '') === ''
   }
   return true
}

export function validateAndReturnCustomError(
   validationString: string,
   errorMessage: string
): ErrorObject {
   if (isEmpty(validationString)) {
      return {
         shouldShowError: true,
         errorMessage: errorMessage
      }
   }
   return { shouldShowError: false, errorMessage: '' }
}

export function validateEmpty(validationString: string): ErrorObject {
   if (isEmpty(validationString)) {
      return {
         shouldShowError: true,
         errorMessage: i18n.t('common.validationErrorMessages.fieldRequired')
      }
   }
   return { shouldShowError: false, errorMessage: '' }
}

export function isEmptyObject(obj): boolean {
   return Object.keys(obj).length === 0
}

export function validateUrl(url: string): ErrorObject {
   if (validateEmpty(url).shouldShowError) {
      return validateEmpty(url)
   } else if (urlRegularExpression.test(url)) {
      return { shouldShowError: false, errorMessage: '' }
   }
   return {
      shouldShowError: true,
      errorMessage: i18n.t('common.validationErrorMessages.invalidURL')
   }
}
