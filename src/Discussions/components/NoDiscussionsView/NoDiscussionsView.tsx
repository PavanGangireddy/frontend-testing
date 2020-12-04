import React from 'react'
import { APIStatus } from '@ib/api-constants'
import { withTranslation } from 'react-i18next'

import { WithTranslation } from '../../../Common/types'

import {
   StyledContainer,
   NoDataText,
   NoDiscussionsImage
} from './styledComponents'

interface NoDiscussionsViewProps extends WithTranslation {
   createNewDiscussion: (
      data: {
         title: string
         description: string
      },
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) => Promise<void | {}>
   getCreateNewDiscussionAPIStatus: APIStatus
   shouldDisableActions?: boolean
}

class NoDiscussionsView extends React.Component<NoDiscussionsViewProps> {
   render() {
      const { shouldDisableActions } = this.props
      return (
         <StyledContainer shouldDisablePointerEvents={shouldDisableActions}>
            <NoDiscussionsImage
               src={
                  'https://bss-backend-media-static.s3.ap-south-1.amazonaws.com/front-end/media/discussions.svg'
               }
               alt={'noDiscussionsImage'}
            />
            <NoDataText as='p'>
               {`Will be available to you when you're in a group activity`}
            </NoDataText>
         </StyledContainer>
      )
   }
}

export default withTranslation()(NoDiscussionsView)
