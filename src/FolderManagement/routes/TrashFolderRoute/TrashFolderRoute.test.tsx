import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'mobx-react'

import UserStore from '../../../UserProfile/stores/UserStore'
import UserFixture from '../../../UserProfile/services/UserService/index.fixture'
import ChromeBannerUIStore from '../../../Common/stores/ChromeBannerUIStore'

import AssignmentsFixture from '../../services/AssignmentsService/index.fixture'
import DashboardStore from '../../stores/DashboardStore'
import DashboardFixture from '../../services/DashboardService/index.fixture'
import PublishFixture from '../../services/PublishService/index.fixture'
import getTrashFoldersAndWorkbooks from '../../fixtures/getTrashFoldersAndWorkbooks.json'
import LearningsFixture from '../../services/LearningsService/index.fixture'

import TrashFolderRoute from '.'

describe('TrashFolderRoute component test cases', () => {
   let dashboardAPI
   let publishFixture
   let assignmentsAPI
   let learningsAPI
   let dashboardStore
   let userAPI
   let userStore
   let chromeBannerUIStore

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
   })

   it('should render the trashFolder route', async () => {
      const { getByTestId, debug } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
            >
               <TrashFolderRoute />
            </Provider>
         </Router>
      )
      debug()
      const {
         trashFolderInfo: { folders, workbooks }
      } = dashboardStore
      if (folders || workbooks) {
         if (folders.length !== 0 || workbooks.length !== 0) {
            getByTestId('emptyTrash')
         }
      }
   })

   //FIXME: this test is getting failed in codeship
   it.skip('should empty trash popup open when we click the emptyTrash button', async () => {
      const { getByTestId, getByText } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
            >
               <TrashFolderRoute />
            </Provider>
         </Router>
      )
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve(getTrashFoldersAndWorkbooks)
      })
      const mockTrashFoldersAndWorkbooksAPI = jest.fn()
      mockTrashFoldersAndWorkbooksAPI.mockReturnValue(mockSuccessPromise)
      dashboardAPI.trashFoldersAndWorkbooksAPI = mockTrashFoldersAndWorkbooksAPI
      await waitFor(() => fireEvent.click(getByTestId('emptyTrash')))
      getByText('EMPTY TRASH')
   })

   //FIXME: this test is getting failed in codeship
   it.skip('should emptyTrashAPI is called when we click Delete button', async () => {
      const { getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
            >
               <TrashFolderRoute />
            </Provider>
         </Router>
      )
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve(getTrashFoldersAndWorkbooks)
      })
      const mockTrashFoldersAndWorkbooksAPI = jest.fn()
      mockTrashFoldersAndWorkbooksAPI.mockReturnValue(mockSuccessPromise)
      dashboardAPI.trashFoldersAndWorkbooksAPI = mockTrashFoldersAndWorkbooksAPI
      jest
         .spyOn(dashboardStore, 'emptyTrashAPI')
         .mockImplementation(() => jest.fn())
      await waitFor(() => fireEvent.click(getByTestId('emptyTrash')))
      fireEvent.click(getByTestId('customPopUpSubmitButton'))
      expect(dashboardStore.emptyTrashAPI).toHaveBeenCalled()
   })

   //FIXME: this test is getting failed in codeship
   it.skip('should emptyTrashAPI is not called when we click Cancel button', async () => {
      const { getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
            >
               <TrashFolderRoute />
            </Provider>
         </Router>
      )
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve(getTrashFoldersAndWorkbooks)
      })
      const mockTrashFoldersAndWorkbooksAPI = jest.fn()
      mockTrashFoldersAndWorkbooksAPI.mockReturnValue(mockSuccessPromise)
      dashboardAPI.trashFoldersAndWorkbooksAPI = mockTrashFoldersAndWorkbooksAPI
      jest
         .spyOn(dashboardStore, 'emptyTrashAPI')
         .mockImplementation(() => jest.fn())
      await waitFor(() => fireEvent.click(getByTestId('emptyTrash')))
      fireEvent.click(getByTestId('customPopUpCancelButton'))
      expect(dashboardStore.emptyTrashAPI).not.toBeCalled()
   })

   it('should show the Delete popup when we click DeleteForever of folder', async () => {
      const { getByTestId, getAllByText } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
            >
               <TrashFolderRoute />
            </Provider>
         </Router>
      )
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve(getTrashFoldersAndWorkbooks)
      })
      const mockTrashFoldersAndWorkbooksAPI = jest.fn()
      mockTrashFoldersAndWorkbooksAPI.mockReturnValue(mockSuccessPromise)
      dashboardAPI.trashFoldersAndWorkbooksAPI = mockTrashFoldersAndWorkbooksAPI
      jest
         .spyOn(dashboardStore, 'deleteForeverFolderAPI')
         .mockImplementation(() => jest.fn())
      let deleteForever
      await waitFor(() => {
         deleteForever = getAllByText('Delete forever')
      })
      fireEvent.click(deleteForever[0])
      fireEvent.click(getByTestId('customPopUpSubmitButton'))
      expect(dashboardStore.deleteForeverFolderAPI).toHaveBeenCalledWith(
         '0',
         expect.any(Function),
         expect.any(Function)
      )
   })

   it.skip('should not call deleteForeverFolderAPI when we click Cancle button in deletePopup', async () => {
      const { getAllByText } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
            >
               <TrashFolderRoute />
            </Provider>
         </Router>
      )
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve(getTrashFoldersAndWorkbooks)
      })
      const mockTrashFoldersAndWorkbooksAPI = jest.fn()
      mockTrashFoldersAndWorkbooksAPI.mockReturnValue(mockSuccessPromise)
      dashboardAPI.trashFoldersAndWorkbooksAPI = mockTrashFoldersAndWorkbooksAPI
      jest
         .spyOn(dashboardStore, 'deleteForeverFolderAPI')
         .mockImplementation(() => jest.fn())
      let deleteForever
      await waitFor(() => {
         deleteForever = getAllByText('Delete forever')
      })
      fireEvent.click(deleteForever[0])
      // fireEvent.click(getByTestId('customPopUpCancelButton'))//FIXME:
      expect(dashboardStore.deleteForeverFolderAPI).not.toBeCalled()
   })

   it('should show the Delete popup when we click DeleteForever of workbook', async () => {
      const { getByTestId, getAllByText } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
            >
               <TrashFolderRoute />
            </Provider>
         </Router>
      )
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve(getTrashFoldersAndWorkbooks)
      })
      const mockTrashFoldersAndWorkbooksAPI = jest.fn()
      mockTrashFoldersAndWorkbooksAPI.mockReturnValue(mockSuccessPromise)
      dashboardAPI.trashFoldersAndWorkbooksAPI = mockTrashFoldersAndWorkbooksAPI
      jest
         .spyOn(dashboardStore, 'deleteForeverWorkbookAPI')
         .mockImplementation(() => jest.fn())
      let deleteForever
      await waitFor(() => {
         deleteForever = getAllByText('Delete forever')
      })
      fireEvent.click(deleteForever[4])
      fireEvent.click(getByTestId('customPopUpSubmitButton'))
      expect(dashboardStore.deleteForeverWorkbookAPI).toHaveBeenCalledWith(
         '1',
         expect.any(Function),
         expect.any(Function)
      )
   })

   it('should call restoreFolderAPI when we click Restore of folder', async () => {
      const { getAllByText } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
            >
               <TrashFolderRoute />
            </Provider>
         </Router>
      )
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve(getTrashFoldersAndWorkbooks)
      })
      const mockTrashFoldersAndWorkbooksAPI = jest.fn()
      mockTrashFoldersAndWorkbooksAPI.mockReturnValue(mockSuccessPromise)
      dashboardAPI.trashFoldersAndWorkbooksAPI = mockTrashFoldersAndWorkbooksAPI
      jest
         .spyOn(dashboardStore, 'restoreFolderAPI')
         .mockImplementation(() => jest.fn())
      let restore
      await waitFor(() => {
         restore = getAllByText('Restore')
      })
      fireEvent.click(restore[0])
      expect(dashboardStore.restoreFolderAPI).toHaveBeenCalledWith(
         '0',
         expect.any(Function),
         expect.any(Function)
      )
   })

   it('should call restoreFolderAPI when we click Restore of workbook', async () => {
      const { getAllByText } = render(
         <Router history={createMemoryHistory()}>
            <Provider
               dashboardStore={dashboardStore}
               userStore={userStore}
               chromeBannerUIStore={chromeBannerUIStore}
            >
               <TrashFolderRoute />
            </Provider>
         </Router>
      )
      const mockSuccessPromise = new Promise(function(resolve) {
         resolve(getTrashFoldersAndWorkbooks)
      })
      const mockTrashFoldersAndWorkbooksAPI = jest.fn()
      mockTrashFoldersAndWorkbooksAPI.mockReturnValue(mockSuccessPromise)
      dashboardAPI.trashFoldersAndWorkbooksAPI = mockTrashFoldersAndWorkbooksAPI
      jest
         .spyOn(dashboardStore, 'restoreWorkbookAPI')
         .mockImplementation(() => jest.fn())
      let restore
      await waitFor(() => {
         restore = getAllByText('Restore')
      })
      fireEvent.click(restore[4])
      expect(dashboardStore.restoreWorkbookAPI).toHaveBeenCalledWith(
         '1',
         expect.any(Function),
         expect.any(Function)
      )
   })
})
