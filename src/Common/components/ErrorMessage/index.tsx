import * as React from 'react'
import 'styled-components/macro'

import {
   ErrorView,
   ErrorMessageContainer,
   containerCSS
} from './styledComponents'

interface ErrorMessageProps {
   errorMessage: string
   errorId?: string
   errorContainerCSS?: React.CSSProperties
   errorMessageTestId?: string
}

class ErrorMessage extends React.Component<ErrorMessageProps> {
   static defaultProps = {
      errorMessage: '*required',
      errorContainerCSS: containerCSS,
      errorMessageTestId: 'errorMessageTestId'
   }

   render(): React.ReactNode {
      const {
         errorMessage,
         errorId,
         errorContainerCSS,
         errorMessageTestId
      } = this.props
      return (
         <ErrorView
            id={errorId}
            css={errorContainerCSS}
            data-testid={errorMessageTestId}
         >
            <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
         </ErrorView>
      )
   }
}

export default ErrorMessage
