import React, { Component, ReactNode } from 'react'
import { storiesOf } from '@storybook/react'

import Hover from '.'

interface TextDisplayOnHoverProps {
   isHovered: boolean
}
class TextDisplayOnHover extends Component<TextDisplayOnHoverProps> {
   renderHoverText = (): ReactNode => {
      const { isHovered } = this.props
      if (isHovered) {
         return <div>hello world</div>
      }
      return null
   }

   render(): ReactNode {
      return (
         <>
            <div>Hover me!</div>
            {this.renderHoverText()}
         </>
      )
   }
}

storiesOf('RenderProps/Hover', module).add('Hover', () => (
   <Hover render={isHovered => <TextDisplayOnHover isHovered={isHovered} />} />
))
