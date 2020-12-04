import React, { Component, ReactNode } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import WorkbookIcon from '../../../../Common/icons/WorkbookIcon'
import MoreIcon from '../../../../Common/icons/MoreIcon'
import PopoverMenu from '../../../../Common/components/PopoverMenu'
import { isMobileDevice } from '../../../../Common/utils/responsiveUtils'
import IconContainer from '../../../../Common/components/IconContainer'
import BottomDrawerWithHeader from '../../../../Common/components/BottomDrawerWithHeader'
import WorkbookAssignmentIcon from '../../../../Common/icons/WorkbookAssignmentIcon'
import IDMWorkbookIcon from '../../../../Common/icons/IDMWorkbookIcon'
import StarredWorkbookIcon from '../../../../Common/icons/StarredWorkbookIcon'
import AssignmentIconClipBoardVariant from '../../../../Common/icons/AssignmentIconClipBoardVariant'

import { ASSIGNMENTS, LEARNINGS } from '../../../constants/UIConstants'

import WorkbookMenuContainer from '../WorkbookMenuContainer'

import {
   WorkBookWrapper,
   IconWrapper,
   WorkBookName,
   Header,
   WorkbookNameContainer,
   HeaderWorkbookName,
   MoreIconContainer,
   MenuItemHeadingIconWrapperInDrawer,
   WorkbookDetailsContainer,
   MenuContainer
} from './styledComponents'

export interface PinnedWorkBookProps {
   id: string
   name: string
   isPinned: boolean
   onDoubleClickWorkbook: (workbookId: string) => void
   targetTestId?: string
   currentRoute: string
   testId?: string
   isAssignmentWorkbook?: boolean
   onClickWorkbookMenuItem?: (workbookId: string, clickedItem: string) => void
   isPublishedByUs: boolean
}

@observer
class WorkbookGridItem extends Component<PinnedWorkBookProps> {
   @observable isVisibleWorkbookMenuContainer: boolean

   constructor(props) {
      super(props)
      this.isVisibleWorkbookMenuContainer = false
   }

   static defaultProps = {
      targetTestId: 'target',
      currentRoute: 'home',
      testId: 'workbookGridItem',
      isAssignmentWorkbook: false,
      isVisibleWorkbookMenuContainer: false,
      openWorkbookMenuContainerDrawer: () => {},
      closeWorkbookMenuContainerDrawer: () => {}
   }

   onClickWorkbookMenuItem = (workbookId: string, clickedItem: string) => {
      const { onClickWorkbookMenuItem } = this.props
      this.closeWorkbookMenuContainerDrawer()
      if (onClickWorkbookMenuItem) {
         onClickWorkbookMenuItem(workbookId, clickedItem)
      }
   }

   openWorkbookMenuContainerDrawer = (event): void => {
      this.isVisibleWorkbookMenuContainer = true
      event.stopPropagation()
   }

   closeWorkbookMenuContainerDrawer = (): void => {
      this.isVisibleWorkbookMenuContainer = false
   }

   renderWorkbookIcon = (): ReactNode => {
      const {
         isPinned,
         isAssignmentWorkbook,
         isPublishedByUs,
         currentRoute
      } = this.props
      const workbookIconDimensions = isMobileDevice ? 32 : 48
      if (currentRoute === LEARNINGS) {
         return (
            <AssignmentIconClipBoardVariant
               data-testid='learningWorkbookIcon'
               width={workbookIconDimensions}
               height={workbookIconDimensions}
            />
         )
      }
      if (isPublishedByUs) {
         return (
            <IDMWorkbookIcon
               data-testid='IDMWorkbookIcon'
               width={workbookIconDimensions}
               height={workbookIconDimensions}
            />
         )
      }
      if (isAssignmentWorkbook) {
         return (
            <WorkbookAssignmentIcon data-testid={'assignmentWorkbookIcon'} />
         )
      }
      if (isPinned) {
         return (
            <StarredWorkbookIcon
               data-testid={'pinnedWorkbookIcon'}
               width={workbookIconDimensions}
               height={workbookIconDimensions}
            />
         )
      }
      return (
         <WorkbookIcon
            data-testid={'workbookIcon'}
            width={workbookIconDimensions}
            height={workbookIconDimensions}
         />
      )
   }

   onDoubleClickWorkbook = (): void => {
      const { onDoubleClickWorkbook, id } = this.props
      onDoubleClickWorkbook(id)
   }

   renderTriggerIcon = (): ReactNode => {
      const { currentRoute } = this.props
      if (!(currentRoute === ASSIGNMENTS || currentRoute === LEARNINGS)) {
         if (isMobileDevice) {
            return (
               <MoreIconContainer
                  onClick={this.openWorkbookMenuContainerDrawer}
               >
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
      return null
   }

   renderPopOverMenu = (): ReactNode => {
      const { targetTestId, currentRoute } = this.props
      if (currentRoute === ASSIGNMENTS || currentRoute === LEARNINGS) {
         return null
      }
      return (
         <MenuContainer>
            <PopoverMenu
               renderPopoverTrigger={this.renderTriggerIcon()}
               renderPopoverContent={this.renderMenuContainer()}
               targetTestId={targetTestId}
            />
         </MenuContainer>
      )
   }

   renderMenuTrigger = () => {
      if (isMobileDevice) {
         return <MenuContainer>{this.renderTriggerIcon()}</MenuContainer>
      }
      return this.renderPopOverMenu()
   }

   renderMenuContainer = (): ReactNode => {
      const { isPinned, id, currentRoute } = this.props
      return (
         <WorkbookMenuContainer
            isPinned={isPinned}
            workbookId={id}
            onClickWorkbookMenuItem={this.onClickWorkbookMenuItem}
            currentRoute={currentRoute}
         />
      )
   }

   renderHeader = (): ReactNode => {
      const { name } = this.props
      return (
         <Header>
            <MenuItemHeadingIconWrapperInDrawer>
               {this.renderWorkbookIcon()}
            </MenuItemHeadingIconWrapperInDrawer>
            <WorkbookNameContainer>
               <HeaderWorkbookName>{name}</HeaderWorkbookName>
            </WorkbookNameContainer>
         </Header>
      )
   }

   renderWorkbookMenuContainerDrawer = (): ReactNode => {
      const { isVisibleWorkbookMenuContainer } = this
      if (isMobileDevice) {
         return (
            <BottomDrawerWithHeader
               isVisible={isVisibleWorkbookMenuContainer}
               closeDrawer={this.closeWorkbookMenuContainerDrawer}
               headerContent={this.renderHeader()}
            >
               {this.renderMenuContainer()}
            </BottomDrawerWithHeader>
         )
      }
      return null
   }

   render(): ReactNode {
      const { name, testId } = this.props
      return (
         <>
            <WorkBookWrapper
               onClick={this.onDoubleClickWorkbook} //TODO:need to change the onDoubleClick method name
               data-testid={testId}
            >
               <WorkbookDetailsContainer>
                  <IconWrapper>{this.renderWorkbookIcon()}</IconWrapper>
                  <WorkBookName data-testid={'workbookName'}>
                     {name}
                  </WorkBookName>
               </WorkbookDetailsContainer>
               {this.renderMenuTrigger()}
            </WorkBookWrapper>
            {this.renderWorkbookMenuContainerDrawer()}
         </>
      )
   }
}

export default WorkbookGridItem
