import tw, { styled } from 'twin.macro'

import { Typo12DarkBlueGreyHKGroteskSemiBold } from '../../../../../Common/styleGuide/Typos'

export const Container = styled.div`
   ${tw`
        px-22px pb-12px pt-16px border-0 border-b border-lightBlueGrey
    `}
`

export const TitleWithCloseIcon = styled.div`
   ${tw`
        flex justify-between mb-16px
    `}
`

export const TitleText = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
   ${tw`
        ml-6px uppercase
    `}
`

export const CloseButton = styled.button`
   ${tw`
        focus:outline-none border-none bg-transparent mr-2px cursor-pointer
    `}
`
