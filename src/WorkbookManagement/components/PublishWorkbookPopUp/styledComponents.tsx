import tw, { styled, css } from 'twin.macro'

import {
   Typo12DarkBlueGreyHKGroteskSemiBold,
   Typo12SteelHKGroteskSemiBold,
   Typo14WhiteHKGroteskSemiBold,
   Typo12PinkishOrangeHKGroteskRegular
} from '../../../Common/styleGuide/Typos'
import BlackCloseIcon from '../../../Common/icons/BlackCloseIcon'
import Button from '../../../Common/components/Button'
import BaseInput from '../../../Common/components/BaseInput'

interface ErrorTextTypes {
   isError: boolean
}

export const MainContainer = styled.div`
   ${tw`w-464px p-24px`}
`
export const Header = styled.div`
   ${tw`flex justify-between`}
`

export const PublishWorkbookTitle = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
   ${tw`uppercase leading-1.33`}
`
export const CloseIcon = styled(BlackCloseIcon)`
   ${tw`cursor-pointer`}
`

export const Divider = styled.div`
   ${tw`mt-16px border-0 border-b border-solid border-lightBlueGrey`}
`

export const BodyContainer = styled.div`
   ${tw`mt-24px flex flex-col`}
`

export const Title = styled(Typo12SteelHKGroteskSemiBold)`
   ${tw`uppercase leading-1.33`};
`

export const EvaluationTypeContainer = styled.div`
   ${tw`flex mt-16px`}
`

// FIXME: need to update font family
export const RadioItemCSS = css`
   ${tw`cursor-pointer text-steel text-12px font-hkGrotesk select-none`}
`

export const RadioItemsContainerCSS = css`
   ${tw`flex justify-between w-48 `}
`

export const SubContainer = styled.div`
   ${tw`flex flex-col mt-24px`}
`

export const DurationInputBox = styled(BaseInput)`
   ${tw`w-175px `}
`

export const DurationTitle = styled(Title)`
   ${tw` mr-2`}
`

export const UsersGroupContainer = styled.div`
   ${tw`flex flex-col`}
`

export const SelectFieldContainerCSS = css`
   ${tw`
       mt-4 h-auto border border-lightBlueGrey rounded-2px
   `}
   .Select-container {
      ${tw`h-40px`}
   }
   .Select__control {
      ${tw`min-h-40px h-40px bg-white rounded-2px`}
   }
   .Select__option--is-focused {
      ${tw`bg-whiteTwo hover:bg-paleGrey outline-none`};
   }
   .Select__option--is-selected {
      ${tw`bg-whiteTwo hover:bg-paleGrey outline-none`};
   }
   .Select__menu {
      ${tw`z-10`}
   }
   .Select__single-value {
      ${tw`text-14px`}
   }
`

export const Footer = styled.div`
   ${tw`flex justify-end`}
   ${({ isEvaluation }) => (isEvaluation ? tw`mt-16px` : tw`mt-96px`)}
`

export const PublishButton = styled(Button)`
   ${tw`flex items-center justify-center w-110px h-40px bg-brightBlue`}
`

export const PublishButtonText = styled(Typo14WhiteHKGroteskSemiBold)`
   ${tw`pl-8px`}
`
export const DatePickerContainer = styled.div`
   ${tw`flex flex-col w-full `};
`

export const DateTimePickerWrapper = styled.div`
   ${tw`flex items-center mt-2`}
   .react-datepicker__input-container > input {
      width: 100%;
   }
`

export const EvaluationTypeWrapper = styled.div`
   ${tw`flex flex-col mt-16px`}
`

export const ErrorText = styled(Typo12PinkishOrangeHKGroteskRegular)<
   ErrorTextTypes
>`
   ${tw`leading-2.03 tracking-0.11px pointer-events-none`}
   ${({ isError }) => (isError ? tw`flex` : tw`hidden`)}
`

export const DateWrapper = styled.div`
   ${tw`flex w-full justify-between`}
`
