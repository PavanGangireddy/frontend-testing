import tw, { styled, css } from 'twin.macro'

import {
   Typo12DarkBlueGreyHKGroteskSemiBold,
   Typo16SteelHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14WhiteHKGroteskSemiBold
} from '../../styleGuide/Typos'
import Button from '../Button'
import { customDevice } from '../../utils/MixinUtils'

export const Container = styled.div`
   ${tw`
        h-full flex flex-col justify-between
    `}
`

export const HeaderAndBody = styled.div``

export const Header = styled.div`
   ${tw`
        flex items-center py-8px border-0 border-b border-solid border-lightBlueGrey
    `}
`

export const BackButton = styled.button`
   ${tw`
        focus:outline-none bg-transparent border-none p-0 mr-12px cursor-pointer
    `}
`

export const TitleAndIconContainer = styled.div`
   ${tw`
        flex items-center
    `}
`

export const TitleText = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
   ${tw`
        ml-16px
    `}
`

export const DropDownsContainer = styled.div`
   ${tw`
        flex flex-wrap
    `}
`

export const DropDownAndLabelContainer = styled.div`
   width: 210px;
   ${tw`
        flex flex-col mt-24px mr-40px
    `}
   ${customDevice(320, 767)} {
      ${tw`
         w-full mr-32px
      `}
   }
`

export const DropDownLabel = styled(Typo16SteelHKGroteskSemiBold)``

export const DropDownContainer = styled.div`
   ${tw`
        mt-8px
    `}
`

export const SelectFieldCSS = css`
   ${tw`
       h-auto border border-lightBlueGrey rounded-2px mt-8px
   `}
   .Select-container {
      ${tw`h-auto`}
   }
   .Select__control {
      ${tw`h-32px min-h-0 px-10px bg-white rounded-2px`}
   }
   .Select__control--is-focused {
      ${tw`h-32px`}
   }
   .Select__value-container {
      ${tw`p-0 min-h-0`}
   }
   .Select__indicator {
      ${tw`p-0`}
   }
   .Select__placeholder {
      ${tw`text-12px`}
   }
   .Select__single-value {
      ${tw`text-12px tracking-normal`}
   }
   .Select__menu-list {
      ${tw`bg-white p-8px`};
   }
   .Select__option {
      ${tw`text-14px text-darkBlueGrey bg-white`}
   }
   .Select__option--is-focused {
      ${tw`bg-lightBlueGrey24`};
   }
`

export const ErrorSelectedFieldCSS = css`
   ${tw`
       h-auto border border-neonRed rounded-2px mt-8px
   `}
   .Select-container {
      ${tw`h-auto`}
   }
   .Select__control {
      ${tw`h-32px min-h-0 px-10px bg-white rounded-2px`}
   }
   .Select__control--is-focused {
      ${tw`h-32px`}
   }
   .Select__value-container {
      ${tw`p-0 min-h-0`}
   }
   .Select__indicator {
      ${tw`p-0`}
   }
   .Select__placeholder {
      ${tw`text-12px`}
   }
   .Select__single-value {
      ${tw`text-12px tracking-normal`}
   }
   .Select__menu-list {
      ${tw`bg-white p-8px`};
   }
   .Select__option {
      ${tw`text-14px text-darkBlueGrey bg-white`}
   }
   .Select__option--is-focused {
      ${tw`bg-lightBlueGrey24`};
   }
`

export const Footer = styled.div`
   ${tw`
        flex justify-end
    `}
   ${customDevice(320, 767)} {
      ${tw`
         shadow-moveBottomSectionShadow fixed bottom-0 left-0 w-full px-24px py-12px
      `}
   }
`

export const LeftButtonText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)``

export const LeftSideButton = styled(Button)``

export const RightSideButton = styled(Button)`
   ${tw`
        ml-16px
    `}
`

export const RightButtonText = styled(Typo14WhiteHKGroteskSemiBold)``
