import React, { Component, ReactElement } from 'react'
import { withTranslation } from 'react-i18next'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { APIStatus } from '@ib/api-constants'

import { isAPIFetching, displayApiError } from '../../../Common/utils/APIUtils'
import { ErrorObjectType } from '../../../Common/stores/types'
import IbHubsVerticalLogoWithTitle from '../../../Common/icons/IbHubsVerticalLogoWithTitle'
import TopQuoteIcon from '../../../Common/icons/TopQuoteIcon'
import { showFailureBottomCenterToast } from '../../../Common/utils/ToastUtils'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

import { SendEmailAPIRequest } from '../../stores/types'
import { validatePhoneOrEmail } from '../../utils/ValidationUtils'

import {
   LogoContainer,
   QuoteContainer,
   QuoteLine,
   TopQuotesIconContainer,
   QuoteText,
   BottomQuotesIconContainer,
   DisplayOnlyInMobile,
   DisplayOtherThanMobile,
   CardContainer,
   HeadingLabel,
   FormContainer
} from '../common/styledComponents'
import MobileLayoutWrapper from '../common'

import { inputType } from './constants'
import {
   ForgotPasswordContainer,
   SubContainer,
   Instruction,
   SendText,
   InputContainer,
   Label,
   InputBox,
   SendButton,
   Footer,
   ReturnToLogin,
   LeftSection,
   RightSection,
   QuoteSection,
   ImageContainer,
   ImageWrapper
} from './styledComponents'

interface WithTransalationProps {
   i18n: any
   tReady: boolean
   t: any
}

interface ForgotPasswordFormProps extends WithTransalationProps {
   sendEmailAPI: (
      request: SendEmailAPIRequest,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) => void
   sendEmailAPIStatus: APIStatus
   onSuccessSendEmailAPI: () => void
   onClickReturnToLogin: () => void
}

@observer
class ForgotPasswordForm extends Component<ForgotPasswordFormProps> {
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
      if (event.charCode === 13) this.onClickSend(event)
   }

   renderEmailField = observer(() => {
      const { t } = this.props
      return (
         <InputContainer>
            <Label as='label' for='email'>
               {t('userProfile:forgotPasswordForm.email')}
            </Label>
            {/* TODO: need to disable default  popup for email input in chrome browser when type email is given */}
            <InputBox
               testId={'forgotPasswordEmail'}
               ref={this.emailRef}
               defaultValue={this.email}
               onKeyDown={this.onKeyDownEmail}
               onChange={this.onChangeEmail}
               type={inputType.text}
               validate={this.validateEmail}
               placeholder={t(
                  'userProfile:forgotPasswordForm.emailPlaceholder'
               )}
            />
         </InputContainer>
      )
   })

   onSuccessSendEmailAPI = (): void => {
      const { onSuccessSendEmailAPI } = this.props
      onSuccessSendEmailAPI()
   }

   onFailureSendEmailAPI = error => {
      //TODO: need to parse Error while Integrating

      const errorMessage = displayApiError(error).description
      const statusCode = displayApiError(error).errorCode

      showFailureBottomCenterToast(errorMessage)

      if (statusCode === 404)
         this.emailRef.current?.inputRef.current?.setError(errorMessage)
   }

   isReadyToSendEmail = (): boolean => !this.emailRef.current?.isError

   onClickSend = event => {
      event.preventDefault()
      this.emailRef.current?.validateInput()
      if (this.isReadyToSendEmail()) {
         const request = {
            email: this.email.trim()
         }
         const { sendEmailAPI } = this.props
         sendEmailAPI(
            request,
            this.onSuccessSendEmailAPI,
            this.onFailureSendEmailAPI
         )
      }
   }

   renderLogoAndTitleWithInstruction = (): React.ReactNode => {
      const { t } = this.props
      return (
         <>
            <HeadingLabel as='h1'>
               {t('userProfile:forgotPasswordForm.forgotPassword')}
            </HeadingLabel>
            <Instruction as='p'>
               {t('userProfile:forgotPasswordForm.instruction')}
            </Instruction>
         </>
      )
   }

   renderSendButton = (): React.ReactNode => {
      const { t, sendEmailAPIStatus } = this.props
      //TODO: button loader should be visible when integrating
      return (
         <SendButton
            onClick={this.onClickSend}
            isLoading={isAPIFetching(sendEmailAPIStatus)}
            id={'sendEmailButton'}
         >
            <SendText>{t('userProfile:forgotPasswordForm.send')}</SendText>
         </SendButton>
      )
   }

   renderFooter = (): React.ReactNode => {
      const { t, onClickReturnToLogin } = this.props
      return (
         //TODO: need to navigate to login  page it will implemented in further story
         <Footer>
            <ReturnToLogin
               as='a'
               onClick={onClickReturnToLogin}
               data-testid='redirectToLoginButton'
            >
               {t('userProfile:forgotPasswordForm.returnToLogin')}
            </ReturnToLogin>
         </Footer>
      )
   }

   renderForm = observer(
      (): ReactElement => {
         const { renderEmailField: RenderEmailField } = this
         return (
            <SubContainer>
               <CardContainer>
                  {this.renderLogoAndTitleWithInstruction()}
                  <FormContainer onSubmit={this.onClickSend}>
                     <RenderEmailField />
                     {this.renderSendButton()}
                  </FormContainer>
                  {this.renderFooter()}
               </CardContainer>
            </SubContainer>
         )
      }
   )

   render(): React.ReactNode {
      const { t } = this.props
      const { renderForm: RenderForm, renderForm } = this
      return (
         <>
            {isMobileDevice ? (
               <MobileLayoutWrapper
                  imageURL='https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/bcdbbc84-3472-4adb-96f4-f443782ba182.png'
                  renderBody={renderForm}
               />
            ) : (
               <ForgotPasswordContainer>
                  <LeftSection>
                     <LogoContainer>
                        <IbHubsVerticalLogoWithTitle />
                     </LogoContainer>
                     <RenderForm />
                  </LeftSection>
                  <RightSection>
                     <QuoteSection>
                        <QuoteContainer>
                           <QuoteLine>
                              <TopQuotesIconContainer>
                                 <TopQuoteIcon />
                              </TopQuotesIconContainer>
                              <QuoteText>
                                 {t('userProfile:quote.focusOnBeingProductive')}
                              </QuoteText>
                           </QuoteLine>
                           <QuoteLine>
                              <QuoteText>
                                 {t('userProfile:quote.insteadOfBusy')}
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
                              'https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/efedd65b-a861-40ca-9f50-299757b91e69.svg'
                           }
                           alt={t('userProfile:loginForm.loginImage')}
                        />
                     </ImageWrapper>
                  </RightSection>
               </ForgotPasswordContainer>
            )}
         </>
      )
   }
}

export default withTranslation()(ForgotPasswordForm)
