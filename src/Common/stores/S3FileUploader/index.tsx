import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import { API_SUCCESS, API_FAILED } from '@ib/api-constants'

import { getFileExtension } from '../../utils/FileUploaderUtils'

import FileUploadStore from '../FileUploadStore'

import { UploadToAWSRequest } from './types'

class S3FileUploader {
   fileUploadStore: FileUploadStore

   constructor(fileUploadStore: FileUploadStore) {
      this.fileUploadStore = fileUploadStore
   }

   configureAWS = (): void => {
      const { fileUploadConfig } = this.fileUploadStore
      const {
         regionName,
         accessKeyId,
         secretAccessKey,
         awsSessionToken
      } = fileUploadConfig

      const credentials = new AWS.Credentials(
         accessKeyId,
         secretAccessKey,
         awsSessionToken
      )

      AWS.config.update({
         region: regionName,
         credentials: credentials
      })
   }

   uploadToAWS = (
      requestObject: UploadToAWSRequest,
      onSuccessUpload: Function = (): void => {},
      onFailureUpload: Function = (): void => {}
   ): Promise<any> => {
      const { file, extraBucketPath } = requestObject
      const { fileUploadConfig } = this.fileUploadStore
      const { bucketName, bucketPath } = fileUploadConfig
      const fileName = file.name
      const fileExtension = getFileExtension(file.name, file.type)
      const s3BucketPath = bucketPath + extraBucketPath
      const updatedFileName = fileExtension
         ? `${uuidv4()}.${fileExtension}`
         : `${uuidv4()}`
      const s3FilePath = s3BucketPath + updatedFileName
      const s3UploadParams = {
         Bucket: bucketName,
         Key: s3FilePath,
         Body: file,
         ACL: 'public-read'
      }

      return new Promise((resolve, reject) => {
         const upload = new AWS.S3.ManagedUpload({
            params: s3UploadParams
         })
         const promise = upload.promise()

         promise.then(
            data => {
               onSuccessUpload(API_SUCCESS, data.Location)
               resolve(data.Location)
            },
            error => {
               onFailureUpload(API_FAILED, error.message, fileName)
               reject({ errorMsg: error.message, fileName })
            }
         )
      })
   }
}

export default S3FileUploader
