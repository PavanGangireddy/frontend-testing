import styled from 'styled-components'

import Colors from '../../themes/Colors'
// import {
//    Typo13WhiteRobotoMedium,
//    Typo12MarineBlueTwoRobotoMedium
// } from '../../styleGuide/Typos'
import TopicArrow from '../../icons/TopicArrow'

export const Container = styled.div`
   display: flex;
   align-items: stretch;
`

export const PageContainer = styled.div`
   width: 32px;
   height: 32px;
   margin-left: 9px;
   user-select: none;
   border: solid 1px
      ${props => (props.isActive ? Colors.primary500Default : Colors.basic600)};
   color: ${props =>
      props.isActive ? Colors.primary500Default : Colors.basic600};
   opacity: ${props => (props.isEnabled ? 1 : 0.5)};
   cursor: ${props => (props.isEnabled ? 'pointer' : 'auto')};
   display: flex;
   justify-content: center;
   align-items: center;
`

export const LeftArrowButton = styled(PageContainer)`
   border-bottom-left-radius: 20%;
   border-top-left-radius: 20%;
`

export const RightArrowButton = styled(PageContainer)`
   border-bottom-right-radius: 20%;
   border-top-right-radius: 20%;
`

export const PageText = styled.p`
   color: ${props =>
      props.isActive ? Colors.primary500Default : Colors.basic600};
   line-height: 0.92;
`

export const LeftArrowIcon = styled(TopicArrow)``

export const LeftArrowContainer = styled.div`
   transform: rotate(180deg);
`

export const RightArrowIcon = styled(TopicArrow)``

export const MainContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
`

export const ItemsCountText = styled.p`
   text-transform: uppercase;
`
