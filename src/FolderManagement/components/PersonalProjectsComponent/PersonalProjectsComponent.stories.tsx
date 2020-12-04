import React from 'react'
import { storiesOf } from '@storybook/react'

import PersonalProjectsComponent from './PersonalProjectsComponent'

storiesOf(
   'FolderManagement/PersonalProjectsComponent',
   module
).add('Default View', () => (
   <PersonalProjectsComponent isPersonalProjectsLocked={true} />
))
