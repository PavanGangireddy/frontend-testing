import tw, { styled } from 'twin.macro'

import { Typo14DarkBlueGreyHKGroteskSemiBold } from '../../../Common/styleGuide/Typos'
import Button from '../../../Common/components/Button'

export const EditObjectiveContainer = styled.form`
   ${tw`
        flex flex-col
    `}
`

export const TitleText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)``

export const SaveButton = styled(Button)`
   ${tw`
        w-80px h-40px self-end bg-brightBlue mt-24px
    `}
`
