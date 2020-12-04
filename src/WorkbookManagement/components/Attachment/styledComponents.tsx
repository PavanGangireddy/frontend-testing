import tw, { styled, TwStyle } from 'twin.macro'

import {
   Typo14BrightBlueHKGroteskSemiBold,
   Typo12SteelHKGroteskRegular,
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14SteelHKGroteskRegular,
   Typo14WhiteHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskRegular
} from '../../../Common/styleGuide/Typos'
import Image from '../../../Common/components/Image'
import TextInput from '../../../Common/components/TextInput'
import Button from '../../../Common/components/Button'
import BaseInput from '../../../Common/components/BaseInput'
import { customDevice, mobile } from '../../../Common/utils/MixinUtils'

export const AttachmentContainer = styled.li`
   ${tw`w-full flex  my-2 h-80px rounded  border border-solid border-lightBlueGrey40 hover:bg-lightBlueGrey24`}
`
export const ImageContainer = styled.div`
   ${tw`flex w-100px h-80px overflow-hidden`}
`
export const AttachmentBody = styled.div`
   ${tw`flex p-2 flex-1 flex-col justify-around max-w-full`}
`

export const AttachmentUrl = styled(Typo14BrightBlueHKGroteskSemiBold)`
   ${tw`cursor-pointer overflow-hidden`}
   text-overflow: ellipsis;
   ${customDevice(320, 359)} {
      ${tw`max-w-234px`}
   }
`

export const EditAttachmentURL = styled(TextInput)`
   ${tw`h-6 border border-solid border-black`}
`

export const AttachmentImage = styled(Image)`
   ${tw`object-cover`}
`

//TODO: need to add Typo
export const AttachmentDate = styled(Typo12SteelHKGroteskRegular)``

export const ActionsContainer = styled.div`
   ${tw`hidden m-1 justify-around items-center w-20 h-6 `}
   ${({ isDisabled }): TwStyle =>
      isDisabled ? tw`` : AttachmentContainer}:hover & {
      ${({ isEditable }) => !isEditable && tw`flex`}
   }
`
export const Action = styled.div`
   ${({ isDisabled }): TwStyle =>
      isDisabled ? tw`cursor-not-allowed` : tw`cursor-pointer`}
`

export const MoreIconWrapper = styled.div`
   ${tw`flex w-32px h-32px items-center justify-center`}
`

export const HeaderTitle = styled(Typo14DarkBlueGreyHKGroteskSemiBold)``

export const ListMenuContainer = styled.div`
   ${tw` bg-white flex flex-col py-16px`}
`

export const ListMenuItem = styled.div`
   ${tw`flex items-center leading-1.71 py-12px cursor-pointer hover:text-darkBlueGrey hover:bg-lightBlueGrey24 rounded-8px mb-5px last:mb-0px`}
`

export const ListMenuText = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw`pl-16px`}
`

export const InputBox = styled(BaseInput)`
   ${tw`h-40px border border-solid border-lightBlueGrey`}
   &:focus {
      ${tw`border-lightBlueGrey`}
   }
`

export const EditAttachmentFooter = styled.div`
   ${tw`flex justify-end `}
`

export const ButtonsContainer = styled.div`
   ${tw`flex justify-end mt-16px`}
`

export const SaveButton = styled(Button)`
   ${tw`w-80px mt-8px h-32px flex items-center justify-center py-0`}
`

export const SaveButtonText = styled(Typo14WhiteHKGroteskSemiBold)``

export const CancelButton = styled(Button)`
   ${tw` w-maxContent mr-10px mt-8px h-32px flex items-center py-0`}
`
export const CancelButtonText = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw``}
`

export const EditAttachmentDrawerContainer = styled.div`
   ${tw`flex flex-col`}
`
