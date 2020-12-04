import React, { ReactNode, Component, ReactElement } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { APIStatus, API_SUCCESS } from '@ib/api-constants'

import RightArrowIcon from '../../icons/RightArrowIcon'
import Colors from '../../themes/Colors'

import LoadingWrapper from '../LoadingWrapper'
import FailureView from '../LoadingWrapper/FailureView'

import {
   SideBarContainer,
   SideBarSection,
   RightArrowIconContainer,
   SideBarFooterSection,
   FailureViewCSS,
   ContainerStyle
} from './styledComponents'

interface SideBarProps {
   collapsedHeaderView: React.ReactNode
   expandedHeaderView: React.ReactNode
   collapsedFooterView: React.ReactNode
   expandedFooterView: React.ReactNode
   isCollapsed: boolean
   onClickSideBarToggleButton: () => void
   status: APIStatus
   error: any
   retryFunction: () => void
   shouldDisplayViewInChromeMessageBanner: boolean
}

@observer
class SideBar extends Component<SideBarProps> {
   @observable isHovered = false

   staticDefaultProps = {
      status: API_SUCCESS,
      error: null,
      retryFunction: () => {}
   }
   renderHeaderView = (): ReactNode => {
      const {
         collapsedHeaderView,
         expandedHeaderView,
         isCollapsed
      } = this.props
      return isCollapsed ? collapsedHeaderView : expandedHeaderView
   }

   renderFooterView = (): ReactNode => {
      const {
         collapsedFooterView,
         expandedFooterView,
         isCollapsed
      } = this.props
      return isCollapsed ? collapsedFooterView : expandedFooterView
   }

   getFillColor = () => (this.props.isCollapsed ? Colors.white : Colors.black)

   renderIcon = (): ReactNode => (
      <RightArrowIconContainer isCollapsed={this.props.isCollapsed}>
         <RightArrowIcon width={12} height={12} fill={this.getFillColor()} />
      </RightArrowIconContainer>
   )

   setHoverState = () => {
      this.isHovered = true
   }

   resetHoverState = () => {
      this.isHovered = false
   }

   renderFailureView = (onRetry, failureText, showButton) => (
      <FailureView
         onRetry={onRetry}
         failureText={failureText}
         showButton={showButton}
         failureViewCSS={FailureViewCSS}
      />
   )

   renderSuccessUI = observer(
      (): ReactElement => {
         const {
            isCollapsed,
            onClickSideBarToggleButton,
            shouldDisplayViewInChromeMessageBanner
         } = this.props
         return (
            <SideBarContainer
               isCollapsed={isCollapsed}
               shouldDisplayViewInChromeMessageBanner={
                  shouldDisplayViewInChromeMessageBanner
               }
            >
               <SideBarSection>{this.renderHeaderView()}</SideBarSection>
               <SideBarFooterSection>
                  {this.renderFooterView()}
               </SideBarFooterSection>
            </SideBarContainer>
         )
      }
   )

   render(): ReactNode {
      const {
         status,
         error,
         retryFunction,
         isCollapsed,
         shouldDisplayViewInChromeMessageBanner
      } = this.props
      return (
         <SideBarContainer
            isCollapsed={isCollapsed}
            shouldDisplayViewInChromeMessageBanner={
               shouldDisplayViewInChromeMessageBanner
            }
         >
            <LoadingWrapper
               apiStatus={status}
               apiError={error}
               onRetry={retryFunction}
               renderSuccessUI={this.renderSuccessUI}
               failureMessageTestId='failureMessage'
               retryButtonTestId='retryButton'
               loaderTestId='loader'
               renderFailureView={this.renderFailureView}
               containerStyle={ContainerStyle}
            />
         </SideBarContainer>
      )
   }
}

export default SideBar
