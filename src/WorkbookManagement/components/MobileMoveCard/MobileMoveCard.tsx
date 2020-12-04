import React, { Component, ReactNode, ReactElement } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import BottomDrawerModal from '../../../Common/components/BottomDrawer/BottomDrawerModal'
import { getTextColor } from '../../../Common/utils/ColorUtils'
import colors from '../../../Common/themes/Colors'

import MobileMoveCardListItem from '../MobileMoveCardListItem'

import {
   MoveCardLabel,
   HeaderContainer,
   ViewCardDetailsButton,
   ViewCardDetailsText,
   SelectedCard
} from './styledComponents'

interface MobileMoveCardProps {
   innerRef
   closeDrawer: () => void
   lists
   activeListId: string
   activeCardName: string
   activeSectionId: string
   activeCardId: string
   viewCardDetails: () => void
   moveCard: (sectionId: string) => void
   isAssignmentWorkbook?: boolean
   cardLabel: string
}

@observer
class MobileMoveCard extends Component<MobileMoveCardProps> {
   @observable openedListId

   openOrCloseList = (listId): void => {
      if (listId !== this.openedListId) {
         this.openedListId = listId
      } else {
         this.openedListId = undefined
      }
   }

   viewCardDetails = (): void => {
      const { closeDrawer, viewCardDetails } = this.props
      closeDrawer()
      viewCardDetails()
   }

   // TODO: Need to add i18next
   renderHeaderContent = (): ReactNode => {
      const { isAssignmentWorkbook, activeCardName, cardLabel } = this.props
      const textColor = cardLabel
         ? getTextColor(cardLabel)
         : colors.darkBlueGrey
      return (
         <HeaderContainer>
            <MoveCardLabel as='div'>
               {`Move`}
               <SelectedCard cardLabel={cardLabel} textColor={textColor}>
                  {activeCardName}
               </SelectedCard>
            </MoveCardLabel>
            {isAssignmentWorkbook && (
               <ViewCardDetailsButton onClick={this.viewCardDetails}>
                  <ViewCardDetailsText>Details</ViewCardDetailsText>
               </ViewCardDetailsButton>
            )}
         </HeaderContainer>
      )
   }

   renderLists = observer(() => {
      const { lists, activeListId, activeSectionId, moveCard } = this.props
      return lists.map(list => {
         const { id, name, listSectionsArray } = list
         return (
            <MobileMoveCardListItem
               key={id}
               listId={id}
               listName={name}
               activeListId={activeListId}
               activeSectionId={activeSectionId}
               sections={listSectionsArray}
               onClickSection={moveCard}
               openedListId={this.openedListId}
               openOrCloseList={this.openOrCloseList}
            />
         )
      })
   })

   render(): ReactElement {
      const { innerRef, closeDrawer } = this.props
      const { renderLists: RenderLists } = this
      return (
         <BottomDrawerModal
            innerRef={innerRef}
            closeDrawer={closeDrawer}
            headerContent={this.renderHeaderContent()}
         >
            <RenderLists />
         </BottomDrawerModal>
      )
   }
}

export default MobileMoveCard
