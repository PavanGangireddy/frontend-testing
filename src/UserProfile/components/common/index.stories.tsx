import React, { ReactElement } from 'react'
import { storiesOf } from '@storybook/react'
import tw, { css } from 'twin.macro'

import MobileLayoutWrapper from '.'

function renderBody(): ReactElement {
   return <p>renderBody</p>
}

storiesOf('Authentication/Layout', module).add('default view', () => (
   <MobileLayoutWrapper
      headerCSS={css`
         ${tw`bg-whiteTwo`}
      `}
      imageURL='https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/bcdbbc84-3472-4adb-96f4-f443782ba182.png'
      renderBody={renderBody}
   />
))
