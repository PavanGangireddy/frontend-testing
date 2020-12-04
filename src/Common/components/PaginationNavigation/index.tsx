import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { paginationTypes } from '../../constants/PaginationTypeConstants'
import BasicPagination from './BasicPagination'
import AdvancedPagination from './AdvancedPagination'

interface Props {
   totalNoOfItems: number
   itemsPerPage: number
   currentPage: number
   maxDisplayPagesCount: number
   onPagePress: (page: number) => void
   className?: string
   paginationContainerCSS?: React.CSSProperties
   type?: string
}

@observer
class Pagination extends Component<Props> {
   static types = paginationTypes
   static defaultProps = {
      type: paginationTypes.basic
   }
   render() {
      const { type, ...other } = this.props
      const { basic } = paginationTypes
      if (type === basic) {
         return <BasicPagination {...other} />
      }
      return <AdvancedPagination {...other} />
   }
}

export default Pagination
