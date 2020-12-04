import React, { Component, ReactElement, Ref } from 'react'

import { APIStatus } from '@ib/api-constants'

import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import UsersGroupModel from '../../../UserProfile/stores/models/UsersGroupModel'

import { PublishWorkbookRequest } from '../../stores/types'
import PublishWorkbookPopUp from '../PublishWorkbookPopUp'

interface PublishWorkbookPopUpWrapperProps {
   innerRef: Ref<BaseModalContainer>
   onCancel: () => void
   getUsersGroupsAPI: (
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) => void
   getUsersGroupAPIStatus: APIStatus
   getUsersGroupAPIError: any
   userGroups: Map<string, UsersGroupModel>
   publishAssignmentWorkbookAPI: (requestObject: PublishWorkbookRequest) => void
   publishAssignmentWorkbookAPIStatus: APIStatus
}

class PublishWorkbookPopUpWrapper extends Component<
   PublishWorkbookPopUpWrapperProps
> {
   render(): ReactElement {
      const { innerRef, ...other } = this.props
      return (
         <BaseModalContainer ref={innerRef} hideCloseIcon>
            <PublishWorkbookPopUp {...other} />
         </BaseModalContainer>
      )
   }
}

export default PublishWorkbookPopUpWrapper
