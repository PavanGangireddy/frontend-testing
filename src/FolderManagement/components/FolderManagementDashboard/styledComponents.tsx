import tw, { styled, css } from 'twin.macro'

import { Typo24DarkBlueGreyHKGroteskRegular } from '../../../Common/styleGuide/Typos'

export const Container = styled.div`
   ${tw`bg-whiteTwo p-16px md:p-0`}
   min-height:calc(100vh - 80px);
`
export const TabBarContainer = css`
   ${tw`w-full`}
`

export const TabContainerCSS = css`
   ${tw`mr-16px`}
`

export const UserWorkbooksAndFoldersContainer = styled.div``

export const WelcomeMessageContainer = styled.div`
   ${tw`
      mb-24px
   `}
`

export const WelcomeBackMessage = styled(Typo24DarkBlueGreyHKGroteskRegular)``
