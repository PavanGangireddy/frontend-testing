import { observable } from 'mobx'

import { WorkbookInfoItemType } from '../../types'

import BaseWorkbookAndFolderInfoItem from '../BaseWorkbookAndFolderInfoItem'

class WorkbookInfoItem extends BaseWorkbookAndFolderInfoItem {
   lastModified: string
   @observable isPinned: boolean

   constructor(workBookDetails: WorkbookInfoItemType) {
      const {
         workbook_id: id,
         workbook_name: name,
         last_modified: lastModified,
         is_pinned: isPinned,
         is_published_by_us: isPublishedByUs
      } = workBookDetails
      super({ id, name, isPublishedByUs })
      this.lastModified = lastModified
      this.isPinned = isPinned
   }
}

export default WorkbookInfoItem
