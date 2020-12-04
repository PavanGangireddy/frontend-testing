import tw, { styled, css, TwStyle } from 'twin.macro'

import SelectField from '../../../Common/components/SelectField'

export const HeaderContainer = styled.div`
   ${tw`flex justify-end items-center flex-wrap border-b py-4`}
   & > * {
      ${tw`mx-2`}
   }
`

export const RightSection = styled.div`
   ${tw`flex`}
`

export const DropDownContainerCss = css`
   ${tw`
        w-48 h-32px -mt-2px
   `}
`
export const LabelCss = css`
   ${tw`
       h-auto border border-lightBlueGrey rounded-2px
   `}
   .Select__control {
      ${tw`min-h-40px h-40px bg-white rounded-2px`}
   }
   .Select__option--is-focused {
      ${tw`bg-whiteTwo hover:bg-paleGrey outline-none`};
   }
   .Select__option--is-selected {
      ${tw`bg-whiteTwo hover:bg-paleGrey outline-none`};
   }
`

export const StyledDropDown = styled(SelectField)``

export const AddThreadContainer = styled.div`
   ${tw`ml-24px`};
   ${({ shouldDisablePointerEvents }): TwStyle =>
      shouldDisablePointerEvents
         ? tw`pointer-events-none`
         : tw`pointer-events-auto`}
`

export const SelectContainer = styled.div`
   ${({ isDisabled }): TwStyle =>
      isDisabled ? tw`cursor-not-allowed` : tw`cursor-auto`}
`
