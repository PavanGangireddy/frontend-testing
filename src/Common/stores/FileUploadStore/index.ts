import { observable, action } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'

import { bindPromiseWithOnSuccess } from '../../utils/MobxPromise'
import FileUploadService from '../../services/FileUploadService'

import FileUploadConfiguration from '../models/FileUploadConfiguration'

class FileUploaderStore {
   @observable fileUploadConfig!: FileUploadConfiguration

   fileUploadService: FileUploadService

   @observable getFileUploadConfigAPIStatus!: APIStatus

   @observable getFileUploadConfigAPIError!: any

   constructor(fileUploadService: FileUploadService) {
      this.fileUploadService = fileUploadService
      this.initStore()
   }

   @action.bound
   initStore(): void {
      if (this.fileUploadConfig) this.fileUploadConfig.clearModal()
      this.getFileUploadConfigAPIStatus = API_INITIAL
      this.getFileUploadConfigAPIError = ''
   }

   clearStore(): void {
      this.initStore()
   }

   @action.bound
   setGetFileUploadConfigAPIStatus(status: APIStatus): void {
      this.getFileUploadConfigAPIStatus = status
   }

   @action.bound
   setGetFileUploadConfigAPIResponse(response): void {
      this.fileUploadConfig = new FileUploadConfiguration(response)
   }

   @action.bound
   setGetFileUploadConfigAPIError(error: any): void {
      this.getFileUploadConfigAPIError = error
   }

   @action.bound
   getFileUploadConfigAPI(
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const getFileUploadConfigPromise = this.fileUploadService.getFileUploadConfig()
      return bindPromiseWithOnSuccess(getFileUploadConfigPromise)
         .to(this.setGetFileUploadConfigAPIStatus, response => {
            this.setGetFileUploadConfigAPIResponse(response)
            onSuccess()
         })
         .catch(err => {
            this.setGetFileUploadConfigAPIError(err)
            onFailure()
         })
   }
}

export default FileUploaderStore
