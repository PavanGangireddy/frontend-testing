import tw, { styled } from 'twin.macro'

import { Typo12DarkBlueGreyHKGroteskSemiBold } from '../../../Common/styleGuide/Typos'
import { mobile, customDevice } from '../../../Common/utils/MixinUtils'

export const StarredFoldersWrapper = styled.div``

export const Title = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
   ${tw`m-8px uppercase leading-1.33 tracking-0.12px`}
`

export const Folders = styled.div`
   ${tw`flex flex-wrap`}
   ${mobile} {
      ${tw`items-stretch justify-between`}
   }
   ${customDevice(539, 768)} {
      ${tw`justify-start`}
   }
`
export const IconWrapper = styled.div`
   ${tw`my-8px`}
`

export const Container = styled.div`
   ${tw`flex border-0 border-solid border-b border-lightBlueGrey`}
`
