import tw, { styled } from 'twin.macro'

import {
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14BrightBlueHKGroteskSemiBold
} from '../../../Common/styleGuide/Typos'
import Button from '../../../Common/components/Button'

export const HeaderContainer = styled.div`
   ${tw`
        w-full flex items-center justify-between
    `}
`

export const MoveCardLabel = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   ${tw`flex items-center`}
`

export const ViewCardDetailsButton = styled(Button)`
   ${tw`
        bg-transparent text-blue px-0 mx-10px
    `}
`

export const ViewCardDetailsText = styled(Typo14BrightBlueHKGroteskSemiBold)``

export const SelectedCard = styled.div`
   ${tw`bg-white shadow-none mx-8px p-8px border border-solid
        rounded-4px bg-white cursor-pointer relative border-lightBlueGrey truncate max-w-178px`}
        background: ${({ cardLabel }) => (cardLabel ? cardLabel : tw``)};
   color: ${({ textColor }): string => textColor};
`
