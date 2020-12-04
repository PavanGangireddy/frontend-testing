import React, { Component } from 'react'
import { observer } from 'mobx-react'
import 'styled-components/macro'

import { validateEmpty, ErrorObject } from '../../utils/ValidationUtils'

import { Container, InputBox, containerCSS } from './styledComponents'
import { INCREASE_TEXT_INPUT_WIDTH_IN_PIXELS } from './constants'

interface Props {
   value: string
   textTypo: any
   onUpdateText: (value: string) => void
   textInputCss?: any
   ref?: any
   nonEditableTextContainerCSS?: any
   maxLength?: number
   isEditableForSingleClick?: boolean
   disabled?: boolean
   onChangeIsEditable?: (value: boolean) => void
   nonEditableTextCSS?: any
   textInputTestId?: string
   contentTestId?: string
   shouldResizeOnChange?: boolean
   truncateValue?: number
}

interface State {
   inputText: string
   isEditable: boolean
}

@observer
class EditableTextInput extends Component<Props, State> {
   inputTextRef
   constructor(props: Props) {
      super(props)
      this.state = {
         inputText: props.value,
         isEditable: false
      }
      this.inputTextRef = React.createRef()
   }

   static defaultProps = {
      isEditableForSingleClick: true,
      textInputTestId: 'editableTextInputBox',
      contentTestId: 'editableTextInputContent',
      shouldResizeOnChange: true
   }

   getInputTextValue = (): string => this.state.inputText

   setInputTextValue = (value: string) => {
      this.setState({ inputText: value })
   }

   setIsEditable = (value: boolean): void => {
      this.setState({ isEditable: value }, () => {
         if (this.state.isEditable) {
            if (this.inputTextRef.current) {
               this.inputTextRef.current.focus()
            }
            const { shouldResizeOnChange } = this.props
            if (shouldResizeOnChange) {
               this.autosize()
            }
            this.moveCursorToEndOfTheText()
         }
         const { onChangeIsEditable } = this.props
         onChangeIsEditable && onChangeIsEditable(this.state.isEditable)
      })
   }

   onChangeInputText = (event: any): void => {
      this.setState({ inputText: event.target.value })
      const { shouldResizeOnChange } = this.props
      if (shouldResizeOnChange) {
         this.autosize()
      }
   }

   onClickEditableTextInputContainer = (): void => {
      const { isEditable } = this.state
      if (!isEditable) {
         this.setIsEditable(true)
      }
   }

   validateInputText = (): ErrorObject => {
      const { inputText } = this.state
      return validateEmpty(inputText)
   }

   isInputTextNotEmpty = (): boolean =>
      !this.validateInputText().shouldShowError

   onBlur = (): void => {
      if (this.isInputTextNotEmpty()) {
         this.setIsEditable(false)
         this.onUpdateText()
      } else {
         this.inputTextRef.current.focus()
      }
   }

   onUpdateText = () => {
      const { onUpdateText } = this.props
      if (this.state.inputText !== this.props.value)
         onUpdateText(this.state.inputText)
   }

   autosize = () => {
      const editableTextInput: any = this.getTextInputElement()
      if (editableTextInput) {
         const width =
            (editableTextInput.value.length + 1) *
            INCREASE_TEXT_INPUT_WIDTH_IN_PIXELS
         editableTextInput.style.width = `${width}px`
         editableTextInput.style.marginRight = `8px`
      }
   }

   handleKeyPress = (event): void => {
      if (event.which === 13) {
         this.onUpdateText()
         if (this.isInputTextNotEmpty()) {
            this.setIsEditable(false)
         }
      }
   }

   moveCursorToEndOfTheText = (): void => {
      const editableTextInput: any = this.getTextInputElement()
      if (editableTextInput) {
         editableTextInput.setSelectionRange(
            editableTextInput.value.length,
            editableTextInput.value.length
         )
      }
   }

   getTextInputElement = (): HTMLElement | null =>
      document.querySelector('#editableTextInput')

   getRenderedText = () => {
      const { inputText } = this.state
      const { truncateValue } = this.props
      if (
         inputText.split(' ').length === 1 &&
         truncateValue &&
         inputText.length >= truncateValue
      ) {
         return `${inputText.slice(0, truncateValue)}...`
      }
      return inputText
   }

   renderEditableTextInput = (): React.ReactNode => {
      const { isEditable, inputText } = this.state
      const {
         textTypo: TextTypo,
         textInputCss,
         nonEditableTextCSS,
         nonEditableTextContainerCSS,
         maxLength,
         isEditableForSingleClick,
         disabled,
         textInputTestId,
         contentTestId,
         truncateValue
      } = this.props
      if (isEditable) {
         return (
            <InputBox
               ref={this.inputTextRef}
               value={inputText}
               onChange={this.onChangeInputText}
               validate={this.validateInputText}
               onBlur={this.onBlur}
               onKeyPress={this.handleKeyPress}
               data-testid={textInputTestId}
               id={'editableTextInput'}
               css={textInputCss}
               containerCSS={containerCSS}
               maxLength={maxLength}
               disabled={disabled}
            />
         )
      }
      return (
         <Container
            onClick={
               isEditableForSingleClick
                  ? this.onClickEditableTextInputContainer
                  : null
            }
            data-testid={contentTestId}
            css={nonEditableTextContainerCSS}
         >
            <TextTypo as='p' style={nonEditableTextCSS} title={inputText}>
               {truncateValue ? this.getRenderedText() : inputText}
            </TextTypo>
         </Container>
      )
   }

   render(): React.ReactNode {
      return <>{this.renderEditableTextInput()}</>
   }
}

export default EditableTextInput
