import React, { Component } from 'react'
import { APIStatus } from '@ib/api-constants'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { withTranslation, WithTranslation } from 'react-i18next' //eslint-disable-line

import { validateEmailId } from '../../../../UserProfile/utils/ValidationUtils'

import {
   showSuccessBottomCenterToast,
   showFailureBottomCenterToast
} from '../../../utils/ToastUtils'
import ReactSelectDropDownArrow from '../../../icons/ReactSelectDropDownArrow'
import Colors from '../../../themes/Colors'
import { isAPIFetching } from '../../../utils/APIUtils'

import TextInput from '../../TextInput'
import PopoverMenu from '../../PopoverMenu'

import { VIEWER } from '../constants'

import {
   InputAndSelectContainer,
   SelectFieldContainer,
   textInputStyles,
   MenuItemsContainer,
   MenuItem,
   RoleAndDropDownArrowContainer,
   RoleText,
   IconContainer,
   ShareContainer,
   ShareButton,
   ShareButtonText
} from './styledComponents'

interface DropDownItems {
   role: string
   displayName: string
}

interface InputBoxWithSelectProps extends WithTranslation {
   dropdownData: DropDownItems[]
   shareFolderOrWorkbookAPI: Function
   folderOrWorkbookID?: string
   isFolder?: boolean
   closeModal?: Function
   shareFolderOrWorkbookAPIStatus: APIStatus
   name?: string
   onSuccessShareFolderOrWorkbook?: () => void
}

@observer
class InputBoxWithSelect extends Component<InputBoxWithSelectProps> {
   @observable inputValue!: string
   @observable selectedRole!: DropDownItems

   textInputRef
   constructor(props) {
      super(props)
      this.inputValue = ''
      const viewerObject = props.dropdownData.find(item => item.role === VIEWER)
      this.selectedRole = viewerObject ? viewerObject : props.dropdownData[0]
      this.textInputRef = React.createRef()
   }

   onChange = (event: any) => {
      this.inputValue = event.target.value
   }

   onSelectRole = (value: DropDownItems) => {
      this.selectedRole = value
   }

   renderDropDownItems = () => {
      const { dropdownData } = this.props
      return (
         <MenuItemsContainer>
            {dropdownData.map(dropdownItem => (
               <MenuItem
                  as='p'
                  onClick={() => this.onSelectRole(dropdownItem)}
                  key={dropdownItem.role}
                  data-testid={dropdownItem.role}
               >
                  {dropdownItem.displayName}
               </MenuItem>
            ))}
         </MenuItemsContainer>
      )
   }

   renderTrigger = () => (
      <RoleAndDropDownArrowContainer>
         <RoleText as='p'>{this.selectedRole.displayName}</RoleText>
         <IconContainer>
            <ReactSelectDropDownArrow fill={Colors.darkBlueGrey} />
         </IconContainer>
      </RoleAndDropDownArrowContainer>
   )

   clearStates = () => {
      this.inputValue = ''
      const viewerObject = this.props.dropdownData.find(
         item => item.role === VIEWER
      )
      this.selectedRole = viewerObject
         ? viewerObject
         : this.props.dropdownData[0]
   }

   onShareSuccess = () => {
      const { t, closeModal, onSuccessShareFolderOrWorkbook } = this.props
      const successMessage = `${this.props.name} ${t(
         'common:shareFolderOrWorkbook.shareSuccessMessage'
      )}`

      showSuccessBottomCenterToast(successMessage)
      this.clearStates()
      closeModal && closeModal()

      if (onSuccessShareFolderOrWorkbook) onSuccessShareFolderOrWorkbook()
   }

   onShareFailure = message => {
      showFailureBottomCenterToast(message)
   }

   shareFolderOrWorkbook = () => {
      const {
         isFolder,
         folderOrWorkbookID,
         shareFolderOrWorkbookAPI
      } = this.props

      let requestObject
      if (isFolder) {
         requestObject = {
            folder_id: folderOrWorkbookID,
            email: this.inputValue,
            role: this.selectedRole.role
         }
      } else {
         requestObject = {
            workbook_id: folderOrWorkbookID,
            email: this.inputValue,
            role: this.selectedRole.role
         }
      }
      shareFolderOrWorkbookAPI(
         requestObject,
         this.onShareSuccess,
         this.onShareFailure
      )
   }

   @action.bound
   onClickShare = e => {
      e.preventDefault()
      this.textInputRef.current.validateInput()
      if (validateEmailId(this.inputValue).shouldShowError === false) {
         this.shareFolderOrWorkbook()
      }
   }

   validate = () => validateEmailId(this.inputValue)

   render() {
      const { t, shareFolderOrWorkbookAPIStatus } = this.props
      return (
         <ShareContainer as='form' onSubmit={this.onClickShare}>
            <InputAndSelectContainer>
               <TextInput
                  value={this.inputValue}
                  onChange={this.onChange}
                  placeholder={t(
                     'common:shareFolderOrWorkbook.shareInputPlaceholder'
                  )}
                  validate={this.validate}
                  textInputStyles={textInputStyles}
                  ref={this.textInputRef}
               />
               <SelectFieldContainer>
                  <PopoverMenu
                     renderPopoverTrigger={this.renderTrigger()}
                     renderPopoverContent={this.renderDropDownItems()}
                  />
               </SelectFieldContainer>
            </InputAndSelectContainer>
            <ShareButton
               isLoading={isAPIFetching(shareFolderOrWorkbookAPIStatus)}
               data-testid='shareButton'
               type='submit'
            >
               <ShareButtonText>
                  {t('common:shareFolderOrWorkbook.shareButtonText')}
               </ShareButtonText>
            </ShareButton>
         </ShareContainer>
      )
   }
}

export default withTranslation()(InputBoxWithSelect)
