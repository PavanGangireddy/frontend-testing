import React, { Component, ReactElement, ReactNode } from 'react'
import { observer } from 'mobx-react'

import colors from '../../themes/Colors'
import CloseIcon from '../../icons/CloseIcon'

import BottomDrawer from '../BottomDrawer/BottomDrawer'

import { DrawerHeaderContainer, CloseButton } from './styledComponents'

interface BottomDrawerWithHeaderProps {
   closeDrawer: () => void
   headerContent: ReactNode
   isVisible: boolean
   drawerHeaderContainerCSS?: React.CSSProperties
   mainContainerCss?: React.CSSProperties

   haveHeader?: boolean
}

@observer
class BottomDrawerWithHeader extends Component<BottomDrawerWithHeaderProps> {
   static defaultProps = {
      haveHeader: true
   }
   render(): ReactElement {
      const {
         children,
         headerContent,
         closeDrawer,
         isVisible,
         drawerHeaderContainerCSS,
         mainContainerCss,
         haveHeader
      } = this.props

      return (
         <BottomDrawer
            isVisible={isVisible}
            closeDrawer={closeDrawer}
            fromHeader={true}
            mainContainerCss={mainContainerCss}
         >
            {haveHeader ? (
               <DrawerHeaderContainer css={drawerHeaderContainerCSS}>
                  {headerContent}
                  <CloseButton onClick={closeDrawer}>
                     <CloseIcon width={12} height={12} fill={colors.steel} />
                  </CloseButton>
               </DrawerHeaderContainer>
            ) : null}
            {children}
         </BottomDrawer>
      )
   }
}

export default BottomDrawerWithHeader
