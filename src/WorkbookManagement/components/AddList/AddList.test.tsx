import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import AddList from '.'

describe('Add List tests', () => {
   it('should render AddList component', () => {
      const { queryByTestId } = render(
         <AddList
            listContainerRef={React.createRef<HTMLDivElement>()}
            pageId={'1'}
            listId={'1'}
            order={1}
            listName={''}
            onChangeListName={(): void => {}}
            onClickAddListButton={(): void => {}}
            onClickCancelButton={(): void => {}}
            createListAPIError={undefined}
            createListAPIStatus={200}
            getPageDetails={(): void => {}}
         />
      )

      expect(queryByTestId('listNameInput')).not.toBe(null)
      expect(queryByTestId('addListAddButton')).not.toBe(null)
      expect(queryByTestId('addListCancelButton')).not.toBe(null)
   })

   it('should render given list name', () => {
      const listName = 'Sample List'
      const { getByTestId } = render(
         <AddList
            listContainerRef={React.createRef<HTMLDivElement>()}
            pageId={'1'}
            listId={'1'}
            order={1}
            listName={listName}
            onChangeListName={(): void => {}}
            onClickAddListButton={(): void => {}}
            onClickCancelButton={(): void => {}}
            createListAPIError={undefined}
            createListAPIStatus={200}
            getPageDetails={(): void => {}}
         />
      )

      expect(getByTestId('listNameInput').value).toBe(listName)
   })

   it('should invoke respective callback functions', () => {
      const onClickAddListButton = jest.fn()
      const onClickCancelButton = jest.fn()
      const onChangeListName = jest.fn()
      const { getByTestId } = render(
         <AddList
            listContainerRef={React.createRef<HTMLDivElement>()}
            pageId={'1'}
            listId={'1'}
            order={1}
            listName={''}
            onChangeListName={onChangeListName}
            onClickAddListButton={onClickAddListButton()}
            onClickCancelButton={onClickCancelButton}
            createListAPIError={undefined}
            createListAPIStatus={200}
            getPageDetails={(): void => {}}
         />
      )

      fireEvent.click(getByTestId('addListAddButton'))
      expect(onClickAddListButton).toBeCalled()
      fireEvent.click(getByTestId('addListCancelButton'))
      expect(onClickCancelButton).toBeCalled()
      fireEvent.change(getByTestId('listNameInput'), {
         target: { value: 'Sample List' }
      })
      expect(onChangeListName).toBeCalled()
   })
})
