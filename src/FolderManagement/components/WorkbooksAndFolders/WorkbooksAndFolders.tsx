import React, { Component, ReactNode } from 'react'
import { observer } from 'mobx-react'

import { itemsViewOptions } from '../../constants/UIConstants'
import SharedWorkbookInfoItem from '../../stores/models/SharedWorkbookInfoItem'
import SharedFolderInfoItem from '../../stores/models/SharedFolderInfoItem'

import WorkbookListItem from '../common/WorkbookListItem'
import FolderGridItem from '../common/FolderGridItem'
import FolderListItem from '../common/FolderListItem'
import ListItemsHeader from '../common/ListItemsHeader'
import WorkbookGridItem from '../common/WorkbookGridItem'
import FolderMenuContainer from '../common/FolderMenuContainer'
import WorkbookMenuContainer from '../common/WorkbookMenuContainer'

import {
   WorkbooksAndFoldersContainer,
   GridViewContainer,
   ListViewContainer,
   GridViewSection
} from './styledComponents'

interface WorkbooksAndFoldersProps {
   itemsView: string
   workbooks: Array<SharedWorkbookInfoItem>
   folders: Array<SharedFolderInfoItem>
   onDoubleClickWorkbook: (workbookId: string) => void
   onDoubleClickFolder: (folderId: string) => void
   onClickFolderMenuItem: (folderId: string, clickedItem: string) => void
   onClickWorkbookMenuItem: (workbookId: string, clickedItem: string) => void
   isSharedWithMe: boolean
   currentRoute: string
}

@observer
class WorkbooksAndFolders extends Component<WorkbooksAndFoldersProps> {
   renderWorkbooks = (): ReactNode => {
      const {
         workbooks,
         itemsView,
         onDoubleClickWorkbook,
         onClickWorkbookMenuItem,
         currentRoute
      } = this.props
      if (workbooks.length !== 0) {
         return itemsView === itemsViewOptions.GRID
            ? workbooks.map(workbook => (
                 <WorkbookGridItem
                    key={workbook.id}
                    id={workbook.id}
                    name={workbook.name}
                    isPinned={workbook.isPinned}
                    isPublishedByUs={workbook.isPublishedByUs}
                    currentRoute={currentRoute}
                    onClickWorkbookMenuItem={onClickWorkbookMenuItem}
                    onDoubleClickWorkbook={onDoubleClickWorkbook}
                 />
              ))
            : workbooks.map(workbook => (
                 <WorkbookListItem
                    key={workbook.id}
                    id={workbook.id}
                    name={workbook.name}
                    isPinned={workbook.isPinned}
                    lastModified={workbook.lastModified}
                    menuContainer={
                       <WorkbookMenuContainer
                          isPinned={workbook.isPinned}
                          workbookId={workbook.id}
                          onClickWorkbookMenuItem={onClickWorkbookMenuItem}
                          currentRoute={currentRoute}
                       />
                    }
                    onDoubleClickWorkbook={onDoubleClickWorkbook}
                 />
              ))
      }
      return null
   }

   renderFolders = (): ReactNode => {
      const {
         folders,
         itemsView,
         onDoubleClickFolder,
         onClickFolderMenuItem,
         currentRoute
      } = this.props
      if (folders.length !== 0) {
         return itemsView === itemsViewOptions.GRID
            ? folders.map(folder => (
                 <FolderGridItem
                    key={folder.id}
                    id={folder.id}
                    name={folder.name}
                    isStarred={folder.isStarred}
                    isPublishedByUs={folder.isPublishedByUs}
                    onDoubleClickFolder={onDoubleClickFolder}
                    currentRoute={currentRoute}
                    onClickFolderMenuItem={onClickFolderMenuItem}
                    testId={'folderGridItem'}
                    type={folder.type}
                    isLocked={folder.isLocked}
                 />
              ))
            : folders.map(folder => (
                 <FolderListItem
                    key={folder.id}
                    id={folder.id}
                    name={folder.name}
                    isStarred={folder.isStarred}
                    lastModified={folder.lastModified}
                    onDoubleClickFolder={onDoubleClickFolder}
                    menuContainer={
                       <FolderMenuContainer
                          isStarred={folder.isStarred}
                          folderId={folder.id}
                          onClickFolderMenuItem={onClickFolderMenuItem}
                          currentRoute={currentRoute}
                          type={folder.type}
                       />
                    }
                    type={folder.type}
                 />
              ))
      }
      return null
   }

   renderGridView = (): ReactNode => {
      const { folders, workbooks } = this.props
      return (
         <GridViewContainer>
            <GridViewSection>
               {folders.length !== 0 ? this.renderFolders() : null}
               {workbooks.length !== 0 ? this.renderWorkbooks() : null}
            </GridViewSection>
         </GridViewContainer>
      )
   }

   renderListViewHeader = (): ReactNode => {
      const { itemsView, isSharedWithMe } = this.props
      return itemsView === itemsViewOptions.LIST ? (
         <ListItemsHeader isSharedWithMe={isSharedWithMe} />
      ) : null
   }

   renderListView = (): ReactNode => (
      <ListViewContainer>
         {this.renderFolders()}
         {this.renderWorkbooks()}
      </ListViewContainer>
   )

   renderWorkbooksAndFolders = (): ReactNode => {
      const { itemsView } = this.props
      return itemsView === itemsViewOptions.GRID
         ? this.renderGridView()
         : this.renderListView()
   }

   render(): ReactNode {
      const { itemsView } = this.props
      return (
         <WorkbooksAndFoldersContainer
            isGridView={itemsView === itemsViewOptions.GRID}
            isListView={itemsView === itemsViewOptions.LIST}
         >
            {this.renderListViewHeader()}
            {this.renderWorkbooksAndFolders()}
         </WorkbooksAndFoldersContainer>
      )
   }
}

export default WorkbooksAndFolders
