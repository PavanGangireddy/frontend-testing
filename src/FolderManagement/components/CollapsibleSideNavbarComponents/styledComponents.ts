import tw, { styled } from 'twin.macro'

import {
   Typo13BrightBlueHKGroteskRegular,
   Typo16WhiteHKGroteskMedium,
   Typo14LightBlueGreyHKGroteskRegular,
   Typo14BrightBlueHKGroteskSemiBold
} from '../../../Common/styleGuide/Typos'
import Image from '../../../Common/components/Image'
import { mobile, tablet } from '../../../Common/utils/MixinUtils'
import { isTabletDevice } from '../../../Common/utils/responsiveUtils'

export const UserProfileLayoutContainer = styled.div`
   ${tw`flex px-32px flex-col`}
`

export const AvatarContainer = styled.div`
   ${tw`mb-16px `}
`

export const UserProfilePic = styled(Image)`
   ${tw`h-35px object-contain mr-16px `}
`

export const ProfilePicInCollapsedSideNav = styled(UserProfilePic)`
   ${tw`mr-0`}
`

export const UserNameAndArrowContainer = styled.div`
   ${tw`flex justify-between items-center w-full focus:outline-none`}
`

export const UserLearningPointsText = styled(Typo14BrightBlueHKGroteskSemiBold)`
   ${tw`mt-8px`}
`

export const LogoutText = styled(Typo13BrightBlueHKGroteskRegular)`
   ${tw`leading-1.46 cursor-pointer whitespace-no-wrap w-50px`}
`

export const LogoAndMenuItemsContainer = styled.div`
   ${tw`flex flex-col`}
`

export const LogoContainer = styled.div`
   ${tw`mb-52px pl-32px flex items-center`}
   ${mobile} {
      ${tw`mb-30px`}
   }
   ${tablet} {
      ${tw`mb-30px`}
   }
   @media (max-height: 720px) {
      ${tw`mb-48px`}
   }
`

export const MenuItemWithIconContainer = styled.div`
   ${tw`flex items-center my-2px py-12px md:py-14px cursor-pointer hover:bg-blueTwo02`}
   ${mobile} {
      ${({ hiddenInMobile }) => (hiddenInMobile ? tw`hidden` : tw`flex`)}
   }
   @media (max-height: 720px) {
      ${tw`my-0 py-8px`}
   }
   ${({ isActive }) => (isActive ? tw`bg-blueTwo02` : tw`bg-transparent`)}
   ${({ isActive }) =>
      isActive
         ? tw` border-0 border-l-6 border-solid border-brightBlue`
         : tw`border-0 border-l-6 border-solid border-transparent`}
   ${isTabletDevice && tw`py-6px my-2px`}
`

export const IconContainer = styled.div`
   ${tw`flex items-center pl-26px pr-16px`}
`

export const MenuText = styled(Typo14LightBlueGreyHKGroteskRegular)`
   ${tw`leading-1.71 whitespace-no-wrap select-none`}
   ${({ isActive }) => isActive && tw`text-white font-semibold`}
`

export const MenuItemsContainer = styled.div`
   ${tw`flex flex-col`}
`

export const CollapsedHeaderIBHubsIconContainer = styled.div`
   ${tw`flex items-center justify-center mt-8px py-8px `}
`

export const CollapsedHeaderIconContainer = styled.div`
   ${tw`flex items-center justify-center mt-8px mx-21px p-10px rounded-full cursor-pointer hover:bg-brightBlue`}
`

export const CollapsedFooterIconContainer = styled.div`
   ${tw`flex items-center justify-center mt-8px py-8px `}
`
export const UserName = styled(Typo16WhiteHKGroteskMedium)`
   ${tw`leading-1.47 truncate max-w-178px`}
`
