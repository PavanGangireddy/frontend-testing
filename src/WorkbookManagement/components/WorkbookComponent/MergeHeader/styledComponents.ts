import tw, { styled } from 'twin.macro'

import Button from '../../../../Common/components/Button'
import {
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14WhiteHKGroteskSemiBold,
   Typo12SteelHKGroteskRegular
} from '../../../../Common/styleGuide/Typos'

export const MergeHeaderContainer = styled.div`
   ${tw`
        w-full flex justify-between items-center bg-white absolute shadow top-0
        py-8px px-16px z-100 left-0
    `}
`

export const LeftSection = styled.div`
   ${tw`
        flex items-center
    `}
`

export const CloseButton = styled.button`
   ${tw`
        focus:outline-none border-none
    `}
`

export const SelectedCardsCount = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   ${tw``}
`

export const MergeButtonText = styled(Typo14WhiteHKGroteskSemiBold)``

export const MergeCardInstruction = styled(Typo12SteelHKGroteskRegular)``

export const TextContainer = styled('div')`
   ${tw`flex flex-col ml-8px`}
`
export const MergeButton = styled(Button)`
   ${tw`min-w-125px`}
`
