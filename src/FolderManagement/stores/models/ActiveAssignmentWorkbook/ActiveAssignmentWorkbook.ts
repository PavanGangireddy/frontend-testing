import { ActiveWorkbookResponseType } from '../../types'

import CompletedAssignmentWorkbook from '../CompletedAssignmentWorkbook'

class ActiveAssignmentWorkbook extends CompletedAssignmentWorkbook {
   deadline: string
   status: string

   constructor(ActiveWorkbookDetails: ActiveWorkbookResponseType) {
      const {
         workbook_id,
         workbook_name,
         user_secured_score,
         total_score,
         submitted_datetime,
         deadline,
         status
      } = ActiveWorkbookDetails
      super({
         workbook_id,
         workbook_name,
         user_secured_score,
         total_score,
         submitted_datetime
      })
      this.deadline = deadline
      this.status = status
   }
}

export default ActiveAssignmentWorkbook
