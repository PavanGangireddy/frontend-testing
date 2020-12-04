import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import CommentModal from '../../stores/models/Comment'
import getDiscussionSpecificComments from '../../fixtures/getDiscussionSpecficComments.json'
import DiscussionsService from '../../services/DiscussionsService/index.fixture'

import Comment from '.'

const { comments } = getDiscussionSpecificComments
const deleteCommentFn = jest.fn()
const dataObject = {
   apiService: new DiscussionsService(),
   deleteCommentFn
}
const comment = new CommentModal(dataObject, comments[0])

describe('Discussion tests', () => {
   let getElementByTestId
   let getElementByPlaceholderText
   let queryElementByTestId
   let getElementByText
   let debugCode
   const refreshFn = jest.fn()
   beforeEach(() => {
      const {
         getByTestId,
         queryByTestId,
         getByPlaceholderText,
         getByText,
         debug
      } = render(
         <Router history={createMemoryHistory()}>
            <Comment data={comment} />
         </Router>
      )
      getElementByTestId = getByTestId
      queryElementByTestId = queryByTestId
      getElementByPlaceholderText = getByPlaceholderText
      getElementByText = getByText
      debugCode = debug
   })

   // TODO: need to rite test cases for this file

   it('should render discussion data', () => {
      expect(getElementByTestId('commentDescription').innerHTML).toBe(
         comments[0].comment_content
      )
      // expect(getElementByTestId('commentShowHideButtonText').innerHTML).toBe(
      //    'showReplies'
      // )
      // expect(getElementByTestId('discussionDescription').innerHTML).toBe(
      //    comment.description
      // )
   })

   // it('should render pop over menu items when we click pop over menu', () => {
   //    const popOverMenu = getElementByTestId('discussionPopOver')
   //    fireEvent.click(popOverMenu)
   //    getElementByTestId('discussionEditMenu')
   //    getElementByTestId('discussionDeleteMenu')
   // })

   // it('should render edit discussion modal with old data when e click edit', () => {
   //    const popOverMenu = getElementByTestId('discussionPopOver')
   //    fireEvent.click(popOverMenu)
   //    const editDiscussion = getElementByTestId('discussionEditMenu')
   //    fireEvent.click(editDiscussion)
   //    expect(getElementByTestId('updateDiscussionTitle').value).toBe(
   //       discussion.title
   //    )
   //    //   getElementByText(discussion.description)
   // })

   // it('should render delete pop up  when we click delete pop up menu', () => {
   //    const popOverMenu = getElementByTestId('discussionPopOver')
   //    fireEvent.click(popOverMenu)
   //    const deleteDiscussion = getElementByTestId('discussionDeleteMenu')
   //    fireEvent.click(deleteDiscussion)
   //    getElementByTestId('customPopUpCloseButton')
   //    getElementByTestId('customPopUpCancelButton')
   //    getElementByTestId('customPopUpSubmitButton')
   // })

   // it('should close delete pop up  hen we click x in pop up model', async () => {
   //    const popOverMenu = getElementByTestId('discussionPopOver')
   //    fireEvent.click(popOverMenu)
   //    const deleteDiscussion = getElementByTestId('discussionDeleteMenu')
   //    fireEvent.click(deleteDiscussion)
   //    let closeDeleteDiscussion
   //    await waitFor(() => {
   //       closeDeleteDiscussion = getElementByTestId('customPopUpCloseButton')
   //    })
   //    fireEvent.click(closeDeleteDiscussion)
   //    expect(queryElementByTestId('customPopUpCloseButton')).toBeNull()
   // })

   // it('should close delete pop up  when we click cancel delete pop up model', async () => {
   //    const popOverMenu = getElementByTestId('discussionPopOver')
   //    fireEvent.click(popOverMenu)
   //    const deleteDiscussion = getElementByTestId('discussionDeleteMenu')
   //    fireEvent.click(deleteDiscussion)
   //    let cancelDeleteDiscussion
   //    await waitFor(() => {})
   //    cancelDeleteDiscussion = getElementByTestId('customPopUpCancelButton')
   //    fireEvent.click(cancelDeleteDiscussion)
   //    expect(queryElementByTestId('customPopUpCancelButton')).toBeNull()
   // })

   //    it('should close delete pop up  when we click delete button in delete pop up model', async () => {
   //       const popOverMenu = getElementByTestId('discussionPopOver')
   //       fireEvent.click(popOverMenu)
   //       const deleteDiscussion = getElementByTestId('discussionDeleteMenu')
   //       fireEvent.click(deleteDiscussion)
   //       let confirmDeleteDiscussion
   //       await waitFor(() => {})
   //       confirmDeleteDiscussion = getElementByTestId('customPopUpSubmitButton')
   //       fireEvent.click(confirmDeleteDiscussion)
   //       await waitFor(() => {})
   //       expect(queryElementByTestId('customPopUpCancelButton')).toBeNull()
   //       expect(queryElementByTestId('discussionTitle')).toBeNull()
   //    })
})
