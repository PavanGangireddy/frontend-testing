import tw, { styled } from 'twin.macro'

import Button from '../../../Common/components/Button'
import { tablet } from '../../../Common/utils/MixinUtils'
import {
   Typo12BrightBlueHKGroteskRegular,
   Typo14SteelHKGroteskRegular,
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskRegular
} from '../../../Common/styleGuide/Typos'

import {
   AttatchmentField,
   Image,
   ImageField
} from '../ReplyInputSection/styledComponents'

export const CommentContainer = styled.div`
   ${tw`flex w-full py-3 border-t`}
`
export const ImageWrapper = styled.div`
   ${tw`w-1/12 flex justify-center`}
`
export const ContentWrapper = styled.div`
   ${tw`flex w-11/12`}
`
export const TextContentWrapper = styled.div`
   ${tw`w-11/12 flex flex-col justify-between`}
`

export const Title = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   ${tw`text-basic1000`}
`

export const Description = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw`leading-1.71 text-basic700 max-h-200px overflow-y-auto text-justify`};
   & a {
      ${tw`mx-1 py-1 px-2 bg-transparentPrimary8 rounded-lg text-primary500Default text-xs font-semibold`}
   }
`
export const RowContainer = styled.p`
   ${tw`flex items-center`}
`

interface StyledButtonProps {
   disablePointerEvents: boolean
}
export const StyledButton = styled(Button)<StyledButtonProps>`
   ${tw`mr-4 flex items-center pl-0`}
   & > svg {
      ${tw`ml-0 mr-1`}
   }
   ${props =>
      props.disablePointerEvents
         ? 'pointer-events-none	'
         : 'pointer-events-auto'};
`

// TODO: Apply zeplin screen stylings for kebab menu
export const MoreOptionsWrapper = styled.div`
   ${tw`flex w-1/12 items-start justify-between flex-row-reverse`}
`
export const PopoverMenuContainer = styled.div`
   ${tw`bg-white p-8px  w-258px rounded-4px shadow-cardMenuShadow`}
   ${tablet} {
      ${tw`w-160px`}
   }
`

export const PopoverMenuOption = styled(Typo14SteelHKGroteskRegular)`
   ${tw`flex items-center leading-3 h-40px my-2 py-8px px-16px cursor-pointer`}
      :hover {
      ${tw`text-darkBlueGrey bg-lightBlueGrey24`}
   }
   ${tablet} {
      ${tw`h-30px`}
   }
`

export const ButtonText = styled(Typo12BrightBlueHKGroteskRegular)``

export const MultiMediaContainer = styled.div`
   ${tw`flex flex-wrap m-1`}
`
export const AttatchedMediaItemContainer = styled.div`
   ${tw`flex flex-wrap`}
`
export { AttatchmentField, Image, ImageField }
