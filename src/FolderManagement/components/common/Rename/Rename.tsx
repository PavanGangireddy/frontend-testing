import React, { Component, Ref, ReactNode } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { APIStatus } from '@ib/api-constants'

import Colors from '../../../../Common/themes/Colors'
import BaseModalContainer from '../../../../Common/components/BaseModalContainer'
import CloseIcon from '../../../../Common/icons/CloseIcon'
import { validateEmpty } from '../../../../Common/utils/ValidationUtils'
import { isAPIFetching } from '../../../../Common/utils/APIUtils'

import {
   CANCEL,
   RENAME,
   popUpThemes,
   rename
} from '../../../constants/UIConstants'

import { isMobileDevice } from '../../../../Common/utils/responsiveUtils'
import BottomDrawerWithHeader from '../../../../Common/components/BottomDrawerWithHeader'
import {
   MainContainer,
   ContentMainContainer,
   FooterMainContainer,
   SubmitButton,
   SubmitButtonText,
   CancelButton,
   CancelButtonText,
   StyledIconContainer,
   PopupHeading
} from './styledComponents'
import RenameInput from './RenameInput'

interface Props {
   onConfirm: Function
   onCancel: Function
   cancelButtonText?: string
   innerRef?: Ref<BaseModalContainer>
   currentName: string
   renameAPIStatus: APIStatus
   cancelTestId?: string
   submitTestId?: string
   maxLength: number
   isVisibleRenameDrawer: boolean
   onClickCloseRenameDrawer: () => void
   renderHeaderContent: ReactNode
}

@observer
class Rename extends Component<Props> {
   @observable currentFileName!: string | undefined
   renameRef

   constructor(props) {
      super(props)
      this.renameRef = React.createRef()
   }

   static popUpTypes = {
      rename: RENAME
   }

   static defaultProps = {
      actionType: RENAME,
      cancelButtonText: CANCEL,
      onCancel: () => {},
      cancelTestId: 'cancelButton',
      submitTestId: 'submitButton'
   }

   onSuccessRename = (name): void => {
      this.currentFileName = name
   }

   onFailureRename = (name): void => {
      this.currentFileName = name
      this.renameRef.current.setInputTextValue(name)
   }

   onSubmit = (e): void => {
      e.preventDefault()
      const { onConfirm, onCancel, currentName } = this.props
      if (
         this.currentFileName === undefined ||
         this.currentFileName === currentName
      ) {
         onCancel()
      } else if (!validateEmpty(this.currentFileName).shouldShowError) {
         onConfirm(
            this.currentFileName.trim(),
            this.onSuccessRename,
            this.onFailureRename
         )
      }
   }

   renderPopUpHeader = (): ReactNode => {
      const { popupHeading } = popUpThemes[rename]
      return <PopupHeading>{popupHeading}</PopupHeading>
   }

   onChangeName = (event): void => {
      this.currentFileName = event.target.value
   }

   renderPopUpContent = (): ReactNode => {
      const { currentName, maxLength } = this.props
      return (
         <ContentMainContainer>
            <RenameInput
               onChange={this.onChangeName}
               ref={this.renameRef}
               value={currentName}
               maxLength={maxLength}
            />
         </ContentMainContainer>
      )
   }

   renderPopUpFooter = (): ReactNode => {
      const {
         onCancel,
         cancelButtonText,
         renameAPIStatus,
         cancelTestId,
         submitTestId
      } = this.props
      const { popupBtnText, popupBtnBackground } = popUpThemes[rename]

      return (
         <FooterMainContainer>
            <CancelButton
               onClick={onCancel}
               variant={CancelButton.variants.secondary}
               disabled={isAPIFetching(renameAPIStatus)}
               id={cancelTestId}
               type='reset'
            >
               <CancelButtonText>{cancelButtonText}</CancelButtonText>
            </CancelButton>
            <SubmitButton
               isLoading={isAPIFetching(renameAPIStatus)}
               background={popupBtnBackground}
               variant='primary'
               disabled={this.currentFileName === '' ? true : false}
               id={submitTestId}
               type='submit'
            >
               <SubmitButtonText>{popupBtnText}</SubmitButtonText>
            </SubmitButton>
         </FooterMainContainer>
      )
   }

   renderBaseModalContainerOrDrawer = () => {
      const {
         innerRef,
         onCancel,
         isVisibleRenameDrawer,
         onClickCloseRenameDrawer,
         renderHeaderContent
      } = this.props
      if (isMobileDevice) {
         return isVisibleRenameDrawer ? (
            <BottomDrawerWithHeader
               isVisible={isVisibleRenameDrawer}
               closeDrawer={onClickCloseRenameDrawer}
               headerContent={renderHeaderContent}
            >
               <MainContainer as='form' onSubmit={this.onSubmit}>
                  {this.renderPopUpContent()}
                  {this.renderPopUpFooter()}
               </MainContainer>
            </BottomDrawerWithHeader>
         ) : null
      }
      return (
         <BaseModalContainer ref={innerRef} hideCloseIcon>
            <MainContainer as='form' onSubmit={this.onSubmit}>
               {this.renderPopUpHeader()}
               {this.renderPopUpContent()}
               {this.renderPopUpFooter()}
               <StyledIconContainer onClick={onCancel}>
                  <CloseIcon fill={Colors.darkBlueGrey} />
               </StyledIconContainer>
            </MainContainer>
         </BaseModalContainer>
      )
   }

   render(): ReactNode {
      return this.renderBaseModalContainerOrDrawer()
   }
}

export default React.forwardRef<BaseModalContainer, Props>(
   (props, captureModalRef) => <Rename innerRef={captureModalRef} {...props} />
)
