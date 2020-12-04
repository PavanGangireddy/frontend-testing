import React from 'react'
import { storiesOf } from '@storybook/react'

import AssignmentResultsSideBar from '.'

storiesOf(
   'WorkbookManagement/Workbook/Result SideBar',
   module
).add('Section Card With Notes and Attachments Icons', () => (
   <AssignmentResultsSideBar
      totalScore={120}
      securedScore={43}
      correctAnswersCount={6}
      wrongAnswersCount={4}
      onClickCloseSideBarButton={(): void => {}}
   />
))
