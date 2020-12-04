import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

import { InputProps } from './types'

import {
   Input,
   ErrorView,
   ErrorMessage,
   InputContainer
} from './styledComponents'

interface BaseInputProps extends InputProps {
   inputCSS?: React.CSSProperties
}
@observer
class BaseInput extends Component<BaseInputProps> {
   inputRef

   constructor(props) {
      super(props)
      this.inputRef = React.createRef()
   }

   static defaultProps = {
      validate: () => ({ shouldShowError: false, errorMessage: '' }),
      shouldValidateOnBlur: true,
      tagName: 'input',
      testId: 'input'
   }

   @observable error = ''

   setError = (errorText: string) => {
      this.error = errorText
   }

   validateInput = () => {
      const { validate } = this.props
      if (validate) {
         const result = validate()
         if (result.shouldShowError) {
            this.setError(result.errorMessage)
         } else {
            this.setError('')
         }
      }
   }

   onBlur = () => {
      const { shouldValidateOnBlur } = this.props
      if (shouldValidateOnBlur) {
         this.validateInput()
      }
   }

   onFocus = () => {
      this.setError('')
   }

   focus = () => {
      this.inputRef.current.focus()
   }

   isError = () => this.error !== ''

   render() {
      const isValid = !this.isError()
      const {
         containerClassName,
         containerCSS,
         errorId,
         tagName,
         textInputStyles,
         testId,
         inputCSS,
         ...otherProps
      } = this.props
      return (
         <InputContainer
            containerCSS={containerCSS}
            className={containerClassName}
         >
            <Input
               ref={this.inputRef}
               data-testid={testId}
               isValid={isValid}
               onFocus={this.onFocus}
               onBlur={this.onBlur}
               style={textInputStyles}
               css={inputCSS}
               {...otherProps}
               as={tagName}
            />
            {/*TODO: need to write the Error Component as common Component */}
            {this.isError() ? (
               <ErrorView id={errorId}>
                  <ErrorMessage>{`* ${this.error}`}</ErrorMessage>
               </ErrorView>
            ) : null}
         </InputContainer>
      )
   }
}

export default BaseInput
