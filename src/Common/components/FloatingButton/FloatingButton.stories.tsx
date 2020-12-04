import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { I18nextProvider } from 'react-i18next'
import tw, { styled } from 'twin.macro'

import i18n from '../../i18n'
import Button from '../Button'

import FloatingButton from '.'

const Container = styled.div`
   ${tw`min-h-screen w-full`}
`

storiesOf('Forms/Buttons/FloatingButton', module)
   .addDecorator(story => (
      <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
   ))
   .add('Button Component', () => (
      <Container>
         <FloatingButton
            onClick={action('clicked')}
            variant={Button.variants.primary}
         ></FloatingButton>
      </Container>
   ))
