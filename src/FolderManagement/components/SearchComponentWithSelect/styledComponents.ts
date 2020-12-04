import tw, { css, styled } from 'twin.macro'

import { Typo12DarkBlueGreyHKGroteskMedium } from '../../../Common/styleGuide/Typos'
import { mobile } from '../../../Common/utils/MixinUtils'

export const SearchIconContainer = styled.div`
   ${tw`absolute top-10px left-15px`}
`

export const searchFieldContainerCSS = css`
   ${tw`w-8/12 ml-0 mt-0 flex justify-center items-center py-8px`}
   ${mobile} {
      ${tw`w-80 ml-16px`}
   }
`

export const searchFieldCSS = css`
   ${tw`h-48px rounded-8px border-default border-solid border-lightBlueGrey`}
   .Select-container {
      ${tw`h-46px`}
   }
   .Select__control {
      ${tw`h-46px relative rounded-8px`}
   }
   .Select__indicators {
      ${tw`pl-0 pr-0`}
   }
   .Select__value-container {
      ${tw`ml-48px pl-0px`}
   }
   .Select__clear-indicator {
      ${tw`cursor-pointer`}
   }
   ${mobile} {
      ${tw`h-40px border-none bg-transparent w-full`}
      .Select-container {
         ${tw`h-38px`}
      }
      .Select__control {
         ${tw`h-38px relative bg-darkBlueGrey`}
      }
      .Select__input {
         ${tw`text-white`}
      }
      .Select__value-container {
         ${tw`ml-40px pl-0px `}
      }
      .Select__control--is-focused {
         ${tw`border-none shadow-none`}
      }
      .Select_placeholder {
         ${tw`text-coolGrey`}
      }
   }
`

export const GotoPage = styled(Typo12DarkBlueGreyHKGroteskMedium)`
   ${tw`no-underline flex items-center pointer-events-none`}
`

export const IconContainer = styled.div`
   ${tw`pr-10px`}
`
