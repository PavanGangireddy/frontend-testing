import tw, { styled, TwStyle, css } from 'twin.macro'

import { customDevice } from '../../utils/MixinUtils'
import Colors from '../../themes/Colors'

interface SideBarContainerProps {
   shouldDisplayViewInChromeMessageBanner: boolean
}

//******** sidebar skeleton styles start******** */
export const SideBarSkeletonContainer = styled.div`
   ${tw`w-234px lg:w-278px  h-screen flex flex-col py-32px px-24px`}
`
export const SideBarSkeletonHeader = styled.div`
   ${tw`
       h-32px flex justify-around items-center
   `}
`

export const SideBarSkeletonFooter = styled.div`
   ${tw`
      mb-16px flex flex-col h-100px justify-between
   `};
   margin-top: auto;
`
export const SideBarSkeletonContent = styled.div`
   ${tw`
      my-64px flex flex-col w-full justify-around
   `};
`

export const MenuItem = styled.div`
   ${tw`
      h-64px flex items-center px-2 justify-around
   `};
   max-width: 220px;
`
export const SkeletonCircle = styled.div`
   ${tw`
      ml-4px
   `}
`

//** side bar skeleton styles end********** */
export const SideBarContainer = styled.div`
   ${tw`lg:w-256px`}
   ${customDevice(768, 1024)} {
      ${tw`w-234px`}
   }
   ${tw`
        h-full flex flex-col justify-between fixed top-0 left-0 bg-darkBlueGrey transition-all duration-300
        ease-in-out
    `}
   ${(props: SideBarContainerProps): TwStyle =>
      props.shouldDisplayViewInChromeMessageBanner ? tw`mt-80px` : tw`mt-0px`}
      height: ${(props: SideBarContainerProps) =>
         props.shouldDisplayViewInChromeMessageBanner
            ? 'calc(100% - 80px)'
            : '100%'}
`

export const SideBarSection = styled.div`
   ${tw`
        mt-30px flex-grow
    `};
`

interface RightArrowIconContainerProps {
   isCollapsed: boolean
}

export const RightArrowIconContainer = styled.div<RightArrowIconContainerProps>`
   ${props => (props.isCollapsed ? null : tw`transform rotate-180`)}
   ${tw`flex items-center justify-center`}
`
export const SideBarFooterSection = styled.div`
   ${tw`mb-32px`}
`
export const FailureViewCSS = css`
   ${tw`text-white text-center text-16px m-14px`}
`

export const ContainerStyle = {
   backgroundColor: `${Colors.darkBlueGrey}`,
   width: '100%' //TODO:need to give css stylings
}
