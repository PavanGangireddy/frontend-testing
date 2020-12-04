import tw, { styled } from 'twin.macro'

import Colors from '../../../../Common/themes/Colors'
import {
   Typo12DarkBlueGreyHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskRegular,
   Typo14WhiteHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskSemiBold
} from '../../../../Common/styleGuide/Typos'
import Button from '../../../../Common/components/Button'
import TextInput from '../../../../Common/components/TextInput'
import { mobile } from '../../../../Common/utils/MixinUtils'

export const MainContainer = styled('div')`
   ${tw`flex flex-col bg-white border border-solid border-lightBlueGrey rounded-4px max-w-400px p-24px relative`}
   box-shadow: 0 4px 16px 0 ${Colors.steel16};
   ${mobile}{
      ${tw`border-0 shadow-none p-0px`}
   }
`

export const StyledIconContainer = styled('div')`
   ${tw`flex items-center justify-center w-16px h-16px cursor-pointer absolute right-24px top-24px`}
`

export const PopupHeading = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
   ${tw`leading-1.33 tracking-normal`}
`

export const ContentMainContainer = styled('div')`
   ${tw`flex flex-col mt-24px`}
   ${mobile} {
      ${tw`mt-0px`}
   }
`

export const DescriptionText = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw`leading-1.71 tracking-normal`}
`
export const FooterMainContainer = styled('div')`
   ${tw`flex justify-end mt-24px`}
`
export const SubmitButton = styled(Button)`
   background-color: ${({ background }) => background};
`
export const SubmitButtonText = styled(Typo14WhiteHKGroteskSemiBold)`
   ${tw`leading-1.71 tracking-normal`}
`

export const CancelButton = styled(Button)`
   ${tw`mr-16px`}
`
export const CancelButtonText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   ${tw`leading-1.71 tracking-normal`}
`

export const Input = styled(TextInput)`
   ${tw`w-352px`}
   ${mobile} {
      ${tw`w-full`}
   }
`
