import { observable, action, computed } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { getCurrentDate } from '../../../../Common/utils/DateUtils'

import CardService from '../../../services/CardService'

import {
   CardResponseType,
   CardDetails,
   UpdateCardNameRequest,
   UpdateCardNoteRequest,
   UpdateAttachmentURLRequest,
   AddAttachmentRequest,
   AddAttachmentResponse,
   UpdateLabelRequest,
   UpdatePriorityRequest,
   UpdateDueDateAndTimeRequest
} from '../../types'

import BaseModel from '../BaseModel'

class CardModel extends BaseModel {
   @observable hasAttachments: boolean
   @observable hasNotes: boolean
   @observable priority!: number | null
   @observable label!: string | null
   @observable isSelected: boolean
   @observable cardStyleType!: string

   @observable cardDetails: any

   @observable getCardDetailsAPIStatus!: APIStatus
   @observable cardDetailsAPIError: any
   @observable cardDetailsAPIResponse!: CardDetails

   @observable updateCardNameAPIStatus!: APIStatus
   @observable updateCardNameAPIError: any

   @observable updateCardNoteAPIStatus!: APIStatus
   @observable updateCardNoteAPIError: any

   @observable addAttachmentAPIStatus!: APIStatus
   @observable addAttachmentAPIError!: any

   @observable updateAttachmentURLAPIStatus!: APIStatus
   @observable updateAttachmentURLAPIError: any

   @observable deleteAttachmentAPIStatus!: APIStatus
   @observable deleteAttachmentAPIError: any

   @observable updateCardLabelAPIStatus!: APIStatus
   @observable updateCardLabelAPIError: any

   @observable updateCardPriorityAPIStatus!: APIStatus
   @observable updateCardPriorityAPIError: any

   @observable updateCardDueDateAndTimeAPIStatus!: APIStatus
   @observable updateCardDueDateAndTimeAPIError: any

   cardService: CardService

   constructor(
      cardDetails: CardResponseType,
      extraCardDetails: CardDetails | null,
      cardService: CardService
   ) {
      const {
         card_id: id,
         card_title: name,
         has_attachments: hasAttachments,
         has_notes: hasNotes,
         priority,
         label,
         card_style_type: cardStyleType
      } = cardDetails
      super({ id, name })
      this.initCardModel()
      this.cardService = cardService
      this.label = label
      this.priority = priority
      this.hasAttachments = hasAttachments
      this.hasNotes = hasNotes
      if (cardStyleType) {
         this.cardStyleType = cardStyleType
      }
      if (extraCardDetails) {
         this.setCardDetailsAPIResponse(extraCardDetails)
      }
      this.isSelected = false
   }

   @action
   initCardModel() {
      this.getCardDetailsAPIStatus = API_INITIAL
      this.cardDetailsAPIError = {}

      this.updateCardNameAPIStatus = API_INITIAL
      this.updateCardNameAPIError = {}

      this.updateCardNoteAPIStatus = API_INITIAL
      this.updateCardNoteAPIError = {}

      this.addAttachmentAPIStatus = API_INITIAL
      this.addAttachmentAPIError = {}

      this.updateAttachmentURLAPIStatus = API_INITIAL
      this.updateAttachmentURLAPIError = {}

      this.deleteAttachmentAPIStatus = API_INITIAL
      this.deleteAttachmentAPIError = {}

      this.updateCardLabelAPIStatus = API_INITIAL
      this.updateCardLabelAPIError = {}

      this.updateCardPriorityAPIStatus = API_INITIAL
      this.updateCardPriorityAPIError = {}

      this.updateCardDueDateAndTimeAPIStatus = API_INITIAL
      this.updateCardDueDateAndTimeAPIError = {}
   }

   @action.bound
   toggleCardSelection(): void {
      this.isSelected = !this.isSelected
   }

   @action.bound
   setCardDetailsAPIStatus(status: APIStatus): void {
      this.getCardDetailsAPIStatus = status
   }

   @action.bound
   setCardDetailsAPIError(error: any): void {
      this.cardDetailsAPIError = error
   }

   @action.bound
   setCardDetailsAPIResponse(response: CardDetails | null): void {
      if (response) {
         const {
            card_id: id,
            card_title: title,
            priority: priority,
            label: label,
            notes: notes,
            due_datetime: dueDateAndTime,
            attachments
         } = response
         const updatedNotes = notes ? notes : ''
         const updatedPriority = priority ? priority : ''
         this.cardDetails = {
            id,
            title,
            notes: updatedNotes,
            priority: updatedPriority,
            label,
            attachments: [],
            dueDateAndTime: dueDateAndTime
         }
         //TODO: need to write modal for Attachment
         attachments.forEach(eachAttachment => {
            const {
               attachment_id: attachmentId,
               attachment_url: url,
               creation_datetime: creationDateTime
            } = eachAttachment
            this.cardDetails.attachments.push({
               attachmentId,
               url,
               creationDateTime
            })
         })
      }
   }

   @action.bound
   getCardDetailsAPI(
      cardId: string,
      onSuccess: () => void,
      onFailure: () => void
   ) {
      const createSectionPromise = this.cardService.getCardDetailsAPI(cardId)
      return bindPromiseWithOnSuccess(createSectionPromise)
         .to(this.setCardDetailsAPIStatus, response => {
            this.setCardDetailsAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setCardDetailsAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setUpdateCardNameAPIStatus(status: APIStatus): void {
      this.updateCardNameAPIStatus = status
   }

   @action.bound
   setUpdateCardNameAPIError(error: any): void {
      this.updateCardNameAPIError = error
   }

   @action.bound
   updateCardNameAPI(
      cardId: string,
      requestObject: UpdateCardNameRequest,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const updateCardNamePromise = this.cardService.updateCardNameAPI(
         cardId,
         requestObject
      )
      return bindPromiseWithOnSuccess(updateCardNamePromise)
         .to(this.setUpdateCardNameAPIStatus, response => {
            this.name = requestObject.card_title
            if (this.cardDetails)
               this.cardDetails.title = requestObject.card_title
            onSuccess()
         })
         .catch(error => {
            this.setUpdateCardNameAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setUpdateCardNoteAPIStatus(status: APIStatus): void {
      this.updateCardNoteAPIStatus = status
   }

   @action.bound
   setUpdateCardNoteAPIError(error: any): void {
      this.updateCardNoteAPIError = error
   }

   @action.bound
   updateCardNoteAPI(
      cardId: string,
      requestObject: UpdateCardNoteRequest,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const updateCardNotePromise = this.cardService.updateCardNoteAPI(
         cardId,
         requestObject
      )
      return bindPromiseWithOnSuccess(updateCardNotePromise)
         .to(this.setUpdateCardNoteAPIStatus, response => {
            const { card_note } = requestObject
            this.hasNotes = card_note ? true : false
            this.cardDetails.notes = card_note
            onSuccess()
         })
         .catch(error => {
            this.setUpdateCardNoteAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setAddAttachmentAPIStatus(status: APIStatus): void {
      this.addAttachmentAPIStatus = status
   }

   @action.bound
   setAddAttachmentAPIError(error: any): void {
      this.addAttachmentAPIError = error
   }

   @action.bound
   setAddAttachmentAPIResponse(requestObject, response): void {
      if (response) {
         this.cardDetails.attachments.push({
            attachmentId: response.attachment_id,
            url: requestObject.url,
            creationDateTime: getCurrentDate()
         })
      }
   }

   @action.bound
   addAttachmentAPI(
      cardId: string,
      requestObject: AddAttachmentRequest,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const addAttachmentPromise = this.cardService.addAttachmentAPI(
         cardId,
         requestObject
      )
      return bindPromiseWithOnSuccess(addAttachmentPromise)
         .to(
            this.setAddAttachmentAPIStatus,
            (response: AddAttachmentResponse | null) => {
               this.setAddAttachmentAPIResponse(requestObject, response)
               this.hasAttachments = true
               onSuccess()
            }
         )
         .catch(error => {
            this.setAddAttachmentAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setUpdateAttachmentURLAPIStatus(status: APIStatus): void {
      this.updateAttachmentURLAPIStatus = status
   }

   @action.bound
   setUpdateAttachmentURLAPIError(error: any): void {
      this.updateAttachmentURLAPIError = error
   }

   @action.bound
   updateAttachmentURLAPI(
      attachmentId: string,
      requestObject: UpdateAttachmentURLRequest,
      onSuccess: Function = (): void => {},
      onFailure: Function = (error): void => {}
   ) {
      const updateAttachmentURLPromise = this.cardService.updateAttachmentURLAPI(
         attachmentId,
         requestObject
      )
      return bindPromiseWithOnSuccess(updateAttachmentURLPromise)
         .to(this.setUpdateAttachmentURLAPIStatus, response => {
            onSuccess()
         })
         .catch(error => {
            this.setUpdateAttachmentURLAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setDeleteAttachmentAPIStatus(status: APIStatus): void {
      this.deleteAttachmentAPIStatus = status
   }

   @action.bound
   setDeleteAttachmentAPIError(error: any): void {
      this.deleteAttachmentAPIError = error
   }

   @action.bound
   deleteAttachmentAPI(
      attachmentId: string,
      onSuccess: () => void,
      onFailure: (error) => void
   ) {
      const deleteAttachmentPromise = this.cardService.deleteAttachmentAPI(
         attachmentId
      )
      return bindPromiseWithOnSuccess(deleteAttachmentPromise)
         .to(this.setDeleteAttachmentAPIStatus, () => {
            this.cardDetails.attachments = this.cardDetails.attachments.filter(
               attachment => attachment.attachmentId !== attachmentId
            )
            this.onChangeHasAttachments()
            onSuccess()
         })
         .catch(error => {
            this.setDeleteAttachmentAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   onChangeHasAttachments() {
      if (!this.cardDetails.attachments.length) this.hasAttachments = false
   }

   @action.bound
   setUpdateLabelAPIStatus(status: APIStatus): void {
      this.updateCardLabelAPIStatus = status
   }

   @action.bound
   setUpdateLabelAPIError(error: any): void {
      this.updateCardLabelAPIError = error
   }

   @action.bound
   updateLabelAPI(
      requestObject: UpdateLabelRequest,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) {
      const updateLabelPromise = this.cardService.updateLabelAPI(
         this.id,
         requestObject
      )
      return bindPromiseWithOnSuccess(updateLabelPromise)
         .to(this.setUpdateLabelAPIStatus, () => {
            this.label = requestObject.label
            onSuccess()
         })
         .catch(error => {
            this.setUpdateLabelAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setUpdatePriorityAPIStatus(status: APIStatus): void {
      this.updateCardPriorityAPIStatus = status
   }

   @action.bound
   setUpdatePriorityAPIError(error: any): void {
      this.updateCardPriorityAPIError = error
   }

   @action.bound
   updatePriorityAPI(
      requestObject: UpdatePriorityRequest,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) {
      const updateLabelPromise = this.cardService.updatePriorityAPI(
         this.id,
         requestObject
      )
      return bindPromiseWithOnSuccess(updateLabelPromise)
         .to(this.setUpdatePriorityAPIStatus, () => {
            this.priority = requestObject.priority
            onSuccess()
         })
         .catch(error => {
            this.setUpdatePriorityAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setUpdateDueDateAndTimeAPIStatus(status: APIStatus): void {
      this.updateCardDueDateAndTimeAPIStatus = status
   }

   @action.bound
   setUpdateDueDateAndTimeAPIError(error: any): void {
      this.updateCardDueDateAndTimeAPIError = error
   }

   @action.bound
   updateDueDateAndTimeAPI(
      requestObject: UpdateDueDateAndTimeRequest,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) {
      const updateDueDateAndTimePromise = this.cardService.updateDueDateAndTimeAPI(
         this.id,
         requestObject
      )
      return bindPromiseWithOnSuccess(updateDueDateAndTimePromise)
         .to(this.setUpdateDueDateAndTimeAPIStatus, () => {
            this.cardDetails.dueDateAndTime = requestObject.due_datetime
            onSuccess()
         })
         .catch(error => {
            this.cardDetails.dueDateAndTime = this.cardDetails.dueDateAndTime
            this.setUpdateDueDateAndTimeAPIError(error)
            onFailure(error)
         })
   }
}

export default CardModel
