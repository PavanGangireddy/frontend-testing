import tw, { styled, TwStyle } from 'twin.macro'

import {
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14SteelHKGroteskRegular
} from '../../../Common/styleGuide/Typos'

export const ObjectAndDescriptionContainer = styled.div`
   ${tw`
        flex flex-col bg-white px-16px pt-24px pb-32px rounded
    `}
   ${({ shouldDisableActions }): TwStyle =>
      shouldDisableActions ? tw`pointer-events-none` : tw`pointer-events-auto`}
`

export const ObjectiveTitle = styled(Typo14DarkBlueGreyHKGroteskSemiBold)``

export const DescriptionTitle = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   ${tw`
        mt-24px
    `}
`

export const ObjectiveAndDescriptionText = styled(Typo14SteelHKGroteskRegular)`
   ${tw`
        mt-8px cursor-text max-h-200px overflow-y-auto whitespace-pre-line
    `}
   ${({ isEmpty }): TwStyle => (isEmpty ? tw`opacity-50` : tw`opacity-100`)}
`
