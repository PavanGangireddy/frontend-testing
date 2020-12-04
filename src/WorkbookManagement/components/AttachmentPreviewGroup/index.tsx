import { observer } from 'mobx-react'
import React, { Component } from 'react'

import AttachmentPreview from '../AttachmentPreview'
import { AttachmentDetailsProps } from '../../stores/types'

import { AttachmentsContainer } from './styledComponents'

interface AttachmentPreviewGroupProps {
   attachments: Array<AttachmentDetailsProps>
}

@observer
class AttachmentPreviewGroup extends Component<AttachmentPreviewGroupProps> {
   render() {
      return (
         <AttachmentsContainer>
            {this.props.attachments.map(eachAttachment => (
               <AttachmentPreview
                  key={eachAttachment.attachmentId}
                  details={eachAttachment}
                  onEditAttachment={(): void => {}}
                  deleteAttachmentAPI={(): void => {}}
                  isDisabled={true}
                  deleteAttachmentAPIStatus={200}
                  updateAttachmentURLAPIStatus={200}
               />
            ))}
         </AttachmentsContainer>
      )
   }
}

export default AttachmentPreviewGroup
