import tw, { styled } from 'twin.macro'
import { Mention, MentionsInput } from 'react-mentions'

import Button from '../../../Common/components/Button'
import {
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo12NeonRedHKGroteskRegular
} from '../../../Common/styleGuide/Typos'
import { tablet } from '../../../Common/utils/MixinUtils'

export const StyledContainer = styled.div`
   ${tw`my-4 p-2 border rounded`}
   ${props => props.isLoading && tw`cursor-wait`}
   ${({ isError }) => (isError ? tw`border-neonRed` : tw``)}
`

export const StyledButton = styled(Button)`
   ${tablet} {
      ${tw`flex items-center justify-center p-0 w-60px h-35px`}
   }
`

export const FooterWrapper = styled.div`
   ${tw`flex justify-end self-center`};
`

export const ActionButtonsSection = styled.div`
   ${tw`flex items-center`}
   & > button {
      ${tw`mx-3 border-2 border-primary500Default`}
   }
`

export const AttatchWrapper = styled.div`
   ${tw`flex justify-between flex-col`};
`

export const AddAttachmentWrapper = styled.div`
   ${tw`flex justify-between w-32  -mb-2`};
`

export const AttatchedFilePreview = styled.div`
   ${tw` m-1 rounded w-20 h-20 object-contain relative`};
`

export const AttatchmentField = styled.div`
   ${tw`m-1 rounded-lg`}
`

export const AttatchIcon = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   ${tw`flex `}
`
export const MultiMediaPreviewContainer = styled.div`
   ${tw`flex flex-wrap w-full h-24`}
`
export const Image = styled.img`
   ${tw`h-full rounded-lg`}
`
export const ImageField = styled.div`
   ${tw`object-contain w-16 h-16 `}
`
export const Footer = styled.div`
   ${tw`py-2`}
`

// FIXME: Apply moderate stylings
export const StyledMentionsInput = styled.input`
   ${tw`p-2 border-none text-16px leading-6`};
   transition: 0.3s ease-in-out;
   font-family: HKGrotesk;
   &:focus {
      ${tw`outline-none`}
   }
   & textarea {
      ${tw`py-2 px-4 flex items-center text-basic1000`};
      transition: 0.3s ease-in-out;
      &::placeholder {
         ${tw`text-basic500`}
      }
      &:focus {
         ${tw`outline-none border-none`}
      }
   }
`

export const DeleteIconWrapper = styled.div`
   ${tw`flex cursor-pointer absolute justify-end right-0 p-2 bg-gray-200 bottom-0 m-1 rounded`}
`

export const StyledMention = styled(Mention)`
   ${tw`bg-transparentPrimary16 rounded py-1`}
`
export const MentionOptionForUser = styled.p`
   ${tw`m-1 w-full p-2 flex items-center text-basic800 `}
   & > * {
      ${tw`mx-1`}
   }
   ${props => props.isFocused && tw`bg-transparentPrimary8`}
`

export const MultimediaPreviewContainer = styled.div`
   ${tw`flex flex-wrap w-full`}
`
export const MentionsInputStyles = styled(MentionsInput)`
   ${tw`border-none`}
`

export const ErrorText = styled(Typo12NeonRedHKGroteskRegular)`
   ${tw`-mt-4 mb-4 p-0`}
`
