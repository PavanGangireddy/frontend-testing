import React, { ReactNode } from 'react'
import { Router } from 'react-router-dom'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { observer } from 'mobx-react'

import workbookChildDetails from '../../../WorkbookManagement/fixtures/getWorkbookChildDetailsAPIResponse.json'
import getFolderWorkbookDetails from '../../../FolderManagement/fixtures/getWorkbooksAndFolders.json'
import getRootFolderDetails from '../../../FolderManagement/fixtures/getRootFolderDetails.json'
import DashboardFixture from '../../../FolderManagement/services/DashboardService/index.fixture'
import DashboardStore from '../../../FolderManagement/stores/DashboardStore'
import DashboardService from '../../../FolderManagement/services/DashboardService'
import PublishFixture from '../../../FolderManagement/services/PublishService/index.fixture'
import WorkbookService from '../../../WorkbookManagement/services/WorkbookService'
import EvaluationWorkbookService from '../../../WorkbookManagement/services/Evaluation/WorkbookService'
import WorkbookStore from '../../../WorkbookManagement/stores/WorkbookStore'
import PageFixture from '../../../WorkbookManagement/services/PageService/index.fixture'
import EvaluationPageFixture from '../../../WorkbookManagement/services/Evaluation/PageService/index.fixture'
import ListFixture from '../../../WorkbookManagement/services/ListService/index.fixture'
import SectionFixture from '../../../WorkbookManagement/services/SectionService/index.fixture'
import CardFixture from '../../../WorkbookManagement/services/CardService/index.fixture'
import WorkbookFixture from '../../../WorkbookManagement/services/WorkbookService/index.fixture'
import EvaluationWorkbookFixture from '../../../WorkbookManagement/services/Evaluation/WorkbookService/index.fixture'
import PageService from '../../../WorkbookManagement/services/PageService'
import EvaluationPageService from '../../../WorkbookManagement/services/Evaluation/PageService'
import ListService from '../../../WorkbookManagement/services/ListService'
import SectionService from '../../../WorkbookManagement/services/SectionService'
import CardService from '../../../WorkbookManagement/services/CardService'
import PageModel from '../../../WorkbookManagement/stores/models/PageModel'
import pageDetails from '../../../WorkbookManagement/fixtures/getPageDetailsResponse.json'
import AssignmentsService from '../../../FolderManagement/services/AssignmentsService'
import ListModel from '../../../WorkbookManagement/stores/models/ListModel'
import AssignmentsFixture from '../../../FolderManagement/services/AssignmentsService/index.fixture'

import {
   MOVE,
   CARD,
   FOLDER,
   PAGE,
   SECTION,
   LIST
} from '../../constants/UIConstants'

import LearningsFixture from '../../../FolderManagement/services/LearningsService/index.fixture'
import LearningsService from '../../../FolderManagement/services/LearningsService'
import MoveResourceBodyWrapper from '.'

let dashboardService: DashboardService,
   dashboardStore: DashboardStore,
   workbookService: WorkbookService,
   workbookStore: WorkbookStore,
   pageService: PageService,
   pageModel: PageModel,
   listService: ListService,
   listModel: ListModel,
   sectionService: SectionService,
   cardService: CardService,
   evaluationWorkbookService: EvaluationWorkbookService,
   evaluationPageService: EvaluationPageService,
   publishFixture: PublishFixture,
   assignmentsService: AssignmentsService,
   learningsService: LearningsService

interface WrapperProps {
   type: string
   actionType: string
   dashboardStore: DashboardStore
   workbookStore: WorkbookStore
   pageModel: PageModel
   listModel: ListModel
}

const { lists } = pageDetails

const mockCancelFunction = jest.fn()
@observer
class Wrapper extends React.Component<WrapperProps> {
   render(): ReactNode {
      const {
         dashboardStore: {
            getMoveRootFolderDetailsAPIStatus,
            getMoveRootFolderDetailsAPI,
            getMoveRootFolderDetailsAPIError,
            moveRootFolderId,
            getMoveWorkbooksAndFoldersAPI,
            getMoveWorkbooksAndFoldersAPIStatus,
            getMoveWorkbooksAndFoldersAPIError,
            moveActiveFolderInfo,
            moveFolderAPI,
            moveFolderAPIStatus,
            clearMoveWorkbooksAndFolders
         },
         workbookStore: {
            getWorkbookChildDetailsAPI,
            getWorkbookChildDetailsAPIStatus,
            getWorkbookChildDetailsAPIError,
            workbookChildDetails,
            clearWorkbookChildDetails,
            movePageAPI,
            movePageAPIStatus
         },
         pageModel: { moveListAPI, moveListAPIStatus },
         type,
         actionType
      } = this.props
      let moveAPI, moveAPIStatus
      if (type === FOLDER) {
         moveAPI = moveFolderAPI
         moveAPIStatus = moveFolderAPIStatus
      } else if (type === PAGE) {
         moveAPI = movePageAPI
         moveAPIStatus = movePageAPIStatus
      } else if (type === LIST) {
         moveAPI = moveListAPI
         moveAPIStatus = moveListAPIStatus
      } else if (type === SECTION) {
         moveAPI = moveListAPI
         moveAPIStatus = moveListAPIStatus
      }
      return (
         <MoveResourceBodyWrapper
            getWorkbookDetailsAPIStatus={getWorkbookChildDetailsAPIStatus}
            onCancel={mockCancelFunction()}
            actionType={actionType}
            resourceType={type}
            getFolderDetailsAPI={getMoveWorkbooksAndFoldersAPI}
            getFolderDetailsAPIStatus={getMoveWorkbooksAndFoldersAPIStatus}
            getFolderDetailsAPIError={getMoveWorkbooksAndFoldersAPIError}
            folderData={moveActiveFolderInfo}
            workbookId={'2'}
            onMoveFolderResourceAPI={moveAPI}
            onMoveFolderResourceAPIStatus={moveAPIStatus}
            workbookData={workbookChildDetails}
            getWorkbookDetailsAPI={getWorkbookChildDetailsAPI}
            getWorkbookDetailsAPIError={getWorkbookChildDetailsAPIError}
            clearWorkbooksAndFolder={(): void => {}}
            rootFolderId={moveRootFolderId}
            getRootFolderDetailsAPI={getMoveRootFolderDetailsAPI}
            getRootFolderDetailsAPIStatus={getMoveRootFolderDetailsAPIStatus}
            getRootFolderDetailsAPIError={getMoveRootFolderDetailsAPIError}
            clearMoveWorkbooksAndFolders={clearMoveWorkbooksAndFolders}
            clearWorkbookChildDetails={clearWorkbookChildDetails}
         />
      )
   }
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

const setMockSuccessWorkbookDetails = (): void => {
   const mockSuccessPromise = new Promise((resolve): void => {
      resolve(workbookChildDetails)
   })
   const mockGetMoveWorkbookDetailsAPI = jest.fn()
   mockGetMoveWorkbookDetailsAPI.mockReturnValue(mockSuccessPromise)
   workbookService.getWorkbookChildDetailsAPI = mockGetMoveWorkbookDetailsAPI
}

const selectPage = (container, getByText): void => {
   fireEvent.focus(container.querySelectorAll('input')[0])
   fireEvent.keyDown(container.querySelectorAll('input')[0], {
      key: 'ArrowDown',
      code: 40
   })
   fireEvent.click(getByText('Page 1'))
}

const selectList = (container, getByText): void => {
   fireEvent.focus(container.querySelectorAll('input')[1])
   fireEvent.keyDown(container.querySelectorAll('input')[1], {
      key: 'ArrowDown',
      code: 40
   })
   fireEvent.click(getByText('List 1'))
}

describe('Move Resource Body Wrapper tests', () => {
   beforeEach(() => {
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
      pageService = new PageFixture()
      listService = new ListFixture()
      sectionService = new SectionFixture()
      cardService = new CardFixture()
      evaluationPageService = new EvaluationPageFixture()
      pageModel = new PageModel(
         pageDetails,
         pageService,
         listService,
         sectionService,
         cardService,
         evaluationPageService
      )
      listModel = new ListModel(
         lists[0],
         listService,
         sectionService,
         cardService
      )
      workbookService = new WorkbookFixture()
      evaluationWorkbookService = new EvaluationWorkbookFixture()
      workbookStore = new WorkbookStore(
         workbookService,
         pageService,
         listService,
         sectionService,
         cardService,
         evaluationWorkbookService,
         evaluationPageService
      )
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should test loading state of root details', () => {
      const mockLoadingPromise = new Promise((): void => {})
      const mockGetMoveRootFolderDetailsAPI = jest.fn()
      mockGetMoveRootFolderDetailsAPI.mockReturnValue(mockLoadingPromise)
      dashboardService.getMoveRootFolderDetailsAPI = mockGetMoveRootFolderDetailsAPI
      const { getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={CARD}
               actionType={MOVE}
            />
         </Router>
      )
      getByTestId('loader')
   })

   it('should test success state of root details & loading state of getting root folder child', async () => {
      setMockSuccessRootFolderDetails()

      const mockLoadingPromise = new Promise((): void => {})
      const mockGetMoveFolderDetailsAPI = jest.fn()
      mockGetMoveFolderDetailsAPI.mockReturnValue(mockLoadingPromise)
      dashboardService.getMoveWorkbooksAndFoldersAPI = mockGetMoveFolderDetailsAPI

      const { getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={CARD}
               actionType={MOVE}
            />
         </Router>
      )
      await waitFor(() => {})
      getByTestId('loader')
   })

   it('should test success state of getting root folder child', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()

      const { getAllByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={CARD}
               actionType={MOVE}
            />
         </Router>
      )

      const { folders, workbooks } = getFolderWorkbookDetails

      await waitFor(() => {})
      expect(getAllByTestId('moveFolder').length).toBe(folders.length)
      expect(getAllByTestId('moveWorkbook').length).toBe(workbooks.length)
   })

   it('should getting folder details loading state on click a folder', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()

      const { getAllByTestId, getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={CARD}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      const folder = getAllByTestId('moveFolder')[0]
      fireEvent.click(folder)
      getByTestId('loader')
   })

   it('should getting folder details success state on click a folder', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()

      const { getAllByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={CARD}
               actionType={MOVE}
            />
         </Router>
      )

      const { folders, workbooks } = getFolderWorkbookDetails

      await waitFor(() => {})
      expect(getAllByTestId('moveFolder').length).toBe(folders.length)
      expect(getAllByTestId('moveWorkbook').length).toBe(workbooks.length)
   })

   it('should test moving folder and workbook UI', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()

      const { getByTestId, queryByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={FOLDER}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      getByTestId('moveFolderChildCancelButton')
      getByTestId('moveFolderChildSubmitButton')
      expect(queryByTestId('moveWorkbook')).toBe(null)
   })

   it('should test invoke cancel callback', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()

      const { getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={FOLDER}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      fireEvent.click(getByTestId('moveFolderChildCancelButton'))
      expect(mockCancelFunction).toBeCalled()
   })

   it('should test loading state of move folder', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()

      const mockLoadingPromise = new Promise((): void => {})
      const mockMoveFolderAPI = jest.fn()
      mockMoveFolderAPI.mockReturnValue(mockLoadingPromise)
      dashboardService.moveFolderAPI = mockMoveFolderAPI

      const { getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={FOLDER}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      const submitButton = getByTestId('moveFolderChildSubmitButton')
      fireEvent.click(submitButton)
      expect(submitButton.disabled).toBe(true)
   })

   it('should test getting workbook details loading state on click a workbook', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()

      const { getAllByTestId, getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={CARD}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      const workbook = getAllByTestId('moveWorkbook')[0]
      fireEvent.click(workbook)
      getByTestId('loader')
   })

   it('should test getting workbook details success state on click a workbook', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()
      setMockSuccessWorkbookDetails()

      const { getAllByTestId, getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={CARD}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      const workbook = getAllByTestId('moveWorkbook')[0]
      fireEvent.click(workbook)
      await waitFor(() => {})
      getByTestId('moveWorkbookChildCancelButton')
      getByTestId('moveWorkbookChildSubmitButton')
   })

   it('should test moving page UI', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()
      setMockSuccessWorkbookDetails()

      const { getAllByTestId, getByTestId, queryByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={PAGE}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      expect(queryByTestId('moveFolderChildCancelButton')).toBe(null)
      expect(queryByTestId('moveFolderChildSubmitButton')).toBe(null)
      const workbook = getAllByTestId('moveWorkbook')[0]
      fireEvent.click(workbook)
      await waitFor(() => {})
      getByTestId('moveWorkbookChildCancelButton')
      getByTestId('moveWorkbookChildSubmitButton')
   })

   it('should test moving page loading state', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()
      setMockSuccessWorkbookDetails()

      const mockLoadingPromise = new Promise((): void => {})
      const mockMovePageAPI = jest.fn()
      mockMovePageAPI.mockReturnValue(mockLoadingPromise)
      workbookService.movePageAPI = mockMovePageAPI

      const { getAllByTestId, getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={PAGE}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      const workbook = getAllByTestId('moveWorkbook')[0]
      fireEvent.click(workbook)
      await waitFor(() => {})
      const submitButton = getByTestId('moveWorkbookChildSubmitButton')
      fireEvent.click(submitButton)
      expect(submitButton.disabled).toBe(true)
   })

   it('should test getting workbook details for moving list', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()
      setMockSuccessWorkbookDetails()

      const { getAllByTestId, getByText, queryByText } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={LIST}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      const workbook = getAllByTestId('moveWorkbook')[0]
      fireEvent.click(workbook)
      await waitFor(() => {})
      getByText('Select Page')
      expect(queryByText('Select List')).toBe(null)
      expect(queryByText('Select Section')).toBe(null)
   })

   it('should test getting workbook details for moving section', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()
      setMockSuccessWorkbookDetails()

      const { getAllByTestId, getByText, queryByText } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={SECTION}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      const workbook = getAllByTestId('moveWorkbook')[0]
      fireEvent.click(workbook)
      await waitFor(() => {})
      getByText('Select Page')
      getByText('Select List')
      expect(queryByText('Select Section')).toBe(null)
   })

   it('should test getting workbook details for moving card', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()
      setMockSuccessWorkbookDetails()

      const { getAllByTestId, getByText } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={CARD}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      const workbook = getAllByTestId('moveWorkbook')[0]
      fireEvent.click(workbook)
      await waitFor(() => {})
      getByText('Select Page')
      getByText('Select List')
      getByText('Select Section')
   })

   it('should test prompt user to select page for moving list', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()
      setMockSuccessWorkbookDetails()

      const { getAllByTestId, getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={LIST}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      const workbook = getAllByTestId('moveWorkbook')[0]
      fireEvent.click(workbook)
      await waitFor(() => {})
      const submitButton = getByTestId('moveWorkbookChildSubmitButton')
      fireEvent.click(submitButton)
      expect(submitButton.disabled).toBe(false)
   })

   it('should test loading state of moving list', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()
      setMockSuccessWorkbookDetails()

      const mockLoadingPromise = new Promise((): void => {})
      const mockMoveListAPI = jest.fn()
      mockMoveListAPI.mockReturnValue(mockLoadingPromise)
      pageService.moveListAPI = mockMoveListAPI

      const { getAllByTestId, getByTestId, container, getByText } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={LIST}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      const workbook = getAllByTestId('moveWorkbook')[0]
      fireEvent.click(workbook)
      await waitFor(() => {})
      selectPage(container, getByText)
      const submitButton = getByTestId('moveWorkbookChildSubmitButton')
      fireEvent.click(submitButton)
      expect(submitButton.disabled).toBe(true)
   })

   it('should test prompt user to select page and list for moving section', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()
      setMockSuccessWorkbookDetails()

      const { getAllByTestId, getByTestId, getByText, container } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={SECTION}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      const workbook = getAllByTestId('moveWorkbook')[0]
      fireEvent.click(workbook)
      await waitFor(() => {})
      selectPage(container, getByText)
      const submitButton = getByTestId('moveWorkbookChildSubmitButton')
      fireEvent.click(submitButton)
      expect(submitButton.disabled).toBe(false)
   })

   it('should test loading state of moving section', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()
      setMockSuccessWorkbookDetails()

      const mockLoadingPromise = new Promise((): void => {})
      const mockMoveSectionAPI = jest.fn()
      mockMoveSectionAPI.mockReturnValue(mockLoadingPromise)
      listService.moveSectionAPI = mockMoveSectionAPI

      const { getAllByTestId, getByTestId, container, getByText } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={SECTION}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      const workbook = getAllByTestId('moveWorkbook')[0]
      fireEvent.click(workbook)
      await waitFor(() => {})
      selectPage(container, getByText)
      selectList(container, getByText)
      const submitButton = getByTestId('moveWorkbookChildSubmitButton')
      fireEvent.click(submitButton)
      expect(submitButton.disabled).toBe(true)
   })

   it('should test prompt user to select page, list, section for moving section', async () => {
      setMockSuccessRootFolderDetails()
      setMockSuccessFolderDetails()
      setMockSuccessWorkbookDetails()

      const { getAllByTestId, getByTestId, getByText, container } = render(
         <Router history={createMemoryHistory()}>
            <Wrapper
               dashboardStore={dashboardStore}
               workbookStore={workbookStore}
               pageModel={pageModel}
               listModel={listModel}
               type={CARD}
               actionType={MOVE}
            />
         </Router>
      )

      await waitFor(() => {})
      const workbook = getAllByTestId('moveWorkbook')[0]
      fireEvent.click(workbook)
      await waitFor(() => {})
      selectPage(container, getByText)
      selectList(container, getByText)
      const submitButton = getByTestId('moveWorkbookChildSubmitButton')
      fireEvent.click(submitButton)
      expect(submitButton.disabled).toBe(false)
   })
})
