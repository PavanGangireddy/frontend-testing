import React, { Component, ReactElement } from 'react'
import { withTranslation } from 'react-i18next'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { APIStatus } from '@ib/api-constants'

import FilledErrorIcon from '../../../Common/icons/FilledErrorIcon'
import {
   isAPIFetching,
   getAPIErrorMessage
} from '../../../Common/utils/APIUtils'
import { ErrorObjectType } from '../../../Common/stores/types'
import IbHubsVerticalLogoWithTitle from '../../../Common/icons/IbHubsVerticalLogoWithTitle'
import { showFailureBottomCenterToast } from '../../../Common/utils/ToastUtils'
import TopQuoteIcon from '../../../Common/icons/TopQuoteIcon'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

import { validatePhoneOrEmail } from '../../utils/ValidationUtils'
import { SendVerificationEmailRequest } from '../../stores/types'
import { SendVerificationMailRouteErrorObject } from '../../routes/types'

import {
   LogoContainer,
   QuoteContainer,
   TopQuotesIconContainer,
   QuoteLine,
   QuoteText,
   BottomQuotesIconContainer,
   HeadingLabel,
   FormContainer,
   CardContainer
} from '../common/styledComponents'
import MobileLayoutWrapper from '../common'

import { inputType } from './constants'
import {
   VerifyEmailContainer,
   Header,
   ErrorContainer,
   LinkExpired,
   ErrorIconDiv,
   ErrorDataContainer,
   Instruction,
   SubContainer,
   SendText,
   InputContainer,
   Label,
   InputBox,
   SendButton,
   Footer,
   ReturnToLogin,
   Container,
   RightSection,
   QuoteSection,
   LeftSection,
   ImageContainer,
   ImageWrapper,
   ErrorWrapper
} from './styledComponents'

//FIXME: need to fix this issue in i18next
interface WithTranslationProps {
   i18n: any
   tReady: boolean
   t: any
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface VerifyEmailFormProps extends WithTranslationProps {
   goToLoginPage: () => void
   goToVerificationMailSentPage: (email: string) => void
   sendVerificationMailAPI: (
      request: SendVerificationEmailRequest,
      onSuccess: () => void,
      onFailure: () => void
   ) => void
   sendVerificationMailAPIStatus: APIStatus
   // TODO: Need to add type
   sendVerificationMailAPIError: any
   error: SendVerificationMailRouteErrorObject | null
}

@observer
class VerifyEmailForm extends Component<VerifyEmailFormProps> {
   @observable email: string
   @observable isInValidEmail: boolean
   emailRef

   constructor(props) {
      super(props)
      this.email = ''
      this.isInValidEmail = false
      this.emailRef = React.createRef()
   }

   setIsInValidEmail = (value: boolean): void => {
      this.isInValidEmail = value
   }

   validateEmail = (): ErrorObjectType => validatePhoneOrEmail(this.email)

   @action
   onChangeEmail = (event): void => {
      this.email = event.target.value
      this.setIsInValidEmail(this.validateEmail().shouldShowError)
   }

   onKeyDownEmail = (event): void => {
      if (event.charCode === 13) this.sendVerificationMail(event)
   }

   renderEmailField = (): React.ReactNode => {
      const { t } = this.props
      return (
         <InputContainer>
            <Label as='label' for='email'>
               {t('userProfile:linkExpiredForm.email')}
            </Label>
            {/* TODO: need to disable default  popup for email input in chrome browser when type email is given */}
            <InputBox
               testId={'verifyMailEmailInput'}
               ref={this.emailRef}
               defaultValue={this.email}
               onKeyDown={this.onKeyDownEmail}
               onChange={this.onChangeEmail}
               type={inputType.text}
               validate={this.validateEmail}
               placeholder={t('userProfile:linkExpiredForm.emailPlaceholder')}
            />
         </InputContainer>
      )
   }

   onSuccessSendEmailAPI = (): void => {
      const { goToVerificationMailSentPage } = this.props
      goToVerificationMailSentPage(this.email)
   }

   onFailureSendEmailAPI = (): void => {
      const { sendVerificationMailAPIError } = this.props
      showFailureBottomCenterToast(
         getAPIErrorMessage(sendVerificationMailAPIError)
      )
   }

   isReadyToSendEmail = (): boolean => !this.emailRef.current?.isError

   sendVerificationMail = (event): void => {
      event.preventDefault()
      this.emailRef.current?.validateInput()
      if (this.isReadyToSendEmail()) {
         const { sendVerificationMailAPI } = this.props
         const request = {
            email: this.email
         }
         sendVerificationMailAPI(
            request,
            this.onSuccessSendEmailAPI,
            this.onFailureSendEmailAPI
         )
      }
   }

   renderLinkExpiredError = (): React.ReactNode => {
      const { error } = this.props
      return error ? (
         <>
            <ErrorWrapper>
               <ErrorContainer>
                  <ErrorIconDiv>
                     <FilledErrorIcon />
                  </ErrorIconDiv>
                  <ErrorDataContainer>
                     {error.title ? (
                        <LinkExpired>{error.title}</LinkExpired>
                     ) : null}
                     <Instruction>{error.label}</Instruction>
                  </ErrorDataContainer>
               </ErrorContainer>
            </ErrorWrapper>
         </>
      ) : null
   }

   renderLogoAndTitle = (): React.ReactNode => {
      const { t } = this.props
      return (
         <>
            <HeadingLabel as='h1'>
               {t('userProfile:verifyEmailForm.sendVerificationEmail')}
            </HeadingLabel>
         </>
      )
   }

   renderSendButton = (): React.ReactNode => {
      const { t, sendVerificationMailAPIStatus } = this.props
      //TODO: button loader should be visible when integrating
      return (
         <SendButton
            onClick={this.sendVerificationMail}
            isLoading={isAPIFetching(sendVerificationMailAPIStatus)}
            id={'sendEmailButton'}
         >
            <SendText>{t('userProfile:linkExpiredForm.send')}</SendText>
         </SendButton>
      )
   }

   renderFooter = (): React.ReactNode => {
      const { t, goToLoginPage } = this.props
      return (
         //TODO: need to navigate to login  page it will implemented in further story
         <Footer>
            <ReturnToLogin
               as='a'
               onClick={goToLoginPage}
               data-testid={'redirectToLoginButton'}
            >
               {t('userProfile:linkExpiredForm.returnToLogin')}
            </ReturnToLogin>
         </Footer>
      )
   }

   renderForm = observer(
      (): ReactElement => (
         <SubContainer>
            <CardContainer>
               {this.renderLogoAndTitle()}
               <FormContainer onSubmit={this.sendVerificationMail}>
                  {this.renderEmailField()}
                  {this.renderSendButton()}
               </FormContainer>
               {this.renderFooter()}
            </CardContainer>
         </SubContainer>
      )
   )

   render(): React.ReactNode {
      const {
         renderForm: RenderForm,
         props: { t },
         renderForm,
         renderLinkExpiredError
      } = this
      return (
         <>
            {isMobileDevice ? (
               <MobileLayoutWrapper
                  imageURL='https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/bcdbbc84-3472-4adb-96f4-f443782ba182.png'
                  renderBody={renderForm}
                  renderFooter={renderLinkExpiredError()}
               />
            ) : (
               <VerifyEmailContainer>
                  <LeftSection>
                     <LogoContainer>
                        <IbHubsVerticalLogoWithTitle />
                     </LogoContainer>

                     <Container>
                        <Header>{this.renderLinkExpiredError()}</Header>
                        <RenderForm />
                     </Container>
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
                                 <TopQuoteIcon />
                              </BottomQuotesIconContainer>
                           </QuoteLine>
                        </QuoteContainer>
                     </QuoteSection>
                     <ImageWrapper>
                        <ImageContainer
                           //FIXME: need to get link from S3 bucket and add it to common/images folder
                           src={
                              'https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/6575f9bd-b891-4fdf-93ef-4a14823ea11b.svg'
                           }
                           alt={t(
                              'userProfile:linkExpiredForm.linkExpiredImage'
                           )}
                        />
                     </ImageWrapper>
                  </RightSection>
               </VerifyEmailContainer>
            )}
         </>
      )
   }
}

export default withTranslation()(VerifyEmailForm)
