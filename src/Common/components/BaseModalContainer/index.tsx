import React, { Component } from 'react'
import AriaModal from 'react-aria-modal'

import Colors from '../../themes/Colors'
import CloseIcon from '../../icons/CloseIcon'

import { CloseIconWrapper } from './styledComponents'
import styles from './styles.module.css'

interface Props {
   children: React.ReactNode
   hideCloseIcon: boolean
   dialogClass: string
   underlayClass: string
   underlayColor: string
   isOutSideClick?: boolean
   closeButtonTestId?: string
   onCloseModal?: () => void
   mounted?: boolean
}

interface State {
   modalIsOpen: boolean
}

class BaseModalContainer extends Component<Props, State> {
   state = {
      modalIsOpen: false
   }

   static defaultProps = {
      hideCloseIcon: false,
      dialogClass: styles.baseModalStyles,
      underlayClass: styles.baseModalUnderlayStyles,
      underlayColor: Colors.black32,
      closeButtonTestId: 'modalCloseButton'
   }

   openModal = () => {
      this.setState({
         modalIsOpen: true
      })
   }

   closeModal = () => {
      const { onCloseModal } = this.props
      this.setState({
         modalIsOpen: false
      })
      if (onCloseModal) {
         onCloseModal()
      }
   }

   render() {
      const {
         children,
         hideCloseIcon,
         dialogClass,
         underlayClass,
         underlayColor,
         isOutSideClick,
         closeButtonTestId,
         mounted,
         ...other
      } = this.props
      const { modalIsOpen } = this.state
      const isMounted =
         mounted === undefined ? modalIsOpen : mounted || modalIsOpen
      return (
         <AriaModal
            dialogClass={dialogClass}
            underlayClass={underlayClass}
            underlayColor={underlayColor}
            mounted={isMounted}
            onExit={isOutSideClick ? null : this.closeModal}
            focusDialog
            titleId='react-aria-modal'
            {...other}
         >
            {hideCloseIcon ? null : (
               <CloseIconWrapper
                  onClick={this.closeModal}
                  data-testid={closeButtonTestId}
               >
                  <CloseIcon fill={Colors.blueGreyTwo} />
               </CloseIconWrapper>
            )}

            {children}
         </AriaModal>
      )
   }
}

export default BaseModalContainer
