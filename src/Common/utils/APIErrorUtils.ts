import { resStatuses, statusCodes } from '../constants/APIErrorConstants'
import I18n from '../i18n'

export const getFormattedAPIError = (apiError: any, showAlert = false) => {
   let description = ''
   let errorConstant = ''
   let title: string = I18n.t('common:common.errorViewTitle')
   let errorCode: number = statusCodes.internalServerErrorCode
   if (apiError !== null && apiError !== undefined) {
      try {
         const parsedMessage: any = JSON.parse(apiError)
         let parsedError: any

         if (parsedMessage.data === undefined || parsedMessage.data === null) {
            // To handle case when we are directly returning backend  error message
            parsedError = parsedMessage
         } else {
            // To handle case when we are adding all the requests to backend error message
            parsedError = parsedMessage.data
         }

         if (parsedError !== undefined && parsedError !== null) {
            if (
               parsedError.message &&
               parsedError.message === resStatuses.requestTimedOut
            ) {
               title = I18n.t('common:common.errorViewTitle')
               description = I18n.t('common:common.errorViewDescription')
            }

            if (parsedError.response) {
               try {
                  const response = JSON.parse(parsedError.response)
                  const {
                     title: errorTitle,
                     description: errorDescription
                  } = response
                  title = errorTitle
                  description = errorDescription
               } catch (e) {
                  description = parsedError.response
               }
               errorConstant = parsedError.res_status
            }
            if (parsedError.http_status_code) {
               errorCode = parsedError.http_status_code
               errorConstant = parsedError.res_status
               if (
                  parsedError.http_status_code ===
                  statusCodes.noInternetErrorCode
               ) {
                  title = I18n.t('common:common.connectionLost')
                  description = I18n.t('common:common.internetConnection')
               }
            }
         }
      } catch (e) {
         if (apiError) {
            console.log(apiError)
         }
      }
   }

   if (description === null || description === '') {
      title = I18n.t('common:common.errorViewTitle')
      description = I18n.t('common:common.errorViewDescription')
   }
   if (showAlert) {
      alert(description) // eslint-disable-line
   }
   const apiErrorResponse = {
      errorCode,
      title,
      description,
      errorConstant
   }
   return apiErrorResponse
}

export const getFormattedAPIErrorDescription = (apiError: any) => {
   const error = getFormattedAPIError(apiError)
   return error.description
}

export function isAccessTokenExpiredResult(message: string) {
   const errorResponse = JSON.parse(message)
   let isAccessTokenExpired = false
   try {
      const { status, data } = errorResponse
      const { detail: failureMessage, res_status: resStatus } = data
      // infrastructure errors cases
      if (
         status === statusCodes.badRequestErrorCode &&
         (resStatus === resStatuses.invalidToken ||
            resStatus === resStatuses.invalidUser)
      ) {
         isAccessTokenExpired = true
      } else if (
         status === statusCodes.accessForbiddenErrorCode &&
         failureMessage &&
         resStatus === undefined
      ) {
         isAccessTokenExpired = true
      } else if (
         status === statusCodes.unAuthorizedErrorCode &&
         failureMessage &&
         resStatus === undefined
      ) {
         isAccessTokenExpired = true
      } else if (
         status === statusCodes.accessForbiddenErrorCode &&
         resStatus === resStatuses.notAuthorizedException
      ) {
         isAccessTokenExpired = true
      } else if (
         status === statusCodes.notFoundErrorCode &&
         resStatus === resStatuses.userNotFoundException
      ) {
         isAccessTokenExpired = true
      } else if (
         status === statusCodes.notFoundErrorCode &&
         resStatus === resStatuses.invalidSessionToken
      ) {
         isAccessTokenExpired = true
      }
   } catch (e) {
      console.log('error in check error type', e)
   }

   return {
      isAccessTokenExpired
   }
}
