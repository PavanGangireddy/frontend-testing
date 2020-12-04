import tw, { styled, TwStyle } from 'twin.macro'

import { LEFT } from '../../../constants/UIConstants'

export const SelectedCardsContainer = styled.div`
   ${props => (props.clickedSide === LEFT ? tw`left-8px` : tw`right-8px`)}
   ${tw`
        min-w-402px absolute top-65px rounded-4px shadow-lg bg-white z-50
    `}
`

export const CardContainer = styled.div`
   ${tw`
        flex justify-between items-center hover:bg-lightBlueGrey24 py-12px px-16px
        cursor-pointer
   `}
   ${({ isDisabled }): TwStyle =>
      isDisabled ? tw`opacity-50 cursor-not-allowed` : tw``}
`
