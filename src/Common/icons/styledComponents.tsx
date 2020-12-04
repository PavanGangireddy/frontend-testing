import styled from 'styled-components'

import { Typo12BlackHKGroteskRegular } from '../styleGuide/Typos'
import Colors from '../themes/Colors'

export const IconsContainer = styled.div`
   display: flex;
   flex-direction: row;
   background-color: pink;
   flex-wrap: wrap;
   height: 100%;
   margin: 20px;
   padding: 20px;
`

export const IconAndNameContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   border: solid 1px ${Colors.black};
   margin: 15px;
   height: 90px;
   min-width: 90px;
`

export const NameContainer = styled(Typo12BlackHKGroteskRegular)`
   border-top: solid 1px ${Colors.black};
   min-width: 90px;
   width: 100%;
   white-space: pre-wrap;
   text-align: center;
`

export const IconContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   height: 60px;
`
