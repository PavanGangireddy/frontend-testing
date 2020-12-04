import React from 'react'
import { storiesOf } from '@storybook/react'
import { API_INITIAL } from '@ib/api-constants'

import InputBoxWithSelect from '.'

const dropdownData = [
   {
      role: 'Commentor',
      displayName: 'Can Comment'
   },
   {
      role: 'Viewer',
      displayName: 'Can View'
   },
   {
      role: 'Editor',
      displayName: 'Can Edit'
   }
]

storiesOf('Forms/InputWithSelectField', module).add('UI dropdown', () => (
   <InputBoxWithSelect
      dropdownData={dropdownData}
      shareFolderOrWorkbookAPIStatus={API_INITIAL}
      shareFolderOrWorkbookAPI={() => {}}
   />
))
