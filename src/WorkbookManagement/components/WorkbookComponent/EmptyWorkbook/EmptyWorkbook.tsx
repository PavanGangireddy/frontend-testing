import React, { Component, ReactNode } from 'react'
import { withTranslation } from 'react-i18next'

import PlusIcon from '../../../../Common/icons/PlusIcon'

import {
   EmptyWorkbookContainer,
   AddPageButton,
   ButtonText
} from './styledComponents'

// FIXME: Need to fix WithTranslation Props
interface WithTranslation {
   i18n: any
   tReady: any
   t: any
}

interface EmptyWorkbookProps extends WithTranslation {
   onClickAddPageButton: () => void
}

class EmptyWorkbook extends Component<EmptyWorkbookProps> {
   render(): ReactNode {
      const { onClickAddPageButton, t } = this.props
      return (
         <EmptyWorkbookContainer>
            <AddPageButton onClick={onClickAddPageButton}>
               <PlusIcon />
               <ButtonText>
                  {t('workbookManagement:homeScreen.addPage')}
               </ButtonText>
            </AddPageButton>
         </EmptyWorkbookContainer>
      )
   }
}

export default withTranslation()(EmptyWorkbook)
