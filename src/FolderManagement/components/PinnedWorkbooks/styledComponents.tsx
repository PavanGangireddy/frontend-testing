import tw, { styled } from 'twin.macro'

import { Typo12DarkBlueGreyHKGroteskSemiBold } from '../../../Common/styleGuide/Typos'
import { mobile } from '../../../Common/utils/MixinUtils'

export const PinnedWorkbooksWrapper = styled.div``

export const Title = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
   ${tw` mx-8px uppercase leading-1.33 tracking-0.12px`}
`

export const Workbooks = styled.div`
   ${tw`flex flex-wrap`}
   ${mobile} {
      ${tw`items-stretch`}
   }
`

export const IconWrapper = styled.div`
   ${tw`mb-8px`}
`

export const Container = styled.div`
   ${tw`flex border-0 border-solid border-b border-lightBlueGrey`}
`
