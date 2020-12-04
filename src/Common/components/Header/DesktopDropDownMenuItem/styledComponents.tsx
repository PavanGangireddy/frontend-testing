import styled from 'styled-components'

import Colors from '../../../themes/Colors'
import { Typo16BlackHKGroteskRegular } from '../../../styleGuide/Typos/index'

export const DropdownContainer = styled('div')`
   background-color: ${Colors.white};
   box-shadow: 0 0 0 1px ${Colors.paleGreyFour},
      2px 6px 10px 0 ${Colors.black12};
   border-radius: 6px;
   margin-top: 20px;
   width: 141px;
   overflow: hidden;
`

export const DropDownItem = styled('div')``

export const DropDownText = styled(Typo16BlackHKGroteskRegular)`
   line-height: 1.35;
   text-align: left;
   cursor: pointer;
   padding: 13px 20px;
   color: ${props => props.isSelectedPage && Colors.brightBlue};
   font-weight:${props => props.isSelectedPage && 'bold'}
   :hover {
      background-color: ${Colors.paleGrey};
      text-decoration: none;
      font-weight: bold;
   }
   :focus {
      background-color: ${Colors.paleGrey};
      font-weight: bold;
   }
   @media (min-width: 1024px) and (max-width: 1250px) {
      font-size: 12px;
   }
`

export const Link = styled('a')`
   text-decoration: none;
   :hover {
      text-decoration: none;
   }
   :focus {
      text-decoration: none;
   }
`
