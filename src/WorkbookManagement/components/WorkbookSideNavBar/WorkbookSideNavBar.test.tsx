import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'mobx-react'

import DashboardStore from '../../../FolderManagement/stores/DashboardStore'
import DashboardFixture from '../../../FolderManagement/services/DashboardService/index.fixture'
import PublishFixture from '../../../FolderManagement/services/PublishService/index.fixture'
import AssignmentsFixture from '../../../FolderManagement/services/AssignmentsService/index.fixture'

import getSharedUsersResponse from '../../fixtures/getSharedUsersResponse.json'

import PageFixture from '../../services/PageService/index.fixture'
import ListService from '../../services/ListService/index.fixture'
import SectionService from '../../services/SectionService/index.fixture'
import CardService from '../../services/CardService/index.fixture'
import WorkbookService from '../../services/WorkbookService/index.fixture'
import EvaluationWorkbookService from '../../services/Evaluation/WorkbookService/index.fixture'
import EvaluationPageService from '../../services/Evaluation/PageService/index.fixture'
import WorkbookStore from '../../stores/WorkbookStore'
import WorkbookDetails from '../../fixtures/getWorkbookDetailsAPIResponse.json'
import LearningsFixture from '../../../FolderManagement/services/LearningsService/index.fixture'
import ChromeBannerUIStore from '../../../Common/stores/ChromeBannerUIStore'

import WorkbookSideNavBar from '.'

const goToHome = jest.fn()

const { workbook_id: workbookId } = WorkbookDetails

// NOTE: need to resolve errors in below test cases

describe('Share people List test cases', () => {
   let workbookService
   let publishFixture
   let pageService
   let listService
   let sectionService
   let cardService
   let workbookStore
   let onSuccess
   let onFailure
   let dashboardService
   let dashboardStore
   let getElementByTestId
   let queryElementByTestId
   let Debug
   let evaluationWorkbookService
   let evaluationPageService
   let assignmentsService
   let learningsService
   let chromeBannerUIStore

   beforeEach(() => {
      workbookService = new WorkbookService()
      pageService = new PageFixture()
      listService = new ListService()
      sectionService = new SectionService()
      cardService = new CardService()
      evaluationWorkbookService = new EvaluationWorkbookService()
      evaluationPageService = new EvaluationPageService()
      workbookStore = new WorkbookStore(
         workbookService,
         pageService,
         listService,
         sectionService,
         cardService,
         evaluationWorkbookService,
         evaluationPageService
      )
      onSuccess = jest.fn()
      onFailure = jest.fn()
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
      chromeBannerUIStore = new ChromeBannerUIStore()

      const { getByTestId, queryByTestId, debug } = render(
         <Provider chromeBannerUIStore={chromeBannerUIStore}>
            <WorkbookSideNavBar
               workbookStore={workbookStore}
               goToHome={goToHome}
               goToAssignments={(): void => {}}
               goToLearnings={(): void => {}}
               goToSharedWithMe={(): void => {}}
               goToPublishDashboard={(): void => {}}
               userDetails={null}
               goToPersonalProjects={() => {}}
               goBackToPreviousRoute={() => {}}
               userName={'user'}
            />
         </Provider>
      )
      getElementByTestId = getByTestId
      queryElementByTestId = queryByTestId
      Debug = debug
   })

   // TODO: fix the error
   it.skip('should test whether share people list component rendered or not', async () => {
      const sharePeopleIcon = getElementByTestId(
         'showWorkbookSharedPeopleListButton'
      )
      fireEvent.click(sharePeopleIcon)
      const hideSharePeopleList = getElementByTestId(
         'hideWorkbookSharedPeopleListButton'
      )
      // getElementByTestId('loader')

      //   TODO: need to write test case for shared users list
      let mockSuccessPromise
      await waitFor(() => {
         mockSuccessPromise = new Promise((resolve, _) => {
            resolve(getSharedUsersResponse)
         })
      })

      await waitFor(() => {
         workbookService.getSharedUsersDetailsAPI = jest.fn(
            () => mockSuccessPromise
         )
      })
      workbookStore.getSharedUsersDetailsAPI(workbookId, onSuccess, onFailure)
      // await waitFor(() => {
      //    getElementByTestId('shareWorkbookButton')
      // })
      Debug()

      fireEvent.click(hideSharePeopleList)
      expect(
         queryElementByTestId('hideWorkbookSharedPeopleListButton')
      ).toBeNull()
   })

   it('should test whether goTo home is called or not', async () => {
      const homeButton = getElementByTestId('workbookHomeNavigationButton')
      fireEvent.click(homeButton)
      expect(goToHome).toBeCalled()
   })
})
