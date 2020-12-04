import React, { Component } from 'react'
import 'styled-components/macro'

import { PriorityContainer, StyledPriorityText } from './styledComponents'

interface PriorityTextProps {
   priorityContent
   isSelected: boolean
   onClickPriority: Function
   priorityTestId?: string
}

class PriorityText extends Component<PriorityTextProps> {
   static defaultProps = {
      isSelected: false,
      onClickPriority: (): void => {},
      priorityTestId: 'priority'
   }

   render(): React.ReactNode {
      const {
         priorityContent,
         isSelected,
         onClickPriority,
         priorityTestId
      } = this.props
      return (
         <PriorityContainer
            isSelected={isSelected}
            onClick={onClickPriority}
            data-testid={priorityTestId}
         >
            <StyledPriorityText
               isSelected={isSelected}
               data-testid={`${priorityTestId}Text`}
            >
               {priorityContent}
            </StyledPriorityText>
         </PriorityContainer>
      )
   }
}

export default PriorityText
