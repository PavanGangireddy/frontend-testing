import React from 'react'
import { storiesOf } from '@storybook/react'

import MobileHeader from '.'

storiesOf('MobileCardDetails', module).add('defaultView', () => (
   <MobileHeader
      onClickBack={() => {}}
      NavBarContainerCSS={{ background: 'orange' }}
      renderEditableTextInput={() => <p>hello</p>}
      cardTitle={'rgukt'}
      openMoveCardModal={() => {}}
      onDeleteCard={() => {}}
      deleteCardAPIStatus={200}
      onClickMoveCard={(): void => {}}
      cardLabelTextColor={null}
   />
))
