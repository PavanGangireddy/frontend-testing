import React, { Component } from 'react'
import 'styled-components/macro'

import ErrorMessage from '../ErrorMessage'

import { ValidationResponseType } from '../../stores/types'

import { SelectFieldContainer, StyledSelectField } from './styledComponents'

interface SelectFieldProps {
   validate?: () => ValidationResponseType

   selectFieldCSS?: React.CSSProperties

   containerCSS?: React.CSSProperties

   shouldDisableForSingleOption?: boolean

   [x: string]: any
   placeholder?: string
}

interface SelectFieldState {
   error: string
}

class SelectField extends Component<SelectFieldProps, SelectFieldState> {
   dropdownRef

   constructor(props: SelectFieldProps) {
      super(props)
      this.dropdownRef = React.createRef()
      this.state = { error: '' }
   }

   static defaultProps = {
      validate: (): ValidationResponseType => ({
         shouldShowError: false,
         errorMessage: ''
      }),
      shouldDisableForSingleOption: false,
      placeholder: 'Select'
   }

   setError(errorText: string): void {
      this.setState(() => ({ error: errorText }))
   }

   onBlur = (): void => {
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

   onFocus = (): void => {
      this.setError('')
   }

   isError = () => this.state.error !== ''

   isOnlyOneOption = (): boolean => {
      const { options } = this.props
      return options && options.length === 1
   }

   getIsDisabled = (): boolean => {
      const { isDisabled, shouldDisableForSingleOption } = this.props
      return (
         (shouldDisableForSingleOption && this.isOnlyOneOption()) || isDisabled
      )
   }

   render(): React.ReactNode {
      const {
         className,
         selectFieldCSS,
         containerCSS,
         errorId,
         components,
         as,
         placeholder,
         ...otherProps
      } = this.props

      const { error } = this.state

      return (
         <SelectFieldContainer className={className} css={containerCSS}>
            <StyledSelectField
               ref={this.dropdownRef}
               isValid={!this.isError()}
               onBlur={this.onBlur}
               onFocus={this.onFocus}
               classNamePrefix='Select'
               css={selectFieldCSS}
               {...otherProps}
               isDisabled={this.getIsDisabled()}
               components={components}
               as={as}
               placeholder={placeholder}
            />
            <ErrorMessage errorMessage={error} errorId={errorId} />
         </SelectFieldContainer>
      )
   }
}

export default SelectField
