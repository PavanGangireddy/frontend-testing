import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, object } from '@storybook/addon-knobs'
import tw, { css } from 'twin.macro'

import TagGroup from '.'

const tagsList = [
   { label: 'Value1', value: 'VALUE1' },
   { label: 'Value2', value: 'VALUE2' },
   { label: 'Value3', value: 'VALUE3' },
   { label: 'Value4', value: 'VALUE4' },
   { label: 'Value5', value: 'VALUE5' },
   { label: 'Value6', value: 'VALUE6' },
   { label: 'Value7', value: 'VALUE7' },
   { label: 'Value8', value: 'VALUE8' },
   { label: 'Value9', value: 'VALUE9' }
]

const containerCSS = css`
   ${tw`m-8px`}
`

storiesOf('Forms/TagGroup', module)
   .addDecorator(withKnobs)
   .add('withAllProps', () => (
      <TagGroup
         tagsList={object('tagsList', tagsList)}
         onClickTag={action('clicked tag')}
         onClickClose={action('clicked close')}
         onClickAdd={action('clicked add')}
         containerCSS={object('containerCSS', containerCSS)}
      />
   ))
