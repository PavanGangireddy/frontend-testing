import React, { Component, ReactNode, ReactElement } from 'react'
import { observer } from 'mobx-react'

import TickIcon from '../../../../Common/icons/TickIcon'

import CardModel from '../../../stores/models/CardModel'
import { LEFT, RIGHT } from '../../../constants/UIConstants'
import WorkbookModel from '../../../stores/models/WorkbookModel'
import WorkbookChildDetailsModel from '../../../stores/models/WorkbookChildDetailsModel'

import SectionCard from '../../SectionCard'

import { isMobileDevice } from '../../../../Common/utils/responsiveUtils'
import { SelectedCardsContainer, CardContainer } from './styledComponents'

interface SelectedCardsProps {
   activeLeftSideCardId: string
   activeRightSideCardId: string
   clickedSide: string
   onClickCard: (clickedSide: string, cardId: string) => void
   selectedCards: Array<CardModel>
   workbookDetails: WorkbookModel
   workbookChildDetails: WorkbookChildDetailsModel | {}
}

@observer
class SelectedCards extends Component<SelectedCardsProps> {
   isCardDisabled = (cardId: string): boolean => {
      const {
         activeLeftSideCardId,
         activeRightSideCardId,
         clickedSide
      } = this.props
      if (clickedSide === LEFT) {
         return cardId === activeRightSideCardId ? true : false
      } else if (clickedSide === RIGHT) {
         return cardId === activeLeftSideCardId ? true : false
      }
      return false
   }

   renderSelectedIcon = observer(({ cardId }: { cardId: string }): any => {
      const {
         activeLeftSideCardId,
         activeRightSideCardId,
         clickedSide
      } = this.props
      if (clickedSide === LEFT) {
         return activeLeftSideCardId === cardId ? <TickIcon /> : null
      } else if (clickedSide === RIGHT) {
         return activeRightSideCardId === cardId ? <TickIcon /> : null
      }
      return null
   })

   onClickCard = (cardId: string): void => {
      const { clickedSide, onClickCard } = this.props
      onClickCard(clickedSide, cardId)
   }

   renderSelectedCards = observer(
      (): ReactElement => {
         const {
            selectedCards,
            workbookChildDetails,
            workbookDetails
         } = this.props
         const { renderSelectedIcon: RenderSelectedIcon } = this
         return (
            <>
               {selectedCards.map(card => {
                  const isCardDisabled = this.isCardDisabled(card.id)
                  return (
                     <CardContainer
                        key={card.id}
                        isDisabled={isCardDisabled}
                        onClick={
                           isCardDisabled
                              ? (): void => {}
                              : (): void => this.onClickCard(card.id)
                        }
                        data-testid='mergeSelectCard'
                     >
                        <SectionCard
                           id={card.id}
                           cardName={card.name}
                           hasAttachments={card.hasAttachments}
                           hasNotes={card.hasNotes}
                           onToggleCardSelection={(): void => {}}
                           card={card}
                           isDisabled={true}
                           moveCardAPI={() => {}}
                           moveCardAPIStatus={200}
                           moveCardAPIError={null}
                           getWorkbookChildDetailsAPI={() => {}}
                           getWorkbookChildDetailsAPIStatus={200}
                           getWorkbookChildDetailsAPIError={null}
                           getWorkbooksAndFoldersAPI={() => {}}
                           getWorkbooksAndFoldersStatus={200}
                           getWorkbooksAndFoldersError={null}
                           activeFolderInfo={'activeFolderInfo'}
                           workbookChildDetails={workbookChildDetails}
                           getRootFolderDetailsAPI={() => {}}
                           getRootFolderDetailsAPIStatus={200}
                           getRootFolderDetailsAPIError={null}
                           rootFolderId={'1234'}
                           workbookDetails={workbookDetails}
                           deleteCardAPI={() => {}}
                           deleteCardAPIStatus={200}
                           deleteCardAPIError={null}
                           moveCard={(): void => {}}
                           clearMoveWorkbooksAndFolders={(): void => {}}
                           clearWorkbookChildDetails={(): void => {}}
                           maxWidth={isMobileDevice ? `90%` : ``}
                        />
                        {isMobileDevice ? null : (
                           <RenderSelectedIcon
                              cardId={card.id}
                              data-testid='mergeCardSelectedIcon'
                           />
                        )}
                     </CardContainer>
                  )
               })}
            </>
         )
      }
   )

   render(): ReactNode {
      const { clickedSide } = this.props
      const { renderSelectedCards: RenderSelectedCards } = this
      if (isMobileDevice) return <RenderSelectedCards />
      return (
         <SelectedCardsContainer clickedSide={clickedSide}>
            <RenderSelectedCards />
         </SelectedCardsContainer>
      )
   }
}

export default SelectedCards
