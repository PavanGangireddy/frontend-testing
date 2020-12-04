import React, { Component, ReactElement, ReactNode } from 'react'

import WorkbookIcon from '../../../../Common/icons/WorkbookIcon'
import PopoverMenu from '../../../../Common/components/PopoverMenu'
import { getDateFormat } from '../../../../Common/utils/DateUtils'
import StarredWorkbookIcon from '../../../../Common/icons/StarredWorkbookIcon'

import { Owner } from '../../../stores/types'
import MoreIcon from '../../../../Common/icons/MoreIcon'

import {
   NameContainer,
   ModifiedDateContainer,
   MoreContainer,
   OwnerContainer
} from '../ListItemsHeader/styledComponents'

import IconContainer from '../../../../Common/components/IconContainer'
import {
   WorkbookListItemContainer,
   NameLabel,
   DateLabel,
   ListMenuContainer,
   OwnerImage,
   ContainerCSS
} from './styledComponents'

interface WorkbookListItemProps {
   id: string
   name: string
   isPinned: boolean
   lastModified: string
   menuContainer: ReactElement
   onDoubleClickWorkbook: (workbookId: string) => void
   owner?: Owner
   targetTestId?: string
}

class WorkbookListItem extends Component<WorkbookListItemProps> {
   static defaultProps = {
      targetTestId: 'target'
   }
   onDoubleClickWorkbook = (): void => {
      const { onDoubleClickWorkbook, id } = this.props
      onDoubleClickWorkbook(id)
   }

   renderOwnerInfo = (): ReactElement | null => {
      const { owner } = this.props
      if (owner) {
         return (
            <OwnerContainer>
               <OwnerImage src={owner.url} alt={owner.name} />
            </OwnerContainer>
         )
      }
      return null
   }

   renderTriggerIcon = (): ReactNode => (
      <IconContainer containerCSS={ContainerCSS}>
         <MoreIcon />
      </IconContainer>
   )

   render(): ReactNode {
      const {
         isPinned,
         name,
         menuContainer,
         lastModified,
         targetTestId
      } = this.props
      return (
         <WorkbookListItemContainer
            onClick={this.onDoubleClickWorkbook} //TODO:need to change the method names
            data-testid={'workbookListItem'}
         >
            <NameContainer>
               {isPinned ? <StarredWorkbookIcon /> : <WorkbookIcon />}
               <NameLabel data-testid={'workbookName'}>{name}</NameLabel>
            </NameContainer>
            <ModifiedDateContainer>
               <DateLabel>{getDateFormat(lastModified)}</DateLabel>
            </ModifiedDateContainer>
            {this.renderOwnerInfo()}
            <MoreContainer>
               <ListMenuContainer>
                  <PopoverMenu
                     renderPopoverTrigger={this.renderTriggerIcon()}
                     renderPopoverContent={menuContainer}
                     placement='rightTop'
                     targetTestId={targetTestId}
                  />
               </ListMenuContainer>
            </MoreContainer>
         </WorkbookListItemContainer>
      )
   }
}

export default WorkbookListItem
