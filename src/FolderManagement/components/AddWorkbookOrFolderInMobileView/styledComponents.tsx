import tw, { styled, css } from 'twin.macro'

import {
   Typo14SteelHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14WhiteHKGroteskSemiBold
} from '../../../Common/styleGuide/Typos'
import Button from '../../../Common/components/Button'

export const MenuItemsListContainer = styled.div`
   ${tw`bg-white p-4px pt-0px rounded-4px min-w-249px`}
`
export const MenuItemContainer = styled(Typo14SteelHKGroteskSemiBold)`
   ${tw`flex items-center mb-24px hover:text-darkBlueGrey hover:bg-lightBlueGrey24 cursor-pointer rounded-sm leading-1.71`}
`

export const IconWrapper = styled.div`
   ${tw`pr-8px flex justify-center`}
`
export const ModalHeading = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   ${tw`leading-1.33 flex items-center`}
`
export const BaseInputContainer = styled.div``

export const FooterMainContainer = styled.div`
   ${tw`flex justify-end my-24px `}
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
export const ModalBodyContainer = styled.form`
   ${tw`flex flex-col bg-white rounded-4px relative`}
`
export const ContainerCSS = css`
   ${tw`m-0px`}
`

export const DrawerHeaderContainerCSS = css`
   ${tw`border-none`}
`
export const InputCSS = css`
   ${tw`mt-16px`}
`
