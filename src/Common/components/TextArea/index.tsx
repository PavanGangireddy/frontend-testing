import React, { Component } from 'react'
import { observer } from 'mobx-react'
import 'styled-components/macro'

import BaseInput from '../BaseInput'
import { InputProps } from '../BaseInput/types'

import { textAreaStyles } from './styledComponents'

@observer
class TextArea extends Component<InputProps> {
   inputRef

   constructor(props) {
      super(props)
      this.inputRef = React.createRef()
   }

   validateInput = () => {
      this.inputRef.current.validateInput()
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

   render() {
      return (
         <BaseInput
            css={[textAreaStyles]}
            ref={this.inputRef}
            {...this.props}
            tagName='textarea'
         />
      )
   }
}

export default TextArea
