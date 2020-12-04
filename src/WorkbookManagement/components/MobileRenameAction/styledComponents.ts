import tw, { styled } from 'twin.macro'

import { Typo14DarkBlueGreyHKGroteskSemiBold } from '../../../Common/styleGuide/Typos'
import Button from '../../../Common/components/Button'

export const RenameContainer = styled.div`
   ${tw`
        flex flex-col mt-16px
    `}
`

export const TitleText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)``

export const RenameButton = styled(Button)`
   ${tw`
        w-90px h-40px self-end bg-brightBlue mt-24px
    `}
`
