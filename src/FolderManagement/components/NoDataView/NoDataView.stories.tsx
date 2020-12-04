import React from 'react'
import { storiesOf } from '@storybook/react'

import NoDataView from './NoDataView'

storiesOf('WorkbookManagement/Workbook', module).add('No Data View', () => (
   <NoDataView
      onClickAddFolder={() => {}}
      onClickAddWorkbook={() => {}}
      type='NORMAL'
   />
))
