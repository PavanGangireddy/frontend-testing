import React, { Component, ReactElement, ReactNode } from 'react'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'

import RenameIcon from '../../../Common/icons/RenameIcon'
import MoveToIcon from '../../../Common/icons/MoveToIcon'
import DeleteIcon from '../../../Common/icons/DeleteIcon'
import { WithTranslation } from '../../../Common/types'
import BottomDrawerModal from '../../../Common/components/BottomDrawer/BottomDrawerModal'

import {
   ActionsContainer,
   TitleText,
   ItemContainer,
   IconContainer,
   ItemText
} from './styledComponents'

interface MobileActionsProps extends WithTranslation {
   innerRef
   closeDrawer: () => void
   isList: boolean
   id: string
   name: string
   onClickDelete: () => void
   onClickRename: () => void
   onClickMove: () => void
}

@observer
class MobileActions extends Component<MobileActionsProps> {
   renderHeaderContent = (): ReactNode => {
      const { name } = this.props
      return <TitleText>{name}</TitleText>
   }

   render(): ReactElement {
      const {
         innerRef,
         closeDrawer,
         onClickRename,
         onClickMove,
         onClickDelete,
         isList,
         t
      } = this.props
      const renameText = isList
         ? t('workbookManagement:homeScreen.renameList')
         : t('workbookManagement:homeScreen.renameSection')
      const moveText = isList
         ? t('workbookManagement:homeScreen.moveList')
         : t('workbookManagement:homeScreen.moveSection')
      const deleteText = isList
         ? t('workbookManagement:homeScreen.deleteList')
         : t('workbookManagement:homeScreen.deleteSection')
      return (
         <BottomDrawerModal
            innerRef={innerRef}
            closeDrawer={closeDrawer}
            headerContent={this.renderHeaderContent()}
         >
            <ActionsContainer>
               <ItemContainer onClick={onClickRename}>
                  <IconContainer>
                     <RenameIcon />
                  </IconContainer>
                  <ItemText>{renameText}</ItemText>
               </ItemContainer>
               <ItemContainer onClick={onClickMove}>
                  <IconContainer>
                     <MoveToIcon />
                  </IconContainer>
                  <ItemText>{moveText}</ItemText>
               </ItemContainer>
               <ItemContainer onClick={onClickDelete}>
                  <IconContainer>
                     <DeleteIcon />
                  </IconContainer>
                  <ItemText>{deleteText}</ItemText>
               </ItemContainer>
            </ActionsContainer>
         </BottomDrawerModal>
      )
   }
}

export default withTranslation()(MobileActions)
