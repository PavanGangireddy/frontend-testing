import tw, { styled } from 'twin.macro'

import { Typo14DarkBlueGreyHKGroteskSemiBold } from '../../../Common/styleGuide/Typos'

export const NameAndIconContainer = styled.div`
   ${tw`
        flex items-center pr-16px
    `}
   width: 30%;
   flex-grow: 2;
`

export const IconContainer = styled.div``

export const AssignmentWorkbookNameText = styled(
   Typo14DarkBlueGreyHKGroteskSemiBold
)`
   ${tw`
        ml-12px truncate
    `}
`
