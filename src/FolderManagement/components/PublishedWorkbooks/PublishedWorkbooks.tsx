import React, { Component, ReactNode } from 'react'

import PublishedWorkbook from '../../stores/models/PublishedWorkbook'

import PublishedListHeader from './PublishedListHeader'
import PublishedWorkbookListItem from './PublishedWorkbookListItem'
import {
   PublishWorkbooksContainer,
   ListViewContainer
} from './styledComponents'

interface PublishedWorkbooksProps {
   publishedWorkbooks: Array<PublishedWorkbook>
}

class PublishedWorkbooks extends Component<PublishedWorkbooksProps> {
   renderListItemsHeader = (): ReactNode => <PublishedListHeader />

   renderListItems = (): ReactNode => {
      const { publishedWorkbooks } = this.props
      return publishedWorkbooks.map(eachWorkbook => (
         <PublishedWorkbookListItem
            key={eachWorkbook.id}
            workbookDetails={eachWorkbook}
         />
      ))
   }

   renderList = (): ReactNode => (
      <ListViewContainer>{this.renderListItems()}</ListViewContainer>
   )

   //FIXME: fix the layout alignment at 768px and also keep bg-color for entire page till bottom
   render(): ReactNode {
      const { renderListItemsHeader, renderList } = this
      return (
         <PublishWorkbooksContainer>
            {renderListItemsHeader()}
            {renderList()}
         </PublishWorkbooksContainer>
      )
   }
}

export default PublishedWorkbooks
