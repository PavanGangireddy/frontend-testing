import styled from 'styled-components'

import { mobile } from '../../utils/MixinUtils'

export const DateContainer = styled('div')`
   width: 210px;
   ${mobile} {
      margin-top: 8px;
   }
   flex-direction: column;
   display: flex;
   position: relative;
`

export const DatePickerAndIconWrapper = styled('div')`
   position: relative;
`

export const IconWrapper = styled('div')`
   z-index: 1;
   display: flex;
   position: absolute;
   top: 6px;
   left: 8px;
   bottom: 0px;
`

export const ErrorWrapper = styled('div')``
