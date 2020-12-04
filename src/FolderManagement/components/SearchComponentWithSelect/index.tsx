import React, { Component } from 'react'
import { components } from 'react-select'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import AsyncSelect from 'react-select/async'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { History } from 'history'

import WorkBookIcon from '../../../Common/icons/WorkbookIcon'
import StarredFolderIcon from '../../../Common/icons/StarredFolderIcon'
import FolderIcon from '../../../Common/icons/FolderIcon'
import SearchIcon from '../../../Common/icons/SearchIcon'
import SelectField from '../../../Common/components/SelectField'
import { showFailureBottomCenterToast } from '../../../Common/utils/ToastUtils'
import Colors from '../../../Common/themes/Colors'
import ProjectIcon from '../../../Common/icons/ProjectIcon'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import StarredWorkbookIcon from '../../../Common/icons/StarredWorkbookIcon'

import {
   ACTIVE_FOLDER_PREFIX,
   WORKBOOK_PAGE_PREFIX
} from '../../constants/NavigationConstants'
import { PROJECT } from '../../constants/UIConstants'

import {
   SearchIconContainer,
   searchFieldContainerCSS,
   searchFieldCSS,
   GotoPage,
   IconContainer
} from './styledComponents'

const renderIcon = (
   isFolder: boolean,
   isStarred: boolean,
   isPinned: boolean,
   type: string
): React.ReactNode => {
   if (type === PROJECT) {
      return <ProjectIcon />
   } else if (isFolder && isStarred) {
      return <StarredFolderIcon />
   } else if (isFolder && !isStarred) {
      return <FolderIcon />
   } else if (!isFolder && isPinned) {
      return <StarredWorkbookIcon />
   } else if (!isFolder && !isPinned) {
      return <WorkBookIcon />
   }
}

const renderFillColor = (): any => {
   if (isMobileDevice) {
      return Colors.white
   }
   return Colors.steel
}

const getSearchIconDimensions = (): number => (isMobileDevice ? 16 : 24)

const DropdownIndicator = (props: any): React.ReactNode =>
   components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
         <SearchIconContainer>
            <SearchIcon
               fill={renderFillColor()}
               width={getSearchIconDimensions()}
               height={getSearchIconDimensions()}
            />
         </SearchIconContainer>
      </components.DropdownIndicator>
   )

const getOptionsFromData = data => {
   if (Object.keys(data).length > 0) {
      const options = data.folders.map(item => ({
         label: item.folder_name,
         value: item.folder_name,
         id: item.folder_id,
         isFolder: true,
         isStarred: item.is_starred,
         isPinned: false,
         type: item.folder_type
      }))

      const workBookOptions = data.workbooks.map(item => ({
         label: item.workbook_name,
         value: item.workbook_name,
         id: item.workbook_id,
         isFolder: false,
         isStarred: false,
         isPinned: item.is_pinned
      }))

      return options.concat(workBookOptions)
   }
}

interface Props extends RouteComponentProps {
   onChangeText: Function
   optionsData: any
   history: History
   getWorkbooksAndFoldersAPI: Function
   match: any
   getFolderIdOfAWorkbookAPI: Function
}

//TODO: need to include i18n
@observer
class SearchComponentWithSelect extends Component<Props> {
   @observable shouldDisplayNoResult = false

   @observable inputValue = '' //To clear after the option selected

   constructor(props) {
      super(props)
      this.inputValue = ''
   }

   //TODO: need to update the name in api call
   onChange = data => {
      const { getWorkbooksAndFoldersAPI, match } = this.props
      const currentFolderId = match.params.folderId
      if (data !== null && data.id !== currentFolderId) {
         this.gotoPage(data)
      }
      if (data !== null && data.isFolder && data.id !== currentFolderId) {
         getWorkbooksAndFoldersAPI(data.id)
      }
      this.shouldDisplayNoResult = false
   }

   onBlur = () => {
      this.shouldDisplayNoResult = false
   }

   displayNoResultsPage = (): string | null =>
      this.shouldDisplayNoResult ? 'Data Not Found' : null

   loadOptions = async inputValue => {
      if (inputValue.length > 0) {
         this.shouldDisplayNoResult = true
      }

      await this.props.onChangeText(inputValue)
      return getOptionsFromData(this.props.optionsData)
   }

   gotoPage = async data => {
      const { isFolder, id } = data
      const { history, getFolderIdOfAWorkbookAPI } = this.props
      let route
      if (isFolder) {
         route = `${ACTIVE_FOLDER_PREFIX}${id}`
         history.push(route)
         return
      }
      route = `${WORKBOOK_PAGE_PREFIX}${id}`
      const gotoWorkbook = folderId => {
         history.push(
            `${ACTIVE_FOLDER_PREFIX}${folderId}${WORKBOOK_PAGE_PREFIX}${id}`
         )
      }
      await getFolderIdOfAWorkbookAPI(
         id,
         gotoWorkbook,
         showFailureBottomCenterToast
      )
      return
   }

   //TODO: need to check and update as props for CustomOption per typescript in react select
   CustomOption = (props: any): React.ReactNode => {
      const { innerRef, innerProps } = props
      return (
         <components.Option {...props}>
            <GotoPage as={'div'} ref={innerRef} {...innerProps}>
               <IconContainer>
                  {renderIcon(
                     props.data.isFolder,
                     props.data.isStarred,
                     props.data.isPinned,
                     props.data.type
                  )}
               </IconContainer>
               {props.data.label}
            </GotoPage>
         </components.Option>
      )
   }

   render(): React.ReactNode {
      const Option = this.CustomOption
      return (
         <>
            <SelectField
               containerCSS={searchFieldContainerCSS}
               selectFieldCSS={searchFieldCSS}
               shouldDisableForSingleOption={true}
               components={{ DropdownIndicator, Option }}
               isClearable={true}
               as={AsyncSelect}
               loadOptions={this.loadOptions}
               noOptionsMessage={this.displayNoResultsPage}
               onChange={this.onChange}
               value={this.inputValue}
               onBlur={this.onBlur}
               placeholder={'Search'}
               data-testid={'searchBar'}
            />
         </>
      )
   }
}

export default withRouter(SearchComponentWithSelect)
