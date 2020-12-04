import React, { Component, ReactElement, ReactNode } from 'react'

import CloseIcon from '../../icons/CloseIcon'
import colors from '../../themes/Colors'

import BaseModalContainer from '../BaseModalContainer'

import {
   BottomDrawerModalHeader,
   CloseButton,
   DrawerCloseButtonContainer
} from './styledComponents'
import styles from './styles.module.css'

interface BottomDrawerModalProps {
   innerRef
   headerContent?: ReactNode
   closeDrawer: () => void
   maxHeight?: string
   onCloseModal?: () => void
   haveHeader?: boolean
   mounted?: boolean
}

class BottomDrawerModal extends Component<BottomDrawerModalProps> {
   static defaultProps = {
      haveHeader: true
   }

   renderHeader = (): ReactNode => {
      const { haveHeader, headerContent, closeDrawer } = this.props
      return haveHeader ? (
         <BottomDrawerModalHeader>
            {headerContent}
            <CloseButton onClick={closeDrawer}>
               <CloseIcon width={12} height={12} fill={colors.steel} />
            </CloseButton>
         </BottomDrawerModalHeader>
      ) : (
         <DrawerCloseButtonContainer>
            <CloseButton onClick={closeDrawer}>
               <CloseIcon width={12} height={12} fill={colors.steel} />
            </CloseButton>
         </DrawerCloseButtonContainer>
      )
   }

   render(): ReactElement {
      const { innerRef, children, onCloseModal, mounted } = this.props
      return (
         <BaseModalContainer
            ref={innerRef}
            hideCloseIcon
            dialogClass={styles.bottomDrawerModalStyles}
            underlayClass={styles.bottomDrawerUnderlayStyles}
            underlayColor={colors.darkBlueGrey16}
            onCloseModal={onCloseModal}
            mounted={mounted}
         >
            {this.renderHeader()}
            {children}
         </BaseModalContainer>
      )
   }
}

export default BottomDrawerModal
