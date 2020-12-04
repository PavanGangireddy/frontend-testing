import tw, { styled, TwStyle } from 'twin.macro'

import { customDevice } from '../../utils/MixinUtils'

export const MobileResponsiveContainer = styled.div`
   ${tw`p-16px`}
`

export const MobileNavBarContainer = styled(MobileResponsiveContainer)`
   ${tw`flex w-full h-56px bg-darkBlueGrey items-center fixed z-50 top-0 left-0`};
   ${props => props.css}
   ${(props): TwStyle =>
      props.shouldDisplayViewInChromeMessageBanner ? tw`mt-66px` : tw`mt-0px`}
   ${customDevice(416, 767)}{
      ${(props): TwStyle =>
         props.shouldDisplayViewInChromeMessageBanner
            ? tw`mt-48px`
            : tw`mt-0px`}
   }
`
