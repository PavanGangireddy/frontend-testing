import React, { Component, ReactNode, ReactElement } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { APIStatus } from '@ib/api-constants'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'

import PublishedWorkbook from '../../stores/models/PublishedWorkbook'
import { itemsViewOptions, orderOptions } from '../../constants/UIConstants'

import WorkbooksAndFoldersFilterBar from '../common/WorkbooksAndFoldersFilterBar'
import PublishedWorkbooks from '../PublishedWorkbooks/PublishedWorkbooks'

import { UserWorkbooksAndFoldersContainer } from './styledComponents'

interface PublishedWorkbooksDashboardTypes {
   currentRoute: string
   publishedWorkbooks: Array<PublishedWorkbook>
   onChangeOrder: (order: string) => void
   doNetworkCallForPublishedWorkbooks: () => void
   getPublishedWorkbookAPIStatus: APIStatus
   getPublishedWorkbookAPIError: any
}

@observer
class PublishedWorkbooksDashboard extends Component<
   PublishedWorkbooksDashboardTypes
> {
   @observable orderBy: { label: string; value: string }

   constructor(props) {
      super(props)
      this.orderBy = orderOptions[0]
   }

   onChangeOrder = (updatedOrder): void => {
      this.orderBy = updatedOrder
      const {
         props: { onChangeOrder, doNetworkCallForPublishedWorkbooks }
      } = this
      onChangeOrder(this.orderBy.value)
      doNetworkCallForPublishedWorkbooks()
   }

   renderSuccessUI = (): ReactElement => {
      const {
         onChangeOrder,
         props: { currentRoute, publishedWorkbooks }
      } = this
      return (
         <>
            <WorkbooksAndFoldersFilterBar
               pathInfo={[]}
               itemsView={itemsViewOptions.LIST}
               orderOptions={orderOptions}
               orderBy={this.orderBy}
               onChangeOrder={onChangeOrder}
               onClickGridViewButton={() => {}}
               onClickListViewButton={() => {}}
               isSharedWithMe={false}
               currentRoute={currentRoute}
               onDoubleClickFolder={() => {}}
            />
            <PublishedWorkbooks publishedWorkbooks={publishedWorkbooks} />
         </>
      )
   }

   render(): ReactNode {
      const {
         props: {
            getPublishedWorkbookAPIStatus,
            getPublishedWorkbookAPIError,
            doNetworkCallForPublishedWorkbooks
         },
         renderSuccessUI
      } = this
      return (
         <UserWorkbooksAndFoldersContainer>
            <LoadingWrapper
               apiStatus={getPublishedWorkbookAPIStatus}
               apiError={getPublishedWorkbookAPIError}
               onRetry={doNetworkCallForPublishedWorkbooks}
               renderSuccessUI={renderSuccessUI}
            />
         </UserWorkbooksAndFoldersContainer>
      )
   }
}

export default PublishedWorkbooksDashboard
