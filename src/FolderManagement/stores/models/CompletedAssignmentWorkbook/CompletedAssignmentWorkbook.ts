import { CompletedWorkbookResponseType } from '../../types'

import BaseWorkbookAndFolderInfoItem from '../BaseWorkbookAndFolderInfoItem'

class CompletedAssignmentWorkbook extends BaseWorkbookAndFolderInfoItem {
   userSecuredScore: number | null
   totalScore: number | null
   submittedDatetime: string | null

   constructor(CompletedWorkbookDetails: CompletedWorkbookResponseType) {
      const {
         workbook_id: id,
         workbook_name: name,
         user_secured_score: userSecuredScore,
         total_score: totalScore,
         submitted_datetime: submittedDatetime
      } = CompletedWorkbookDetails
      super({ id, name })
      this.userSecuredScore = userSecuredScore
      this.totalScore = totalScore
      this.submittedDatetime = submittedDatetime
   }
}

export default CompletedAssignmentWorkbook
