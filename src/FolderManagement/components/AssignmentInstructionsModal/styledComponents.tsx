import tw, { css, styled, TwStyle } from 'twin.macro'

import {
   Typo20SteelHKGroteskMedium,
   Typo14DarkBlueGreyHKGroteskRegular
} from '../../../Common/styleGuide/Typos'
import Button from '../../../Common/components/Button'
import { isTabletDevice } from '../../../Common/utils/responsiveUtils'

export const Children = styled.div`
   ${tw`flex flex-col flex-grow overflow-auto p-24px md:p-32px justify-between`};
`
export const InstructionsBody = styled.div``

export const Title = styled(Typo20SteelHKGroteskMedium)``

export const ObjectiveContainer = styled.div`
   ${tw`flex flex-col mb-16px`}
`

export const DescriptionContainer = styled(ObjectiveContainer)`
   ${tw`my-16px`}
`

export const Instruction = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   ${tw`mt-8px md:mt-16px text-justify`}
`

export const InstructionsFooter = styled.div`
   ${tw`self-end flex items-center`};
   ${isTabletDevice && tw`mt-24px`}
`

export const StartAssignmentButton = styled(Button)`
   ${tw``}
`
