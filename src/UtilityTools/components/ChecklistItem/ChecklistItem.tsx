import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import BaseCheckBoxSelectedIcon from '../../../Common/icons/BaseCheckBoxSelectedIcon'
import BaseCheckBoxNormalIcon from '../../../Common/icons/BaseCheckBoxNormalIcon'
import EditableTextInput from '../../../Common/components/EditableTextInput'
import { showFailureBottomCenterToast } from '../../../Common/utils/ToastUtils'
import { getAPIErrorMessage } from '../../../Common/utils/APIUtils'
import DeleteIcon from '../../../Common/icons/DeleteIcon'
import { isTabletDevice } from '../../../Common/utils/responsiveUtils'

import ChecklistItemModel from '../../stores/models/ChecklistItemModel'

import {
   ChecklistItemWrapper,
   CheckBoxContainer,
   ChecklistItemContainer,
   editableTextInputStyles,
   Action,
   ActiveTextStyle,
   DisableTextStyle,
   containerCSS
} from './styledComponents'

interface ChecklistItemProps {
   checklistItem: ChecklistItemModel
   onPostNewChecklistItem?: () => void
   removeNewChecklistItem?: (id: string) => void
   newItemId?: string
}

@observer
class ChecklistItem extends Component<ChecklistItemProps> {
   @observable itemText!: string
   @observable isHovered: boolean
   @observable isChecklistItemEditable: boolean
   @observable isChecked: boolean
   @observable textTypo!: any

   checklistItemInputRef
   constructor(props: ChecklistItemProps) {
      super(props)
      this.initItemText()
      this.isHovered = false
      this.textTypo = props.checklistItem.isChecked
         ? DisableTextStyle
         : ActiveTextStyle
      this.isChecked = props.checklistItem.isChecked
      this.checklistItemInputRef = React.createRef<EditableTextInput>()
      this.isChecklistItemEditable = false
   }

   initItemText = () => {
      const { text } = this.props.checklistItem
      this.itemText = text
   }

   toggleIsChecked = (): void => {
      this.isChecked = !this.isChecked
      this.textTypo = this.isChecked ? DisableTextStyle : ActiveTextStyle
   }

   onChangeIsChecked = (_event: any) => {
      const { id, putChecklistItem } = this.props.checklistItem
      this.toggleIsChecked()
      if (id) {
         const request = {
            text: this.itemText,
            is_checked: this.isChecked
         }
         putChecklistItem(request, () => {}, this.onUpdateFailure)
      }
   }

   setIsEditable = (value: boolean): void => {
      this.isChecklistItemEditable = value
   }

   clearInput = (): void => {
      const {
         removeNewChecklistItem,
         checklistItem: { id }
      } = this.props

      removeNewChecklistItem && removeNewChecklistItem(id)
   }

   @action
   onUpdateFailure = (apiError: Error | null) => {
      if (apiError) {
         this.checklistItemInputRef.current?.setInputTextValue(
            this.props.checklistItem.text
         )
         this.isChecked = this.props.checklistItem.isChecked
         showFailureBottomCenterToast(getAPIErrorMessage(apiError))
      }
   }

   onSaveText = (text: string) => {
      const {
         onPostNewChecklistItem,
         checklistItem: { id, putChecklistItem, updateText }
      } = this.props
      if (id) {
         if (text.trim()) {
            const request = {
               text: text,
               is_checked: this.isChecked
            }
            putChecklistItem(request, () => {}, this.onUpdateFailure)
            this.initItemText()
            return
         }
         return
      }
      if (text.trim()) {
         updateText(text)
         onPostNewChecklistItem && onPostNewChecklistItem()
         this.initItemText()
         return
      }
   }

   renderCheckBox = () => {
      if (this.isChecked) {
         return (
            <CheckBoxContainer
               onClick={this.onChangeIsChecked}
               data-testid='checklistCheckbox'
            >
               <BaseCheckBoxSelectedIcon />
            </CheckBoxContainer>
         )
      }
      return (
         <CheckBoxContainer
            onClick={this.onChangeIsChecked}
            data-testid='checklistCheckbox'
         >
            <BaseCheckBoxNormalIcon />
         </CheckBoxContainer>
      )
   }

   onMouseEnter = (): void => {
      this.isHovered = true
   }

   onMouseLeave = (): void => {
      this.isHovered = false
   }

   render() {
      return (
         <ChecklistItemWrapper
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
         >
            <ChecklistItemContainer>
               {this.renderCheckBox()}
               <EditableTextInput
                  ref={this.checklistItemInputRef}
                  value={this.itemText}
                  onUpdateText={this.onSaveText}
                  textTypo={this.textTypo}
                  textInputCss={editableTextInputStyles}
                  disabled={this.isChecked}
                  onChangeIsEditable={this.setIsEditable}
                  textInputTestId='checklistTextInput'
                  contentTestId='checklistTextInputContent'
                  nonEditableTextContainerCSS={this.isChecked && containerCSS}
               />
               {(this.isHovered || isTabletDevice) &&
               !this.isChecklistItemEditable ? (
                  <Action
                     onClick={this.clearInput}
                     data-testid='checklistDeleteButton'
                  >
                     <DeleteIcon />
                  </Action>
               ) : null}
            </ChecklistItemContainer>
         </ChecklistItemWrapper>
      )
   }
}

export default ChecklistItem
