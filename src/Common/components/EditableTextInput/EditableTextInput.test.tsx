import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Typo32DarkBlueGreyHKGroteskMedium } from '../../styleGuide/Typos'

import EditableTextInput from '.'

const onUpdateText = () => console.log('text updated successfully')

const renderEditableTextInput = (props: any = {}) =>
   render(<EditableTextInput {...props} />)
describe('Editable Text component test cases', () => {
   it('should test for editable Label existance and vice-versa', () => {
      const { getByTestId, queryByTestId } = renderEditableTextInput({
         value: 'List-1',
         textTypo: Typo32DarkBlueGreyHKGroteskMedium,
         onUpdateText: onUpdateText
      })
      const labelContainer = getByTestId('editableTextInputContent')
      fireEvent.click(labelContainer)
      expect(queryByTestId('editableTextInputContent')).toBe(null)
   })

   it('should test for inputBox existance and vice-versa', () => {
      const { getByTestId, queryByTestId, getByText } = renderEditableTextInput(
         {
            value: 'List-1',
            textTypo: Typo32DarkBlueGreyHKGroteskMedium,
            onUpdateText: onUpdateText
         }
      )
      const labelText = getByText('List-1')
      fireEvent.click(labelText)
      const inputContainer = getByTestId('editableTextInputBox')
      fireEvent.change(inputContainer, {
         event: { target: { value: 'List 2' } }
      })
      fireEvent.blur(inputContainer)
      getByTestId('editableTextInputContent')
      expect(queryByTestId('editableTextInputBox')).toBe(null)
   })
})
