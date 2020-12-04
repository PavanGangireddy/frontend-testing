import tw, { styled } from 'twin.macro'

import {
   Typo14WhiteHKGroteskSemiBold,
   Typo12SteelHKGroteskSemiBold,
   Typo14BrightBlueHKGroteskRegular
} from '../../../Common/styleGuide/Typos'
import TextInput from '../../../Common/components/TextInput'
import Button from '../../../Common/components/Button'
import Image from '../../../Common/components/Image'

import { ContainerWithPurpleBackground } from '../common/styledComponents'

export const LoginFormContainer = styled.div`
   ${tw`flex flex-1 justify-between box-border md:min-h-screen bg-whiteTwo`}
`

export const SubContainer = styled(LoginFormContainer)`
   ${tw`flex  md:justify-center md:items-center px-24px md:px-0`}
`

export const InputContainer = styled.div`
   ${tw`flex flex-col justify-center`}
`
export const Label = styled(Typo12SteelHKGroteskSemiBold)`
   ${tw`flex self-start uppercase leading-snug mt-20px tracking-wide text-steel`}
`

export const InputBox = styled(TextInput)`
   ${tw`pl-8px mt-8px rounded-sm`}
`

export const UpdatePasswordButton = styled(Button)`
   ${tw`bg-brightBlue w-full h-40px mt-24px md:mt-40px rounded-4px`}
`

export const ButtonTextTypo = styled(Typo14WhiteHKGroteskSemiBold)`
   ${tw`leading-relaxed`}
`
export const Footer = styled.div`
   ${tw`flex mt-8px justify-end`}
`

export const ReturnToLogin = styled(Typo14BrightBlueHKGroteskRegular)`
   ${tw`cursor-pointer leading-24px`}
`
export const LeftSection = styled.div`
   ${tw`flex flex-col items-center flex-grow`}
`

export const RightSection = styled(ContainerWithPurpleBackground)`
   ${tw`flex flex-col items-center justify-center w-44.44 min-h-screen `}
`
export const QuoteSection = styled.div`
   ${tw` sm:mb-21px md:mb-41px lg:mb-61px mt-40px ml-20px`}
`

export const ResetPasswordImage = styled(Image)`
   ${tw`max-w-544px w-92.2 h-auto m-auto mb-40px`}
`
export const ImageWrapper = styled.div`
   ${tw`sm:min-h-31.3 lg:min-h-41.4 w-full `}
`
