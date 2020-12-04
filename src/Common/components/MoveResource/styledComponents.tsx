import tw, { styled, css } from 'twin.macro'

import { customDevice } from '../../utils/MixinUtils'
import { Typo18WhiteHKGroteskMedium } from '../../styleGuide/Typos'

export const MoveResourceContainer = styled.div`
   ${tw`w-580px h-595px flex flex-col bg-white shadow-steel16 border-default border-solid border-lightBlueGrey rounded-4px relative `}
   ${customDevice(320, 767)} {
      ${tw`
         flex flex-col w-full h-screen rounded-none shadow-none border-none
      `}
   }
`

export const BodyContainer = styled.div`
   ${tw`flex flex-1 flex-col p-16px pl-24px pb-32px pr-32px`}
   ${customDevice(320, 767)} {
      ${tw`
         p-16px mb-32px
      `}
   }
`

export const NavBarLeftSection = styled.div`
   ${tw`
      w-1/6 h-full flex items-center justify-center
   `}
`

export const TitleContainer = styled.div`
   ${tw`
      w-4/6 h-full flex items-center justify-between
   `}
`

export const TitleText = styled(Typo18WhiteHKGroteskMedium)`
   ${tw`
      truncate
   `}
`
export const navBarCss = css`
   ${tw`p-0 static`}
`

export const MergeHeaderContainer = styled.div``
