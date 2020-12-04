import React, { ReactNode } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import { HoverWrapper } from './styledComponents'

interface HoverProps {
   render: (isHovered: boolean) => React.ReactNode
}

@observer
class Hover extends React.Component<HoverProps> {
   @observable isHovered: boolean

   constructor(props) {
      super(props)
      this.isHovered = false
   }

   onMouseEnter = (): void => {
      this.isHovered = true
   }

   onMouseLeave = (): void => {
      this.isHovered = false
   }

   render(): ReactNode {
      return (
         <HoverWrapper
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
         >
            {this.props.render(this.isHovered)}
         </HoverWrapper>
      )
   }
}

export default Hover
