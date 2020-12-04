import tw, { styled, TwStyle } from 'twin.macro'

export const StyledContainer = styled.div`
   ${tw`h-full mb-auto min-h-400px`}
   ${({ shouldDisablePointerEvents }): TwStyle =>
      shouldDisablePointerEvents
         ? tw`pointer-events-none`
         : tw`pointer-events-auto`}
`
