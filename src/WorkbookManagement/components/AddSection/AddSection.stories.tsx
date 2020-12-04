import React from 'react'
import { storiesOf } from '@storybook/react'

import AddSection from '.'

storiesOf('Components/AddSection', module).add('AddSection Component', () => (
   <AddSection
      listId='1'
      createSectionAPI={() => alert('api called')}
      getCreateSectionAPIError={{ error: 'error' }}
      getCreateSectionAPIStatus={200}
      onSuccessCreateSectionAPI={() => alert('success')}
      onCloseAddSection={() => alert('section is closed')}
   />
))
