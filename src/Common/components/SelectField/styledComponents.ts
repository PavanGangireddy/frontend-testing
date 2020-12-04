import tw, { styled, TwStyle } from 'twin.macro'
import Select from 'react-select'

export const SelectFieldContainer = styled.div`
   ${tw`w-full -mt-2`};
`

export const StyledSelectField = styled(Select)`
   ${tw`outline-none w-full h-50px p-0 rounded-5px bg-whiteTwo border-default border-solid border-black32 items-center justify-center`}
   ${({ isDisabled }): TwStyle => isDisabled && tw`bg-paleGreyFour `}
   ${({ isValid }): TwStyle =>
      !isValid ? tw`border-pinkishOrange` : tw`border-black32`}
     
   .Select-container {
      ${tw`h-48px`}
      
      
   }
   .Select__control {
      ${tw`h-48px border-default border-solid bg-whiteTwo border-none`}
      ${({ isValid }): TwStyle =>
         !isValid ? tw`border-pinkishOrange` : tw`border-steel`}
         
         
   }
   .Select__placeholder {
      ${tw`font-hkGrotesk select-none`}
      ${({ isDisabled }): TwStyle => isDisabled && tw`text-darkGreyBlueTwoSix`};
   }
   .Select__value-container {
      ${tw`p-0 pl-15px flex items-center cursor-text`};
   }
   .Select__single-value {
      ${tw`m-0 pl-2px font-hkGrotesk select-none text-16px leading-normal tracking-0.15px`}
      ${({ isDisabled }): TwStyle =>
         isDisabled ? tw`text-darkGreyBlueTwoSix` : tw`text-darkBlueGrey`};
   }
   .Select__indicator-separator {
      ${tw`opacity-0`};
   }
   .Select__dropdown-indicator {
      ${tw`p-0 pr-10px cursor-pointer text-steel`};
   }
   .Select__menu {
      ${tw`mt-5px p-0`};
      
   }
   .Select__menu-list {
      ${tw`p-0 border-default border-solid border-paleGrey max-h-150px shadow-shadowBlack12`}
   }
   .Select__option {
      ${tw`font-hkGrotesk select-none py-13.5px pr-0 pl-20px cursor-pointer text-dusk bg-whiteTwo`};
      
   }
   .Select__option--is-focused {
      ${tw`bg-paleGrey outline-none`};
   }
   .Select__option--is-selected {
      ${tw`bg-paleGrey outline-none`};
   }
   .Select__control--is-disabled {
      ${tw`border-0 border-black32 font-hkGrotesk select-none text-14px font-medium tracking-0.2px text-darkGreyBlueTwoSix`};
   }
   
`
