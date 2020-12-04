import tw, { styled } from 'twin.macro'

import { Typo12DarkBlueGreyHKGroteskMedium } from '../../Common/styleGuide/Typos'
import { mobile } from '../../Common/utils/MixinUtils'

export const LoaderContainer = styled.div`
   ${tw`w-full h-full flex items-center justify-center`}
`
export const Container = styled.div`
   ${tw`bg-whiteTwo`}
   min-height:calc(100vh - 80px);
   ${({ isEmptyTrash }) => isEmptyTrash && tw`h-full`}
`
export const Header = styled.div`
   ${tw`w-full flex items-center`}
`
export const Name = styled(Typo12DarkBlueGreyHKGroteskMedium)``
export const IconWrapper = styled.div`
   ${mobile} {
      ${tw`mr-16px`}
   }
`
export const NameContainer = styled.div`
   ${mobile} {
      ${tw`flex items-center flex-grow`}
   }
`
export const EmptyTrashHeader = styled(Typo12DarkBlueGreyHKGroteskMedium)`
   ${tw`uppercase`}
`
export const PersonalProjectContainer = styled.div`
   ${tw`bg-whiteTwo flex`}
   min-height:calc(100vh - 80px);
   ${mobile} {
      min-height: calc(100vh - 56px);
   }
`

export const TrashHeaderWrapper = styled.div`
   ${tw`
      pt-16px md:pt-32px pl-16px md:pl-32px
   `}
`

export const HomeLoaderContainer = styled.div`
   ${tw`
      w-full flex items-center justify-center
   `}
   height: calc(100vh - 56px);
`
