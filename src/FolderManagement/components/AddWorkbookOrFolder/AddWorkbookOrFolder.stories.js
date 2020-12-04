import React from 'react'
import { storiesOf } from '@storybook/react'
import AddWorkbookOrFolder from '.'

storiesOf('Add Workbook', module).add('Add button', () => (
   <AddWorkbookOrFolder
      isSharedWithMeRoute={false}
      getSharedWorkbooksAndFoldersOfASubFolderAPI={() => {}}
   />
))
