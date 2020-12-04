import React, { Component } from 'react'
import 'styled-components/macro'

import Colors from '../../themes/Colors'

import { TagContainer, TagText, StyledCloseIcon } from './styledComponents'

interface TagProps {
   tagName: string
   onClickTagName: Function
   onClickClose: Function
   containerCSS?: React.CSSProperties
}

class Tag extends Component<TagProps> {
   getIconProps = () => ({
      width: 9.5,
      height: 9.5,
      fill: Colors.darkBlueGrey
   })

   render(): React.ReactNode {
      const { tagName, onClickTagName, onClickClose, containerCSS } = this.props
      return (
         <TagContainer css={containerCSS}>
            <TagText onClick={onClickTagName}>{tagName}</TagText>
            <StyledCloseIcon
               onClick={onClickClose}
               {...this.getIconProps()}
               data-testid={`closeIcon-${tagName}`}
            />
         </TagContainer>
      )
   }
}

export default Tag
