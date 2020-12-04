import tw, { styled, TwStyle } from 'twin.macro'
import { API_SUCCESS } from '@ib/api-constants'

import { customDevice, mobile } from '../../utils/MixinUtils'
import { Typo18WhiteHKGroteskRegular } from '../../styleGuide/Typos'

interface LayoutContainerProps {
   isCollapsed: boolean
   shouldDisplayViewInChromeMessageBanner: boolean
}

export const LayoutAndSideBarContainer = styled.div`
   ${tw`
        flex bg-whiteTwo
    `}
   ${mobile} {
      ${tw`flex-col h-screen`}
   }
`

export const SideBarContainer = styled.div`
   ${tw`
        h-screen
    `}
`

export const LayoutContainer = styled.div`
${tw`lg:ml-256px`}
   ${(props: LayoutContainerProps): TwStyle =>
      props.shouldDisplayViewInChromeMessageBanner ? tw`mt-80px` : tw`mt-0px`}

   ${customDevice(768, 1024)} {
      ${(props: LayoutContainerProps): TwStyle =>
         props.isCollapsed ? tw`ml-20` : tw`ml-234px`}
   }
   ${tw`
      overflow-auto transition-all duration-300 ease-in-out w-full
   `}

   ${mobile} {
      ${(props: LayoutContainerProps): TwStyle =>
         props.shouldDisplayViewInChromeMessageBanner
            ? tw`mt-122px`
            : tw`mt-56px`}
   }
   ${customDevice(416, 767)}{
      ${(props): TwStyle =>
         props.shouldDisplayViewInChromeMessageBanner
            ? tw`mt-104px`
            : tw`mt-56px`}
   }

`
export const LeftEnhancerContainer = styled.div`
   ${tw`py-2px `}
   ${({ shouldDisableClick }): TwStyle =>
      shouldDisableClick !== API_SUCCESS
         ? tw`pointer-events-none `
         : tw`pointer-events-auto`}
`

export const RightEnhancerContainer = styled.div`
   ${tw`w-20 h-full flex justify-center items-center`}
`

export const MainContentContainer = styled.div`
   ${tw`flex flex-1 h-full items-center justify-center`}
`

export const NavBarTitle = styled(Typo18WhiteHKGroteskRegular)``
