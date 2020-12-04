import React, { Component } from 'react'

import AddIcon from '../../icons/AddIcon'

import Button from '../Button'

import { CustomSizeButton, CustomTextContainer } from './styledComponents'

interface FloatingButtonProps {
   onClick: () => void
   variant?: string
   buttonCSS?: React.CSSProperties
   disabled?: boolean
}
class FloatingButton extends Component<FloatingButtonProps> {
   static defaultProps = {
      variant: Button.variants.primary,
      shape: Button.shapes.round,
      children: <AddIcon />
   }
   render() {
      const { children, buttonCSS } = this.props
      return (
         <CustomSizeButton {...this.props} css={buttonCSS}>
            <CustomTextContainer>{children}</CustomTextContainer>
         </CustomSizeButton>
      )
   }
}

export default FloatingButton
