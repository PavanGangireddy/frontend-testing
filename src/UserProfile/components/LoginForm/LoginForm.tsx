import React, { Component, ReactElement } from 'react'
import { withTranslation } from 'react-i18next'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { APIStatus } from '@ib/api-constants'

//TODO: need to use while parsing error
import { displayApiError, isAPIFetching } from '../../../Common/utils/APIUtils'
import { ErrorObjectType } from '../../../Common/stores/types'
import IbHubsVerticalLogoWithTitle from '../../../Common/icons/IbHubsVerticalLogoWithTitle'
import TopQuoteIcon from '../../../Common/icons/TopQuoteIcon'
import { showFailureBottomCenterToast } from '../../../Common/utils/ToastUtils'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

import { VerifyLoginAPIRequest } from '../../stores/types'
import {
   validatePhoneOrEmail,
   validatePassword
} from '../../utils/ValidationUtils'
import { EMAIL_NOT_VERIFIED } from '../../constants/ResContants'

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

import { inputFieldTypes, INTERNET_ERROR } from './constants'
import {
   LoginFormContainer,
   SubContainer,
   ButtonTextTypo,
   InputContainer,
   Label,
   InputBox,
   LoginButton,
   Footer,
   ForgotPassword,
   LeftSection,
   RightSection,
   QuoteSection,
   SignUpLinkLabelText,
   SignUpLink,
   ImageContainer,
   ImageWrapper
} from './styledComponents'

//FIXME: need to fix the WithTranslation in i18n-next , so instead of that we use WithTranslationProps here

interface WithTranslationProps {
   i18n: any
   tReady: boolean
   t: any
}

//TODO: need to me in to API constants
export const apiConstants = {
   emailError: 404,
   passwordError: 400
}

interface LoginFormProps extends WithTranslationProps {
   // TODO: need to be commented
   verifyLoginAPI: (
      request: VerifyLoginAPIRequest,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) => void
   verifyLoginAPIStatus: APIStatus
   onSuccessVerifyLoginAPI: () => void
   onClickForgotPassword: () => void
   goToSendVerificationMailPage: (errorMessage: string) => void
   goToSignUpPage: () => void
}

interface InputHandlerProps {
   labelFor: string
   labelText: string
   testId: string
   defaultValue: string
   onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
   validateInput: () => any
   type: string
   placeholderText: string
}

const InputHandler = React.forwardRef((props: InputHandlerProps, ref) => {
   const {
      labelFor,
      labelText,
      testId,
      defaultValue,
      type,
      placeholderText,
      onKeyDown,
      validateInput,
      onChange
   } = props
   return (
      <InputContainer>
         <Label as='label' for={labelFor}>
            {labelText}
         </Label>
         {/* TODO: need to add error icon in common component input  */}
         <InputBox
            testId={testId}
            ref={ref}
            defaultValue={defaultValue}
            onKeyDown={onKeyDown}
            onChange={onChange}
            type={type}
            validate={validateInput}
            placeholder={placeholderText}
         />
      </InputContainer>
   )
})

// FIXME: Component definition is missing display name  react/display-name
InputHandler.displayName = 'inputHandler'

@observer
class LoginForm extends Component<LoginFormProps> {
   @observable email: string
   @observable isInValidEmail: boolean
   @observable password: string
   @observable isInValidPassword: boolean
   emailRef
   passwordRef
   loginButtonRef

   constructor(props) {
      super(props)
      this.email = ''
      this.password = ''
      this.isInValidEmail = true
      this.isInValidPassword = true
      this.emailRef = React.createRef()
      this.passwordRef = React.createRef()
      this.loginButtonRef = React.createRef()
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

   onKeyDownEmail = (event: any): void => {
      if (event.keyCode === 13) this.passwordRef.current?.focus()
   }

   setIsInValidPassword = (value: boolean): void => {
      this.isInValidPassword = value
   }

   validatePassword = (): ErrorObjectType => validatePassword(this.password)

   @action
   onChangePassword = (event): void => {
      this.password = event.target.value
      this.setIsInValidPassword(this.validatePassword().shouldShowError)
   }

   onKeyDownPassword = (event: any): void => {
      if (event.keyCode === 13) this.onClickLogin(event)
   }

   renderLogoAndTitle = (): React.ReactNode => {
      const { t } = this.props
      return (
         <>
            <HeadingLabel as='h1'>
               {t('userProfile:loginForm.hiTherePleaseLogin')}
            </HeadingLabel>
         </>
      )
   }

   renderFields = (): React.ReactNode => {
      const { t } = this.props
      return (
         <>
            <InputHandler
               labelText={t('userProfile:loginForm.email')}
               labelFor={'email'}
               testId={'loginEmailInput'}
               ref={this.emailRef}
               defaultValue={this.email}
               onChange={this.onChangeEmail}
               onKeyDown={this.onKeyDownEmail}
               type={inputFieldTypes.text}
               validateInput={this.validateEmail}
               placeholderText={t('userProfile:loginForm.emailPlaceholder')}
            />
            {/* TODO: need confirmation with Content team whether password place holder is there or not */}
            <InputHandler
               labelText={t('userProfile:loginForm.password')}
               labelFor={'password'}
               testId={'loginPasswordInput'}
               ref={this.passwordRef}
               defaultValue={this.password}
               onChange={this.onChangePassword}
               onKeyDown={this.onKeyDownPassword}
               validateInput={this.validatePassword}
               type={inputFieldTypes.password}
               placeholderText={t('userProfile:loginForm.passwordPlaceholder')}
            />
         </>
      )
   }

   getRequestObject = (): VerifyLoginAPIRequest => {
      const request = {
         email: this.email.trim(),
         password: this.password.trim()
      }
      return request
   }

   isReadyToLogin = (): boolean =>
      !(this.emailRef.current?.isError || this.passwordRef.current?.isError)

   onSuccessVerifyLoginAPI = () => {
      const { onSuccessVerifyLoginAPI } = this.props
      onSuccessVerifyLoginAPI()
   }

   setAppropriateAPIError = (
      statusCode: number,
      errorMessage: string
   ): void => {
      switch (statusCode) {
         case apiConstants.emailError:
            this.emailRef.current?.inputRef.current?.setError(errorMessage)
            break
         case apiConstants.passwordError:
            this.passwordRef.current?.inputRef.current?.setError(errorMessage)
            break
      }
   }

   onFailureVerifyLoginAPI = error => {
      const errorMessage = displayApiError(error).description
      const {
         data: { res_status: resStatus }
      } = JSON.parse(error)
      const { goToSendVerificationMailPage } = this.props
      const statusCode = displayApiError(error).errorCode
      if (statusCode === INTERNET_ERROR)
         showFailureBottomCenterToast(errorMessage)
      else if (resStatus === EMAIL_NOT_VERIFIED) {
         goToSendVerificationMailPage(errorMessage)
      } else {
         this.setAppropriateAPIError(statusCode, errorMessage)
      }
   }

   showValidationErrors = () => {
      this.emailRef.current?.validateInput()
      this.passwordRef.current?.validateInput()
   }

   onClickLogin = (event): void => {
      event.preventDefault()
      this.showValidationErrors()
      if (this.isReadyToLogin()) {
         const request = this.getRequestObject()
         const { verifyLoginAPI } = this.props
         // TODO: need to be commented
         verifyLoginAPI(
            request,
            this.onSuccessVerifyLoginAPI,
            this.onFailureVerifyLoginAPI
         )
      }
   }

   renderLoginButton = (): React.ReactNode => {
      const { t, verifyLoginAPIStatus } = this.props
      // TODO: we have to change the styling for the button common component
      return (
         <LoginButton
            isLoading={isAPIFetching(verifyLoginAPIStatus)}
            type={inputFieldTypes.submit}
            id={'loginSubmitButton'}
         >
            <ButtonTextTypo>{t('userProfile:loginForm.login')}</ButtonTextTypo>
         </LoginButton>
      )
   }

   renderFooter = (): React.ReactNode => {
      const { t, onClickForgotPassword, goToSignUpPage } = this.props
      return (
         //TODO: need to navigate to reset password page it will implemented in further story
         <Footer>
            <ForgotPassword
               as='a'
               onClick={onClickForgotPassword}
               data-testid={'forgotPasswordButton'}
            >
               {t('userProfile:loginForm.forgotPassword')}
            </ForgotPassword>
            <SignUpLinkLabelText>
               {t('userProfile:loginForm.singUpLinkLabel')}{' '}
               <SignUpLink
                  onClick={goToSignUpPage}
                  data-testid={'signUpButton'}
               >
                  {t('userProfile:loginForm.signUpHere')}
               </SignUpLink>
            </SignUpLinkLabelText>
         </Footer>
      )
   }

   renderForm = observer(
      (): ReactElement => (
         <SubContainer>
            <CardContainer>
               {this.renderLogoAndTitle()}
               <FormContainer onSubmit={this.onClickLogin}>
                  {this.renderFields()}
                  {this.renderLoginButton()}
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
         renderForm
      } = this
      return (
         <>
            {isMobileDevice ? (
               <MobileLayoutWrapper
                  imageURL='https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/bcdbbc84-3472-4adb-96f4-f443782ba182.png'
                  renderBody={renderForm}
               />
            ) : (
               <LoginFormContainer>
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
               </LoginFormContainer>
            )}
         </>
      )
   }
}

export default withTranslation()(LoginForm)
