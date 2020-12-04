import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import 'styled-components/macro'
import { withTranslation } from 'react-i18next'

import {
   APIStatus,
   API_INITIAL,
   API_SUCCESS,
   API_FETCHING,
   API_FAILED
} from '@ib/api-constants'

import { WithTranslation } from '../../types'
import { showFailureBottomCenterToast } from '../../utils/ToastUtils'
import { getAPIErrorMessage } from '../../utils/APIUtils'
import ErrorMessage from '../ErrorMessage'
import FileUploader from './FileUploader'
import { ValidationResponseType } from './types'
import {
   BaseImageContainer,
   FileContainer,
   Label,
   BaseImageWrapper
} from './styledComponents'

export interface Props extends WithTranslation {
   validate?: () => ValidationResponseType
   ref?: any
   renderFileSelector?: Function
   fileAcceptType?: Array<string> | string
   extraBucketPath: string
   maxLimit?: number
   enableEdit?: boolean
   onUploadAPIStatusChange?: Function
   onFailFileUpload?: Function
   onSuccessFileUpload?: Function
   containerClassName?: string
   containerCSS?: any
   id?: string
   labelText?: string
}

@observer
class BaseS3File extends Component<Props> {
   static defaultProps = {
      enableEdit: true,
      maxLimit: 5,
      fileAcceptType: '',
      labelText: ''
   }

   inputRef
   fileUploadRef

   @observable uploadingAPIStatus: APIStatus
   @observable url!: string
   @observable fileName!: string
   @observable error = ''

   constructor(props: Props) {
      super(props)
      this.inputRef = React.createRef()
      this.fileUploadRef = React.createRef()
      this.uploadingAPIStatus = API_INITIAL
   }

   @action setError(errorText: string) {
      this.error = errorText
   }

   updateErrorMessage = () => {
      const { validate } = this.props
      if (validate) {
         const result = validate()
         if (result.shouldShowError) {
            this.setError(result.errorMessage)
         } else {
            this.setError('')
         }
      }
   }

   onBlur = () => {
      this.updateErrorMessage()
   }

   @action.bound
   setUrl(url: string): void {
      this.url = url
   }

   setFileName = (name: string): void => {
      this.fileName = name
   }

   @action.bound
   setUploadingAPIStatus(apiStatus: APIStatus): void {
      const { onUploadAPIStatusChange } = this.props
      this.uploadingAPIStatus = apiStatus

      onUploadAPIStatusChange && onUploadAPIStatusChange(apiStatus)
   }

   @action
   onUploadProgress = (
      apiStatus: APIStatus,
      dataLocationOrErrorMessage?: string
   ): void => {
      const { onFailFileUpload } = this.props

      if (apiStatus === API_FETCHING) {
         this.setUploadingAPIStatus(apiStatus)
      } else if (apiStatus === API_SUCCESS) {
         const { onSuccessFileUpload } = this.props
         this.setUploadingAPIStatus(apiStatus)
         this.setUrl(dataLocationOrErrorMessage as string)
         onSuccessFileUpload && onSuccessFileUpload(this.url, this.fileName)
      } else if (apiStatus === API_FAILED) {
         this.setUploadingAPIStatus(apiStatus)
         if (onFailFileUpload) {
            onFailFileUpload(dataLocationOrErrorMessage)
         }
         this.updateErrorMessage()
         const errorMessage = getAPIErrorMessage(dataLocationOrErrorMessage)
         showFailureBottomCenterToast(errorMessage)
      }
   }

   uploadFile = () => {
      this.fileUploadRef.current.upload()
   }

   onChange = (e): void => {
      const { enableEdit, maxLimit, t } = this.props
      if (enableEdit && maxLimit) {
         // TODO: Max limit fixed as 5 MB
         if (
            e.current.files.length > 0 &&
            e.current.files[0].size > maxLimit * 1024 * 1024
         ) {
            // TODO: need to handle toast message

            const toastProps = {
               message: t('common:BaseS3.fileSizeMaximumLimitReached'),
               type: 'warning'
            }
            console.log(toastProps)
         } else {
            this.uploadFile()

            if (e.current.files.length > 0) {
               this.setUrl(URL.createObjectURL(e.current.files[0]))
               this.setFileName(e.current.files[0].name)
            }
         }
      }
   }

   onClickUpload = (): void => {
      const { enableEdit } = this.props

      if (enableEdit && this.uploadingAPIStatus !== API_FETCHING) {
         this.inputRef.current.click()
      }
   }

   renderS3FileUI = () => {
      const { renderFileSelector } = this.props
      if (renderFileSelector) {
         return renderFileSelector(
            this.url,
            this.uploadingAPIStatus,
            this.fileName
         )
      }
      return null
   }

   render(): React.ReactNode {
      const {
         fileAcceptType,
         extraBucketPath,
         containerClassName,
         containerCSS,
         id,
         labelText,
         ...otherProps
      } = this.props
      return (
         <BaseImageWrapper>
            {labelText ? <Label>{labelText}</Label> : null}
            <BaseImageContainer
               className={containerClassName}
               css={containerCSS}
               onClick={this.onClickUpload}
               id={id}
               onBlur={this.onBlur}
               {...otherProps}
            >
               {this.renderS3FileUI()}
               <FileContainer>
                  <FileUploader
                     fileAcceptType={fileAcceptType as string}
                     onUploadProgress={this.onUploadProgress}
                     ref={this.fileUploadRef}
                     fileInputRef={this.inputRef}
                     onChange={this.onChange}
                     extraBucketPath={extraBucketPath}
                  />
               </FileContainer>
            </BaseImageContainer>
            {this.error ? <ErrorMessage errorMessage={this.error} /> : null}
         </BaseImageWrapper>
      )
   }
}

export default withTranslation('translations', { withRef: true })(BaseS3File)
