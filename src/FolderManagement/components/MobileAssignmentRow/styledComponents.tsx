import tw, { styled } from 'twin.macro'

import {
   Typo12SteelHKGroteskRegular,
   Typo14DarkBlueGreyHKGroteskSemiBold
} from '../../../Common/styleGuide/Typos'
import { customDevice } from '../../../Common/utils/MixinUtils'

export const AssignmentContainer = styled.div`
   ${tw`w-9/12 flex w-auto`}
`
export const IconWrapper = styled.div`
   ${tw`mr-12px`}
`
export const Details = styled.div`
   ${tw`flex flex-col`}
`
export const AssignmentName = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   ${tw`
      w-179px truncate
   `}
`

export const DateTimeLabelTypo = styled(Typo12SteelHKGroteskRegular)`
   ${tw`
      mr-8px
   `}
   ${customDevice(320, 347)} {
      ${tw`
         text-11px
      `}
   }
`

export const SubContainer = styled.div`
   ${tw`flex items-center mt-4px`}
`
