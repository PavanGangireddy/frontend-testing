import React, { ReactNode } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'mobx-react'

import ChromeBannerUIStore from '../../../Common/stores/ChromeBannerUIStore'

import ListService from '../../services/ListService/index.fixture'
import SectionService from '../../services/SectionService/index.fixture'
import CardService from '../../services/CardService/index.fixture'
import getWorkbookDetailsAPIResponse from '../../fixtures/getWorkbookDetailsAPIResponse.json'
import getWorkbookChildDetailsResponse from '../../fixtures/getWorkbookChildDetailsAPIResponse.json'
import PageFixture from '../../services/PageService/index.fixture'
import EvaluationPageFixture from '../../services/Evaluation/PageService/index.fixture'
import BaseModel from '../../stores/models/BaseModel'
import PageModel from '../../stores/models/PageModel'
import WorkbookChildDetailsModel from '../../stores/models/WorkbookChildDetailsModel'
import WorkbookModel from '../../stores/models/WorkbookModel'

import WorkbookComponent from '.'

const { page: activePageDetails } = getWorkbookDetailsAPIResponse
const activePageWithZeroLists = { ...activePageDetails }
activePageWithZeroLists.lists = []
const { total_pages: totalPagesData } = getWorkbookDetailsAPIResponse

const pageService = new PageFixture()
const listService = new ListService()
const sectionService = new SectionService()
const cardService = new CardService()
const evaluationPageService = new EvaluationPageFixture()
const activePageModel = new PageModel(
   activePageDetails,
   pageService,
   listService,
   sectionService,
   cardService,
   evaluationPageService
)

const totalPages = totalPagesData.map(page => {
   const { page_id: id, page_name: name } = page
   return new BaseModel({ id, name })
})

const workbookChildDetails = new WorkbookChildDetailsModel(
   getWorkbookChildDetailsResponse
)

const workbookDetails = new WorkbookModel(getWorkbookDetailsAPIResponse)

const getPageDetailsMockSuccessAPI = (): Function => {
   const mockSuccessPromise = new Promise((resolve): void => {
      resolve(activePageDetails)
   })
   const mockGetPageDetailsAPI = jest.fn()
   mockGetPageDetailsAPI.mockReturnValue(mockSuccessPromise)
   return mockGetPageDetailsAPI
}

const renderWorkbookComponent = (
   createPageAPI,
   createPageAPIStatus,
   getPageDetails,
   getPageDetailsAPIStatus,
   chromeBannerUIStore
): ReactNode => (
   <Router history={createMemoryHistory()}>
      <Provider chromeBannerUIStore={chromeBannerUIStore}>
         <WorkbookComponent
            id={'1'}
            totalPages={totalPages}
            activePageDetails={activePageModel}
            updatePageObjectiveWithDescriptionAPI={(): void => {}}
            getWorkbookDetails={(): void => {}}
            mergeCardsAPI={(): void => {}}
            mergeCardsAPIStatus={200}
            mergeCardsAPIError={null}
            getWorkbookChildDetailsAPI={(): void => {}}
            getWorkbookChildDetailsAPIStatus={200}
            getWorkbookChildDetailsAPIError={null}
            getMoveWorkbooksAndFoldersAPI={(): void => {}}
            getMoveWorkbooksAndFoldersStatus={200}
            getMoveWorkbooksAndFoldersError={null}
            moveActiveFolderInfo={[]}
            workbookChildDetails={workbookChildDetails}
            getRootFolderDetailsAPI={(): void => {}}
            getRootFolderDetailsAPIStatus={200}
            getRootFolderDetailsAPIError={null}
            rootFolderId={''}
            workbookDetails={workbookDetails}
            createPageAPI={createPageAPI}
            getPageDetails={getPageDetails}
            getPageDetailsAPIStatus={getPageDetailsAPIStatus}
            getPageDetailsAPIError={null}
            createPageAPIStatus={createPageAPIStatus}
            reorderPageAPI={(): void => {}}
            reorderPage={(): void => {}}
            movePageAPI={(): void => {}}
            movePageAPIStatus={200}
            movePageAPIError={null}
            createPageAPIError={null}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
            updatePageName={(): void => {}}
            clearStore={(): void => {}}
            updatePageObjectiveWithDescriptionAPIStatus={200}
         />
      </Provider>
   </Router>
)

//FIXME: Write test cases util to handle >1024 width
describe.skip('Workbook Component tests', () => {
   let chromeBannerUIStore
   beforeEach(() => {
      chromeBannerUIStore = new ChromeBannerUIStore()
   })
   it('should test page details loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      const mockGetPageDetailsAPI = jest.fn()
      mockGetPageDetailsAPI.mockReturnValue(mockLoadingPromise)
      const { getAllByTestId, getByTestId } = render(
         renderWorkbookComponent(
            (): void => {},
            200,
            mockGetPageDetailsAPI,
            100,
            chromeBannerUIStore
         )
      )

      const pages = getAllByTestId('pageButton')
      fireEvent.click(pages[0])
      getByTestId('loader')
      expect(mockGetPageDetailsAPI).toBeCalled()
   })

   it('should test page details failure state', () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(new Error('Error is not shown'))
      }).catch(() => {})
      const mockGetPageDetailsAPI = jest.fn()
      mockGetPageDetailsAPI.mockReturnValue(mockFailurePromise)
      const { getAllByTestId, getByTestId, getByText } = render(
         renderWorkbookComponent(
            (): void => {},
            200,
            mockGetPageDetailsAPI,
            400,
            chromeBannerUIStore
         )
      )

      const pages = getAllByTestId('pageButton')
      fireEvent.click(pages[0])
      getByTestId('retryButton')
      getByTestId('failureMessage')
      getByText(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockGetPageDetailsAPI).toBeCalled()
   })

   it('should test page details success state', () => {
      const { getAllByTestId, getByText } = render(
         renderWorkbookComponent(
            (): void => {},
            200,
            getPageDetailsMockSuccessAPI,
            200,
            chromeBannerUIStore
         )
      )

      const pages = getAllByTestId('pageButton')
      fireEvent.click(pages[0])
      const {
         page_objective: pageObjective,
         page_description: pageDescription,
         lists
      } = activePageDetails
      getByText(pageObjective)
      getByText(pageDescription)
      expect(getAllByTestId('pageList').length).toBe(lists.length)
   })

   it('should test page header toggle functionality', () => {
      const { getAllByTestId, getByTestId, getByText, queryByText } = render(
         renderWorkbookComponent(
            (): void => {},
            200,
            getPageDetailsMockSuccessAPI,
            200,
            chromeBannerUIStore
         )
      )

      const pages = getAllByTestId('pageButton')
      const pageObjectiveAndDescriptionToggleButton = getByTestId(
         'pageTitleAndDescriptionToggleButton'
      )
      fireEvent.click(pages[0])
      const {
         page_objective: pageObjective,
         page_description: pageDescription
      } = activePageDetails
      getByText(pageObjective)
      getByText(pageDescription)
      fireEvent.click(pageObjectiveAndDescriptionToggleButton)
      expect(queryByText(pageObjective)).toBe(null)
      expect(queryByText(pageDescription)).toBe(null)
      fireEvent.click(pageObjectiveAndDescriptionToggleButton)
      getByText(pageObjective)
      getByText(pageDescription)
   })

   it('should test page rename success state', () => {
      const { getByTestId, getByText } = render(
         renderWorkbookComponent(
            (): void => {},
            200,
            getPageDetailsMockSuccessAPI,
            200,
            chromeBannerUIStore
         )
      )

      const pageNameInputElement = getByTestId('pageNameInputContent')
      fireEvent.click(pageNameInputElement)
      const pageNameInput = getByTestId('pageNameInput')
      const newPageName = 'Sample Page Name'
      fireEvent.change(pageNameInput, { target: { value: newPageName } })
      pageNameInput.blur()
      getByText(newPageName)
   })

   it('should test create page loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      const mockCreatePageAPI = jest.fn()
      mockCreatePageAPI.mockReturnValue(mockLoadingPromise)
      const { getByTestId } = render(
         renderWorkbookComponent(
            mockCreatePageAPI,
            100,
            getPageDetailsMockSuccessAPI,
            200,
            chromeBannerUIStore
         )
      )

      fireEvent.click(getByTestId('addPageButton'))
      expect(getByTestId('addPageButton').disabled).toBe(true)
   })

   it('should test cancel add list', () => {
      const { getAllByTestId, getByTestId, queryByTestId } = render(
         renderWorkbookComponent(
            (): void => {},
            100,
            getPageDetailsMockSuccessAPI,
            200,
            chromeBannerUIStore
         )
      )

      fireEvent.click(getAllByTestId('pageListAddButton')[0])
      fireEvent.click(getByTestId('addListCancelButton'))
      expect(queryByTestId('addListCancelButton')).toBe(null)
   })

   it('should test cancel add section', () => {
      const { getAllByTestId, getByTestId, queryByTestId } = render(
         renderWorkbookComponent(
            (): void => {},
            100,
            getPageDetailsMockSuccessAPI,
            200,
            chromeBannerUIStore
         )
      )

      fireEvent.click(getAllByTestId('listAddSectionButton')[0])
      fireEvent.click(getByTestId('addSectionCloseButton'))
      expect(queryByTestId('addSectionCloseButton')).toBe(null)
   })

   it('should test cancel add card', () => {
      const { getAllByTestId, getByTestId, queryByTestId } = render(
         renderWorkbookComponent(
            (): void => {},
            100,
            getPageDetailsMockSuccessAPI,
            200,
            chromeBannerUIStore
         )
      )

      fireEvent.click(getAllByTestId('sectionAddCardButton')[0])
      fireEvent.click(getByTestId('addCardCloseButton'))
      expect(queryByTestId('addCardCloseButton')).toBe(null)
   })

   it('should select multiple cards', () => {
      const { getAllByTestId, getByText, getByTestId } = render(
         renderWorkbookComponent(
            (): void => {},
            100,
            getPageDetailsMockSuccessAPI,
            200,
            chromeBannerUIStore
         )
      )

      const cards = getAllByTestId('sectionCard')
      fireEvent.mouseOver(cards[0])
      fireEvent.click(getAllByTestId('cardSelectBox')[0])
      fireEvent.mouseOver(cards[1])
      fireEvent.click(getAllByTestId('cardSelectBox')[1])
      fireEvent.mouseOver(cards[2])
      fireEvent.click(getAllByTestId('cardSelectBox')[2])
      getByText('3 Selected')
      getByTestId('mergeCardsButton')
   })

   // FIXME: Need to fix this test case - intersectionObserver error
   it.skip('should render merge cards loader', () => {
      const { getAllByTestId, getByTestId } = render(
         renderWorkbookComponent(
            (): void => {},
            100,
            getPageDetailsMockSuccessAPI,
            200,
            chromeBannerUIStore
         )
      )

      const cards = getAllByTestId('sectionCard')
      fireEvent.mouseOver(cards[0])
      fireEvent.click(getAllByTestId('cardSelectBox')[0])
      fireEvent.mouseOver(cards[1])
      fireEvent.click(getAllByTestId('cardSelectBox')[1])
      fireEvent.click(getByTestId('mergeCardsButton'))
      getByTestId('loader')
   })
})
