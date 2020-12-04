import React, { Component } from 'react'
import 'styled-components/macro'

import { LabelValueType } from '../../stores/types'

import { shapes, variants } from '../Button/constants'
import Tag from '../Tag'

import {
   TagGroupContainer,
   StyledButton,
   StyledPlusIcon
} from './styledComponents'

interface TagGroupProps {
   tagsList: Array<LabelValueType>
   onClickTag: Function
   onClickClose: Function
   onClickAdd: Function
   containerCSS?: React.CSSProperties
}

interface IconProps {
   width: string
   height: string
}

class TagGroup extends Component<TagGroupProps> {
   getIconProps = (): IconProps => ({
      width: '9',
      height: '9'
   })

   renderTags = (): React.ReactNode => {
      const { tagsList, onClickTag, onClickClose } = this.props
      return tagsList.map(tag => {
         const onClickTagText = (): void => onClickTag(tag.value)
         const onClickCloseTag = (): void => onClickClose(tag.value)
         return (
            <Tag
               tagName={tag.label}
               onClickClose={onClickCloseTag}
               onClickTagName={onClickTagText}
               key={tag.value}
            />
         )
      })
   }

   render(): React.ReactNode {
      const { onClickAdd, containerCSS } = this.props
      return (
         <TagGroupContainer css={containerCSS}>
            {this.renderTags()}
            <StyledButton
               shape={shapes.pill}
               variant={variants.secondary}
               onClick={onClickAdd}
               data-testid={'addButton'}
            >
               <StyledPlusIcon {...this.getIconProps()} />
            </StyledButton>
         </TagGroupContainer>
      )
   }
}

export default TagGroup
