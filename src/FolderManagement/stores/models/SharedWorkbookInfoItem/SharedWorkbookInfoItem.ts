import { observable } from 'mobx'

import { SharedWorkbookInfoItemType, Owner } from '../../types'

import WorkbookInfoItem from '../WorkbookInfoItem'

class SharedWorkbookInfoItem extends WorkbookInfoItem {
   owner?: Owner

   constructor(workBookDetails: SharedWorkbookInfoItemType) {
      const { owner, ...otherDetails } = workBookDetails
      super(otherDetails)
      this.owner = owner
   }
}

export default SharedWorkbookInfoItem
