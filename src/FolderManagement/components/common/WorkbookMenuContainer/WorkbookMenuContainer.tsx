import React, { Component, ReactNode } from 'react'
import { withTranslation } from 'react-i18next'

import { getRelatedLabel } from '../../../../Common/utils/LabelChangingUtils'

import {
   workbookMenuData,
   trashMenuData,
   TRASH,
   SHARED_WITH_ME,
   sharedWithMeMenuData
} from '../../../constants/UIConstants'

import Menu from '../Menu'
import { MenuItemtype } from '../Menu/Menu'

//FIXME:write WithTranslationProps
interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface WorkbookMenuContainerProps extends WithTranslationProps {
   isPinned: boolean
   workbookId: string
   onClickWorkbookMenuItem: (workbookId: string, clickedItem: string) => void
   currentRoute: string
   menuItemTestId?: string
}

//TODO:need to put these labels into I18n
class WorkbookMenuContainer extends Component<WorkbookMenuContainerProps> {
   static defaultProps = {
      menuItemTestId: 'workbookMenuItem'
   }
   renderMenuData = (): Array<MenuItemtype> => {
      const { currentRoute } = this.props
      switch (currentRoute) {
         case TRASH:
            return trashMenuData
         case SHARED_WITH_ME:
            return sharedWithMeMenuData
         default:
            return workbookMenuData
      }
   }
   render(): ReactNode {
      const {
         isPinned,
         workbookId,
         onClickWorkbookMenuItem,
         menuItemTestId
      } = this.props
      const pinnedObject = workbookMenuData.find(element => element.id === '0')
      const labelObject = {
         condition: isPinned,
         label1: 'Remove from starred',
         value1: 'un pin',
         label2: 'Star Workbook',
         value2: 'pin',
         data: pinnedObject
      }
      getRelatedLabel(labelObject)
      return (
         <Menu
            menuData={this.renderMenuData()}
            id={workbookId}
            onClickMenuItem={onClickWorkbookMenuItem}
            menuItemTestId={menuItemTestId}
         />
      )
   }
}

export default withTranslation('translation', { withRef: true })(
   WorkbookMenuContainer
)
