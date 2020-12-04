import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, withKnobs, object } from '@storybook/addon-knobs'
import tw, { css } from 'twin.macro'

import Tag from '.'

const tagCSS = css`
   ${tw`m-8px`}
`

storiesOf('Forms/Tag', module)
   .addDecorator(withKnobs)
   .add('with All Props', () => (
      <Tag
         tagName={text('tagText', 'Values')}
         onClickTagName={action('clicked tag')}
         onClickClose={action('clicked close')}
         containerCSS={object('containerCSS', tagCSS)}
      />
   ))
