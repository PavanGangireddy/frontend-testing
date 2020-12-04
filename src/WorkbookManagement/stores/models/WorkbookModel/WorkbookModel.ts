import { observable, action } from 'mobx'

import { WorkbookResponseType, PageIdAndNameResponseType } from '../../types'

import BaseModel from '../BaseModel'

import { defaultPageNamePrefix } from './constants'

class WorkbookModel extends BaseModel {
   @observable pages: Map<string, BaseModel>
   workbookId
   totalTimeInSeconds!: number
   leftTimeInSeconds!: number
   status!: string
   evaluationType!: string

   constructor(workbookDetails: WorkbookResponseType) {
      const {
         workbook_id: id,
         workbook_name: name,
         total_pages: totalPages
      } = workbookDetails
      super({ id, name })
      this.workbookId = id
      this.pages = new Map()
      this.setPages(totalPages)
      if (workbookDetails.assignment_duration) {
         const {
            total_time_in_seconds: totalTimeInSeconds,
            left_time_in_seconds: leftTimeInSeconds
         } = workbookDetails.assignment_duration
         this.totalTimeInSeconds = totalTimeInSeconds
         this.leftTimeInSeconds = leftTimeInSeconds
      }
      if (workbookDetails.workbook_status) {
         const { workbook_status: workbookStatus } = workbookDetails
         this.status = workbookStatus
      }
      if (workbookDetails.evaluation_type) {
         const { evaluation_type: evaluationType } = workbookDetails
         this.evaluationType = evaluationType
      }
   }

   @action.bound
   setPages(totalPages: Array<PageIdAndNameResponseType>): void {
      totalPages.map(page => {
         const { page_id: id, page_name: name } = page
         this.pages.set(id, new BaseModel({ id, name }))
      })
   }

   @action.bound
   setNewPage(id: string): void {
      const name = `${defaultPageNamePrefix} ${this.pages.size + 1}`
      this.pages.set(id, new BaseModel({ id, name }))
   }

   @action.bound
   reorderPage(id: string, destinationIndex: number): void {
      const reorderingPage = this.pages.get(id)
      this.pages.delete(id)
      const pagesArray = Array.from(this.pages)
      if (reorderingPage) {
         const { id: reorderingPageId } = reorderingPage
         pagesArray.splice(destinationIndex, 0, [
            reorderingPageId,
            reorderingPage
         ])
         this.pages = new Map(pagesArray)
      }
   }
}

export default WorkbookModel
