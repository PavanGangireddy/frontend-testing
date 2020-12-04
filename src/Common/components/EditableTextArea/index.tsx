import React, { Component } from 'react'
import parser from 'html-react-parser'
import 'styled-components/macro'

import { validateEmpty, ErrorObject } from '../../utils/ValidationUtils'

import { INCREASE_TEXT_AREA_HEIGHT_IN_PIXELS } from './constants'
import {
   Container,
   InputBox,
   containerCSS,
   PlaceholderTypo
} from './styledComponents'

interface Props {
   value: string
   textTypo: any
   placeHolderTextTypo: any
   placeholderText?: string
   onUpdateText: (value: string) => void
   textAreaCss?: any
   ref?: any
   maxLength?: number
   containerStyles?: any
   textAreaTestId?: string
   contentTestId?: string
   nonEditableTextCSS?: any
   hasShiftEnter?: boolean
}

interface State {
   inputText: string
   isEditable: boolean
}

class EditableTextArea extends Component<Props, State> {
   inputTextRef

   static defaultProps = {
      containerStyles: '',
      placeHolderTextTypo: PlaceholderTypo,
      textAreaTestId: 'editableTextAreaInputBox',
      contentTestId: 'editableTextAreaContent',
      hasShiftEnter: false
   }

   constructor(props: Props) {
      super(props)
      this.state = {
         inputText:
            props.hasShiftEnter && props.value
               ? props.value.split('<br />').join('\n')
               : props.value,
         isEditable: false
      }
      this.inputTextRef = React.createRef()
   }

   getInputTextValue = (): string => this.state.inputText

   setInputText = (value: string): void => {
      this.setState({ inputText: value })
   }

   setIsEditable = (value: boolean): void => {
      this.setState({ isEditable: value }, () => {
         if (this.state.isEditable) {
            if (this.inputTextRef.current) {
               this.inputTextRef.current.focus()
            }
            this.autosize()
            this.moveCursorToEndOfTheText()
         }
      })
   }

   onChangeInputText = (event: any): void => {
      this.setState({
         inputText: event.target.value
      })
      this.autosize()
   }

   onClickEditableTextAreaContainer = (): void => {
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
      this.setIsEditable(false)
      this.onUpdateText()
   }

   getParsedString = () => this.state.inputText.split('\n').join('<br />')

   onUpdateText = () => {
      const { onUpdateText, hasShiftEnter } = this.props
      if (hasShiftEnter && this.state.inputText !== this.props.value)
         onUpdateText(this.getParsedString())
      else if (this.state.inputText !== this.props.value)
         onUpdateText(this.state.inputText)
   }

   handleKeyPress = (event): void => {
      const { hasShiftEnter } = this.props
      if (event.which === 13 && !(hasShiftEnter && event.shiftKey)) {
         if (this.isInputTextNotEmpty()) {
            this.onUpdateText()
            this.setIsEditable(false)
         } else {
            this.onBlur()
         }
      }
   }

   moveCursorToEndOfTheText = (): void => {
      const editableTextArea: any = this.getTextAreaElement()
      if (editableTextArea) {
         editableTextArea.setSelectionRange(
            editableTextArea.value.length,
            editableTextArea.value.length
         )
      }
   }

   getTextAreaElement = (): HTMLElement | null =>
      document.querySelector('#editableTextArea')

   autosize = () => {
      const editableTextArea: any = this.getTextAreaElement()
      if (editableTextArea) {
         editableTextArea.style.height = '1px'
         editableTextArea.style.height = `${INCREASE_TEXT_AREA_HEIGHT_IN_PIXELS +
            editableTextArea.scrollHeight}px`
      }
   }

   renderEditableTextArea = (): React.ReactNode => {
      const { isEditable, inputText } = this.state
      const {
         textTypo: TextTypo,
         placeHolderTextTypo: PlaceholderTypo,
         textAreaCss,
         placeholderText,
         maxLength,
         containerStyles,
         textAreaTestId,
         contentTestId,
         nonEditableTextCSS,
         hasShiftEnter
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
               id={'editableTextArea'}
               css={textAreaCss}
               containerCSS={containerCSS}
               placeholder={placeholderText}
               maxLength={maxLength}
               data-testid={textAreaTestId}
            />
         )
      }
      return (
         <Container
            onClick={this.onClickEditableTextAreaContainer}
            data-testid={contentTestId}
            css={containerStyles}
         >
            {this.state.inputText ? (
               <TextTypo as='p' style={nonEditableTextCSS}>
                  {hasShiftEnter
                     ? parser(inputText.split('\n').join('<br />'))
                     : inputText}
               </TextTypo>
            ) : (
               <PlaceholderTypo>{placeholderText}</PlaceholderTypo>
            )}
         </Container>
      )
   }

   render(): React.ReactNode {
      return <>{this.renderEditableTextArea()}</>
   }
}

export default EditableTextArea
