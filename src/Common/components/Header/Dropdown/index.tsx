import * as React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import {
   DropDownContainer,
   DropDownContentContainer,
   DropDownView
} from './styledComponents'

interface Props {
   renderDropDownElement: Function
}

@observer
class Dropdown extends React.Component<Props> {
   @observable onHovered

   constructor(props: Props) {
      super(props)
      this.onHovered = false
   }

   showHoverDropDown = (): void => {
      this.onHovered = true
   }

   hideHoverDropDown = (): void => {
      this.onHovered = false
   }
   render() {
      const { renderDropDownElement, children } = this.props
      return (
         <DropDownView>
            <DropDownContainer
               onMouseEnter={this.showHoverDropDown}
               onMouseLeave={this.hideHoverDropDown}
               isHovered={this.onHovered}
            >
               {renderDropDownElement()}
               <DropDownContentContainer isHovered={this.onHovered}>
                  {children}
               </DropDownContentContainer>
            </DropDownContainer>
         </DropDownView>
      )
   }
}

export default Dropdown
