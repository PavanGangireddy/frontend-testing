import tw, { styled } from 'twin.macro'

import { Typo14SteelHKGroteskRegular } from '../../styleGuide/Typos'

export const DateAndTimeLabelContainer = styled.div`
   ${props => props.css}
`

export const Label = styled(Typo14SteelHKGroteskRegular)`
   ${tw`text-steel`}
   ${props => props.css}
`
