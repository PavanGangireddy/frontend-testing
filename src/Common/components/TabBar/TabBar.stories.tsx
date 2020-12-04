import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, object } from '@storybook/addon-knobs'
import { css } from 'styled-components'

import TabBar from '.'

const tabsList = [
   { label: 'Comments', value: 'COMMENTS' },
   { label: 'History', value: 'HISTORY' }
]

const containerCSS = css`
   margin-top: 30px;
`

storiesOf('Navigation/TabBar', module)
   .addDecorator(withKnobs)
   .add('default', () => (
      <TabBar
         tabsList={object('tabsList', tabsList)}
         onClickTab={action('clicked tab')}
         defaultSelectedTab={text('defaultSelectedTab', 'COMMENTS')}
         containerCSS={containerCSS}
      />
   ))
