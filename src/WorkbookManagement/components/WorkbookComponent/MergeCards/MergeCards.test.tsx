import React, { ReactNode } from 'react'
import { render, fireEvent } from '@testing-library/react'

import getWorkBookDetails from '../../../fixtures/getWorkbookDetailsAPIResponse.json'
import multipleCardsDetailsResponse from '../../../fixtures/getMultipleCardDetails.json'
import WorkbookModel from '../../../stores/models/WorkbookModel'
import CardService from '../../../services/CardService/index.fixture'
import CardModel from '../../../stores/models/CardModel'

import MergeCards from '.'

const {
   page: { lists: activePageListsData }
} = getWorkBookDetails
const { sections } = activePageListsData[0]
const { cards: cardsData } = sections[0]

const cardService = new CardService()
const cardModels = cardsData.map(card => new CardModel(card, null, cardService))
const selectedCards = cardModels.slice(0, 4)
const { card_details: multipleCardsDetails } = multipleCardsDetailsResponse
const cardsDetails: Array<CardModel> = []
multipleCardsDetails.forEach(cardDetails => {
   const {
      card_id: id,
      card_title: name,
      notes,
      attachments,
      priority,
      label,
      due_datetime: dueDateAndTime
   } = cardDetails
   const hasNotes = notes ? true : false
   const hasAttachments = attachments.length > 0 ? true : false
   const minimalCardDetails = {
      card_id: id,
      card_title: name,
      has_notes: hasNotes,
      has_attachments: hasAttachments,
      priority,
      label
   }
   const extraCardDetails = {
      card_id: id,
      card_title: name,
      notes,
      attachments,
      priority,
      label,
      due_datetime: dueDateAndTime
   }
   const card = new CardModel(minimalCardDetails, extraCardDetails, cardService)
   cardsDetails.push(card)
})
const workbookDetails = new WorkbookModel(getWorkBookDetails)

const getMultipleCardsSuccessAPI = () => {
   const mockSuccessPromise = new Promise((resolve): void => {
      resolve(multipleCardsDetailsResponse)
   })
   const mockGetMultipleCardsDetailsAPI = jest.fn()
   mockGetMultipleCardsDetailsAPI.mockReturnValue(mockSuccessPromise)
   return mockGetMultipleCardsDetailsAPI
}

const renderMergeCards = (
   getMultipleCardDetailsAPI,
   getMultipleCardDetailsAPIStatus,
   getMultipleCardDetailsAPIError,
   onClickCloseButton
): ReactNode => (
   <MergeCards
      workbookId={'1'}
      selectedCards={selectedCards}
      getMultipleCardDetailsAPIStatus={getMultipleCardDetailsAPIStatus}
      getMultipleCardDetailsAPIError={getMultipleCardDetailsAPIError}
      getMultipleCardDetailsAPI={getMultipleCardDetailsAPI}
      cardsDetails={cardsDetails}
      clearSelectedCards={(): void => {}}
      mergeCardsAPI={(): void => {}}
      mergeCardsAPIStatus={200}
      mergeCardsAPIError={null}
      getWorkbookChildDetailsAPI={(): void => {}}
      getWorkbookChildDetailsAPIStatus={200}
      getWorkbookChildDetailsAPIError={null}
      getWorkbooksAndFoldersAPI={(): void => {}}
      getWorkbooksAndFoldersStatus={200}
      getWorkbooksAndFoldersError={null}
      activeFolderInfo={[]}
      workbookChildDetails={{}}
      getActivePageDetails={(): void => {}}
      workbookDetails={workbookDetails}
      getRootFolderDetailsAPI={(): void => {}}
      getRootFolderDetailsAPIStatus={200}
      getRootFolderDetailsAPIError={null}
      onClickCloseButton={onClickCloseButton}
      clearMoveWorkbooksAndFolders={(): void => {}}
      clearWorkbookChildDetails={(): void => {}}
   />
)

// FIXME: need to fix this tests

describe.skip('MergeCards tests', () => {
   it('should render failure state of getting cards details merge cards', () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(new Error('Something went wrong!'))
      }).catch(() => {})
      const mockGetMultipleCardsDetailsAPI = jest.fn()
      mockGetMultipleCardsDetailsAPI.mockReturnValue(mockFailurePromise)

      const { getByTestId, getByText } = render(
         renderMergeCards(
            mockGetMultipleCardsDetailsAPI,
            400,
            'Something went wrong!',
            (): void => {}
         )
      )

      getByText(
         "We're having some trouble completing your request. Please try again."
      )
      getByTestId('retryButton')
   })

   it('should render merge cards', () => {
      const { getByTestId, getAllByText, getByText } = render(
         renderMergeCards(
            getMultipleCardsSuccessAPI(),
            200,
            null,
            (): void => {}
         )
      )

      getByText('Merge cards')
      expect(getAllByText(cardsDetails[0].name).length).toBe(2)
      expect(getAllByText(cardsDetails[1].name).length).toBe(2)
      getByText(cardsDetails[0].cardDetails.notes)
      getByText(cardsDetails[1].cardDetails.notes)
      getAllByText(cardsDetails[0].cardDetails.attachments[0].url)
      const mergeCardsNextButton = getByTestId('mergeCardsNextButton')
      expect(mergeCardsNextButton.disabled).toBe(true)
   })

   it('should test merging title', () => {
      const { getByTestId } = render(
         renderMergeCards(
            getMultipleCardsSuccessAPI(),
            200,
            null,
            (): void => {}
         )
      )

      const leftCardTitleMergeOrUndoButton = getByTestId(
         'leftCardTitleMergeOrUndoButton'
      )
      const rightCardTitleMergeOrUndoButton = getByTestId(
         'rightCardTitleMergeOrUndoButton'
      )
      const mergeCardsTitleInput = getByTestId('mergeCardsTitleInput')
      const mergeCardsNextButton = getByTestId('mergeCardsNextButton')
      fireEvent.click(leftCardTitleMergeOrUndoButton)
      expect(mergeCardsTitleInput.value).toBe(cardsDetails[0].name)
      fireEvent.click(rightCardTitleMergeOrUndoButton)
      expect(mergeCardsTitleInput.value).toBe(
         `${cardsDetails[0].name} ${cardsDetails[1].name}`
      )
      expect(mergeCardsNextButton.disabled).toBe(false)
      fireEvent.click(leftCardTitleMergeOrUndoButton)
      expect(mergeCardsTitleInput.value).toBe(cardsDetails[1].name)
      fireEvent.click(rightCardTitleMergeOrUndoButton)
      expect(mergeCardsTitleInput.value).toBe('')
      expect(mergeCardsNextButton.disabled).toBe(true)
   })

   it('should test merging attachments', () => {
      const { getByTestId, getAllByTestId } = render(
         renderMergeCards(
            getMultipleCardsSuccessAPI(),
            200,
            null,
            (): void => {}
         )
      )

      const leftCardAttachmentsMergeOrUndoButton = getByTestId(
         'leftCardAttachmentsMergeOrUndoButton'
      )
      const rightCardAttachmentsMergeOrUndoButton = getByTestId(
         'rightCardAttachmentsMergeOrUndoButton'
      )
      fireEvent.click(leftCardAttachmentsMergeOrUndoButton)
      let attachments = getAllByTestId('cardAttachment')
      expect(attachments.length).toBe(
         2 * cardsDetails[0].cardDetails.attachments.length +
            cardsDetails[1].cardDetails.attachments.length
      )
      fireEvent.click(rightCardAttachmentsMergeOrUndoButton)
      attachments = getAllByTestId('cardAttachment')
      expect(attachments.length).toBe(
         2 * cardsDetails[0].cardDetails.attachments.length +
            2 * cardsDetails[1].cardDetails.attachments.length
      )
      fireEvent.click(leftCardAttachmentsMergeOrUndoButton)
      attachments = getAllByTestId('cardAttachment')
      expect(attachments.length).toBe(
         cardsDetails[0].cardDetails.attachments.length +
            2 * cardsDetails[1].cardDetails.attachments.length
      )
      fireEvent.click(rightCardAttachmentsMergeOrUndoButton)
      attachments = getAllByTestId('cardAttachment')
      expect(attachments.length).toBe(
         cardsDetails[0].cardDetails.attachments.length +
            cardsDetails[1].cardDetails.attachments.length
      )
   })

   it('should test merging priority', () => {
      const { getByTestId, queryByTestId } = render(
         renderMergeCards(
            getMultipleCardsSuccessAPI(),
            200,
            null,
            (): void => {}
         )
      )

      const leftCardPriorityMergeOrUndoButton = getByTestId(
         'leftCardPriorityMergeOrUndoButton'
      )
      const rightCardPriorityMergeOrUndoButton = getByTestId(
         'rightCardPriorityMergeOrUndoButton'
      )
      fireEvent.click(leftCardPriorityMergeOrUndoButton)
      let mergeCardPriorityTextElement = getByTestId(
         'mergeCardPriorityButtonSelectedText'
      )
      expect(mergeCardPriorityTextElement.textContent).toBe(
         `${cardsDetails[0].cardDetails.priority}`
      )
      fireEvent.click(leftCardPriorityMergeOrUndoButton)
      expect(queryByTestId('mergeCardPriorityButtonSelectedText')).toBe(null)
      fireEvent.click(rightCardPriorityMergeOrUndoButton)
      mergeCardPriorityTextElement = getByTestId(
         'mergeCardPriorityButtonSelectedText'
      )
      expect(mergeCardPriorityTextElement.textContent).toBe(
         `${cardsDetails[1].cardDetails.priority}`
      )
      fireEvent.click(rightCardPriorityMergeOrUndoButton)
      expect(queryByTestId('mergeCardPriorityButtonSelectedText')).toBe(null)
   })

   it('should test selecting multiple cards from all cards', () => {
      const { getByTestId, getAllByTestId, queryByTestId } = render(
         renderMergeCards(
            getMultipleCardsSuccessAPI(),
            200,
            null,
            (): void => {}
         )
      )

      const leftCardTitleMergeOrUndoButton = getByTestId(
         'leftCardTitleMergeOrUndoButton'
      )
      const rightCardTitleMergeOrUndoButton = getByTestId(
         'rightCardTitleMergeOrUndoButton'
      )
      const leftCardPriorityMergeOrUndoButton = getByTestId(
         'leftCardPriorityMergeOrUndoButton'
      )
      const rightCardPriorityMergeOrUndoButton = getByTestId(
         'rightCardPriorityMergeOrUndoButton'
      )
      const mergeCardsTitleInput = getByTestId('mergeCardsTitleInput')
      fireEvent.click(leftCardTitleMergeOrUndoButton)
      fireEvent.click(rightCardTitleMergeOrUndoButton)
      expect(mergeCardsTitleInput.value).toBe(
         `${cardsDetails[0].name} ${cardsDetails[1].name}`
      )
      fireEvent.click(leftCardPriorityMergeOrUndoButton)
      let mergeCardPriorityTextElement = getByTestId(
         'mergeCardPriorityButtonSelectedText'
      )
      expect(mergeCardPriorityTextElement.textContent).toBe(
         `${cardsDetails[0].cardDetails.priority}`
      )
      fireEvent.click(rightCardPriorityMergeOrUndoButton)
      mergeCardPriorityTextElement = getByTestId(
         'mergeCardPriorityButtonSelectedText'
      )
      expect(mergeCardPriorityTextElement.textContent).toBe(
         `${cardsDetails[1].cardDetails.priority}`
      )
      const selectedMergeCardsLeftSection = getByTestId(
         'selectedMergeCardsLeftSection'
      )
      const selectedMergeCardsRightSection = getByTestId(
         'selectedMergeCardsRightSection'
      )
      fireEvent.click(selectedMergeCardsLeftSection)
      let selectedCardsFromDropdown = getAllByTestId('mergeSelectCard')
      fireEvent.click(selectedCardsFromDropdown[2])
      fireEvent.click(selectedMergeCardsRightSection)
      selectedCardsFromDropdown = getAllByTestId('mergeSelectCard')
      fireEvent.click(selectedCardsFromDropdown[3])
      fireEvent.click(leftCardTitleMergeOrUndoButton)
      fireEvent.click(rightCardTitleMergeOrUndoButton)
      expect(mergeCardsTitleInput.value).toBe(
         `${cardsDetails[0].name} ${cardsDetails[1].name} ${cardsDetails[2].name} ${cardsDetails[3].name}`
      )
      fireEvent.click(selectedMergeCardsLeftSection)
      selectedCardsFromDropdown = getAllByTestId('mergeSelectCard')
      fireEvent.click(selectedCardsFromDropdown[0])
      fireEvent.click(leftCardTitleMergeOrUndoButton)
      expect(mergeCardsTitleInput.value).toBe(
         `${cardsDetails[1].name} ${cardsDetails[2].name} ${cardsDetails[3].name}`
      )
   })

   it('should close merge cards', () => {
      const mockCloseFunction = jest.fn()
      const { getByTestId } = render(
         renderMergeCards(
            getMultipleCardsSuccessAPI(),
            200,
            null,
            mockCloseFunction()
         )
      )

      fireEvent.click(getByTestId('mergeCardsCloseButton'))
      expect(mockCloseFunction).toBeCalled()
   })
})
