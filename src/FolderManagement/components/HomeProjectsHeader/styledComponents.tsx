import tw, { styled } from 'twin.macro'

import { Typo30DarkBlueGreyHKGroteskRegular } from '../../../Common/styleGuide/Typos'

export const HeaderContainer = styled.div`
   ${tw`
        w-full flex items-center justify-between p-32px
    `}
`

export const WelcomeBackMessageContainer = styled.div`
   ${tw`
        w-9/12
    `}
`

export const WelcomeBackMessage = styled(Typo30DarkBlueGreyHKGroteskRegular)``
