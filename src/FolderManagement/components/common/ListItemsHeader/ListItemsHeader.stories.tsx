import React from 'react'
import { storiesOf } from '@storybook/react'

import ListItemsHeader from './ListItemsHeader'

storiesOf('WorkbookManagement/Common', module).add('List Items Header', () => (
   <ListItemsHeader isSharedWithMe={false} />
))
