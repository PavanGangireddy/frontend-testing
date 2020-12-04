import { observable, action } from 'mobx'

import { GetWorkbooksAndFoldersResponse } from '../../types'

import WorkbookInfoItem from '../WorkbookInfoItem'
import FolderInfoItem from '../FolderInfoItem'
import PathInfoItem from '../PathInfoItem/PathInfoItem'

class ActiveFolderInfoItem {
   workbooksAndFoldersResponse: GetWorkbooksAndFoldersResponse
   @observable workbooks: Array<WorkbookInfoItem> = []
   @observable folders: Array<FolderInfoItem> = []
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
         const workbook = new WorkbookInfoItem(item)
         this.workbooks.push(workbook)
      })
   }

   @action.bound
   getFoldersResponse() {
      this.workbooksAndFoldersResponse.folders.map(item => {
         const folder = new FolderInfoItem(item)
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

export default ActiveFolderInfoItem
