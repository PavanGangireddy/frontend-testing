import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { APIStatus } from '@ib/api-constants'

import { isAPIFetching } from '../../../Common/utils/APIUtils'
import Loader from '../../../Common/components/Loader'
import CommentModal from '../../stores/models/Comment'

import Comment from '../Comment'

import { StyledContainer } from './styledComponents'

interface CommentsListProps {
   fetchedData: CommentModal[]
   apiStatus: APIStatus
   doNetworkCall: Function
   onFetchFailure: Function
   modifyOffsetValue: () => void
}

@observer
class CommentsList extends Component<CommentsListProps> {
   componentDidMount() {
      const { fetchedData, doNetworkCall, onFetchFailure } = this.props
      fetchedData.length === 0 && doNetworkCall({}, () => {}, onFetchFailure)
   }

   renderComments = () => {
      const { fetchedData, apiStatus } = this.props
      return isAPIFetching(apiStatus) ? (
         <Loader />
      ) : (
         fetchedData.map(commentData => (
            <Comment key={commentData.commentId} data={commentData} />
         ))
      )
   }

   render() {
      const { renderComments } = this
      return <StyledContainer>{renderComments()}</StyledContainer>
   }
}

export default CommentsList
