import { observable } from 'mobx'

class BaseWorkbookAndFolderInfoItem {
   @observable name: string
   id: string
   isPublishedByUs: boolean

   constructor(workbookOrFolderInfo) {
      const { id, name, isPublishedByUs } = workbookOrFolderInfo
      this.id = id
      this.name = name
      this.isPublishedByUs = isPublishedByUs
   }
}

export default BaseWorkbookAndFolderInfoItem
