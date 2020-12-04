import React, { Component, ReactNode } from 'react'

import { LabelColor } from '../index'

import { ColoredLabelWrapper } from './styledComponents'

interface ColoredLabelProps {
   labelColor: LabelColor
   onChangeSelectedColor: (labelColor: LabelColor) => void
   stopPropagation?: boolean
   isDisabled?: boolean
   colorLabelTestId?: string
}

class ColoredLabel extends Component<ColoredLabelProps> {
   static defaultProps = {
      isDisabled: false
   }

   selectedColor = (event): void => {
      const { labelColor, onChangeSelectedColor, stopPropagation } = this.props
      if (stopPropagation) event.stopPropagation()
      onChangeSelectedColor(labelColor)
   }

   render(): ReactNode {
      const { labelColor, isDisabled, colorLabelTestId } = this.props
      return (
         <ColoredLabelWrapper
            onClick={isDisabled ? (): void => {} : this.selectedColor}
            borderColor={labelColor.colors.borderColor}
            backgroundColor={labelColor.colors.backgroundColor}
            isDisabled={isDisabled}
            data-testid={colorLabelTestId}
         ></ColoredLabelWrapper>
      )
   }
}

export default ColoredLabel
