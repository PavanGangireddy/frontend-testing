import * as Sentry from '@sentry/react'
import EnvironmentConstants from '../constants/EnvironmentConstants'

const isNotDevEnvironment = process.env.NODE_ENV === 'production'

export function initializeSentry(): void {
   if (isNotDevEnvironment) {
      const { SENTRY_KEY } = EnvironmentConstants
      Sentry.init({
         dsn: SENTRY_KEY,
         release: process.env.REACT_APP_SENTRY_RELEASE
      })
   }
}

function getErrorMessage(e): string {
   return e && e.stack && e.message
}

export function captureSentryException(
   error: Error,
   errorInfo: any = undefined
): void {
   if (error && isNotDevEnvironment) {
      let updatedError = error
      if (!getErrorMessage(error)) {
         updatedError = new Error(error.toString())
      }
      if (errorInfo) {
         Sentry.configureScope(scope => {
            Object.keys(errorInfo).forEach(key => {
               scope.setExtra(key, errorInfo[key])
            })
         })
      }
      Sentry.captureException(updatedError)
   }
}
