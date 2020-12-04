import tw, { styled, TwStyle, css } from 'twin.macro'

import Card from '../../../Common/components/Card'
import {
   Typo16DarkBlueGreyHKGroteskRegular,
   Typo12DarkBlueGreyHKGroteskSemiBold
} from '../../../Common/styleGuide/Typos'
import { mobile } from '../../../Common/utils/MixinUtils'
import {
   WRONGLY_ANSWERED_CARD,
   CORRECT_CARD
} from '../../constants/UIConstants'

export const InvalidCardStyles = css`
   border-style: solid;
   border-width: 4px;
   border-color: #ff0b37;
   border-radius: 8px;
`

export const InvalidCardErrorIconContainer = styled.div`
   ${tw`
   absolute bg-white rounded-full
   `}
   ${({ cardStyleType }) =>
      cardStyleType === CORRECT_CARD
         ? tw`-top-8px -right-8px`
         : tw`-top-10px -right-10px`}
`

export const CardContainer = styled(Card)`
   ${({ isSelected }): TwStyle => (isSelected ? tw`border-black` : tw``)}
   ${tw`
        flex items-center shadow-none mx-4px p-8px border border-solid
        rounded-8px bg-white cursor-pointer relative 
    `}
   background: ${({ label }) => (label ? label : tw``)};
   max-width: ${({ maxWidth }) => maxWidth};
   width:${({ width }) => width};
   ${({
      canSelectCardForMergingInMobileOrTablet,
      isSelected,
      cardStyleType
   }): TwStyle => {
      if (canSelectCardForMergingInMobileOrTablet) {
         if (isSelected) {
            return tw`border-black`
         }
         return tw`border-black border-dashed`
      } else if (isSelected) {
         return tw`border-black`
      } else if (cardStyleType === WRONGLY_ANSWERED_CARD) {
         return tw`border-neonRed border-4 rounded-8px`
      } else if (cardStyleType === CORRECT_CARD) {
         return tw`border-greenishTeal border-dashed border-4 rounded-8px`
      }
      return tw``
   }}
   opacity: ${({ cardStyleType }) =>
      cardStyleType === CORRECT_CARD ? 0.5 : 1};
   background-clip:${({ cardStyleType }) =>
      cardStyleType === CORRECT_CARD && 'padding-box'}

`

export const CardName = styled(Typo16DarkBlueGreyHKGroteskRegular)`
   ${({ hasNotesIcon }): TwStyle => (hasNotesIcon ? tw`mr-8px` : tw`mr-0`)}
   ${tw`truncate leading-1.5`}
   color: ${({ textColor }): string => textColor};
   ${mobile} {
      ${tw`text-14px`}
   }
`

export const IconContainer = styled.div`
   ${({ hasIcon }): TwStyle => (hasIcon ? tw`mr-4px` : tw`mr-0`)}
`

export const CardSelectBox = styled.div`
   ${({ isSelected }): TwStyle =>
      isSelected ? tw`border-black` : tw`border-battleshipGrey`}
   ${tw`
      flex items-center justify-center w-16px h-16px rounded-full ml-4px border border-solid
       absolute -top-5px -right-5px bg-black
   `}
`

export const PriorityWrapper = styled.div``

export const MoveCardHeader = styled.div`
   ${tw`flex items-center justify-between w-full px-24px h-65px border-0 border-b border-solid border-lightBlueGrey`}
`

export const MoveCardHeaderTitle = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
   ${tw`uppercase`}
`

export const CloseIconContainer = styled.div`
   ${tw`cursor-pointer`}
`
