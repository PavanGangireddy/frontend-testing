import tw, { styled } from 'twin.macro'
import {
   Typo18BlueGreyTwoHKGroteskRegular,
   Typo24DarkSlateBlueHKGroteskMedium
} from '../../../Common/styleGuide/Typos'

export const Container = styled.div`
   ${tw`
        w-full flex flex-col md:flex-row px-16px md:px-32px mt-16px md:mt-0 rounded-16px bg-lightTan
    `}
`

export const MessageContainer = styled.div`
   ${tw`
        w-full md:w-1/2 flex flex-col my-16px md:my-48px
    `}
`

export const MessageHeader = styled(Typo24DarkSlateBlueHKGroteskMedium)`
   ${tw`
        text-16px md:text-24px
    `}
`

export const MessageDescription = styled(Typo18BlueGreyTwoHKGroteskRegular)`
   ${tw`
        text-14px md:text-18px mt-16px
    `}
`

export const ImageContainer = styled.div`
   ${tw`
        w-full md:w-1/2 flex justify-center md:justify-end
    `}
`
