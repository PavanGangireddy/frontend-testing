import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'
import parse from 'html-react-parser'

import Avatar from '../../../Common/components/Avatar'
import PopoverMenu from '../../../Common/components/PopoverMenu'
import {
   showSuccessBottomCenterToast,
   showFailureBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import {
   getAPIErrorMessage,
   isAPIFetching
} from '../../../Common/utils/APIUtils'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import CustomPopUp from '../../../Common/components/CustomPopUp'
import { WithTranslation } from '../../../Common/types'

import MessageSquareIcon from '../../icons/MessageSquareIcon'
import ReplyModal from '../../stores/models/Reply/Reply'

import ReplyInputSection from '../ReplyInputSection'

import {
   ReplyContainer,
   ImageWrapper,
   ContentWrapper,
   TextContentWrapper,
   MoreOptionsWrapper,
   Title,
   Description,
   PopoverMenuContainer,
   PopoverMenuOption,
   RowContainer,
   StyledButton,
   AttatchmentField,
   ImageField,
   Image,
   AttatchedMediaItemContainer,
   ButtonText
} from './styledComponents'

interface ReplyProps extends WithTranslation {
   data: ReplyModal
}

@observer
class Reply extends Component<ReplyProps> {
   @observable canDisplayReplyInputSection = false
   @observable isEditing = false
   discussionReplyRef

   prefixForT = 'discussions:'
   // TODO: Refactor the code based on the new-Zeplin screens

   constructor(props) {
      super(props)
      this.discussionReplyRef = React.createRef<BaseModalContainer>()
   }

   renderMultiMedia = () => {
      const {
         data: { multimedia }
      } = this.props
      return multimedia.map(media => (
         <AttatchmentField key={media.id}>
            <ImageField>
               <Image src={media.url} alt='' />
            </ImageField>
         </AttatchmentField>
      ))
   }

   toggleDisplayOfReplyInputSection = () =>
      (this.canDisplayReplyInputSection = !this.canDisplayReplyInputSection)

   @action.bound
   toggleEditingCommentAccess() {
      this.isEditing = !this.isEditing
      this.canDisplayReplyInputSection = false
   }

   onDeleteSuccessfully = () => {
      const { t } = this.props
      this.closeDeleteModal()
      showSuccessBottomCenterToast('Reply deleted successfully')
   }
   onDeleteFailure = (error: any) => {
      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
   }

   deleteDiscussionHandler = async () => {
      const {
         props: { data },
         onDeleteSuccessfully,
         onDeleteFailure
      } = this
      await data.deleteReply(onDeleteSuccessfully, onDeleteFailure)
   }

   openDeleteModal = (): void => {
      this.discussionReplyRef.current?.openModal()
   }

   closeDeleteModal = (): void => {
      this.discussionReplyRef.current?.closeModal()
   }

   renderDeleteModal = () => {
      const {
         t,
         data: { getDeleteReplyAPIStatus }
      } = this.props
      return (
         <CustomPopUp
            ref={this.discussionReplyRef}
            onCancel={this.closeDeleteModal}
            onConfirm={this.deleteDiscussionHandler}
            actionType={'DELETE'}
            description={t(
               `${this.prefixForT}areYouSureYouWantToDeleteThisReply`
            )}
            isSubmitButtonLoading={isAPIFetching(getDeleteReplyAPIStatus)}
         />
      )
   }

   // FIXME: Handle edit & delete functionalities for replies & comments
   renderPopoverMenuItems = () => {
      const {
         prefixForT,
         toggleEditingCommentAccess,
         openDeleteModal,
         props: { t }
      } = this
      return (
         <PopoverMenuContainer>
            <PopoverMenuOption
               onClick={toggleEditingCommentAccess}
               data-testid={'replyEditMenu'}
            >
               {t(`${prefixForT}edit`)}
            </PopoverMenuOption>
            <PopoverMenuOption
               onClick={openDeleteModal}
               data-testid={'replyDeleteMenu'}
            >
               {t(`${prefixForT}delete`)}
            </PopoverMenuOption>
         </PopoverMenuContainer>
      )
   }

   renderKebabMenu = () => {
      const { renderPopoverMenuItems } = this
      return (
         <PopoverMenu
            renderPopoverContent={renderPopoverMenuItems()}
            triggerTestId={'replyPopOver'}
         />
      )
   }

   postReplyHandler = async (requestObjectData, onSuccess, onFailure) => {
      const { postReply } = this.props.data
      await postReply(requestObjectData, onSuccess, onFailure)
      this.canDisplayReplyInputSection = false
   }

   @action.bound
   async editCommentHandler(requestObjectData, onSuccess, onFailure) {
      const { updateReply } = this.props.data
      await updateReply(requestObjectData, onSuccess, onFailure)
      this.toggleEditingCommentAccess()
   }

   renderReplyInputSection = () => {
      const {
         toggleDisplayOfReplyInputSection,
         postReplyHandler,
         isEditing,
         toggleEditingCommentAccess,
         editCommentHandler
      } = this
      const {
         getPostReplyAPIStatus,
         getUpdateReplyAPIStatus,
         description,
         multimedia
      } = this.props.data
      return (
         <ReplyInputSection
            data={
               isEditing && {
                  description,
                  multimedia
               }
            }
            apiStatus={
               isEditing ? getUpdateReplyAPIStatus : getPostReplyAPIStatus
            }
            cancelFn={
               isEditing
                  ? toggleEditingCommentAccess
                  : toggleDisplayOfReplyInputSection
            }
            postReply={isEditing ? editCommentHandler : postReplyHandler}
            inputTestId={'replyInput'}
            cancelButtonTestId={'replyCancelButton'}
            postButtonTestId={'replyPostButton'}
         />
      )
   }

   renderReplyFooter = () => {
      const {
         props: { t },
         prefixForT,
         toggleDisplayOfReplyInputSection
      } = this
      return (
         <RowContainer>
            <StyledButton
               variant={'TERTIARY'}
               type={'OUTLINE'}
               onClick={toggleDisplayOfReplyInputSection}
               startEnhancer={() => <MessageSquareIcon />}
               data-testid={'replyComponentReplyButton'}
            >
               <ButtonText>{t(`${prefixForT}reply`)}</ButtonText>
            </StyledButton>
         </RowContainer>
      )
   }

   render() {
      const {
         prefixForT,
         canDisplayReplyInputSection,
         renderReplyFooter,
         renderKebabMenu,
         renderReplyInputSection,
         renderMultiMedia,
         isEditing,
         renderDeleteModal
      } = this
      const {
         t,
         data: {
            isEditable,
            description,
            creationDate,
            creationTime,
            userName,
            imageURL
         }
      } = this.props

      return (
         <ReplyContainer>
            <ImageWrapper>
               {/* FIXME: need to use constants and need to get profilePic from backend */}

               <Avatar
                  size={'XS'}
                  type={'OUTLINE'}
                  variant={'CIRCLE'}
                  // url={}
                  // alt={'profilePic'}
                  name={userName}
               />
            </ImageWrapper>
            <ContentWrapper>
               <TextContentWrapper>
                  {isEditing ? (
                     renderReplyInputSection()
                  ) : (
                     <>
                        <Title as='h2'>
                           {t(`${prefixForT}authorInfoWithParams`, {
                              userName,
                              creationDate,
                              creationTime
                           })}
                        </Title>
                        <Description as='p'>{parse(description)}</Description>
                        <AttatchedMediaItemContainer>
                           {renderMultiMedia()}
                        </AttatchedMediaItemContainer>
                        {renderReplyFooter()}
                     </>
                  )}
                  {canDisplayReplyInputSection && renderReplyInputSection()}
               </TextContentWrapper>
               <MoreOptionsWrapper>
                  {isEditable && renderKebabMenu()}
               </MoreOptionsWrapper>
               {renderDeleteModal()}
            </ContentWrapper>
         </ReplyContainer>
      )
   }
}

export default withTranslation()(Reply)
