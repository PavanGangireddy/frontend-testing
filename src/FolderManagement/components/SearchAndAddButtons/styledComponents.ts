import tw, { styled, TwStyle } from 'twin.macro'

import Button from '../../../Common/components/Button'
import { Typo14DarkBlueGreyHKGroteskSemiBold } from '../../../Common/styleGuide/Typos'
import { mobile } from '../../../Common/utils/MixinUtils'

export const SearchAndAddButtonsContainer = styled.div`
   ${tw`flex pr-40px justify-between items-center`}
   ${({ isSharedWithMeRoute }): TwStyle =>
      isSharedWithMeRoute ? tw`pt-32px pl-32px` : tw``}
   ${mobile} {
      ${tw`border-0 w-full p-0px`}
   }
`
export const ButtonWrapper = styled(Button)`
   ${tw`flex items-center`}
`

export const TextContainer = styled(Typo14DarkBlueGreyHKGroteskSemiBold)``
