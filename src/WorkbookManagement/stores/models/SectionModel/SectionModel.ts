import { observable, action, computed } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import SectionService from '../../../services/SectionService'
import CardService from '../../../services/CardService'

import {
   SectionResponseType,
   CardResponseType,
   CreateCardRequest,
   CreateCardResponse,
   UpdateSectionNameRequest,
   MoveCardRequestType
} from '../../types'

import BaseModel from '../BaseModel'
import CardModel from '../CardModel'

class SectionModel extends BaseModel {
   @observable cards: Map<string, CardModel>

   @observable createCardAPIStatus!: APIStatus
   @observable createCardAPIError: any

   @observable updateSectionNameAPIStatus!: APIStatus
   @observable updateSectionNameAPIError: any

   @observable deleteCardAPIStatus!: APIStatus
   @observable deleteCardAPIError: any

   @observable moveCardAPIStatus!: APIStatus
   // TODO: Need to fix the type
   @observable moveCardAPIError!: any

   @observable cardTitle: string
   @observable priority!: number | null
   @observable label!: string | null

   sectionService: SectionService
   cardService: CardService

   constructor(
      sectionDetails: SectionResponseType,
      sectionService: SectionService,
      cardService: CardService
   ) {
      const { section_id: id, section_name: name, cards } = sectionDetails
      super({ id, name })
      this.initAPIStatusAndErrors()
      this.sectionService = sectionService
      this.cardService = cardService
      this.cardTitle = ''
      this.cards = new Map()
      this.setCards(cards)
   }

   @action.bound
   initAPIStatusAndErrors(): void {
      this.createCardAPIStatus = API_INITIAL
      this.createCardAPIError = {}

      this.updateSectionNameAPIStatus = API_INITIAL
      this.updateSectionNameAPIError = {}

      this.deleteCardAPIStatus = API_INITIAL
      this.deleteCardAPIError = {}

      this.moveCardAPIStatus = API_INITIAL
      this.moveCardAPIError = {}
   }

   @action.bound
   setCards(cards: Array<CardResponseType>): void {
      cards.map(card => {
         const { card_id: id } = card
         this.cards.set(id, new CardModel(card, null, this.cardService))
      })
   }

   @action.bound
   setCreateCardAPIStatus(status: APIStatus): void {
      this.createCardAPIStatus = status
   }

   @action.bound
   setCreateCardAPIError(error: any): void {
      this.createCardAPIError = error
   }

   @computed get cardValues() {
      return Array.from(this.cards.values())
   }

   @action.bound
   setCreateCardAPIResponse(response: CreateCardResponse | null): void {
      if (response) {
         const { card_id: id } = response
         const cardDetails = {
            card_id: id,
            card_title: this.cardTitle,
            has_attachments: false,
            has_notes: false,
            label: this.label,
            priority: this.priority
         }
         this.cards.set(id, new CardModel(cardDetails, null, this.cardService))
      }
   }

   @action.bound
   createCardAPI(
      requestObject: CreateCardRequest,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) {
      const { card_title, priority, label } = requestObject
      this.cardTitle = card_title
      this.priority = priority
      this.label = label
      const createCardPromise = this.sectionService.createCardAPI(requestObject)
      return bindPromiseWithOnSuccess(createCardPromise)
         .to(this.setCreateCardAPIStatus, response => {
            this.setCreateCardAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setCreateCardAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setUpdateSectionNameAPIStatus(status: APIStatus): void {
      this.updateSectionNameAPIStatus = status
   }

   @action.bound
   setUpdateSectionNameAPIError(error: any): void {
      this.updateSectionNameAPIError = error
   }

   @action.bound
   updateSectionNameAPI(
      requestObject: UpdateSectionNameRequest,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) {
      const { section_name } = requestObject
      const createCardPromise = this.sectionService.updateSectionNameAPI(
         this.id,
         requestObject
      )
      return bindPromiseWithOnSuccess(createCardPromise)
         .to(this.setUpdateSectionNameAPIStatus, response => {
            this.name = section_name
            onSuccess()
         })
         .catch(error => {
            this.setUpdateSectionNameAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setDeleteCardAPIStatus(status: APIStatus): void {
      this.deleteCardAPIStatus = status
   }

   @action.bound
   setDeleteCardAPIError(error: any): void {
      this.deleteCardAPIError = error
   }

   @action.bound
   deleteCardAPI(
      cardId: string,
      onSuccess: (cardName: string) => void,
      onFailure: (error: any) => void
   ) {
      const updateLabelPromise = this.sectionService.deleteCardAPI(cardId)
      return bindPromiseWithOnSuccess(updateLabelPromise)
         .to(this.setDeleteCardAPIStatus, () => {
            const deletedCard = this.cards.get(cardId)
            this.cards.delete(cardId)
            if (deletedCard) {
               const { name } = deletedCard
               onSuccess(name)
            }
         })
         .catch(error => {
            this.setDeleteCardAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setMoveCardAPIStatus(status: APIStatus): void {
      this.moveCardAPIStatus = status
   }

   // TODO: Need to update type
   @action.bound
   setMoveCardAPIError(error: any): void {
      this.moveCardAPIError = error
   }

   // TODO: Need to mention return type
   @action.bound
   moveCardAPI(
      cardId: string,
      request: MoveCardRequestType,
      onSuccess: (
         sectionName: string,
         sourceCardId: string,
         destinationSectionId: string
      ) => void,
      onFailure: (error: any) => void
   ) {
      const movePageListPromise = this.sectionService.moveCardAPI(
         cardId,
         request
      )
      return bindPromiseWithOnSuccess(movePageListPromise)
         .to(this.setMoveCardAPIStatus, () => {
            const moveCard = this.cards.get(cardId)
            if (moveCard) {
               const { name } = moveCard
               const { section_id: sectionId } = request
               onSuccess(name, cardId, sectionId)
            }
         })
         .catch(error => {
            this.setMoveCardAPIError(error)
            onFailure(error)
         })
   }
}

export default SectionModel
