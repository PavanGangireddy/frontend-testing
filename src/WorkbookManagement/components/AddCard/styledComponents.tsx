import tw, { styled } from 'twin.macro'

import {
   Typo14WhiteHKGroteskSemiBold,
   Typo14SteelHKGroteskRegular,
   Typo14SteelHKGroteskBold
} from '../../../Common/styleGuide/Typos'

import Button from '../../../Common/components/Button'
import TextInput from '../../../Common/components/TextInput'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import { customDevice, minDeviceWidth } from '../../../Common/utils/MixinUtils'

export const PopOverMenuContainer = styled.div`
   ${tw`flex justify-center mt-4 self-end w-12 absolute`};
`
export const ListMenuContainer = styled.div`
   ${tw`bg-white p-16px shadow-breadCrumbShadow rounded-16px  border border-lightBlueGrey`}
`

export const SubFilterContainer = styled.div`
   ${tw`flex h-24 flex-col mx-2 px-2 border-b border-solid border-paleGrey`}
`

export const PriorityGroupContainer = styled.div`
   ${tw`flex h-16 flex-col mx-2 px-2 border-b border-solid border-paleGrey justify-center`}
   ${isMobileDevice && tw`mx-0 px-0 border-none`}
`

export const FilterTitle = styled(Typo14SteelHKGroteskBold)`
   ${tw`flex uppercase mb-2 items-center`}
`

export const DeleteIconContainer = styled.div`
   ${tw`mx-8px flex items-center justify-center`};
`

export const ListMenuItem = styled(Typo14SteelHKGroteskRegular)`
   ${tw`leading-3 my-2 py-8px px-16px cursor-pointer hover:text-darkBlueGrey hover:bg-lightBlueGrey24`}
`

export const AddCardContainer = styled.div`
   ${tw`w-full flex flex-col`}
   ${customDevice(320, 767)} {
      ${tw`relative`}
   }
   ${minDeviceWidth(1025)} {
      ${tw`relative`}
   }
`

export const InputBox = styled(TextInput)`
   ${tw`h-80px w-full mt-8px rounded-4px pt-12px pb-32px px-16px`}
`
export const AddCardButton = styled(Button)`
   ${tw`flex items-center justify-center bg-blue w-100px h-40px rounded-4px`}
   ${({ disabled }) => disabled && tw`pointer-events-none`}
`
export const FormContainer = styled.form`
   ${tw`flex items-center mt-8px`}
`

export const AddCardText = styled(Typo14WhiteHKGroteskSemiBold)``

export const Footer = styled.div`
   ${tw`flex items-center`}
`
export const CloseButton = styled(Button)`
   ${tw`bg-transparent cursor-pointer p-0 ml-8px`}
   ${({ disabled }) => disabled && tw`cursor-not-allowed`}
`

export const KebabMenuWrapper = styled.div`
   ${tw`flex flex-col my-16px`}
`

export const MobileKebabMenuListItem = styled.div`
   ${tw`py-12px`}
`
