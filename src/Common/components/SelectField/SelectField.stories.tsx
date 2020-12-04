import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, object, boolean } from '@storybook/addon-knobs'
import { css } from 'styled-components'

import { ValidationResponseType } from '../../stores/types'

import SelectField from '.'

const containerCSS = css`
   width: 210px;
   margin: 15px;
`
const selectFieldCSS = css`
   height: 30px;
   .Select-container {
      height: 28px;
   }
   .Select__control {
      min-height: 28px;
      height: 28px;
   }
`
const options = [
   { value: 'chocolate', label: 'Chocolate' },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'vanilla', label: 'Vanilla' }
]

storiesOf('Forms/SelectField', module)
   .addDecorator(withKnobs)
   .add('UI dropdown', () => (
      <SelectField
         placeholder={'Select your favourite ice cream flavour...'}
         options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
         ]}
         defaultValue={{ value: 'chocolate', label: 'Chocolate' }}
      />
   ))
   .add('All Props', () => (
      <SelectField
         options={object('options', options)}
         containerCSS={object('containerCSS', containerCSS)}
         selectFieldCSS={object('selectFieldCSS', selectFieldCSS)}
         shouldDisableForSingleOption={boolean(
            'shouldDisableForSingleOption',
            true
         )}
         validate={(): ValidationResponseType => ({
            shouldShowError: true,
            errorMessage: 'Error'
         })}
      />
   ))
