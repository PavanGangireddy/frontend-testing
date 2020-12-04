import React, { ReactNode, ReactElement } from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'mobx-react'
import { API_INITIAL } from '@ib/api-constants'

import DashboardStore from '../../stores/DashboardStore'
import DashboardFixture from '../../services/DashboardService/index.fixture'
import PublishFixture from '../../services/PublishService/index.fixture'
import AssignmentsFixture from '../../services/AssignmentsService/index.fixture'
import LearningsFixture from '../../services/LearningsService/index.fixture'

import AddWorkbookOrFolder from '.'

describe('AddWorkbookOrFolder component test cases', () => {
   let dashboardAPI
   let publishFixture
   let assignmentsAPI
   let dashboardStore
   let createFolderAPI
   let createWorkbookAPI
   let getWorkbooksAndFoldersAPI
   let getSharedWorkbooksAndFoldersOfASubFolderAPI
   let learningsAPI

   const renderAddWorkbookOrFolder = (): ReactNode => (
      <AddWorkbookOrFolder
         createFolderAPI={createFolderAPI}
         createWorkbookAPI={createWorkbookAPI}
         createFolderOrWorkbookAPIStatus={API_INITIAL}
         createFolderOrWorkbookAPIError={null}
         rootFolderId={'1'}
         getWorkbooksAndFoldersAPIStatus={API_INITIAL}
         getRootFolderDetailsAPIStatus={API_INITIAL}
         getWorkbooksAndFoldersAPI={getWorkbooksAndFoldersAPI}
         isSharedWithMeRoute={false}
         getSharedWorkbooksAndFoldersOfASubFolderAPI={
            getSharedWorkbooksAndFoldersOfASubFolderAPI
         }
      />
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
      createFolderAPI = jest.fn()
      createWorkbookAPI = jest.fn()
      getWorkbooksAndFoldersAPI = jest.fn()
      getSharedWorkbooksAndFoldersOfASubFolderAPI = jest.fn()
   })

   it('should show CreateFolderOrWorkbook pop', () => {
      const { getByTestId, getAllByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Provider dashboardStore={dashboardStore}>
               {renderAddWorkbookOrFolder()}
            </Provider>
         </Router>
      )

      fireEvent.click(getByTestId(/target/))
      const MenuItems = getAllByTestId('addButtonMenuItem')
      fireEvent.click(MenuItems[0])
      getByTestId('input')
   })

   it('should invoke the createWorkbookAPI when we create workbook', () => {
      const { getByTestId, getAllByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Provider dashboardStore={dashboardStore}>
               {renderAddWorkbookOrFolder()}
            </Provider>
         </Router>
      )

      fireEvent.click(getByTestId(/target/))
      const MenuItems = getAllByTestId('addButtonMenuItem')
      fireEvent.click(MenuItems[0])
      const input = getByTestId('input')
      fireEvent.change(input, { target: { value: 'Orange' } })
      expect(input.value).toBe('Orange')
      fireEvent.click(getByTestId('createButton'))
      expect(createWorkbookAPI).toBeCalled()
   })

   it('should not invoke the createWorkbookAPI when we give empty workbook name', () => {
      const { getByTestId, getAllByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Provider dashboardStore={dashboardStore}>
               {renderAddWorkbookOrFolder()}
            </Provider>
         </Router>
      )

      fireEvent.click(getByTestId(/target/))
      const MenuItems = getAllByTestId('addButtonMenuItem')
      fireEvent.click(MenuItems[0])
      const input = getByTestId('input')
      fireEvent.change(input, { target: { value: '' } })
      fireEvent.click(getByTestId('createButton'))
      expect(createWorkbookAPI).not.toBeCalled()
   })

   it('should invoke the createFolderAPI when  create folder', () => {
      const { getByTestId, getAllByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Provider dashboardStore={dashboardStore}>
               {renderAddWorkbookOrFolder()}
            </Provider>
         </Router>
      )

      fireEvent.click(getByTestId(/target/))
      const MenuItems = getAllByTestId('addButtonMenuItem')
      fireEvent.click(MenuItems[1])
      const input = getByTestId('input')
      fireEvent.change(input, { target: { value: 'Orange' } })
      expect(input.value).toBe('Orange')
      fireEvent.click(getByTestId('createButton'))
      expect(createFolderAPI).toHaveBeenCalledWith(
         { folder_name: 'Orange', parent_folder_id: '1' },
         expect.any(Function),
         expect.any(Function)
      )
   })

   it.skip('should close the create folder/workbook popup modal when we click cancel button', async () => {
      const { getByTestId, getAllByTestId } = render(
         <Router history={createMemoryHistory()}>
            <Provider dashboardStore={dashboardStore}>
               {renderAddWorkbookOrFolder()}
            </Provider>
         </Router>
      )

      fireEvent.click(getByTestId(/target/))
      const MenuItems = getAllByTestId('addButtonMenuItem')
      fireEvent.click(MenuItems[1])
      const input = getByTestId('input')
      fireEvent.change(input, { target: { value: 'Orange' } })
      expect(input.value).toBe('Orange')
      const cancelButton = getByTestId('cancelButton')
      fireEvent.click(cancelButton) //FIXME:

      //TODO:need to check the createFolderAPI call is not invoking
      //    expect(createWorkbookAPI).not.toBeCalled()
   })
})
