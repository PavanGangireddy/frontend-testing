import tw, { styled } from 'twin.macro'

import { Typo14DarkBlueGreyHKGroteskRegular } from '../../../Common/styleGuide/Typos'

export const ListItemContainer = styled.div`
   ${tw`
        border-0 border-b border-solid border-lightBlueGrey
    `}
`

export const ListItemHeader = styled.div`
   ${tw`
        flex justify-between py-16px
    `}
`

export const LeftSection = styled.div`
   ${tw`
        w-full  
    `}
`

export const ListNameText = styled(Typo14DarkBlueGreyHKGroteskRegular)``

export const ToggleButton = styled.button`
   ${tw`
        focus:outline-none border-none
    `}
`

export const IconsContainer = styled.div`
   ${tw`
        flex
    `}
`
