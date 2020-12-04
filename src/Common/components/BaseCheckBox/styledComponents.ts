import styled from 'styled-components'

import { Typo12BlackHKGroteskRegular } from '../../styleGuide/Typos'

export const CheckBoxLabel = styled(Typo12BlackHKGroteskRegular)`
   margin-left: 10px;
`

export const Input = styled.input`
   margin: 0px;
`

export const Label = styled.label`
   margin-top: 12px;
   display: flex;
   flex-direction: row;
   align-items: center;
   input {
      visibility: hidden;
      position: absolute;
   }
`

export const LabelComponentContainer = styled.div`
   margin-left: 11px;
`

export const CheckBoxImageContainer = styled.div`
   display: flex;
`
