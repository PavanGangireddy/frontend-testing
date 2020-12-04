import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import SearchComponentWithSelect from '.'

storiesOf('Forms/SelectField', module)
   .addDecorator(withKnobs)
   .add('Search with React Select', () => (
      <SearchComponentWithSelect
         optionsData={{}}
         onChangeText={() => {}}
         getFolderIdOfAWorkbookAPI={() => {}}
      />
   ))
