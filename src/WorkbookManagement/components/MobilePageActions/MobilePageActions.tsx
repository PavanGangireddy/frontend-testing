import React, { Component, ReactElement, ReactNode } from 'react'
import { withTranslation } from 'react-i18next'

import BottomDrawerWithHeader from '../../../Common/components/BottomDrawerWithHeader'
import { WithTranslation } from '../../../Common/types'

import { TitleText, ActionsContainer, Item, ItemText } from './styledComponents'

interface MobilePageActionsProps extends WithTranslation {
   name: string
   isVisible: boolean
   closeDrawer: () => void
   onClickEditPageObjectiveButton: () => void
   onClickEditPageDescriptionButton: () => void
   shouldDisableActions
}

class MobilePageActions extends Component<MobilePageActionsProps> {
   renderHeaderContent = (): ReactNode => {
      const { name } = this.props
      return <TitleText>{name}</TitleText>
   }

   render(): ReactElement {
      const {
         isVisible,
         closeDrawer,
         onClickEditPageDescriptionButton,
         onClickEditPageObjectiveButton,
         t,
         shouldDisableActions
      } = this.props
      return (
         <BottomDrawerWithHeader
            isVisible={isVisible}
            closeDrawer={closeDrawer}
            headerContent={this.renderHeaderContent()}
         >
            <ActionsContainer>
               <Item
                  onClick={
                     shouldDisableActions
                        ? (): void => {}
                        : onClickEditPageObjectiveButton
                  }
               >
                  <ItemText>
                     {t('workbookManagement:homeScreen.editObjective')}
                  </ItemText>
               </Item>
               <Item
                  onClick={
                     shouldDisableActions
                        ? (): void => {}
                        : onClickEditPageDescriptionButton
                  }
               >
                  <ItemText>
                     {t('workbookManagement:homeScreen.editDescription')}
                  </ItemText>
               </Item>
            </ActionsContainer>
         </BottomDrawerWithHeader>
      )
   }
}

export default withTranslation()(MobilePageActions)
