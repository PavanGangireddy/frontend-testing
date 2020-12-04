import { observable, action } from 'mobx'
import { APIStatus, API_INITIAL, API_SUCCESS } from '@ib/api-constants'

import { bindPromiseWithOnSuccess } from '../../../Common/utils/MobxPromise'

import WorkbookService from '../../services/WorkbookService'
import ListService from '../../services/ListService'
import SectionService from '../../services/SectionService'
import CardService from '../../services/CardService'
import PageService from '../../services/PageService'
import EvaluationWorkbookService from '../../services/Evaluation/WorkbookService'
import EvaluationPageService from '../../services/Evaluation/PageService'

import {
   GetWorkbookDetailsAPIResponseType,
   PageObjectiveWithDescriptionType,
   GetWorkbookChildDetailsAPIResponse,
   CreatePageResponse,
   PageResponseType,
   ReorderPageRequest,
   MovePageRequest,
   GetAssignmentWorkbookResponse,
   PublishWorkbookRequest
} from '../types'
import WorkbookModel from '../models/WorkbookModel'
import PageModel from '../models/PageModel'
import UserModel from '../models/UserModel'
import WorkbookChildDetailsModel from '../models/WorkbookChildDetailsModel'
import AssignmentResultModel from '../models/AssignmentResultModel'

class WorkbookStore {
   @observable getWorkbookDetailsAPIStatus!: APIStatus
   @observable getWorkbookDetailsAPIError!: Error

   @observable
   updatePageObjectiveWithDescriptionAPIStatus: APIStatus = API_INITIAL
   @observable updatePageObjectiveWithDescriptionAPIError!: any

   @observable workbookDetails!: WorkbookModel
   @observable activePageDetails!: PageModel | null

   @observable getSharedUsersDetailsAPIStatus!: APIStatus
   @observable getSharedUsersDetailsAPIError!: any

   @observable getWorkbookChildDetailsAPIStatus!: APIStatus
   // TODO: Need to update type
   @observable getWorkbookChildDetailsAPIError!: any
   @observable workbookChildDetails!: WorkbookChildDetailsModel | {}
   @observable mergeCardsAPIStatus!: APIStatus
   // TODO: Need to update type
   @observable mergeCardsAPIError!: any
   @observable createPageAPIStatus!: APIStatus
   // TODO: Need to update type
   @observable createPageAPIError!: any
   @observable getPageDetailsAPIStatus!: APIStatus
   // TODO: Need to update type
   @observable getPageDetailsAPIError!: any
   @observable reorderPageAPIStatus!: APIStatus
   // TODO: Need to update type
   @observable reorderPageAPIError!: any
   @observable movePageAPIStatus!: APIStatus

   @observable publishWorkbookAPIStatus!: APIStatus
   @observable publishWorkbookAPIError!: any

   // TODO: Need to update type
   @observable movePageAPIError!: any
   @observable getAssignmentWorkbookDetailsAPIStatus!: APIStatus
   // TODO: Need to update type
   @observable getAssignmentWorkbookDetailsAPIError!: any
   @observable assignmentWorkbookDetails!: any

   @observable sharedUsers!: Map<string, UserModel>

   @observable workbookId!: string

   @observable getAssignmentPageDetailsAPIStatus!: APIStatus
   // TODO: Need to update type
   @observable getAssignmentPageDetailsAPIError!: any

   workbookService: WorkbookService
   pageService: PageService
   listService: ListService
   sectionService: SectionService
   cardService: CardService
   evaluationWorkbookService: EvaluationWorkbookService
   evaluationPageService: EvaluationPageService

   constructor(
      workbookService: WorkbookService,
      pageService: PageService,
      listService: ListService,
      sectionService: SectionService,
      cardService: CardService,
      evaluationWorkbookService: EvaluationWorkbookService,
      evaluationPageService: EvaluationPageService
   ) {
      this.workbookService = workbookService
      this.pageService = pageService
      this.listService = listService
      this.sectionService = sectionService
      this.cardService = cardService
      this.evaluationWorkbookService = evaluationWorkbookService
      this.evaluationPageService = evaluationPageService
      this.initWorkbookStore()
   }

   //TODO: need to create a new instance for a card before API call
   @action.bound
   initWorkbookStore(): void {
      this.initAPIStatusAndErrors()
   }

   @action.bound
   initAPIStatusAndErrors(): void {
      this.sharedUsers = new Map()

      this.getWorkbookDetailsAPIStatus = API_INITIAL
      this.activePageDetails = null

      this.updatePageObjectiveWithDescriptionAPIStatus = API_INITIAL
      this.updatePageObjectiveWithDescriptionAPIError = {}
      this.getWorkbookChildDetailsAPIStatus = API_INITIAL
      this.getWorkbookChildDetailsAPIError = {}
      this.mergeCardsAPIStatus = API_INITIAL
      this.mergeCardsAPIError = {}

      this.getSharedUsersDetailsAPIStatus = API_INITIAL
      this.getSharedUsersDetailsAPIError = {}

      this.getWorkbookChildDetailsAPIStatus = API_INITIAL
      this.getWorkbookChildDetailsAPIError = {}
      this.createPageAPIStatus = API_INITIAL
      this.createPageAPIError = {}
      this.getPageDetailsAPIStatus = API_SUCCESS
      this.getPageDetailsAPIError = {}
      this.reorderPageAPIStatus = API_INITIAL
      this.reorderPageAPIError = {}
      this.movePageAPIStatus = API_INITIAL
      this.movePageAPIError = {}
      this.getAssignmentWorkbookDetailsAPIStatus = API_INITIAL
      this.getAssignmentWorkbookDetailsAPIError = {}
      this.publishWorkbookAPIStatus = API_INITIAL
      this.publishWorkbookAPIError = {}
      this.getAssignmentPageDetailsAPIStatus = API_SUCCESS
      this.getAssignmentPageDetailsAPIError = {}
   }

   @action.bound
   setUpdatePageObjectiveWithDescriptionAPIStatus(objectiveAPIStatus): void {
      this.updatePageObjectiveWithDescriptionAPIStatus = objectiveAPIStatus
   }

   @action.bound
   setUpdatePageObjectiveWithDescriptionAPIError(
      updatePageObjectiveAPIError: Error
   ): void {
      this.updatePageObjectiveWithDescriptionAPIError = updatePageObjectiveAPIError
   }

   @action.bound
   updatePageObjectiveWithDescriptionAPI(
      request: PageObjectiveWithDescriptionType,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      let pageId = ''
      if (this.activePageDetails !== null) {
         const { id } = this.activePageDetails
         pageId = id
      }
      const setWorkbookPageObjectivePromise = this.workbookService.updatePageObjectiveWithDescriptionAPI(
         pageId,
         request
      )
      return bindPromiseWithOnSuccess(setWorkbookPageObjectivePromise)
         .to(this.setUpdatePageObjectiveWithDescriptionAPIStatus, () => {
            if (this.activePageDetails !== null) {
               const { page_objective: objective, description } = request
               this.activePageDetails.setPageObjectiveWithDescription(
                  objective,
                  description
               )
            }
            onSuccess()
         })
         .catch(error => {
            this.setUpdatePageObjectiveWithDescriptionAPIError(error)
            onFailure(this.updatePageObjectiveWithDescriptionAPIError)
         })
   }

   @action.bound
   setGetWorkbookDetailsAPIStatus(workbookDetailsAPIStatus: APIStatus): void {
      this.getWorkbookDetailsAPIStatus = workbookDetailsAPIStatus
   }

   @action.bound
   setGetWorkbookDetailsAPIError(workbookDetailsAPIError: Error): void {
      this.getWorkbookDetailsAPIError = workbookDetailsAPIError
   }

   @action.bound
   setGetWorkbookDetailsAPIResponse(
      workbookDetailsAPIResponse: GetWorkbookDetailsAPIResponseType | null
   ): void {
      if (workbookDetailsAPIResponse) {
         const { page, ...others } = workbookDetailsAPIResponse
         this.workbookDetails = new WorkbookModel({ ...others })
         if (page) {
            this.activePageDetails = new PageModel(
               page,
               this.pageService,
               this.listService,
               this.sectionService,
               this.cardService,
               this.evaluationPageService
            )
         }
      }
   }

   // TODO: Need to mention return type
   @action.bound
   getWorkbookDetailsAPI(workbookId: string) {
      this.workbookId = workbookId
      const getWorkbookDetailsPromise = this.workbookService.getWorkbookDetailsAPI(
         workbookId
      )
      return bindPromiseWithOnSuccess(getWorkbookDetailsPromise)
         .to(
            this.setGetWorkbookDetailsAPIStatus,
            this.setGetWorkbookDetailsAPIResponse
         )
         .catch(this.setGetWorkbookDetailsAPIError)
   }

   @action.bound
   setWorkbookChildDetailsAPIStatus(status: APIStatus): void {
      this.getWorkbookChildDetailsAPIStatus = status
   }

   // TODO: Need to update type
   @action.bound
   setWorkbookChildDetailsAPIError(error: any): void {
      this.getWorkbookChildDetailsAPIError = error
   }

   @action.bound
   setWorkbookChildDetailsAPIResponse(
      response: GetWorkbookChildDetailsAPIResponse | null
   ): void {
      if (response) {
         this.workbookChildDetails = new WorkbookChildDetailsModel(response)
      }
   }

   @action.bound
   clearWorkbookChildDetails(): void {
      this.getWorkbookChildDetailsAPIStatus = API_INITIAL
      this.getWorkbookChildDetailsAPIError = {}
      this.workbookChildDetails = {}
   }

   // TODO: Need to mention return type
   @action.bound
   getWorkbookChildDetailsAPI(workbookId: string) {
      const getWorkbookChildDetailsPromise = this.workbookService.getWorkbookChildDetailsAPI(
         workbookId
      )
      return bindPromiseWithOnSuccess(getWorkbookChildDetailsPromise)
         .to(
            this.setWorkbookChildDetailsAPIStatus,
            this.setWorkbookChildDetailsAPIResponse
         )
         .catch(this.setWorkbookChildDetailsAPIError)
   }

   @action.bound
   setMergeCardsAPIStatus(status: APIStatus): void {
      this.mergeCardsAPIStatus = status
   }

   // TODO: Need to update type
   @action.bound
   setMergeCardsAPIError(error: any): void {
      this.mergeCardsAPIError = error
   }

   // TODO: Need to mention return type
   @action.bound
   mergeCardsAPI(request, onSuccess: () => void, onFailure: () => void) {
      const mergeCardsPromise = this.workbookService.mergeCardsAPI(request)
      return bindPromiseWithOnSuccess(mergeCardsPromise)
         .to(this.setMergeCardsAPIStatus, () => {
            onSuccess()
         })
         .catch(error => {
            this.setMergeCardsAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setGetSharedUsersDetailsAPIStatus(
      sharedUsersDetailsAPIStatus: APIStatus
   ): void {
      this.getSharedUsersDetailsAPIStatus = sharedUsersDetailsAPIStatus
   }

   @action.bound
   setGetSharedUsersDetailsAPIError(sharedUsersDetailsAPIError: any): void {
      this.getSharedUsersDetailsAPIError = sharedUsersDetailsAPIError
   }

   @action.bound
   setGetSharedUsersDetailsAPIResponse(sharedUsersDetailsAPIResponse): void {
      if (sharedUsersDetailsAPIResponse)
         sharedUsersDetailsAPIResponse.forEach(eachUser => {
            // TODO: need to generate UUID
            this.sharedUsers.set(eachUser.email, new UserModel(eachUser))
         })
   }

   @action.bound
   getSharedUsersDetailsAPI(
      workbookId: string,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) {
      const getSharedUsersPromise = this.workbookService.getSharedUsersDetailsAPI(
         workbookId
      )
      return bindPromiseWithOnSuccess(getSharedUsersPromise)
         .to(this.setGetSharedUsersDetailsAPIStatus, response => {
            this.setGetSharedUsersDetailsAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setGetSharedUsersDetailsAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setCreatePageAPIStatus(status: APIStatus): void {
      this.createPageAPIStatus = status
   }

   // TODO: Need to update type
   @action.bound
   setCreatePageAPIError(error: any): void {
      this.createPageAPIError = error
   }

   @action.bound
   setCreatePageAPIResponse(
      response: CreatePageResponse | null,
      onSuccess: (pageId: string) => void
   ): void {
      if (response) {
         const { page_id: pageId } = response
         this.workbookDetails.setNewPage(pageId)
         onSuccess(pageId)
      }
   }

   // TODO: Need to mention return type
   @action.bound
   createPageAPI(onSuccess: (pageId: string) => void, onFailure: () => void) {
      const { id } = this.workbookDetails
      const createPagePromise = this.workbookService.createPageAPI(id)
      return bindPromiseWithOnSuccess(createPagePromise)
         .to(this.setCreatePageAPIStatus, response => {
            this.setCreatePageAPIResponse(response, onSuccess)
         })
         .catch(error => {
            this.setCreatePageAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setGetPageDetailsAPIStatus(status: APIStatus): void {
      this.getPageDetailsAPIStatus = status
   }

   // TODO: Need to add type
   @action.bound
   setGetPageDetailsAPIError(error: any): void {
      this.getPageDetailsAPIError = error
   }

   @action.bound
   setGetPageDetailsAPIResponse(response: PageResponseType | null): void {
      if (response) {
         this.activePageDetails = new PageModel(
            response,
            this.pageService,
            this.listService,
            this.sectionService,
            this.cardService,
            this.evaluationPageService
         )
      }
   }

   // TODO: Need to mention return type
   @action.bound
   getPageDetailsAPI(pageId: string, onSuccess: () => void) {
      const getPageDetailsPromise = this.workbookService.getPageDetailsAPI(
         pageId
      )
      return bindPromiseWithOnSuccess(getPageDetailsPromise)
         .to(this.setGetPageDetailsAPIStatus, response => {
            this.setGetPageDetailsAPIResponse(response)
            onSuccess()
         })
         .catch(this.setGetPageDetailsAPIError)
   }

   @action.bound
   setGetAssignmentPageDetailsAPIStatus(status: APIStatus): void {
      this.getAssignmentPageDetailsAPIStatus = status
   }

   @action.bound
   setGetMethodAssignmentPageDetailsAPIError(error: any): void {
      this.getAssignmentPageDetailsAPIError = error
   }

   @action.bound
   setGetAssignmentPageDetailsAPIResponse(response): void {
      if (response) {
         const {
            page_status: pageStatus,
            score_details: scoreDetails
         } = response
         let assignmentResult: AssignmentResultModel | null = null
         if (scoreDetails) {
            assignmentResult = new AssignmentResultModel(scoreDetails)
         }
         this.activePageDetails = new PageModel(
            response,
            this.pageService,
            this.listService,
            this.sectionService,
            this.cardService,
            this.evaluationPageService,
            pageStatus,
            assignmentResult
         )
      }
   }

   // TODO: Need to mention return type
   @action.bound
   getAssignmentPageDetailsAPI(pageId: string, onSuccess: () => void) {
      const getAssignmentPagePromise = this.evaluationWorkbookService.getAssignmentPageDetailsAPI(
         pageId
      )
      return bindPromiseWithOnSuccess(getAssignmentPagePromise)
         .to(this.setGetAssignmentPageDetailsAPIStatus, response => {
            this.setGetAssignmentPageDetailsAPIResponse(response)
            onSuccess()
         })
         .catch(() => this.setGetMethodAssignmentPageDetailsAPIError)
   }

   @action.bound
   setReorderPageAPIStatus(status: APIStatus): void {
      this.reorderPageAPIStatus = status
   }

   // TODO: Need to update type
   @action.bound
   setReorderPageAPIError(error: any): void {
      this.reorderPageAPIError = error
   }

   @action.bound
   reorderPage(pageId: string, destinationIndex: number): void {
      this.workbookDetails.reorderPage(pageId, destinationIndex)
   }

   // TODO: Need to mention return type
   @action.bound
   reorderPageAPI(pageId, request: ReorderPageRequest, onFailure: () => void) {
      const reorderPagePromise = this.workbookService.reorderPageAPI(
         pageId,
         request
      )
      return bindPromiseWithOnSuccess(reorderPagePromise)
         .to(this.setReorderPageAPIStatus, () => {})
         .catch(error => {
            this.setReorderPageAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setMovePageAPIStatus(status: APIStatus): void {
      this.movePageAPIStatus = status
   }

   // TODO: Need to update type
   @action.bound
   setMovePageAPIError(error: any): void {
      this.movePageAPIError = error
   }

   // TODO: Need to mention return type
   @action.bound
   movePageAPI(
      pageId,
      request: MovePageRequest,
      onSuccess: () => void,
      onFailure: () => void
   ) {
      const movePagePromise = this.workbookService.movePageAPI(pageId, request)
      return bindPromiseWithOnSuccess(movePagePromise)
         .to(this.setMovePageAPIStatus, () => {
            onSuccess()
         })
         .catch(error => {
            this.setMovePageAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setPublishWorkbookAPIStatus(status: APIStatus): void {
      this.publishWorkbookAPIStatus = status
   }

   @action.bound
   setPublishWorkbookAPIError(error: any): void {
      this.publishWorkbookAPIError = error
   }

   @action.bound
   publishWorkbookAPI(
      workbookId: string,
      request: PublishWorkbookRequest,
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) {
      const publishWorkbookPromise = this.evaluationWorkbookService.publishWorkbookAPI(
         workbookId,
         request
      )
      return bindPromiseWithOnSuccess(publishWorkbookPromise)
         .to(this.setPublishWorkbookAPIStatus, () => {
            onSuccess()
         })
         .catch(error => {
            this.setPublishWorkbookAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   updatePageName(pageId: string, updatedName: string): void {
      const { pages } = this.workbookDetails
      const pagesArray = Array.from(pages)
      const currentPage = pagesArray.find(page => page[1].id === pageId)
      if (currentPage) {
         currentPage[1].name = updatedName
      }
      this.workbookDetails.pages = new Map(pagesArray)
   }

   @action.bound
   setAssignmentWorkbookDetailsAPIStatus(status: APIStatus): void {
      this.getAssignmentWorkbookDetailsAPIStatus = status
   }

   // TODO: Need to define type
   @action.bound
   setAssignmentWorkbookDetailsAPIError(error: any): void {
      this.getAssignmentWorkbookDetailsAPIError = error
   }

   @action.bound
   setAssignmentWorkbookDetailsAPIResponse(
      response: GetAssignmentWorkbookResponse | null
   ): void {
      if (response) {
         const { page, ...others } = response
         this.workbookDetails = new WorkbookModel({ ...others })
         if (page) {
            const {
               page_status: pageStatus,
               score_details: scoreDetails
            } = page
            let assignmentResult: AssignmentResultModel | null = null
            if (scoreDetails) {
               assignmentResult = new AssignmentResultModel(scoreDetails)
            }
            this.activePageDetails = new PageModel(
               page,
               this.pageService,
               this.listService,
               this.sectionService,
               this.cardService,
               this.evaluationPageService,
               pageStatus,
               assignmentResult
            )
         }
      }
   }

   // TODO: Need to add return type
   @action.bound
   getAssignmentWorkbookDetailsAPI(workbookId: string) {
      const getAssignmentWorkbookDetailsPromise = this.evaluationWorkbookService.getAssignmentWorkbookDetailsAPI(
         workbookId
      )
      return bindPromiseWithOnSuccess(getAssignmentWorkbookDetailsPromise)
         .to(
            this.setAssignmentWorkbookDetailsAPIStatus,
            this.setAssignmentWorkbookDetailsAPIResponse
         )
         .catch(this.setAssignmentWorkbookDetailsAPIError)
   }

   @action.bound
   clearStore(): void {
      this.initWorkbookStore()
   }
}

export default WorkbookStore
