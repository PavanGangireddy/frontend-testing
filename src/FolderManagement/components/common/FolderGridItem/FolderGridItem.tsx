import React, { ReactNode, Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import FolderIcon from '../../../../Common/icons/FolderIcon'
import PopoverMenu from '../../../../Common/components/PopoverMenu'
import {
   isMobileDevice,
   isTabletDevice
} from '../../../../Common/utils/responsiveUtils'
import MoreIcon from '../../../../Common/icons/MoreIcon'
import IconContainer from '../../../../Common/components/IconContainer'
import BottomDrawerWithHeader from '../../../../Common/components/BottomDrawerWithHeader'
import NewProjectIcon from '../../../../Common/icons/NewProjectIcon'
import ProjectLockIcon from '../../../../Common/icons/ProjectLockIcon'
import StarredFolderIcon from '../../../../Common/icons/StarredFolderIcon'
import IDMFolderIcon from '../../../../Common/icons/IDMFolderIcon'

import {
   popOverPlacements,
   FOLDER_NAME_MAX_LENGTH,
   PROJECT
} from '../../../constants/UIConstants'

import FolderMenuContainer from '../FolderMenuContainer'

import {
   FolderGridItemContainer,
   FolderName,
   MenuContainer,
   FolderDetailsContainer,
   MoreIconContainer,
   Header,
   IconWrapper,
   FolderNameContainer,
   HeaderFolderName,
   MenuItemHeadingIconWrapperInDrawer
} from './styledComponents'

interface FolderGridItemProps {
   id: string
   name: string
   isStarred: boolean
   onDoubleClickFolder: (folderId: string) => void
   targetTestId?: string
   testId?: string
   type: string
   onClickFolderMenuItem: (folderId: string, clickedItem: string) => void
   currentRoute: string
   isLocked?: boolean
   isPublishedByUs: boolean
}

@observer
class FolderGridItem extends Component<FolderGridItemProps> {
   @observable isVisibleFolderMenuConatiner

   constructor(props) {
      super(props)
      this.isVisibleFolderMenuConatiner = false
   }
   static dafultProps = {
      targetTestId: 'target',
      testId: 'folderGridItem'
   }

   onClickFolderMenuItem = (folderId: string, clickedItem: string) => {
      const { onClickFolderMenuItem } = this.props
      this.closeFolderMenuContainerDrawer()
      onClickFolderMenuItem(folderId, clickedItem)
   }

   openFolderMenuContainerDrawer = (event): void => {
      this.isVisibleFolderMenuConatiner = true
      event.stopPropagation()
   }

   closeFolderMenuContainerDrawer = (): void => {
      this.isVisibleFolderMenuConatiner = false
   }

   renderProjectIcon = (): ReactNode =>
      isMobileDevice ? (
         <NewProjectIcon data-testid={`projectIcon`} width={48} height={48} />
      ) : isTabletDevice ? (
         <NewProjectIcon data-testid={`projectIcon`} width={60} height={60} />
      ) : (
         <NewProjectIcon data-testid={`projectIcon`} width={80} height={80} />
      )

   isProject = () => {
      const { type } = this.props
      return type === PROJECT
   }

   renderFolderOrProjectIcon = (): ReactNode => {
      const { isStarred, type, isPublishedByUs } = this.props
      const folderIconDimensions = isMobileDevice ? 32 : 48
      return type === PROJECT ? (
         this.renderProjectIcon()
      ) : isPublishedByUs ? (
         <IDMFolderIcon
            data-testid='IDMFolderIcon'
            width={folderIconDimensions}
            height={folderIconDimensions}
         />
      ) : isStarred ? (
         <StarredFolderIcon
            data-testid={`starredFolderIcon`}
            width={folderIconDimensions}
            height={folderIconDimensions}
         />
      ) : (
         <FolderIcon
            data-testid={`folderIcon`}
            width={folderIconDimensions}
            height={folderIconDimensions}
         />
      )
   }

   // TODO: Need to use CSS
   trimFolderName = (folderName: string): string => {
      if (folderName) {
         if (folderName.length > FOLDER_NAME_MAX_LENGTH) {
            return `${folderName.slice(0, FOLDER_NAME_MAX_LENGTH)}...`
         }
      }

      return folderName
   }

   onDoubleClickFolder = (): void => {
      const { onDoubleClickFolder, id } = this.props
      onDoubleClickFolder(id)
   }

   renderTrigger = (): React.ReactElement => {
      if (isMobileDevice) {
         return (
            <MoreIconContainer onClick={this.openFolderMenuContainerDrawer}>
               <IconContainer>
                  <MoreIcon />
               </IconContainer>
            </MoreIconContainer>
         )
      }
      return (
         <MoreIconContainer>
            <IconContainer>
               <MoreIcon />
            </IconContainer>
         </MoreIconContainer>
      )
   }

   renderProjectLockIcon = (): ReactNode =>
      isMobileDevice ? (
         <ProjectLockIcon width={16} height={16} />
      ) : (
         <ProjectLockIcon />
      )

   renderMenuTrigger = (): ReactNode => {
      const { targetTestId, isLocked } = this.props
      if (isLocked) {
         return (
            <MenuContainer isLocked={isLocked}>
               <IconContainer>{this.renderProjectLockIcon()}</IconContainer>
            </MenuContainer>
         )
      }
      if (isMobileDevice) {
         return (
            <>
               <MenuContainer>{this.renderTrigger()}</MenuContainer>
            </>
         )
      }
      return (
         <MenuContainer>
            <PopoverMenu
               renderPopoverContent={this.renderMenuContainer()}
               placement={popOverPlacements.rightTop}
               targetTestId={targetTestId}
               renderPopoverTrigger={this.renderTrigger()}
            />
         </MenuContainer>
      )
   }

   renderMenuContainer = (): ReactNode => {
      const { isStarred, id, currentRoute, type } = this.props
      return (
         <FolderMenuContainer
            isStarred={isStarred}
            folderId={id}
            onClickFolderMenuItem={this.onClickFolderMenuItem}
            currentRoute={currentRoute}
            type={type}
         />
      )
   }

   renderHeader = (): ReactNode => {
      const { name } = this.props
      return (
         <Header>
            <MenuItemHeadingIconWrapperInDrawer>
               {this.renderFolderOrProjectIcon()}
            </MenuItemHeadingIconWrapperInDrawer>
            <FolderNameContainer>
               <HeaderFolderName>{this.trimFolderName(name)}</HeaderFolderName>
            </FolderNameContainer>
         </Header>
      )
   }

   renderFolderMenuContainerDrawer = (): ReactNode => {
      const { isVisibleFolderMenuConatiner } = this
      if (isMobileDevice) {
         return (
            <BottomDrawerWithHeader
               isVisible={isVisibleFolderMenuConatiner}
               closeDrawer={this.closeFolderMenuContainerDrawer}
               headerContent={this.renderHeader()}
            >
               {this.renderMenuContainer()}
            </BottomDrawerWithHeader>
         )
      }
      return null
   }

   render(): ReactNode {
      const { name, testId, isLocked } = this.props
      return (
         <>
            <FolderGridItemContainer
               data-testid={testId}
               onClick={isLocked ? (): void => {} : this.onDoubleClickFolder} //TODO:need to change the onDoubleClick method name
               isLocked={isLocked}
               isProject={this.isProject()}
            >
               <FolderDetailsContainer title={name}>
                  <IconWrapper>{this.renderFolderOrProjectIcon()}</IconWrapper>
                  <FolderName
                     data-testid={'folderName'}
                     isProject={this.isProject()}
                  >
                     {name}
                  </FolderName>
               </FolderDetailsContainer>
               {this.renderMenuTrigger()}
            </FolderGridItemContainer>
            {this.renderFolderMenuContainerDrawer()}
         </>
      )
   }
}

export default FolderGridItem
