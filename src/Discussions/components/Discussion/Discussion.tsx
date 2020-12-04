import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'

import Avatar from '../../../Common/components/Avatar'
import PopoverMenu from '../../../Common/components/PopoverMenu'
import { WithTranslation } from '../../../Common/types'
import CustomPopUp from '../../../Common/components/CustomPopUp'
import {
   isAPIFetching,
   getAPIErrorMessage
} from '../../../Common/utils/APIUtils'
import {
   showSuccessBottomCenterToast,
   showFailureBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'

import MessageSquareIcon from '../../icons/MessageSquareIcon'
import DiscussionModal from '../../stores/models/Discussion'

import CreateNewDiscussion from '../CreateNewDiscussion'
import CommentsList from '../CommentsList'
import ReplyInputSection from '../ReplyInputSection'

import {
   DiscussionContainer,
   ImageWrapper,
   ContentWrapper,
   TextContentWrapper,
   MoreOptionsWrapper,
   Title,
   DiscussionDetailsWrapper,
   Description,
   PopoverMenuContainer,
   PopoverMenuOption,
   RowContainer,
   StyledButton,
   ButtonText
} from './styledComponents'

interface DiscussionProps extends WithTranslation {
   data: DiscussionModal
   refreshFn: () => void
}

@observer
class Discussion extends Component<DiscussionProps> {
   @observable canDisplayReplyInputSection = false
   @observable canDisplayComments = false
   @observable canDisplayEditDiscussionModal = false
   discussionDeleteRef

   prefixForT = 'discussions:'
   // TODO: Refactor the code based on the new-Zeplin screens

   constructor(props) {
      super(props)
      this.discussionDeleteRef = React.createRef<BaseModalContainer>()
   }

   onGetCommentsFailure = ({ showToast, message, type }) => {
      this.toggleDisplayReplies()
      showToast({ message, type })
   }

   renderCommentsList = () => {
      const {
         comments,
         getComments,
         getCommentsAPIStatus,
         modifyOffsetValue
      } = this.props.data
      const { onGetCommentsFailure } = this
      return (
         <CommentsList
            fetchedData={comments}
            apiStatus={getCommentsAPIStatus}
            doNetworkCall={getComments}
            modifyOffsetValue={modifyOffsetValue}
            onFetchFailure={onGetCommentsFailure}
         />
      )
   }

   toggleDisplayReplies = () =>
      (this.canDisplayComments = !this.canDisplayComments)

   toggleDisplayOfReplyInputSection = () =>
      (this.canDisplayReplyInputSection = !this.canDisplayReplyInputSection)

   editDiscussionHandler = () => {
      this.canDisplayEditDiscussionModal = !this.canDisplayEditDiscussionModal
   }

   onDeleteSuccessfully = () => {
      const { t, refreshFn } = this.props
      this.closeDeleteModal()
      showSuccessBottomCenterToast('discussion deleted successfully')
      refreshFn()
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
      await data.getDeleteDiscussionAPI(onDeleteSuccessfully, onDeleteFailure)
   }

   renderPopoverMenuItems = () => {
      const {
         prefixForT,
         editDiscussionHandler,
         openDeleteModal,
         props: { t }
      } = this
      return (
         <PopoverMenuContainer>
            <PopoverMenuOption
               onClick={editDiscussionHandler}
               data-testid={'discussionEditMenu'}
            >
               {t(`${prefixForT}edit`)}
            </PopoverMenuOption>
            <PopoverMenuOption
               onClick={openDeleteModal}
               data-testid={'discussionDeleteMenu'}
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
            triggerTestId={'discussionPopOver'}
         />
      )
   }

   @action.bound
   async postCommentHandler(requestObjectData, onSuccess, onFailure) {
      const { postComment } = this.props.data
      await postComment(requestObjectData, onSuccess, onFailure)
      this.canDisplayReplyInputSection = false
      this.canDisplayComments = true
   }

   renderReplyInputSection = () => {
      const { toggleDisplayOfReplyInputSection, postCommentHandler } = this
      const { getPostCommentAPIStatus } = this.props.data
      return (
         <ReplyInputSection
            apiStatus={getPostCommentAPIStatus}
            cancelFn={toggleDisplayOfReplyInputSection}
            postReply={postCommentHandler}
         />
      )
   }

   renderEditDiscussionModal = () => {
      const {
         title,
         description,
         getUpdateDiscussionAPIStatus,
         getUpdateDiscussionAPI
      } = this.props.data
      const { editDiscussionHandler } = this
      return (
         <CreateNewDiscussion
            preloadedData={{ title, description }}
            generateNewDiscussionFn={getUpdateDiscussionAPI}
            apiStatus={getUpdateDiscussionAPIStatus}
            closeByFn={editDiscussionHandler}
         />
      )
   }

   renderDiscussionFooter = () => {
      const {
         props: {
            t,
            data: { commentsCount }
         },
         prefixForT,
         canDisplayComments,
         toggleDisplayReplies,
         toggleDisplayOfReplyInputSection
      } = this
      return (
         <RowContainer>
            {/* TODO: need to put constants */}
            <StyledButton
               variant={'TERTIARY'}
               type={'OUTLINE'}
               onClick={toggleDisplayOfReplyInputSection}
               startEnhancer={() => <MessageSquareIcon />}
               id={'discussionReplyButton'}
            >
               <ButtonText>{t(`${prefixForT}reply`)}</ButtonText>
            </StyledButton>
            {commentsCount > 0 && (
               <StyledButton
                  variant={'TERTIARY'}
                  type={'OUTLINE'}
                  onClick={toggleDisplayReplies}
                  id={'discussionShowHideButton'}
               >
                  <ButtonText>
                     {t(
                        `${prefixForT}${
                           canDisplayComments ? 'hideReplies' : 'showReplies'
                        }`,
                        { count: commentsCount }
                     )}
                  </ButtonText>
               </StyledButton>
            )}
         </RowContainer>
      )
   }

   openDeleteModal = (): void => {
      this.discussionDeleteRef.current?.openModal()
   }

   closeDeleteModal = (): void => {
      this.discussionDeleteRef.current?.closeModal()
   }

   renderDeleteModal = () => {
      const {
         t,
         data: { getDeleteDiscussionAPIStatus }
      } = this.props
      // TODO: need to use constants here
      return (
         <CustomPopUp
            ref={this.discussionDeleteRef}
            onCancel={this.closeDeleteModal}
            onConfirm={this.deleteDiscussionHandler}
            actionType={'DELETE'}
            description={t(
               `${this.prefixForT}areYouSureYouWantToDeleteThisDiscussion`
            )}
            isSubmitButtonLoading={isAPIFetching(getDeleteDiscussionAPIStatus)}
         />
      )
   }

   render() {
      const {
         renderReplyInputSection,
         renderEditDiscussionModal,
         prefixForT,
         canDisplayComments,
         canDisplayReplyInputSection,
         canDisplayEditDiscussionModal,
         renderDiscussionFooter,
         renderCommentsList,
         renderKebabMenu,
         renderDeleteModal
      } = this
      const {
         t,
         data: {
            description,
            title,
            creationDate,
            creationTime,
            userName,
            imageURL,
            isEditable
         }
      } = this.props

      return (
         <DiscussionContainer>
            <ImageWrapper>
               {/* FIXME: need to get profile pic from backend*/}
               <Avatar
                  size={'XS'}
                  type={'OUTLINE'}
                  variant={'CIRCLE'}
                  name={userName}
               />
            </ImageWrapper>
            <ContentWrapper>
               <TextContentWrapper>
                  <Title as='h2' data-testid={'discussionTitle'}>
                     {title}
                  </Title>
                  {/* FIXME: Change Time & Date Display format with new Zeplin screens by ime & date utils*/}
                  <DiscussionDetailsWrapper as='div'>
                     {t(`${prefixForT}authorInfoWithParams`, {
                        userName,
                        creationDate,
                        creationTime
                     })}
                  </DiscussionDetailsWrapper>
                  <Description
                     as='p'
                     dangerouslySetInnerHTML={{ __html: description }}
                     data-testid={'discussionDescription'}
                  />
                  {renderDiscussionFooter()}
                  {canDisplayReplyInputSection && renderReplyInputSection()}
                  {canDisplayComments && renderCommentsList()}
               </TextContentWrapper>
               <MoreOptionsWrapper>
                  {isEditable && renderKebabMenu()}
               </MoreOptionsWrapper>
               {canDisplayEditDiscussionModal && renderEditDiscussionModal()}
               {renderDeleteModal()}
            </ContentWrapper>
         </DiscussionContainer>
      )
   }
}

export default withTranslation()(Discussion)
