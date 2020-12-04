import { observable, action } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import ChecklistService from '../../../services/ChecklistService'

import { ChecklistItemType, PutChecklistItemRequestType } from '../../types'

class ChecklistItemModel {
   //TODO: Need to change this
   @observable text = 'Click here to add your response'
   @observable isChecked = false
   @observable id = ''
   @observable putChecklistItemAPIStatus!: APIStatus
   @observable putChecklistItemAPIError!: any

   checklistService: ChecklistService

   constructor(
      checklistService: ChecklistService,
      checklistItem?: ChecklistItemType
   ) {
      this.checklistService = checklistService
      this.putChecklistItemAPIStatus = API_INITIAL
      this.putChecklistItemAPIError = null
      if (checklistItem) {
         this.init(checklistItem)
      }
   }

   @action.bound
   init(checklistItem: ChecklistItemType) {
      const { checklist_item_id, text, is_checked } = checklistItem
      this.id = checklist_item_id
      this.text = text
      this.isChecked = is_checked
   }

   @action.bound
   updateId(id: string) {
      this.id = id
   }

   @action.bound
   updateText(text: string) {
      this.text = text
   }

   @action.bound
   updateIsChecked(isChecked: boolean) {
      this.isChecked = isChecked
   }

   @action.bound
   setPutChecklistItemAPIStatus(apiStatus: APIStatus) {
      this.putChecklistItemAPIStatus = apiStatus
   }

   @action.bound
   setPutChecklistItemAPIError(apiError: any) {
      this.putChecklistItemAPIError = apiError
   }

   @action.bound
   putChecklistItem(
      request: PutChecklistItemRequestType,
      onSuccess: Function = () => {},
      onFailure: (e: Error) => void
   ) {
      const {
         id,
         setPutChecklistItemAPIStatus,
         setPutChecklistItemAPIError
      } = this
      const putChecklistItemPromise = this.checklistService.putChecklistItem(
         id,
         request
      )

      return bindPromiseWithOnSuccess(putChecklistItemPromise)
         .to(setPutChecklistItemAPIStatus, _ => {
            this.updateIsChecked(request.is_checked)
            this.updateText(request.text)
            onSuccess()
         })
         .catch(e => {
            setPutChecklistItemAPIError(e)
            onFailure(e)
         })
   }
}

export default ChecklistItemModel
