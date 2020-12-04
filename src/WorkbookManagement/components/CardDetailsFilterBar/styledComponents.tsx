import tw, { styled, TwStyle } from 'twin.macro'

import { tablet } from '../../../Common/utils/MixinUtils'

import { Typo14SteelHKGroteskBold } from '../../../Common/styleGuide/Typos'

export const FilterBar = styled.div`
   ${tw`flex bg-white flex-col p-16px md:p-0 md:flex-row items-start md:items-start border-0 border-t border-b
    border-solid border-lightBlueGrey mt-8px md:my-0px md:mt-24px md:border-0 md:min-h-97px`};
   ${({ shouldDisablePointerEvents }): TwStyle =>
      shouldDisablePointerEvents
         ? tw`pointer-events-none`
         : tw`pointer-events-auto`};
`

export const SubFilterContainer = styled.div`
   ${tw`flex w-64`};
`

export const PriorityGroupContainer = styled.div`
   ${tw`flex w-64 flex-col md:-ml-4 mt-16px md:mt-0`}
   ${tablet} {
      ${tw`-ml-8`}
   }
`

export const DatePickerContainer = styled.div`
   ${tw`hidden md:flex  w-64 flex-col -ml-16`}
   ${tablet} {
      ${tw`-ml-73px`}
   }
`

export const DeleteIconDivision = styled.div`
   ${tw`flex items-center h-6 cursor-pointer ml-8px md:-ml-116px -mt-2px`}
`

export const FilterTitle = styled(Typo14SteelHKGroteskBold)`
   ${tw`flex uppercase mt-2px`}
`

export const DeleteIconContainer = styled.div`
   ${tw`flex items-center mx-8px cursor-pointer`}
`

export const PriorityGroupWrapper = styled.div`
   ${tw`flex items-center justify-center my-10px md:my-0 min-h-24px md:h-50px`}
`

export const DateTimePickerWrapper = styled.div`
   ${tw`flex items-center h-50px `}
`
