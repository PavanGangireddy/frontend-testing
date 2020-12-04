import tw, { styled, css, TwStyle } from 'twin.macro'

import {
   Typo12SteelHKGroteskSemiBold,
   Typo12DarkBlueGreyHKGroteskSemiBold,
   Typo16BlackHKGroteskBold,
   Typo18DarkSlateBlueHKGroteskSemiBold
} from '../../../../Common/styleGuide/Typos'
import { mobile } from '../../../../Common/utils/MixinUtils'
import Button from '../../../../Common/components/Button'

export const FilterBarContainer = styled.div`
   ${tw`
        flex justify-between md:pb-16px border-0 border-b border-solid border-whiteTwo border-lightBlueGrey  mt-24px
    `}
   ${mobile} {
      ${tw`items-center mt-8px mx-8px`}
      ${({ pathInfo }): TwStyle =>
         pathInfo.length !== 0
            ? tw`border-none`
            : tw`border-0 border-b border-solid border-whiteTwo border-lightBlueGrey`}
   }
`

export const ProjectTitleBarContainer = styled.div``

export const ProjectsTitle = styled(Typo18DarkSlateBlueHKGroteskSemiBold)``

export const Section = styled.div`
   ${tw`
        flex items-center
    `}
`

export const SortIconAndLabelContainer = styled.div`
   ${tw`
      flex mr-6px
   `}
`

export const SortLabel = styled(Typo12SteelHKGroteskSemiBold)`
   ${tw`
   ml-8px
      uppercase
   `}
`

export const SelectContainerCSS = css`
   ${tw`
        w-99px h-40px
   `}
`

export const SharedWithMeSortContainerCSS = css`
   ${tw`w-175px h-40px `}
`

export const SelectFieldCSS = css`
   ${tw`
       h-auto border border-lightBlueGrey rounded-8px
   `}
   .Select__control {
      ${tw`min-h-40px h-40px bg-white rounded-8px`}
   }
   .Select__option--is-focused {
      ${tw`bg-whiteTwo hover:bg-paleGrey outline-none`};
   }
   .Select__option--is-selected {
      ${tw`bg-whiteTwo hover:bg-paleGrey outline-none`};
   }
   .Select__menu {
      ${tw` rounded-8px `}
   }
   .Select__menu-list {
      ${tw`rounded-8px `}
   }
`

export const VerticalLine = styled.div`
   ${tw`
      w-px h-16px ml-12px bg-steel
   `}
`

export const IconsContainer = styled.div`
   ${tw`
      w-auto flex justify-between
   `}
`

export const IconContainer = styled.div`
   ${tw`
      ml-10px cursor-pointer p-4px
   `}
`

export const Title = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
   ${tw`uppercase leading-1.33 tracking-0.12px`}
`

export const HomeTitleContainer = styled.div`
   ${tw`flex items-center`}
`

export const Home = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
   ${tw`p-1 rounded mx-1 hover:cursor-pointer border border-solid border-transparent hover:border-blueTwo hover:bg-paleGreySix pl-0 ml-0`}
`
export const Separator = styled.div`
   ${tw`p-1`}
`
export const TitleSection = styled.div`
   ${tw`flex items-end`}
   ${mobile} {
      ${tw``}
   }
`
export const ButtonWrapper = styled(Button)`
   ${tw`flex items-center`}
`
export const TextContainer = styled(Typo12DarkBlueGreyHKGroteskSemiBold)``

export const BreadCrumbContainer = styled.div`
   ${tw`
      flex items-center
   `}
`

export const HomeProjectContainer = styled.div`
   ${tw`
      flex items-center p-1 mr-4px rounded hover:cursor-pointer border border-solid border-transparent
      hover:border-blueTwo hover:bg-paleGreySix
   `}
`

export const ProjectName = styled(Typo16BlackHKGroteskBold)`
   ${tw`
      ml-8px
   `}
`
