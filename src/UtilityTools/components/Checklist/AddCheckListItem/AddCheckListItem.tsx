import React, { Component, ReactNode, ReactElement } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
//eslint-disable-next-line
import { withTranslation, WithTranslation } from 'react-i18next'

import BaseCheckBoxSelectedIcon from '../../../../Common/icons/BaseCheckBoxSelectedIcon'
import BaseCheckBoxNormalIcon from '../../../../Common/icons/BaseCheckBoxNormalIcon'
import { ErrorObjectType } from '../../../../Common/stores/types'
import { validateEmpty } from '../../../../Common/utils/ValidationUtils'

import { NewCheckListType } from '../../../stores/types'

import {
   CheckBoxContainer,
   AddCheckListWrapper,
   InputWrapper,
   InputBox
} from './styledComponents'

interface AddCheckListItemProps extends WithTranslation {
   onClickAddChecklistItem: (requestObject: NewCheckListType) => void
}

//TODO: Better to use CheckListItem Component instead of this
@observer
class AddCheckListItem extends Component<AddCheckListItemProps> {
   @observable checkListItemName!: string
   @observable isCheckListItemChecked!: boolean
   addCheckListRef

   constructor(props) {
      super(props)
      this.isCheckListItemChecked = false
      this.checkListItemName = ''
      this.addCheckListRef = React.createRef()
   }

   onChangeIsChecked = (): void => {
      this.isCheckListItemChecked = !this.isCheckListItemChecked
   }

   getRequestObject = (): NewCheckListType => ({
      text: this.checkListItemName,
      isChecked: this.isCheckListItemChecked
   })

   onKeyDownAddCheckList = (event): void => {
      if (event.keyCode === 13) {
         this.addCheckListItem()
      }
   }

   onChangeAddCheckListName = (event): void => {
      this.checkListItemName = event.target.value
   }

   validateAddCheckListName = (): ErrorObjectType =>
      validateEmpty(this.checkListItemName)

   isReadyToAddCheckListName = (): boolean =>
      !this.addCheckListRef.current?.isError

   showValidationError = (): void => {
      this.addCheckListRef.current?.validateInput()
   }

   addCheckListItem = (): void => {
      const {
         showValidationError,
         isReadyToAddCheckListName,
         props: { onClickAddChecklistItem },
         getRequestObject
      } = this
      showValidationError()
      if (isReadyToAddCheckListName()) {
         onClickAddChecklistItem(getRequestObject())
         this.checkListItemName = ''
      }
   }

   renderCheckBox = (): ReactElement => {
      const { isCheckListItemChecked } = this
      if (isCheckListItemChecked) {
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

   render(): ReactNode {
      const {
         addCheckListRef,
         checkListItemName,
         onChangeAddCheckListName,
         validateAddCheckListName,
         onKeyDownAddCheckList,
         renderCheckBox,
         addCheckListItem,
         props: { t }
      } = this
      return (
         <AddCheckListWrapper>
            {renderCheckBox()}
            <InputWrapper>
               <InputBox
                  testId={'addCheckListInput'}
                  ref={addCheckListRef}
                  defaultValue={checkListItemName}
                  onKeyDown={onKeyDownAddCheckList}
                  onBlur={addCheckListItem}
                  onChange={onChangeAddCheckListName}
                  type={'text'}
                  validate={validateAddCheckListName}
                  placeholder={t(
                     'utilityTools:checklist.enterCheckListItemName'
                  )}
               />
            </InputWrapper>
         </AddCheckListWrapper>
      )
   }
}

export default withTranslation()(AddCheckListItem)
