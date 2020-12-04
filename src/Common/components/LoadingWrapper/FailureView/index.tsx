import React, { Component } from 'react'
import { withTranslation, WithTranslation } from 'react-i18next' // eslint-disable-line

import Button from '../../Button'

import {
   FailureText,
   ButtonContainer,
   Content,
   Container
} from './styledComponents'

interface FailureViewProps extends WithTranslation {
   onRetry: () => any
   failureText: string
   showButton?: boolean
   failureMessageTestId?: string
   retryButtonTestId?: string
   failureViewCSS?: React.CSSProperties
}

class FailureView extends Component<FailureViewProps> {
   static defaultProps = {
      showButton: true,
      failureMessageTestId: 'failureMessage',
      retryButtonTestId: 'retryButton',
      failureViewCSS: {}
   }

   renderButton = () => {
      const { onRetry, t, showButton, retryButtonTestId } = this.props
      return showButton ? (
         <ButtonContainer>
            <Button onClick={onRetry} data-testid={retryButtonTestId}>
               {t('common:common.failureView.retry')}
            </Button>
         </ButtonContainer>
      ) : null
   }
   render() {
      const { failureText, failureMessageTestId, failureViewCSS } = this.props
      return (
         <Container>
            <Content>
               <FailureText
                  data-testid={failureMessageTestId}
                  className={failureViewCSS}
               >
                  {failureText}
               </FailureText>
            </Content>
            {this.renderButton()}
         </Container>
      )
   }
}

export default withTranslation()(FailureView)
