import React, { Component, ReactNode } from 'react'
import { observer } from 'mobx-react'

import IconContainer from '../../../Common/components/IconContainer'
import ChevronRightIcon from '../../../Common/icons/ChevronRightIcon'
import ChevronDownIcon from '../../../Common/icons/ChevronDownIcon'
import colors from '../../../Common/themes/Colors'
import TickIcon from '../../../Common/icons/TickIcon'

import MobileMoveCardSectionItem from '../MobileMoveCardSectionItem'

import {
   ListItemContainer,
   ListNameText,
   ToggleButton,
   ListItemHeader,
   IconsContainer,
   LeftSection
} from './styledComponents'

interface MobileMoveCardListItemProps {
   sections
   listId
   listName
   activeListId
   activeSectionId
   onClickSection: (id: string) => void
   openedListId
   openOrCloseList: (id: string) => void
}

@observer
class MobileMoveCardListItem extends Component<MobileMoveCardListItemProps> {
   isListOpen = () => this.props.openedListId === this.props.listId

   renderToggleButtonIcon = observer(() =>
      this.isListOpen() ? (
         <ChevronDownIcon width={10} height={10} />
      ) : (
         <ChevronRightIcon width={10} height={10} />
      )
   )

   renderSections = observer((): any => {
      const { sections, activeSectionId, onClickSection } = this.props
      return this.isListOpen()
         ? sections.map((section: any) => (
              <MobileMoveCardSectionItem
                 key={section.id}
                 onClickSection={onClickSection}
                 activeSectionId={activeSectionId}
                 section={section}
              />
           ))
         : null
   })

   isListWithoutAnySection = () => {
      const { sections } = this.props
      return sections.length === 0
   }

   isListWithOnlyOneSection = () => {
      const { sections } = this.props
      return sections.length === 1
   }

   onClickListItem = (): void => {
      const { sections, onClickSection, listId, openOrCloseList } = this.props
      if (this.isListWithOnlyOneSection()) {
         onClickSection(sections[0].id)
      } else {
         openOrCloseList(listId)
      }
   }

   openOrCloseList = () => {
      const { listId, openOrCloseList } = this.props
      openOrCloseList(listId)
   }

   render(): ReactNode {
      const { listName, listId, activeListId } = this.props
      const {
         renderToggleButtonIcon: RenderToggleButtonIcon,
         renderSections: RenderSections
      } = this
      if (this.isListWithoutAnySection()) {
         return null
      }
      return (
         <ListItemContainer id={listId}>
            <ListItemHeader>
               <LeftSection onClick={this.onClickListItem}>
                  <ListNameText>{listName}</ListNameText>
               </LeftSection>
               <IconsContainer>
                  {listId === activeListId ? (
                     <IconContainer>
                        <TickIcon
                           width={24}
                           heigh={24}
                           fill={colors.primary500Default}
                        />
                     </IconContainer>
                  ) : null}
                  {this.isListWithOnlyOneSection() ? null : (
                     <ToggleButton onClick={this.openOrCloseList}>
                        <IconContainer>
                           <RenderToggleButtonIcon />
                        </IconContainer>
                     </ToggleButton>
                  )}
               </IconsContainer>
            </ListItemHeader>
            <RenderSections />
         </ListItemContainer>
      )
   }
}

export default MobileMoveCardListItem
