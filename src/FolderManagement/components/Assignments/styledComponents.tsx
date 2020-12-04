import tw, { css, styled } from 'twin.macro'

import { Typo12SteelHKGroteskSemiBold } from '../../../Common/styleGuide/Typos'
import { mobile } from '../../../Common/utils/MixinUtils'
import colors from '../../../Common/themes/Colors'

export const ContainerStyle = css`
   ${tw`
      bg-whiteTwo flex flex-col items-start justify-start flex-grow-0 pl-16px pr-32px pt-24px `};
   ${mobile} {
      ${tw` p-16px`}
   }
   background: linear-gradient(
         to bottom,
         ${colors.whiteTwo},
         rgba(251, 251, 251, 0.5)
      ),
      url('https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/e87682d8-c247-4830-ad1f-8e40dcd800c7.svg')
         no-repeat;
   background-position-y: bottom;
   background-position-x: center;
   ${props =>
      props.hasAssignments
         ? ``
         : `
      background:none;
      `}
   ${mobile} {
      height: calc(100vh - 57px);
      background-size: contain;
   }
`

export const AssignmentsContainer = styled.div`
   ${tw`
      p-16px md:p-32px h-full flex flex-col overflow-auto
   `};

   background: linear-gradient(
         to bottom,
         ${colors.whiteTwo},
         rgba(251, 251, 251, 0.5)
      ),
      url('https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/e87682d8-c247-4830-ad1f-8e40dcd800c7.svg')
         no-repeat;
   background-position-y: bottom;
   background-position-x: center;
   ${props =>
      props.hasAssignments
         ? ``
         : `
      background:none;
      `}
   ${mobile} {
      height: calc(100vh - 57px);
      background-size: contain;
   }
`

export const AssignmentNameLabelContainer = styled.div`
   width: 30%;
   flex-grow: 2;
`

export const AssignmentDateTimeLabelContainer = styled.div`
   width: 20%;
   flex-grow: 1.5;
`

const CommonStylings = styled.div`
   width: 15%;
   flex-grow: 1;
`

export const AssignmentScoreLabelContainer = styled(CommonStylings)``

export const AssignmentStatusLabelContainer = styled(CommonStylings)``

export const AssignmentLabelText = styled(Typo12SteelHKGroteskSemiBold)``

//TODO: need to create typos for the DMSerifDisplay
export const NoAssignmentsMessage = styled.div`
   ${tw`
      text-darkBlueGrey mb-190px text-24px md:text-32px mt-64px
   `};
   font-family: DMSerifDisplay;
   &:first-letter {
      text-transform: uppercase;
   }
`
export const NoAssignmentsView = styled.div`
   ${tw`
      m-0 flex-grow flex flex-col md:justify-end -mb-16px md:-mb-32px justify-between
   `};
`
export const NoAssignmentsImageContainer = styled.div`
   ${tw`mx-auto md:mb-2px`}
`
export const itemCSS = css`
   text-transform: capitalize;
   font-size: 14px;
   ${mobile} {
      font-size: 12px;
   }
`
export const WrapperCss = css`
   ${tw`w-full flex flex-col`}
   ${mobile} {
      ${tw`mb-1`}
   }
`

export const LoaderWrapper = styled.div`
   ${tw`my-16px w-full`}
`
