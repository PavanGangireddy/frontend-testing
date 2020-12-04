import { observable, action } from 'mobx'

class FileUploadConfiguration {
   @observable accessKeyId!: string
   @observable secretAccessKey!: string
   @observable awsSessionToken!: string
   @observable bucketPath!: string
   @observable bucketName!: string
   @observable regionName!: string

   constructor(response) {
      this.initModal(response)
   }

   @action.bound
   initModal(response): void {
      const {
         aws_access_key_id: accessKeyId,
         aws_session_token: awsSessionToken,
         secret_access_key: secretAccessKey,
         bucket_name: bucketName,
         folder_name: bucketPath,
         region_name: regionName
      } = response

      this.accessKeyId = accessKeyId
      this.awsSessionToken = awsSessionToken
      this.secretAccessKey = secretAccessKey
      this.bucketName = bucketName
      this.bucketPath = bucketPath
      this.regionName = regionName
   }

   @action.bound
   clearModal(): void {
      this.accessKeyId = ''
      this.awsSessionToken = ''
      this.secretAccessKey = ''
      this.bucketName = ''
      this.bucketPath = ''
      this.regionName = ''
   }
}

export default FileUploadConfiguration
