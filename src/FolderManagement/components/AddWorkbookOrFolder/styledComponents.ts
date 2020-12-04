import tw, { styled } from 'twin.macro'

import {
   Typo14WhiteHKGroteskSemiBold,
   Typo14SteelHKGroteskSemiBold,
   Typo16DarkBlueGreyHKGroteskRegular,
   Typo14DarkBlueGreyHKGroteskSemiBold
} from '../../../Common/styleGuide/Typos'
import Button from '../../../Common/components/Button'

export const PopoverMenuContainer = styled.div`
   ${tw`w-maxContent`}
`

export const ButtonWrapper = styled(Button)`
   ${tw`flex items-center bg-brightBlue rounded-8px py-12px px-20px md:ml-16px lg:ml-24px`}
`

export const AddTextContainer = styled(Typo14WhiteHKGroteskSemiBold)`
   ${tw`pl-8px leading-1.71`}
`

export const MenuItemsListContainer = styled.div`
   ${tw`bg-white p-8px mt-8px shadow-steel16 rounded-4px min-w-249px`}
`
export const MenuItemContainer = styled(Typo14SteelHKGroteskSemiBold)`
   ${tw`flex items-center px-8px py-4px my-4px hover:text-darkBlueGrey hover:bg-lightBlueGrey24 cursor-pointer rounded-sm leading-1.71`}
`

export const IconContainer = styled.div`
   ${tw`pr-8px w-40px flex justify-center`}
`

export const ModalBodyContainer = styled.form`
   ${tw`flex flex-col bg-white border-default border-solid border-lightBlueGrey shadow-steel16 rounded-4px p-24px relative min-w-323px`}
`
export const StyledIconContainer = styled.div`
   ${tw`flex items-center justify-center w-16px h-16px cursor-pointer absolute top-24px right-24px`}
`

export const ModalHeading = styled(Typo16DarkBlueGreyHKGroteskRegular)`
   ${tw`leading-1.33`}
`

export const BaseInputContainer = styled.div`
   ${tw`mt-10px min-h-77px`}
`

export const FooterMainContainer = styled.div`
   ${tw`flex justify-end mt-8px`}
`
export const CreateButton = styled(Button)``

export const CreateButtonText = styled(Typo14WhiteHKGroteskSemiBold)`
   ${tw`leading-1.71`}
`

export const CancelButton = styled(Button)`
   ${tw`mr-16px`}
`
export const CancelButtonText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   ${tw`leading-1.71`}
`
