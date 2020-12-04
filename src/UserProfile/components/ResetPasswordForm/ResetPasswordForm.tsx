import React, { Component, ReactElement } from 'react'
import { withTranslation } from 'react-i18next'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { APIStatus } from '@ib/api-constants'

import { ErrorObjectType } from '../../../Common/stores/types'
import IbHubsVerticalLogoWithTitle from '../../../Common/icons/IbHubsVerticalLogoWithTitle'
import TopQuoteIcon from '../../../Common/icons/TopQuoteIcon'
//TODO: need to use while parsing error
import { isAPIFetching } from '../../../Common/utils/APIUtils'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

import { UpdatePasswordAPIRequest } from '../../stores/types'
import { validatePassword } from '../../utils/ValidationUtils'

import {
   LogoContainer,
   QuoteContainer,
   QuoteLine,
   TopQuotesIconContainer,
   QuoteText,
   BottomQuotesIconContainer,
   DisplayOnlyInMobile,
   DisplayOtherThanMobile,
   HeadingLabel,
   FormContainer,
   CardContainer
} from '../common/styledComponents'
import MobileLayoutWrapper from '../common'

import { inputFieldTypes } from './constants'
import {
   LoginFormContainer,
   SubContainer,
   ButtonTextTypo,
   InputContainer,
   Label,
   InputBox,
   UpdatePasswordButton,
   Footer,
   ReturnToLogin,
   LeftSection,
   RightSection,
   QuoteSection,
   ResetPasswordImage,
   ImageWrapper
} from './styledComponents'

//FIXME: need to fix the WithTransalation in i18n-next , so instead of that we use WithTransalationProps here

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

interface ResetPasswordFormProps extends WithTranslationProps {
   updatePasswordAPI: (
      request: UpdatePasswordAPIRequest,
      token: string,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) => void
   updatePasswordAPIStatus: APIStatus
   onSuccessUpdatePasswordAPI: () => void
   onFailureUpdatePasswordAPI: (error: any) => void
   onClickReturnToLogin: () => void
   token: string
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
}

const InputHandler = React.forwardRef((props: InputHandlerProps, ref) => {
   const {
      labelFor,
      labelText,
      testId,
      defaultValue,
      type,
      onChange,
      onKeyDown,
      validateInput
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
         />
      </InputContainer>
   )
})

// FIXME: Component definition is missing display name  react/display-name
InputHandler.displayName = 'inputHandler'

@observer
class ResetPasswordForm extends Component<ResetPasswordFormProps> {
   @observable password: string
   @observable isInValidPassword: boolean
   @observable confirmPassword: string
   @observable isInValidConfirmPassword: boolean
   passwordRef
   confirmPasswordRef

   constructor(props) {
      super(props)
      this.password = ''
      this.confirmPassword = ''
      this.isInValidPassword = true
      this.isInValidConfirmPassword = true
      this.passwordRef = React.createRef()
      this.confirmPasswordRef = React.createRef()
   }

   setIsInValidPassword = (value: boolean): void => {
      this.isInValidPassword = value
   }

   validatePassword = (): ErrorObjectType => validatePassword(this.password)

   onChangePassword = (event): void => {
      this.password = event.target.value
      this.setIsInValidPassword(this.validatePassword().shouldShowError)
   }

   onKeyDownPassword = (event: any): void => {
      if (event.keyCode === 13) this.confirmPasswordRef.current?.focus()
   }

   setIsInValidConfirmPassword = (value: boolean): void => {
      this.isInValidConfirmPassword = value
   }

   validateConfirmPassword = (): ErrorObjectType =>
      validatePassword(this.confirmPassword)

   onChangeConfirmPassword = (event): void => {
      this.confirmPassword = event.target.value
      this.setIsInValidConfirmPassword(
         this.validateConfirmPassword().shouldShowError
      )
   }

   onKeyDownConfirmPassword = (event: any): void => {
      if (event.keyCode === 13) this.onClickUpdatePassword(event)
   }

   renderLogoAndTitle = (): React.ReactNode => {
      const { t } = this.props
      return (
         <>
            <HeadingLabel as='h1'>
               {t('userProfile:resetPasswordForm.resetYourPassword')}
            </HeadingLabel>
         </>
      )
   }

   renderFields = (): React.ReactNode => {
      const { t } = this.props
      return (
         <>
            <InputHandler
               labelText={t('userProfile:resetPasswordForm.password')}
               labelFor={'password'}
               testId={'passwordInput'}
               ref={this.passwordRef}
               defaultValue={this.password}
               onChange={this.onChangePassword}
               onKeyDown={this.onKeyDownPassword}
               type={inputFieldTypes.password}
               validateInput={this.validatePassword}
            />
            {/* TODO: need confirmation with Content team whether password place holder is there or not */}
            <InputHandler
               labelText={t('userProfile:resetPasswordForm.confirmPassword')}
               labelFor={'confirmPasswordInput'}
               testId={'confirmPasswordInput'}
               ref={this.confirmPasswordRef}
               defaultValue={this.confirmPassword}
               onChange={this.onChangeConfirmPassword}
               onKeyDown={this.onKeyDownConfirmPassword}
               validateInput={this.validateConfirmPassword}
               type={inputFieldTypes.password}
            />
         </>
      )
   }

   showValidationErrors = () => {
      const { t } = this.props
      this.passwordRef.current?.validateInput()
      this.confirmPasswordRef.current?.validateInput()
      if (this.password !== this.confirmPassword) {
         this.confirmPasswordRef.current?.inputRef.current?.setError(
            t('userProfile:resetPasswordForm.passwordsDidntMatch')
         )
      }
   }

   getRequestObject = (): UpdatePasswordAPIRequest => {
      const requestObject = {
         new_password: this.password.trim(),
         confirm_password: this.confirmPassword.trim()
      }
      return requestObject
   }

   isReadyToUpdatePassword = (): boolean =>
      !(
         this.passwordRef.current?.isError ||
         this.confirmPasswordRef.current?.isError
      )

   onClickUpdatePassword = (event): void => {
      event.preventDefault()
      this.showValidationErrors()
      if (this.isReadyToUpdatePassword()) {
         const {
            updatePasswordAPI,
            onSuccessUpdatePasswordAPI,
            onFailureUpdatePasswordAPI,
            token
         } = this.props
         const request = this.getRequestObject()
         updatePasswordAPI(
            request,
            token,
            onSuccessUpdatePasswordAPI,
            onFailureUpdatePasswordAPI
         )
      }
   }

   renderUpdatePasswordButton = (): React.ReactNode => {
      const { t, updatePasswordAPIStatus } = this.props
      // TODO: we have to change the styling for the button common component
      return (
         <UpdatePasswordButton
            type={inputFieldTypes.submit}
            isLoading={isAPIFetching(updatePasswordAPIStatus)}
            id={'updatePasswordButton'}
         >
            <ButtonTextTypo>
               {t('userProfile:resetPasswordForm.updatePassword')}
            </ButtonTextTypo>
         </UpdatePasswordButton>
      )
   }

   renderFooter = (): React.ReactNode => {
      const { t, onClickReturnToLogin } = this.props
      return (
         //TODO: need to navigate to reset password page it will implemented in further story
         <Footer>
            <ReturnToLogin
               as='a'
               onClick={onClickReturnToLogin}
               data-testid={'redirectToLoginButton'}
            >
               {t('userProfile:resetPasswordForm.returnToLogin')}
            </ReturnToLogin>
         </Footer>
      )
   }

   renderForm = observer(
      (): ReactElement => (
         <SubContainer>
            <CardContainer>
               {this.renderLogoAndTitle()}
               <FormContainer onSubmit={this.onClickUpdatePassword}>
                  {this.renderFields()}
                  {this.renderUpdatePasswordButton()}
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
                        <ResetPasswordImage
                           //FIXME: need to get link from S3 bucket and add it to common/images folder
                           src={
                              'https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/4e398353-b505-4055-9e2b-25ffdaf978ef.svg'
                           }
                           alt={t(
                              'userProfile:resetPasswordForm.resetPasswordImage'
                           )}
                        />
                     </ImageWrapper>
                  </RightSection>
               </LoginFormContainer>
            )}
         </>
      )
   }
}

export default withTranslation()(ResetPasswordForm)
