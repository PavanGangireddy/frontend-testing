import { observable, action } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { getAPIErrorMessage } from '../../../Common/utils/APIUtils'

import DashboardService from '../../services/DashboardService/index'
import {
   DEFAULT_ORDER_BY,
   DEFAULT_SORT_BY,
   UPCOMING,
   COMPLETED,
   ASSIGNMENTS_FOLDER_ID,
   LEARNINGS_FOLDER_ID,
   WORKBOOKS,
   ACTIVE
} from '../../constants/UIConstants'
import AssignmentsService from '../../services/AssignmentsService'

import {
   GetWorkbooksAndFoldersResponse,
   GetSharedWorkbooksAndFoldersResponse,
   PinnedWorkbooksAndStarredFolders,
   GetSearchFoldersAndWorkbooksRequest,
   CreateFolderRequest,
   CreateWorkbookRequest,
   GetRootFolderDetailsAPIResponseType,
   SortRequestType,
   ShareFolderRequest,
   ShareWorkbookRequest,
   FolderRenameRequestType,
   WorkbookRenameRequestType,
   MoveFolderRequest,
   MoveWorkbookRequest,
   TrashFoldersAndWorkbooksResponseType,
   PublishWorkbookResponse,
   GetAssignmentsResponseType,
   GetLearningsResponseType,
   BaseFolderType,
   CreateFolderResponse,
   AssignmentInstructionsResponse
} from '../types'
import BaseWorkbookAndFolderInfoItem from '../models/BaseWorkbookAndFolderInfoItem'
import ActiveFolderInfoItem from '../models/ActiveFolderInfoItem'
import FolderInfoItem from '../models/FolderInfoItem'
import WorkbookInfoItem from '../models/WorkbookInfoItem'
import SharedWithMeInfoItem from '../models/SharedWithMeInfoItem'
import PublishedWorkbook from '../models/PublishedWorkbook'
import PublishService from '../../services/PublishService'
import LearningsService from '../../services/LearningsService'
import ActiveAssignmentWorkbook from '../models/ActiveAssignmentWorkbook'
import UpcomingAssignmentWorkbook from '../models/UpcomingAssignmentWorkbook'
import CompletedAssignmentWorkbook from '../models/CompletedAssignmentWorkbook'
import AssignmentInstructionModel from '../models/AssignmentInstructionModel'

class DashboardStore {
   dashboardService: DashboardService
   assignmentsService: AssignmentsService
   @observable getWorkbooksAndFoldersAPIStatus!: APIStatus
   @observable getWorkbooksAndFoldersAPIError!: any //TODO:type conflicting
   @observable activeFolderInfo!: ActiveFolderInfoItem | any //TODO:type
   @observable getSharedWithMeWorkbooksAndFoldersAPIStatus!: APIStatus
   @observable getSharedWithMeWorkbooksAndFoldersAPIError!: any
   @observable sharedWithMeFolderInfo!: SharedWithMeInfoItem | any
   @observable getPinnedWorkbooksAndStarredFoldersAPIStatus!: APIStatus
   @observable getPinnedWorkbooksAndStarredFoldersAPIError!: any //TODO:type conflicting
   @observable pinnedWorkbooks!: Array<BaseWorkbookAndFolderInfoItem>
   @observable starredFolders!: Array<BaseWorkbookAndFolderInfoItem>
   @observable getSearchFoldersAndWorkbooksAPIStatus: APIStatus = API_INITIAL
   @observable getSearchFoldersAndWorkbooksAPIError!: any
   @observable searchFoldersAndWorkbooksData: any
   @observable createFolderOrWorkbookAPIStatus: APIStatus = API_INITIAL
   @observable createFolderOrWorkbookAPIError!: any
   @observable getRootFolderDetailsAPIStatus!: APIStatus
   // TODO: Need to update the type
   @observable getRootFolderDetailsAPIError!: any
   @observable orderBy!: string
   @observable sortBy!: string
   rootFolderId!: string
   @observable addOrRemoveFolderStarAPIStatus!: APIStatus
   // TODO: Need to update the type
   @observable addOrRemoveFolderStarAPIError!: any
   @observable pinOrUnpinWorkbookAPIStatus!: APIStatus
   // TODO: Need to update the type
   @observable pinOrUnpinWorkbookAPIError!: any
   @observable shareFolderOrWorkbookAPIStatus!: APIStatus
   @observable shareFolderOrWorkbookAPIError!: any
   @observable renameForFolderAPIStatus!: APIStatus
   // TODO: Need to update the type
   @observable renameForFolderAPIError!: any
   @observable renameForWorkbookAPIStatus!: APIStatus
   // TODO: Need to update the type
   @observable renameForWorkbookAPIError!: any
   @observable moveFolderAPIStatus!: APIStatus
   // TODO: Need to update the type
   @observable moveFolderAPIError!: any
   @observable moveWorkbookAPIStatus!: APIStatus
   // TODO: Need to update the type
   @observable moveWorkbookAPIError!: any
   @observable deleteFolderAPIStatus!: APIStatus
   // TODO: Need to update the type
   @observable deleteFolderAPIError!: any
   @observable deleteWorkbookAPIStatus!: APIStatus
   // TODO: Need to update the type
   @observable deleteWorkbookAPIError!: any
   @observable trashFoldersAndWorkbooksAPIStatus!: APIStatus
   // TODO: Need to update the types
   @observable trashFoldersAndWorkbooksAPIError!: any
   @observable trashFolderInfo: any
   @observable restoreFolderAPIStatus!: APIStatus
   // TODO: Need to update the type
   @observable restoreFolderAPIError!: any
   @observable restoreWorkbookAPIStatus!: APIStatus
   // TODO: Need to update the type
   @observable restoreWorkbookAPIError!: any
   @observable deleteForeverFolderAPIStatus!: APIStatus
   // TODO: Need to update the type
   @observable deleteForeverFolderAPIError!: any
   @observable deleteForeverWorkbookAPIStatus!: APIStatus
   // TODO: Need to update the type
   @observable deleteForeverWorkbookAPIError!: any
   @observable getFolderIdOfAWorkbookAPIStatus!: APIStatus
   @observable getFolderIdOfAWorkbookAPIError!: any
   @observable emptyTrashAPIStatus!: APIStatus
   @observable emptyTrashAPIError!: any
   @observable getMoveWorkbooksAndFoldersAPIStatus!: APIStatus
   // TODO: Need to update the types
   @observable getMoveWorkbooksAndFoldersAPIError!: any
   @observable moveActiveFolderInfo: any
   @observable getMoveRootFolderDetailsAPIStatus!: APIStatus
   // TODO: Need to update the types
   @observable getMoveRootFolderDetailsAPIError!: any
   @observable getAssignmentsAPIStatus!: APIStatus
   @observable getAssignmentsAPIError!: any
   @observable assignmentsFolderInfo!: Map<
      string,
      | Array<
           | ActiveAssignmentWorkbook
           | UpcomingAssignmentWorkbook
           | CompletedAssignmentWorkbook
        >
      | string
   >
   moveRootFolderId!: string

   @observable getPublishedWorkbookAPIStatus!: APIStatus
   @observable getPublishedWorkbookAPIError!: any

   @observable publishedWorkbooks!: Array<PublishedWorkbook>
   @observable getLearningWorkbooksAPIStatus!: APIStatus
   @observable getLearningWorkbooksAPIError!: any
   @observable learningWorkbooks!: Map<
      string,
      Array<BaseWorkbookAndFolderInfoItem> | string
   >

   publishService: PublishService
   learningsService: LearningsService

   @observable getUserProjectsAPIStatus!: APIStatus
   // TODO: Need to update the type
   @observable getUserProjectsAPIError!: any
   @observable newlyCreatedFolderId!: string

   @observable getAssignmentInstructionsAPIStatus!: APIStatus
   @observable getAssignmentInstructionsAPIError!: any
   @observable getAssignmentInstructionsAPIResponse!: AssignmentInstructionModel

   constructor(
      dashboardService: DashboardService,
      assignmentsService: AssignmentsService,
      publishService: PublishService,
      learningsService: LearningsService
   ) {
      this.dashboardService = dashboardService
      this.publishService = publishService
      this.assignmentsService = assignmentsService
      this.learningsService = learningsService
      this.initStore()
   }

   @action.bound
   initStore(): void {
      this.getWorkbooksAndFoldersAPIStatus = API_INITIAL
      this.getWorkbooksAndFoldersAPIError = null
      this.getPinnedWorkbooksAndStarredFoldersAPIStatus = API_INITIAL
      this.getPinnedWorkbooksAndStarredFoldersAPIError = null
      this.activeFolderInfo = {}
      this.pinnedWorkbooks = []
      this.starredFolders = []
      this.searchFoldersAndWorkbooksData = {}
      this.getRootFolderDetailsAPIStatus = API_INITIAL
      this.getRootFolderDetailsAPIError = {}
      this.rootFolderId = ''
      this.orderBy = DEFAULT_ORDER_BY
      this.sortBy = DEFAULT_SORT_BY
      this.addOrRemoveFolderStarAPIStatus = API_INITIAL
      this.addOrRemoveFolderStarAPIError = {}
      this.pinOrUnpinWorkbookAPIStatus = API_INITIAL
      this.pinOrUnpinWorkbookAPIError = {}
      this.shareFolderOrWorkbookAPIStatus = API_INITIAL
      this.shareFolderOrWorkbookAPIError = {}
      this.sharedWithMeFolderInfo = {}
      this.renameForFolderAPIStatus = API_INITIAL
      this.renameForFolderAPIError = null
      this.renameForWorkbookAPIStatus = API_INITIAL
      this.renameForWorkbookAPIError = null
      this.moveFolderAPIStatus = API_INITIAL
      this.moveFolderAPIError = {}
      this.moveWorkbookAPIStatus = API_INITIAL
      this.moveWorkbookAPIError = {}
      this.deleteFolderAPIStatus = API_INITIAL
      this.deleteFolderAPIError = null
      this.deleteWorkbookAPIStatus = API_INITIAL
      this.deleteWorkbookAPIError = null
      this.trashFoldersAndWorkbooksAPIStatus = API_INITIAL
      this.trashFoldersAndWorkbooksAPIError = null
      this.restoreFolderAPIStatus = API_INITIAL
      this.restoreFolderAPIError = null
      this.restoreWorkbookAPIStatus = API_INITIAL
      this.restoreWorkbookAPIError = null
      this.deleteForeverFolderAPIStatus = API_INITIAL
      this.deleteForeverFolderAPIError = null
      this.deleteForeverWorkbookAPIStatus = API_INITIAL
      this.deleteForeverWorkbookAPIError = null
      this.getFolderIdOfAWorkbookAPIStatus = API_INITIAL
      this.getFolderIdOfAWorkbookAPIError = null
      this.emptyTrashAPIStatus = API_INITIAL
      this.emptyTrashAPIError = null
      this.getMoveWorkbooksAndFoldersAPIStatus = API_INITIAL
      this.getMoveWorkbooksAndFoldersAPIError = null
      this.moveActiveFolderInfo = {}
      this.trashFolderInfo = {}
      this.getMoveRootFolderDetailsAPIStatus = API_INITIAL
      this.getMoveRootFolderDetailsAPIError = {}
      this.getPublishedWorkbookAPIStatus = API_INITIAL
      this.getPublishedWorkbookAPIError = null
      this.moveRootFolderId = ''
      this.publishedWorkbooks = []
      this.getAssignmentsAPIStatus = API_INITIAL
      this.getAssignmentsAPIError = null
      this.assignmentsFolderInfo = new Map()
      this.getLearningWorkbooksAPIStatus = API_INITIAL
      this.getLearningWorkbooksAPIError = null
      this.learningWorkbooks = new Map()
      this.getUserProjectsAPIStatus = API_INITIAL
      this.getUserProjectsAPIError = null
      this.newlyCreatedFolderId = ''
      this.getAssignmentInstructionsAPIStatus = API_INITIAL
      this.getAssignmentInstructionsAPIError = null
   }

   @action.bound
   onChangeOrder(orderBy: string): void {
      this.orderBy = orderBy
   }

   @action.bound
   setGetWorkbooksAndFoldersAPIStatus(
      workbooksAndFoldersAPIStatus: APIStatus
   ): void {
      this.getWorkbooksAndFoldersAPIStatus = workbooksAndFoldersAPIStatus
   }

   @action.bound
   setGetWorkbooksAndFoldersAPIError(workbooksAndFoldersAPIError: Error): void {
      this.getWorkbooksAndFoldersAPIError = getAPIErrorMessage(
         workbooksAndFoldersAPIError
      )
   }

   @action.bound
   setGetWorkbooksAndFoldersAPIResponse(
      workbooksAndFoldersAPIResponse: GetWorkbooksAndFoldersResponse | null
   ): void {
      if (workbooksAndFoldersAPIResponse) {
         this.activeFolderInfo = new ActiveFolderInfoItem(
            workbooksAndFoldersAPIResponse
         )
      }
   }

   // TODO: Need to mention return types
   @action.bound
   getWorkbooksAndFoldersAPI(
      folderId: string,
      onSuccess = (): void => {}
   ): Promise<GetWorkbooksAndFoldersResponse | void> {
      const request: SortRequestType = {
         sort_by: this.sortBy,
         order_by: this.orderBy
      }
      const newFolderId: string =
         folderId === undefined ? this.rootFolderId : folderId
      const workbooksAndFolderPromise = this.dashboardService.getWorkbooksAndFoldersAPI(
         request,
         newFolderId
      )
      return bindPromiseWithOnSuccess(workbooksAndFolderPromise)
         .to(this.setGetWorkbooksAndFoldersAPIStatus, response => {
            this.setGetWorkbooksAndFoldersAPIResponse(response)
            onSuccess()
         })
         .catch(this.setGetWorkbooksAndFoldersAPIError)
   }

   @action.bound
   setGetMoveWorkbooksAndFoldersAPIStatus(status: APIStatus): void {
      this.getMoveWorkbooksAndFoldersAPIStatus = status
   }

   @action.bound
   setGetMoveWorkbooksAndFoldersAPIError(error: Error): void {
      this.getMoveWorkbooksAndFoldersAPIError = getAPIErrorMessage(error)
   }

   @action.bound
   setGetMoveWorkbooksAndFoldersAPIResponse(
      response: GetWorkbooksAndFoldersResponse | null
   ): void {
      if (response) {
         this.moveActiveFolderInfo = new ActiveFolderInfoItem(response)
      }
   }

   @action.bound
   clearMoveWorkbooksAndFolders(): void {
      this.getMoveWorkbooksAndFoldersAPIStatus = API_INITIAL
      this.getMoveWorkbooksAndFoldersAPIError = null
      this.moveActiveFolderInfo = {}
   }

   @action.bound
   getMoveWorkbooksAndFoldersAPI(
      folderId: string,
      onSuccess = (): void => {}
   ): Promise<GetWorkbooksAndFoldersResponse | void> {
      const request: SortRequestType = {
         sort_by: this.sortBy,
         order_by: this.orderBy
      }
      const newFolderId: string =
         folderId === undefined ? this.rootFolderId : folderId
      const workbooksAndFolderPromise = this.dashboardService.getMoveWorkbooksAndFoldersAPI(
         request,
         newFolderId
      )
      return bindPromiseWithOnSuccess(workbooksAndFolderPromise)
         .to(this.setGetMoveWorkbooksAndFoldersAPIStatus, response => {
            this.setGetMoveWorkbooksAndFoldersAPIResponse(response)
            onSuccess()
         })
         .catch(this.setGetMoveWorkbooksAndFoldersAPIError)
   }

   @action.bound
   setGetPinnedWorkbooksAndStarredFoldersApiStatus(apiStatus: APIStatus): void {
      this.getPinnedWorkbooksAndStarredFoldersAPIStatus = apiStatus
   }

   @action.bound
   setGetPinnedWorkbooksAndStarredFoldersApiError(error): void {
      this.getPinnedWorkbooksAndStarredFoldersAPIError = getAPIErrorMessage(
         error
      )
   }

   @action.bound
   setGetPinnedWorkbooksAndStarredFoldersApiResponse(
      pinnedWorkbooksAndStarredFoldersAPIResponse: PinnedWorkbooksAndStarredFolders | null
   ): void {
      this.pinnedWorkbooks = []
      this.starredFolders = []
      if (pinnedWorkbooksAndStarredFoldersAPIResponse) {
         const {
            pinned_workbooks,
            starred_folders
         } = pinnedWorkbooksAndStarredFoldersAPIResponse
         starred_folders.map(starredFolder => {
            const {
               folder_name: name,
               folder_id: id,
               is_published_by_us: isPublishedByUs
            } = starredFolder
            const baseWorkbookAndFolderInfoItem = new BaseWorkbookAndFolderInfoItem(
               { id: id, name: name, isPublishedByUs }
            )
            this.starredFolders.push(baseWorkbookAndFolderInfoItem)
         })
         pinned_workbooks.map(pinnedWorkbook => {
            const {
               workbook_name: name,
               workbook_id: id,
               is_published_by_us: isPublishedByUs
            } = pinnedWorkbook
            const baseWorkbookAndFolderInfoItem = new BaseWorkbookAndFolderInfoItem(
               { id: id, name: name, isPublishedByUs }
            )
            this.pinnedWorkbooks.push(baseWorkbookAndFolderInfoItem)
         })
      }
   }

   // TODO: Need to mention return types
   @action.bound
   getPinnedWorkbooksAndStarredFoldersAPI() {
      const pinnedWorkbooksAndStarredFoldersApiPromise = this.dashboardService.getPinnedWorkbooksAndStarredFoldersAPI()
      return bindPromiseWithOnSuccess(
         pinnedWorkbooksAndStarredFoldersApiPromise
      )
         .to(
            this.setGetPinnedWorkbooksAndStarredFoldersApiStatus,
            this.setGetPinnedWorkbooksAndStarredFoldersApiResponse
         )
         .catch(this.setGetPinnedWorkbooksAndStarredFoldersApiError)
   }

   @action.bound
   setGetSearchFoldersAndWorkbooksAPIStatus(status: APIStatus): void {
      this.getSearchFoldersAndWorkbooksAPIStatus = status
   }

   @action.bound
   setGetSearchFoldersAndWorkbooksAPIError(error: any): void {
      this.getSearchFoldersAndWorkbooksAPIError = error
   }

   @action.bound
   setGetSearchFoldersAndWorkbooksAPIResponse(response: any): void {
      this.searchFoldersAndWorkbooksData = response
   }

   @action.bound
   getSearchFoldersAndWorkbooksAPI(
      requestObject: GetSearchFoldersAndWorkbooksRequest,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const getSearchFoldersAndWorkbooksPromise = this.dashboardService.getSearchFoldersAndWorkbooksAPI(
         requestObject
      )
      return bindPromiseWithOnSuccess(getSearchFoldersAndWorkbooksPromise)
         .to(this.setGetSearchFoldersAndWorkbooksAPIStatus, response => {
            this.setGetSearchFoldersAndWorkbooksAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setGetSearchFoldersAndWorkbooksAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setCreateFolderOrWorkbookAPIStatus(createFolderAPIStatus: APIStatus): void {
      this.createFolderOrWorkbookAPIStatus = createFolderAPIStatus
   }

   @action.bound
   setCreateFolderOrWorkbookAPIError(createFolderAPIError: Error): void {
      this.createFolderOrWorkbookAPIError = getAPIErrorMessage(
         createFolderAPIError
      )
   }

   @action.bound
   setCreateFolderAPIResponse(response: CreateFolderResponse | null): void {
      if (response) {
         const { folder_id: folderId } = response
         this.newlyCreatedFolderId = folderId
      }
   }

   // TODO: Need to mention return types
   @action.bound
   createFolderAPI(
      requestObject: CreateFolderRequest,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const createFolderPromise = this.dashboardService.createFolderAPI(
         requestObject
      )
      return bindPromiseWithOnSuccess(createFolderPromise)
         .to(this.setCreateFolderOrWorkbookAPIStatus, response => {
            this.setCreateFolderAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setCreateFolderOrWorkbookAPIError(error)
            onFailure()
         })
   }

   // TODO: Need to mention return types
   @action.bound
   createWorkbookAPI(
      requestObject: CreateWorkbookRequest,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const createWorkbookPromise = this.dashboardService.createWorkbookAPI(
         requestObject
      )
      return bindPromiseWithOnSuccess(createWorkbookPromise)
         .to(this.setCreateFolderOrWorkbookAPIStatus, response => {
            let workbookId = ''
            if (response) {
               workbookId = response.workbook_id
            }
            onSuccess(workbookId)
         })
         .catch(error => {
            this.setCreateFolderOrWorkbookAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setGetRootFolderDetailAPIStatus(
      rootFolderDetailsAPIStatus: APIStatus
   ): void {
      this.getRootFolderDetailsAPIStatus = rootFolderDetailsAPIStatus
   }

   @action.bound
   setGetRootFolderDetailsAPIError(rootFolderDetailsAPIError: Error): void {
      this.getRootFolderDetailsAPIError = rootFolderDetailsAPIError
   }

   @action.bound
   setGetRootFolderDetailsAPIResponse(
      rootFolderDetailsAPIResponse: GetRootFolderDetailsAPIResponseType | null
   ): void {
      if (rootFolderDetailsAPIResponse) {
         const { root_folder_id: rootFolderId } = rootFolderDetailsAPIResponse
         this.rootFolderId = rootFolderId
      }
   }

   // TODO: Need to mention return types
   @action.bound
   getRootFolderDetailsAPI(
      onSuccess: (rootFolderId?: string) => void,
      onFailure: () => void = () => {}
   ) {
      const rootFolderDetailsPromise = this.dashboardService.getRootFolderDetailsAPI()
      return bindPromiseWithOnSuccess(rootFolderDetailsPromise)
         .to(this.setGetRootFolderDetailAPIStatus, response => {
            this.setGetRootFolderDetailsAPIResponse(response)
            onSuccess(this.rootFolderId)
         })
         .catch(error => {
            this.setGetRootFolderDetailsAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setGetMoveRootFolderDetailAPIStatus(status: APIStatus): void {
      this.getMoveRootFolderDetailsAPIStatus = status
   }

   @action.bound
   setGetMoveRootFolderDetailsAPIError(error: Error): void {
      this.getMoveRootFolderDetailsAPIError = error
   }

   @action.bound
   setGetMoveRootFolderDetailsAPIResponse(
      response: GetRootFolderDetailsAPIResponseType | null
   ): void {
      if (response) {
         const { root_folder_id: rootFolderId } = response
         this.moveRootFolderId = rootFolderId
      }
   }

   // TODO: Need to mention return types
   @action.bound
   getMoveRootFolderDetailsAPI(
      onSuccess: (rootFolderId?: string) => void,
      onFailure: () => void = () => {}
   ) {
      const rootFolderDetailsPromise = this.dashboardService.getMoveRootFolderDetailsAPI()
      return bindPromiseWithOnSuccess(rootFolderDetailsPromise)
         .to(this.setGetMoveRootFolderDetailAPIStatus, response => {
            this.setGetMoveRootFolderDetailsAPIResponse(response)
            onSuccess(this.moveRootFolderId)
         })
         .catch(error => {
            this.setGetMoveRootFolderDetailsAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setAddOrRemoveFolderStartAPIStatus(
      addOrRemoveFolderStarAPIStatus: APIStatus
   ): void {
      this.addOrRemoveFolderStarAPIStatus = addOrRemoveFolderStarAPIStatus
   }

   @action.bound
   setAddOrRemoveFolderStartAPIError(
      addOrRemoveFolderStarAPIError: Error
   ): void {
      this.addOrRemoveFolderStarAPIError = addOrRemoveFolderStarAPIError
   }

   @action.bound
   addStarredFolder(starredFolder: FolderInfoItem): void {
      const { id, name } = starredFolder
      const newStarredFolder = new BaseWorkbookAndFolderInfoItem({
         id,
         name
      })
      this.starredFolders.push(newStarredFolder)
   }

   @action.bound
   addOrRemoveFolderStar(folderId: string): void {
      const { folders } = this.activeFolderInfo
      const starredFolder = this.starredFolders.find(
         folder => folder.id === folderId
      )
      if (folders) {
         const starredFolderInAllFolders = folders.find(
            (folder: FolderInfoItem) => folder.id === folderId
         )
         if (starredFolder) {
            this.starredFolders = this.starredFolders.filter(
               folder => folder.id !== folderId
            )
            if (starredFolderInAllFolders) {
               starredFolderInAllFolders.isStarred = false
            }
         } else if (starredFolderInAllFolders) {
            starredFolderInAllFolders.isStarred = !starredFolderInAllFolders.isStarred
            this.addStarredFolder(starredFolderInAllFolders)
         } else {
            starredFolderInAllFolders.isStarred = true
            this.addStarredFolder(starredFolderInAllFolders)
         }
      } else {
         this.starredFolders = this.starredFolders.filter(
            folder => folder.id !== folderId
         )
      }
   }

   // TODO: Need to mention return types
   @action.bound
   addOrRemoveFolderStarAPI(folderId: string, onFailure: () => void) {
      const addOrRemoveFolderStarPromise = this.dashboardService.addOrRemoveFolderStarAPI(
         folderId
      )
      return bindPromiseWithOnSuccess(addOrRemoveFolderStarPromise)
         .to(this.setAddOrRemoveFolderStartAPIStatus, () => {})
         .catch(error => {
            this.setAddOrRemoveFolderStartAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setPinOrUnpinWorkbookAPIStatus(
      pinOrUnpinWorkbookAPIStatus: APIStatus
   ): void {
      this.pinOrUnpinWorkbookAPIStatus = pinOrUnpinWorkbookAPIStatus
   }

   @action.bound
   setPinOrUnpinWorkbookAPIError(pinOrUnpinWorkbookAPIError: Error): void {
      this.pinOrUnpinWorkbookAPIError = pinOrUnpinWorkbookAPIError
   }

   @action.bound
   addPinnedWorkbook(pinnedWorkbook: WorkbookInfoItem): void {
      const { id, name } = pinnedWorkbook
      const newPinnedWorkbook = new BaseWorkbookAndFolderInfoItem({
         id,
         name
      })
      this.pinnedWorkbooks.push(newPinnedWorkbook)
   }

   @action.bound
   pinOrUnpinWorkbook(workbookId: string): void {
      const { workbooks } = this.activeFolderInfo
      const pinnedWorkbook = this.pinnedWorkbooks.find(
         workbook => workbook.id === workbookId
      )
      if (workbooks) {
         const pinnedWorkbookInAllFolders = workbooks.find(
            (workbook: WorkbookInfoItem) => workbook.id === workbookId
         )
         if (pinnedWorkbook) {
            this.pinnedWorkbooks = this.pinnedWorkbooks.filter(
               workbook => workbook.id !== workbookId
            )
            if (pinnedWorkbookInAllFolders) {
               pinnedWorkbookInAllFolders.isPinned = false
            }
         } else if (pinnedWorkbookInAllFolders) {
            pinnedWorkbookInAllFolders.isPinned = !pinnedWorkbookInAllFolders.isPinned
            this.addPinnedWorkbook(pinnedWorkbookInAllFolders)
         } else {
            pinnedWorkbookInAllFolders.isPinned = true
            this.addPinnedWorkbook(pinnedWorkbookInAllFolders)
         }
      } else {
         this.pinnedWorkbooks = this.pinnedWorkbooks.filter(
            workbook => workbook.id !== workbookId
         )
      }
   }

   // TODO: Need to mention return types
   @action.bound
   pinOrUnpinWorkbookAPI(workbookId: string, onFailure: () => void) {
      const pinOrUnpinWorkbookPromise = this.dashboardService.pinOrUnpinWorkbookAPI(
         workbookId
      )
      return bindPromiseWithOnSuccess(pinOrUnpinWorkbookPromise)
         .to(this.setPinOrUnpinWorkbookAPIStatus, () => {})
         .catch(error => {
            this.setPinOrUnpinWorkbookAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setShareFolderOrWorkbookAPIStatus(status: APIStatus): void {
      this.shareFolderOrWorkbookAPIStatus = status
   }

   @action.bound
   setShareFolderOrWorkbookAPIError(error: any): void {
      this.shareFolderOrWorkbookAPIError = error
   }

   @action.bound
   shareFolderAPI(
      requestObject: ShareFolderRequest,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const getShareFolderPromise = this.dashboardService.shareFolderAPI(
         requestObject
      )
      return bindPromiseWithOnSuccess(getShareFolderPromise)
         .to(this.setShareFolderOrWorkbookAPIStatus, () => {
            onSuccess()
         })
         .catch(error => {
            this.setShareFolderOrWorkbookAPIError(error)
            onFailure(getAPIErrorMessage(this.shareFolderOrWorkbookAPIError))
         })
   }

   @action.bound
   setRenameFolderAPIStatus(renameForFolderAPIStatus: APIStatus): void {
      this.renameForFolderAPIStatus = renameForFolderAPIStatus
   }

   @action.bound
   setRenameFolderAPIError(renameForFolderAPIError: Error): void {
      this.renameForFolderAPIError = getAPIErrorMessage(renameForFolderAPIError)
   }

   @action.bound
   renameFolder(folderId: string, name: string): void {
      this.starredFolders.forEach(folder => {
         if (folder.id === folderId) {
            folder.name = name
         }
      })

      if (this.activeFolderInfo.folders) {
         this.activeFolderInfo.folders.forEach(folder => {
            if (folder.id === folderId) {
               folder.name = name
            }
         })
      }

      if (this.sharedWithMeFolderInfo.folders) {
         this.sharedWithMeFolderInfo.folders.forEach(folder => {
            if (folder.id === folderId) {
               folder.name = name
            }
         })
      }
   }

   // TODO: Need to mention return types
   @action.bound
   renameForFolderAPI(
      folderId: string,
      name: string,
      onSuccess: Function,
      onFailure: Function
   ) {
      const request: FolderRenameRequestType = {
         folder_name: name
      }
      const renameForFolderPromise = this.dashboardService.renameForFolderAPI(
         request,
         folderId
      )
      return bindPromiseWithOnSuccess(renameForFolderPromise)
         .to(this.setRenameFolderAPIStatus, () => {
            onSuccess()
            this.renameFolder(folderId, name)
         })
         .catch(error => {
            this.setRenameFolderAPIError(error)
            onFailure()
         })
   }

   @action.bound
   shareWorkbookAPI(
      requestObject: ShareWorkbookRequest,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const getShareWorkbookPromise = this.dashboardService.shareWorkbookAPI(
         requestObject
      )
      return bindPromiseWithOnSuccess(getShareWorkbookPromise)
         .to(this.setShareFolderOrWorkbookAPIStatus, () => {
            onSuccess()
         })
         .catch(error => {
            this.setShareFolderOrWorkbookAPIError(error)
            onFailure(getAPIErrorMessage(this.shareFolderOrWorkbookAPIError))
         })
   }

   @action.bound
   setSharedWorkbooksAndFoldersAPIStatus(
      workbooksAndFoldersAPIStatus: APIStatus
   ): void {
      this.getSharedWithMeWorkbooksAndFoldersAPIStatus = workbooksAndFoldersAPIStatus
   }

   @action.bound
   setSharedWorkbooksAndFoldersAPIError(
      workbooksAndFoldersAPIError: Error
   ): void {
      this.getSharedWithMeWorkbooksAndFoldersAPIError = workbooksAndFoldersAPIError
   }

   @action.bound
   setRenameWorkbookAPIStatus(renameForWorkbookAPIStatus: APIStatus): void {
      this.renameForWorkbookAPIStatus = renameForWorkbookAPIStatus
   }

   @action.bound
   setRenameWorkbookAPIError(renameForWorkbookAPIError: Error): void {
      this.renameForWorkbookAPIError = getAPIErrorMessage(
         renameForWorkbookAPIError
      )
   }

   @action.bound
   setSharedWorkbooksAndFoldersAPIResponse(
      workbooksAndFoldersAPIResponse: GetSharedWorkbooksAndFoldersResponse | null
   ): void {
      if (workbooksAndFoldersAPIResponse) {
         this.sharedWithMeFolderInfo = new SharedWithMeInfoItem(
            workbooksAndFoldersAPIResponse
         )
      }
   }

   @action.bound
   getSharedWorkbooksAndFoldersAPI(): Promise<GetSharedWorkbooksAndFoldersResponse | void> {
      const workbooksAndFolderPromise = this.dashboardService.getSharedWorkbooksAndFoldersAPI()
      return bindPromiseWithOnSuccess(workbooksAndFolderPromise)
         .to(
            this.setSharedWorkbooksAndFoldersAPIStatus,
            this.setSharedWorkbooksAndFoldersAPIResponse
         )
         .catch(this.setSharedWorkbooksAndFoldersAPIError)
   }

   @action.bound
   getSharedWorkbooksAndFoldersOfASubFolderAPI(
      folderId: string
   ): Promise<GetSharedWorkbooksAndFoldersResponse | void> {
      const request: SortRequestType = {
         sort_by: this.sortBy,
         order_by: this.orderBy
      }
      const newFolderId: string =
         folderId === undefined ? this.rootFolderId : folderId
      const workbooksAndFolderPromise = this.dashboardService.getSharedWorkbooksAndFoldersOfASubFolderAPI(
         request,
         newFolderId
      )
      return bindPromiseWithOnSuccess(workbooksAndFolderPromise)
         .to(
            this.setSharedWorkbooksAndFoldersAPIStatus,
            this.setSharedWorkbooksAndFoldersAPIResponse
         )
         .catch(this.setSharedWorkbooksAndFoldersAPIError)
   }

   @action.bound
   renameWorkbook(workbookId: string, name: string): void {
      this.pinnedWorkbooks.forEach(workbook => {
         if (workbook.id === workbookId) {
            workbook.name = name
         }
      })
      if (this.activeFolderInfo.workbooks) {
         this.activeFolderInfo.workbooks.forEach(workbook => {
            if (workbook.id === workbookId) {
               workbook.name = name
            }
         })
      }
      if (this.sharedWithMeFolderInfo.workbooks) {
         this.sharedWithMeFolderInfo.workbooks.forEach(workbook => {
            if (workbook.id === workbookId) {
               workbook.name = name
            }
         })
      }
   }

   // TODO: Need to mention return types
   @action.bound
   renameForWorkbookAPI(
      workbookId: string,
      name: string,
      onSuccess: Function,
      onFailure: Function
   ) {
      const request: WorkbookRenameRequestType = {
         workbook_name: name
      }
      const renameForWorkbookPromise = this.dashboardService.renameForWorkbookAPI(
         request,
         workbookId
      )
      return bindPromiseWithOnSuccess(renameForWorkbookPromise)
         .to(this.setRenameWorkbookAPIStatus, () => {
            onSuccess()
            this.renameWorkbook(workbookId, name)
         })
         .catch(error => {
            this.setRenameWorkbookAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setMoveFolderAPIStatus(status: APIStatus): void {
      this.moveFolderAPIStatus = status
   }

   // TODO: Need to add return type
   @action.bound
   setMoveFolderAPIError(error: any): void {
      this.moveFolderAPIError = error
   }

   // TODO: Need mention return type
   @action.bound
   moveFolderAPI(
      request: MoveFolderRequest,
      onSuccess: () => void,
      onFailure: () => void
   ) {
      const moveFolderPromise = this.dashboardService.moveFolderAPI(request)
      return bindPromiseWithOnSuccess(moveFolderPromise)
         .to(this.setMoveFolderAPIStatus, () => {
            onSuccess()
         })
         .catch(error => {
            console.log('Error', error)
            this.setMoveFolderAPIError(error)
            onFailure()
         })
   }

   @action.bound
   deleteFolder(folderId: string): void {
      this.starredFolders = this.starredFolders.filter(
         folder => folder.id !== folderId
      )
      if (this.activeFolderInfo.folders) {
         this.activeFolderInfo.folders = this.activeFolderInfo.folders.filter(
            folder => folder.id !== folderId
         )
      }
      if (this.sharedWithMeFolderInfo.folders) {
         this.sharedWithMeFolderInfo.folders = this.sharedWithMeFolderInfo.folders.filter(
            folder => folder.id !== folderId
         )
      }
   }

   @action.bound
   setDeleteFolderAPIStatus(status: APIStatus): void {
      this.deleteFolderAPIStatus = status
   }

   @action.bound
   setDeleteFolderAPIError(error): void {
      this.deleteFolderAPIError = getAPIErrorMessage(error)
   }

   // TODO: Need to mention return types
   @action.bound
   deleteFolderAPI(folderId: string, onSuccess: Function, onFailure: Function) {
      const deleteFolderPromise = this.dashboardService.deleteFolderAPI(
         folderId
      )
      return bindPromiseWithOnSuccess(deleteFolderPromise)
         .to(this.setDeleteFolderAPIStatus, () => {
            onSuccess()
            this.deleteFolder(folderId)
         })
         .catch(error => {
            this.setDeleteFolderAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setMoveWorkbookAPIStatus(status: APIStatus): void {
      this.moveWorkbookAPIStatus = status
   }

   // TODO: Need to add return type
   @action.bound
   setMoveWorkbookAPIError(error: any): void {
      this.moveWorkbookAPIError = error
   }

   // TODO: Need mention return type
   @action.bound
   moveWorkbookAPI(
      request: MoveWorkbookRequest,
      onSuccess: () => void,
      onFailure: () => void
   ) {
      const moveWorkbookPromise = this.dashboardService.moveWorkbookAPI(request)
      return bindPromiseWithOnSuccess(moveWorkbookPromise)
         .to(this.setMoveWorkbookAPIStatus, () => {
            onSuccess()
         })
         .catch(error => {
            this.setMoveWorkbookAPIError(error)
            onFailure()
         })
   }
   @action.bound
   deleteWorkbook(workbookId: string): void {
      this.pinnedWorkbooks = this.pinnedWorkbooks.filter(
         workbook => workbook.id !== workbookId
      )
      if (this.activeFolderInfo.workbooks) {
         this.activeFolderInfo.workbooks = this.activeFolderInfo.workbooks.filter(
            workbook => workbook.id !== workbookId
         )
      }
      if (this.sharedWithMeFolderInfo.workbooks) {
         this.sharedWithMeFolderInfo.workbooks = this.sharedWithMeFolderInfo.workbooks.filter(
            workbook => workbook.id !== workbookId
         )
      }
   }

   @action.bound
   setDeleteWorkbookAPIStatus(status: APIStatus): void {
      this.deleteWorkbookAPIStatus = status
   }

   @action.bound
   setDeleteWorkbookAPIError(error): void {
      this.deleteWorkbookAPIError = getAPIErrorMessage(error)
   }

   // TODO: Need to mention return types
   @action.bound
   deleteWorkbookAPI(
      workbookId: string,
      onSuccess: Function,
      onFailure: Function
   ) {
      const deleteWorkbookPromise = this.dashboardService.deleteWorkbookAPI(
         workbookId
      )
      return bindPromiseWithOnSuccess(deleteWorkbookPromise)
         .to(this.setDeleteWorkbookAPIStatus, () => {
            onSuccess()
            this.deleteWorkbook(workbookId)
         })
         .catch(error => {
            this.setDeleteWorkbookAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setTrashFoldersAndWorkbooksAPIStatus(status: APIStatus): void {
      this.trashFoldersAndWorkbooksAPIStatus = status
   }

   @action.bound
   setTrashFoldersAndWorkbooksAPIError(error: any): void {
      this.trashFoldersAndWorkbooksAPIError = getAPIErrorMessage(error)
   }

   @action.bound
   setTrashFoldersAndWorkbooksAPIResponse(
      trashFolersAndWorkbooksAPIResponse: TrashFoldersAndWorkbooksResponseType | null
   ): void {
      if (trashFolersAndWorkbooksAPIResponse) {
         this.trashFolderInfo = new ActiveFolderInfoItem(
            trashFolersAndWorkbooksAPIResponse
         )
      }
   }

   trashFoldersAndWorkbooksAPI() {
      const request: SortRequestType = {
         sort_by: this.sortBy,
         order_by: this.orderBy
      }
      const workbooksAndFolderPromise = this.dashboardService.trashFoldersAndWorkbooksAPI(
         request
      )
      return bindPromiseWithOnSuccess(workbooksAndFolderPromise)
         .to(
            this.setTrashFoldersAndWorkbooksAPIStatus,
            this.setTrashFoldersAndWorkbooksAPIResponse
         )
         .catch(this.setTrashFoldersAndWorkbooksAPIError)
   }

   @action.bound
   setRestoreFolderAPIStatus(status: APIStatus): void {
      this.restoreFolderAPIStatus = status
   }

   @action.bound
   setRestoreFolderAPIError(error): void {
      this.restoreFolderAPIError = getAPIErrorMessage(error)
   }

   // TODO: Need to mention return types
   @action.bound
   restoreFolderAPI(
      folderId: string,
      onSuccess: Function,
      onFailure: Function
   ) {
      const restoreFolderPromise = this.dashboardService.restoreFolderAPI(
         folderId
      )
      return bindPromiseWithOnSuccess(restoreFolderPromise)
         .to(this.setRestoreFolderAPIStatus, () => {
            onSuccess()
         })
         .catch(error => {
            this.setRestoreFolderAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setRestoreWorkbookAPIStatus(status: APIStatus): void {
      this.restoreWorkbookAPIStatus = status
   }

   @action.bound
   setRestoreWorkbookAPIError(error): void {
      this.restoreWorkbookAPIError = getAPIErrorMessage(error)
   }

   // TODO: Need to mention return types
   @action.bound
   restoreWorkbookAPI(
      folderId: string,
      onSuccess: Function,
      onFailure: Function
   ) {
      const restoreWorkbookPromise = this.dashboardService.restoreWorkbookAPI(
         folderId
      )
      return bindPromiseWithOnSuccess(restoreWorkbookPromise)
         .to(this.setRestoreWorkbookAPIStatus, () => {
            onSuccess()
         })
         .catch(error => {
            this.setRestoreWorkbookAPIError(error)
            onFailure()
         })
   }

   @action.bound
   deleteForeverFolder(folderId: string): void {
      if (this.trashFolderInfo) {
         this.trashFolderInfo.folders = this.trashFolderInfo.folders.filter(
            folder => folder.id !== folderId
         )
      }
   }

   @action.bound
   setDeleteForeverFolderAPIStatus(status: APIStatus): void {
      this.deleteForeverFolderAPIStatus = status
   }

   @action.bound
   setDeleteForeverFolderAPIError(error): void {
      this.deleteForeverFolderAPIError = getAPIErrorMessage(error)
   }

   // TODO: Need to mention return types
   @action.bound
   deleteForeverFolderAPI(
      folderId: string,
      onSuccess: Function,
      onFailure: Function
   ) {
      const deleteForeverFolderPromise = this.dashboardService.deleteForeverFolderAPI(
         folderId
      )
      return bindPromiseWithOnSuccess(deleteForeverFolderPromise)
         .to(this.setDeleteForeverFolderAPIStatus, () => {
            onSuccess()
            this.deleteForeverFolder(folderId)
         })
         .catch(error => {
            this.setDeleteForeverFolderAPIError(error)
            onFailure()
         })
   }

   @action.bound
   deleteForeverWorkbook(workbookId: string): void {
      if (this.trashFolderInfo) {
         this.trashFolderInfo.workbooks = this.trashFolderInfo.workbooks.filter(
            workbook => workbook.id !== workbookId
         )
      }
   }

   @action.bound
   setDeleteForeverWorkbookAPIStatus(status: APIStatus): void {
      this.deleteForeverWorkbookAPIStatus = status
   }

   @action.bound
   setDeleteForeverWorkbookAPIError(error): void {
      this.deleteForeverWorkbookAPIError = getAPIErrorMessage(error)
   }

   // TODO: Need to mention return types
   @action.bound
   deleteForeverWorkbookAPI(
      workbookId: string,
      onSuccess: Function,
      onFailure: Function
   ) {
      const deleteForeverWorkbookPromise = this.dashboardService.deleteForeverWorkbookAPI(
         workbookId
      )
      return bindPromiseWithOnSuccess(deleteForeverWorkbookPromise)
         .to(this.setDeleteForeverWorkbookAPIStatus, () => {
            onSuccess()
            this.deleteForeverWorkbook(workbookId)
         })
         .catch(error => {
            this.setDeleteForeverWorkbookAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setFolderIdOfAWorkbookAPIStatus(status: APIStatus): void {
      this.getFolderIdOfAWorkbookAPIStatus = status
   }

   @action.bound
   setFolderIdOfAWorkbookAPIError(error: any): void {
      this.getFolderIdOfAWorkbookAPIError = error
   }

   @action.bound
   getFolderIdOfAWorkbookAPI(
      workbookId: string,
      onSuccess: Function = (id: string): void => {},
      onFailure: Function = (): void => {}
   ) {
      const getFolderIdOfAWorkbookPromise = this.dashboardService.getFolderIdOfAWorkbook(
         workbookId
      )
      return bindPromiseWithOnSuccess(getFolderIdOfAWorkbookPromise)
         .to(this.setFolderIdOfAWorkbookAPIStatus, response => {
            response !== null && onSuccess(response.parent_folder_id)
         })
         .catch(error => {
            this.setFolderIdOfAWorkbookAPIError(error)
            onFailure(getAPIErrorMessage(error))
         })
   }

   @action.bound
   emptyTrash(): void {
      this.trashFolderInfo.folders = []
      this.trashFolderInfo.workbooks = []
   }

   @action.bound
   setEmptyTrashAPIStatus(status: APIStatus): void {
      this.emptyTrashAPIStatus = status
   }
   @action.bound
   setEmptyTrashAPIError(error: any): void {
      this.emptyTrashAPIError = getAPIErrorMessage(error)
   }

   @action.bound
   emptyTrashAPI(
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const emptyTrashPromise = this.dashboardService.emptyTrashAPI()
      return bindPromiseWithOnSuccess(emptyTrashPromise)
         .to(this.setEmptyTrashAPIStatus, () => {
            onSuccess()
            this.emptyTrash()
         })
         .catch(error => {
            this.setEmptyTrashAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setGetPublishWorkbookAPIStatus(status: APIStatus): void {
      this.getPublishedWorkbookAPIStatus = status
   }

   @action.bound
   setGetPublishWorkbookAPIError(error: any): void {
      this.getPublishedWorkbookAPIError = error
   }

   @action.bound
   setGetPublishWorkbookAPIResponse(
      response: PublishWorkbookResponse | null
   ): void {
      if (response) {
         this.publishedWorkbooks = []
         const { published_workbooks: publishedWorkbooks } = response
         publishedWorkbooks.forEach(eachWorkbook => {
            this.publishedWorkbooks.push(new PublishedWorkbook(eachWorkbook))
         })
      }
   }

   @action.bound
   getPublishedWorkbookAPI(
      onSuccess: Function = (): void => {},
      onFailure: Function = (error): void => {}
   ) {
      const requestObject: SortRequestType = {
         sort_by: this.sortBy,
         order_by: this.orderBy
      }
      const publishWorkbookPromise = this.publishService.getPublishedWorkbookAPI(
         requestObject
      )
      return bindPromiseWithOnSuccess(publishWorkbookPromise)
         .to(this.setGetPublishWorkbookAPIStatus, response => {
            this.setGetPublishWorkbookAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setGetPublishWorkbookAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setGetAssignmentsAPIStatus(apiStatus: APIStatus): void {
      this.getAssignmentsAPIStatus = apiStatus
   }

   @action.bound
   setGetAssignmentsAPIError(error): void {
      this.getAssignmentsAPIError = getAPIErrorMessage(error)
   }

   @action.bound
   setGetAssignmentsAPIResponse(
      assignmentsAPIResponse: GetAssignmentsResponseType | null
   ): void {
      this.assignmentsFolderInfo = new Map()
      const activeAssignments: Array<ActiveAssignmentWorkbook> = []
      const upcomingAssignments: Array<UpcomingAssignmentWorkbook> = []
      const completedAssignments: Array<CompletedAssignmentWorkbook> = []
      if (assignmentsAPIResponse) {
         const {
            active,
            upcoming,
            completed,
            assignments_folder_id: assignmentsFolderId
         } = assignmentsAPIResponse
         active.map(workbook => {
            const activeWorkbook = new ActiveAssignmentWorkbook(workbook)
            activeAssignments.push(activeWorkbook)
         })
         this.assignmentsFolderInfo.set(ACTIVE, activeAssignments)
         upcoming.map(workbook => {
            const upcomingWorkbook = new UpcomingAssignmentWorkbook(workbook)
            upcomingAssignments.push(upcomingWorkbook)
         })
         this.assignmentsFolderInfo.set(UPCOMING, upcomingAssignments)
         completed.map(workbook => {
            const completedWorkbook = new CompletedAssignmentWorkbook(workbook)
            completedAssignments.push(completedWorkbook)
         })
         this.assignmentsFolderInfo.set(COMPLETED, completedAssignments)
         this.assignmentsFolderInfo.set(
            ASSIGNMENTS_FOLDER_ID,
            assignmentsFolderId
         )
      }
   }

   // TODO: Need to mention return types
   @action.bound
   getAssignmentsAPI() {
      const assignmnetsApiPromise = this.assignmentsService.getAssignmentsAPI()
      return bindPromiseWithOnSuccess(assignmnetsApiPromise)
         .to(this.setGetAssignmentsAPIStatus, this.setGetAssignmentsAPIResponse)
         .catch(this.setGetAssignmentsAPIError)
   }

   @action.bound
   setGetLearningWorkbooksAPIStatus(apiStatus: APIStatus): void {
      this.getLearningWorkbooksAPIStatus = apiStatus
   }

   @action.bound
   setGetLearningWorkbooksAPIError(error): void {
      this.getLearningWorkbooksAPIError = getAPIErrorMessage(error)
   }

   @action.bound
   setGetLearningWorkbooksAPIResponse(
      learningWorkbooksAPIResponse: GetLearningsResponseType | null
   ): void {
      this.learningWorkbooks = new Map()
      const LearningWorkbooks: Array<BaseWorkbookAndFolderInfoItem> = []

      if (learningWorkbooksAPIResponse) {
         const {
            workbooks,
            learnings_folder_id: learningsFolderId
         } = learningWorkbooksAPIResponse
         workbooks.map(workbook => {
            const { workbook_name: name, workbook_id: id } = workbook
            const baseWorkbookAndFolderInfoItem = new BaseWorkbookAndFolderInfoItem(
               { id: id, name: name }
            )
            LearningWorkbooks.push(baseWorkbookAndFolderInfoItem)
         })
         this.learningWorkbooks.set(WORKBOOKS, LearningWorkbooks)

         this.learningWorkbooks.set(LEARNINGS_FOLDER_ID, learningsFolderId)
      }
   }

   // TODO: Need to mention return types
   @action.bound
   getLearningWorkbooksAPI() {
      const learningWorkbooksApiPromise = this.learningsService.getLearningWorkbooksAPI()
      return bindPromiseWithOnSuccess(learningWorkbooksApiPromise)
         .to(
            this.setGetLearningWorkbooksAPIStatus,
            this.setGetLearningWorkbooksAPIResponse
         )
         .catch(this.setGetLearningWorkbooksAPIError)
   }

   @action.bound
   setUserProjectsAPIStatus(status: APIStatus): void {
      this.getUserProjectsAPIStatus = status
   }

   // TODO: Need to update the type
   @action.bound
   setUserProjectsAPIError(error: any): void {
      this.getUserProjectsAPIError = error
   }

   @action.bound
   setGetUserProjectsAPIResponse(response: Array<BaseFolderType> | null): void {
      if (response) {
         this.activeFolderInfo = new ActiveFolderInfoItem({
            folders: response,
            workbooks: [],
            path: []
         })
      }
   }

   // TODO: Need to add return type
   @action.bound
   getUserProjectsAPI() {
      const request: SortRequestType = {
         sort_by: this.sortBy,
         order_by: this.orderBy
      }
      const getUserProjectsPromise = this.dashboardService.getUserProjectsAPI(
         request
      )
      return bindPromiseWithOnSuccess(getUserProjectsPromise)
         .to(this.setUserProjectsAPIStatus, response => {
            this.setGetUserProjectsAPIResponse(response)
         })
         .catch(this.setUserProjectsAPIError)
   }

   @action.bound
   setGetAssignmentInstructionsAPIStatus(status: APIStatus) {
      this.getAssignmentInstructionsAPIStatus = status
   }

   @action.bound
   setGetAssignmentInstructionsAPIError(error: any) {
      this.getAssignmentInstructionsAPIError = error
   }

   @action.bound
   setGetAssignmentInstructionsAPIResponse(
      response: AssignmentInstructionsResponse
   ) {
      this.getAssignmentInstructionsAPIResponse = new AssignmentInstructionModel(
         response
      )
   }

   @action.bound
   getAssignmentInstructionsAPI(
      workbookId: string,
      onSuccess: () => void = () => {},
      onFailure: (error: any) => void = () => {}
   ) {
      const getAssignmentInstructionsPromise = this.assignmentsService.getAssignmentInstructionsAPI(
         workbookId
      )
      return bindPromiseWithOnSuccess(getAssignmentInstructionsPromise)
         .to(this.setGetAssignmentInstructionsAPIStatus, response => {
            this.setGetAssignmentInstructionsAPIResponse(
               response as AssignmentInstructionsResponse
            )
            onSuccess()
         })
         .catch(error => {
            this.setGetAssignmentInstructionsAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   clearStore(): void {
      this.initStore()
   }
}

export default DashboardStore
