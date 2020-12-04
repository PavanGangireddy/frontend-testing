import tw, { styled, css } from 'twin.macro'

import {
   Typo18SteelHKGroteskMedium,
   Typo14WhiteHKGroteskSemiBold
} from '../../../Common/styleGuide/Typos'
import Image from '../../../Common/components/Image'
import Button from '../../../Common/components/Button'

import { ContainerWithPurpleBackground } from '../common/styledComponents'

export const VerifyEmailContainer = styled.div`
   ${tw`flex  min-h-screen  justify-between box-border bg-whiteTwo`}
`

export const LeftSection = styled.div`
   ${tw`flex flex-col items-center flex-grow`}
`
export const RightSection = styled(ContainerWithPurpleBackground)`
   ${tw`flex flex-col items-center justify-center w-44.44 min-h-screen`}
`

export const SuccessIconWrapper = styled.div`
   ${tw`mb-30px`}
`
export const SuccessMessage = styled(Typo18SteelHKGroteskMedium)`
   ${tw` text-14px md:text-18px mt-8px md:mt-0 mb-0 md:mb-24px`}
`

export const LoginButton = styled(Button)`
   ${tw`bg-brightBlue w-147px md:w-256px h-40px mt-32px md:mt-24px rounded-4px focus:outline-none`}
`

export const LoginButtonText = styled(Typo14WhiteHKGroteskSemiBold)`
   ${tw`leading-1.71 no-underline`}
`

export const QuoteSection = styled.div`
   ${tw`sm:mb-21px md:mb-41px lg:mb-61px mt-40px ml-20px`}
`
export const ImageContainer = styled(Image)`
   ${tw`max-w-544px w-92.2 h-auto m-auto mb-40px`}
`
export const ImageWrapper = styled.div`
   ${tw`sm:min-h-36 lg:min-h-56 w-full `}
`

export const MobileLayoutHeaderCSS = css`
   ${tw`bg-whiteTwo`}
`

export const MainContainer = styled.div`
   ${tw`mt-96px md:mt-206px flex self-center md:self-auto`}
`
