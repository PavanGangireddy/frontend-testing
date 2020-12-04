import React, { Component, ReactNode } from 'react'

import MenuItem from '../MenuItem/MenuItem'

import { MenuWrapper } from './styledComponents'

export interface MenuItemtype {
   icon: React.ComponentType
   label: string
   value: string
   id: string
}

interface MenuProps {
   menuData: Array<MenuItemtype>
   id: string
   onClickMenuItem: (id: string, clickedItem: string) => void
   menuItemTestId?: string
}

class Menu extends Component<MenuProps> {
   static defaultProps = {
      menuItemTestId: 'folderMenuItem'
   }
   renderMenuItems = (): ReactNode => {
      const { menuData, id, onClickMenuItem, menuItemTestId } = this.props
      return menuData.map(item => (
         <MenuItem
            key={item.id}
            {...item}
            id={id}
            onClickMenuItem={onClickMenuItem}
            menuItemTestId={menuItemTestId}
         />
      ))
   }
   render() {
      return <MenuWrapper>{this.renderMenuItems()}</MenuWrapper>
   }
}

export default Menu
