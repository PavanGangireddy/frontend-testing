import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { API_INITIAL, APIStatus } from '@ib/api-constants'

import { ShareWorkbookRequest } from '../../../FolderManagement/stores/types'
import AddPeopleIcon from '../../../Common/icons/AddPeopleIcon'
import ShareFolderOrWorkBook from '../../../Common/components/ShareFolderOrWorkBook'
import Avatar from '../../../Common/components/Avatar'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'

import UserModel from '../../stores/models/UserModel'

import { avatar } from './constants'
import {
   SharedPeopleContainer,
   SharedPeopleHeader,
   SharedPeopleTitle,
   TitleContainer,
   UsersList,
   UserItemContainer,
   UserItemBody,
   Username,
   PermissionLevel,
   Footer,
   ShareWorkbookButton,
   ButtonText
} from './styledComponents'

// FIXME: Need to fix WithTranslation Props
interface WithTranslation {
   i18n: any
   tReady: any
   t: any
}

interface SharePeopleListProps extends WithTranslation {
   sharedUsers: Map<string, UserModel>
   shareWorkbookAPI: (
      requestObject: ShareWorkbookRequest,
      onSuccess: () => void,
      onFailure: () => void
   ) => void
   shareFolderOrWorkbookAPIStatus: APIStatus
   shareFolderOrWorkbookAPIError: any
   workbookId: string
   name: string
   getSharedUsersDetails: (isRefresh: boolean) => void
}

@observer
class SharePeopleList extends Component<SharePeopleListProps> {
   shareWorkbookRef

   constructor(props) {
      super(props)
      this.shareWorkbookRef = React.createRef<BaseModalContainer>()
   }

   SharedUsersList = (): React.ReactNode => {
      const { sharedUsers } = this.props
      const usersList = Array.from(sharedUsers.values())
      return usersList.map(eachUser => (
         <UserItemContainer key={eachUser.profilePic}>
            {/* TODO: need to put profilePic url from backend */}
            <Avatar
               size={avatar.extraSmall}
               name={eachUser.userName}
               variant={avatar.circle}
               type={avatar.outline}
               alt={avatar.alt}
            />
            <UserItemBody>
               <Username>{eachUser.userName}</Username>
               <PermissionLevel>
                  {eachUser.permissionLevel.toLowerCase()}
               </PermissionLevel>
            </UserItemBody>
         </UserItemContainer>
      ))
   }

   closeModal = () => {
      if (this.shareWorkbookRef) this.shareWorkbookRef.current?.closeModal()
   }

   openModal = () => {
      if (this.shareWorkbookRef) this.shareWorkbookRef.current?.openModal()
   }

   onSuccessShareFolderOrWorkbook = () => {
      const { getSharedUsersDetails } = this.props
      getSharedUsersDetails(true)
   }

   renderShareWorkbookModel = () => {
      const {
         shareWorkbookAPI,
         shareFolderOrWorkbookAPIStatus,
         workbookId,
         name
      } = this.props
      return (
         <ShareFolderOrWorkBook
            onCancel={this.closeModal}
            isFolder={false}
            innerRef={this.shareWorkbookRef}
            folderOrWorkbookID={workbookId}
            shareFolderOrWorkbookAPI={shareWorkbookAPI}
            shareFolderOrWorkbookAPIStatus={shareFolderOrWorkbookAPIStatus}
            name={name}
            onSuccessShareFolderOrWorkbook={this.onSuccessShareFolderOrWorkbook}
         />
      )
   }

   render(): React.ReactNode {
      const { t } = this.props

      return (
         <SharedPeopleContainer>
            <SharedPeopleHeader>
               <TitleContainer>
                  <AddPeopleIcon />
                  <SharedPeopleTitle>
                     {t(`workbookManagement:workbook.sharedWith`)}
                  </SharedPeopleTitle>
               </TitleContainer>
            </SharedPeopleHeader>
            <UsersList>{this.SharedUsersList()}</UsersList>
            <Footer>
               <ShareWorkbookButton
                  onClick={this.openModal}
                  id='shareWorkbookButton'
               >
                  <ButtonText>{t`workbookManagement:workbook.shareWorkbook`}</ButtonText>
               </ShareWorkbookButton>
            </Footer>
            {this.renderShareWorkbookModel()}
         </SharedPeopleContainer>
      )
   }
}

export default withTranslation()(SharePeopleList)
