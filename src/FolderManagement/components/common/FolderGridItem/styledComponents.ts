import tw, { styled, TwStyle } from 'twin.macro'
import { projectCardMetrics } from '../../../../Common/constants/MetricsConstants'

import {
   Typo14DarkBlueGreyHKGroteskMedium,
   Typo18DarkSlateBlueHKGroteskMedium
} from '../../../../Common/styleGuide/Typos'
import {
   minDeviceWidth,
   mobile,
   customDevice
} from '../../../../Common/utils/MixinUtils'

export const FolderGridItemContainer = styled.div`
   ${tw`
      max-w-256px md:h-auto flex border border-solid border-steel40 rounded-16px
      md:pl-24px md:pr-16px bg-white
      relative
    `}
    ${({ isLocked }): TwStyle =>
       isLocked
          ? tw`cursor-not-allowed`
          : tw` cursor-pointer hover:bg-paleGreySix hover:border-blueTwo`}
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
   ${({ isProject }) =>
      isProject ? tw`pt-8px pb-16px md:pb-24px ` : tw`py-16px md:pb-24px `}
`

export const MenuContainer = styled.div`
   ${tw`absolute top-8px right-8px md:top-16px md:right-16px`}
`

export const FolderDetailsContainer = styled.div`
   ${tw`
      flex flex-col self-center md:self-start w-full
   `}
`

export const FolderName = styled(Typo18DarkSlateBlueHKGroteskMedium)`
   ${tw`
      self-center md:self-start text-center md:text-left mt-8px md:mt-16px select-none truncate whitespace-normal
      text-12px md:text-18px
   `}
   ${({ isProject }) =>
      isProject ? tw`mt-8px md:mt-16px ` : tw`mt-16px md:mt-16px `}
`

export const IconWrapper = styled.div`
   ${tw`
      self-center md:self-start
   `}
`

export const MenuItemHeadingIconWrapperInDrawer = styled(IconWrapper)`
   ${mobile} {
      ${tw`mr-16px`}
   }
`

export const MoreIconContainer = styled.div`
   transform: rotate(90deg);
`

export const Header = styled.div`
   ${tw`w-full flex items-center`}
`
export const HeaderFolderName = styled(Typo14DarkBlueGreyHKGroteskMedium)``

export const FolderNameContainer = styled.div`
   ${mobile} {
      ${tw`flex items-center flex-grow`}
   }
`
export const UnStarredFolderGridItemContainer = styled(FolderGridItemContainer)`
${tw`flex-col items-start`}
   min-height: ${projectCardMetrics.lgHeight};
   min-width: ${projectCardMetrics.lgWidth};
   margin: ${projectCardMetrics.margin};
   ${mobile} {
      ${tw`items-center justify-center`}
      min-height: ${projectCardMetrics.smHeight};
      min-width:44%;
      margin: ${projectCardMetrics.margin};
   }
`
