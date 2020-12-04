import tw, { styled, css } from 'twin.macro'

export const MobileActiveAssignmentRowContainer = styled.div`
   ${tw`w-full flex items-center justify-between pr-0 md:pr-16px`}
`
export const progressIndicatorContainerCss = css`
   ${tw`self-center`}
`

export const RightSection = styled.div`
   ${tw`
      w-3/12 flex justify-end
   `}
`

export const EmptyCell = styled.div`
   ${tw`
      mr-15px sm:mr-0
   `}
`
