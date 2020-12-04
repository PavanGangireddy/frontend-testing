import React, { Component, ReactNode } from 'react'
import { withTranslation } from 'react-i18next'

import { getRelatedLabel } from '../../../../Common/utils/LabelChangingUtils'

import {
   folderMenuData,
   trashMenuData,
   TRASH,
   SHARED_WITH_ME,
   sharedWithMeMenuData,
   PROJECT,
   projectMenuData
} from '../../../constants/UIConstants'

import Menu from '../Menu'
import { MenuItemtype } from '../Menu/Menu'

//FIXME:here use the WithTranslation
interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface FolderMenuContainerProps extends WithTranslationProps {
   isStarred: boolean
   folderId: string
   onClickFolderMenuItem: (folderId: string, clickedItem: string) => void
   currentRoute: string
   menuItemTestId?: string
   type: string
}

//TODO:need to put these labels into I18n
class FolderMenuContainer extends Component<FolderMenuContainerProps> {
   static defaultProps = {
      menuItemTestId: 'folderMenuItem'
   }
   renderMenuData = (): Array<MenuItemtype> => {
      const { currentRoute, type } = this.props
      switch (currentRoute) {
         case TRASH:
            return trashMenuData
         case SHARED_WITH_ME:
            return sharedWithMeMenuData
         default:
            if (type === PROJECT) {
               return projectMenuData
            }
            return folderMenuData
      }
   }

   render(): ReactNode {
      const {
         isStarred,
         folderId,
         onClickFolderMenuItem,
         menuItemTestId
      } = this.props
      const starredObject = folderMenuData.find(element => element.id === '0')
      const labelObject = {
         condition: isStarred,
         label1: 'Remove from starred',
         value1: 'remove from starred',
         label2: 'Star Folder',
         value2: 'star folder',
         data: starredObject
      }
      getRelatedLabel(labelObject)

      return (
         <Menu
            menuData={this.renderMenuData()}
            id={folderId}
            onClickMenuItem={onClickFolderMenuItem}
            menuItemTestId={menuItemTestId}
         />
      )
   }
}

export default withTranslation('translation', { withRef: true })(
   FolderMenuContainer
)
