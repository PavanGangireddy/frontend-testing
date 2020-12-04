import { create } from 'apisauce'

import Config from '../../constants/EnvironmentConstants'
import { apiMethods } from '../../constants/APIConstants'

import endpoints from '../endpoints'

import FileUploadService from './'

const S3_UPLOAD_URL = `${Config.BSS_BASE_URL}s3_uploader/`

class FileUploadAPIService implements FileUploadService {
   api: Record<string, any>
   networkCallWithAPISauce: Function

   constructor(networkCallWithAPISauce: Function) {
      this.api = create({
         baseURL: S3_UPLOAD_URL
      })
      this.networkCallWithAPISauce = networkCallWithAPISauce
   }

   getFileUploadConfig() {
      return this.networkCallWithAPISauce(
         this.api,
         endpoints.getFileUploadConfig,
         {},
         apiMethods.get
      )
   }
}

export default FileUploadAPIService
