import React, { Component, ReactNode } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import RightArrowIcon from '../../icons/RightArrowIcon'
import Colors from '../../themes/Colors'
import { isTabletDevice, isMobileDevice } from '../../utils/responsiveUtils'
import { BOTTOM_LEFT } from '../../constants/UIConstants'
import PopoverMenu from '../PopoverMenu'

import NormalFolderIcon from '../../icons/NormalFolderIcon'
import MoreIcon from '../../icons/MoreIcon'

import IconContainer from '../IconContainer'
import BottomDrawer from '../BottomDrawer'

import {
   BreadCrumbItemText,
   BreadCrumbsList,
   BreadCrumbItem,
   Separator,
   ListMenuContainer,
   ListMenuItem,
   MenuContainer,
   MenuItemName,
   Container,
   IconWrapper,
   MoreIconContainer
} from './styledComponents'

interface BreadCrumbItemProps {
   id: string
   name: string
}

interface BreadCrumbProps {
   crumbs: Array<BreadCrumbItemProps>
   onClickBreadCrumbItem: (id: string) => void
   selectedBreadCrumbId: string
}

@observer
class BreadCrumb extends Component<BreadCrumbProps> {
   @observable isVisibleMenuConatiner: boolean

   constructor(props) {
      super(props)
      this.isVisibleMenuConatiner = false
   }
   getSelectedBreadCrumbIndex = (selectedBreadCrumbId: string): number => {
      const { crumbs } = this.props
      return crumbs.findIndex(
         eachCrumb => eachCrumb.id === selectedBreadCrumbId
      )
   }

   getWidthAndHeight = (): number => {
      if (isMobileDevice) {
         return 28
      }
      return 20
   }

   listMenuItems = (): ReactNode => {
      const { crumbs, onClickBreadCrumbItem } = this.props
      let listMenuData
      if (isTabletDevice || isMobileDevice) {
         listMenuData = crumbs.slice(0, crumbs.length - 1)
      } else {
         listMenuData = crumbs.slice(0, crumbs.length - 2)
      }
      return (
         <ListMenuContainer>
            {listMenuData.map(item => (
               <ListMenuItem
                  key={item.id}
                  as='div'
                  onClick={() => onClickBreadCrumbItem(item.id)}
                  data-testid={'breadCrumbData'}
               >
                  <IconWrapper>
                     <NormalFolderIcon
                        width={this.getWidthAndHeight()}
                        height={this.getWidthAndHeight()}
                     />
                  </IconWrapper>
                  <MenuItemName>{item.name}</MenuItemName>
               </ListMenuItem>
            ))}
         </ListMenuContainer>
      )
   }

   getInitialBreadCrumbItemIndexAfterMenuItemsList = (): number => {
      const { crumbs } = this.props
      if ((isTabletDevice || isMobileDevice) && crumbs.length >= 2) {
         return crumbs.length - 1
      }
      return crumbs.length - 2
   }

   onClickCloseMenuContainer = (): void => {
      this.isVisibleMenuConatiner = false
   }
   onClickOpenMenuContainer = (): void => {
      this.isVisibleMenuConatiner = true
   }

   renderTrigger = (): React.ReactElement => {
      if (isMobileDevice) {
         return (
            <IconContainer>
               <MoreIconContainer onClick={this.onClickOpenMenuContainer}>
                  <MoreIcon />
               </MoreIconContainer>
            </IconContainer>
         )
      }
      return (
         <IconContainer>
            <MoreIcon />
         </IconContainer>
      )
   }

   renderMenuContainer = () => {
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
               renderPopoverContent={this.listMenuItems()}
               placement={BOTTOM_LEFT}
               renderPopoverTrigger={this.renderTrigger()}
            />
         </MenuContainer>
      )
   }

   renderBreadCrumbs = (): ReactNode => {
      const { crumbs } = this.props
      if (
         ((isTabletDevice || isMobileDevice) && crumbs.length >= 2) ||
         crumbs.length >= 4
      ) {
         return (
            <Container>
               {this.renderMenuContainer()}
               <Separator>
                  <RightArrowIcon fill={Colors.black} />
               </Separator>
               {this.generateBreadCrumbs(
                  crumbs.slice(
                     this.getInitialBreadCrumbItemIndexAfterMenuItemsList(),
                     crumbs.length
                  )
               )}
            </Container>
         )
      }
      return this.generateBreadCrumbs(crumbs)
   }

   generateBreadCrumbs = (crumbs): ReactNode => {
      const { onClickBreadCrumbItem } = this.props

      return crumbs.map((eachCrumb, index) => (
         <BreadCrumbItem key={eachCrumb.id}>
            <BreadCrumbItemText
               onClick={() => onClickBreadCrumbItem(eachCrumb.id)}
               data-testid={eachCrumb.name}
            >
               {eachCrumb.name}
            </BreadCrumbItemText>
            {index < crumbs.length - 1 ? (
               <Separator>
                  <RightArrowIcon fill={Colors.black} />
               </Separator>
            ) : (
               ``
            )}
         </BreadCrumbItem>
      ))
   }

   render(): ReactNode {
      return (
         <>
            <BreadCrumbsList>{this.renderBreadCrumbs()}</BreadCrumbsList>
            {isMobileDevice ? (
               <BottomDrawer
                  isVisible={this.isVisibleMenuConatiner}
                  closeDrawer={this.onClickCloseMenuContainer}
               >
                  {this.listMenuItems()}
               </BottomDrawer>
            ) : null}
         </>
      )
   }
}

export default BreadCrumb
