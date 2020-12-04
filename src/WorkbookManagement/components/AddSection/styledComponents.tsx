import tw, { styled } from 'twin.macro'

import { Typo14WhiteHKGroteskSemiBold } from '../../../Common/styleGuide/Typos'
import Button from '../../../Common/components/Button'
import TextInput from '../../../Common/components/TextInput'

export const AddSectionContainer = styled.div`
   ${tw`w-full flex flex-col`}
`

export const InputBox = styled(TextInput)`
   ${tw`px-16px py-12px w-full mt-8px rounded-4px`}
`

export const AddSectionButton = styled(Button)`
   ${tw`flex items-center justify-center bg-blue w-116px h-40px rounded-4px`}
`
export const FormContainer = styled.form`
   ${tw`flex items-center `}
`

export const SendText = styled(Typo14WhiteHKGroteskSemiBold)`
   ${tw`leading-7`}
`

export const Footer = styled.div`
   ${tw`flex items-center mt-8px`}
`
export const CloseButton = styled(Button)`
   ${tw`bg-transparent p-0 ml-8px`}
   ${({ disabled }) => disabled && tw`cursor-not-allowed`}
`
