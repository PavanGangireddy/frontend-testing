import tw, { styled, TwStyle } from 'twin.macro'

import { Typo14DarkBlueGreyHKGroteskSemiBold } from '../../../Common/styleGuide/Typos'
import Image from '../../../Common/components/Image'

export const StyledContainer = styled.div`
   ${tw`h-full w-full flex flex-col justify-center items-center bg-basic200 min-h-400px`}
   ${({ shouldDisablePointerEvents }): TwStyle =>
      shouldDisablePointerEvents
         ? tw`pointer-events-none`
         : tw`pointer-events-auto`}
`
export const NoDataText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   ${tw`text-black  mb-32px text-2xl text-center`};
`

export const NoDiscussionsImage = styled(Image)`
   ${tw`h-200px`}
`
