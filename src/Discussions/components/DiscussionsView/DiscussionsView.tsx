import React, { Component } from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import PaginationNavigation from '../../../Common/components/PaginationNavigation'
import { getDiscussionsStore } from '../../../Common/stores'

import DiscussionsStore from '../../stores/DiscussionsStore'

import DiscussionsHeader from '../DiscussionsHeader'
import NoDiscussionsView from '../NoDiscussionsView'
import DiscussionsList from '../DiscussionsList'

import { DiscussionsWrapper, PaginationContainer } from './styledComponents'

interface DiscussionsViewProps {
   entityId: any
   entityType: any
   shouldDisableActions?: boolean
}

@observer
class DiscussionsView extends Component<DiscussionsViewProps> {
   discussionsStore: DiscussionsStore

   constructor(props) {
      super(props)
      this.discussionsStore = getDiscussionsStore({
         entity_id: props.entityId,
         entity_type: props.entityType
      })
   }

   componentDidMount() {
      this.getDataFromStoreByNetworkCalls()
   }

   @action.bound
   getDataFromStoreByNetworkCalls() {
      const { changeCurrentPage } = this.discussionsStore.paginationStore
      changeCurrentPage(1)
   }

   renderDiscussionsBodyUI = observer(() => {
      const {
         paginationStore: { currentPageEntities, reloadPagesData },
         createNewDiscussion,
         getCreateNewDiscussionAPIStatus
      } = this.discussionsStore
      const { shouldDisableActions } = this.props
      return currentPageEntities.length > 0 ? (
         <DiscussionsList
            fetchedData={currentPageEntities}
            refreshFn={reloadPagesData}
            shouldDisableActions={shouldDisableActions}
         />
      ) : (
         <NoDiscussionsView
            createNewDiscussion={createNewDiscussion}
            getCreateNewDiscussionAPIStatus={getCreateNewDiscussionAPIStatus}
            shouldDisableActions={shouldDisableActions}
         />
      )
   })

   render() {
      const {
         discussionsStore,
         getDataFromStoreByNetworkCalls,
         renderDiscussionsBodyUI
      } = this

      const {
         paginationStore,
         sortbyValue: selectedSortbyValue,
         onChangeSortbyValue,
         createNewDiscussion,
         getCreateNewDiscussionAPIStatus
      } = discussionsStore

      const {
         apiError,
         entitiesFetchingStatus,
         currentPage,
         totalEntities: totalNoOfItems,
         showPerPage: itemsPerPage,
         totalPages: maxDisplayPagesCount,
         changeCurrentPage: onPagePress
      } = paginationStore

      return (
         <DiscussionsWrapper>
            <DiscussionsHeader
               {...{
                  getCreateNewDiscussionAPIStatus,
                  createNewDiscussion,
                  selectedSortbyValue,
                  onChangeSortbyValue
               }}
               shouldDisableActions={true}
            />
            <LoadingWrapper
               apiStatus={entitiesFetchingStatus}
               apiError={apiError}
               renderSuccessUI={renderDiscussionsBodyUI}
               onRetry={getDataFromStoreByNetworkCalls}
               loaderTestId={'discussionsLoader'}
            />
            <PaginationContainer>
               <PaginationNavigation
                  type={PaginationNavigation.types.advanced}
                  {...{
                     onPagePress,
                     totalNoOfItems,
                     currentPage: currentPage > 0 ? currentPage : 1,
                     itemsPerPage,
                     maxDisplayPagesCount
                  }}
               />
            </PaginationContainer>
         </DiscussionsWrapper>
      )
   }
}

export default DiscussionsView
