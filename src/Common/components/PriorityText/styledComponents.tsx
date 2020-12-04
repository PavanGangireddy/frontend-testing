import tw, { styled, TwStyle } from 'twin.macro'

import { Typo12WhiteHKGroteskMedium } from '../../styleGuide/Typos'

export const PriorityContainer = styled.div`
   ${tw`h-16px w-16px flex flex-row justify-center mx-2px items-center rounded-full bg-darkBlueGrey cursor-pointer`}
   ${({ isSelected }): TwStyle =>
      isSelected && tw`h-24px w-24px border-dashed border-white border-default`}
`

export const StyledPriorityText = styled(Typo12WhiteHKGroteskMedium)`
   user-select: none;
   ${({ isSelected }): TwStyle => isSelected && tw`text-14px`}
`
