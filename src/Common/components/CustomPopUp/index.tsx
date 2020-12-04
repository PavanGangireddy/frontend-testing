import React, { Component, Ref } from 'react'

import BaseModalContainer from '../BaseModalContainer'

import Colors from '../../themes/Colors'
import CloseIcon from '../../icons/CloseIcon'

import {
   MainContainer,
   ContentMainContainer,
   DescriptionText,
   FooterMainContainer,
   SubmitBtn,
   SubmitBtnText,
   CancelBtn,
   CancelBtnText,
   StyledIconContainer,
   PopupHeading
} from './styledComponents'

const DELETE = 'DELETE'
const WARNING = 'WARNING'

const popUpThemes = {
   DELETE: {
      popupBtnBackground: Colors.neonRed,
      popupBtnText: 'Delete',
      popupHeading: 'DELETE'
   },
   WARNING: {
      popupBtnBackground: Colors.pinkishOrange,
      popupBtnText: 'Confirm',
      popupHeading: 'WARNING'
   },
   LOGOUT: {
      popupBtnBackground: Colors.brightBlue,
      popupBtnText: 'Logout',
      popupHeading: 'Logout'
   },
   EMPTY_TRASH: {
      popupBtnBackground: Colors.neonRed,
      popupBtnText: 'Delete',
      popupHeading: 'EMPTY TRASH'
   },
   SUBMIT: {
      popupBtnBackground: Colors.brightBlue,
      popupBtnText: 'Submit',
      popupHeading: 'Submit'
   }
}

interface Props {
   actionType: string
   onConfirm: Function
   description: string
   onCancel: Function
   cancelBtnText?: string
   innerRef?: Ref<BaseModalContainer>
   isSubmitButtonLoading?: boolean
   isCancelButtonDisabed?: boolean
}

class CustomPopUp extends Component<Props> {
   static popUpTypes = {
      delete: DELETE,
      warning: WARNING
   }

   static defaultProps = {
      actionType: DELETE,
      cancelBtnText: 'Cancel',
      onCancel: () => {}
   }

   onSubmit = () => {
      const { onConfirm } = this.props
      onConfirm()
   }

   renderPopUpHeader = () => {
      const { actionType } = this.props
      const { popupHeading } = popUpThemes[actionType]
      return <PopupHeading>{popupHeading}</PopupHeading>
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
      const {
         actionType,
         onCancel,
         cancelBtnText,
         isSubmitButtonLoading,
         isCancelButtonDisabed
      } = this.props
      const { popupBtnText, popupBtnBackground } = popUpThemes[actionType]
      return (
         <FooterMainContainer>
            <CancelBtn
               onClick={onCancel}
               variant={CancelBtn.variants.secondary}
               disabled={isCancelButtonDisabed}
               data-testid={'customPopUpCancelButton'}
            >
               <CancelBtnText>{cancelBtnText}</CancelBtnText>
            </CancelBtn>
            <SubmitBtn
               background={popupBtnBackground}
               onClick={this.onSubmit}
               variant='primary'
               isLoading={isSubmitButtonLoading}
               data-testid={'customPopUpSubmitButton'}
            >
               <SubmitBtnText>{popupBtnText}</SubmitBtnText>
            </SubmitBtn>
         </FooterMainContainer>
      )
   }

   render() {
      const { innerRef, onCancel } = this.props
      return (
         <BaseModalContainer ref={innerRef} hideCloseIcon>
            <MainContainer>
               {this.renderPopUpHeader()}
               {this.renderPopUpContent()}
               {this.renderPopUpFooter()}
               <StyledIconContainer onClick={onCancel}>
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
      <CustomPopUp innerRef={captureModalRef} {...props} />
   )
)
