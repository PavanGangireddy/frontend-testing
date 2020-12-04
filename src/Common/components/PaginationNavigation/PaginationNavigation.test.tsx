import React from 'react'
import { fireEvent, render, act } from '@testing-library/react'

import PaginationNavigation from '.'

describe('PaginationNavigation', () => {
   let onPressPage
   beforeEach(() => {
      onPressPage = jest.fn()
   })

   it('should call onPressPage with next page onclick next button in advanced pagination', () => {
      act(() => {
         const { getByTestId } = render(
            <PaginationNavigation
               type={PaginationNavigation.types.advanced}
               itemsPerPage={4}
               totalNoOfItems={27}
               currentPage={3}
               maxDisplayPagesCount={8}
               onPagePress={onPressPage}
            />
         )

         fireEvent.click(getByTestId('paginationRightArrow'))
         expect(onPressPage).toBeCalledWith(4)
      })
   })

   it('should call onPressPage with previous page onclick previous button in advanced pagination', () => {
      act(() => {
         const { getByTestId } = render(
            <PaginationNavigation
               type={PaginationNavigation.types.advanced}
               itemsPerPage={4}
               totalNoOfItems={27}
               currentPage={3}
               maxDisplayPagesCount={8}
               onPagePress={onPressPage}
            />
         )

         fireEvent.click(getByTestId('paginationLeftArrow'))
         expect(onPressPage).toBeCalledWith(2)
      })
   })

   it('should call onPressPage with page selected number', () => {
      act(() => {
         const { getByText } = render(
            <PaginationNavigation
               itemsPerPage={4}
               totalNoOfItems={27}
               currentPage={3}
               maxDisplayPagesCount={8}
               onPagePress={onPressPage}
            />
         )

         fireEvent.click(getByText('2'))
         expect(onPressPage).toBeCalledWith(2)
      })
   })

   it('should display total number of items completed', () => {
      act(() => {
         const { getByText } = render(
            <PaginationNavigation
               itemsPerPage={4}
               totalNoOfItems={27}
               currentPage={3}
               maxDisplayPagesCount={8}
               onPagePress={onPressPage}
            />
         )
         fireEvent.click(getByText('9 to 12 of 27'))
      })
   })
})
