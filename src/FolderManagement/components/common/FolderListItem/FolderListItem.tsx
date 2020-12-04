import React, { Component, ReactElement, ReactNode } from 'react'
import { observer } from 'mobx-react'

import StarredFolderIcon from '../../../../Common/icons/StarredFolderIcon'
import FolderIcon from '../../../../Common/icons/FolderIcon'
import PopoverMenu from '../../../../Common/components/PopoverMenu'
import { getDateFormat } from '../../../../Common/utils/DateUtils'
import ProjectIcon from '../../../../Common/icons/ProjectIcon'

import { popOverPlacements, PROJECT } from '../../../constants/UIConstants'
import { Owner } from '../../../stores/types'
import MoreIcon from '../../../../Common/icons/MoreIcon'
import IconContainer from '../../../../Common/components/IconContainer'

import {
   NameContainer,
   ModifiedDateContainer,
   MoreContainer,
   OwnerContainer
} from '../ListItemsHeader/styledComponents'

import {
   ListMenuContainer,
   FolderListItemContainer,
   NameLabel,
   DateLabel,
   OwnerImage,
   ContainerCSS
} from './styledComponents'

interface FolderListItemProps {
   id: string
   name: string
   isStarred: boolean
   lastModified: string
   menuContainer: ReactElement
   onDoubleClickFolder: (folderId: string) => void
   owner?: Owner
   targetTestId?: string
   type: string
}

@observer
class FolderListItem extends Component<FolderListItemProps> {
   static defaultProps = {
      targetTestId: 'target'
   }
   onDoubleClickFolder = (): void => {
      const { onDoubleClickFolder, id } = this.props
      onDoubleClickFolder(id)
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

   renderFolderOrProjectIcon = () => {
      const { type, isStarred } = this.props
      return type === PROJECT ? (
         <ProjectIcon data-testid={`projectIcon`} />
      ) : isStarred ? (
         <StarredFolderIcon />
      ) : (
         <FolderIcon />
      )
   }

   render(): ReactNode {
      const { name, menuContainer, lastModified, targetTestId } = this.props
      return (
         <FolderListItemContainer
            onClick={this.onDoubleClickFolder} //TODO:need to change the onDoubleClick method name
            data-testid={`folderListItem`}
         >
            <NameContainer>
               {this.renderFolderOrProjectIcon()}
               <NameLabel data-testid={'folderName'}>{name}</NameLabel>
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
                     placement={popOverPlacements.bottomLeft}
                     data-testid={targetTestId}
                  />
               </ListMenuContainer>
            </MoreContainer>
         </FolderListItemContainer>
      )
   }
}

export default FolderListItem
