import tw, { styled } from 'twin.macro'

import LeftArrow from '../../icons/ArrowLeftIcon'

export const RightArrow = styled(LeftArrow)`
   transform: rotate(180deg);
`

export const SliderContainer = styled.div`
   ${tw`h-auto p-36px`}
   ${props => props.css};
`
