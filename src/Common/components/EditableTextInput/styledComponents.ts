import tw, { css, styled } from 'twin.macro'

import { Typo16DarkBlueGreyHKGroteskMedium } from '../../styleGuide/Typos'

import TextInput from '../TextInput'

export const Container = styled.div`
   ${tw`flex flex-1 px-16px py-0px cursor-text select-none`}
`

export const InputBox = styled(TextInput)`
   ${tw`m-0px flex-1 overflow-hidden`}
`

export const StyledEditableText = styled(Typo16DarkBlueGreyHKGroteskMedium)`
   ${tw`leading-normal m-0px`}
`

export const containerCSS = css`
   ${tw`flex`}
`
