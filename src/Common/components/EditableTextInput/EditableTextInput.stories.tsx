import React from 'react'
import { storiesOf } from '@storybook/react'
import tw, { css } from 'twin.macro'

import { Typo32DarkBlueGreyHKGroteskMedium } from '../../styleGuide/Typos'
import EditableTextInput from '.'

const textInputCss = css`
   ${tw`w-full h-64 text-3xl `}
`

storiesOf(
   'Forms/EditableTextInput',
   module
).add('EditableTextInput common Component', () => (
   <EditableTextInput
      value={'List 1'}
      textTypo={Typo32DarkBlueGreyHKGroteskMedium}
      onUpdateText={value => alert(`text updated Successfully ${value}`)}
      textInputCss={textInputCss}
   />
))
