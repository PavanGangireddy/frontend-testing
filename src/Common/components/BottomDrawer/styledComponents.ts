import tw, { styled, TwStyle } from 'twin.macro'

import Button from '../Button'

export const Drawer = styled.div`
   ${tw`
        w-screen flex flex-col fixed bottom-0 left-0 justify-start bg-darkBlueGrey16 z-50
    `}
   ${({ isVisible }): TwStyle => (isVisible ? tw`h-screen` : tw`h-0 delay-300`)}
`

export const MainContainer = styled.div`
   ${tw`
        bg-white overflow-y-auto overflow-x-hidden rounded-t-md py-16px px-24px transition-all duration-300 ease-in-out
    `}
   ${({ isVisible }): TwStyle =>
      isVisible ? tw`max-h-424.5px` : tw`max-h-0px`}
    ${props => props.css}
`

export const EmptyContainer = styled.div`
   ${tw`
        flex-grow cursor-pointer bg-darkBlueGrey16 transition-all duration-300
    `}
    opacity: ${props => (props.isVisible ? '0.16' : '0')};
`

export const DrawerCloseButtonContainer = styled.div`
   ${tw`
        flex
    `}
`

export const CloseButton = styled(Button)`
   ${tw`
        ml-auto bg-transparent pl-8px pr-0 w-auto h-auto
    `}
`

//* Bottom Drawer Mobile *//
export const BottomDrawerModalHeader = styled.div`
   ${tw`
        flex justify-between items-center border-0 border-b border-solid border-lightBlueGrey pb-16px
    `}
`
