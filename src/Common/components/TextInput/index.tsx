import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { computed } from 'mobx'

import BaseInput from '../BaseInput'
import { InputProps } from '../BaseInput/types'

@observer
class TextInput extends Component<InputProps> {
   inputRef

   constructor(props) {
      super(props)
      this.inputRef = React.createRef()
   }

   validateInput = () => {
      this.inputRef.current.validateInput()
   }

   resetErrorMessage = () => {
      this.inputRef.current.setError('')
   }

   onBlur = () => {
      this.inputRef.current.onBlur()
   }

   onFocus = () => {
      this.inputRef.current.onFocus()
   }

   focus = () => {
      this.inputRef.current.focus()
   }

   @computed get isError(): boolean {
      return this.inputRef.current.isError()
   }

   render() {
      return <BaseInput ref={this.inputRef} {...this.props} />
   }
}

export default TextInput
