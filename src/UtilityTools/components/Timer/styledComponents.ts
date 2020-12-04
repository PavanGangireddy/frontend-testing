import tw, { styled } from 'twin.macro'

import { Typo12BrightBlueHKGroteskRegular } from '../../../Common/styleGuide/Typos'

export const TimerWrapper = styled.div`
   ${tw`h-64px`}
`

export const TimerLabel = styled.div`
   ${tw`flex items-center`}
`
export const TimerLabelText = styled(Typo12BrightBlueHKGroteskRegular)`
   ${tw`text-basic700 ml-8px`}
`

export const TimeContainer = styled(TimerLabel)`
   ${tw`mt-14px`}
`

export const Time = styled(Typo12BrightBlueHKGroteskRegular)`
   ${tw`ml-8px`}
`
