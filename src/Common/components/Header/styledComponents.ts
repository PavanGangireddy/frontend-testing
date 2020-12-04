import styled, { css } from 'styled-components'

import Colors from '../../themes/Colors'
import { Typo12SteelHKGroteskSemiBold } from '../../styleGuide/Typos'
import { HEADER_MIN_HEIGHT } from '../../constants/UIConstants'

export const HeaderContainer = styled.header`
   display: flex;
   flex: 1;
   min-height: ${HEADER_MIN_HEIGHT}px;
   background-color: ${Colors.white};
   padding: 16px 24px;
   align-items: center;
   justify-content: space-between;
   box-sizing: border-box;
`

export const NavBar = styled.nav`
   display: flex;
   align-items: center;
   justify-content: center;
`

export const HomeButton = styled.a`
   background-color: ${Colors.white};
   cursor: pointer;
   margin-right: 40px;
`

export const HomeLabel = styled(Typo12SteelHKGroteskSemiBold)`
   line-height: 1.33;
   letter-spacing: 0.12px;
   text-transform: uppercase;
`

export const imageCSS = css`
   width: 40px;
   height: 40px;
   border-radius: 20px;
`
