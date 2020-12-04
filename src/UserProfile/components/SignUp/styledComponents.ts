import tw, { styled, TwStyle, css } from 'twin.macro'

import {
   Typo32DarkBlueGreyHKGroteskMedium,
   Typo12SteelHKGroteskSemiBold,
   Typo14WhiteHKGroteskSemiBold,
   Typo14SteelHKGroteskRegular
} from '../../../Common/styleGuide/Typos'
import TextInput from '../../../Common/components/TextInput'
import Button from '../../../Common/components/Button'
import Image from '../../../Common/components/Image'

import {
   ContainerWithPurpleBackground,
   CardContainer
} from '../common/styledComponents'

export const SignUpContainer = styled.div`
   ${tw`
   flex flex-1 justify-between box-border md:min-h-screen bg-whiteTwo 
    `}
`

export const LeftSection = styled.div`
   ${tw`
        w-7/12  bg-whiteTwo relative flex flex-col items-center justify-center
    `}
`

export const SignUpFormContainer = styled.form`
   ${tw`
        max-w-360px w-full flex flex-col sm:mt-24px lg:mt-48px 
    `}
`

export const InputFieldLabel = styled(Typo12SteelHKGroteskSemiBold)`
   ${tw`
        uppercase 
    `}
`

export const SignUpTitle = styled(Typo32DarkBlueGreyHKGroteskMedium)`
   ${tw`sm:text-22px lg:text-32px `}
`

export const InputFieldWithLabelContainer = styled.div`
   ${tw`
   mt-14px md:mt-24px
    `}
`

export const InputFieldWithErrorIcon = styled.div`
   ${tw`
        flex relative 
    `}
`

export const InputField = styled(TextInput)`
   ${({ isError }): TwStyle => (isError ? tw`bg-neonRed05` : tw`bg-white`)}
   ${tw`
        pl-16px pr-32px mt-8px
    `}
`

export const ErrorIconContainer = styled.div`
   ${tw`
        absolute right-16px top-20px
    `}
`

export const CreateAccountButton = styled(Button)`
   ${tw`
        mt-24px bg-brightBlue px-16px w-full
    `}
`

export const CreateAccountButtonText = styled(Typo14WhiteHKGroteskSemiBold)``

export const AlreadyHaveAnAccountText = styled(Typo14SteelHKGroteskRegular)`
   ${tw`
   flex justify-center mt-24px md:mt-48px
    `}
`

export const LoginLink = styled.span`
   ${tw`
        text-brightBlue cursor-pointer hover:underline
    `}
`

export const RightSection = styled(ContainerWithPurpleBackground)`
   ${tw`
        w-5/12 flex flex-col
    `}
`

export const ImageContainer = styled(Image)`
   ${tw`max-w-544px w-92.2 h-auto m-auto mb-40px`}
`

export const ImageWrapper = styled.div`
   ${tw` sm:min-h-36 lg:min-h-56 w-full `}
`

export const QuoteSection = styled.div`
   ${tw` sm:mb-21px md:mb-41px lg:mb-61px mt-40px ml-20px`}
`

export const SignUpCardContainer = styled(CardContainer)`
   ${tw`px-16px md:px-0 bg-whiteTwo md:bg-white flex-1`}
`

export const MobileLayoutHeaderCSS = css`
   ${tw`bg-whiteTwo`}
`
