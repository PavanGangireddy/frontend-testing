import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import CreateNewDiscussion from '.'
// TODO: need to write test cases

describe('create new Discussion tets', () => {
   const updateDiscussion = jest.fn()
   let getElementByTestId
   let queryAllElementsByTestId
   let debugCode
   beforeEach(() => {
      const { getByTestId, queryAllByTestId, debug } = render(
         <Router history={createMemoryHistory()}>
            <CreateNewDiscussion
               generateNewDiscussionFn={updateDiscussion}
               apiStatus={200}
            />
         </Router>
      )
      getElementByTestId = getByTestId
      queryAllElementsByTestId = queryAllByTestId
      debugCode = debug
   })

   it('should render new discussion modal when we click new Thread button', () => {
      const newThread = getElementByTestId('newDiscussionButton')
      fireEvent.click(newThread)
      getElementByTestId('updateDiscussionCloseButton')
      getElementByTestId('updateDiscussionCancelButton')
      getElementByTestId('updateDiscussionPostButton')
   })

   it('should close new Discussion model when we click cancel Button', () => {
      const newThread = getElementByTestId('newDiscussionButton')
      fireEvent.click(newThread)
      const cancelButton = getElementByTestId('updateDiscussionCancelButton')
      // fireEvent.click(cancelButton)
   })

   it('should render entered title in and description in create new discussion', () => {
      const sampleTitle = 'Sample-title'
      const sampleDiscussion = 'sample discussion'
      const newThread = getElementByTestId('newDiscussionButton')
      fireEvent.click(newThread)
      const titleInputField = getElementByTestId('updateDiscussionTitle')
      fireEvent.change(titleInputField, { target: { value: sampleTitle } })
      expect(titleInputField.value).toBe(sampleTitle)
      // const InputField = getElementByTestId('updateDiscussionTitle')
      // fireEvent.change(titleInputField, { target: { value: sampleTitle } })
      // expect(titleInputField.value).toBe(sampleTitle)
      debugCode()
   })
})
