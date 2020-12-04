import React, { Component, ReactNode } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import Colors from '../../../../Common/themes/Colors'

import { DELETE_FOREVER } from '../../../constants/UIConstants'

import { MenuItemWrapper, IconWrapper, Label } from './styledComponents'

export interface MenuItemProps {
   icon: any
   label: string
   value: string
   id: string
   onClickMenuItem: (id: string, clickedItem: string) => void
   menuItemTestId?: string
   hiddenInMobile?: boolean
}

@observer
class MenuItem extends Component<MenuItemProps> {
   @observable isHovered: boolean

   static defaultProps = {
      menuItemTestId: 'folderOrWorkbooMenuItem'
   }

   constructor(props) {
      super(props)
      this.isHovered = false
   }
   onClickMenuItem = (): void => {
      const { id, onClickMenuItem, value } = this.props
      onClickMenuItem(id, value)
   }

   onMouseEnter = () => {
      this.isHovered = true
   }

   onMouseLeave = () => {
      this.isHovered = false
   }

   getFillColorForIcon = (): string => {
      const { value } = this.props
      if (this.isHovered) {
         if (value === DELETE_FOREVER) {
            return Colors.cherry
         }
         return Colors.blueTwo
      }
      return Colors.steel
   }

   render(): ReactNode {
      const { icon: Icon, label, menuItemTestId, hiddenInMobile } = this.props
      return (
         <MenuItemWrapper
            onClick={this.onClickMenuItem}
            label={label}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            data-testid={menuItemTestId}
            hiddenInMobile={hiddenInMobile}
         >
            <IconWrapper>
               <Icon fill={this.getFillColorForIcon()} />
            </IconWrapper>
            <Label label={label}>{label}</Label>
         </MenuItemWrapper>
      )
   }
}

export default MenuItem
