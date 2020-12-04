import React, { Component } from 'react'
import { Popover, Trigger, Target } from '@accessible/popover'
import onClickOutside from 'react-onclickoutside'

import MoreIcon from '../../icons/MoreIcon'

import {
   PopoverContainer,
   TriggerContainer,
   TargetContainer
} from './styledComponents'
import { PopoverMenuProps } from './types'

class PopoverMenu extends Component<PopoverMenuProps> {
   static defaultProps = {
      placement: 'bottomRight',
      on: 'click',
      renderPopoverTrigger: <MoreIcon />,
      triggerTestId: 'trigger',
      targetTestId: 'target',
      openStyle: {}
   }

   state = {
      open: false
   }

   handleClickOutside = () => {
      this.setState({ open: false })
   }

   togglePopoverMenu = (): void => {
      this.setState({
         open: !this.state.open
      })
   }

   render() {
      const {
         placement,
         on,
         renderPopoverContent,
         renderPopoverTrigger,
         triggerTestId,
         targetTestId,
         openStyle
      } = this.props

      return (
         <Popover
            repositionOnScroll
            repositionOnResize
            onChange={this.togglePopoverMenu}
            open={this.state.open}
         >
            <Trigger on={on}>
               <PopoverContainer>
                  <TriggerContainer data-testid={triggerTestId}>
                     {renderPopoverTrigger}
                  </TriggerContainer>
                  <Target placement={placement} openStyle={openStyle}>
                     <TargetContainer data-testid={targetTestId}>
                        {renderPopoverContent}
                     </TargetContainer>
                  </Target>
               </PopoverContainer>
            </Trigger>
         </Popover>
      )
   }
}

export default onClickOutside(PopoverMenu)
