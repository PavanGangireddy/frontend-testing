import React from 'react'
import { storiesOf } from '@storybook/react'
import tw, { css } from 'twin.macro'
import { withKnobs, boolean, object } from '@storybook/addon-knobs'

import CollapsibleView from '.'

const containerCSS = css`
   ${tw`bg-paleGrey`}
`

const DetailsView = (): React.ReactNode => (
   <div>
      <p>Details</p>
   </div>
)
const SummaryView = (): React.ReactNode => (
   <div>
      <p>Section</p>
   </div>
)

storiesOf('Behaviour/CollapsibleView', module)
   .addDecorator(withKnobs)
   .add('with Knobs View', () => (
      <CollapsibleView
         renderSummaryView={SummaryView}
         renderDetailsView={DetailsView}
         isOpen={boolean('isOpen', true)}
         containerCSS={object('containerCSS', containerCSS)}
      />
   ))
