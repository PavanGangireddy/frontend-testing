import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Typo32DarkBlueGreyHKGroteskMedium } from '../../styleGuide/Typos'
import EditableTextArea from '.'

const onUpdateText = () => console.log('text updated successfully')

const renderEditableTextArea = (props: any = {}) =>
   render(<EditableTextArea {...props} />)
describe('Editable Text component test cases', () => {
   it('should test for editable Label existance and vice-versa', () => {
      const { getByTestId, queryByTestId } = renderEditableTextArea({
         value: 'List-1',
         textTypo: Typo32DarkBlueGreyHKGroteskMedium,
         onUpdateText: onUpdateText
      })
      const labelContainer = getByTestId('editableTextAreaContent')
      fireEvent.click(labelContainer)
      expect(queryByTestId('editableTextAreaContent')).toBe(null)
   })

   it('should test for inputBox existance and vice-versa', () => {
      const { getByTestId, queryByTestId, getByText } = renderEditableTextArea({
         value: 'List-1',
         textTypo: Typo32DarkBlueGreyHKGroteskMedium,
         onUpdateText: onUpdateText
      })
      const labelText = getByText('List-1')
      fireEvent.click(labelText)
      const inputContainer = getByTestId('editableTextAreaInputBox')
      fireEvent.change(inputContainer, {
         event: { target: { value: 'List 2' } }
      })
      fireEvent.blur(inputContainer)
      getByTestId('editableTextAreaContent')
      expect(queryByTestId('editableTextAreaInputBox')).toBe(null)
   })
})
