import React from 'react'
import { render } from '@testing-library/react'
import { API_FETCHING, API_FAILED, API_SUCCESS } from '@ib/api-constants'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'mobx-react'

import DashboardStore from '../../stores/DashboardStore'
import DashboardFixture from '../../services/DashboardService/index.fixture'
import PublishFixture from '../../services/PublishService/index.fixture'
import AssignmentsFixture from '../../services/AssignmentsService/index.fixture'
import LearningsFixture from '../../services/LearningsService/index.fixture'

import UserWorkbooksAndFolders from '.'

describe('UserWorkbooksAndFolders', () => {
   let dashboardAPI
   let publishFixture
   let dashboardStore
   let onChangeOrder
   let doNetworkCallForFoldersAndWorkbooks
   let onDoubleClickWorkbook
   let getRootFolderDetails
   let onDoubleClickFolder
   let onClickFolderMenuItem
   let onClickWorkbookMenuItem
   let assignmentsAPI
   let learnigsAPI

   beforeEach(() => {
      dashboardAPI = new DashboardFixture()
      publishFixture = new PublishFixture()
      assignmentsAPI = new AssignmentsFixture()
      learnigsAPI = new LearningsFixture()
      dashboardStore = new DashboardStore(
         dashboardAPI,
         assignmentsAPI,
         publishFixture,
         learnigsAPI
      )
      onChangeOrder = jest.fn()
      doNetworkCallForFoldersAndWorkbooks = jest.fn()
      onDoubleClickWorkbook = jest.fn()
      getRootFolderDetails = jest.fn()
      onDoubleClickFolder = jest.fn()
      onClickFolderMenuItem = jest.fn()
      onClickWorkbookMenuItem = jest.fn()
   })
   it('should UserWorkbooksAndFolders fetching state', () => {
      const { getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Provider dashboardStore={dashboardStore}>
               <UserWorkbooksAndFolders
                  onChangeOrder={onChangeOrder}
                  userFolders={[]}
                  pathInfo={[]}
                  getWorkbooksAndFoldersAPIStatus={API_FETCHING}
                  getWorkbooksAndFoldersAPIError={null}
                  doNetworkCallForFoldersAndWorkbooks={
                     doNetworkCallForFoldersAndWorkbooks
                  }
                  onDoubleClickWorkbook={onDoubleClickWorkbook}
                  getRootFolderDetailsAPIStatus={API_SUCCESS}
                  getRootFolderDetailsAPIError={null}
                  getRootFolderDetails={getRootFolderDetails}
                  onDoubleClickFolder={onDoubleClickFolder}
                  onClickFolderMenuItem={onClickFolderMenuItem}
                  onClickWorkbookMenuItem={onClickWorkbookMenuItem}
                  isSharedWithMe={false}
                  currentRoute={'home'}
               />
            </Provider>
         </Router>
      )
      getByTestId(/loader/)
   })

   it('should UserWorkbooksAndFolders failure state', () => {
      const { getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Provider dashboardStore={dashboardStore}>
               <UserWorkbooksAndFolders
                  onChangeOrder={onChangeOrder}
                  userFolders={[]}
                  pathInfo={[]}
                  getWorkbooksAndFoldersAPIStatus={API_FAILED}
                  getWorkbooksAndFoldersAPIError={'error'}
                  doNetworkCallForFoldersAndWorkbooks={
                     doNetworkCallForFoldersAndWorkbooks
                  }
                  onDoubleClickWorkbook={onDoubleClickWorkbook}
                  getRootFolderDetailsAPIStatus={API_SUCCESS}
                  getRootFolderDetailsAPIError={null}
                  getRootFolderDetails={getRootFolderDetails}
                  onDoubleClickFolder={onDoubleClickFolder}
                  onClickFolderMenuItem={onClickFolderMenuItem}
                  onClickWorkbookMenuItem={onClickWorkbookMenuItem}
                  isSharedWithMe={false}
                  currentRoute={'home'}
               />
            </Provider>
         </Router>
      )
      getByTestId(/retryButton/)
   })

   it('should UserWorkbooksAndFolders Success state', () => {
      const { getByText } = render(
         <Router history={createMemoryHistory()}>
            <Provider dashboardStore={dashboardStore}>
               <UserWorkbooksAndFolders
                  onChangeOrder={onChangeOrder}
                  userFolders={[
                     {
                        id: '0',
                        name: 'Folder 1',
                        isStarred: true,
                        lastModified: '27-06-2020'
                     }
                  ]}
                  userWorkbooks={[]}
                  pathInfo={[]}
                  getWorkbooksAndFoldersAPIStatus={API_SUCCESS}
                  getWorkbooksAndFoldersAPIError={null}
                  doNetworkCallForFoldersAndWorkbooks={
                     doNetworkCallForFoldersAndWorkbooks
                  }
                  onDoubleClickWorkbook={onDoubleClickWorkbook}
                  getRootFolderDetailsAPIStatus={API_SUCCESS}
                  getRootFolderDetailsAPIError={null}
                  getRootFolderDetails={getRootFolderDetails}
                  onDoubleClickFolder={onDoubleClickFolder}
                  onClickFolderMenuItem={onClickFolderMenuItem}
                  onClickWorkbookMenuItem={onClickWorkbookMenuItem}
                  isSharedWithMe={false}
                  currentRoute={'home'}
               />
            </Provider>
         </Router>
      )
      getByText(/Folder 1/)
   })

   it('should show the trash empty view', () => {
      const { getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Provider dashboardStore={dashboardStore}>
               <UserWorkbooksAndFolders
                  onChangeOrder={onChangeOrder}
                  userFolders={[]}
                  userWorkbooks={[]}
                  pathInfo={[]}
                  getWorkbooksAndFoldersAPIStatus={API_SUCCESS}
                  getWorkbooksAndFoldersAPIError={null}
                  doNetworkCallForFoldersAndWorkbooks={
                     doNetworkCallForFoldersAndWorkbooks
                  }
                  onDoubleClickWorkbook={onDoubleClickWorkbook}
                  getRootFolderDetailsAPIStatus={API_SUCCESS}
                  getRootFolderDetailsAPIError={null}
                  getRootFolderDetails={getRootFolderDetails}
                  onDoubleClickFolder={onDoubleClickFolder}
                  onClickFolderMenuItem={onClickFolderMenuItem}
                  onClickWorkbookMenuItem={onClickWorkbookMenuItem}
                  isSharedWithMe={false}
                  currentRoute={'trash'}
               />
            </Provider>
         </Router>
      )
      getByTestId(/trashFolderEmptyView/)
   })

   it('should show the shared with me empty view', () => {
      const { getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Provider dashboardStore={dashboardStore}>
               <UserWorkbooksAndFolders
                  onChangeOrder={onChangeOrder}
                  userFolders={[]}
                  userWorkbooks={[]}
                  pathInfo={[]}
                  getWorkbooksAndFoldersAPIStatus={API_SUCCESS}
                  getWorkbooksAndFoldersAPIError={null}
                  doNetworkCallForFoldersAndWorkbooks={
                     doNetworkCallForFoldersAndWorkbooks
                  }
                  onDoubleClickWorkbook={onDoubleClickWorkbook}
                  getRootFolderDetailsAPIStatus={API_SUCCESS}
                  getRootFolderDetailsAPIError={null}
                  getRootFolderDetails={getRootFolderDetails}
                  onDoubleClickFolder={onDoubleClickFolder}
                  onClickFolderMenuItem={onClickFolderMenuItem}
                  onClickWorkbookMenuItem={onClickWorkbookMenuItem}
                  isSharedWithMe={true}
                  currentRoute={'shared with me'}
               />
            </Provider>
         </Router>
      )
      getByTestId(/noSharedData/)
   })

   it('should show the No data view in home page', () => {
      const { queryByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Provider dashboardStore={dashboardStore}>
               <UserWorkbooksAndFolders
                  onChangeOrder={onChangeOrder}
                  userFolders={[]}
                  userWorkbooks={[]}
                  pathInfo={[]}
                  getWorkbooksAndFoldersAPIStatus={API_SUCCESS}
                  getWorkbooksAndFoldersAPIError={null}
                  doNetworkCallForFoldersAndWorkbooks={
                     doNetworkCallForFoldersAndWorkbooks
                  }
                  onDoubleClickWorkbook={onDoubleClickWorkbook}
                  getRootFolderDetailsAPIStatus={API_SUCCESS}
                  getRootFolderDetailsAPIError={null}
                  getRootFolderDetails={getRootFolderDetails}
                  onDoubleClickFolder={onDoubleClickFolder}
                  onClickFolderMenuItem={onClickFolderMenuItem}
                  onClickWorkbookMenuItem={onClickWorkbookMenuItem}
                  isSharedWithMe={false}
                  currentRoute={'home'}
               />
            </Provider>
         </Router>
      )
      expect(queryByTestId(/noSharedData/)).toBeNull()
   })

   it('should show the No data view in active folder', () => {
      const { getByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Provider dashboardStore={dashboardStore}>
               <UserWorkbooksAndFolders
                  onChangeOrder={onChangeOrder}
                  userFolders={[]}
                  userWorkbooks={[]}
                  pathInfo={[{ id: '0', name: 'Orange' }]}
                  getWorkbooksAndFoldersAPIStatus={API_SUCCESS}
                  getWorkbooksAndFoldersAPIError={null}
                  doNetworkCallForFoldersAndWorkbooks={
                     doNetworkCallForFoldersAndWorkbooks
                  }
                  onDoubleClickWorkbook={onDoubleClickWorkbook}
                  getRootFolderDetailsAPIStatus={API_SUCCESS}
                  getRootFolderDetailsAPIError={null}
                  getRootFolderDetails={getRootFolderDetails}
                  onDoubleClickFolder={onDoubleClickFolder}
                  onClickFolderMenuItem={onClickFolderMenuItem}
                  onClickWorkbookMenuItem={onClickWorkbookMenuItem}
                  isSharedWithMe={false}
                  currentRoute={'active folder'}
               />
            </Provider>
         </Router>
      )
      getByTestId(/noDataViewInActiveFolder/)
   })
})
