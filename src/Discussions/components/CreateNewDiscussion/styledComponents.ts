import tw, { styled } from 'twin.macro'

import Button from '../../../Common/components/Button'
import {
   Typo14BrightBlueHKGroteskRegular,
   Typo12PinkishOrangeHKGroteskRegular,
   Typo20DarkBlueGreyHKGroteskMedium
} from '../../../Common/styleGuide/Typos'

export const CreateDiscussionContainer = styled.div`
   ${tw`relative flex flex-col m-8 w-50vw min-h-60vh`};
`

export const TitleContainer = styled.div`
   ${tw`flex justify-between items-center`}
`
export const Title = styled(Typo20DarkBlueGreyHKGroteskMedium)``

export const FieldContainer = styled.div`
   ${tw`my-4 flex flex-col justify-between`}
`

export const FieldHeading = styled(Typo20DarkBlueGreyHKGroteskMedium)``
export const BodyHeading = styled(FieldHeading)``

export const ButtonsContainer = styled.div`
   ${tw`flex justify-end items-center mt-auto`}
   & > button {
      ${tw`mx-3 border-2 border-primary500Default`}
   }
`
export const ErrorText = styled(Typo12PinkishOrangeHKGroteskRegular)`
   ${tw`leading-2.03 tracking-0.11px pointer-events-none`}
`

export const StyledButton = styled(Button)`
   ${tw`flex items-center`}
   & > svg {
      ${tw`m-1`}
   }
`

export const ButtonText = styled(Typo14BrightBlueHKGroteskRegular)``

export const PostButton = styled(Button)`
   ${tw`
      border border-solid
   `}
`
