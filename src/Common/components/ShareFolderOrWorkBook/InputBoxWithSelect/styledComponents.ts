import tw, { styled } from 'twin.macro'

import {
   Typo14SteelHKGroteskRegular,
   Typo14DarkBlueGreyHKGroteskRegular,
   Typo14WhiteHKGroteskSemiBold
} from '../../../styleGuide/Typos'

import Button from '../../Button'

export const InputAndSelectContainer = styled.div`
   ${tw`w-maxContent relative`}
`

export const SelectFieldContainer = styled.div`
   ${tw`absolute right-8px top-5px`}
`

export const textInputStyles = tw`mt-0px w-357px border-default border-solid border-steel pr-128px`

export const MenuItemsContainer = styled.div`
   ${tw`bg-white px-8px py-10px rounded-4px shadow-steel16 mt-16px`}
`

export const MenuItem = styled(Typo14SteelHKGroteskRegular)`
   ${tw`py-8px px-16px leading-1.71 mb-0 hover:text-brightBlue hover:bg-brightBlue10 cursor-pointer`}
`

export const RoleAndDropDownArrowContainer = styled.div`
   ${tw`flex items-center mt-5px mr-16px`}
`
export const RoleText = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw`pr-4px mb-0 mt-0`}
`

export const IconContainer = styled.div`
   ${tw`transform rotate-180 flex items-center`}
`
export const ShareContainer = styled.div`
   ${tw`flex px-25px min-h-67px`}
`
export const ShareButton = styled(Button)`
   ${tw`ml-12px h-40px min-w-76px`}
`

export const ShareButtonText = styled(Typo14WhiteHKGroteskSemiBold)``
