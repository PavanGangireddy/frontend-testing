import FileUploadFixtureService from '../../services/FileUploadService/index.fixture'
import fileUploadConfig from '../../fixtures/getFileUploadConfigurationResponse.json'

import FileUploadStore from '.'

describe('File Upload Store', () => {
   it('it should get file upload config', () => {
      const fileUploadFixtureService = new FileUploadFixtureService()
      const fileUploadStore = new FileUploadStore(fileUploadFixtureService)
      return fileUploadStore.getFileUploadConfigAPI().then(() => {
         expect(fileUploadStore.fileUploadConfig.accessKeyId).toBe(
            fileUploadConfig.aws_access_key_id
         )
         expect(fileUploadStore.fileUploadConfig.awsSessionToken).toBe(
            fileUploadConfig.aws_session_token
         )
         expect(fileUploadStore.fileUploadConfig.secretAccessKey).toBe(
            fileUploadConfig.secret_access_key
         )
      })
   })
})
