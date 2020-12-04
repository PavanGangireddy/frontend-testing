import React, { Component, ReactElement, ReactNode } from 'react'
import { observer } from 'mobx-react'

import CloseIcon from '../../icons/CloseIcon'
import colors from '../../themes/Colors'

import {
   DrawerCloseButtonContainer,
   CloseButton,
   Drawer,
   MainContainer,
   EmptyContainer
} from './styledComponents'

interface BottomDrawerProps {
   closeDrawer: () => void
   isVisible: boolean
   fromHeader?: boolean
   mainContainerCss?: React.CSSProperties
   overlayBackgroundColor?: string
}

@observer
class BottomDrawer extends Component<BottomDrawerProps> {
   static defaultProps = {
      fromHeader: false
   }

   renderCloseButtonContainer = (): ReactNode => {
      const { fromHeader, closeDrawer } = this.props
      return !fromHeader ? (
         <DrawerCloseButtonContainer>
            <CloseButton onClick={closeDrawer}>
               <CloseIcon width={12} height={12} fill={colors.steel} />
            </CloseButton>
         </DrawerCloseButtonContainer>
      ) : null
   }

   render(): ReactElement {
      const {
         children,
         closeDrawer,
         isVisible,
         mainContainerCss,
         overlayBackgroundColor
      } = this.props
      return (
         <Drawer isVisible={isVisible}>
            <EmptyContainer
               onClick={closeDrawer}
               backgroundColor={overlayBackgroundColor}
               isVisible={isVisible}
            ></EmptyContainer>
            <MainContainer css={mainContainerCss} isVisible={isVisible}>
               {this.renderCloseButtonContainer()}
               {children}
            </MainContainer>
         </Drawer>
      )
   }
}

export default BottomDrawer
