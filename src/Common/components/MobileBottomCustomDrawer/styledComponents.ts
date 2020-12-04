import tw, { styled } from 'twin.macro'

import {
   Typo14DarkBlueGreyHKGroteskRegular,
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14WhiteHKGroteskSemiBold
} from '../../styleGuide/Typos'

import Button from '../Button'

export const DeleteContainer = styled.div`
   ${tw`
        flex flex-col my-16px
    `}
`

export const ButtonsContainer = styled.div`
   ${tw`
        flex mt-24px ml-auto
    `}
`

export const CancelButton = styled(Button)`
   ${tw`
    `}
`

export const CancelButtonText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)``

export const DeleteButton = styled(Button)`
   ${tw`
        w-80px h-40px ml-16px bg-neonRed
    `}
`

export const PrimaryButton = styled(DeleteButton)`
   background: ${({ background }) => background};
`

export const DeleteButtonText = styled(Typo14WhiteHKGroteskSemiBold)``

export const ConfirmationMessageText = styled(
   Typo14DarkBlueGreyHKGroteskRegular
)``
