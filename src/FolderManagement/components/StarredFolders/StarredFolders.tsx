import React, { Component, ReactNode } from 'react'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'

import StarIcon from '../../../Common/icons/StarIcon'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

import { home, NORMAL } from '../../constants/UIConstants'

import FolderGridItem from '../common/FolderGridItem'

import {
   StarredFoldersWrapper,
   Title,
   Folders,
   Container,
   IconWrapper
} from './styledComponents'

//FIXME: write WithTranslationProps
interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

export interface StarredFolder {
   id: string
   name: string
   isPublishedByUs: boolean
}

export interface StarredFolderProps extends WithTranslationProps {
   starredFolders: Array<StarredFolder>
   onDoubleClickFolder: (folderId: string) => void
   onClickFolderMenuItem: (folderId: string, clickedItem: string) => void
}

@observer
class StarredFolders extends Component<StarredFolderProps> {
   renderStarredFolders = (): ReactNode => {
      const {
         starredFolders,
         onDoubleClickFolder,
         onClickFolderMenuItem
      } = this.props
      return starredFolders.map(starredFolder => (
         <FolderGridItem
            key={starredFolder.id}
            name={starredFolder.name}
            id={starredFolder.id}
            isStarred={true}
            onClickFolderMenuItem={onClickFolderMenuItem}
            currentRoute={home}
            onDoubleClickFolder={onDoubleClickFolder}
            testId={'starredFolderGridItem'}
            type={NORMAL}
            isLocked={false}
            isPublishedByUs={starredFolder.isPublishedByUs}
         />
      ))
   }

   render(): ReactNode {
      const { starredFolders } = this.props
      if (starredFolders.length === 0) {
         return null
      }
      return this.renderStarredFolders()
   }
}

export default withTranslation('translation', { withRef: true })(StarredFolders)
