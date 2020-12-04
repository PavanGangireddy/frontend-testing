import { observable, action } from 'mobx'

import { GetSharedWorkbooksAndFoldersResponse } from '../../types'

import SharedWorkbookInfoItem from '../SharedWorkbookInfoItem'
import SharedFolderInfoItem from '../SharedFolderInfoItem'
import PathInfoItem from '../PathInfoItem/PathInfoItem'

class SharedWithMeInfoItem {
   workbooksAndFoldersResponse: GetSharedWorkbooksAndFoldersResponse
   @observable workbooks: Array<SharedWorkbookInfoItem> = []
   @observable folders: Array<SharedFolderInfoItem> = []
   @observable pathInfo: Array<PathInfoItem> = []

   constructor(workbooksAndFoldersResponse) {
      this.workbooksAndFoldersResponse = workbooksAndFoldersResponse
      this.init()
   }

   @action.bound
   init() {
      this.getWorkbooksResponse()
      this.getFoldersResponse()
      this.getPathResponse()
   }

   @action.bound
   getWorkbooksResponse() {
      this.workbooksAndFoldersResponse.workbooks.map(item => {
         const workbook = new SharedWorkbookInfoItem(item)
         this.workbooks.push(workbook)
      })
   }

   @action.bound
   getFoldersResponse() {
      this.workbooksAndFoldersResponse.folders.map(item => {
         const folder = new SharedFolderInfoItem(item)
         this.folders.push(folder)
      })
   }

   getPathResponse() {
      if (this.workbooksAndFoldersResponse.path) {
         this.workbooksAndFoldersResponse.path.map(item => {
            const path = new PathInfoItem(item)
            this.pathInfo.push(path)
         })
      }
   }
}

export default SharedWithMeInfoItem
