import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { APIStatus } from '@ib/api-constants'

import { isAPIFetching } from '../../../Common/utils/APIUtils'
import Loader from '../../../Common/components/Loader'

import ReplyModal from '../../stores/models/Reply'

import Reply from '../Reply'

import { StyledContainer } from './styledComponents'

interface RepliesListProps {
   fetchedData: ReplyModal[]
   apiStatus: APIStatus
   doNetworkCall: Function
   onFetchFailure: Function
}

@observer
class RepliesList extends Component<RepliesListProps> {
   componentDidMount() {
      const { fetchedData, doNetworkCall, onFetchFailure } = this.props
      fetchedData.length === 0 && doNetworkCall({}, () => {}, onFetchFailure)
   }

   // FIXME:HAndle APIError also
   renderRepies = () => {
      const { fetchedData, apiStatus } = this.props
      return isAPIFetching(apiStatus) ? (
         <Loader />
      ) : (
         fetchedData.map(replyData => (
            <Reply key={replyData.replyId} data={replyData} />
         ))
      )
   }

   render() {
      const { renderRepies } = this
      return <StyledContainer>{renderRepies()}</StyledContainer>
   }
}

export default RepliesList
