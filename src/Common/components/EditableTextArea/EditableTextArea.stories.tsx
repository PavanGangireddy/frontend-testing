import React from 'react'
import { storiesOf } from '@storybook/react'
import tw, { css } from 'twin.macro'

import { Typo32DarkBlueGreyHKGroteskMedium } from '../../styleGuide/Typos'
import EditableTextArea from '.'

const textAreaCss = css`
   ${tw`w-full h-64 text-3xl `}
`

storiesOf(
   'Forms/EditableTextArea',
   module
).add('EditableTextArea common Component', () => (
   <EditableTextArea
      value={'List 1'}
      textTypo={Typo32DarkBlueGreyHKGroteskMedium}
      onUpdateText={value => alert(`text updated Successfully ${value}`)}
      textAreaCss={textAreaCss}
   />
))
