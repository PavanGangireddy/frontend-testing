import React, { Component, ReactElement } from 'react'
import { observer } from 'mobx-react'

import IconContainer from '../../../Common/components/IconContainer'
import TickIcon from '../../../Common/icons/TickIcon'
import colors from '../../../Common/themes/Colors'

import { SectionItemContainer, SectionNameText } from './styledComponents'

interface MobileMoveCardSectionItemProps {
   onClickSection: (id: string) => void
   activeSectionId
   section
}

@observer
class MobileMoveCardSectionItem extends Component<
   MobileMoveCardSectionItemProps
> {
   onClickSection = (): void => {
      const {
         onClickSection,
         section: { id }
      } = this.props
      onClickSection(id)
   }

   render(): ReactElement {
      const {
         section: { id, name },
         activeSectionId
      } = this.props
      const isActive = activeSectionId === id
      return (
         <SectionItemContainer
            onClick={this.onClickSection}
            isActive={isActive}
         >
            <SectionNameText>{name}</SectionNameText>
            {isActive ? (
               <IconContainer>
                  <TickIcon
                     width={24}
                     heigh={24}
                     fill={colors.primary500Default}
                  />
               </IconContainer>
            ) : null}
         </SectionItemContainer>
      )
   }
}

export default MobileMoveCardSectionItem
