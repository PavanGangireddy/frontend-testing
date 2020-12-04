import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import getTaskSpecificDiscussions from '../../fixtures/getTaskSpecficDiscussions.json'

import DiscussionsView from '.'

const cardId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

const { discussions } = getTaskSpecificDiscussions

describe('Discussions View tests', () => {
   const { getByTestId, getAllByTestId, getByText } = render(
      <Router history={createMemoryHistory()}>
         <DiscussionsView entityId={cardId} entityType={'CARD'} />
      </Router>
   )

   it('should render discussion view', async () => {
      getByTestId('newDiscussionButton')
      getByTestId('loader')
      //   await waitFor(() => {
      //      expect(getAllByTestId('discussionReplyButton').length).toBe(
      //         discussions.length
      //      )
      //      // getByText("We're having some trouble completing your request. Please try again.")
      //   })
   })
})
