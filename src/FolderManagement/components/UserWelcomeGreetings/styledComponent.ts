import tw, { styled } from 'twin.macro'

import {
   Typo18DarkBlueGreyHKGroteskMedium,
   Typo48DarkBlueGreyHKGroteskRegular
} from '../../../Common/styleGuide/Typos'
import Image from '../../../Common/components/Image'

export const GreetingsContainer = styled.div`
   ${tw`
        w-full md:w-auto md:min-h-265px flex justify-between rounded-16px bg-iceBlue py-16px px-24px md:p-8px
        mb-12px md:m-32px md:mb-48px
    `}
`

export const MessageContainer = styled.div`
   ${tw`
        md:my-12px md:ml-12px lg:mt-24px lg:ml-24px flex flex-col
    `}
`

// TODO: Need to update the font
export const MessageHeading = styled(Typo48DarkBlueGreyHKGroteskRegular)`
   ${tw`
        text-24px md:text-48px
    `}
`

export const MessageDescription = styled(Typo18DarkBlueGreyHKGroteskMedium)`
   ${tw`
        text-16px md:text-18px mt-8px w-full md:w-256px lg:w-428px
    `}
`

export const ImageContainer = styled.div`
   ${tw`
        hidden md:block
    `}
`

export const WelcomeImage = styled(Image)`
   ${tw`
        w-full h-full rounded-16px
    `}
`
