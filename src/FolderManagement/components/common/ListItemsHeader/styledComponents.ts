import tw, { styled } from 'twin.macro'

import { Typo12SteelHKGroteskSemiBold } from '../../../../Common/styleGuide/Typos'

export const ListItemContainer = styled.div`
   ${tw`
        flex py-5 px-8 justify-between mt-8px border border-solid border-lightBlueGrey rounded-4px bg-white
    `}
`

export const BaseColumnContainer = styled.div`
   ${tw`
        flex items-center justify-center
    `}
`

export const NameContainer = styled.div`
   ${tw`
        w-3/12 flex items-center min-w-200px
    `}
`

export const ModifiedDateContainer = styled(BaseColumnContainer)`
   ${tw`
        w-3/12
    `}
`

export const OwnerContainer = styled(BaseColumnContainer)`
   ${tw`
        w-3/12
    `}
`

export const MoreContainer = styled(BaseColumnContainer)`
   ${tw`
        w-1/12 justify-center
    `}
`

export const Label = styled(Typo12SteelHKGroteskSemiBold)`
   ${tw`
        uppercase
    `}
`
