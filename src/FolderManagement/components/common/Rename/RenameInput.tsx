import React, { Component } from 'react'
import { observer } from 'mobx-react'
import 'styled-components/macro'

import {
   validateEmpty,
   ErrorObject
} from '../../../../Common/utils/ValidationUtils'

import { Input } from './styledComponents'

interface Props {
   value: string
   ref?: any
   onChange: Function

   maxLength: number
}

interface State {
   inputText: string
}

@observer
class RenameInput extends Component<Props, State> {
   inputTextRef
   constructor(props: Props) {
      super(props)
      this.state = {
         inputText: props.value
      }
      this.inputTextRef = React.createRef()
   }

   setInputTextValue = (value: string) => {
      this.setState({ inputText: value })
   }

   onChangeInputText = (event: any): void => {
      const { onChange } = this.props
      this.setState({ inputText: event.target.value })
      onChange(event)
   }

   validateInputText = (): ErrorObject => {
      const { inputText } = this.state
      return validateEmpty(inputText)
   }

   render(): React.ReactNode {
      const { inputText } = this.state
      const { maxLength } = this.props
      return (
         <>
            <Input
               ref={this.inputTextRef}
               value={inputText}
               onChange={this.onChangeInputText}
               validate={this.validateInputText}
               shouldValidateOnBlur={true}
               maxLength={maxLength}
            />
         </>
      )
   }
}

export default RenameInput
