import React, { Component } from 'react'
import { APIStatus } from '@ib/api-constants'
import { observer } from 'mobx-react'
import { AttachmentDetailsProps } from '../../stores/types'

import {
   MobileImageContainer,
   MobileAttachmentUrl,
   MobileAttachmentContainer,
   AttachmentImage
} from './styledComponents'

interface AttachmentPreviewProps {
   details: AttachmentDetailsProps
   //TODO: type
   onEditAttachment: (
      attachmentDetails: any,
      onFailureEditAttachment: (error: any) => void
   ) => void
   isDisabled?: boolean
   deleteAttachmentAPI: (
      attachmentId: string,
      onSuccess: () => void,
      onFailure: (error: string) => void
   ) => void
   deleteAttachmentAPIStatus: APIStatus
   updateAttachmentURLAPIStatus: APIStatus
}

@observer
class AttachmentPreview extends Component<AttachmentPreviewProps> {
   getAttachmentURL = (attachmentUrl: string): string =>
      attachmentUrl.search('http') !== -1
         ? attachmentUrl
         : `https://${attachmentUrl}`

   renderAttachmentURL = (): React.ReactNode => {
      const attachmentUrl = this.props.details.url
      const attachmentLength = 10
      const displayUrl =
         attachmentUrl.length > attachmentLength
            ? attachmentUrl.slice(0, attachmentLength).concat('...')
            : attachmentUrl

      return (
         <MobileAttachmentUrl
            as='a'
            title={attachmentUrl}
            target={'_blank'}
            href={this.getAttachmentURL(attachmentUrl)}
            data-testid={'attachmentURLContent'}
         >
            {displayUrl}
         </MobileAttachmentUrl>
      )
   }
   render() {
      const attachmentUrl = this.props.details.url
      const attachmentLength = 10
      const displayUrl =
         attachmentUrl.length > attachmentLength
            ? attachmentUrl.slice(0, attachmentLength).concat('...')
            : attachmentUrl
      return (
         <MobileAttachmentContainer>
            <MobileImageContainer>
               <AttachmentImage
                  src={
                     'https://bss-backend-media-static.s3.ap-south-1.amazonaws.com/front-end/media/default-attachment.svg'
                  }
                  alt='attachment-Image'
               />
            </MobileImageContainer>
            {this.renderAttachmentURL()}
         </MobileAttachmentContainer>
      )
   }
}
export default AttachmentPreview
