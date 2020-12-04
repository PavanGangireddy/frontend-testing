import tw, { css, styled } from 'twin.macro'

import {
   Typo16DarkBlueGreyHKGroteskMedium,
   Typo14Steel60HKGroteskRegular
} from '../../styleGuide/Typos'

import TextArea from '../TextArea'

export const Container = styled.div`
   ${tw`flex flex-1 px-16px py-0px cursor-text`}
`

export const InputBox = styled(TextArea)`
   ${tw`m-0px flex-1 overflow-hidden`};
`

export const StyledEditableText = styled(Typo16DarkBlueGreyHKGroteskMedium)`
   ${tw`leading-normal m-0px`}
`

export const containerCSS = css`
   ${tw`flex`}
`
export const PlaceholderTypo = styled(Typo14Steel60HKGroteskRegular)`
   ${tw`select-none`}
`
