import React from 'react'
import { storiesOf } from '@storybook/react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import PaginationNavigation from '.'

@observer
class PaginationNavigationUI extends React.Component {
   @observable currentPage: number

   constructor(props) {
      super(props)
      this.currentPage = 2
   }

   onChangePage = (page: number): void => {
      this.currentPage = page
   }

   render(): React.ReactNode {
      return (
         <PaginationNavigation
            itemsPerPage={4}
            totalNoOfItems={27}
            currentPage={this.currentPage}
            maxDisplayPagesCount={5}
            onPagePress={this.onChangePage}
         />
      )
   }
}

@observer
class AdvancedPaginationNavigationUI extends React.Component {
   @observable currentPage: number

   constructor(props) {
      super(props)
      this.currentPage = 2
   }

   onChangePage = (page: number): void => {
      this.currentPage = page
   }

   render(): React.ReactNode {
      return (
         <PaginationNavigation
            itemsPerPage={4}
            totalNoOfItems={27}
            currentPage={this.currentPage}
            maxDisplayPagesCount={5}
            onPagePress={this.onChangePage}
            type={PaginationNavigation.types.advanced}
         />
      )
   }
}

storiesOf('PaginationNavigation', module).add('BasicPagination', () => (
   <PaginationNavigationUI />
))

storiesOf('PaginationNavigation', module).add('AdvancedPagination', () => (
   <AdvancedPaginationNavigationUI />
))
