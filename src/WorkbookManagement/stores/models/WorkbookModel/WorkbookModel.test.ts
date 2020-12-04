import getWorkbookDetailsAPIResponse from '../../../fixtures/getWorkbookDetailsAPIResponse.json'

import WorkbookModel from '.'

const { page: _, ...workbookDetails } = getWorkbookDetailsAPIResponse

describe('WorkbookModel test cases', () => {
   it('should initialize workbook model with given data', () => {
      const workbookModel = new WorkbookModel(workbookDetails)

      const {
         workbook_id: workbookId,
         workbook_name: workbookName,
         total_pages: totalPages
      } = workbookDetails

      expect(workbookModel.id).toBe(workbookId)
      expect(workbookModel.name).toBe(workbookName)
      expect(workbookModel.pages.size).toBe(totalPages.length)
   })

   it('should test addNewPage method', () => {
      const workbookModel = new WorkbookModel(workbookDetails)

      const { total_pages: totalPages } = workbookDetails

      const newPageId = '1'

      workbookModel.setNewPage(newPageId)

      expect(workbookModel.pages.size).toBe(totalPages.length + 1)
      expect(workbookModel.pages.get(newPageId)?.name).toBe(
         `Page ${totalPages.length + 1}`
      )
   })
})
