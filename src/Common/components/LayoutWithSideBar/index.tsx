import React, { Component, ReactElement, ReactNode } from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { APIStatus, API_SUCCESS } from '@ib/api-constants'

import SideBar from '../SideBar'
import MobileNavBar from '../MobileNavBar'

import HamburgerIcon from '../../icons/HamburgerIcon'
import { isMobileDevice } from '../../utils/responsiveUtils'
import ChromeBannerUIStore from '../../stores/ChromeBannerUIStore'

import IconContainer from '../IconContainer'
import MobileSideNavBar from '../MobileSideNavbar/MobileSideNavBar'

import {
   LayoutContainer,
   SideBarContainer,
   LayoutAndSideBarContainer,
   LeftEnhancerContainer
} from './styledComponents'

interface LayoutWithSideBarProps {
   collapsedHeaderView: React.ReactNode
   expandedHeaderView: React.ReactNode
   collapsedFooterView: React.ReactNode
   expandedFooterView: React.ReactNode
   status: APIStatus
   error: any
   retryFunction: () => void
   searchBar: () => ReactElement | null
}

interface InjectedProps extends LayoutWithSideBarProps {
   chromeBannerUIStore: ChromeBannerUIStore
}

@inject('chromeBannerUIStore')
@observer
class LayoutWithSideBar extends Component<LayoutWithSideBarProps> {
   @observable isCollapsed: boolean
   mobileSideNavBarRef

   staticDefaultProps = {
      status: API_SUCCESS,
      error: null,
      retryFunction: () => {},
      searchBar: () => <div>searchBar</div>
   }
   constructor(props) {
      super(props)
      this.isCollapsed = false
      this.mobileSideNavBarRef = React.createRef()
   }

   toggleSideBarView = (): void => {
      this.isCollapsed = !this.isCollapsed
   }

   onClickOpenMobileSideNavBar = (): void => {
      this.mobileSideNavBarRef.current.onClickOpenMobileSideNavBar()
   }

   renderLeftEnhancer(): ReactElement {
      const { status } = this.props
      return (
         <LeftEnhancerContainer
            onClick={this.onClickOpenMobileSideNavBar}
            shouldDisableClick={status}
         >
            <IconContainer>
               <HamburgerIcon />
            </IconContainer>
         </LeftEnhancerContainer>
      )
   }

   renderDesktopSideBar = (): ReactNode => {
      const {
         collapsedHeaderView,
         expandedHeaderView,
         collapsedFooterView,
         expandedFooterView,
         status,
         error,
         retryFunction
      } = this.props
      const {
         shouldDisplayViewInChromeMessageBanner
      } = this.getChromeBannerUIStore()

      return (
         <SideBarContainer>
            <SideBar
               collapsedHeaderView={collapsedHeaderView}
               expandedHeaderView={expandedHeaderView}
               collapsedFooterView={collapsedFooterView}
               expandedFooterView={expandedFooterView}
               isCollapsed={this.isCollapsed}
               onClickSideBarToggleButton={this.toggleSideBarView}
               status={status}
               error={error}
               retryFunction={retryFunction}
               shouldDisplayViewInChromeMessageBanner={
                  shouldDisplayViewInChromeMessageBanner
               }
            />
         </SideBarContainer>
      )
   }

   renderMobileNavBar = (): ReactNode => {
      const {
         expandedHeaderView,
         expandedFooterView,
         status,
         error,
         retryFunction,
         searchBar
      } = this.props
      const {
         shouldDisplayViewInChromeMessageBanner
      } = this.getChromeBannerUIStore()
      return (
         <>
            <MobileNavBar
               renderLeftEnhancer={this.renderLeftEnhancer()}
               renderBody={searchBar}
            />
            <MobileSideNavBar
               expandedHeaderView={expandedHeaderView}
               expandedFooterView={expandedFooterView}
               status={status}
               error={error}
               retryFunction={retryFunction}
               ref={this.mobileSideNavBarRef}
               shouldDisplayViewInChromeMessageBanner={
                  shouldDisplayViewInChromeMessageBanner
               }
            />
         </>
      )
   }

   renderNavBar = (): ReactNode => {
      if (isMobileDevice) {
         return this.renderMobileNavBar()
      }
      return this.renderDesktopSideBar()
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getChromeBannerUIStore = () => this.getInjectedProps().chromeBannerUIStore

   render(): React.ReactNode {
      const { children } = this.props
      const {
         shouldDisplayViewInChromeMessageBanner
      } = this.getChromeBannerUIStore()
      return (
         <LayoutAndSideBarContainer>
            {this.renderNavBar()}
            <LayoutContainer
               isCollapsed={this.isCollapsed}
               shouldDisplayViewInChromeMessageBanner={
                  shouldDisplayViewInChromeMessageBanner
               }
            >
               {children}
            </LayoutContainer>
         </LayoutAndSideBarContainer>
      )
   }
}

export default LayoutWithSideBar
