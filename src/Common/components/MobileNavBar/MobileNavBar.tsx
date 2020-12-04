import React, { Component, ReactElement, ReactNode } from 'react'
import { observer, inject } from 'mobx-react'

import ChromeBannerUIStore from '../../stores/ChromeBannerUIStore'

import { MobileNavBarContainer } from './styledComponents'

interface MobileNavBarProps {
   NavBarCSS?: () => React.CSSProperties
   NavBarStyle?: any
   renderLeftEnhancer?: ReactNode
   renderBody: () => ReactElement | null
   renderRightEnhancer?: ReactNode
}

interface InjectedProps extends MobileNavBarProps {
   chromeBannerUIStore: ChromeBannerUIStore
}
@inject('chromeBannerUIStore')
@observer
class MobileNavBar extends Component<MobileNavBarProps> {
   static defaultProps = {
      NavBarCSS: '',
      NavBarStyle: {},
      renderLeftEnhancer: null,
      renderRightEnhancer: null
   }

   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getChromeBannerUIStore = () => this.getInjectedProps().chromeBannerUIStore

   render() {
      const {
         renderLeftEnhancer,
         renderRightEnhancer,
         renderBody: RenderBody,
         NavBarCSS,
         NavBarStyle
      } = this.props
      const {
         shouldDisplayViewInChromeMessageBanner
      } = this.getChromeBannerUIStore()
      return (
         <MobileNavBarContainer
            style={NavBarStyle}
            css={NavBarCSS}
            id='mobileNavbar'
            shouldDisplayViewInChromeMessageBanner={
               shouldDisplayViewInChromeMessageBanner
            }
         >
            {renderLeftEnhancer}
            <RenderBody />
            {renderRightEnhancer}
         </MobileNavBarContainer>
      )
   }
}

export default MobileNavBar
