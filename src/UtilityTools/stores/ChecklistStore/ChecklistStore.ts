import { observable, ObservableMap, action, computed } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import ChecklistService from '../../services/ChecklistService'

import ChecklistItemModel from '../models/ChecklistItemModel'
import {
   GetChecklistResponseType,
   GetChecklistRequestType,
   PostChecklistItemResponseType,
   NewCheckListType
} from '../types'

class ChecklistStore {
   @observable checklist!: ObservableMap<any, any>
   @observable getChecklistAPIStatus!: APIStatus
   @observable getChecklistAPIError!: any
   @observable postChecklistItemAPIStatus!: APIStatus
   @observable postChecklistItemAPIError!: any
   @observable removeChecklistItemAPIStatus!: APIStatus
   @observable removeChecklistItemAPIError!: any

   checklistService: ChecklistService
   entityId!: string
   entityType!: string

   constructor(checklistService: ChecklistService) {
      this.checklistService = checklistService
      this.init()
   }

   @action.bound
   init() {
      this.getChecklistAPIStatus = API_INITIAL
      this.getChecklistAPIError = null
      this.postChecklistItemAPIStatus = API_INITIAL
      this.postChecklistItemAPIError = null
      this.removeChecklistItemAPIStatus = API_INITIAL
      this.removeChecklistItemAPIError = null
      this.checklist = new ObservableMap()
   }

   @action.bound
   addNewChecklistItem(requestObject: NewCheckListType) {
      if (this.checklist.has(this.entityId)) {
         return
      }
      this.checklist.set(
         this.entityId,
         new ChecklistItemModel(this.checklistService)
      )
      const { updateText, updateIsChecked } = this.newChecklistItem
      const { text, isChecked } = requestObject
      updateText(text)
      updateIsChecked(isChecked)
   }

   @action.bound
   removeNewChecklistItem(id: string) {
      this.checklist.delete(id)
   }

   @computed get newChecklistItem() {
      return this.checklist.get(this.entityId)
   }

   @action.bound
   setGetChecklistAPIStatus(apiStatus: APIStatus) {
      this.getChecklistAPIStatus = apiStatus
   }

   @action.bound
   setGetChecklistAPIError(apiError: Error) {
      this.getChecklistAPIError = apiError
   }

   @action.bound
   setGetChecklistAPIResponse(
      apiResponse: GetChecklistResponseType,
      requestObject: GetChecklistRequestType
   ) {
      const { entity_id, entity_type } = requestObject
      this.entityId = entity_id
      this.entityType = entity_type
      if (apiResponse) {
         const { checklist } = apiResponse
         checklist.map(item =>
            this.checklist.set(
               item.checklist_item_id,
               new ChecklistItemModel(this.checklistService, item)
            )
         )
      }
   }

   @action.bound
   getChecklist(requestObject: GetChecklistRequestType) {
      const getChecklistPromise = this.checklistService.getChecklist(
         requestObject
      )
      const {
         setGetChecklistAPIStatus,
         setGetChecklistAPIResponse,
         setGetChecklistAPIError
      } = this

      return bindPromiseWithOnSuccess(getChecklistPromise)
         .to(setGetChecklistAPIStatus, res =>
            setGetChecklistAPIResponse(
               res as GetChecklistResponseType,
               requestObject
            )
         )
         .catch(e => setGetChecklistAPIError(e))
   }

   @computed get postRequestObject() {
      const { text, isChecked } = this.newChecklistItem
      return {
         entity_id: this.entityId,
         entity_type: this.entityType,
         text: text,
         is_checked: isChecked
      }
   }

   @action.bound
   setPostChecklistItemAPIStatus(apiStatus: APIStatus) {
      this.postChecklistItemAPIStatus = apiStatus
   }

   @action.bound
   setPostChecklistItemAPIError(apiError: Error) {
      this.postChecklistItemAPIError = apiError
   }

   @action.bound
   setPostChecklistItemAPIResponse(
      apiResponse: PostChecklistItemResponseType | null
   ) {
      if (apiResponse) {
         const { updateId } = this.newChecklistItem
         const { checklist_item_id } = apiResponse
         const { checklist, newChecklistItem, entityId } = this
         updateId(checklist_item_id)
         checklist.delete(entityId)
         checklist.set(checklist_item_id, newChecklistItem)
      }
   }

   @action.bound
   postNewChecklistItem(onSuccess: () => void, onFailure: (e: Error) => void) {
      const postChecklistItemPromise = this.checklistService.postChecklistItem(
         this.postRequestObject
      )
      const {
         setPostChecklistItemAPIStatus,
         setPostChecklistItemAPIResponse,
         setPostChecklistItemAPIError
      } = this
      return bindPromiseWithOnSuccess(postChecklistItemPromise)
         .to(setPostChecklistItemAPIStatus, response => {
            setPostChecklistItemAPIResponse(response)
            onSuccess()
         })
         .catch(e => {
            setPostChecklistItemAPIError(e)
            onFailure(e)
         })
   }

   @action.bound
   setRemoveChecklistItemAPIStatus(status: APIStatus): void {
      this.removeChecklistItemAPIStatus = status
   }

   @action.bound
   setRemoveChecklistItemAPIError(error: any): void {
      this.removeChecklistItemAPIError = error
   }

   @action.bound
   removeNewChecklistItemAPI(
      id,
      onSuccess: () => void = () => {},
      onFailure: (error: any) => void = () => {}
   ) {
      const removeChecklistItemPromise = this.checklistService.removeChecklistItemAPI(
         id
      )
      return bindPromiseWithOnSuccess(removeChecklistItemPromise)
         .to(this.setRemoveChecklistItemAPIStatus, () => {
            this.removeNewChecklistItem(id)
            onSuccess()
         })
         .catch(error => {
            this.setRemoveChecklistItemAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   clearStore() {
      this.init()
   }
}

export default ChecklistStore
