import tw, { styled } from 'twin.macro'

import {
   Typo14WhiteHKGroteskSemiBold,
   Typo12SteelHKGroteskSemiBold,
   Typo14BrightBlueHKGroteskRegular,
   Typo16NeonRedHKGroteskMedium,
   Typo14NeonRedHKGroteskRegular
} from '../../../Common/styleGuide/Typos'
import TextInput from '../../../Common/components/TextInput'
import Button from '../../../Common/components/Button'
import Image from '../../../Common/components/Image'

import { ContainerWithPurpleBackground } from '../common/styledComponents'

export const LinkExpiredContainer = styled.div`
   ${tw`flex  min-h-screen flex-1 justify-between box-border bg-whiteTwo`}
`

export const Header = styled.div`
   ${tw`flex w-full justify-center items-center`}
`

export const ErrorContainer = styled.div`
   ${tw`flex items-center justify-center w-full md:mx-30px 
    lg:max-w-586px h-80px rounded-4px border border-solid border-neonRed bg-neonRed05 pl-24px pr-17px mt-56px md:mt-114px`}
`

export const LinkExpired = styled(Typo16NeonRedHKGroteskMedium)`
   ${tw`text-14px md:text-16px`}
`

export const ErrorIconDiv = styled.div`
   ${tw`mr-20px`}
`

export const ErrorDataContainer = styled.div`
   ${tw`flex flex-col flex-1`}
`

export const Instruction = styled(Typo14NeonRedHKGroteskRegular)`
   ${tw`text-red-600 text-12px md:text-14px`}
`

export const LinkExpiredBody = styled.div`
   ${tw`flex flex-1 justify-between`}
`

export const SubContainer = styled.div`
   ${tw`flex justify-center md:items-center px-24px md:px-0 `}
`

export const InputContainer = styled.div`
   ${tw`flex flex-col justify-center `}
`

export const Label = styled(Typo12SteelHKGroteskSemiBold)`
   ${tw`flex self-start uppercase leading-snug tracking-wide`}
`

export const InputBox = styled(TextInput)`
   ${tw`pl-8px mt-8px rounded-sm`}
`

export const SendButton = styled(Button)`
   ${tw`bg-brightBlue w-full h-40px mt-24px md:mt-40px rounded-4px`}
`

export const SendText = styled(Typo14WhiteHKGroteskSemiBold)`
   ${tw`leading-relaxed`}
`
export const Footer = styled.div`
   ${tw`flex mt-8px justify-center`}
`

export const ReturnToLogin = styled(Typo14BrightBlueHKGroteskRegular)`
   ${tw`cursor-pointer leading-24px`}
`

export const LeftSection = styled.div`
   ${tw`flex flex-col items-center flex-grow`}
`

export const RightSection = styled(ContainerWithPurpleBackground)`
   ${tw`flex flex-col items-center justify-center sm:w-55 lg:w-44.44 min-h-screen `}
`
export const QuoteSection = styled.div`
   ${tw` sm:mb-21px md:mb-41px lg:mb-61px mt-40px ml-20px`}
`
export const Container = styled.div`
   ${tw`flex flex-col flex-grow justify-center`}
`

export const ImageContainer = styled(Image)`
   ${tw`max-w-544px w-92.2 h-auto m-auto mb-40px`}
`

export const ImageWrapper = styled.div`
   ${tw`sm:min-h-24.8 lg:min-h-34.8 w-full `}
`

export const ErrorWrapper = styled.div`
   ${tw`px-16px pb-16px md:p-0`}
`
