import { GetWorkbookChildDetailsAPIResponse } from '../../types'

interface ChildType {
   id: string
   name: string
}

interface ChildList extends ChildType {
   sections: Array<ChildType>
}

interface ChildPage extends ChildType {
   lists: Array<ChildList>
}

class WorkbookChildDetailsModel {
   id: string
   name: string
   pages: Array<ChildPage>

   constructor(childDetails: GetWorkbookChildDetailsAPIResponse) {
      const { workbook_id: id, workbook_name: name, pages } = childDetails
      this.id = id
      this.name = name
      this.pages = []
      let modelLists: Array<ChildList> = []
      let modelSections: Array<ChildType> = []
      pages.forEach(page => {
         const { lists } = page
         modelLists = []
         lists.forEach(list => {
            modelSections = []
            const { sections } = list
            sections.forEach(section => {
               const { section_id: id, section_name: name } = section
               modelSections.push({ id, name })
            })
            const { list_id: id, list_name: name } = list
            modelLists.push({ id, name, sections: modelSections })
         })
         const { page_id: id, page_name: name } = page
         this.pages.push({ id, name, lists: modelLists })
      })
   }
}

export default WorkbookChildDetailsModel
