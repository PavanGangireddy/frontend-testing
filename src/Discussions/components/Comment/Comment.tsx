import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'
import parse from 'html-react-parser'

import { DELETE } from '../../../WorkbookManagement/constants/UIConstants'
import Avatar from '../../../Common/components/Avatar'
import PopoverMenu from '../../../Common/components/PopoverMenu'
import CustomPopUp from '../../../Common/components/CustomPopUp'
import {
   showSuccessBottomCenterToast,
   showFailureBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import {
   getAPIErrorMessage,
   isAPIFetching
} from '../../../Common/utils/APIUtils'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import { WithTranslation } from '../../../Common/types'

import MessageSquareIcon from '../../icons/MessageSquareIcon'
import CommentModal from '../../stores/models/Comment'

import ReplyInputSection from '../ReplyInputSection'
import RepliesList from '../RepliesList'

import {
   CommentContainer,
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

interface CommentProps extends WithTranslation {
   data: CommentModal
}

@observer
class Comment extends Component<CommentProps> {
   @observable canDisplayReplyInputSection = false
   @observable canDisplayReplies = false
   @observable isEditing = false
   discussionCommentRef

   prefixForT = 'discussions:'

   // TODO: Refactor the code based on the new-Zeplin screens

   constructor(props) {
      super(props)
      this.discussionCommentRef = React.createRef<BaseModalContainer>()
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

   onGetRepliesFailure = ({ showToast, message, type }) => {
      this.toggleDisplayReplies()
      showToast({ message, type })
   }

   renderRepliesList = () => {
      const { replies, getReplies, getRepliesAPIStatus } = this.props.data
      const { onGetRepliesFailure } = this
      return (
         <RepliesList
            fetchedData={replies}
            apiStatus={getRepliesAPIStatus}
            doNetworkCall={getReplies}
            onFetchFailure={onGetRepliesFailure}
         />
      )
   }

   toggleDisplayReplies = () =>
      (this.canDisplayReplies = !this.canDisplayReplies)

   @action.bound
   toggleDisplayOfReplyInputSection() {
      this.canDisplayReplyInputSection = !this.canDisplayReplyInputSection
      this.isEditing = false
   }

   @action.bound
   toggleEditingCommentAccess() {
      this.isEditing = !this.isEditing
      this.canDisplayReplyInputSection = false
   }

   onDeleteSuccessfully = () => {
      const { t } = this.props
      this.closeDeleteModal()
      showSuccessBottomCenterToast(
         t(`${this.prefixForT}commentDeletedSuccessfully`)
      )
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
      await data.deleteComment(onDeleteSuccessfully, onDeleteFailure)
   }

   openDeleteModal = (): void => {
      this.discussionCommentRef.current?.openModal()
   }

   closeDeleteModal = (): void => {
      this.discussionCommentRef.current?.closeModal()
   }

   renderDeleteModal = () => {
      const {
         t,
         data: { getDeleteCommentAPIStatus }
      } = this.props
      return (
         <CustomPopUp
            ref={this.discussionCommentRef}
            onCancel={this.closeDeleteModal}
            onConfirm={this.deleteDiscussionHandler}
            actionType={DELETE}
            description={t(
               `${this.prefixForT}areYouSureYouWantToDeleteThisComment`
            )}
            isSubmitButtonLoading={isAPIFetching(getDeleteCommentAPIStatus)}
         />
      )
   }

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
               data-testid={'commentEditMenu'}
            >
               {t(`${prefixForT}edit`)}
            </PopoverMenuOption>
            <PopoverMenuOption
               onClick={openDeleteModal}
               data-testid={'commentDeleteMenu'}
            >
               {t(`${prefixForT}delete`)}
            </PopoverMenuOption>
         </PopoverMenuContainer>
      )
   }

   // FIXME: Handle edit & delete functionalities for replies & comments
   renderKebabMenu = () => {
      const { renderPopoverMenuItems } = this
      return (
         <PopoverMenu
            renderPopoverContent={renderPopoverMenuItems()}
            triggerTestId={'commentPopOver'}
         />
      )
   }

   @action.bound
   postReplyHandler = async (requestObjectData, onSuccess, onFailure) => {
      const { postReply } = this.props.data
      await postReply(requestObjectData, onSuccess, onFailure)
      this.canDisplayReplyInputSection = false
      this.canDisplayReplies = true
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
         getUpdateCommentAPIStatus,
         description,
         mentionedUsersList,
         multimedia
      } = this.props.data
      return (
         <ReplyInputSection
            data={
               isEditing && {
                  description,
                  mentionedUsersList,
                  multimedia
               }
            }
            apiStatus={
               isEditing ? getUpdateCommentAPIStatus : getPostReplyAPIStatus
            }
            cancelFn={
               isEditing
                  ? toggleEditingCommentAccess
                  : toggleDisplayOfReplyInputSection
            }
            postReply={isEditing ? editCommentHandler : postReplyHandler}
            inputTestId={'commentInput'}
            cancelButtonTestId={'commentCancelButton'}
            postButtonTestId={'commentPostButton'}
         />
      )
   }

   @action.bound
   async editCommentHandler(requestObjectData, onSuccess, onFailure) {
      const { updateComment } = this.props.data
      await updateComment(requestObjectData, onSuccess, onFailure)
      this.toggleEditingCommentAccess()
   }

   renderCommentFooter = () => {
      const {
         props: {
            t,
            data: { repliesCount }
         },
         prefixForT,
         canDisplayReplies,
         toggleDisplayReplies,
         toggleDisplayOfReplyInputSection
      } = this
      return (
         <RowContainer>
            {/* TODO: need to put it in constants */}
            <StyledButton
               variant={'TERTIARY'}
               type={'OUTLINE'}
               onClick={toggleDisplayOfReplyInputSection}
               startEnhancer={() => <MessageSquareIcon />}
               id={'commentReplyButton'}
            >
               <ButtonText>{t(`${prefixForT}reply`)}</ButtonText>
            </StyledButton>
            {repliesCount > 0 && (
               <StyledButton
                  variant={'TERTIARY'}
                  type={'OUTLINE'}
                  onClick={toggleDisplayReplies}
                  id={'commentShowHideButton'}
               >
                  <ButtonText data-testid={'commentShowHideButtonText'}>
                     {t(
                        `${prefixForT}${
                           canDisplayReplies ? 'hideReplies' : 'showReplies'
                        }`,
                        { count: repliesCount }
                     )}
                  </ButtonText>
               </StyledButton>
            )}
         </RowContainer>
      )
   }

   render() {
      const {
         prefixForT,
         canDisplayReplies,
         canDisplayReplyInputSection,
         renderCommentFooter,
         renderRepliesList,
         renderKebabMenu,
         renderReplyInputSection,
         renderMultiMedia,
         isEditing,
         renderDeleteModal
      } = this
      const {
         t,
         data: {
            description,
            creationDate,
            creationTime,
            userName,
            imageURL,
            isEditable
         }
      } = this.props
      const formattedData = description.replace(/\n/g, '<br />')
      return (
         <CommentContainer>
            <ImageWrapper>
               {/* FIXME: need to use constants and need to get profilePic from backend */}
               <Avatar
                  size={'XS'}
                  type={'OUTLINE'}
                  variant={'CIRCLE'}
                  name={userName}
               />
            </ImageWrapper>
            <ContentWrapper>
               <TextContentWrapper>
                  {/* FIXME: Change Time & Date Display format with new Zeplin screens by ime & date utils*/}
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
                        <Description as='p' data-testid={'commentDescription'}>
                           {parse(formattedData)}
                        </Description>
                        <AttatchedMediaItemContainer>
                           {/* FIXME: need to add render Multimedia */}
                           {/* {renderMultiMedia()} */}
                        </AttatchedMediaItemContainer>
                        {renderCommentFooter()}
                     </>
                  )}
                  {canDisplayReplyInputSection && renderReplyInputSection()}
                  {canDisplayReplies && renderRepliesList()}
               </TextContentWrapper>
               <MoreOptionsWrapper>
                  {isEditable && renderKebabMenu()}
               </MoreOptionsWrapper>
               {renderDeleteModal()}
            </ContentWrapper>
         </CommentContainer>
      )
   }
}

export default withTranslation()(Comment)
