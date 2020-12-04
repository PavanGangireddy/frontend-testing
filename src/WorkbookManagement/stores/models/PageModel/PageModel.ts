import { stringify } from 'querystring'
import { observable, action } from 'mobx'

import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import PageService from '../../../services/PageService'

import {
   PageResponseType,
   ListResponseType,
   CreatePageListAPIRequestType,
   ReorderListSectionAPIRequestType,
   ReorderPageListAPIRequestType,
   PageNameType,
   ReorderSectionCardAPIRequestType,
   GetMultipleCardDetailsRequestType,
   GetMultipleCardDetailsResponseType,
   MoveListRequestType,
   AssignmentSubmitResponse
} from '../../types'

import ListService from '../../../services/ListService'
import SectionService from '../../../services/SectionService'
import CardService from '../../../services/CardService'
import EvaluationPageService from '../../../services/Evaluation/PageService'
import {
   PAGE_OBJECTIVE_PLACEHOLDER,
   PAGE_DESCRIPTION_PLACEHOLDER
} from '../../../constants/UIConstants'

import BaseModel from '../BaseModel'
import ListModel from '../ListModel'
import CardModel from '../CardModel'
import SectionModel from '../SectionModel'
import AssignmentResultModel from '../AssignmentResultModel'

class PageModel extends BaseModel {
   @observable objective: string
   @observable description: string
   @observable lists: Map<string, ListModel>
   @observable createPageListAPIStatus!: APIStatus
   // TODO: Need to fix the type
   @observable createPageListAPIError!: any
   @observable reorderListSectionAPIStatus!: APIStatus
   // TODO: Need to fix the type
   @observable reorderListSectionAPIError!: any
   @observable reorderPageListAPIStatus!: APIStatus
   // TODO: Need to fix the type
   @observable reorderPageListAPIError!: any
   @observable updatePageNameAPIStatus!: APIStatus
   @observable updatePageNameAPIError!: any
   @observable deleteListAPIStatus!: APIStatus
   @observable getDeleteListAPIError!: any
   @observable reorderSectionCardAPIStatus!: APIStatus
   // TODO: Need to fix the type
   @observable reorderSectionCardAPIError!: any
   @observable getMultipleCardDetailsAPIStatus!: APIStatus
   // TODO: Need to update type
   @observable getMultipleCardDetailsAPIError!: any
   @observable cardsDetails!: Array<CardModel>
   @observable moveListAPIStatus!: APIStatus
   // TODO: Need to fix the type
   @observable moveListAPIError!: any
   @observable submitAssignmentAPIStatus!: APIStatus
   // TODO: Need to fix the type
   @observable submitAssignmentAPIError!: any
   @observable assignmentResult!: AssignmentResultModel | null
   @observable pageStatus!: string | null

   pageService: PageService
   listService: ListService
   sectionService: SectionService
   cardService: CardService
   evaluationPageService: EvaluationPageService

   constructor(
      pageDetails: PageResponseType,
      pageService: PageService,
      listService: ListService,
      sectionService: SectionService,
      cardService: CardService,
      evaluationPageService: EvaluationPageService,
      pageStatus: string | null = null,
      assignmentResult: AssignmentResultModel | null = null
   ) {
      const {
         page_id: id,
         page_name: name,
         page_objective: objective,
         page_description: description,
         lists
      } = pageDetails
      super({ id, name })
      this.pageService = pageService
      this.listService = listService
      this.sectionService = sectionService
      this.cardService = cardService
      this.evaluationPageService = evaluationPageService
      this.objective = objective
      this.description = description
      this.lists = new Map()
      this.cardsDetails = []
      this.setLists(lists)
      this.initAPIVariables()
      this.pageStatus = pageStatus
      this.assignmentResult = assignmentResult
   }

   @action.bound
   setLists(lists: Array<ListResponseType>): void {
      lists.map(list => {
         const { list_id: id } = list
         this.lists.set(
            id,
            new ListModel(
               list,
               this.listService,
               this.sectionService,
               this.cardService
            )
         )
      })
   }

   @action.bound
   setPageObjectiveWithDescription(
      objective: string,
      description: string
   ): void {
      this.objective = objective
      this.description = description
   }

   @action.bound
   setPageName(name: string): void {
      this.name = name
   }

   @action.bound
   initAPIVariables(): void {
      this.createPageListAPIStatus = API_INITIAL
      this.createPageListAPIError = {}
      this.reorderListSectionAPIStatus = API_INITIAL
      this.reorderListSectionAPIError = {}
      this.reorderPageListAPIStatus = API_INITIAL
      this.reorderPageListAPIError = {}
      this.updatePageNameAPIStatus = API_INITIAL
      this.deleteListAPIStatus = API_INITIAL
      this.reorderSectionCardAPIStatus = API_INITIAL
      this.reorderSectionCardAPIError = {}
      this.getMultipleCardDetailsAPIStatus = API_INITIAL
      this.getMultipleCardDetailsAPIError = {}
      this.moveListAPIStatus = API_INITIAL
      this.moveListAPIError = {}
      this.submitAssignmentAPIStatus = API_INITIAL
      this.submitAssignmentAPIError = {}
   }

   @action.bound
   setCreatePageListAPIStatus(createPageListAPIStatus: APIStatus): void {
      this.createPageListAPIStatus = createPageListAPIStatus
   }

   @action.bound
   setCreatePageListAPIError(createPageListAPIError: Error): void {
      this.createPageListAPIError = createPageListAPIError
   }

   // TODO: Need to mention return type
   @action.bound
   createPageListAPI(
      request: CreatePageListAPIRequestType,
      onSuccess: () => void,
      onFailure: (error: Error) => void
   ) {
      const createPageListPromise = this.pageService.createPageListAPI(request)
      return bindPromiseWithOnSuccess(createPageListPromise)
         .to(this.setCreatePageListAPIStatus, _ => {
            onSuccess()
         })
         .catch((error: Error) => {
            this.setCreatePageListAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setReorderListSectionAPIStatus(
      reorderListSectionAPIStatus: APIStatus
   ): void {
      this.reorderListSectionAPIStatus = reorderListSectionAPIStatus
   }

   @action.bound
   setReorderListSectionAPIError(reorderListSectionAPIError: Error): void {
      this.reorderListSectionAPIError = reorderListSectionAPIError
   }

   @action.bound
   changeListSectionOrder(
      sourceListId: string,
      destinationListId: string,
      sectionId: string,
      destinationSectionOrder: number
   ): void {
      const sourceList = this.lists.get(sourceListId)
      const destinationList = this.lists.get(destinationListId)
      if (sourceList && destinationList) {
         const { sections: sourceListSections } = sourceList
         const { sections: destinationListSections } = destinationList
         const sourceListSection = sourceListSections.get(sectionId)
         sourceListSections.delete(sectionId)
         const destinationListSectionsArray = Array.from(
            destinationListSections
         )
         if (sourceListSection) {
            destinationListSectionsArray.splice(destinationSectionOrder, 0, [
               sectionId,
               sourceListSection
            ])
         }
         const destinationListSectionsMap = new Map(
            destinationListSectionsArray
         )
         destinationList.sections = destinationListSectionsMap
         this.lists[destinationListId] = destinationList
      }
   }

   // TODO: Need to mention return type
   @action.bound
   reorderListSectionAPI(
      sectionId: string,
      request: ReorderListSectionAPIRequestType,
      onFailure: () => void
   ) {
      const reorderListSectionPromise = this.pageService.reorderListSectionAPI(
         sectionId,
         request
      )
      return bindPromiseWithOnSuccess(reorderListSectionPromise)
         .to(this.setReorderListSectionAPIStatus, _ => {})
         .catch((error: Error) => {
            this.setReorderListSectionAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setReorderPageListAPIStatus(reorderPageListAPIStatus: APIStatus): void {
      this.reorderPageListAPIStatus = reorderPageListAPIStatus
   }

   @action.bound
   setReorderPageListAPIError(reorderPageListAPIError: Error): void {
      this.reorderPageListAPIError = reorderPageListAPIError
   }

   @action.bound
   changePageListOrder(listId: string, destinationOrder: number): void {
      const sourceList = this.lists.get(listId)
      this.lists.delete(listId)
      const listsArray = Array.from(this.lists)
      if (sourceList) {
         listsArray.splice(destinationOrder, 0, [listId, sourceList])
      }
      this.lists = new Map(listsArray)
   }

   // TODO: Need to mention return type
   @action.bound
   reorderPageListAPI(
      listId: string,
      request: ReorderPageListAPIRequestType,
      onFailure: () => void
   ) {
      const reorderPageListPromise = this.pageService.reorderPageListAPI(
         listId,
         request
      )
      return bindPromiseWithOnSuccess(reorderPageListPromise)
         .to(this.setReorderPageListAPIStatus, () => {})
         .catch((error: Error) => {
            this.setReorderPageListAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setUpdatePageNameAPIStatus(pageNameAPIStatus): void {
      this.updatePageNameAPIStatus = pageNameAPIStatus
   }

   @action.bound
   setUpdatePageNameAPIError(updatePageNameAPIError: Error): void {
      this.updatePageNameAPIError = updatePageNameAPIError
   }

   @action.bound
   updatePageNameAPI(
      request: PageNameType,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const setWorkbookPageObjectivePromise = this.pageService.updatePageNameAPI(
         this.id,
         request
      )
      return bindPromiseWithOnSuccess(setWorkbookPageObjectivePromise)
         .to(this.setUpdatePageNameAPIStatus, () => {
            const { page_name: name } = request
            this.setPageName(name)
            onSuccess()
         })
         .catch(error => {
            this.setUpdatePageNameAPIError(error)
            onFailure(this.updatePageNameAPIError)
         })
   }

   @action.bound
   setDeleteListAPIStatus(status: APIStatus): void {
      this.deleteListAPIStatus = status
   }

   @action.bound
   setDeleteListAPIError(error: any): void {
      this.getDeleteListAPIError = error
   }

   @action.bound
   deleteListInAPage(listId: string): void {
      this.lists.delete(listId)
   }

   @action.bound
   deleteListAPI(
      listId: string,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const deleteListPromise = this.pageService.deletePageListAPI(listId)
      return bindPromiseWithOnSuccess(deleteListPromise)
         .to(this.setDeleteListAPIStatus, () => {
            this.deleteListInAPage(listId)
            onSuccess()
         })
         .catch(error => {
            this.setDeleteListAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setReorderSectionCardAPIStatus(
      reorderSectionCardAPIStatus: APIStatus
   ): void {
      this.reorderSectionCardAPIStatus = reorderSectionCardAPIStatus
   }

   @action.bound
   setReorderSectionCardAPIError(reorderSectionCardAPIError: Error): void {
      this.reorderSectionCardAPIError = reorderSectionCardAPIError
   }

   @action.bound
   changeSectionCardOrder(
      sourceSectionId: string,
      destinationSectionId: string,
      cardId: string,
      destinationCardOrder: number
   ): void {
      let sectionSourceList!: ListModel, sectionDestinationList!: ListModel
      this.lists.forEach(list => {
         const { sections } = list
         if (sections.get(sourceSectionId)) {
            sectionSourceList = list
         }
         if (sections.get(destinationSectionId)) {
            sectionDestinationList = list
         }
      })
      const { sections: sourceListSections } = sectionSourceList
      const sourceSection = sourceListSections.get(sourceSectionId)
      const { sections: destinationListSections } = sectionDestinationList
      const destinationSection = destinationListSections.get(
         destinationSectionId
      )
      if (sourceSection && destinationSection) {
         const { cards: sourceSectionCards } = sourceSection
         const { cards: destinationSectionCards } = destinationSection
         const sourceSectionCard = sourceSectionCards.get(cardId)
         sourceSectionCards.delete(cardId)
         const destinationSectionCardsArray = Array.from(
            destinationSectionCards
         )
         if (sourceSectionCard) {
            destinationSectionCardsArray.splice(destinationCardOrder, 0, [
               cardId,
               sourceSectionCard
            ])
         }
         const destinationSectionCardsMap = new Map(
            destinationSectionCardsArray
         )
         destinationSection.cards = destinationSectionCardsMap
      }
   }

   // TODO: Need to mention return type
   @action.bound
   reorderSectionCardAPI(
      cardId: string,
      request: ReorderSectionCardAPIRequestType,
      onFailure: () => void
   ) {
      const reorderPageListPromise = this.pageService.reorderSectionCardAPI(
         cardId,
         request
      )
      return bindPromiseWithOnSuccess(reorderPageListPromise)
         .to(this.setReorderSectionCardAPIStatus, () => {})
         .catch((error: Error) => {
            this.setReorderSectionCardAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setMultipleCardDetailsAPIStatus(status: APIStatus): void {
      this.getMultipleCardDetailsAPIStatus = status
   }

   // TODO: Need to upadte type
   @action.bound
   setMultipleCardDetailsAPIError(error: any): void {
      this.getMultipleCardDetailsAPIError = error
   }

   @action.bound
   setMultipleCardDetailsAPIResponse(
      response: GetMultipleCardDetailsResponseType
   ): void {
      this.cardsDetails = []
      const { card_details: cardsDetails } = response
      cardsDetails.map(cardDetails => {
         const {
            card_id: id,
            card_title: name,
            notes,
            attachments,
            priority,
            label,
            due_datetime: dueDateAndTime
         } = cardDetails
         const hasNotes = notes ? true : false
         const hasAttachments = attachments.length > 0 ? true : false
         const minimalCardDetails = {
            card_id: id,
            card_title: name,
            has_notes: hasNotes,
            has_attachments: hasAttachments,
            priority,
            label
         }
         const extraCardDetails = {
            card_id: id,
            card_title: name,
            notes,
            attachments,
            priority,
            label,
            due_datetime: dueDateAndTime
         }
         const card = new CardModel(
            minimalCardDetails,
            extraCardDetails,
            this.cardService
         )
         this.cardsDetails.push(card)
      })
   }

   @action.bound
   setMoveListAPIStatus(status: APIStatus): void {
      this.moveListAPIStatus = status
   }

   // TODO: Need to update type
   @action.bound
   setMoveListAPIError(error: any): void {
      this.moveListAPIError = error
   }

   @action.bound
   clearMultipleCardsData(): void {
      this.cardsDetails = []
      this.getMultipleCardDetailsAPIStatus = API_INITIAL
      this.getMultipleCardDetailsAPIError = {}
      this.clearCardsSelectedState()
   }

   @action.bound
   clearCardsSelectedState(): void {
      this.lists.forEach(list => {
         list.sections.forEach(section => {
            section.cards.forEach(card => {
               card.isSelected = false
            })
         })
      })
   }

   // TODO: Need to mention return type
   @action.bound
   getMultipleCardDetailsAPI(request: GetMultipleCardDetailsRequestType) {
      const getMultipleWorkbookDetailsPromise = this.pageService.getMultipleCardDetailsAPI(
         request
      )
      return bindPromiseWithOnSuccess(getMultipleWorkbookDetailsPromise)
         .to(this.setMultipleCardDetailsAPIStatus, response => {
            this.setMultipleCardDetailsAPIResponse(response)
         })
         .catch(this.setMultipleCardDetailsAPIError)
   }

   @action.bound
   moveListAPI(
      listId: string,
      request: MoveListRequestType,
      onSuccess: (listName) => void,
      onFailure: (error) => void
   ) {
      const movePageListPromise = this.pageService.moveListAPI(listId, request)
      return bindPromiseWithOnSuccess(movePageListPromise)
         .to(this.setMoveListAPIStatus, () => {
            const deletedList = this.lists.get(listId)
            this.lists.delete(listId)
            if (deletedList) {
               const { name } = deletedList
               onSuccess(name)
            }
         })
         .catch(error => {
            this.setMoveListAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   moveSection(sourceSectionId: string, destinationListId: string): void {
      const lists = Array.from(this.lists.values())
      let sourceSection!: SectionModel | undefined,
         sourceList!: ListModel | undefined
      lists.forEach(list => {
         const sections = Array.from(list.sections.values())
         const sourceSectionCopy = sections.find(
            section => section.id === sourceSectionId
         )
         if (sourceSectionCopy) {
            sourceSection = sourceSectionCopy
            sourceList = list
         }
      })
      if (sourceList) {
         sourceList.sections.delete(sourceSectionId)
      }
      const destinationList = this.lists.get(destinationListId)
      if (destinationList) {
         if (sourceSection) {
            destinationList.sections.set(sourceSectionId, sourceSection)
         }
      }
   }

   @action.bound
   moveCard(sourceCardId: string, destinationSectionId: string): void {
      const lists = Array.from(this.lists.values())
      let sourceCard!: CardModel | undefined,
         sourceSection!: SectionModel | undefined
      lists.forEach(list => {
         list.sections.forEach(section => {
            const cards = Array.from(section.cards.values())
            const sourceCardCopy = cards.find(card => card.id === sourceCardId)
            if (sourceCardCopy) {
               sourceCard = sourceCardCopy
               sourceSection = section
            }
         })
      })
      if (sourceSection) {
         sourceSection.cards.delete(sourceCardId)
      }
      let destinationSection!: SectionModel | undefined
      lists.forEach(list => {
         const sections = Array.from(list.sections.values())
         const destinationSectionCopy = sections.find(
            section => section.id === destinationSectionId
         )
         if (destinationSectionCopy) {
            destinationSection = destinationSectionCopy
         }
      })
      if (destinationSection) {
         if (sourceCard) {
            destinationSection.cards.set(sourceCardId, sourceCard)
         }
      }
   }

   @action.bound
   setSubmitAssignmentAPIStatus(status: APIStatus): void {
      this.submitAssignmentAPIStatus = status
   }

   // TODO: Need to update return type
   @action.bound
   setSubmitAssignmentAPIError(error: any): void {
      this.submitAssignmentAPIError = error
   }

   @action.bound
   setSubmitAssignmentAPIResponse(
      response: AssignmentSubmitResponse | null
   ): void {
      if (response) {
         this.assignmentResult = new AssignmentResultModel(response)
      }
   }

   // TODO: Need to add return type
   @action.bound
   submitAssignmentAPI(
      pageId: string,
      onSuccess: () => void,
      onFailure: () => void
   ) {
      const submitAssignmentPromise = this.evaluationPageService.submitAssignmentAPI(
         pageId
      )
      return bindPromiseWithOnSuccess(submitAssignmentPromise)
         .to(this.setSubmitAssignmentAPIStatus, response => {
            this.setSubmitAssignmentAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setSubmitAssignmentAPIError(error)
            onFailure()
         })
   }
}

export default PageModel
