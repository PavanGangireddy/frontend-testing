import tw, { styled, TwStyle } from 'twin.macro'

import { Typo12Steel60HKGroteskSemiBold } from '../../styleGuide/Typos'

export const TabBarContainer = styled.div`
   ${tw`w-full flex border-0 border-b border-solid border-darkBlueGrey16 box-border `}
`

export const TabContainer = styled.div`
   ${tw`
      flex items-center border-0 border-b border-solid border-brightBlue pb-8px mr-32px cursor-pointer 
   `}
   ${({ isActive }): TwStyle =>
      isActive ? tw`border-brightBlue` : tw`border-transparent`}
`

export const IconContainer = styled.div`
   ${tw`mr-12px`}
`

export const TabTextContainer = styled(
   Typo12Steel60HKGroteskSemiBold
)(({ isActive }) => [
   tw`leading-1.33  tracking-0.12px uppercase select-none`,
   isActive && tw`border-brightBlue text-darkBlueGrey`
])
