import React, { Component, ReactElement } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'
import { APIStatus } from '@ib/api-constants'

import IbHubsVerticalLogoWithTitle from '../../../Common/icons/IbHubsVerticalLogoWithTitle'
import TopQuoteIcon from '../../../Common/icons/TopQuoteIcon'
import TickIcon from '../../../Common/icons/TickIcon'
import CloseIcon from '../../../Common/icons/CloseIcon'
import colors from '../../../Common/themes/Colors'
import ErrorIcon from '../../../Common/icons/ErrorIcon'
import { isAPIFetching } from '../../../Common/utils/APIUtils'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

import { SendVerificationEmailRequest } from '../../stores/types'

import {
   LogoContainer,
   QuoteContainer,
   QuoteLine,
   TopQuotesIconContainer,
   QuoteText,
   BottomQuotesIconContainer,
   HeadingLabel,
   CardContainer,
   FormContainer
} from '../common/styledComponents'
import MobileLayoutWrapper from '../common'

import {
   Container,
   VerifyEmailContainer,
   EmailSentMessage,
   LeftSection,
   Link,
   ReceiveMailAgain,
   ResendLinkLabel,
   RightSection,
   EmailNotificationContainer,
   SuccessTickContainer,
   SuccessNotificationText,
   CloseButton,
   FailureNotificationText,
   QuoteSection,
   ImageContainer,
   ImageWrapper,
   MobileLayoutHeaderCSS
} from './styledComponents'

// FIXME: Need to fix issue with translations
interface WithTranslationProps {
   i18n: any
   tReady: boolean
   t: any
}

interface VerificationMailSentProps extends WithTranslationProps {
   email: string
   sendVerificationEmailAPI: (
      request: SendVerificationEmailRequest,
      onSuccess: () => void,
      onFailure: () => void
   ) => Promise<void | {}>
   sendVerificationEmailAPIStatus: APIStatus
}

@observer
class VerificationMailSent extends Component<VerificationMailSentProps> {
   @observable shouldShowEmailSentNotification: boolean
   @observable isSendingMailSuccess: boolean

   constructor(props) {
      super(props)
      this.shouldShowEmailSentNotification = false
      this.isSendingMailSuccess = true
   }

   @action
   onSuccessSendVerificationEmailAPI = (): void => {
      this.shouldShowEmailSentNotification = true
      this.isSendingMailSuccess = true
   }

   @action
   onFailureSendVerificationEmailAPI = (): void => {
      this.shouldShowEmailSentNotification = true
      this.isSendingMailSuccess = false
   }

   sendVerificationEmail = (): void => {
      const { sendVerificationEmailAPI, email } = this.props
      if (email) {
         const request = {
            email
         }
         sendVerificationEmailAPI(
            request,
            this.onSuccessSendVerificationEmailAPI,
            this.onFailureSendVerificationEmailAPI
         )
      }
   }

   closeEmailSentNotification = (): void => {
      this.shouldShowEmailSentNotification = false
   }

   renderEmailSentStatusIcon = (): ReactElement =>
      this.isSendingMailSuccess ? (
         <SuccessTickContainer>
            <TickIcon fill={colors.white} width={10} height={10} />
         </SuccessTickContainer>
      ) : (
         <ErrorIcon fill={colors.neonRed} width={18} height={18} />
      )

   renderEmailSentStatusText = (): ReactElement => {
      const { t } = this.props
      return this.isSendingMailSuccess ? (
         <SuccessNotificationText>
            {t('userProfile:verifyEmail.emailSentSuccessMessage')}
         </SuccessNotificationText>
      ) : (
         <FailureNotificationText>
            {t('userProfile:verifyEmail.emailSentFailureMessage')}
         </FailureNotificationText>
      )
   }

   // TODO: Need to update type
   renderEmailSentNotification = observer((): any =>
      this.shouldShowEmailSentNotification ? (
         <EmailNotificationContainer isSuccess={this.isSendingMailSuccess}>
            {this.renderEmailSentStatusIcon()}
            {this.renderEmailSentStatusText()}
            <CloseButton onClick={this.closeEmailSentNotification}>
               <CloseIcon fill={colors.black} />
            </CloseButton>
         </EmailNotificationContainer>
      ) : null
   )

   renderMailSentData = observer(
      (): ReactElement => {
         const { t, email, sendVerificationEmailAPIStatus } = this.props
         return (
            <CardContainer>
               <HeadingLabel>
                  {t('userProfile:verifyEmail.verifyYourEmail')}
               </HeadingLabel>
               <EmailSentMessage>
                  {t('userProfile:verifyEmail.emailSentMessage')}{' '}
                  <Link isDisabled={false}>{email}</Link>
               </EmailSentMessage>
               <ReceiveMailAgain>
                  <ResendLinkLabel>
                     {t('userProfile:verifyEmail.emailNotReceived')}
                  </ResendLinkLabel>{' '}
                  <Link
                     onClick={this.sendVerificationEmail}
                     isDisabled={
                        isAPIFetching(sendVerificationEmailAPIStatus) ||
                        email === ''
                     }
                     data-testid={'resendLinkButton'}
                  >
                     {t('userProfile:verifyEmail.resendLink')}
                  </Link>
               </ReceiveMailAgain>
            </CardContainer>
         )
      }
   )

   render(): ReactElement {
      const {
         renderEmailSentNotification: RenderEmailSentNotification,
         renderMailSentData: RenderMailSentData
      } = this
      const { t } = this.props
      return (
         <>
            {isMobileDevice ? (
               <MobileLayoutWrapper
                  renderBody={RenderMailSentData}
                  headerCSS={MobileLayoutHeaderCSS}
               />
            ) : (
               <Container>
                  <LeftSection>
                     <LogoContainer>
                        <IbHubsVerticalLogoWithTitle />
                     </LogoContainer>
                     <RenderMailSentData />
                     <RenderEmailSentNotification />
                  </LeftSection>
                  <RightSection>
                     <QuoteSection>
                        <QuoteContainer>
                           <QuoteLine>
                              <TopQuotesIconContainer>
                                 <TopQuoteIcon />
                              </TopQuotesIconContainer>
                              <QuoteText>
                                 {t('userProfile:quoteLineOne')}
                              </QuoteText>
                           </QuoteLine>
                           <QuoteLine>
                              <QuoteText>
                                 {t('userProfile:quoteLineTwo')}
                              </QuoteText>
                              <BottomQuotesIconContainer>
                                 {/* TODO: Need to update icon */}
                                 <TopQuoteIcon />
                              </BottomQuotesIconContainer>
                           </QuoteLine>
                        </QuoteContainer>
                     </QuoteSection>
                     {/* TODO: Need to get link from s3 bucket */}
                     <ImageWrapper>
                        <ImageContainer
                           alt={t('userProfile:signUp.productiveImageAlt')}
                           src='https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/ed9d6ab3-c613-457b-b440-6774f3365a75.svg'
                        />
                     </ImageWrapper>
                  </RightSection>
               </Container>
            )}
         </>
      )
   }
}

export default withTranslation()(VerificationMailSent)
