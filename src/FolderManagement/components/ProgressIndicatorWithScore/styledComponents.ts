import tw, { styled } from 'twin.macro'

import {
   BaseHKGroteskSemiBoldText,
   Typo20SteelHKGroteskMedium
} from '../../../Common/styleGuide/Typos'
import { mobile } from '../../../Common/utils/MixinUtils'

export const ProgressIndicatorAndScore = styled.div`
   ${tw`
      flex
   `}
`

export const ScoreContainer = styled.div`
   ${tw`flex items-center`}
   ${mobile} {
      ${tw`min-w-40px`}
   }
`

export const SecuredScore = styled(Typo20SteelHKGroteskMedium)`
   ${tw``}
`

export const Separator = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-steel text-12px`}
`

export const TotalScore = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-steel text-12px mt-6px`}
`
