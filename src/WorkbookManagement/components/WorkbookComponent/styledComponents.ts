import tw, { styled, TwStyle } from 'twin.macro'

import {
   Typo14BlackHKGroteskRegular,
   Typo14WhiteHKGroteskSemiBold,
   Typo14BrightBlueHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskSemiBold
} from '../../../Common/styleGuide/Typos'
import {
   customDevice,
   minDeviceWidth,
   mobile,
   tablet
} from '../../../Common/utils/MixinUtils'
import {
   isMobileDevice,
   isTabletDevice
} from '../../../Common/utils/responsiveUtils'
import Button from '../../../Common/components/Button'
import { Carousel } from '../../../lib/react-scroll-snap-slider/components/Carousel'

export const WorkbookContainer = styled.div`
   ${tw`
        w-full pl-72px flex flex-col bg-whiteTwo box-border overflow-x-hidden h-full
    `}
   ${isMobileDevice ? tw`pl-0` : tw`pl-72px`}
`

export const ContainerWithFullHeightAndFlex = styled.div`
   ${tw`h-full flex`};
`

export const PageTitleAndObjectiveContainer = styled.div``

export const StyledCarousel = styled(Carousel)`
   ${props =>
      props.isZoomedOut &&
      `
      & li {
         min-width: 65%;
         margin:0px;
      }
   `}
`

export const ListsContainer = styled.div`
   ${tw`
        w-full h-full flex py-16px box-border overflow-y-auto flex-grow
    `}
   background-image: url('https://res.cloudinary.com/due4dmz2b/image/fetch/dpr_auto,w_auto,f_auto,q_auto/https://bss-backend-media-static.s3.ap-south-1.amazonaws.com/front-end/media/workbook-desktop-background.png');
   background-size: cover;
   background-position-y: center;
   ${customDevice(320, 345)} {
      ${tw`mt-80px`}
   }

   ${minDeviceWidth(1200)} {
      background-position-y: 85%;
   }
   ${mobile} {
      ${(props): TwStyle =>
         props.shouldDisplayViewInChromeMessageBanner
            ? tw`mt-122px`
            : tw`mt-56px`}
      background-image: url('https://res.cloudinary.com/due4dmz2b/image/fetch/dpr_auto,w_auto,f_auto,q_auto/https://bss-backend-media-static.s3.ap-south-1.amazonaws.com/front-end/media/workbook-mobile-background.png');
      background-position-x: center;
   }
   ${customDevice(416, 767)} {
      ${(props): TwStyle =>
         props.shouldDisplayViewInChromeMessageBanner
            ? tw`mt-104px`
            : tw`mt-56px`}
   }
   ${tablet} {
      background-position-x: center;
   }
   ${customDevice(900, 1024)} {
      background-position-y: 55%;
   }
`
export const ListParent = styled.div`
   ${tw`
        w-full h-auto flex select-none
    `};
   transition: all 0.3s;
   ${props =>
      props.isZoomedOut &&
      `
      height: auto;
      zoom: 65%;
      `}
`

export const WorkbookFooterContainer = styled.div`
   ${tw`
        w-full
    `}
`

export const EmptyWorkbookContainer = styled.div`
   ${tw`
        w-screen h-screen
    `}
`

export const AddListButton = styled.button`
   ${tw`
        flex items-center self-center mx-auto p-8px focus:outline-none border border-solid
        rounded-4px border-lightBlueGrey
    `}
`

export const ButtonText = styled(Typo14BlackHKGroteskRegular)`
   ${tw`
        ml-8px
    `}
`

export const ListsDroppable = styled.div`
   ${tw`
        flex flex-grow
    `};
   ${isMobileDevice && `flex-grow:none; height: max-content;`}
   ${props => isMobileDevice && `max-height:${props.listContainerMaxHeight}px;`}
   ${props =>
      props && isTabletDevice && !props.isDraggingInProgress
         ? `-webkit-transform: translate3d(0, 0, 0); `
         : `-webkit-transform: none`}
`
// NOTE: Here -webkit-transform: translate3d(0, 0, 0); is added as ipad fix for cards clipping when scrolling outside of viewport

export const ListDraggableContainer = styled.div`
   ${tw`
        w-full flex-grow h-full px-8px
    `};
   ${props => !props.isZoomedOut && isMobileDevice && tw`px-16px`}
   ${customDevice(760, 1023)} {
      width: calc((100vw - 72px) / 2);
   }

   ${customDevice(1024, 1280 - 1)} {
      width: calc((100vw - 72px) / 3);
   }
   ${minDeviceWidth(1279)} {
      width: calc((100vw - 72px) / 4);
   }
`

export const MobileWorkbookFooter = styled.div`
   ${tw`
       w-full py-12px pl-12px flex justify-between items-center
    `}
`

export const ShowPagesButton = styled(Button)`
   ${tw`
        w-48px h-48px flex items-center justify-center bg-darkBlueGrey p-0
    `};
   flex-shrink: 0;
   ${props => (props.shouldHidePagesButton ? tw`invisible` : tw`visible`)}
`

export const PrimaryButton = styled(Button)`
   ${tw`
     w-95 h-40px flex items-center justify-center  py-12px bg-brightBlue
   `}
`

export const PrimaryButtonText = styled(Typo14WhiteHKGroteskSemiBold)`
   ${tw`
      ml-8px
   `}
`

export const DrawerTitleText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)``

export const ViewResultsButton = styled.button`
   ${tw`
      bg-transparent border-none focus:outline-none
   `}
`
export const MobileViewResultsButton = styled(Button)`
   ${tw`
       focus:outline-none w-95 h-40px flex items-center justify-center  py-12px bg-brightBlue
   `}
`

export const MobileViewResultsButtonText = styled(
   Typo14WhiteHKGroteskSemiBold
)``

export const ViewResultsButtonText = styled(Typo14BrightBlueHKGroteskSemiBold)``

export const AssignmentWorkbookButtonContainer = styled.div`
   ${tw` flex justify-center items-center w-full px-6px mt-24px`};
`
export const ZoomingButton = styled(Button)`
   ${tw`bg-darkBlueGrey h-48px w-48px focus:outline-none p-0 mr-16px rounded-100% flex-shrink-0 flex items-center justify-center`}
`

export const DotsContainer = styled('div')`
   ${tw`
         h-full flex flex-wrap items-center justify-center mx-6
    `}
`
export const DotElement = styled('div')`
   ${tw`
         w-2 h-2 rounded bg-brightBlue30 focus:outline-none m-2 rounded-50%
    `};
   ${props => props.isSelected && tw`bg-blue`}
`

export const MobileWorkbookFooterWithAssignmentButton = styled.div`
   ${tw`
      w-full flex flex-col fixed bottom-0
   `}
`
