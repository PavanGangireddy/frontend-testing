import { UpcomingWorkbookResponseType } from '../../types'

import BaseWorkbookAndFolderInfoItem from '../BaseWorkbookAndFolderInfoItem'

class UpcomingAssignmentWorkbook extends BaseWorkbookAndFolderInfoItem {
   availableOn: string
   deadline: string
   constructor(UpcomingWorkbookDetails: UpcomingWorkbookResponseType) {
      const {
         workbook_id: id,
         workbook_name: name,
         available_on: availableOn,
         deadline
      } = UpcomingWorkbookDetails
      super({ id, name })
      this.availableOn = availableOn
      this.deadline = deadline
   }
}

export default UpcomingAssignmentWorkbook
