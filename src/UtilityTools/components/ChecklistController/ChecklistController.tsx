import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
//eslint-disable-next-line
import { withTranslation, WithTranslation } from 'react-i18next'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import {
   showFailureBottomCenterToast,
   showSuccessBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import { getAPIErrorMessage } from '../../../Common/utils/APIUtils'

import ChecklistStore from '../../stores/ChecklistStore/ChecklistStore'
import { NewCheckListType } from '../../stores/types'

import Checklist from '../Checklist'

interface ChecklistControllerProps extends WithTranslation {
   entityId: any
   entityType: any
}

interface InjectedProps extends ChecklistControllerProps {
   checklistStore: ChecklistStore
}

@inject('checklistStore')
@observer
class ChecklistController extends Component<ChecklistControllerProps> {
   componentDidMount() {
      this.getChecklistData()
   }

   componentWillUnmount() {
      this.getChecklistStore().clearStore()
   }

   getChecklistData = () => {
      const { entityId, entityType } = this.props
      this.getChecklistStore().getChecklist({
         entity_id: entityId,
         entity_type: entityType
      })
   }

   getInjectedProps = () => this.props as InjectedProps

   getChecklistStore = () => this.getInjectedProps().checklistStore

   getChecklistItems = () => {
      const { checklist } = this.getChecklistStore()
      if (checklist) {
         return Array.from(checklist.values())
      }
      return []
   }

   onFailure = (apiError: Error | null) => {
      if (apiError) {
         showFailureBottomCenterToast(getAPIErrorMessage(apiError))
      }
   }

   onSuccess = () => {
      const { t } = this.props
      showSuccessBottomCenterToast(
         t('utilityTools:checklist.checklistAddedSuccessfully')
      )
   }

   postNewChecklistItem = () => {
      const { postNewChecklistItem } = this.getChecklistStore()
      postNewChecklistItem(this.onSuccess, this.onFailure)
   }

   onSuccessRemoveChecklistItem = (): void => {
      const { t } = this.props
      showSuccessBottomCenterToast(
         t('utilityTools:checklist.checklistRemovedSuccessfully')
      )
   }

   onFailureRemoveChecklistItem = (error: any): void => {
      showFailureBottomCenterToast(getAPIErrorMessage(error))
   }

   removeNewChecklistItem = (id: string) => {
      const { removeNewChecklistItemAPI } = this.getChecklistStore()
      removeNewChecklistItemAPI(
         id,
         this.onSuccessRemoveChecklistItem,
         this.onFailureRemoveChecklistItem
      )
   }

   addDefaultChecklist = (requestObject: NewCheckListType): void => {
      const { addNewChecklistItem } = this.getChecklistStore()
      addNewChecklistItem(requestObject)
      this.postNewChecklistItem()
   }

   renderSuccessView = observer(() => (
      <Checklist
         onPostNewChecklistItem={this.postNewChecklistItem}
         onAddChecklistItem={this.addDefaultChecklist}
         removeNewChecklistItem={this.removeNewChecklistItem}
         checklist={this.getChecklistItems()}
      />
   ))

   render() {
      const {
         getChecklistAPIStatus,
         getChecklistAPIError
      } = this.getChecklistStore()
      return (
         <LoadingWrapper
            containerStyle={{ height: '100%' }}
            apiStatus={getChecklistAPIStatus}
            apiError={getChecklistAPIError}
            onRetry={this.getChecklistData}
            renderSuccessUI={this.renderSuccessView}
         />
      )
   }
}

export default withTranslation()(ChecklistController)
