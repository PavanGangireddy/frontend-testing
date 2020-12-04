import React, { Component } from 'react'
import 'styled-components/macro'

import { LabelValueType } from '../../stores/types'

import PriorityText from '../PriorityText'

import { PriorityGroupContainer } from './styledComponents'

interface PriorityGroupProps {
   priorityList: Array<LabelValueType>
   selectedValue?: string
   onClickPriorityText: Function
   containerCSS?: React.CSSProperties
   stopPropagation?: boolean
   priorityTestId?: string
}

class PriorityGroup extends Component<PriorityGroupProps> {
   static defaultProps = {
      priorityTestId: 'priority'
   }
   getIsSelected = (value: string): boolean => {
      const { selectedValue } = this.props
      return selectedValue === value
   }
   renderPriorityList = (): React.ReactNode => {
      const { priorityList, onClickPriorityText, priorityTestId } = this.props
      return priorityList.map(
         (priority): React.ReactNode => {
            const onClickPriority = (event): void => {
               if (this.props.stopPropagation) event.stopPropagation()
               onClickPriorityText(priority.value)
            }
            const isSelected = this.getIsSelected(priority.value)
            return (
               <PriorityText
                  key={priority.value}
                  priorityContent={priority.label}
                  isSelected={isSelected}
                  onClickPriority={onClickPriority}
                  priorityTestId={
                     isSelected ? `${priorityTestId}Selected` : priorityTestId
                  }
               />
            )
         }
      )
   }
   render(): React.ReactNode {
      const { containerCSS } = this.props
      return (
         <PriorityGroupContainer css={containerCSS}>
            {this.renderPriorityList()}
         </PriorityGroupContainer>
      )
   }
}

export default PriorityGroup
