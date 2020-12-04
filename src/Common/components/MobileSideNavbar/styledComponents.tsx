import tw, { styled, TwStyle, css } from 'twin.macro'

import { customDevice } from '../../utils/MixinUtils'

export const LoadingWrapperContainer = styled.div`
   ${({ isOpen }): TwStyle =>
      isOpen ? tw`w-full` : tw`w-0 h-0 overflow-hidden`}
`

export const Container = styled.div`
   ${tw`h-full flex transition-all duration-300 top-0 fixed left-0 z-50 w-full bg-osloGrey`}
   opacity: ${props => (props.isOpen ? '1' : '0')};
   z-index: ${props => (props.isOpen ? '50' : '-1')};
   transition-delay: ${props => (props.isOpen ? '0' : '300ms')};
   ${(props): TwStyle =>
      props.shouldDisplayViewInChromeMessageBanner ? tw`mt-66px` : tw`mt-0px`}
   ${customDevice(416, 767)}{
      ${(props): TwStyle =>
         props.shouldDisplayViewInChromeMessageBanner
            ? tw`mt-48px`
            : tw`mt-0px`}
   }  
`

export const SideBarContainer = styled.div`
   ${tw`
        h-full flex flex-col justify-between top-0 fixed w-77.2  z-100 bg-darkBlueGrey transition-all duration-300
        ease-in-out
    `}
   left: ${props => (props.isOpen ? '0' : '-100%')};
   z-index: ${props => (props.isOpen ? '100' : '-1')};
   ${(props): TwStyle =>
      props.shouldDisplayViewInChromeMessageBanner ? tw`mt-66px` : tw`mt-0px`}
      height: ${props =>
         props.shouldDisplayViewInChromeMessageBanner
            ? 'calc(100% - 66px)'
            : '100%'};
      ${customDevice(416, 767)}{
      ${(props): TwStyle =>
         props.shouldDisplayViewInChromeMessageBanner
            ? tw`mt-48px`
            : tw`mt-0px`}
            height: ${props =>
               props.shouldDisplayViewInChromeMessageBanner
                  ? 'calc(100% - 48px)'
                  : '100%'};
   }
   
`

export const SideBarSection = styled.div`
   ${tw`
   mt-30px flex-grow
    `}
`
export const SideBarFooterSection = styled.div`
   ${tw`mb-32px mt-16px`}
`
export const FailureViewCSS = css`
   ${tw`text-white text-center text-16px m-14px`}
`

export const containerCSS = css`
   ${tw`bg-darkBlueGrey w-full`}
`
