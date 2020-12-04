import React from 'react'
import { observer, inject } from 'mobx-react'

import SearchAndAddButtons from '../components/SearchAndAddButtons'
import DashboardStore from '../stores/DashboardStore'
import { home } from '../constants/UIConstants'

interface InjectedProps extends Props {
   dashboardStore: DashboardStore
}

interface Props {
   showAddWorkbookOrFolderButton: boolean
   currentRoute: string
   isEmptyTrash: boolean
   onClickEmptyTrash?: Function
   isSharedWithMeRoute: boolean
   isHomeRoute?: boolean
   goToFolder?: (id: string) => void
}

@inject('dashboardStore')
@observer
class SearchAndAddButtonsContainer extends React.Component<Props> {
   static defaultProps = {
      currentRoute: home,
      isEmptyTrash: false,
      isSharedWithMeRoute: false
   }

   //TODO:need to clear the store

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getDashBoardStore = () => this.getInjectedProps().dashboardStore

   onChangeSearchText = async (searchText: string) => {
      const { getSearchFoldersAndWorkbooksAPI } = this.getDashBoardStore()
      //TODO: need to update the search_field name
      const isSearchEmpty = searchText.trim() !== ''
      if (isSearchEmpty) {
         const request = {
            search_field: 'NAME',
            value: searchText
         }
         await getSearchFoldersAndWorkbooksAPI(request)
      }
   }

   goToFolder = (): void => {
      const { newlyCreatedFolderId } = this.getDashBoardStore()
      const { goToFolder } = this.props
      if (goToFolder && newlyCreatedFolderId !== '') {
         goToFolder(newlyCreatedFolderId)
      }
   }

   render() {
      const {
         searchFoldersAndWorkbooksData,
         createFolderAPI,
         createWorkbookAPI,
         createFolderOrWorkbookAPIStatus,
         createFolderOrWorkbookAPIError,
         rootFolderId,
         getRootFolderDetailsAPIStatus,
         getWorkbooksAndFoldersAPIStatus,
         getWorkbooksAndFoldersAPI,
         getSharedWorkbooksAndFoldersOfASubFolderAPI,
         getFolderIdOfAWorkbookAPI
      } = this.getDashBoardStore()
      const {
         showAddWorkbookOrFolderButton,
         currentRoute,
         isEmptyTrash,
         onClickEmptyTrash,
         isSharedWithMeRoute,
         isHomeRoute
      } = this.props
      return (
         <>
            <SearchAndAddButtons
               onChangeText={this.onChangeSearchText}
               optionsData={searchFoldersAndWorkbooksData}
               createFolderAPI={createFolderAPI}
               createWorkbookAPI={createWorkbookAPI}
               createFolderOrWorkbookAPIStatus={createFolderOrWorkbookAPIStatus}
               createFolderOrWorkbookAPIError={createFolderOrWorkbookAPIError}
               rootFolderId={rootFolderId}
               getRootFolderDetailsAPIStatus={getRootFolderDetailsAPIStatus}
               getWorkbooksAndFoldersAPIStatus={getWorkbooksAndFoldersAPIStatus}
               getWorkbooksAndFoldersAPI={getWorkbooksAndFoldersAPI}
               showAddWorkbookOrFolderButton={showAddWorkbookOrFolderButton}
               currentRoute={currentRoute}
               isEmptyTrash={isEmptyTrash}
               onClickEmptyTrash={onClickEmptyTrash}
               isSharedWithMeRoute={isSharedWithMeRoute}
               getSharedWorkbooksAndFoldersOfASubFolderAPI={
                  getSharedWorkbooksAndFoldersOfASubFolderAPI
               }
               getFolderIdOfAWorkbookAPI={getFolderIdOfAWorkbookAPI}
               isHomeRoute={isHomeRoute}
               goToFolder={this.goToFolder}
            />
         </>
      )
   }
}

export default SearchAndAddButtonsContainer
