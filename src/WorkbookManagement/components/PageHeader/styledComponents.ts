import tw, { css, styled, TwStyle } from 'twin.macro'

import {
   Typo20DarkBlueGreyHKGroteskMedium,
   Typo14SteelHKGroteskRegular,
   Typo18WhiteHKGroteskMedium,
   Typo12BrightBlueHKGroteskSemiBold
} from '../../../Common/styleGuide/Typos'
import colors from '../../../Common/themes/Colors'
import DecrementTimer from '../../../Common/components/DecrementTimer'
import { RED_ZONE_CONSTANT } from '../../../Common/constants/UIConstants'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

export const PageHeaderContainer = styled.div`
   ${tw`
        flex flex-col p-16px bg-white shadow relative
    `}
   ${({ isMergeActive }): TwStyle =>
      isMergeActive
         ? tw`pointer-events-none opacity-50`
         : tw`pointer-events-auto opacity-100`}
         ${(props): TwStyle =>
            props.shouldDisplayViewInChromeMessageBanner
               ? tw`mt-80px`
               : tw`mt-0px`}
`

export const SubContainer = styled.div`
   ${tw`
      flex
   `}
`

export const PageTitleAndDescription = styled.div`
   ${tw`
      flex-grow mr-16px
   `}
   ${({ shouldDisablePointerEvents }): TwStyle =>
      shouldDisablePointerEvents
         ? tw`pointer-events-none`
         : tw`pointer-events-auto`}
`

export const PageDescriptionContainer = styled.div`
   ${tw` max-h-150px overflow-auto`}
`

export const PageObjective = styled(Typo20DarkBlueGreyHKGroteskMedium)``

export const PageDescription = styled(Typo14SteelHKGroteskRegular)`
   ${tw`
        mt-8px
    `}
`

export const ToggleButtonContainer = styled.div`
   ${tw`
        w-6 h-6 flex items-center justify-center p-4px rounded-full  border border-solid
        border-lightBlueGrey  absolute -bottom-10px right-12 cursor-pointer
    `}
   ${({ isCollapsed }) => (isCollapsed ? tw`bg-brightBlue` : tw`bg-white`)}
`

export const headingTextAreaCss = css`
   ${tw`border-0 h-30px text-20px text-darkBlueGrey font-medium`}
`

export const descriptionTextAreaCss = css`
   ${tw`border-0 h-20px text-14px text-steel`}
`

export const PageDescriptionCss = css`
   ${tw`mb-5px`}
`

export const DropDownContainer = styled.div`
   ${({ isCollapsed }) => (isCollapsed ? `transform: rotate(180deg)` : ``)}
`

export const ClipboardIconContainer = styled.div`
   ${tw`
      flex items-start
   `}
`

export const ButtonContainer = styled.div`
   ${tw`
       flex items-center justify-end
   `};
   width: 150px;
`

export const NavBarLeftSection = styled.div`
   ${tw`
      w-1/6 h-full flex items-center justify-center
   `}
`

export const PageObjectiveContainer = styled.div`
   ${tw`
      w-4/6 h-full flex items-center justify-between
   `}
   ${isMobileDevice && tw`w-3/5`}
`

export const PageObjectiveIconContainer = styled.div`
   ${tw`
      ml-8px
   `}
`

export const ObjectiveText = styled(Typo18WhiteHKGroteskMedium)`
   ${tw`
      truncate
   `}
   ${({ isEmpty }): TwStyle => (isEmpty ? tw`opacity-50` : tw`opacity-100`)}
`

export const NavBarRightSection = styled.div`
   ${tw`
      w-1/6 h-full flex items-center justify-end ml-auto
   `}
`

export const MoreIconContainer = styled.div`
   ${tw`
      transform rotate-90
   `}
`

export const RotateOneEighty = styled.div`
   ${tw`
      transform rotate-180
   `}
`

export const AssignmentActionsWrapper = styled.div`
   ${tw`flex items-start`}
   ${({ isAssignmentWorkbook, isCreator }): TwStyle =>
      !isAssignmentWorkbook && !isCreator ? tw`hidden` : tw`flex`}
`

export const DecrementTimeWrapper = styled.div`
   ${tw`flex flex-col justify-end min-w-125px items-center mr-16px`};
   ${isMobileDevice && tw`mr-0 ml-auto `}
`

export const TimeLeftTitle = styled(Typo12BrightBlueHKGroteskSemiBold)`
   ${({ progress }) =>
      progress <= RED_ZONE_CONSTANT
         ? tw`text-neonRed`
         : isMobileDevice
         ? tw`text-white`
         : tw`text-brightBlue`}
`

export const ProgressBar = styled.div`
   ${tw`flex w-full h-6px `}
   ${({ progress }) =>
      progress <= RED_ZONE_CONSTANT ? tw`bg-neonRed` : tw`bg-brightBlue`}
   ${isMobileDevice && tw`justify-end`}
`
export const StatusContainer = styled.div`
   ${tw`h-full`}
   -webkit-transition: width 1s;
   transition: width 1s;
   transition-timing-function: linear;
   width: ${props => `${100 - props.progress}%`};
   background-color: ${props =>
      props.isExamStarted ? colors.white : colors.brightBlue};
`

export const DecrementTimerComponent = styled(DecrementTimer)`
   ${tw`text-24px text-brightBlue font-hkGrotesk select-none`}
   ${({ progress }) =>
      progress <= RED_ZONE_CONSTANT
         ? tw`text-neonRed`
         : isMobileDevice
         ? tw`text-white`
         : tw`text-brightBlue`}

   ${isMobileDevice && tw`text-18px`}
`

export const MobileProgressBar = styled.div`
   ${tw`fixed w-full top-56px`};
`
