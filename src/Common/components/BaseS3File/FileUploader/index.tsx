import React, { Component } from 'react'
import { API_FETCHING, API_FAILED, APIStatus } from '@ib/api-constants'
import { observer, inject } from 'mobx-react'

import S3FileUploader from '../../../stores/S3FileUploader'
import FileUploaderStore from '../../../stores/FileUploadStore'
import { getFormattedAPIErrorDescription } from '../../../utils/APIErrorUtils'

import { FileInput } from './styledComponents'

interface Props {
   fileInputRef: any
   onChange?: Function
   fileAcceptType: string
   className?: string
   onUploadProgress: Function
   extraBucketPath: string
   onRetry?: Function
}

interface InjectedProps extends Props {
   fileUploadStore: FileUploaderStore
}

@inject('fileUploadStore')
@observer
class FileUploader extends Component<Props> {
   static defaultProps = {
      fileInputRef: React.createRef(),
      className: ''
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   //FIXME: need to fix rotation of image in different browsers after upload
   // async fixRotationofImage(filesTobeRotated): Promise<File[]> {
   //    const { fileAcceptType } = this.props
   //    const rotatedFiles: File[] = []

   //    if (fileAcceptType === fileAcceptTypes.image) {
   //       for (let i = 0; i < filesTobeRotated.length; i++) {
   //          const file = await fixRotationOfFile(filesTobeRotated[i])
   //          rotatedFiles.push(file)
   //       }
   //       return rotatedFiles
   //    }
   //    return filesTobeRotated
   // }

   onSuccessFileUpload = (apiStatus: APIStatus, dataLocation: string): void => {
      const { onUploadProgress } = this.props

      onUploadProgress(apiStatus, dataLocation)
   }

   onFailureFileUpload = (
      apiStatus: APIStatus,
      errorMessage: string,
      fileName: string
   ): void => {
      const { onUploadProgress } = this.props
      onUploadProgress(apiStatus, errorMessage, fileName)
   }

   uploadFiles = (): Promise<any> => {
      const { fileUploadStore } = this.getInjectedProps()
      const { fileInputRef, extraBucketPath } = this.props
      const s3FileUpload = new S3FileUploader(fileUploadStore)
      s3FileUpload.configureAWS()
      const { files } = fileInputRef.current
      const uploadingFiles = [files[0]]

      uploadingFiles.map(eachFile => {
         if (typeof eachFile === 'object') {
            return s3FileUpload.uploadToAWS(
               {
                  extraBucketPath: extraBucketPath,
                  file: eachFile
               },
               this.onSuccessFileUpload,
               this.onFailureFileUpload
            )
         }
         return null
      })
      // this.fixRotationofImage(uploadingFiles).then(res =>
      //    Promise.all(
      //       res.map(eachFile => {
      //          if (typeof eachFile === 'object') {
      //             return s3FileUpload.uploadToAWS(
      //                {
      //                   extraBucketPath: extraBucketPath,
      //                   file: eachFile
      //                },
      //                this.onSuccessFileUpload,
      //                this.onFailureFileUpload
      //             )
      //          }
      //          return null
      //       })
      //    )
      // )
      return Promise.resolve(fileInputRef)
   }

   onSuccessGetFileUploadConfig = (): void => {
      this.uploadFiles()
   }

   onFailureGetFileUploadConfig = (): void => {
      const { fileUploadStore } = this.getInjectedProps()
      const { onUploadProgress } = this.props

      onUploadProgress(
         API_FAILED,
         getFormattedAPIErrorDescription(
            fileUploadStore.getFileUploadConfigAPIError
         )
      )
   }

   isFileSelected = (): boolean => {
      const { fileInputRef } = this.props
      const { files } = fileInputRef.current

      if (files.length > 0) {
         return true
      }
      return false
   }

   upload = (): void => {
      const { fileUploadStore } = this.getInjectedProps()

      const { onUploadProgress } = this.props

      if (this.isFileSelected()) {
         onUploadProgress(API_FETCHING)
         fileUploadStore.getFileUploadConfigAPI(
            this.onSuccessGetFileUploadConfig,
            this.onFailureGetFileUploadConfig
         )
      }
   }

   onChange = (): void => {
      const { onChange, fileInputRef } = this.props
      if (onChange) {
         onChange(fileInputRef)
      }
   }

   render(): React.ReactNode {
      const {
         fileInputRef,
         className,
         fileAcceptType,
         ...otherProps
      } = this.props

      return (
         <FileInput
            id='file-input'
            data-testid='fileUploadInput'
            className={className}
            type='file'
            accept={fileAcceptType}
            ref={fileInputRef}
            {...otherProps}
            onChange={this.onChange}
         />
      )
   }
}

export default FileUploader
