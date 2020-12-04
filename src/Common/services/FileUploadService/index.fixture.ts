import { resolveWithTimeout } from '../../utils/TestUtils'
import fileUploadConfig from '../../fixtures/getFileUploadConfigurationResponse.json'

import FileUploadService from '.'

//TODO:mention types
class FileUploadFixtureService implements FileUploadService {
   getFileUploadConfig(): Promise<any> {
      return resolveWithTimeout(fileUploadConfig)
   }
}

export default FileUploadFixtureService
