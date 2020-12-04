import React, { ReactNode } from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import DashboardFixture from '../../../FolderManagement/services/DashboardService/index.fixture'
import PublishFixture from '../../../FolderManagement/services/PublishService/index.fixture'
import DashboardStore from '../../../FolderManagement/stores/DashboardStore'
import workbookChildDetails from '../../../WorkbookManagement/fixtures/getWorkbookChildDetailsAPIResponse.json'
import getFolderWorkbookDetails from '../../../FolderManagement/fixtures/getWorkbooksAndFolders.json'
import getRootFolderDetails from '../../../FolderManagement/fixtures/getRootFolderDetails.json'
import UserFixture from '../../../UserProfile/services/UserService/index.fixture'
import UserStore from '../../../UserProfile/stores/UserStore'
import AssignmentsFixture from '../../../FolderManagement/services/AssignmentsService/index.fixture'

import getWorkbookDetailsAPIResponse from '../../fixtures/getWorkbookDetailsAPIResponse.json'
import createPageAPIResponse from '../../fixtures/createPageResponse.json'
import createSectionResponse from '../../fixtures/createSectionResponse.json'
import createCardResponse from '../../fixtures/createCardResponse.json'
import WorkbookFixture from '../../services/WorkbookService/index.fixture'
import WorkbookStore from '../../stores/WorkbookStore'
import PageService from '../../services/PageService/index.fixture'
import ListService from '../../services/ListService/index.fixture'
import SectionService from '../../services/SectionService/index.fixture'
import CardService from '../../services/CardService/index.fixture'
import EvaluationWorkbookService from '../../services/Evaluation/WorkbookService/index.fixture'
import EvaluationPageService from '../../services/Evaluation/PageService/index.fixture'
import LearningsFixture from '../../../FolderManagement/services/LearningsService/index.fixture'

import WorkbookHomeRoute from '.'

let workbookStore,
   workbookService,
   dashboardService,
   dashboardStore,
   userService,
   userStore,
   publishFixture,
   assignmentsService,
   learningsService

const pageService = new PageService()
const listService = new ListService()
const sectionService = new SectionService()
const cardService = new CardService()
const evaluationWorkbookService = new EvaluationWorkbookService()
const evaluationPageService = new EvaluationPageService()

const {
   page: activePageDetails,
   total_pages: totalPages
} = getWorkbookDetailsAPIResponse

const setWorkbookDetailsSuccessAPI = (): void => {
   const mockSuccessPromise = new Promise((resolve): void =>
      resolve(getWorkbookDetailsAPIResponse)
   )
   workbookService.getWorkbookDetailsAPI = jest.fn(() => mockSuccessPromise)
}

const setMockSuccessRootFolderDetails = (): void => {
   const mockSuccessPromise = new Promise((resolve): void => {
      resolve(getRootFolderDetails)
   })
   const mockGetMoveRootFolderDetailsAPI = jest.fn()
   mockGetMoveRootFolderDetailsAPI.mockReturnValue(mockSuccessPromise)
   dashboardService.getMoveRootFolderDetailsAPI = mockGetMoveRootFolderDetailsAPI
}

const setMockSuccessFolderDetails = (): void => {
   const mockSuccessPromise = new Promise((resolve): void => {
      resolve(getFolderWorkbookDetails)
   })
   const mockGetMoveFolderDetailsAPI = jest.fn()
   mockGetMoveFolderDetailsAPI.mockReturnValue(mockSuccessPromise)
   dashboardService.getMoveWorkbooksAndFoldersAPI = mockGetMoveFolderDetailsAPI
}

const setMockSuccessWorkbookChildDetails = (): void => {
   const mockSuccessPromise = new Promise((resolve): void => {
      resolve(workbookChildDetails)
   })
   const mockGetMoveWorkbookDetailsAPI = jest.fn()
   mockGetMoveWorkbookDetailsAPI.mockReturnValue(mockSuccessPromise)
   workbookService.getWorkbookChildDetailsAPI = mockGetMoveWorkbookDetailsAPI
}

const selectPage = (getAllByText): void => {
   fireEvent.focus(getAllByText('Select')[0])
   fireEvent.keyDown(getAllByText('Select')[0], {
      key: 'ArrowDown',
      code: 40
   })
   const selectPages = getAllByText('Page 1')
   fireEvent.click(selectPages[selectPages.length - 1])
}

const selectList = (getAllByText): void => {
   fireEvent.focus(getAllByText('Select')[0])
   fireEvent.keyDown(getAllByText('Select')[0], {
      key: 'ArrowDown',
      code: 40
   })
   const selectLists = getAllByText('List 1')
   fireEvent.click(selectLists[selectLists.length - 1])
}

const renderWorkbookHomeRoute = (): ReactNode => (
   <Router history={createMemoryHistory()}>
      <WorkbookHomeRoute
         workbookStore={workbookStore}
         dashboardStore={dashboardStore}
         userStore={userStore}
      />
   </Router>
)

// FIXME: Fix the failed test cases after mobile design
describe.skip('Workbook Home Route tests', () => {
   beforeEach(() => {
      workbookService = new WorkbookFixture()
      workbookStore = new WorkbookStore(
         workbookService,
         pageService,
         listService,
         sectionService,
         cardService,
         evaluationWorkbookService,
         evaluationPageService
      )
      dashboardService = new DashboardFixture()
      publishFixture = new PublishFixture()
      assignmentsService = new AssignmentsFixture()
      learningsService = new LearningsFixture()
      dashboardStore = new DashboardStore(
         dashboardService,
         assignmentsService,
         publishFixture,
         learningsService
      )
      userService = new UserFixture()
      userStore = new UserStore(userService)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test workbook details loading state', () => {
      const { getByTestId } = render(renderWorkbookHomeRoute())

      getByTestId('loader')
   })

   it('should test workbook details failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void =>
         reject(new Error('error'))
      )
      const mockDetailsAPI = jest.fn()
      mockDetailsAPI.mockReturnValue(mockFailurePromise)
      workbookService.getWorkbookDetailsAPI = mockDetailsAPI
      const { getByTestId } = render(renderWorkbookHomeRoute())

      workbookStore.getWorkbookDetailsAPI()

      await waitFor(() => {
         getByTestId('retryButton')
      })
   })

   // FIXME: Need to fix the time taking test
   it.skip('should test workbook details success state', async () => {
      setWorkbookDetailsSuccessAPI()
      const { getAllByTestId, getByText } = render(renderWorkbookHomeRoute())

      workbookStore.getWorkbookDetailsAPI()

      await waitFor(() => {
         const {
            page_objective: pageObjective,
            page_description: pageDescription,
            lists
         } = activePageDetails
         getByText(pageObjective)
         getByText(pageDescription)
         expect(getAllByTestId('pageList').length).toBe(lists.length)
      })
   })

   // TODO: Need to fix the issue with time out
   it.skip('should test create page success state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockSuccessPromise = new Promise((resolve): void =>
         resolve(createPageAPIResponse)
      )
      const mockCreateAPI = jest.fn()
      mockCreateAPI.mockReturnValue(mockSuccessPromise)
      workbookService.createPageAPI = mockCreateAPI
      const { getByTestId, getByText, getAllByTestId } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let addPageButton

      await waitFor(() => {
         addPageButton = getByTestId('addPageButton')
      })
      fireEvent.click(addPageButton)
      await waitFor(() => {
         expect(getAllByTestId('pageButton').length).toBe(totalPages.length + 1)
         getByText(`Page ${totalPages.length + 1}`)
      })
   })

   it('should test create page failure state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockFailurePromise = new Promise((_, reject): void =>
         reject(new Error('Error'))
      ).catch(error => error)
      const mockCreateAPI = jest.fn()
      mockCreateAPI.mockReturnValue(mockFailurePromise)
      workbookService.createPageAPI = mockCreateAPI
      const { getByTestId, getAllByTestId } = render(renderWorkbookHomeRoute())
      workbookStore.getWorkbookDetailsAPI()

      let addPageButton

      await waitFor(() => {
         addPageButton = getByTestId('addPageButton')
      })
      fireEvent.click(addPageButton)
      await waitFor(() => {
         expect(getAllByTestId('pageButton').length).toBe(totalPages.length)
      })
   })

   it('should test add list empty error message', async () => {
      setWorkbookDetailsSuccessAPI()
      const { getAllByTestId, getByTestId, getByText } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let pageListAddButton

      await waitFor(() => {
         pageListAddButton = getAllByTestId('pageListAddButton')[0]
      })
      fireEvent.click(pageListAddButton)
      fireEvent.click(getByTestId('addListAddButton'))
      await waitFor(() => {
         getByText('* List name should not be empty')
      })
   })

   it('should test add list loading state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockSuccessPromise = new Promise((): void => {})
      const mockCreateAPI = jest.fn()
      mockCreateAPI.mockReturnValue(mockSuccessPromise)
      pageService.createPageListAPI = mockCreateAPI
      const { getAllByTestId, getByTestId } = render(renderWorkbookHomeRoute())
      workbookStore.getWorkbookDetailsAPI()

      let pageListAddButton

      await waitFor(() => {
         pageListAddButton = getAllByTestId('pageListAddButton')[0]
      })
      fireEvent.click(pageListAddButton)
      fireEvent.change(getByTestId('listNameInput'), {
         target: { value: 'New List' }
      })
      fireEvent.click(getByTestId('addListAddButton'))
      await waitFor(() => {
         expect(getByTestId('addListAddButton').disabled).toBe(true)
      })
   })

   // FIXME: Need to fix the time taking test
   it.skip('should test add list success state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockSuccessPromise = new Promise((resolve): void => resolve({}))
      const mockCreateAPI = jest.fn()
      mockCreateAPI.mockReturnValue(mockSuccessPromise)
      pageService.createPageListAPI = mockCreateAPI
      const { getAllByTestId, getByTestId } = render(renderWorkbookHomeRoute())
      workbookStore.getWorkbookDetailsAPI()

      let pageListAddButton

      await waitFor(() => {
         pageListAddButton = getAllByTestId('pageListAddButton')[0]
      })
      fireEvent.click(pageListAddButton)
      fireEvent.change(getByTestId('listNameInput'), {
         target: { value: 'New List' }
      })
      fireEvent.click(getByTestId('addListAddButton'))
      await waitFor(() => {
         expect(getByTestId('loader'))
      })
   })

   it('should test add section empty error message', async () => {
      setWorkbookDetailsSuccessAPI()
      const { getAllByTestId, getByTestId, getByText } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let listAddSectionButton

      await waitFor(() => {
         listAddSectionButton = getAllByTestId('listAddSectionButton')[0]
      })
      fireEvent.click(listAddSectionButton)
      fireEvent.click(getByTestId('addSectionAddButton'))
      await waitFor(() => {
         getByText('* Required')
      })
   })

   it('should test add section loading state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockLoadingPromise = new Promise((): void => {})
      const mockCreateAPI = jest.fn()
      mockCreateAPI.mockReturnValue(mockLoadingPromise)
      listService.createSectionAPI = mockCreateAPI
      const { getAllByTestId, getByTestId } = render(renderWorkbookHomeRoute())
      workbookStore.getWorkbookDetailsAPI()

      let listAddSectionButton

      await waitFor(() => {
         listAddSectionButton = getAllByTestId('listAddSectionButton')[0]
      })
      fireEvent.click(listAddSectionButton)
      fireEvent.change(getByTestId('sectionNameInput'), {
         target: { value: 'New Section' }
      })
      fireEvent.click(getByTestId('addSectionAddButton'))
      await waitFor(() => {
         expect(getByTestId('addSectionAddButton').disabled).toBe(true)
      })
   })

   it('should test add section success state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockSuccessPromise = new Promise((resolve): void => {
         resolve(createSectionResponse)
      })
      const mockCreateAPI = jest.fn()
      mockCreateAPI.mockReturnValue(mockSuccessPromise)
      listService.createSectionAPI = mockCreateAPI
      const { getAllByTestId, getByTestId, getByText } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let listAddSectionButton

      await waitFor(() => {
         listAddSectionButton = getAllByTestId('listAddSectionButton')[0]
      })
      fireEvent.click(listAddSectionButton)
      fireEvent.change(getByTestId('sectionNameInput'), {
         target: { value: 'New Section' }
      })
      fireEvent.click(getByTestId('addSectionAddButton'))
      await waitFor(() => {
         getByText('New Section')
      })
   })

   it('should test add section failure state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(new Error('Error'))
      }).catch(error => error)
      const mockCreateAPI = jest.fn()
      mockCreateAPI.mockReturnValue(mockFailurePromise)
      listService.createSectionAPI = mockCreateAPI
      const { getAllByTestId, getByTestId, queryByText } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let listAddSectionButton

      await waitFor(() => {
         listAddSectionButton = getAllByTestId('listAddSectionButton')[0]
      })
      fireEvent.click(listAddSectionButton)
      fireEvent.change(getByTestId('sectionNameInput'), {
         target: { value: 'New Section' }
      })
      fireEvent.click(getByTestId('addSectionAddButton'))
      await waitFor(() => {
         expect(queryByText('New Section')).toBe(null)
      })
   })

   it('should test add card empty error message', async () => {
      setWorkbookDetailsSuccessAPI()
      const { getAllByTestId, getByTestId, getByText } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let sectionAddCardButton

      await waitFor(() => {
         sectionAddCardButton = getAllByTestId('sectionAddCardButton')[0]
      })
      fireEvent.click(sectionAddCardButton)
      fireEvent.click(getByTestId('addCardAddButton'))
      await waitFor(() => {
         getByText('* Required')
      })
   })

   it('should test add card loading state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockLoadingPromise = new Promise((): void => {})
      const mockCreateAPI = jest.fn()
      mockCreateAPI.mockReturnValue(mockLoadingPromise)
      sectionService.createCardAPI = mockCreateAPI
      const { getAllByTestId, getByTestId } = render(renderWorkbookHomeRoute())
      workbookStore.getWorkbookDetailsAPI()

      let sectionAddCardButton

      await waitFor(() => {
         sectionAddCardButton = getAllByTestId('sectionAddCardButton')[0]
      })
      fireEvent.click(sectionAddCardButton)
      fireEvent.change(getByTestId('cardNameInput'), {
         target: { value: 'New Card' }
      })
      fireEvent.click(getByTestId('addCardAddButton'))
      await waitFor(() => {
         expect(getByTestId('addCardAddButton').disabled).toBe(true)
      })
   })

   it('should test add card success state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockSuccessPromise = new Promise((resolve): void => {
         resolve(createCardResponse)
      })
      const mockCreateAPI = jest.fn()
      mockCreateAPI.mockReturnValue(mockSuccessPromise)
      sectionService.createCardAPI = mockCreateAPI
      const { getAllByTestId, getByTestId, getByText } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let sectionAddCardButton

      await waitFor(() => {
         sectionAddCardButton = getAllByTestId('sectionAddCardButton')[0]
      })
      fireEvent.click(sectionAddCardButton)
      fireEvent.change(getByTestId('cardNameInput'), {
         target: { value: 'New Card' }
      })
      fireEvent.click(getByTestId('addCardAddButton'))
      await waitFor(() => {
         getByText('New Card')
      })
   })

   it('should test add card failure state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(new Error('Error'))
      }).catch(error => error)
      const mockCreateAPI = jest.fn()
      mockCreateAPI.mockReturnValue(mockFailurePromise)
      sectionService.createCardAPI = mockCreateAPI
      const { getAllByTestId, getByTestId, queryByText } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let sectionAddCardButton

      await waitFor(() => {
         sectionAddCardButton = getAllByTestId('sectionAddCardButton')[0]
      })
      fireEvent.click(sectionAddCardButton)
      fireEvent.change(getByTestId('cardNameInput'), {
         target: { value: 'New Card' }
      })
      fireEvent.click(getByTestId('addCardAddButton'))
      await waitFor(() => {
         expect(queryByText('New Card')).toBe(null)
      })
   })

   it('should test the selection of priority while adding card', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockSuccessPromise = new Promise((resolve): void => {
         resolve(createCardResponse)
      })
      const mockCreateAPI = jest.fn()
      mockCreateAPI.mockReturnValue(mockSuccessPromise)
      sectionService.createCardAPI = mockCreateAPI
      const { getAllByTestId, getByTestId } = render(renderWorkbookHomeRoute())
      workbookStore.getWorkbookDetailsAPI()

      let sectionAddCardButton

      await waitFor(() => {
         sectionAddCardButton = getAllByTestId('sectionAddCardButton')[0]
      })
      fireEvent.click(sectionAddCardButton)
      fireEvent.change(getByTestId('cardNameInput'), {
         target: { value: 'New Card With Priority' }
      })
      fireEvent.click(getByTestId('trigger'))
      fireEvent.click(getAllByTestId('priority')[2])
      fireEvent.click(getByTestId('addCardAddButton'))
   })

   it('should test toggle delete modal for list', async () => {
      setWorkbookDetailsSuccessAPI()
      const { getAllByTestId, getByTestId, queryByTestId } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let listMoreOptionsButton

      await waitFor(() => {
         listMoreOptionsButton = getAllByTestId('listMoreOptionsButton')[0]
      })
      fireEvent.click(listMoreOptionsButton)
      fireEvent.click(getAllByTestId('listDeleteButton')[0])
      fireEvent.click(getByTestId('customPopUpCancelButton'))
      expect(queryByTestId('customPopUpCancelButton')).toBe(null)
   })

   it('should test delete list loading state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockLoadingPromise = new Promise((): void => {})
      const mockDeleteAPI = jest.fn()
      mockDeleteAPI.mockReturnValue(mockLoadingPromise)
      const { getAllByTestId, getByTestId } = render(renderWorkbookHomeRoute())
      workbookStore.getWorkbookDetailsAPI()

      let listMoreOptionsButton

      await waitFor(() => {
         listMoreOptionsButton = getAllByTestId('listMoreOptionsButton')[0]
      })
      fireEvent.click(listMoreOptionsButton)
      fireEvent.click(getAllByTestId('listDeleteButton')[0])
      fireEvent.click(getByTestId('customPopUpSubmitButton'))
      expect(getByTestId('customPopUpSubmitButton').disabled).toBe(true)
   })

   it('should test delete list success state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockSuccessPromise = new Promise((resolve): void => resolve({}))
      const mockDeleteAPI = jest.fn()
      mockDeleteAPI.mockReturnValue(mockSuccessPromise)
      pageService.deletePageListAPI = mockDeleteAPI
      const { getAllByTestId, getByTestId, queryByText } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let listMoreOptionsButton

      await waitFor(() => {
         listMoreOptionsButton = getAllByTestId('listMoreOptionsButton')[0]
      })
      fireEvent.click(listMoreOptionsButton)
      fireEvent.click(getAllByTestId('listDeleteButton')[0])
      fireEvent.click(getByTestId('customPopUpSubmitButton'))
      const { lists } = activePageDetails
      const { list_name: listName } = lists[0]
      await waitFor(() => {
         expect(queryByText(listName)).toBe(null)
      })
   })

   it('should test delete list failure state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockFailurePromise = new Promise((_, reject): void =>
         reject(new Error('Error'))
      ).catch(error => error)
      const mockDeleteAPI = jest.fn()
      mockDeleteAPI.mockReturnValue(mockFailurePromise)
      pageService.deletePageListAPI = mockDeleteAPI
      const { getAllByTestId, getByTestId, queryByText } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let listMoreOptionsButton

      await waitFor(() => {
         listMoreOptionsButton = getAllByTestId('listMoreOptionsButton')[0]
      })
      fireEvent.click(listMoreOptionsButton)
      fireEvent.click(getAllByTestId('listDeleteButton')[0])
      fireEvent.click(getByTestId('customPopUpSubmitButton'))
      const { lists } = activePageDetails
      const { list_name: listName } = lists[0]
      await waitFor(() => {
         expect(queryByText(listName)).not.toBe(null)
      })
   })

   it('should test rename list success state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockSuccessPromise = new Promise((resolve): void => resolve({}))
      const mockRenameAPI = jest.fn()
      mockRenameAPI.mockReturnValue(mockSuccessPromise)
      listService.renameListAPI = mockRenameAPI
      const { getAllByTestId, getByTestId, getByText } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let listNameInputContentElement

      await waitFor(() => {
         listNameInputContentElement = getAllByTestId('listNameInputContent')[0]
      })

      fireEvent.dblClick(listNameInputContentElement)
      const listNameInput = getByTestId('listNameInput')
      const listName = 'Updated list name'
      fireEvent.change(listNameInput, {
         target: { value: listName }
      })
      expect(listNameInput.value).toBe(listName)
      listNameInput.blur()
      getByText(listName)
   })

   it('should test toggle delete modal for section', async () => {
      setWorkbookDetailsSuccessAPI()
      const { getAllByTestId, getByTestId, queryByTestId } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let sectionMoreOptionsButton

      await waitFor(() => {
         sectionMoreOptionsButton = getAllByTestId(
            'sectionMoreOptionsButton'
         )[0]
      })
      fireEvent.click(sectionMoreOptionsButton)
      fireEvent.click(getAllByTestId('sectionDeleteButton')[0])
      fireEvent.click(getByTestId('customPopUpCancelButton'))
      expect(queryByTestId('customPopUpCancelButton')).toBe(null)
   })

   it('should test delete section loading state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockLoadingPromise = new Promise((): void => {})
      const mockDeleteAPI = jest.fn()
      mockDeleteAPI.mockReturnValue(mockLoadingPromise)
      listService.deleteSectionAPI = mockDeleteAPI
      const { getAllByTestId, getByTestId, queryByTestId } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let sectionMoreOptionsButton

      await waitFor(() => {
         sectionMoreOptionsButton = getAllByTestId(
            'sectionMoreOptionsButton'
         )[0]
      })
      fireEvent.click(sectionMoreOptionsButton)
      fireEvent.click(getAllByTestId('sectionDeleteButton')[0])
      fireEvent.click(getByTestId('customPopUpSubmitButton'))
      expect(queryByTestId('customPopUpSubmitButton')).toBe(null)
   })

   it('should test delete section success state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockSuccessPromise = new Promise((resolve): void => resolve({}))
      const mockDeleteAPI = jest.fn()
      mockDeleteAPI.mockReturnValue(mockSuccessPromise)
      listService.deleteSectionAPI = mockDeleteAPI
      const { getAllByTestId, getByTestId, queryAllByText } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let sectionMoreOptionsButton

      await waitFor(() => {
         sectionMoreOptionsButton = getAllByTestId(
            'sectionMoreOptionsButton'
         )[0]
      })
      fireEvent.click(sectionMoreOptionsButton)
      fireEvent.click(getAllByTestId('sectionDeleteButton')[0])
      const { lists } = activePageDetails
      const { sections } = lists[0]
      const { section_name: sectionName } = sections[0]
      expect(queryAllByText(sectionName).length).toBe(5)
      fireEvent.click(getByTestId('customPopUpSubmitButton'))
      await waitFor(() => {
         expect(queryAllByText(sectionName).length).toBe(4)
      })
   })

   it('should test delete section failure state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockFailurePromise = new Promise((_, reject): void =>
         reject({})
      ).catch(error => error)
      const mockDeleteAPI = jest.fn()
      mockDeleteAPI.mockReturnValue(mockFailurePromise)
      listService.deleteSectionAPI = mockDeleteAPI
      const { getAllByTestId, getByTestId, queryAllByText } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let sectionMoreOptionsButton

      await waitFor(() => {
         sectionMoreOptionsButton = getAllByTestId(
            'sectionMoreOptionsButton'
         )[0]
      })
      fireEvent.click(sectionMoreOptionsButton)
      fireEvent.click(getAllByTestId('sectionDeleteButton')[0])
      const { lists } = activePageDetails
      const { sections } = lists[0]
      const { section_name: sectionName } = sections[0]
      expect(queryAllByText(sectionName).length).toBe(5)
      fireEvent.click(getByTestId('customPopUpSubmitButton'))
      await waitFor(() => {
         expect(queryAllByText(sectionName).length).toBe(5)
      })
   })

   it('should test rename section success state', async () => {
      setWorkbookDetailsSuccessAPI()
      const mockSuccessPromise = new Promise((resolve): void => resolve({}))
      const mockRenameAPI = jest.fn()
      mockRenameAPI.mockReturnValue(mockSuccessPromise)
      sectionService.updateSectionNameAPI = mockRenameAPI
      const { getAllByTestId, getByTestId, getByText } = render(
         renderWorkbookHomeRoute()
      )
      workbookStore.getWorkbookDetailsAPI()

      let sectionNameInputContentElement

      await waitFor(() => {
         sectionNameInputContentElement = getAllByTestId(
            'sectionNameInputContent'
         )[0]
      })
      fireEvent.click(sectionNameInputContentElement)
      const sectionNameInput = getByTestId('sectionNameInput')
      const sectionName = 'Updated section name'
      fireEvent.change(sectionNameInput, {
         target: { value: sectionName }
      })
      expect(sectionNameInput.value).toBe(sectionName)
      sectionNameInput.blur()
      getByText(sectionName)
   })

   it('should test move list success state', async () => {
      setWorkbookDetailsSuccessAPI()
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()
      setMockSuccessWorkbookChildDetails()
      const mockSuccessPromise = new Promise((resolve): void => resolve({}))
      const mockListMoveAPI = jest.fn()
      mockListMoveAPI.mockReturnValue(mockSuccessPromise)
      pageService.moveListAPI = mockListMoveAPI
      const { getAllByTestId, getByTestId, getAllByText, queryByText } = render(
         renderWorkbookHomeRoute()
      )

      workbookStore.getWorkbookDetailsAPI()

      let listMoreOptionsButton

      await waitFor(() => {
         listMoreOptionsButton = getAllByTestId('listMoreOptionsButton')[0]
      })

      fireEvent.click(listMoreOptionsButton)
      fireEvent.click(getAllByTestId('listMoveButton')[0])
      await waitFor(() => {})
      const workbook = getAllByTestId('moveWorkbook')[0]
      fireEvent.dblClick(workbook)
      await waitFor(() => {})
      selectPage(getAllByText)
      const submitButton = getByTestId('moveWorkbookChildSubmitButton')
      fireEvent.click(submitButton)
      await waitFor(() => {})
      const { lists } = activePageDetails
      const { list_name: listName } = lists[0]
      expect(queryByText(listName)).toBe(null)
      expect(getAllByTestId('pageList').length).toBe(lists.length - 1)
   })

   it('should test move section success state', async () => {
      setWorkbookDetailsSuccessAPI()
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()
      setMockSuccessWorkbookChildDetails()
      const mockSuccessPromise = new Promise((resolve): void => resolve({}))
      const mockSectionMoveAPI = jest.fn()
      mockSectionMoveAPI.mockReturnValue(mockSuccessPromise)
      pageService.moveListAPI = mockSectionMoveAPI
      const { getAllByTestId, getByTestId, getAllByText } = render(
         renderWorkbookHomeRoute()
      )

      let sectionMoreOptionsButton

      await waitFor(() => {
         sectionMoreOptionsButton = getAllByTestId(
            'sectionMoreOptionsButton'
         )[0]
      })
      fireEvent.click(sectionMoreOptionsButton)
      fireEvent.click(getAllByTestId('sectionMoveButton')[0])
      await waitFor(() => {})
      const workbook = getAllByTestId('moveWorkbook')[0]
      fireEvent.dblClick(workbook)
      await waitFor(() => {})
      selectPage(getAllByText)
      selectList(getAllByText)
      const submitButton = getByTestId('moveWorkbookChildSubmitButton')
      fireEvent.click(submitButton)
      await waitFor(() => {})
      const { lists } = activePageDetails
      const { sections } = lists[0]
      const { section_name: sectionName } = sections[0]
      expect(getAllByText(sectionName).length).toBe(4)
      expect(getAllByTestId('listSection').length).toBe(lists.length * 2 - 1)
   })
})
