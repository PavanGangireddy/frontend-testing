import React, { Component } from 'react'
import { observer } from 'mobx-react'

import DiscussionModal from '../../stores/models/Discussion'

import Discussion from '../Discussion'

import { StyledContainer } from './styledComponents'

interface DiscussionsListProps {
   fetchedData: DiscussionModal[]
   refreshFn: () => void
   shouldDisableActions?: boolean
}

@observer
class DiscussionsList extends Component<DiscussionsListProps> {
   renderDiscussions = () => {
      const { fetchedData, refreshFn } = this.props
      return fetchedData.map(discussionData => (
         <Discussion
            key={discussionData.discussionId}
            refreshFn={refreshFn}
            data={discussionData}
         />
      ))
   }

   render() {
      const { renderDiscussions } = this
      const { shouldDisableActions } = this.props
      return (
         <StyledContainer shouldDisablePointerEvents={shouldDisableActions}>
            {renderDiscussions()}
         </StyledContainer>
      )
   }
}

export default DiscussionsList
