import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import pageDetailsResponse from '../../fixtures/getPageDetailsResponse.json'

import CardModel from '../../stores/models/CardModel'
import CardFixture from '../../services/CardService/index.fixture'
import workbookDetails from '../../fixtures/getWorkbookDetailsAPIResponse.json'
import cardDetailsResponse from '../../fixtures/getCardDetails.json'
import WorkbookModel from '../../stores/models/WorkbookModel'

import { tabs } from '../CardDetails/constants'

import SectionCard from '.'

const {
   card_id: cardId,
   card_title: cardTitle,
   has_attachments: hasAttachments,
   has_notes: hasNotes
} = pageDetailsResponse.lists[0].sections[0].cards[0]
const cardDetails = pageDetailsResponse.lists[0].sections[0].cards[0]
const cardFixture = new CardFixture()
const cardModel = new CardModel(cardDetails, null, cardFixture)
const { workbook_id, workbook_name, total_pages } = workbookDetails
const workbook = {
   workbook_id,
   workbook_name,
   total_pages
}
const workbookModel = new WorkbookModel(workbook)
let getElementByTestId
let getElementByText
let getAllElementsByTestId
let queryElementByTestId
let getElementByPlaceholderText
let Debug

// NOTE: need to resolve errors in below test cases

// FIXME: need to fix this tests
describe.skip('Section Card Tests', () => {
   beforeEach(() => {
      const {
         getByTestId,
         getByText,
         getAllByTestId,
         queryAllByTestId,
         getByPlaceholderText,
         debug
      } = render(
         <SectionCard
            id={cardId}
            cardName={cardTitle}
            hasAttachments={hasAttachments}
            hasNotes={hasNotes}
            card={cardModel}
            onToggleCardSelection={(id: string) => {}}
            isDisabled={false}
            moveCardAPI={() => {}}
            moveCardAPIStatus={200}
            moveCardAPIError={null}
            getWorkbookChildDetailsAPI={() => {}}
            getWorkbookChildDetailsAPIStatus={200}
            getWorkbookChildDetailsAPIError={null}
            getWorkbooksAndFoldersAPI={() => {}}
            getWorkbooksAndFoldersStatus={200}
            getWorkbooksAndFoldersError={null}
            activeFolderInfo={null}
            workbookChildDetails={() => {}}
            getRootFolderDetailsAPI={() => {}}
            getRootFolderDetailsAPIStatus={200}
            getRootFolderDetailsAPIError={null}
            rootFolderId={'3fa85f64-5717-4562-b3fc-2c963f66afa7'}
            workbookDetails={workbookModel}
            deleteCardAPI={() => {}}
            deleteCardAPIStatus={200}
            deleteCardAPIError={null}
            moveCard={() => {}}
            clearMoveWorkbooksAndFolders={() => {}}
            clearWorkbookChildDetails={() => {}}
         />
      )
      getElementByTestId = getByTestId
      getElementByText = getByText
      getAllElementsByTestId = getAllByTestId
      queryElementByTestId = queryAllByTestId
      getElementByPlaceholderText = getByPlaceholderText
      Debug = debug
      const card = getElementByTestId('sectionCard')
      fireEvent.click(card)
   })

   // TODO: Need to resolve the failed test case
   it.skip('should render card details modal with card Details', async () => {
      const { card_title: title } = cardDetailsResponse
      await waitFor(() => {
         getElementByText(title)
         const priorityList = getAllElementsByTestId('priority')
         expect(priorityList.length).toBe(6)
         const colorLabelList = getAllElementsByTestId('colorLabel')
         expect(colorLabelList.length).toBe(10)
         getElementByTestId('cardDetailsDeleteLabelButton')
         getElementByTestId('cardDetailsDeletePriorityButton')
         getElementByTestId('cardDetailsDeleteDateButton')
      })
   })

   it('should close card details model when we click x button', async () => {
      let cardDetailsCloseButton
      await waitFor(() => {
         cardDetailsCloseButton = getElementByTestId('cardDetailsCloseButton')
      })
      fireEvent.click(cardDetailsCloseButton)
      expect(queryElementByTestId('cardDetailsCloseButton')).toEqual([])
   })

   it('should test whether card title is changing or not', async () => {
      await waitFor(() => {
         const sampleCardTitle = 'Sample Card Title'
         const cardContent = getElementByTestId('cardTitleInputContent')
         fireEvent.click(cardContent)
         const cardTitleInput = getElementByTestId('cardTitleInput')
         fireEvent.change(cardTitleInput, {
            target: { value: sampleCardTitle }
         })
         expect(cardTitleInput.value).toBe(sampleCardTitle)
      })
   })

   it('should test whether pop over menu options are visible or not', async () => {
      let popOverMenu
      await waitFor(() => {
         popOverMenu = getElementByTestId('cardDetailsMoreOptionsButton')
      })
      fireEvent.click(popOverMenu)
      getElementByTestId('moveCardMenuItem')
      getElementByTestId('deleteCardMenuItem')
   })

   it('should test whether add attachment screen is visible or not', async () => {
      await waitFor(() => {
         const attachmentUrl = 'https://www.google.com'
         const addAttachmentAddButton = getElementByTestId(
            'addAttachmentAddButton'
         )
         fireEvent.click(addAttachmentAddButton)
         const addAttachmentInput = getElementByTestId('addAttachmentInput')
         fireEvent.change(addAttachmentInput, {
            target: { value: attachmentUrl }
         })
         expect(addAttachmentInput.value).toBe(attachmentUrl)
      })
   })

   it('should test whether move card modal are visible or not', async () => {
      let popOverMenu
      await waitFor(() => {
         popOverMenu = getElementByTestId('cardDetailsMoreOptionsButton')
      })
      fireEvent.click(popOverMenu)
      const moveCardButton = getElementByTestId('moveCardMenuItem')
      // fireEvent.click(moveCardButton)
      // await waitFor(() => {
      // })
   })

   it('should test whether delete card modal are visible or not', async () => {
      let popOverMenu
      await waitFor(() => {
         popOverMenu = getElementByTestId('cardDetailsMoreOptionsButton')
      })
      fireEvent.click(popOverMenu)
      getElementByTestId('deleteCardMenuItem')
   })

   it('should delete card when we click delete card in custom popup', async () => {
      let popOverMenu
      await waitFor(() => {
         popOverMenu = getElementByTestId('cardDetailsMoreOptionsButton')
      })
      fireEvent.click(popOverMenu)
      const deleteCardButton = getElementByTestId('deleteCardMenuItem')
      fireEvent.click(deleteCardButton)
      const deleteButton = getElementByTestId('customPopUpSubmitButton')
      fireEvent.click(deleteButton)
      // await waitFor(() => {
      //    expect(queryElementByTestId('customPopUpSubmitButton')).toEqual([])
      // })
   })

   it('should check whether card attachments are visible or not', async () => {
      await waitFor(() => {
         const { attachments } = cardDetailsResponse
         const cardAttachment = getAllElementsByTestId('cardAttachment')
         expect(cardAttachment.length).toBe(attachments.length)
      })
   })

   it('should render changed url', async () => {
      let attachmentEditButtonsList
      await waitFor(() => {
         attachmentEditButtonsList = getAllElementsByTestId(
            'attachmentEditButton'
         )
      })
      fireEvent.click(attachmentEditButtonsList[0])
      const updatedURL = 'https://www.github.com'
      const attachmentURLInput = getElementByTestId('attachmentURLInput')
      fireEvent.change(attachmentURLInput, { target: { value: updatedURL } })
      expect(attachmentURLInput.value).toBe(updatedURL)
   })

   it('should test whether card attachments are delete pop up is visible or not', async () => {
      let attachmentDeleteButton
      await waitFor(() => {
         attachmentDeleteButton = getAllElementsByTestId(
            'attachmentDeleteButton'
         )
      })
      fireEvent.click(attachmentDeleteButton[0])
      getElementByTestId('customPopUpCancelButton')
      const deleteCardButton = getElementByTestId('customPopUpSubmitButton')
      fireEvent.click(deleteCardButton)
      await waitFor(() => {
         expect(queryElementByTestId('customPopUpSubmitButton')).toEqual([])
      })
   })

   it('should close delete attachments popup when we click cancel button', async () => {
      let attachmentDeleteButton
      await waitFor(() => {
         attachmentDeleteButton = getAllElementsByTestId(
            'attachmentDeleteButton'
         )
      })
      fireEvent.click(attachmentDeleteButton[0])
      const cancelButton = getElementByTestId('customPopUpCancelButton')
      fireEvent.click(cancelButton)
      expect(queryElementByTestId('customPopUpCancelButton')).toEqual([])
   })

   it('should  delete attachment when we click delete button in custom pop up', async () => {
      let attachmentDeleteButton
      await waitFor(() => {
         attachmentDeleteButton = getAllElementsByTestId(
            'attachmentDeleteButton'
         )
      })
      fireEvent.click(attachmentDeleteButton[0])
      const deleteButton = getElementByTestId('customPopUpSubmitButton')
      fireEvent.click(deleteButton)
      await waitFor(() => {
         expect(queryElementByTestId('customPopUpSubmitButton')).toEqual([])
      })
   })

   it('should close delete attachment pop up when we click x button', async () => {
      let attachmentDeleteButton
      await waitFor(() => {
         attachmentDeleteButton = getAllElementsByTestId(
            'attachmentDeleteButton'
         )
      })
      fireEvent.click(attachmentDeleteButton[0])
      const closeDeleteButton = getElementByTestId('customPopUpCloseButton')
      fireEvent.click(closeDeleteButton)
      expect(queryElementByTestId('customPopUpSubmitButton')).toEqual([])
   })

   it('should test whether details of selected discussions tab', async () => {
      let discussions
      await waitFor(() => {
         discussions = getElementByTestId(tabs[0].value)
      })
      fireEvent.click(discussions)
      getElementByTestId('newDiscussionButton')
   })

   it('should render selected date', async () => {
      const updatedDate = 'August 26, 2020 12:00 AM'
      await waitFor(() => {
         getElementByTestId('reactDateTimePicker')
      })
      const dateTimeInput = getElementByPlaceholderText('Select Date and Time')
      fireEvent.change(dateTimeInput, { target: { value: updatedDate } })
   })

   it('should render editable text editor', async () => {
      let notesEditor
      await waitFor(() => {
         notesEditor = getElementByTestId('editableTextEditor')
      })
      fireEvent.click(notesEditor)
      getElementByTestId('cardNotesCancelButton')
      getElementByTestId('cardNotesSaveButton')
   })

   it('should close editable text editor when we click close button', async () => {
      let notesEditor
      await waitFor(() => {
         notesEditor = getElementByTestId('editableTextEditor')
      })
      fireEvent.click(notesEditor)
      const notesCloseButton = getElementByTestId('cardNotesCancelButton')
      fireEvent.click(notesCloseButton)
      expect(queryElementByTestId('cardNotesCancelButton')).toEqual([])
   })

   // it('should test whether details of selected checklist tab', async () => {
   //    let checkList
   //    await waitFor(() => {
   //       checkList = getElementByTestId('CHECKLIST')
   //    })
   //    fireEvent.click(checkList)
   //    getElementByTestId('loader')
   // })
})
