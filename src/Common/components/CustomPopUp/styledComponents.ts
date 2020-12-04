/**
 * @flow
 */

import styled from 'styled-components'

import Colors from '../../themes/Colors'

import Button from '../Button'
import {
   Typo12DarkBlueGreyHKGroteskSemiBold,
   Typo14DarkBlueGreyHKGroteskRegular,
   Typo14DarkBlueGreyHKGroteskSemiBold,
   Typo14WhiteHKGroteskSemiBold
} from '../../styleGuide/Typos'

export const MainContainer = styled('div')`
   display: flex;
   flex-direction: column;
   background-color: ${Colors.white};
   box-shadow: 0 4px 16px 0 ${Colors.steel16};
   border: solid 1px ${Colors.lightBlueGrey};
   border-radius: 4px;
   max-width: 323px;
   padding: 25px;
   position: relative;
`

export const StyledIconContainer = styled('div')`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 16px;
   height: 16px;
   cursor: pointer;
   position: absolute;
   right: 24px;
   top: 24px;
`

export const PopupHeading = styled(Typo12DarkBlueGreyHKGroteskSemiBold)`
   line-height: 1.33;
   letter-spacing: normal;
`

export const ContentMainContainer = styled('div')`
   display: flex;
   flex-direction: column;
   margin-top: 24px;
`

export const DescriptionText = styled(Typo14DarkBlueGreyHKGroteskRegular)`
   line-height: 1.71;
   letter-spacing: normal;
`
export const FooterMainContainer = styled('div')`
   display: flex;
   flex-direction: row;
   justify-content: flex-end;
   margin-top: 24px;
`
export const SubmitBtn = styled(Button)`
   background-color: ${props => props.background};
`
export const SubmitBtnText = styled(Typo14WhiteHKGroteskSemiBold)`
   line-height: 1.71;
   letter-spacing: normal;
`

export const CancelBtn = styled(Button)`
   margin-right: 16px;
`
export const CancelBtnText = styled(Typo14DarkBlueGreyHKGroteskSemiBold)`
   letter-spacing: normal;
   line-height: 1.71;
`
