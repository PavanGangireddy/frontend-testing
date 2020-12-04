import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'mobx-react'

import DashboardStore from '../../stores/DashboardStore'
import DashboardFixture from '../../services/DashboardService/index.fixture'
import PublishFixture from '../../services/PublishService/index.fixture'
import withWorkbookOrFolderActions from '../../hocs/withWorkbookOrFolderActions'
import UserStore from '../../../UserProfile/stores/UserStore'
import UserFixture from '../../../UserProfile/services/UserService/index.fixture'
import ChromeBannerUIStore from '../../../Common/stores/ChromeBannerUIStore'

import starredFoldersAndPinnedWorkbooksInfo from '../../fixtures/starredFoldersAndPinnedWorkbooksInfo.json'
import getWorkbooksAndFolders from '../../fixtures/getSharedWorkbooksAndFolders.json'
import AssignmentsFixture from '../../services/AssignmentsService/index.fixture'
import LearningsFixture from '../../services/LearningsService/index.fixture'
import WelcomeMessageUIStore from '../../stores/WelcomeMessageUIStore'

import FolderManagementRoute from '.'

describe('FolderManagementRoute component test cases', () => {
   let dashboardAPI
   let publishFixture
   let assignmentsAPI
   let learningsAPI
   let dashboardStore
   let userAPI
   let userStore
   let chromeBannerUIStore
   let welcomeMessageUIStore
   const FolderManagementRouteWithHoc = withWorkbookOrFolderActions(
      FolderManagementRoute
   )

   beforeEach(() => {
      dashboardAPI = new DashboardFixture()
      publishFixture = new PublishFixture()
      assignmentsAPI = new AssignmentsFixture()
      learningsAPI = new LearningsFixture()
      dashboardStore = new DashboardStore(
         dashboardAPI,
         assignmentsAPI,
         publishFixture,
         learningsAPI
      )
      userAPI = new UserFixture()
      userStore = new UserStore(userAPI)
      chromeBannerUIStore = new ChromeBannerUIStore()
      welcomeMessageUIStore = new WelcomeMessageUIStore()
   })

   it('should show deletePop when we click the delete action in pinnedWorkbook', async () => {
      const { getByTestId, getAllByText, getByText } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
               welcomeMessageUIStore={welcomeMessageUIStore}
            >
               <FolderManagementRouteWithHoc dashboardStore={dashboardStore} />
            </Provider>
         </Router>
      )
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve(starredFoldersAndPinnedWorkbooksInfo)
      })
      const mockstarredFoldersAndPinnedWorkbooksAPI = jest.fn()
      mockstarredFoldersAndPinnedWorkbooksAPI.mockReturnValue(
         mockSuccessPromise
      )
      dashboardAPI.getPinnedWorkbooksAndStarredFoldersAPI = mockstarredFoldersAndPinnedWorkbooksAPI
      jest
         .spyOn(dashboardStore, 'deleteWorkbookAPI')
         .mockImplementation(() => jest.fn())
      let deleteElements
      await waitFor(() => {
         deleteElements = getAllByText('Delete')
      })
      fireEvent.click(deleteElements[0])
      getByText('DELETE')
      fireEvent.click(getByTestId('customPopUpSubmitButton'))
      expect(dashboardStore.deleteWorkbookAPI).toHaveBeenCalledWith(
         '0',
         expect.any(Function),
         expect.any(Function)
      )
   })

   it('should show deletePop when we click the delete action in starredFolders', async () => {
      const { getByTestId, getAllByText, getByText } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
               welcomeMessageUIStore={welcomeMessageUIStore}
            >
               <FolderManagementRouteWithHoc dashboardStore={dashboardStore} />
            </Provider>
         </Router>
      )
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve(starredFoldersAndPinnedWorkbooksInfo)
      })
      const mockstarredFoldersAndPinnedWorkbooksAPI = jest.fn()
      mockstarredFoldersAndPinnedWorkbooksAPI.mockReturnValue(
         mockSuccessPromise
      )
      dashboardAPI.getPinnedWorkbooksAndStarredFoldersAPI = mockstarredFoldersAndPinnedWorkbooksAPI
      jest
         .spyOn(dashboardStore, 'deleteFolderAPI')
         .mockImplementation(() => jest.fn())
      let deleteElements
      await waitFor(() => {
         deleteElements = getAllByText('Delete')
      })
      fireEvent.click(deleteElements[6])
      getByText('DELETE')
      fireEvent.click(getByTestId('customPopUpSubmitButton'))
      expect(dashboardStore.deleteFolderAPI).toHaveBeenCalledWith(
         '1',
         expect.any(Function),
         expect.any(Function)
      )
   })

   it('should show RenamePop when we click the rename action in pinnedWorkbook', async () => {
      const { getByTestId, getAllByText, getByText } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
               welcomeMessageUIStore={welcomeMessageUIStore}
            >
               <FolderManagementRouteWithHoc dashboardStore={dashboardStore} />
            </Provider>
         </Router>
      )
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve(starredFoldersAndPinnedWorkbooksInfo)
      })
      const mockstarredFoldersAndPinnedWorkbooksAPI = jest.fn()
      mockstarredFoldersAndPinnedWorkbooksAPI.mockReturnValue(
         mockSuccessPromise
      )
      dashboardAPI.getPinnedWorkbooksAndStarredFoldersAPI = mockstarredFoldersAndPinnedWorkbooksAPI
      jest
         .spyOn(dashboardStore, 'renameForWorkbookAPI')
         .mockImplementation(() => jest.fn())
      let renameElements
      await waitFor(() => {
         renameElements = getAllByText('Rename')
      })
      fireEvent.click(renameElements[0])
      const input = getByTestId('input')
      fireEvent.change(input, { target: { value: 'Orange' } })
      expect(input.value).toBe('Orange')
      getByText('RENAME')
      fireEvent.click(getByTestId('submitButton'))
      expect(dashboardStore.renameForWorkbookAPI).toHaveBeenCalledWith(
         '0',
         'Orange',
         expect.any(Function),
         expect.any(Function)
      )
   })

   it.skip('should show RenamePop when we click the rename action in folder', async () => {
      const { getByTestId, getAllByText, getByText } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
               welcomeMessageUIStore={welcomeMessageUIStore}
            >
               <FolderManagementRouteWithHoc dashboardStore={dashboardStore} />
            </Provider>
         </Router>
      )
      const mockSuccessPromiseForPinnedWorkbooksAndStarredFolders = new Promise(
         function(resolve) {
            resolve(starredFoldersAndPinnedWorkbooksInfo)
         }
      )
      const mockstarredFoldersAndPinnedWorkbooksAPI = jest.fn()
      mockstarredFoldersAndPinnedWorkbooksAPI.mockReturnValue(
         mockSuccessPromiseForPinnedWorkbooksAndStarredFolders
      )
      dashboardAPI.getPinnedWorkbooksAndStarredFoldersAPI = mockstarredFoldersAndPinnedWorkbooksAPI

      const mockSuccessPromiseforFoldersAndWorkbooks = new Promise(function(
         resolve
      ) {
         resolve(getWorkbooksAndFolders)
      })
      const mockFoldersAndWorkbooksAPI = jest.fn()
      mockFoldersAndWorkbooksAPI.mockReturnValue(
         mockSuccessPromiseforFoldersAndWorkbooks
      )
      dashboardAPI.getWorkbooksAndFoldersAPI = mockFoldersAndWorkbooksAPI
      jest
         .spyOn(dashboardStore, 'renameForFolderAPI')
         .mockImplementation(() => jest.fn())
      let renameElements
      await waitFor(() => {
         renameElements = getAllByText('Rename')
      })
      fireEvent.click(renameElements[8])
      const input = getByTestId('input')
      fireEvent.change(input, { target: { value: 'OrangeTeam' } })
      expect(input.value).toBe('OrangeTeam')
      getByText('RENAME')
      fireEvent.click(getByTestId('submitButton'))
      expect(dashboardStore.renameForFolderAPI).toHaveBeenCalledWith(
         '0',
         'OrangeTeam',
         expect.any(Function),
         expect.any(Function)
      )
   })

   it.skip('should make  pinnedWorkbook when we click the pin action in workbook ', async () => {
      const { getAllByText } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
               welcomeMessageUIStore={welcomeMessageUIStore}
            >
               <FolderManagementRouteWithHoc dashboardStore={dashboardStore} />
            </Provider>
         </Router>
      )
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve(starredFoldersAndPinnedWorkbooksInfo)
      })
      const mockstarredFoldersAndPinnedWorkbooksAPI = jest.fn()
      mockstarredFoldersAndPinnedWorkbooksAPI.mockReturnValue(
         mockSuccessPromise
      )
      dashboardAPI.getPinnedWorkbooksAndStarredFoldersAPI = mockstarredFoldersAndPinnedWorkbooksAPI
      jest
         .spyOn(dashboardStore, 'pinOrUnpinWorkbook')
         .mockImplementation(() => jest.fn())
      let unpinElements
      await waitFor(() => {
         unpinElements = getAllByText('Pin')
      })
      fireEvent.click(unpinElements[0])
      expect(dashboardStore.pinOrUnpinWorkbook).toHaveBeenCalledWith('4')
   })

   it.skip('should unpin the Workbook when we click the unpin action in workbook ', async () => {
      const { getAllByText } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
               welcomeMessageUIStore={welcomeMessageUIStore}
            >
               <FolderManagementRouteWithHoc dashboardStore={dashboardStore} />
            </Provider>
         </Router>
      )
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve(starredFoldersAndPinnedWorkbooksInfo)
      })
      const mockstarredFoldersAndPinnedWorkbooksAPI = jest.fn()
      mockstarredFoldersAndPinnedWorkbooksAPI.mockReturnValue(
         mockSuccessPromise
      )
      dashboardAPI.getPinnedWorkbooksAndStarredFoldersAPI = mockstarredFoldersAndPinnedWorkbooksAPI
      jest
         .spyOn(dashboardStore, 'pinOrUnpinWorkbook')
         .mockImplementation(() => jest.fn())
      let pinElements
      await waitFor(() => {
         pinElements = getAllByText('Unpin')
      })
      fireEvent.click(pinElements[0])
      expect(dashboardStore.pinOrUnpinWorkbook).toHaveBeenCalledWith('0')
   })

   it.skip('should un starredFolder when we click the Remove From Starred action in workbook ', async () => {
      const { getAllByText } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
               welcomeMessageUIStore={welcomeMessageUIStore}
            >
               <FolderManagementRouteWithHoc dashboardStore={dashboardStore} />
            </Provider>
         </Router>
      )
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve(starredFoldersAndPinnedWorkbooksInfo)
      })
      const mockstarredFoldersAndPinnedWorkbooksAPI = jest.fn()
      mockstarredFoldersAndPinnedWorkbooksAPI.mockReturnValue(
         mockSuccessPromise
      )
      dashboardAPI.getPinnedWorkbooksAndStarredFoldersAPI = mockstarredFoldersAndPinnedWorkbooksAPI
      jest
         .spyOn(dashboardStore, 'addOrRemoveFolderStar')
         .mockImplementation(() => jest.fn())
      let unstarredElements
      await waitFor(() => {
         unstarredElements = getAllByText('Star Folder')
      })
      fireEvent.click(unstarredElements[0])
      expect(dashboardStore.addOrRemoveFolderStar).toHaveBeenCalledWith('2')
   })

   it.skip('should make  starredFolder when we click the Star Folder action in workbook ', async () => {
      const { getAllByText } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
               welcomeMessageUIStore={welcomeMessageUIStore}
            >
               <FolderManagementRouteWithHoc dashboardStore={dashboardStore} />
            </Provider>
         </Router>
      )
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve(starredFoldersAndPinnedWorkbooksInfo)
      })
      const mockstarredFoldersAndPinnedWorkbooksAPI = jest.fn()
      mockstarredFoldersAndPinnedWorkbooksAPI.mockReturnValue(
         mockSuccessPromise
      )
      dashboardAPI.getPinnedWorkbooksAndStarredFoldersAPI = mockstarredFoldersAndPinnedWorkbooksAPI
      jest
         .spyOn(dashboardStore, 'addOrRemoveFolderStar')
         .mockImplementation(() => jest.fn())
      let starredElements
      await waitFor(() => {
         starredElements = getAllByText('Remove from starred')
      })
      fireEvent.click(starredElements[0])
      expect(dashboardStore.addOrRemoveFolderStar).toHaveBeenCalledWith('0')
   })
})
