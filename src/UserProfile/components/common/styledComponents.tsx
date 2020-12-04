import tw, { styled, css } from 'twin.macro'

import { Typo32DarkBlueGreyHKGroteskMedium } from '../../../Common/styleGuide/Typos'

export const LogoContainer = styled.div`
   ${tw`
    w-auto h-auto absolute top-32px left-48px`}
`

export const ContainerWithPurpleBackground = styled.div`
   ${tw`
    flex items-center justify-center bg-pastelPurple`}
`

export const QuoteContainer = styled.div`
   ${tw`
    w-full flex flex-col items-center justify-center`}
`

export const QuoteLine = styled.div`
   ${tw`
    flex relative`}
`

export const TopQuotesIconContainer = styled.div`
   ${tw`
    absolute -top-12px -left-32px`}
`

export const QuoteText = styled.span/* TODO: Need to add color to colors */ `
   color: #6b38fb;
   ${tw` text-30px font-bold`}
`

export const BottomQuotesIconContainer = styled.div`
   ${tw`
    absolute -right-56px top-4px`}
   transform: rotate(180deg);
`

export const MobileLayoutWrapperContainer = styled.div`
   ${tw`flex flex-col  w-full min-h-screen`}
   ${props => props.css}
`

export const LayoutHeader = styled.div`
   ${tw`h-76px py-8px flex items-center justify-center`}
   ${props => props.css}
`

export const ImageStyles = css`
   ${tw`w-full`}
   max-height:221px
`

export const DisplayOnlyInMobile = styled.div`
   ${tw`md:hidden`}
`

export const DisplayOtherThanMobile = styled.div`
   ${tw`hidden md:flex`}
`

export const FormContainer = styled.form`
   ${tw`w-full max-w-360px sm:mt-24px lg:mt-48px`}
`

export const HeadingLabel = styled(Typo32DarkBlueGreyHKGroteskMedium)`
   ${tw`text-20px lg:text-32px `}
`

export const CardContainer = styled.div`
   ${tw`flex w-full sm:min-w-300px  lg:min-w-536px pt-24px md:py-20 flex-col  rounded-lg items-center box-border`}
`
