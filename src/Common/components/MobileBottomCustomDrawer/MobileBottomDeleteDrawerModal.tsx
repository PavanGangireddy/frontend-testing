import React, { Component, ReactNode, ReactElement } from 'react'
import { withTranslation } from 'react-i18next'

import { WithTranslation } from '../../types'

import BottomDrawerModal from '../BottomDrawer/BottomDrawerModal'
import Button from '../Button'

import {
   ConfirmationMessageText,
   DeleteContainer,
   ButtonsContainer,
   CancelButton,
   DeleteButton,
   CancelButtonText,
   DeleteButtonText
} from './styledComponents'

interface MobileBottomDeleteDrawerModalProps extends WithTranslation {
   headerContent: ReactNode
   innerRef
   closeDrawer: () => void
   type?: string
   isCancelButtonDisabled?: boolean
   isDeleteButtonDisabled?: boolean
   isDeleteButtonLoading?: boolean
   onClickDeleteButton: () => void
}

class MobileBottomDeleteDrawerModal extends Component<
   MobileBottomDeleteDrawerModalProps
> {
   static defaultProps = {
      isCancelButtonDisabled: false,
      isDeleteButtonDisabled: false,
      isDeleteButtonLoading: false
   }

   renderConfirmationMessage = (): ReactNode => {
      const { type, t } = this.props
      return (
         <ConfirmationMessageText>
            {t('common:deleteDrawer.deleteConfirmationMessage')}
            {type ? ` ${t('common:deleteDrawer.this')} ${type}?` : `?`}
         </ConfirmationMessageText>
      )
   }

   render(): ReactElement {
      const {
         headerContent,
         innerRef,
         closeDrawer,
         isCancelButtonDisabled,
         isDeleteButtonDisabled,
         isDeleteButtonLoading,
         onClickDeleteButton,
         t
      } = this.props
      return (
         <BottomDrawerModal
            headerContent={headerContent}
            innerRef={innerRef}
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
                        {t('common:deleteDrawer.cancel')}
                     </CancelButtonText>
                  </CancelButton>
                  <DeleteButton
                     onClick={onClickDeleteButton}
                     disabled={isDeleteButtonDisabled || isDeleteButtonLoading}
                     isLoading={isDeleteButtonLoading}
                  >
                     <DeleteButtonText>
                        {t('common:deleteDrawer.delete')}
                     </DeleteButtonText>
                  </DeleteButton>
               </ButtonsContainer>
            </DeleteContainer>
         </BottomDrawerModal>
      )
   }
}

export default withTranslation()(MobileBottomDeleteDrawerModal)
