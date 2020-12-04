import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import WorkbooksAndFoldersFilterBar from '.'

describe('WorkbooksAndFoldersFilterBar component test cases', () => {
   let onClickGridViewButton
   let onClickListViewButton
   let onChangeOrder
   let onDoubleClickFolder
   let orderOptions
   let orderBy
   beforeEach(() => {
      onClickGridViewButton = jest.fn()
      onClickListViewButton = jest.fn()
      onChangeOrder = jest.fn()
      onDoubleClickFolder = jest.fn()
      orderOptions = [
         { label: 'A to Z', value: 'ASC' },
         { label: 'Z to A', value: 'DESC' }
      ]
      orderBy = {
         label: 'A to Z',
         value: 'ASC'
      }
   })

   it('should show filterBar', () => {
      const { getByTestId } = render(
         <WorkbooksAndFoldersFilterBar
            pathInfo={[]}
            itemsView={'GRID'}
            orderBy={orderBy}
            orderOptions={orderOptions}
            onClickGridViewButton={onClickGridViewButton}
            onClickListViewButton={onClickListViewButton}
            onChangeOrder={onChangeOrder}
            onDoubleClickFolder={onDoubleClickFolder}
            isSharedWithMe={false}
            currentRoute={'active'}
         />
      )
      getByTestId('filterBar')
   })

   it('should show A-Z value as default orderBy', () => {
      const { getByText } = render(
         <WorkbooksAndFoldersFilterBar
            pathInfo={[]}
            itemsView={'GRID'}
            orderBy={orderBy}
            orderOptions={orderOptions}
            onClickGridViewButton={onClickGridViewButton}
            onClickListViewButton={onClickListViewButton}
            onChangeOrder={onChangeOrder}
            onDoubleClickFolder={onDoubleClickFolder}
            isSharedWithMe={false}
            currentRoute={'active'}
         />
      )
      getByText('A to Z')
   })

   it('should show Z-A when we change the value', () => {
      const { getByText, container } = render(
         <WorkbooksAndFoldersFilterBar
            pathInfo={[]}
            itemsView={'GRID'}
            orderBy={orderBy}
            orderOptions={orderOptions}
            onClickGridViewButton={onClickGridViewButton}
            onClickListViewButton={onClickListViewButton}
            onChangeOrder={onChangeOrder}
            onDoubleClickFolder={onDoubleClickFolder}
            isSharedWithMe={false}
            currentRoute={'active'}
         />
      )
      fireEvent.focus(container.querySelector('input'))
      fireEvent.keyDown(container.querySelector('input'), {
         key: 'ArrowDown',
         code: 40
      })
      fireEvent.click(getByText('Z to A'))
      expect(onChangeOrder).toBeCalled()
      expect(onChangeOrder).toHaveBeenCalledWith(
         { label: 'Z to A', value: 'DESC' },
         { action: 'select-option', name: undefined, option: undefined }
      )
   })

   it('should show BreadCrumb', () => {
      const { getByText } = render(
         <WorkbooksAndFoldersFilterBar
            pathInfo={[
               {
                  id: '10',
                  name: 'Orange1',
                  type: 'PROJECT'
               },
               {
                  id: '11',
                  name: 'Orange',
                  type: 'NORMAL'
               }
            ]}
            itemsView={'GRID'}
            orderBy={orderBy}
            orderOptions={orderOptions}
            onClickGridViewButton={onClickGridViewButton}
            onClickListViewButton={onClickListViewButton}
            onChangeOrder={onChangeOrder}
            onDoubleClickFolder={onDoubleClickFolder}
            isSharedWithMe={false}
            currentRoute={'folder'}
         />
      )
      getByText('Orange')
   })
})
