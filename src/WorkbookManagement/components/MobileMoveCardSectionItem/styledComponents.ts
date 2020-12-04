import tw, { styled, css } from 'twin.macro'
import { CSSProperties } from 'react'

import { Typo12SteelHKGroteskSemiBold } from '../../../Common/styleGuide/Typos'

export const SectionItemContainer = styled.div`
   ${tw`
        flex justify-between items-center py-12px px-16px
    `}
   /* TODO: Need to update color in colors */
   &:hover {
      background-color: rgba(215, 223, 233, 0.5);
   }
   ${({ isActive }): CSSProperties =>
      isActive
         ? css`
              background-color: rgba(215, 223, 233, 0.5);
              pointer-events: none;
           `
         : css``}
`

export const SectionNameText = styled(Typo12SteelHKGroteskSemiBold)`
   ${tw`

    `}
`
