import * as React from 'react'

import Dropdown from '../Dropdown'

import {
   DropdownContainer,
   Link,
   DropDownText,
   DropDownItem
} from './styledComponents'

export interface DropDownItems {
   pageUrl?: string
   dropDownItemText: string
   target?: string
   onClick?: () => void
   isSelectedPage?: boolean
}

interface Props {
   renderDropDownElement: Function
   dropDownItems: DropDownItems[]
}

class DesktopDropDownMenuItem extends React.Component<Props> {
   getDropDownItem = (menuItem): React.ReactNode => {
      const {
         pageUrl,
         target,
         dropDownItemText,
         onClick,
         isSelectedPage
      } = menuItem

      if (onClick) {
         return (
            <DropDownItem
               onClick={onClick}
               key={dropDownItemText}
               data-testid={'menuItem'}
            >
               <DropDownText as='div' isSelectedPage={isSelectedPage}>
                  {dropDownItemText}
               </DropDownText>
            </DropDownItem>
         )
      }
      return (
         <DropDownItem key={dropDownItemText} data-testid={'menuItem'}>
            <Link href={pageUrl} target={target}>
               <DropDownText as='div'>{dropDownItemText}</DropDownText>
            </Link>
         </DropDownItem>
      )
   }

   render(): React.ReactNode {
      const { dropDownItems, renderDropDownElement } = this.props
      return (
         <Dropdown renderDropDownElement={renderDropDownElement}>
            <DropdownContainer>
               {dropDownItems.map(menuItem => this.getDropDownItem(menuItem))}
            </DropdownContainer>
         </Dropdown>
      )
   }
}

export default DesktopDropDownMenuItem
