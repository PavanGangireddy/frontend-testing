import React from 'react'
import { storiesOf } from '@storybook/react'

import ColorPalette from '.'

storiesOf('ColorPalette', module).add('ColorPalette', () => (
   <ColorPalette
      onChangeSelectedColor={color => {
         console.log('selected color', color)
      }}
   />
))
