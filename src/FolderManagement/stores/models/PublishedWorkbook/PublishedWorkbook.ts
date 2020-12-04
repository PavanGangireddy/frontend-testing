import BaseWorkbookAndFolderInfoItem from '../BaseWorkbookAndFolderInfoItem'

import { PublishedWorkbookType } from '../../types'

class PublishedWorkbook extends BaseWorkbookAndFolderInfoItem {
   publishedDateTime
   totalSelectedUsersCount
   publishedUsersCount

   constructor(publishedWorkbookDetails: PublishedWorkbookType) {
      const {
         workbook_id: id,
         workbook_name: name,
         published_date_time: publishedDateTime,
         total_selected_users_count: totalSelectedUsersCount,
         published_users_count: publishedUsersCount
      } = publishedWorkbookDetails
      super({ id, name })
      this.publishedDateTime = publishedDateTime
      this.totalSelectedUsersCount = totalSelectedUsersCount
      this.publishedUsersCount = publishedUsersCount
   }
}

export default PublishedWorkbook
