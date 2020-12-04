import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'
import { APIStatus, API_INITIAL } from '@ib/api-constants'

import Quill from '../../../WorkbookManagement/components/Quill'
import {
   isAPIFetching,
   getAPIErrorMessage
} from '../../../Common/utils/APIUtils'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import Button from '../../../Common/components/Button'
import TextInput from '../../../Common/components/TextInput'
import { WithTranslation } from '../../../Common/types'
import PlusIcon from '../../../Common/icons/PlusIcon'
import {
   showSuccessBottomCenterToast,
   showFailureBottomCenterToast
} from '../../../Common/utils/ToastUtils'

import {
   validateEmptyInputField,
   validateFormattedTextFied
} from '../../utils/ValidationUtils'

import {
   CreateDiscussionContainer,
   TitleContainer,
   Title,
   FieldContainer,
   FieldHeading,
   ButtonsContainer,
   BodyHeading,
   ErrorText,
   StyledButton,
   ButtonText,
   PostButton
} from './styledComponents'
import styles from './styles.module.css'

interface CreateNewDiscussionProps extends WithTranslation {
   preloadedData?: { title: string; description: string }
   generateNewDiscussionFn: (data, onSuccess, onFailure) => any
   apiStatus: APIStatus
   closeByFn?: Function
   disabled?: boolean
}

@observer
class CreateNewDiscussion extends Component<CreateNewDiscussionProps> {
   @observable title: string
   @observable description: string
   @observable descriptionError = {
      shouldShowError: false,
      errorMessage: ''
   }
   @observable postButtonLoadingStatus: APIStatus

   quillRef
   titleInputRef
   newDiscussionModalRef
   prefixForT = 'discussions:'

   constructor(props) {
      super(props)
      const { preloadedData } = props
      this.title = preloadedData ? preloadedData.title : ''
      this.description = preloadedData ? preloadedData.description : ''
      this.postButtonLoadingStatus = API_INITIAL
      this.quillRef = React.createRef<Quill>()
      this.titleInputRef = React.createRef<TextInput>()
      this.newDiscussionModalRef = React.createRef<BaseModalContainer>()
   }

   componentDidMount() {
      const {
         openModal,
         props: { closeByFn }
      } = this
      closeByFn && openModal()
   }

   areErrorsPresent = ({ description }) => {
      this.titleInputRef.current?.validateInput()
      this.descriptionError = validateFormattedTextFied(description)
      return (
         this.titleInputRef.current?.isError ||
         this.descriptionError.shouldShowError
      )
   }

   postDiscussion = async () => {
      const {
         title,
         getDescription,
         areErrorsPresent,
         closeModal,
         onSuccess,
         onFailure
      } = this
      const discussion = {
         title,
         description: getDescription() || ''
      }
      if (areErrorsPresent(discussion)) return

      const { generateNewDiscussionFn } = this.props
      await generateNewDiscussionFn(discussion, onSuccess, onFailure)
      closeModal()

      this.title = this.description = ''
   }

   onSuccess = () => {
      const { preloadedData, t } = this.props
      const successMessage = preloadedData
         ? t(`${this.prefixForT}discussionUpdatedSuccessfully`)
         : t(`${this.prefixForT}discussionCreatedSuccessfully`)
      showSuccessBottomCenterToast(successMessage)
   }
   onFailure = error => {
      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
   }

   renderButtons = () => {
      const {
         postButtonLoadingStatus,
         prefixForT,
         postDiscussion,
         closeModal
      } = this
      const { t, apiStatus, preloadedData } = this.props
      return (
         <ButtonsContainer>
            {/* FIXME: need to use constants here */}
            <Button
               onClick={closeModal}
               variant={'SECONDARY'}
               id={'updateDiscussionCancelButton'}
            >
               <ButtonText>{t(`${prefixForT}cancel`)}</ButtonText>
            </Button>
            <PostButton
               onClick={postDiscussion}
               isLoading={isAPIFetching(apiStatus, postButtonLoadingStatus)}
               id={'updateDiscussionPostButton'}
            >
               {t(`${prefixForT}${preloadedData ? 'save' : 'post'}`)}
            </PostButton>
         </ButtonsContainer>
      )
   }

   @action.bound
   onImageUploadAPIStatusChange(status) {
      this.postButtonLoadingStatus = status
   }

   getDescription = () => this.quillRef.current?.getEditorData()

   renderAddDiscussion = () => {
      // TODO: Handle EmptyDescription UI much better
      const {
         quillRef,
         prefixForT,
         description,
         descriptionError: { shouldShowError, errorMessage }
      } = this
      const { t } = this.props
      return (
         <FieldContainer className='fieldContainer'>
            <BodyHeading>{t(`${prefixForT}description`)}</BodyHeading>
            <Quill
               ref={quillRef}
               placeholder={t(`${prefixForT}descriptionPlaceholder`)}
               bounds={'.fieldContainer'}
               value={description}
               quillId={'discussionEditor'}
            />
            {/* TODO: Handle EmptyDescription UI much better */}
            {shouldShowError && <ErrorText>{errorMessage}</ErrorText>}
         </FieldContainer>
      )
   }

   @action.bound
   onTitleChange({ target: { value } }) {
      this.title = value
   }

   renderAddTitle = () => {
      const { prefixForT, title, titleInputRef, onTitleChange } = this
      const { t } = this.props
      return (
         <FieldContainer>
            <FieldHeading>{t(`${prefixForT}title`)}</FieldHeading>
            <TextInput
               ref={titleInputRef}
               value={title}
               onChange={onTitleChange}
               placeholder={t(`${prefixForT}titlePlaceholder`)}
               validate={() => validateEmptyInputField(title)}
               testId={'updateDiscussionTitle'}
            />
         </FieldContainer>
      )
   }

   openModal = () => this.newDiscussionModalRef.current?.openModal()
   closeModal = () => {
      const {
         props: { closeByFn },
         newDiscussionModalRef: { current }
      } = this
      current?.closeModal()
      closeByFn && closeByFn()
   }

   render() {
      const {
         props: { closeByFn, preloadedData, t, disabled },
         prefixForT,
         renderAddTitle,
         renderAddDiscussion,
         renderButtons,
         newDiscussionModalRef,
         openModal
      } = this
      return (
         <>
            <BaseModalContainer
               ref={newDiscussionModalRef}
               closeButtonTestId={'updateDiscussionCloseButton'}
               dialogClass={styles.baseModalStyles}
               underlayClass={styles.baseModalUnderlayStyles}
            >
               <CreateDiscussionContainer>
                  <TitleContainer>
                     <Title>
                        {t(
                           `${prefixForT}${
                              preloadedData
                                 ? 'editDiscussion'
                                 : 'createNewDiscussion'
                           }`
                        )}
                     </Title>
                  </TitleContainer>
                  {renderAddTitle()}
                  {renderAddDiscussion()}
                  {renderButtons()}
               </CreateDiscussionContainer>
            </BaseModalContainer>
            {!closeByFn && (
               <StyledButton
                  size={StyledButton.sizes.tiny}
                  startEnhancer={() => <PlusIcon />}
                  onClick={openModal}
                  id={'newDiscussionButton'}
                  disabled={disabled}
               >
                  {t(`${prefixForT}newThread`)}
               </StyledButton>
            )}
         </>
      )
   }
}

export default withTranslation()(CreateNewDiscussion)
