import tw, { styled, TwStyle, css } from 'twin.macro'

import {
   Typo14DarkBlueGreyHKGroteskRegular,
   Typo14BrightBlueHKGroteskRegular,
   Typo14SteelHKGroteskRegular,
   Typo14NeonRedHKGroteskRegular
} from '../../../Common/styleGuide/Typos'
import Image from '../../../Common/components/Image'

import { ContainerWithPurpleBackground } from '../common/styledComponents'

export const Container = styled.div`
   ${tw`
        flex min-h-screen
    `}
`

export const LeftSection = styled.div`
   ${tw`
        w-7/12 bg-whiteTwo relative flex flex-col items-center justify-center flex-grow
    `}
`

export const VerifyEmailContainer = styled.div`
   ${tw`
        w-245px flex flex-col items-center self-center mt-96px md:mt-0
    `}
`

export const EmailSentMessage = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw`
        mt-24px mx-8px text-center
    `}
`

export const ReceiveMailAgain = styled(Typo14SteelHKGroteskRegular)`
   ${tw`
        self-center mt-48px md:mt-84px
    `}
`

export const ResendLinkLabel = styled(Typo14SteelHKGroteskRegular)`
   ${tw`
        self-center md:mt-84px
    `}
`

export const Link = styled(Typo14BrightBlueHKGroteskRegular)`
   ${({ isDisabled }): TwStyle =>
      isDisabled ? tw`cursor-not-allowed` : tw`cursor-pointer hover:underline`}
   ${tw`
        text-brightBlue
    `}
`

export const RightSection = styled(ContainerWithPurpleBackground)`
   ${tw`
        w-5/12  flex flex-col
    `}
`

export const EmailNotificationContainer = styled.div`
   ${({ isSuccess }): TwStyle =>
      isSuccess ? tw`border-brightBlue` : tw`border-neonRed`}
   ${tw`
        flex items-center mt-84px py-16px px-24px border border-solid rounded-4px
    `}
`

export const SuccessTickContainer = styled.div`
   ${tw`
        w-24px h-24px rounded-full bg-brightBlue flex items-center justify-center
    `}
`

export const SuccessNotificationText = styled(Typo14BrightBlueHKGroteskRegular)`
   ${tw`
        mx-16px
    `}
`

export const FailureNotificationText = styled(Typo14NeonRedHKGroteskRegular)`
   ${tw`
        mx-16px
    `}
`

export const CloseButton = styled.button`
   ${tw`
        focus:outline-none border-none bg-transparent cursor-pointer
    `}
`
export const QuoteSection = styled.div`
   ${tw`sm:mb-50px md:mb-70px lg:mb-90px mt-40px ml-20px`}
`
export const ImageContainer = styled(Image)`
   ${tw`max-w-544px w-92.2 h-auto m-auto mb-40px`}
`
export const ImageWrapper = styled.div`
   ${tw` sm:min-h-36 lg:min-h-56 w-full `}
`

export const MobileLayoutHeaderCSS = css`
   ${tw`bg-whiteTwo`}
`
