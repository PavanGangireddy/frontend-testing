import React, { Component, ReactElement } from 'react'
import { observer } from 'mobx-react'

import DashboardStore from '../../stores/DashboardStore'

import SearchComponentWithSelect from '../SearchComponentWithSelect'

import {
   HeaderContainer,
   WelcomeBackMessage,
   WelcomeBackMessageContainer
} from './styledComponents'

interface HomeProjectsHeaderProps {
   message: string
   dashboardStore: DashboardStore
   goToFolder: Function
}

@observer
class HomeProjectsHeader extends Component<HomeProjectsHeaderProps> {
   onChangeSearchText = async (searchText: string) => {
      const { dashboardStore } = this.props
      const { getSearchFoldersAndWorkbooksAPI } = dashboardStore
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
      const { dashboardStore } = this.props
      const { newlyCreatedFolderId } = dashboardStore
      const { goToFolder } = this.props
      if (goToFolder && newlyCreatedFolderId !== '') {
         goToFolder(newlyCreatedFolderId)
      }
   }

   render(): ReactElement {
      const {
         dashboardStore: {
            searchFoldersAndWorkbooksData,
            getWorkbooksAndFoldersAPI,
            getFolderIdOfAWorkbookAPI
         },
         message
      } = this.props
      return (
         <HeaderContainer>
            <WelcomeBackMessageContainer>
               <WelcomeBackMessage>{message}</WelcomeBackMessage>
            </WelcomeBackMessageContainer>
            <SearchComponentWithSelect
               onChangeText={this.onChangeSearchText}
               optionsData={searchFoldersAndWorkbooksData}
               getWorkbooksAndFoldersAPI={getWorkbooksAndFoldersAPI}
               getFolderIdOfAWorkbookAPI={getFolderIdOfAWorkbookAPI}
            />
         </HeaderContainer>
      )
   }
}

export default HomeProjectsHeader
