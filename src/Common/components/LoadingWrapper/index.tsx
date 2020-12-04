import React, { Component } from 'react'
import { observer } from 'mobx-react'
import {
   APIStatus,
   API_FETCHING,
   API_SUCCESS,
   API_FAILED
} from '@ib/api-constants'

import { getAPIErrorMessage, displayApiError } from '../../utils/APIUtils'

import { statusCodes } from '../../constants/APIErrorConstants'
import LoadingView from './LoadingView'
import FailureView from './FailureView'
import { Container } from './styledComponents'

interface Props {
   renderLoadingView: () => any
   renderFailureView: (
      onRetry: () => any,
      failureText: string,
      showButton: boolean
   ) => any
   apiStatus: APIStatus
   renderSuccessUI: React.ComponentType
   onRetry: () => any
   apiError: Error
   containerStyle: Record<string, any>
   containerClassName: React.CSSProperties
   loaderTestId?: string
   failureMessageTestId?: string
   retryButtonTestId?: string
}

@observer
class LoadingWrapper extends Component<Props> {
   static defaultProps = {
      onRetry: () => 0,
      renderLoadingView: () => (
         <div data-testid='loader'>
            <LoadingView />
         </div>
      ),
      renderFailureView: (onRetry, failureText, showButton) => (
         <FailureView
            onRetry={onRetry}
            failureText={failureText}
            showButton={showButton}
         />
      ),
      containerClassName: '',
      containerStyle: {},
      failureMessageTestId: 'failureMessage',
      retryButtonTestId: 'retryButton',
      loaderTestId: 'loader'
   }

   renderChildrenWithContainer = (children: any) => {
      const { containerClassName, containerStyle } = this.props
      return (
         <Container style={containerStyle} className={containerClassName}>
            {children}
         </Container>
      )
   }

   renderContent = () => {
      const {
         renderFailureView,
         renderLoadingView,
         apiStatus,
         apiError,
         onRetry,
         renderSuccessUI: RenderSuccessUI
      } = this.props

      switch (apiStatus) {
         case API_FETCHING:
            return this.renderChildrenWithContainer(renderLoadingView())
         case API_SUCCESS:
            return <RenderSuccessUI />
         case API_FAILED: {
            const failureText = getAPIErrorMessage(apiError)
            const showButton =
               displayApiError(apiError).errorCode !==
               statusCodes.accessForbiddenErrorCode
            return this.renderChildrenWithContainer(
               renderFailureView(onRetry, failureText, showButton)
            )
         }
         default:
            return this.renderChildrenWithContainer(renderLoadingView())
      }
   }

   render() {
      return <>{this.renderContent()}</>
   }
}

export default LoadingWrapper
