import tw, { styled } from 'twin.macro'

import Button from '../Button'

export const DrawerHeaderContainer = styled.div`
   ${tw`
        flex justify-between items-center border-0 border-b border-solid border-lightBlueGrey pb-16px
    `}
   ${props => props.css}
`

export const CloseButton = styled(Button)`
   ${tw`
        ml-auto bg-transparent p-8px pr-0 w-auto h-auto
    `}
`
