import React, { Component, ReactElement, ReactNode } from 'react'
import { withTranslation } from 'react-i18next'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { APIStatus } from '@ib/api-constants'

import EditIcon from '../../../Common/icons/EditIcon'
import DeleteIcon from '../../../Common/icons/DeleteIcon'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import {
   getAPIErrorMessage,
   isAPIFetching
} from '../../../Common/utils/APIUtils'
import {
   showFailureBottomCenterToast,
   showSuccessBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import MoreIcon from '../../../Common/icons/MoreIcon'
import colors from '../../../Common/themes/Colors'
import CustomPopUp from '../../../Common/components/CustomPopUp'
import BottomDrawerModal from '../../../Common/components/BottomDrawer/BottomDrawerModal'
import MobileBottomDeleteDrawerModal from '../../../Common/components/MobileBottomCustomDrawer/MobileBottomDeleteDrawerModal'

import { AttachmentDetailsProps } from '../../stores/types'
import {
   MOBILE_ATTACHMENT_URL_TRUNCATE_VALUE,
   DESKTOP_ATTACHMENT_URL_TRUNCATE_VALUE
} from '../../constants/UIConstants'

import {
   AttachmentContainer,
   EditAttachmentURL,
   AttachmentBody,
   AttachmentUrl,
   AttachmentDate,
   ActionsContainer,
   Action,
   MoreIconWrapper,
   HeaderTitle,
   ListMenuContainer,
   ListMenuItem,
   ListMenuText,
   InputBox,
   ButtonsContainer,
   SaveButton,
   SaveButtonText,
   CancelButton,
   CancelButtonText,
   EditAttachmentDrawerContainer,
   ImageContainer,
   AttachmentImage
} from './styledComponents'

export const deletePopOver = {
   actionType: 'DELETE'
}

interface WithTranslationProps {
   i18n: any
   t: any
   tReady: any
}
interface AttachmentProps extends WithTranslationProps {
   details: AttachmentDetailsProps
   //TODO: type
   onEditAttachment: (
      attachmentDetails: any,
      onFailureEditAttachment: (error: any) => void
   ) => void
   isDisabled?: boolean
   deleteAttachmentAPI: (
      attachmentId: string,
      onSuccess: () => void,
      onFailure: (error: string) => void
   ) => void
   deleteAttachmentAPIStatus: APIStatus
   updateAttachmentURLAPIStatus: APIStatus
}

@observer
class Attachment extends Component<AttachmentProps> {
   @observable isEditable: boolean
   @observable attachmentUrl: string
   @observable deleteAttachmentId!: string

   attachmentRef
   mobileAttachmentEditRef
   deleteAttachmentRef

   attachmentActionsDrawerRef
   attachmentEditDrawerRef
   attachmentDeleteDrawerRef

   static defaultProps = {
      isDisabled: false
   }

   constructor(props) {
      super(props)
      this.isEditable = false
      this.attachmentUrl = this.props.details.url
      this.attachmentRef = React.createRef()
      this.mobileAttachmentEditRef = React.createRef()
      this.deleteAttachmentRef = React.createRef<BaseModalContainer>()
      this.attachmentActionsDrawerRef = React.createRef<BaseModalContainer>()
      this.attachmentEditDrawerRef = React.createRef<BaseModalContainer>()
      this.attachmentDeleteDrawerRef = React.createRef<BaseModalContainer>()
   }

   openAttachmentActionsDrawer = (): void => {
      this.attachmentActionsDrawerRef.current?.openModal()
   }

   closeAttachmentActionsDrawer = (): void => {
      this.attachmentActionsDrawerRef.current?.closeModal()
   }

   openEditAttachmentsDrawer = (): void => {
      this.attachmentEditDrawerRef.current?.openModal()
   }

   closeEditAttachmentsDrawer = (): void => {
      this.attachmentEditDrawerRef.current?.closeModal()
   }

   closeDeleteAttachmentModal = (): void => {
      this.deleteAttachmentRef.current?.closeModal()
   }

   openDeleteAttachmentModal = (): void => {
      this.deleteAttachmentRef.current?.openModal()
   }

   openModel = (attachmentId): void => {
      if (this.deleteAttachmentRef) {
         this.deleteAttachmentId = attachmentId
         this.deleteAttachmentRef.current?.openModal()
      }
   }

   closeModal = (): void => {
      if (this.deleteAttachmentRef) {
         this.deleteAttachmentRef.current?.closeModal()
      }
   }

   openMobileDeleteDrawer = (): void => {
      this.closeAttachmentActionsDrawer()
      this.attachmentDeleteDrawerRef.current?.openModal()
   }

   closeMobileDeleteDrawer = (): void => {
      this.attachmentDeleteDrawerRef.current?.closeModal()
   }

   onChangeIsEditable = (): void => {
      this.isEditable = !this.isEditable
   }

   onFailureEditAttachment = (error): void => {
      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
      this.attachmentUrl = this.props.details.url
   }

   @action
   onUpdateURL = (): void => {
      !isMobileDevice && this.onChangeIsEditable()
      if (this.props.details.url !== this.attachmentUrl) {
         const {
            onEditAttachment,
            details: { attachmentId }
         } = this.props
         onEditAttachment(
            {
               attachmentId: attachmentId,
               url: this.attachmentUrl
            },
            this.onFailureEditAttachment
         )
      }
   }

   //TODO: need to auto focus attachment URL
   //TODO: need to implement popup for delete attachment
   renderActions = (): React.ReactNode => {
      const {
         openDeleteAttachmentModal,
         props: { isDisabled }
      } = this
      return (
         <ActionsContainer isEditable={this.isEditable} isDisabled={isDisabled}>
            <Action
               onClick={isDisabled ? (): void => {} : this.onChangeIsEditable}
               isDisabled={isDisabled}
               data-testid='attachmentEditButton'
            >
               <EditIcon />
            </Action>
            <Action
               onClick={
                  isDisabled
                     ? (): void => {}
                     : () => openDeleteAttachmentModal()
               }
               isDisabled={isDisabled}
               data-testid='attachmentDeleteButton'
            >
               <DeleteIcon />
            </Action>
         </ActionsContainer>
      )
   }

   onChangeURL = (event): void => {
      this.attachmentUrl = event.target.value
   }

   isURLReady = () => !this.attachmentRef.current?.isError

   onKeyPressURL = (event): void => {
      if (event.charCode === 13 && this.isURLReady()) this.onUpdateURL()
   }

   onBlurInput = (): void => {
      if (this.isURLReady()) this.onUpdateURL()
   }

   getAttachmentURL = (attachmentUrl: string): string =>
      attachmentUrl.search('http') !== -1
         ? attachmentUrl
         : `https://${attachmentUrl}`

   getTruncateValue = () =>
      isMobileDevice
         ? MOBILE_ATTACHMENT_URL_TRUNCATE_VALUE
         : DESKTOP_ATTACHMENT_URL_TRUNCATE_VALUE

   renderAttachmentURL = (): React.ReactNode => {
      const truncateValue = this.getTruncateValue()
      const displayUrl =
         this.attachmentUrl.length > truncateValue
            ? this.attachmentUrl.slice(0, truncateValue).concat('...')
            : this.attachmentUrl

      if (this.isEditable) {
         return (
            <EditAttachmentURL
               defaultValue={this.attachmentUrl}
               onChange={this.onChangeURL}
               onKeyPress={this.onKeyPressURL}
               onBlur={this.onBlurInput}
               ref={this.attachmentRef}
               testId='attachmentURLInput'
            />
         )
      }
      return (
         <AttachmentUrl
            as='a'
            title={this.attachmentUrl}
            target={'_blank'}
            href={this.getAttachmentURL(this.attachmentUrl)}
            data-testid={'attachmentURLContent'}
         >
            {displayUrl}
         </AttachmentUrl>
      )
   }

   onSuccessDeleteAttachment = (): void => {
      const { t } = this.props
      this.closeDeleteAttachmentModal()
      this.closeMobileDeleteDrawer()
      showSuccessBottomCenterToast(
         t(`workbookManagement:cardDetails.attachmentDeleteSuccessMessage`)
      )
   }

   onFailureDeleteAttachment = (error): void => {
      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
   }

   onConfirmDeleteAttachment = (): void => {
      const {
         props: {
            deleteAttachmentAPI,
            details: { attachmentId }
         },
         onSuccessDeleteAttachment,
         onFailureDeleteAttachment
      } = this
      deleteAttachmentAPI(
         attachmentId,
         onSuccessDeleteAttachment,
         onFailureDeleteAttachment
      )
   }

   renderDeleteDrawerHeader = (): ReactElement => {
      const { t } = this.props
      return (
         <HeaderTitle>{t('workbookManagement:cardDetails.delete')}</HeaderTitle>
      )
   }

   renderMobileDeleteDrawer = (): ReactElement => {
      const {
         renderDeleteDrawerHeader,
         closeMobileDeleteDrawer,
         onConfirmDeleteAttachment,
         props: { deleteAttachmentAPIStatus }
      } = this
      return (
         <MobileBottomDeleteDrawerModal
            innerRef={this.attachmentDeleteDrawerRef}
            headerContent={renderDeleteDrawerHeader()}
            closeDrawer={closeMobileDeleteDrawer}
            type={'Attachment'}
            onClickDeleteButton={onConfirmDeleteAttachment}
            isDeleteButtonLoading={isAPIFetching(deleteAttachmentAPIStatus)}
            isCancelButtonDisabled={isAPIFetching(deleteAttachmentAPIStatus)}
            isDeleteButtonDisabled={isAPIFetching(deleteAttachmentAPIStatus)}
         />
      )
   }

   renderDeleteAttachmentPopUp = (): ReactElement => {
      const { t, deleteAttachmentAPIStatus } = this.props
      return (
         <CustomPopUp
            ref={this.deleteAttachmentRef}
            onCancel={this.closeDeleteAttachmentModal}
            onConfirm={this.onConfirmDeleteAttachment}
            actionType={deletePopOver.actionType}
            description={t(
               'workbookManagement:cardDetails.areYouSureYouWantToDeleteThisAttachment'
            )}
            isSubmitButtonLoading={isAPIFetching(deleteAttachmentAPIStatus)}
         />
      )
   }

   renderMobileActions = (): ReactElement => {
      const { openAttachmentActionsDrawer } = this
      return (
         <MoreIconWrapper onClick={openAttachmentActionsDrawer}>
            <MoreIcon fillColor={colors.darkBlueGrey} />
         </MoreIconWrapper>
      )
   }

   onClickEditAttachment = (): void => {
      const { closeAttachmentActionsDrawer, openEditAttachmentsDrawer } = this
      closeAttachmentActionsDrawer()
      openEditAttachmentsDrawer()
   }

   renderAttachmentActions = observer(
      (): ReactElement => {
         const {
            closeAttachmentActionsDrawer,
            onClickEditAttachment,
            openMobileDeleteDrawer,
            props: { t }
         } = this
         return (
            <BottomDrawerModal
               innerRef={this.attachmentActionsDrawerRef}
               closeDrawer={closeAttachmentActionsDrawer}
               haveHeader={false}
            >
               <ListMenuContainer>
                  <ListMenuItem as='div' onClick={onClickEditAttachment}>
                     <EditIcon />
                     <ListMenuText>
                        {t('workbookManagement:cardDetails.editAttachment')}
                     </ListMenuText>
                  </ListMenuItem>
                  <ListMenuItem as='div' onClick={openMobileDeleteDrawer}>
                     <DeleteIcon />
                     <ListMenuText>
                        {t('workbookManagement:cardDetails.deleteAttachment')}
                     </ListMenuText>
                  </ListMenuItem>
               </ListMenuContainer>
            </BottomDrawerModal>
         )
      }
   )

   onEditUrl = (): void => {
      const { isURLReady, onUpdateURL, closeEditAttachmentsDrawer } = this
      if (isURLReady()) {
         closeEditAttachmentsDrawer()
         onUpdateURL()
      }
   }

   cancelEditAttachmentUrl = (): void => {
      const {
         props: {
            details: { url }
         },
         closeEditAttachmentsDrawer
      } = this
      this.attachmentUrl = url
      closeEditAttachmentsDrawer()
   }

   renderEditAttachmentsFooter = observer(
      (): ReactElement => {
         const {
            props: { t, updateAttachmentURLAPIStatus },
            cancelEditAttachmentUrl,
            onEditUrl
         } = this
         return (
            <ButtonsContainer>
               <CancelButton
                  variant={CancelButton.variants.secondary}
                  onClick={cancelEditAttachmentUrl}
                  id='cardNotesCancelButton'
               >
                  <CancelButtonText>
                     {t('workbookManagement:cardDetails.cancel')}
                  </CancelButtonText>
               </CancelButton>
               <SaveButton
                  onClick={onEditUrl}
                  isLoading={isAPIFetching(updateAttachmentURLAPIStatus)}
                  id='cardNotesSaveButton'
               >
                  <SaveButtonText>
                     {t('workbookManagement:cardDetails.save')}
                  </SaveButtonText>
               </SaveButton>
            </ButtonsContainer>
         )
      }
   )

   editAttachmentHeaderContent = (): ReactNode => {
      const { t } = this.props
      return (
         <HeaderTitle>
            {t('workbookManagement:cardDetails.editAttachment')}
         </HeaderTitle>
      )
   }

   renderEditAttachmentDrawer = observer(
      (): ReactElement => {
         const {
            cancelEditAttachmentUrl,
            editAttachmentHeaderContent,
            mobileAttachmentEditRef,
            renderEditAttachmentsFooter: RenderEditAttachmentsFooter
         } = this
         return (
            <BottomDrawerModal
               closeDrawer={cancelEditAttachmentUrl}
               innerRef={this.attachmentEditDrawerRef}
               headerContent={editAttachmentHeaderContent()}
            >
               <EditAttachmentDrawerContainer>
                  <InputBox
                     value={this.attachmentUrl}
                     onChange={this.onChangeURL}
                     ref={mobileAttachmentEditRef}
                     testId='attachmentURLInput'
                  />
                  <RenderEditAttachmentsFooter />
               </EditAttachmentDrawerContainer>
            </BottomDrawerModal>
         )
      }
   )

   render(): ReactNode {
      const {
         props: {
            details: { attachmentId, creationDateTime },
            t
         },
         renderActions,
         renderMobileActions,
         renderAttachmentActions: RenderAttachmentActions,
         renderDeleteAttachmentPopUp,
         renderEditAttachmentDrawer: RenderEditAttachmentDrawer,
         renderMobileDeleteDrawer
      } = this
      let creationDate = creationDateTime.split(',')[0]
      creationDate = creationDate.split('-').join('/')

      return (
         <AttachmentContainer key={attachmentId} data-testid={'cardAttachment'}>
            <ImageContainer>
               <AttachmentImage
                  src={
                     'https://bss-backend-media-static.s3.ap-south-1.amazonaws.com/front-end/media/default-attachment.svg'
                  }
                  alt='attachment-Image'
               />
            </ImageContainer>
            <AttachmentBody>
               {this.renderAttachmentURL()}
               <AttachmentDate>
                  {t('workbookManagement:attachment.added')} {creationDate}
               </AttachmentDate>
            </AttachmentBody>
            {isMobileDevice ? renderMobileActions() : renderActions()}
            {renderMobileDeleteDrawer()}
            <RenderAttachmentActions />
            <RenderEditAttachmentDrawer />
            {renderDeleteAttachmentPopUp()}
         </AttachmentContainer>
      )
   }
}

export default withTranslation()(Attachment)
