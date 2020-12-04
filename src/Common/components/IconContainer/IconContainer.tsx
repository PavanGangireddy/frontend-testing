import React, { Component } from 'react'

import { Container } from './styledComponents'

interface IconContainerProps {
   containerCSS?: React.CSSProperties
   onClick?: Function
}
class IconContainer extends Component<IconContainerProps> {
   render() {
      const { children, containerCSS, onClick } = this.props
      return (
         <Container css={containerCSS} onClick={onClick}>
            {children}
         </Container>
      )
   }
}

export default IconContainer
