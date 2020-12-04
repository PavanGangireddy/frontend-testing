import React, { Component, ReactElement, ReactNode } from 'react'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'

import { APIStatus } from '@ib/api-constants'

import { WithTranslation } from '../../../Common/types'
import TextInput from '../../../Common/components/TextInput'
import { isAPIFetching } from '../../../Common/utils/APIUtils'
import { isEmpty } from '../../../Common/utils/ValidationUtils'
import BottomDrawerModal from '../../../Common/components/BottomDrawer/BottomDrawerModal'

import {
   MAX_SECTION_NAME_LENGTH,
   MAX_LENGTH_OF_LIST_NAME
} from '../../constants/UIConstants'

import { TitleText, RenameContainer, RenameButton } from './styledComponents'

interface MobileRenameActionProps extends WithTranslation {
   innerRef
   closeDrawer: () => void
   name: string
   onClickRenameButton: (name: string) => void
   onChangeName: (name: string) => void
   apiStatus: APIStatus
   isList: boolean
   onCloseModal?: () => void
}

@observer
class MobileRenameAction extends Component<MobileRenameActionProps> {
   textInputRef

   constructor(props) {
      super(props)
      this.textInputRef = React.createRef()
   }

   renderHeaderContent = (): ReactNode => {
      const { t } = this.props
      return <TitleText>{t('workbookManagement:homeScreen.rename')}</TitleText>
   }

   updateName = (): void => {
      const { onClickRenameButton, isList, t, name } = this.props
      const emptyErrorMessage = isList
         ? t('workbookManagement:homeScreen.listNameShouldNotBeEmpty')
         : t('workbookManagement:homeScreen.sectionNameShouldNotBeEmpty')
      if (isEmpty(name)) {
         this.textInputRef.current.inputRef.current.setError(emptyErrorMessage)
      } else {
         onClickRenameButton(name)
      }
   }

   render(): ReactElement {
      const {
         innerRef,
         closeDrawer,
         t,
         apiStatus,
         isList,
         name,
         onChangeName,
         onCloseModal
      } = this.props
      const placeholder = isList
         ? t('workbookManagement:homeScreen.enterListName')
         : t('workbookManagement:homeScreen.enterSectionName')
      return (
         <BottomDrawerModal
            innerRef={innerRef}
            closeDrawer={closeDrawer}
            headerContent={this.renderHeaderContent()}
            onCloseModal={onCloseModal}
         >
            <RenameContainer>
               <TextInput
                  ref={this.textInputRef}
                  value={name}
                  onChange={onChangeName}
                  placeholder={placeholder}
                  maxLength={
                     isList ? MAX_LENGTH_OF_LIST_NAME : MAX_SECTION_NAME_LENGTH
                  }
               />
               <RenameButton
                  onClick={this.updateName}
                  disabled={isAPIFetching(apiStatus)}
                  isLoading={isAPIFetching(apiStatus)}
               >
                  {t('workbookManagement:homeScreen.rename')}
               </RenameButton>
            </RenameContainer>
         </BottomDrawerModal>
      )
   }
}

export default withTranslation()(MobileRenameAction)
