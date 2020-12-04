import React, { Component, ReactNode, ReactElement } from 'react'
import { withTranslation } from 'react-i18next'

import { Delete } from '../../../FolderManagement/constants/UIConstants'

import { WithTranslation } from '../../types'
import colors from '../../themes/Colors'

import BottomDrawerWithHeader from '../BottomDrawerWithHeader'
import Button from '../Button'

import {
   ConfirmationMessageText,
   DeleteContainer,
   ButtonsContainer,
   CancelButton,
   PrimaryButton,
   CancelButtonText,
   DeleteButtonText
} from './styledComponents'

const customDrawerThemes = {
   DELETE: {
      popupBtnBackground: colors.neonRed,
      popupBtnText: 'Delete',
      popupHeading: 'DELETE'
   },
   SUBMIT: {
      popupBtnBackground: colors.brightBlue,
      popupBtnText: 'Submit',
      popupHeading: 'Submit'
   }
}

// FIXME: need to update prop names
interface MobileBottomCustomDrawerProps extends WithTranslation {
   headerContent: ReactNode
   isVisible: boolean
   closeDrawer: () => void
   type?: string
   isCancelButtonDisabled?: boolean
   isDeleteButtonDisabled?: boolean
   isDeleteButtonLoading?: boolean
   onClickDeleteButton: () => void
   drawerType?: string
}

class MobileBottomCustomDrawer extends Component<
   MobileBottomCustomDrawerProps
> {
   static defaultProps = {
      isCancelButtonDisabled: false,
      isDeleteButtonDisabled: false,
      isDeleteButtonLoading: false,
      drawerType: Delete
   }

   renderConfirmationMessage = (): ReactNode => {
      const { type, t, drawerType } = this.props
      return (
         <ConfirmationMessageText>
            {drawerType === Delete
               ? t('common:deleteDrawer.deleteConfirmationMessage')
               : t('common:customDrawer.customConfirmationMessage')}
            {type ? ` ${t('common:deleteDrawer.this')} ${type}?` : `?`}
         </ConfirmationMessageText>
      )
   }

   render(): ReactElement {
      const {
         headerContent,
         isVisible,
         closeDrawer,
         isCancelButtonDisabled,
         isDeleteButtonDisabled,
         isDeleteButtonLoading,
         onClickDeleteButton,
         t,
         drawerType
      } = this.props
      const { popupBtnText, popupBtnBackground } = customDrawerThemes[
         drawerType ? drawerType : Delete
      ]
      return (
         <BottomDrawerWithHeader
            headerContent={headerContent}
            isVisible={isVisible}
            closeDrawer={closeDrawer}
         >
            <DeleteContainer>
               {this.renderConfirmationMessage()}
               <ButtonsContainer>
                  <CancelButton
                     variant={Button.variants.secondary}
                     onClick={closeDrawer}
                     disabled={isCancelButtonDisabled || isDeleteButtonLoading}
                  >
                     <CancelButtonText>
                        {t('common:customDrawer.cancel')}
                     </CancelButtonText>
                  </CancelButton>
                  <PrimaryButton
                     background={popupBtnBackground}
                     onClick={onClickDeleteButton}
                     disabled={isDeleteButtonDisabled || isDeleteButtonLoading}
                     isLoading={isDeleteButtonLoading}
                  >
                     <DeleteButtonText>{popupBtnText}</DeleteButtonText>
                  </PrimaryButton>
               </ButtonsContainer>
            </DeleteContainer>
         </BottomDrawerWithHeader>
      )
   }
}

export default withTranslation()(MobileBottomCustomDrawer)
