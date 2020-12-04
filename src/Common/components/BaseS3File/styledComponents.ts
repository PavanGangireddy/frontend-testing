import styled from '@emotion/styled'
import tw from 'twin.macro'
// import { TextFontLabelBasic600 } from '../../styleGuide/Typos'

//TODO:should use typos
export const BaseImageContainer = styled.div`
   ${tw`cursor-pointer`};
   &:hover {
      border-color: gray;
   }
`

export const FileContainer = styled.div`
   display: none;
`

export const BaseImageWrapper = styled.div``

export const Label = styled.p`
   margin: 10px;
`

export const SuccessView = styled.p``
