import React from 'react'
import { storiesOf } from '@storybook/react'

import BreadCrumb from '.'

//TODO:- this data is only for building story book
const data = [
   {
      id: '1',
      name: 'Ganesh'
   },
   {
      id: '2',
      name: 'Baba'
   },
   {
      id: '3',
      name: 'Hafeez'
   },
   {
      id: '4',
      name: 'Nagesh'
   }
]

storiesOf('Common-Components/BreadCrumb', module).add(
   'default bread crumb',
   () => (
      <BreadCrumb
         crumbs={data}
         onClickBreadCrumbItem={(selectedBreadCrumbId): any =>
            console.log('children', selectedBreadCrumbId)
         }
         selectedBreadCrumbId={'4'}
      />
   )
)
