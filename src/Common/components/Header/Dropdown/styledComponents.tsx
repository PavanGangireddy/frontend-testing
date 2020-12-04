import styled from 'styled-components'

import { DROP_DOWN_CONTENT_CONTAINER_Z_INDEX } from '../../../constants/ZIndexConstants'

export const DropDownContainer = styled.div`
   position: relative;
   display: inline-block;
   cursor: pointer;
   margin-left: 10px;
   margin-right: 10px;
`

export const DropDownContentContainer = styled.div`
   display: ${props => (props.isHovered ? 'block' : 'none')};
   position: absolute;
   top: 37px;
   right: 0px;
   z-index: ${DROP_DOWN_CONTENT_CONTAINER_Z_INDEX};
`

export const DropDownView = styled.div`
   display: flex;
`
