import React from 'react'
import { Provider } from 'mobx-react'

import FileUploaderStore from '../../stores/FileUploadStore'
import FileUploaderService from '../../services/FileUploadService/index.fixture'
import BaseS3File from '.'

export default {
   title: 'BaseS3File'
}

const fileUploaderStore = new FileUploaderStore(new FileUploaderService())

export const BaseS3FIle = () => (
   <Provider fileUploadStore={fileUploaderStore}>
      <BaseS3File
         renderFileSelector={(url, status, filename) => filename}
         enableEdit={true}
         extraBucketPath=''
      />
   </Provider>
)

export const BaseS3FIleWithSelectedFile = () => (
   <Provider fileUploadStore={fileUploaderStore}>
      <BaseS3File
         renderFileSelector={(
            url = 'dgfdg',
            status = 100,
            filename = 'Screenshot from 21-32-06.png'
         ) => filename}
         enableEdit={true}
         extraBucketPath=''
         labelText='esfsd'
      />
   </Provider>
)
