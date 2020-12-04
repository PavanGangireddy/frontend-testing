import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import BreadCrumb from '.'

describe('BreadCrumb component test cases', () => {
   it('should call onClickBreadCrumbItem function', () => {
      const data = [
         {
            id: '1',
            name: 'Ganesh'
         }
      ]
      const onClick = jest.fn()
      const { getByTestId } = render(
         <BreadCrumb
            crumbs={data}
            selectedBreadCrumbId={'4'}
            onClickBreadCrumbItem={onClick}
         />
      )

      fireEvent.click(getByTestId('Ganesh'))
      expect(onClick).toBeCalledWith('1')
   })

   it('should show the MenuContainer when we click the popOverMenu', () => {
      const data = [
         {
            id: '1',
            name: 'Ganesh'
         },
         {
            id: '2',
            name: 'Apple'
         },
         {
            id: '3',
            name: 'Bat'
         },
         {
            id: '4',
            name: 'Cat'
         },
         {
            id: '5',
            name: 'Cow'
         }
      ]
      const onClick = jest.fn()
      const { getByTestId, getByText } = render(
         <BreadCrumb
            crumbs={data}
            selectedBreadCrumbId={'4'}
            onClickBreadCrumbItem={onClick}
         />
      )
      fireEvent.click(getByTestId('trigger'))
      getByText('Cow')
      fireEvent.click(getByText('Cow'))
      expect(onClick).toBeCalledWith('5')
   })
})
