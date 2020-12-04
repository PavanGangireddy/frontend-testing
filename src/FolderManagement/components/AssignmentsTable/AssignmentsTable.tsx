import React, { Component, ReactElement, ReactNode } from 'react'

import Divider from '../../../Common/components/Divider'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

import {
   AssignmentTableContainer,
   RowContainer,
   RowWithDivider,
   TableHederContainer
} from './styledComponents'

interface AssignmentsTableProps {
   data: {
      headerData: any
      rows: any
      onClickWorkbook: (id: string, workbookStatus: string) => void
   }
   headerComponent: React.ComponentType<{ labels }> | null
   rowComponent
}

class AssignmentsTable extends Component<AssignmentsTableProps> {
   renderDivider = (shouldRender: boolean): ReactNode =>
      isMobileDevice || !shouldRender ? null : <Divider />

   renderRows = (): ReactNode => {
      const {
         data: { rows, onClickWorkbook },
         rowComponent: RowComponent
      } = this.props
      return rows.map((row, index) => {
         const { id, status } = row
         return (
            <RowWithDivider key={id}>
               <RowContainer onClick={(): void => onClickWorkbook(id, status)}>
                  <RowComponent data={row} />
               </RowContainer>
               {this.renderDivider(index !== rows.length - 1)}
            </RowWithDivider>
         )
      })
   }

   renderTableHeader = (): ReactNode => {
      const {
         data: { headerData },
         headerComponent: HeaderComponent
      } = this.props
      return isMobileDevice ? null : (
         <>
            <TableHederContainer>
               {HeaderComponent && <HeaderComponent labels={headerData} />}
            </TableHederContainer>
            {this.renderDivider(true)}
         </>
      )
   }

   render(): ReactElement {
      return (
         <AssignmentTableContainer>
            {this.renderTableHeader()}
            {this.renderRows()}
         </AssignmentTableContainer>
      )
   }
}

export default AssignmentsTable
