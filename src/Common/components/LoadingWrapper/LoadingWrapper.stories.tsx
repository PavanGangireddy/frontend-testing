import React, { ReactElement } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { API_FETCHING, API_SUCCESS, API_FAILED } from '@ib/api-constants'

import LoadingWrapper from '.'

function ChildComponent(): ReactElement {
   return <span>Render data here...</span>
}

function getCustomError(message: string): Error {
   return new Error(
      JSON.stringify({
         response: message,
         res_status: 'CUSTOM_ERROR',
         http_status_code: 400
      })
   )
}

storiesOf('FeedbackIndicators', module)
   .add('LoadingWrapper Component when fetching', () => (
      <LoadingWrapper
         onRetry={action('clicked retry button')}
         apiError={getCustomError('Connection failed')}
         apiStatus={API_FETCHING}
         renderSuccessUI={ChildComponent}
      />
   ))
   .add('LoadingWrapper Component when success', () => (
      <LoadingWrapper
         onRetry={() => {
            action('clicked retry button')
         }}
         apiError={getCustomError('Connection failed')}
         apiStatus={API_SUCCESS}
         renderSuccessUI={ChildComponent}
      />
   ))
   .add('LoadingWrapper Component when failed', () => (
      <LoadingWrapper
         onRetry={() => {
            action('clicked retry button')
         }}
         apiError={getCustomError('Connection failed')}
         apiStatus={API_FAILED}
         renderSuccessUI={ChildComponent}
      />
   ))
