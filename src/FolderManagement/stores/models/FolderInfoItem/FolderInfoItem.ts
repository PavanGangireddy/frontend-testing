import { observable } from 'mobx'

import { PROJECT } from '../../../constants/UIConstants'

import { FolderInfoItemType } from '../../types'

import BaseWorkbookAndFolderInfoItem from '../BaseWorkbookAndFolderInfoItem'

class FolderInfoItem extends BaseWorkbookAndFolderInfoItem {
   lastModified: string
   @observable isStarred: boolean
   type: string
   isLocked?: boolean

   constructor(folderDetails: FolderInfoItemType) {
      const {
         folder_id: id,
         folder_name: name,
         last_modified: lastModified,
         is_published_by_us: isPublishedByUs
      } = folderDetails
      super({ id, name, isPublishedByUs })
      if (folderDetails.is_starred) {
         const { is_starred: isStarred } = folderDetails
         this.isStarred = isStarred
      } else {
         this.isStarred = false
      }
      if (folderDetails.folder_type) {
         const { folder_type: folderType } = folderDetails
         this.type = folderType
      } else {
         this.type = PROJECT
      }
      this.isLocked = false
      if (folderDetails.is_locked) {
         const { is_locked: isLocked } = folderDetails
         this.isLocked = isLocked
      }
      this.lastModified = lastModified
   }
}

export default FolderInfoItem
