import React, { Component, Ref } from 'react'

import BaseModalContainer from '../BaseModalContainer'

import Colors from '../../themes/Colors'
import CloseIcon from '../../icons/CloseIcon'
import ProjectLockIcon from '../../icons/ProjectLockIcon'

import {
   MainContainer,
   ContentMainContainer,
   DescriptionText,
   FooterMainContainer,
   DismissBtn,
   DismissBtnText,
   StyledIconContainer,
   HeadingContainer,
   PopupHeading
} from './styledComponents'
import styles from './styles.module.css'

const DISMISS = 'DISMISS'

const popUpThemes = {
   DISMISS: {
      popupBtnText: 'Dismiss',
      popupHeading: 'Locked'
   }
}

interface Props {
   actionType: string
   onConfirm: Function
   description: string
   onDismiss: Function
   innerRef?: Ref<BaseModalContainer>
   isSubmitButtonLoading?: boolean
}

class LockComponentModal extends Component<Props> {
   static popUpTypes = {
      dismiss: DISMISS
   }

   static defaultProps = {
      actionType: DISMISS,
      onDismiss: () => {}
   }

   onSubmit = () => {
      const { onConfirm } = this.props
      onConfirm()
   }

   renderPopUpHeader = () => {
      const { actionType } = this.props
      const { popupHeading } = popUpThemes[actionType]
      return (
         <HeadingContainer>
            <ProjectLockIcon width={32} height={32} fill={Colors.blueThree} />
            <PopupHeading>{popupHeading}</PopupHeading>
         </HeadingContainer>
      )
   }

   renderPopUpContent = () => {
      const { description } = this.props
      return (
         <ContentMainContainer>
            <DescriptionText>{description}</DescriptionText>
         </ContentMainContainer>
      )
   }

   renderPopUpFooter = () => {
      const { actionType, isSubmitButtonLoading, onDismiss } = this.props
      const { popupBtnText } = popUpThemes[actionType]
      return (
         <FooterMainContainer>
            <DismissBtn
               onClick={onDismiss}
               variant='primary'
               isLoading={isSubmitButtonLoading}
               data-testid={'DismissButton'}
            >
               <DismissBtnText>{popupBtnText}</DismissBtnText>
            </DismissBtn>
         </FooterMainContainer>
      )
   }

   render() {
      const { innerRef, onDismiss } = this.props
      return (
         <BaseModalContainer
            ref={innerRef}
            hideCloseIcon
            dialogClass={styles.baseModalStyles}
         >
            <MainContainer>
               {this.renderPopUpHeader()}
               {this.renderPopUpContent()}
               {this.renderPopUpFooter()}
               <StyledIconContainer onClick={onDismiss}>
                  <CloseIcon
                     fill={Colors.darkBlueGrey}
                     data-testid={'customPopUpCloseButton'}
                  />
               </StyledIconContainer>
            </MainContainer>
         </BaseModalContainer>
      )
   }
}

export default React.forwardRef<BaseModalContainer, Props>(
   (props, captureModalRef) => (
      <LockComponentModal innerRef={captureModalRef} {...props} />
   )
)
