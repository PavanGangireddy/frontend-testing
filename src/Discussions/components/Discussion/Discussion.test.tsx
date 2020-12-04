import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import DiscussionModal from '../../stores/models/Discussion'
import getTaskSpecificDiscussions from '../../fixtures/getTaskSpecficDiscussions.json'

import Discussion from '.'

const { discussions } = getTaskSpecificDiscussions
const discussion = new DiscussionModal(discussions[0])

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
            <Discussion data={discussion} refreshFn={refreshFn} />
         </Router>
      )
      getElementByTestId = getByTestId
      queryElementByTestId = queryByTestId
      getElementByPlaceholderText = getByPlaceholderText
      getElementByText = getByText
      debugCode = debug
   })

   it('should render discussion data', () => {
      expect(getElementByTestId('discussionTitle').innerHTML).toBe(
         discussion.title
      )
      expect(getElementByTestId('discussionDescription').innerHTML).toBe(
         discussion.description
      )
   })

   it('should render pop over menu items when we click pop over menu', () => {
      const popOverMenu = getElementByTestId('discussionPopOver')
      fireEvent.click(popOverMenu)
      getElementByTestId('discussionEditMenu')
      getElementByTestId('discussionDeleteMenu')
   })

   it('should render edit discussion modal with old data when e click edit', () => {
      const popOverMenu = getElementByTestId('discussionPopOver')
      fireEvent.click(popOverMenu)
      const editDiscussion = getElementByTestId('discussionEditMenu')
      fireEvent.click(editDiscussion)
      expect(getElementByTestId('updateDiscussionTitle').value).toBe(
         discussion.title
      )
      //   getElementByText(discussion.description)
   })

   it('should render delete pop up  when we click delete pop up menu', () => {
      const popOverMenu = getElementByTestId('discussionPopOver')
      fireEvent.click(popOverMenu)
      const deleteDiscussion = getElementByTestId('discussionDeleteMenu')
      fireEvent.click(deleteDiscussion)
      getElementByTestId('customPopUpCloseButton')
      getElementByTestId('customPopUpCancelButton')
      getElementByTestId('customPopUpSubmitButton')
   })

   it.skip('should close delete pop up  hen we click x in pop up model', async () => {
      const popOverMenu = getElementByTestId('discussionPopOver')
      fireEvent.click(popOverMenu)
      const deleteDiscussion = getElementByTestId('discussionDeleteMenu')
      fireEvent.click(deleteDiscussion)
      let closeDeleteDiscussion
      await waitFor(() => {
         closeDeleteDiscussion = getElementByTestId('customPopUpCloseButton')
      })
      fireEvent.click(closeDeleteDiscussion) //FIXME:initial Focus error
      expect(queryElementByTestId('customPopUpCloseButton')).toBeNull()
   })

   //    it('should close delete pop up  when we click cancel delete pop up model', async () => {
   //       const popOverMenu = getElementByTestId('discussionPopOver')
   //       fireEvent.click(popOverMenu)
   //       const deleteDiscussion = getElementByTestId('discussionDeleteMenu')
   //       fireEvent.click(deleteDiscussion)
   //       let cancelDeleteDiscussion
   //       await waitFor(() => {})
   //       cancelDeleteDiscussion = getElementByTestId('customPopUpCancelButton')
   //       fireEvent.click(cancelDeleteDiscussion)
   //       expect(queryElementByTestId('customPopUpCancelButton')).toBeNull()
   //    })

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
