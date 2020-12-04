import React, { Component, ReactNode, ReactElement } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'
import { APIStatus } from '@ib/api-constants'

import { statusCodes } from '../../../Common/constants/APIErrorConstants'
import IbHubsVerticalLogoWithTitle from '../../../Common/icons/IbHubsVerticalLogoWithTitle'
import { ValidationResponseType } from '../../../Common/stores/types'
import ErrorIcon from '../../../Common/icons/ErrorIcon'
import colors from '../../../Common/themes/Colors'
import { isEmpty } from '../../../Common/utils/ValidationUtils'
import TopQuoteIcon from '../../../Common/icons/TopQuoteIcon'
import { isAPIFetching, displayApiError } from '../../../Common/utils/APIUtils'
import { showFailureBottomCenterToast } from '../../../Common/utils/ToastUtils'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

import {
   INVALID_DOMAIN,
   ACCOUNT_ALREADY_EXISTS
} from '../../constants/ResContants'
import {
   validateName,
   validatePhoneOrEmail,
   validatePassword
} from '../../utils/ValidationUtils'

import {
   LogoContainer,
   TopQuotesIconContainer,
   QuoteContainer,
   BottomQuotesIconContainer,
   QuoteText,
   QuoteLine,
   DisplayOnlyInMobile,
   DisplayOtherThanMobile,
   HeadingLabel,
   FormContainer
} from '../common/styledComponents'
import MobileLayoutWrapper from '../common'
import { inputFieldTypes } from '../LoginForm/constants'

import {
   SignUpContainer,
   LeftSection,
   RightSection,
   SignUpFormContainer,
   InputFieldWithLabelContainer,
   InputFieldLabel,
   InputField,
   CreateAccountButton,
   CreateAccountButtonText,
   LoginLink,
   AlreadyHaveAnAccountText,
   ErrorIconContainer,
   InputFieldWithErrorIcon,
   ImageContainer,
   QuoteSection,
   ImageWrapper,
   MobileLayoutHeaderCSS,
   SignUpCardContainer
} from './styledComponents'

// FIXME: Need to fix issue with translations
interface WithTranslationProps {
   i18n: any
   tReady: boolean
   t: any
}

interface SignUpProps extends WithTranslationProps {
   onClickLoginButton: () => void
   onSubmitSignUpForm: (
      fullName: string,
      email: string,
      password: string,
      onSignUpAPIFailure: (error: any) => void
   ) => void
   signUpAPIStatus: APIStatus
}

@observer
class SignUp extends Component<SignUpProps> {
   @observable fullName!: string
   @observable email!: string
   @observable password!: string
   @observable confirmPassword!: string
   @observable isFullNameInvalid!: boolean
   @observable isEmailInvalid!: boolean
   @observable isPasswordInvalid!: boolean
   @observable isConfirmPasswordInvalid!: boolean
   // TODO: Need to add types
   fullNameRef
   emailRef
   passwordRef
   confirmPasswordRef

   constructor(props) {
      super(props)
      this.initForm()
      this.initFormErrors()
      this.fullNameRef = React.createRef()
      this.emailRef = React.createRef()
      this.passwordRef = React.createRef()
      this.confirmPasswordRef = React.createRef()
   }

   initForm = (): void => {
      this.fullName = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
   }

   initFormErrors = (): void => {
      this.isFullNameInvalid = false
      this.isEmailInvalid = false
      this.isPasswordInvalid = false
      this.isConfirmPasswordInvalid = false
   }

   onChangeFullName = (event: React.ChangeEvent<HTMLInputElement>): void => {
      this.fullName = event.target.value
   }

   validateFullName = (): ValidationResponseType => {
      const fullNameError = validateName(this.fullName)
      const { shouldShowError } = fullNameError
      this.isFullNameInvalid = shouldShowError
      return fullNameError
   }

   onFocusFullNameInputField = (): void => {
      this.isFullNameInvalid = false
      if (this.fullNameRef) {
         this.fullNameRef.current.inputRef.current.onFocus()
      }
   }

   setFullNameEmptyErrorMessage = (): void => {
      const { t } = this.props
      this.fullNameRef.current.inputRef.current.setError(
         t('userProfile:signUp.required')
      )
   }

   onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
      this.email = event.target.value
   }

   validateEmail = (): ValidationResponseType => {
      const emailError = validatePhoneOrEmail(this.email)
      const { shouldShowError } = emailError
      this.isEmailInvalid = shouldShowError
      return emailError
   }

   onFocusEmailInputField = (): void => {
      this.isEmailInvalid = false
      if (this.emailRef) {
         this.emailRef.current.inputRef.current.onFocus()
      }
   }

   setEmailEmptyErrorMessage = (): void => {
      const { t } = this.props
      this.emailRef.current.inputRef.current.setError(
         t('userProfile:signUp.required')
      )
   }

   onChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
      this.password = event.target.value.trim()
   }

   validatePassword = (): ValidationResponseType => {
      const passwordError = validatePassword(this.password)
      const { shouldShowError } = passwordError
      this.isPasswordInvalid = shouldShowError
      return passwordError
   }

   onFocusPasswordInputField = (): void => {
      this.isPasswordInvalid = false
      if (this.passwordRef) {
         this.passwordRef.current.inputRef.current.onFocus()
      }
   }

   setPasswordEmptyErrorMessage = (): void => {
      const { t } = this.props
      this.passwordRef.current.inputRef.current.setError(
         t('userProfile:signUp.required')
      )
   }

   onChangeConfirmPassword = (
      event: React.ChangeEvent<HTMLInputElement>
   ): void => {
      this.confirmPassword = event.target.value.trim()
      this.validateConfirmPassword()
   }

   validateConfirmPassword = (): ValidationResponseType => {
      const { t } = this.props
      if (isEmpty(this.confirmPassword)) {
         this.isConfirmPasswordInvalid = true
         return {
            shouldShowError: true,
            errorMessage: t('userProfile:signUp.required')
         }
      }
      if (this.password !== this.confirmPassword) {
         this.isConfirmPasswordInvalid = true
         this.confirmPasswordRef.current.inputRef.current.setError(
            t('userProfile:signUp.passwordsNotMatch')
         )
         return {
            shouldShowError: true,
            errorMessage: t('userProfile:signUp.passwordsNotMatch')
         }
      }
      this.isConfirmPasswordInvalid = false
      this.confirmPasswordRef.current.inputRef.current.setError('')
      return { shouldShowError: false, errorMessage: '' }
   }

   onFocusConfirmPasswordInputField = (): void => {
      this.isConfirmPasswordInvalid = false
      if (this.confirmPasswordRef) {
         this.confirmPasswordRef.current.inputRef.current.onFocus()
      }
   }

   setConfirmPasswordEmptyErrorMessage = (): void => {
      const { t } = this.props
      this.confirmPasswordRef.current.inputRef.current.setError(
         t('userProfile:signUp.required')
      )
   }

   renderFullNameInputField = observer(
      (): ReactElement => {
         const { t } = this.props
         return (
            <InputFieldWithErrorIcon>
               <InputField
                  value={this.fullName}
                  onChange={this.onChangeFullName}
                  placeholder={t('userProfile:signUp.enterFullName')}
                  type={inputFieldTypes.text}
                  ref={this.fullNameRef}
                  validate={this.validateFullName}
                  isError={this.isFullNameInvalid}
                  onFocus={this.onFocusFullNameInputField}
                  testId={'fullNameInput'}
               />
               {this.renderErrorIcon(this.isFullNameInvalid)}
            </InputFieldWithErrorIcon>
         )
      }
   )

   renderEmailInputField = observer(
      (): ReactElement => {
         const { t } = this.props
         return (
            <InputFieldWithErrorIcon>
               <InputField
                  value={this.email}
                  onChange={this.onChangeEmail}
                  placeholder={t('userProfile:signUp.enterEmail')}
                  type={inputFieldTypes.text}
                  ref={this.emailRef}
                  validate={this.validateEmail}
                  isError={this.isEmailInvalid}
                  onFocus={this.onFocusEmailInputField}
                  testId={'signUpEmail'}
               />
               {this.renderErrorIcon(this.isEmailInvalid)}
            </InputFieldWithErrorIcon>
         )
      }
   )

   renderPasswordInputField = observer(
      (): ReactElement => {
         const { t } = this.props
         return (
            <InputFieldWithErrorIcon>
               <InputField
                  value={this.password}
                  onChange={this.onChangePassword}
                  placeholder={t('userProfile:signUp.enterPassword')}
                  type={inputFieldTypes.password}
                  ref={this.passwordRef}
                  validate={this.validatePassword}
                  isError={this.isPasswordInvalid}
                  onFocus={this.onFocusPasswordInputField}
                  testId={'passwordInput'}
               />
               {this.renderErrorIcon(this.isPasswordInvalid)}
            </InputFieldWithErrorIcon>
         )
      }
   )

   renderConfirmPasswordInputField = observer(
      (): ReactElement => {
         const { t } = this.props
         return (
            <InputFieldWithErrorIcon>
               <InputField
                  value={this.confirmPassword}
                  onChange={this.onChangeConfirmPassword}
                  placeholder={t('userProfile:signUp.reEnterThePassword')}
                  type={inputFieldTypes.password}
                  ref={this.confirmPasswordRef}
                  validate={this.validateConfirmPassword}
                  isError={this.isConfirmPasswordInvalid}
                  onFocus={this.onFocusConfirmPasswordInputField}
                  testId={'confirmPasswordInput'}
               />
               {this.renderErrorIcon(this.isConfirmPasswordInvalid)}
            </InputFieldWithErrorIcon>
         )
      }
   )

   renderErrorIcon = (shouldShowErrorIcon: boolean): ReactNode =>
      shouldShowErrorIcon ? (
         <ErrorIconContainer>
            <ErrorIcon fill={colors.neonRed} />
         </ErrorIconContainer>
      ) : null

   get isSignUpFormValid(): boolean {
      const isFullNameEmpty = isEmpty(this.fullName),
         isEmailEmpty = isEmpty(this.email),
         isPasswordEmpty = isEmpty(this.password),
         isConfirmPasswordEmpty = isEmpty(this.confirmPassword)
      if (
         isFullNameEmpty ||
         isEmailEmpty ||
         isPasswordEmpty ||
         isConfirmPasswordEmpty
      ) {
         if (isFullNameEmpty) {
            this.setFullNameEmptyErrorMessage()
         }
         if (isEmailEmpty) {
            this.setEmailEmptyErrorMessage()
         }
         if (isPasswordEmpty) {
            this.setPasswordEmptyErrorMessage()
         }
         if (isConfirmPasswordEmpty) {
            this.setConfirmPasswordEmptyErrorMessage()
         }
         return false
      }
      if (
         !this.isFullNameInvalid &&
         !this.isEmailInvalid &&
         !this.isPasswordInvalid &&
         !this.isConfirmPasswordInvalid
      ) {
         return true
      }
      return false
   }

   onFailureSignUp = error => {
      const { description: errorMessage, errorCode } = displayApiError(error)
      const {
         data: { res_status: resStatus }
      } = JSON.parse(error)
      if (resStatus === INVALID_DOMAIN || resStatus === ACCOUNT_ALREADY_EXISTS)
         this.emailRef.current?.inputRef.current?.setError(errorMessage)
      else if (errorCode === statusCodes.badRequestErrorCode)
         this.passwordRef.current?.inputRef.current?.setError(errorMessage)
      else showFailureBottomCenterToast(errorMessage)
   }

   // TODO: Need to add type
   submitSignUpForm = (event): void => {
      event.preventDefault()
      if (this.isSignUpFormValid) {
         this.validateConfirmPassword()
         if (!this.isConfirmPasswordInvalid) {
            const { onSubmitSignUpForm } = this.props
            onSubmitSignUpForm(
               this.fullName,
               this.email,
               this.password,
               this.onFailureSignUp
            )
         }
      } else {
         this.validateFullName()
         this.validateEmail()
         this.validatePassword()
         this.validateConfirmPassword()
      }
   }

   renderForm = observer(
      (): ReactElement => {
         const {
            renderFullNameInputField: RenderFullNameInputField,
            renderEmailInputField: RenderEmailInputField,
            renderPasswordInputField: RenderPasswordInputField,
            renderConfirmPasswordInputField: RenderConfirmPasswordInputField,
            props: { t, onClickLoginButton, signUpAPIStatus }
         } = this
         return (
            <SignUpCardContainer>
               <HeadingLabel>{t('userProfile:signUp.signUp')}</HeadingLabel>
               <FormContainer onSubmit={this.submitSignUpForm}>
                  <InputFieldWithLabelContainer>
                     <InputFieldLabel>
                        {t('userProfile:signUp.fullName')}
                     </InputFieldLabel>
                     <RenderFullNameInputField />
                  </InputFieldWithLabelContainer>
                  <InputFieldWithLabelContainer>
                     <InputFieldLabel>
                        {t('userProfile:loginForm.email')}
                     </InputFieldLabel>
                     <RenderEmailInputField />
                  </InputFieldWithLabelContainer>
                  <InputFieldWithLabelContainer>
                     <InputFieldLabel>
                        {t('userProfile:loginForm.password')}
                     </InputFieldLabel>
                     <RenderPasswordInputField />
                  </InputFieldWithLabelContainer>
                  <InputFieldWithLabelContainer>
                     <InputFieldLabel>
                        {t('userProfile:signUp.confirmPassword')}
                     </InputFieldLabel>
                     <RenderConfirmPasswordInputField />
                  </InputFieldWithLabelContainer>
                  <CreateAccountButton
                     onClick={this.submitSignUpForm}
                     isLoading={isAPIFetching(signUpAPIStatus)}
                     id={'createAccountButton'}
                  >
                     <CreateAccountButtonText>
                        {t('userProfile:signUp.createAccount')}
                     </CreateAccountButtonText>
                  </CreateAccountButton>
                  <AlreadyHaveAnAccountText>
                     {t('userProfile:signUp.alreadyHaveAnAccount')}{' '}
                     <LoginLink
                        onClick={onClickLoginButton}
                        data-testid={'redirectToLoginButton'}
                     >
                        {t('userProfile:loginForm.login')}
                     </LoginLink>
                  </AlreadyHaveAnAccountText>
               </FormContainer>
            </SignUpCardContainer>
         )
      }
   )

   render(): ReactNode {
      const { renderForm, renderForm: RenderForm } = this
      const { t } = this.props
      return (
         <>
            {isMobileDevice ? (
               <MobileLayoutWrapper
                  headerCSS={MobileLayoutHeaderCSS}
                  renderBody={renderForm}
               />
            ) : (
               <SignUpContainer>
                  <LeftSection>
                     <LogoContainer>
                        <IbHubsVerticalLogoWithTitle />
                     </LogoContainer>
                     {/* TODO: Need to separate form into a functional component */}
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
               </SignUpContainer>
            )}
         </>
      )
   }
}

export default withTranslation()(SignUp)
