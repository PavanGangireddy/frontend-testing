import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'
import { MentionsInput } from 'react-mentions'
import {
   APIStatus,
   API_FETCHING,
   API_INITIAL,
   API_FAILED
} from '@ib/api-constants'

import { WithTranslation } from '../../../Common/types'
import AttatchmentIcon from '../../../Common/icons/AttatchmentIcon'
import ProgressBarComponent from '../../../Common/components/ProgressBarComponent'
import BaseS3File from '../../../Common/components/BaseS3File'
import Avatar from '../../../Common/components/Avatar'
import DeleteIcon from '../../../Common/icons/DeleteIcon'
import {
   showSuccessBottomCenterToast,
   showFailureBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import {
   getAPIErrorMessage,
   isAPIFetching
} from '../../../Common/utils/APIUtils'

import { validateEmptyInputField } from '../../utils/ValidationUtils'
import MultiMedia from '../../stores/models/MultiMedia'
import {
   replyFormatEncoder,
   modifyDescriptionForTriggeringMentionMarkups
} from '../../utils/DiscussionUtils'
import {
   fileFormatTypes,
   markUpsForEncodingAndDecoding,
   startAndEndHTMLTagsForMentions
} from '../../constants/DiscussionConstants'

import './ReplyInputSection.css'
import {
   StyledContainer,
   FooterWrapper,
   ActionButtonsSection,
   StyledButton,
   AttatchWrapper,
   AttatchmentField,
   AttatchIcon,
   Image,
   Footer,
   MultimediaPreviewContainer,
   DeleteIconWrapper,
   AttatchedFilePreview,
   StyledMention,
   MentionOptionForUser,
   AddAttachmentWrapper,
   ErrorText
} from './styledComponents'

interface ReplyInputSectionProps extends WithTranslation {
   data?: any
   postReply: Function
   cancelFn: () => any
   apiStatus: APIStatus
   inputTestId?: string
   cancelButtonTestId?: string
   postButtonTestId?: string
}
@observer
class ReplyInputSection extends Component<ReplyInputSectionProps> {
   @observable replyInput = ``
   @observable errorMessage = ''
   @observable selectedFiles: Array<{
      id: string
      url: string
      formatType: string
   }> = []
   mentionedUsersIdList: string[] = []
   @observable isError: boolean

   prefixForT = 'discussions:'

   constructor(props) {
      super(props)
      if (props.data) {
         const { description, multimedia } = props.data

         this.replyInput = modifyDescriptionForTriggeringMentionMarkups(
            description
         )
         this.selectedFiles = multimedia.map(({ id, url, formatType }) => ({
            id,
            url,
            formatType
         }))
      }
      this.isError = false
   }

   static defaultProps = {
      inputTestId: 'mentionInput',
      cancelButtonTestId: 'cancelButtonTestId',
      postButtonTestId: 'postButtonTestId'
   }

   onToggleIsError = value => {
      this.isError = value
   }

   @action.bound
   onChangeReplyInput({ target: { value } }) {
      this.replyInput = value
      this.onToggleIsError(false)
   }

   @action.bound
   areErrorsPresent = () => {
      const { replyInput } = this
      const { shouldShowError, errorMessage } = validateEmptyInputField(
         replyInput
      )
      return shouldShowError && (this.errorMessage = errorMessage)
   }

   onPostReplySuccessfully = () => {
      const { t, data } = this.props
      const successMessage = data
         ? t(`${this.prefixForT}replyUpdatedSuccessfully`)
         : t(`${this.prefixForT}replyPostedSuccessfully`)
      showSuccessBottomCenterToast(successMessage)
      this.replyInput = ''
      this.selectedFiles = []
   }

   onPostReplyFailure = error => {
      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
   }

   @action.bound
   onClickPostButton() {
      const {
         replyInput,
         areErrorsPresent,
         onPostReplySuccessfully,
         onPostReplyFailure,
         selectedFiles,
         props: { postReply }
      } = this

      const { modifiedDescription: comment_content } = replyFormatEncoder(
         replyInput
      )
      if (areErrorsPresent()) {
         this.onToggleIsError(true)
      } else {
         const multimedia = selectedFiles.map(eachFile => ({
            format_type: eachFile.formatType,
            url: eachFile.url,
            thumbnail_url: eachFile.url
         }))
         postReply(
            {
               comment_content,
               multimedia
            },
            onPostReplySuccessfully,
            onPostReplyFailure
         )
      }
   }

   renderFooter = () => {
      const {
         props: {
            t,
            cancelFn,
            apiStatus,
            data,
            cancelButtonTestId,
            postButtonTestId
         },
         onClickPostButton,
         prefixForT
      } = this
      return (
         <FooterWrapper>
            <ActionButtonsSection>
               {/* TODO: need to put button Text */}
               <StyledButton
                  onClick={cancelFn}
                  type={'TERTIARY'}
                  id={cancelButtonTestId}
               >
                  {t(`${prefixForT}cancel`)}
               </StyledButton>
               <StyledButton
                  isLoading={isAPIFetching(apiStatus)}
                  onClick={onClickPostButton}
                  id={postButtonTestId}
               >
                  {t(`${prefixForT}${data ? 'save' : 'post'}`)}
               </StyledButton>
            </ActionButtonsSection>
         </FooterWrapper>
      )
   }

   renderInitialUI = () => {
      const { t } = this.props
      const { prefixForT } = this
      return (
         <AddAttachmentWrapper>
            <AttatchIcon>
               <AttatchmentIcon />
               &nbsp; {t(`${prefixForT}attatchFile`)}
            </AttatchIcon>
         </AddAttachmentWrapper>
      )
   }

   onClickDeleteImage = id => {
      const indexOfImageToBeDeleted = this.selectedFiles.findIndex(
         file => file.id === id
      )
      this.selectedFiles.splice(indexOfImageToBeDeleted, 1)
   }

   renderSelectedFiles = () =>
      this.selectedFiles.map(eachFile => (
         <AttatchedFilePreview key={eachFile.id}>
            <DeleteIconWrapper
               onClick={() => this.onClickDeleteImage(eachFile.id)}
            >
               <DeleteIcon />
            </DeleteIconWrapper>

            <Image src={eachFile.url} alt='mediaImage' />
         </AttatchedFilePreview>
      ))

   renderFetchingStateUI = () => {
      const { t } = this.props
      const { prefixForT } = this
      return (
         <AttatchWrapper>
            <AttatchmentField>
               <ProgressBarComponent
                  percentage={70}
                  shouldShowProgessHint={true}
               />
            </AttatchmentField>
            <AttatchIcon as='div'>
               <AttatchmentIcon />
               &nbsp; {t(`${prefixForT}attatchFile`)}
            </AttatchIcon>
         </AttatchWrapper>
      )
   }

   renderFileUploadField = (url, apiStatus, filename) => {
      switch (apiStatus) {
         case API_FETCHING:
            return this.renderFetchingStateUI()
         case API_INITIAL:
            return this.renderInitialUI()
         case API_FAILED:
            return this.renderInitialUI()

         default:
            return this.renderInitialUI()
      }
   }

   //TODO:need to display name
   onSuccessFileUpload = (url, filename) => {
      const multimediaInstance = new MultiMedia()
      multimediaInstance.url = url
      multimediaInstance.id = Math.random().toString()
      multimediaInstance.formatType = fileFormatTypes.image
      this.selectedFiles.push(multimediaInstance.getMultimediaItem())
   }

   renderAttatchField = () => (
      <BaseS3File
         renderFileSelector={(url, status, filename) =>
            this.renderFileUploadField(url, status, filename)
         }
         enableEdit={true}
         extraBucketPath=''
         onSuccessFileUpload={this.onSuccessFileUpload}
      />
   )

   render() {
      const {
         prefixMarkupForDescription: prefixMarkup,
         suffixMarkupForDescription: suffixMarkup
      } = markUpsForEncodingAndDecoding
      const { startHTMLTag, endHTMLTag } = startAndEndHTMLTagsForMentions
      const {
         props: { t, inputTestId },
         replyInput,
         onChangeReplyInput,
         renderFooter,
         renderAttatchField,
         prefixForT,
         isError
      } = this

      return (
         <>
            <StyledContainer isError={this.isError}>
               <MentionsInput
                  value={replyInput}
                  onChange={onChangeReplyInput}
                  placeholder={t(`${prefixForT}addReplyInputPlaceholder`)}
                  className={'reply-input-section-textarea'}
                  data-testid={inputTestId}
               >
                  <StyledMention
                     trigger='@'
                     markup={`${prefixMarkup +
                        startHTMLTag}__display__${endHTMLTag + suffixMarkup} `}
                     renderSuggestion={(
                        { id, display },
                        highlightedDisplay,
                        focused
                     ) => (
                        <MentionOptionForUser isFocused={focused} key={id}>
                           {/* FIXME: need to add constants */}
                           <Avatar
                              variant={'CIRCLE'}
                              type={'FILLED'}
                              size={'XS'}
                              name={display}
                              url={''}
                              alt={display}
                           />
                           {highlightedDisplay}
                        </MentionOptionForUser>
                     )}
                     displayTransform={(id, display) => display}
                  />
               </MentionsInput>
               <Footer>
                  <MultimediaPreviewContainer>
                     {this.renderSelectedFiles()}
                  </MultimediaPreviewContainer>
                  {/* {renderAttatchField()} */}
                  {renderFooter()}
               </Footer>
            </StyledContainer>
            {this.isError && (
               <ErrorText>
                  {t(`${this.prefixForT}commentShouldNotBeEmpty`)}
               </ErrorText>
            )}
         </>
      )
   }
}

export default withTranslation()(ReplyInputSection)
