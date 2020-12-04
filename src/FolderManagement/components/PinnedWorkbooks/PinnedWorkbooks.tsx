import React, { Component, ReactNode } from 'react'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'

import PinIcon from '../../../Common/icons/PinIcon'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

import { home } from '../../constants/UIConstants'

import WorkbookGridItem from '../common/WorkbookGridItem'

import {
   PinnedWorkbooksWrapper,
   Title,
   Workbooks,
   IconWrapper,
   Container
} from './styledComponents'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

export interface PinnedWorkbook {
   id: string
   name: string
   isPublishedByUs: boolean
}

export interface PinnedWorkbooksProps extends WithTranslationProps {
   pinnedWorkbooks: Array<PinnedWorkbook>
   onDoubleClickWorkbook: (workbookId: string) => void
   onClickWorkbookMenuItem: (workbookId: string, clickedItem: string) => void
}

@observer
class PinnedWorkbooks extends Component<PinnedWorkbooksProps> {
   renderPinnedWorkbooks = (): ReactNode => {
      const {
         pinnedWorkbooks,
         onDoubleClickWorkbook,
         onClickWorkbookMenuItem
      } = this.props
      return pinnedWorkbooks.map(pinnedWorkbook => (
         <WorkbookGridItem
            key={pinnedWorkbook.id}
            name={pinnedWorkbook.name}
            id={pinnedWorkbook.id}
            isPinned={true}
            currentRoute={home}
            onClickWorkbookMenuItem={onClickWorkbookMenuItem}
            onDoubleClickWorkbook={onDoubleClickWorkbook}
            testId='pinnedWorkbookGridItem'
            isPublishedByUs={pinnedWorkbook.isPublishedByUs}
         />
      ))
   }

   render(): ReactNode {
      const { pinnedWorkbooks } = this.props
      if (pinnedWorkbooks.length === 0) {
         return null
      }
      return this.renderPinnedWorkbooks()
   }
}

export default withTranslation('translation', { withRef: true })(
   PinnedWorkbooks
)
