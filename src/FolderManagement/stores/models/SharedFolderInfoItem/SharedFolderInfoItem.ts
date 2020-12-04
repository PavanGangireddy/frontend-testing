import { SharedFolderInfoItemType } from '../../types'

import FolderInfoItem from '../FolderInfoItem'

class SharedFolderInfoItem extends FolderInfoItem {
   constructor(folderDetails: SharedFolderInfoItemType) {
      super(folderDetails)
   }
}

export default SharedFolderInfoItem
