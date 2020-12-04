import React from 'react'
import { storiesOf } from '@storybook/react'
import tw, { styled } from 'twin.macro'

import EmptyWorkbook from './EmptyWorkbook'

const Div = styled.div`
   ${tw`
        box-border
    `}
`

storiesOf('WorkbookManagement/Workbook', module).add('Empty Workbook', () => (
   <Div>
      <EmptyWorkbook onClickAddPageButton={() => {}} />
   </Div>
))
