import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { observer } from 'mobx-react'

import ColorPalette from '../../../Common/components/ColorPalette'
import DeleteIcon from '../../../Common/icons/DeleteIcon'
import PriorityGroup from '../../../Common/components/PriorityGroup'
import DateTimePicker from '../../../Common/components/DateTimePicker'
import { isTabletDevice } from '../../../Common/utils/responsiveUtils'

import { BOTTOM_END, BOTTOM_START } from '../../constants/UIConstants'
import { SelectedColorObjectType } from '../../stores/types'

import { priorityList } from './constants'
import {
   FilterBar,
   SubFilterContainer,
   DeleteIconDivision,
   PriorityGroupContainer,
   FilterTitle,
   DeleteIconContainer,
   PriorityGroupWrapper,
   DatePickerContainer,
   DateTimePickerWrapper
} from './styledComponents'

interface WithTranslaionProps {
   tReady: any
   t: any
   i18n: any
}

interface CardDetailsFilterProps extends WithTranslaionProps {
   onChangeCardLabel: (selectedColorObject: SelectedColorObjectType) => void
   onDeleteLabel: () => void
   onDeletePriority: () => void
   selectedPriority: string
   onChangeCardPriority: (selectedPriority: string) => void
   onCloseDateTimePicker: (date: any) => void
   selectedDueDateAndTime: string
   onDeleteDueDateAndTime: () => void
   selectedColor: string | null
   shouldDisableActions?: boolean
}

@observer
class CardDetailsFilterBar extends Component<CardDetailsFilterProps> {
   datePickerRef
   constructor(props) {
      super(props)
      this.datePickerRef = React.createRef()
   }

   onCloseDateTimePicker = () => {
      const { onCloseDateTimePicker } = this.props
      const selectedDateTime = this.datePickerRef.current?.getSelectedDueDate()
      onCloseDateTimePicker(selectedDateTime)
   }

   getSelectedColorObject = (color: string | null) => (color ? color : '')

   render() {
      const {
         onChangeCardLabel,
         onDeleteLabel,
         onDeletePriority,
         selectedPriority,
         onChangeCardPriority,
         selectedDueDateAndTime,
         onDeleteDueDateAndTime,
         t,
         selectedColor,
         shouldDisableActions
      } = this.props
      //TODO: Need to handle Date format
      return (
         <FilterBar shouldDisablePointerEvents={shouldDisableActions}>
            <SubFilterContainer>
               <ColorPalette
                  onChangeSelectedColor={onChangeCardLabel}
                  selectedColor={this.getSelectedColorObject(selectedColor)}
               />
               <DeleteIconDivision
                  onClick={onDeleteLabel}
                  data-testid='cardDetailsDeleteLabelButton'
               >
                  <DeleteIcon width={'10px'} height={'10px'} />
               </DeleteIconDivision>
            </SubFilterContainer>
            <PriorityGroupContainer>
               <FilterTitle>
                  {t('workbookManagement:cardDetails.priority')}
                  <DeleteIconContainer
                     onClick={onDeletePriority}
                     data-testid='cardDetailsDeletePriorityButton'
                  >
                     <DeleteIcon width={'10px'} height={'10px'} />
                  </DeleteIconContainer>
               </FilterTitle>
               <PriorityGroupWrapper>
                  <PriorityGroup
                     priorityList={priorityList}
                     selectedValue={selectedPriority}
                     onClickPriorityText={onChangeCardPriority}
                  />
               </PriorityGroupWrapper>
            </PriorityGroupContainer>
            <DatePickerContainer>
               <FilterTitle>
                  {t('workbookManagement:cardDetails.dueDateAndTime')}
                  <DeleteIconContainer
                     onClick={onDeleteDueDateAndTime}
                     data-testid='cardDetailsDeleteDateButton'
                  >
                     <DeleteIcon width={'10px'} height={'10px'} />
                  </DeleteIconContainer>
               </FilterTitle>
               <DateTimePickerWrapper>
                  <DateTimePicker
                     ref={this.datePickerRef}
                     key={`${selectedDueDateAndTime}`}
                     date={selectedDueDateAndTime}
                     onCalendarClose={this.onCloseDateTimePicker}
                     popperPlacement={
                        isTabletDevice ? BOTTOM_END : BOTTOM_START
                     }
                  />
               </DateTimePickerWrapper>
            </DatePickerContainer>
         </FilterBar>
      )
   }
}

export default withTranslation()(CardDetailsFilterBar)
