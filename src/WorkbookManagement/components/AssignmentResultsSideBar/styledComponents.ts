import tw, { styled } from 'twin.macro'

import {
   Typo12SteelHKGroteskSemiBold,
   Typo20DarkBlueGreyHKGroteskBold,
   Typo16DarkBlueGreyHKGroteskRegular,
   Typo12DarkBlueGreyHKGroteskRegular,
   Typo48BrightBlueHKGroteskLight
} from '../../../Common/styleGuide/Typos'
import { mobile } from '../../../Common/utils/MixinUtils'

export const AssignmentResultContainer = styled.div`
   ${tw`
        w-4/12 lg:w-3/12 xl:w-1/5 flex flex-col items-center p-24px border-0 border-l-4 border-solid border-brightBlue absolute bg-white shadow-shadowDarkGreyBlueEight
        right-0
    `}
   top:${({ workbookPageHeaderHeight }) => workbookPageHeaderHeight + 3}px;
   height: calc(100vh - ${({ workbookPageHeaderHeight }) =>
      workbookPageHeaderHeight + 3}px);
`

export const ResultHeader = styled.div`
   ${tw`
        w-full flex items-center justify-between
    `}
`

export const ResultTitle = styled(Typo20DarkBlueGreyHKGroteskBold)``

export const ResultCloseButton = styled.button`
   ${tw`
        p-0 bg-transparent border-none focus:outline-none cursor-pointer
    `}
`

export const ScoreLabelContainer = styled.div`
   ${tw`
        mt-48px mb-24px self-start
    `}
`

export const ScoreText = styled(Typo12SteelHKGroteskSemiBold)`
   ${tw`uppercase tracking-0.12px leading-1.33`}
`

export const FlexWrapper = styled.div`
   ${tw`
      w-full w-full flex-no-wrap
   `}
`
export const SingleChart = styled.div`
   ${tw`
      w-full relative
   `}
`

export const CircularChart = styled.svg`
   ${tw`
      block my-0 mx-auto max-w-full max-h-250px relative transform -rotate-90
   `}
`

export const CircularBackground = styled.path`
   fill: none;
   stroke: #b0cdfa;
   stroke-width: 2;
   stroke-linecap: round;
`

export const SemiCircle = styled.path`
   fill: none;
   stroke-width: 2;
   stroke-linecap: round;
   animation: progress 0.5s ease-out forwards;
   stroke: #0b69ff;
   @keyframes progress {
      0% {
         stroke-dasharray: 0 100;
      }
   }
`

export const ResultTextContainer = styled.div`
   ${tw`
      absolute top-32% left-50% transform -translate-x-1/2
   `}
   ${mobile} {
      ${tw`top-40%`}
   }
`

export const SecuredScoreText = styled(Typo48BrightBlueHKGroteskLight)`
   ${tw`text-40px `}
`

export const TotalScoreText = styled(Typo12DarkBlueGreyHKGroteskRegular)``

export const Section = styled.div`
   ${tw`
        flex justify-center items-center mb-24px
    `}
`

export const IconContainer = styled.div`
   ${tw`
        mr-12px
    `}
`

export const TextLabel = styled(Typo16DarkBlueGreyHKGroteskRegular)`
   ${tw`
        ml-4px
    `}
`

export const NumberLabel = styled(Typo16DarkBlueGreyHKGroteskRegular)``

export const MobileSingleChart = styled(SingleChart)`
   ${tw`
      max-h-200px
   `}
`
