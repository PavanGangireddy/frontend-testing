import React, { Component, ReactNode } from 'react'
import { observer } from 'mobx-react'
import { APIStatus } from '@ib/api-constants'
import { withTranslation } from 'react-i18next'

import Button from '../../../Common/components/Button'

import { SHARED_WITH_ME, TRASH } from '../../constants/UIConstants'

import SearchComponentWithSelect from '../SearchComponentWithSelect'
import AddWorkbookOrFolder from '../AddWorkbookOrFolder'

import {
   SearchAndAddButtonsContainer,
   ButtonWrapper,
   TextContainer
} from './styledComponents'

interface WithTranslationProps {
   i18n: any
   tReady: any
   t: any
}

interface Props extends WithTranslationProps {
   onChangeText: Function
   optionsData: any
   createFolderAPI: Function
   createWorkbookAPI: Function
   createFolderOrWorkbookAPIStatus?: APIStatus
   createFolderOrWorkbookAPIError?: any
   rootFolderId: string
   getWorkbooksAndFoldersAPIStatus: APIStatus
   getRootFolderDetailsAPIStatus: APIStatus
   getWorkbooksAndFoldersAPI: Function
   showAddWorkbookOrFolderButton: boolean
   isSharedWithMeRoute: boolean
   currentRoute: string
   isEmptyTrash: boolean
   onClickEmptyTrash?: Function
   getSharedWorkbooksAndFoldersOfASubFolderAPI: Function
   getFolderIdOfAWorkbookAPI: Function
   isHomeRoute?: boolean
   goToFolder?: () => void
}

@observer
class SearchAndAddButtons extends Component<Props> {
   onClickEmptyTrash = (): void => {
      const { onClickEmptyTrash } = this.props
      if (onClickEmptyTrash) {
         onClickEmptyTrash()
      }
   }

   renderEmptyFolderButton = (): ReactNode => {
      const { currentRoute, isEmptyTrash, t } = this.props
      if (currentRoute === TRASH) {
         return (
            <ButtonWrapper
               variant={Button.variants.secondary}
               onClick={this.onClickEmptyTrash}
               disabled={isEmptyTrash}
               id={'emptyTrash'}
            >
               <TextContainer>
                  {t('folderManagement:trash.emptyTrash')}
               </TextContainer>
            </ButtonWrapper>
         )
      }
      return null
   }
   render(): React.ReactNode {
      const {
         optionsData,
         onChangeText,
         createFolderAPI,
         createWorkbookAPI,
         createFolderOrWorkbookAPIStatus,
         createFolderOrWorkbookAPIError,
         rootFolderId,
         getRootFolderDetailsAPIStatus,
         getWorkbooksAndFoldersAPIStatus,
         getWorkbooksAndFoldersAPI,
         showAddWorkbookOrFolderButton,
         isSharedWithMeRoute,
         getSharedWorkbooksAndFoldersOfASubFolderAPI,
         getFolderIdOfAWorkbookAPI,
         isHomeRoute,
         goToFolder,
         currentRoute
      } = this.props
      return (
         <SearchAndAddButtonsContainer
            isSharedWithMeRoute={isSharedWithMeRoute}
         >
            <SearchComponentWithSelect
               onChangeText={onChangeText}
               optionsData={optionsData}
               getWorkbooksAndFoldersAPI={getWorkbooksAndFoldersAPI}
               getFolderIdOfAWorkbookAPI={getFolderIdOfAWorkbookAPI}
            />
            {showAddWorkbookOrFolderButton && (
               <AddWorkbookOrFolder
                  createWorkbookAPI={createWorkbookAPI}
                  createFolderAPI={createFolderAPI}
                  createFolderOrWorkbookAPIStatus={
                     createFolderOrWorkbookAPIStatus
                  }
                  createFolderOrWorkbookAPIError={
                     createFolderOrWorkbookAPIError
                  }
                  rootFolderId={rootFolderId}
                  getWorkbooksAndFoldersAPIStatus={
                     getWorkbooksAndFoldersAPIStatus
                  }
                  getRootFolderDetailsAPIStatus={getRootFolderDetailsAPIStatus}
                  getWorkbooksAndFoldersAPI={getWorkbooksAndFoldersAPI}
                  isSharedWithMeRoute={isSharedWithMeRoute}
                  getSharedWorkbooksAndFoldersOfASubFolderAPI={
                     getSharedWorkbooksAndFoldersOfASubFolderAPI
                  }
                  isHomeRoute={isHomeRoute}
                  goToFolder={goToFolder}
               />
            )}
            {this.renderEmptyFolderButton()}
         </SearchAndAddButtonsContainer>
      )
   }
}

export default withTranslation('translation', { withRef: true })(
   SearchAndAddButtons
)
