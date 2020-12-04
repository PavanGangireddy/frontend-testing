import tw, { styled } from 'twin.macro'

import { Typo12SteelHKGroteskSemiBold } from '../../../../Common/styleGuide/Typos'

export const ListHeaderContainer = styled.div`
   ${tw`
        flex py-5 px-8 justify-between mt-8px border border-solid border-lightBlueGrey rounded-4px bg-white
    `}
`
export const BaseColumnContainer = styled.div`
   ${tw`
        flex items-center justify-center w-3/12
    `}
`

export const NameContainer = styled.div`
   ${tw`
        w-3/12 flex items-center min-w-200px
    `}
`

export const Label = styled(Typo12SteelHKGroteskSemiBold)`
   ${tw`
        uppercase
    `}
`
