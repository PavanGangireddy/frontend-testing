import tw, { styled, css } from 'twin.macro'

import {
   Typo16DarkSlateBlueHKGroteskMedium,
   Typo14DarkBlueGreyHKGroteskMedium
} from '../../../../Common/styleGuide/Typos'
import {
   minDeviceWidth,
   mobile,
   customDevice
} from '../../../../Common/utils/MixinUtils'

export const WorkBookWrapper = styled.div`
   ${tw`
      max-w-256px md:h-auto flex border border-solid border-steel40 rounded-16px
      md:pl-24px py-16px md:pb-24px md:pr-16px bg-white cursor-pointer hover:bg-paleGreySix
      hover:border-blueTwo relative
    `}
   ${mobile} {
      width: 44%;
      ${tw`mt-16px mr-16px`}
   }
   ${customDevice(768, 1023)} {
      width: 47%;
      ${tw`mt-16px mr-16px`}
   }
   ${minDeviceWidth(1024)} {
      width: 21.5%;
      ${tw`mt-32px mr-32px`}
   }
`

export const WorkbookDetailsContainer = styled.div`
   ${tw`
      flex flex-col self-center md:self-start w-full
   `}
`
export const IconWrapper = styled.div`
   ${tw`h-48px self-center md:self-start`}
   ${mobile} {
      ${tw`max-h-32px max-w-32px `}
   }
`

export const MenuItemHeadingIconWrapperInDrawer = styled(IconWrapper)`
   ${mobile} {
      ${tw`mr-16px`}
   }
`

export const WorkBookName = styled(Typo16DarkSlateBlueHKGroteskMedium)`
   ${tw`
      self-center md:self-start text-center md:text-left mt-16px select-none truncate whitespace-normal
      text-12px md:text-18px
   `}
`

export const MenuWrapper = styled.div`
   ${minDeviceWidth(1199)} {
      ${tw`
        block
    `}
   }
   ${mobile} {
      ${tw`ml-auto`}
   }
`

export const MenuContainer = styled.div`
   ${tw`absolute top-8px right-8px md:top-16px md:right-16px`}
`

export const MoreIconContainer = styled.div`
   transform: rotate(90deg);
`

export const ContainerCSS = css`
   transform: rotate(90deg);
`

export const Header = styled.div`
   ${tw`w-full flex items-center`}
`

export const HeaderWorkbookName = styled(Typo14DarkBlueGreyHKGroteskMedium)``

export const WorkbookNameContainer = styled.div`
   ${mobile} {
      ${tw`flex items-center flex-grow`}
   }
`
