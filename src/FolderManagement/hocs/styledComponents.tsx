import tw, { styled } from 'twin.macro'

import {
   Typo15WhiteHKGroteskRegular,
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskMedium
} from '../../Common/styleGuide/Typos'
import Button from '../../Common/components/Button'
import { customDevice, mobile } from '../../Common/utils/MixinUtils'

export const UserName = styled(Typo15WhiteHKGroteskRegular)`
   ${tw`pb-4px leading-1.47 truncate sm:max-w-50px lg:max-w-178px`}
   ${customDevice(768, 1024)} {
      ${tw`max-w-50px`}
   }
`
export const RetryButton = styled(Button)`
   ${tw`bg-red-600 border border-solid border-red-600 w-50px h-30px flex justify-center items-center mr-16px mb-4px`}
`
export const RetryButtonText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   letter-spacing: normal;
   line-height: 1.71;
`
export const LoaderContainer = styled.div`
   ${tw`w-50px h-30px flex justify-center items-center`}
`
export const Header = styled.div`
   ${tw`w-full flex items-center`}
`
export const Name = styled(Typo14DarkBlueGreyHKGroteskMedium)``
export const IconWrapper = styled.div`
   ${mobile} {
      ${tw`mr-16px`}
   }
`
export const Container = styled.div`
   ${mobile} {
      ${tw`flex items-center flex-grow`}
   }
`
