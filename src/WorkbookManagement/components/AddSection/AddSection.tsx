import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { withTranslation } from 'react-i18next'

import { APIStatus } from '@ib/api-constants'

import BlackCloseIcon from '../../../Common/icons/BlackCloseIcon'
import {
   getAPIErrorMessage,
   isAPIFetching
} from '../../../Common/utils/APIUtils'

import { ErrorObjectType } from '../../../Common/stores/types'
import { validateName } from '../../../UserProfile/utils/ValidationUtils'

import { MAX_SECTION_NAME_LENGTH } from '../../constants/UIConstants'
import { CreateSectionAPIRequest, AddSectionResponse } from '../../stores/types'

import { inputFieldTypes } from './constants'
import {
   AddSectionContainer,
   FormContainer,
   InputBox,
   AddSectionButton,
   SendText,
   Footer,
   CloseButton
} from './styledComponents'

//FIXME: need to fix this type issue in react-i18next
interface WithTranslationProps {
   t: any
   i18n: any
   tReady: any
}

interface AddSectionProps extends WithTranslationProps {
   listId: string
   createSectionAPI: (
      requestObject: CreateSectionAPIRequest,
      onSuccess: (response: AddSectionResponse) => void,
      onFailure: () => void
   ) => any
   getCreateSectionAPIError: any
   getCreateSectionAPIStatus: APIStatus
   onSuccessCreateSectionAPI: () => void
   onCloseAddSection: () => void
}

@observer
class AddSection extends Component<AddSectionProps> {
   @observable sectionName: string
   @observable isInvalidSectionName: boolean
   sectionRef

   constructor(props) {
      super(props)
      this.sectionName = ''
      this.isInvalidSectionName = true
      this.sectionRef = React.createRef()
   }

   componentDidMount() {
      this.sectionRef.current?.focus()
   }

   setIsInValidSectionName = (value: boolean): void => {
      this.isInvalidSectionName = value
   }

   validateSectionName = (): ErrorObjectType => validateName(this.sectionName)

   @action
   onChangeSectionName = (event: React.ChangeEvent<HTMLInputElement>): void => {
      this.sectionName = event.target.value
      this.setIsInValidSectionName(this.validateSectionName().shouldShowError)
   }

   getRequestObject = () => {
      const { listId } = this.props
      return {
         list_id: listId,
         section_name: this.sectionName
      }
   }

   isReadyToCreateSection = () => !this.sectionRef.current?.isError

   getSectionObject = (sectionId: string) => ({
      sectionId: sectionId,
      sectionName: this.sectionName
   })

   onSuccessCreateSectionAPI = () => {
      const { onSuccessCreateSectionAPI } = this.props
      onSuccessCreateSectionAPI()
   }

   onKeyDownSectionName = event => {
      const { getCreateSectionAPIStatus } = this.props
      if (event.charCode === 13 && !isAPIFetching(getCreateSectionAPIStatus))
         this.onClickAddSection(event)
   }

   onFailureCreateSectionAPI = () => {
      const { getCreateSectionAPIError } = this.props
      const errorMessage = getAPIErrorMessage(getCreateSectionAPIError)
      this.sectionRef.current?.inputRef.current?.setError(errorMessage)
   }

   onClickAddSection = (event): void => {
      event.preventDefault()
      this.sectionRef.current?.validateInput()
      if (this.isReadyToCreateSection()) {
         const { createSectionAPI } = this.props
         createSectionAPI(
            this.getRequestObject(),
            this.onSuccessCreateSectionAPI,
            this.onFailureCreateSectionAPI
         )
      }
   }

   render() {
      const { t, getCreateSectionAPIStatus, onCloseAddSection } = this.props
      return (
         <AddSectionContainer>
            <InputBox
               testId='sectionNameInput'
               ref={this.sectionRef}
               defaultValue={this.sectionName}
               onChange={this.onChangeSectionName}
               onKeyPress={this.onKeyDownSectionName}
               type={inputFieldTypes.text}
               validate={this.validateSectionName}
               shouldValidateOnBlur={false}
               maxLength={MAX_SECTION_NAME_LENGTH}
               placeholder={t(
                  'workbookManagement:addSection.enterSectionTitle'
               )}
            />
            <Footer>
               <FormContainer onSubmit={this.onClickAddSection}>
                  <AddSectionButton
                     isLoading={isAPIFetching(getCreateSectionAPIStatus)}
                     type={inputFieldTypes.submit}
                     id='addSectionAddButton'
                  >
                     <SendText>
                        {t('workbookManagement:addSection.addSection')}
                     </SendText>
                  </AddSectionButton>
                  <CloseButton
                     onClick={onCloseAddSection}
                     disabled={isAPIFetching(getCreateSectionAPIStatus)}
                     id='addSectionCloseButton'
                  >
                     <BlackCloseIcon />
                  </CloseButton>
               </FormContainer>
            </Footer>
         </AddSectionContainer>
      )
   }
}

export default withTranslation()(AddSection)
