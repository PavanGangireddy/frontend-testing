import tw, { styled } from 'twin.macro'

import { Typo12DarkBlueGreyHKGroteskSemiBold } from '../../../Common/styleGuide/Typos'

export const MoveFolderOrWorkbookHeader = styled.div`
   ${tw`flex items-center justify-between w-full px-24px h-65px border-0 border-b border-solid border-lightBlueGrey`}
`

export const MoveFolderOrWorkbookHeaderTitle = styled(
   Typo12DarkBlueGreyHKGroteskSemiBold
)`
   ${tw`uppercase`}
`

export const CloseIconContainer = styled.div`
   ${tw`cursor-pointer`}
`
