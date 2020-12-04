import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import WorkbookService from '../../services/WorkbookService/index.fixture'
import getWorkbookDetailsAPIResponse from '../../fixtures/getWorkbookDetailsAPIResponse.json'
import getAssignmentWorkbookDetailsAPIResponse from '../../fixtures/getAssignmentWorkbookResponse.json'
import getSharedUsersResponse from '../../fixtures/getSharedUsersResponse.json'
import getWorkbookChildDetailsAPIResponse from '../../fixtures/getWorkbookChildDetailsAPIResponse.json'
import getPageDetailsResponse from '../../fixtures/getPageDetailsResponse.json'
import PageFixture from '../../services/PageService/index.fixture'
import ListService from '../../services/ListService/index.fixture'
import SectionService from '../../services/SectionService/index.fixture'
import CardService from '../../services/CardService/index.fixture'
import EvaluationWorkbookService from '../../services/Evaluation/WorkbookService/index.fixture'
import EvaluationPageService from '../../services/Evaluation/PageService/index.fixture'
import getAssignmentPageDetailsAPIResponse from '../../fixtures/getAssignmentPageResponse.json'

import BaseModel from '../models/BaseModel'
import WorkbookStore from '.'

const mergeCardsRequest = {
   section_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
   card_title: 'string',
   label: 'string',
   priority: 0,
   card_notes: 'string',
   attachments: ['https://www.eample.com/'],
   delete_card_ids: ['3fa85f64-5717-4562-b3fc-2c963f66afa6']
}

const workbookId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'

const reorderPageRequest = {
   order: 1
}

const movePageRequest = {
   workbook_id: '1'
}

const publishWorkbookRequest = {
   workbook_type: '',
   group_id: null,
   evaluation_type: null,
   start_datetime: null,
   end_datetime: null,
   cards_layout: null
}

describe('WorkbookStore test cases', () => {
   let workbookService
   let pageService
   let listService
   let sectionService
   let cardService
   let onSuccess
   let onFailure
   let workbookStore
   let evaluationWorkbookService
   let evaluationPageService

   beforeEach(() => {
      workbookService = new WorkbookService()
      pageService = new PageFixture()
      listService = new ListService()
      sectionService = new SectionService()
      cardService = new CardService()
      evaluationWorkbookService = new EvaluationWorkbookService()
      evaluationPageService = new EvaluationPageService()
      workbookStore = new WorkbookStore(
         workbookService,
         pageService,
         listService,
         sectionService,
         cardService,
         evaluationWorkbookService,
         evaluationPageService
      )
      onSuccess = jest.fn()
      onFailure = jest.fn()
   })

   it('should test whether  workbookStore is initialize or not', () => {
      expect(workbookStore.getWorkbookDetailsAPIStatus).toBe(API_INITIAL)

      expect(workbookStore.getSharedUsersDetailsAPIStatus).toBe(API_INITIAL)
      expect(workbookStore.getSharedUsersDetailsAPIError).toEqual({})

      expect(workbookStore.publishWorkbookAPIStatus).toBe(API_INITIAL)
      expect(workbookStore.publishWorkbookAPIError).toEqual({})
   })

   it('should test GetWorkbookDetailsAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      workbookService.getWorkbookDetailsAPI = jest.fn(() => mockLoadingPromise)

      workbookStore.getWorkbookDetailsAPI()

      expect(workbookStore.getWorkbookDetailsAPIStatus).toBe(API_FETCHING)
   })

   it('should test GetWorkbookDetailsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      workbookService.getWorkbookDetailsAPI = jest.fn(() => mockFailurePromise)

      await workbookStore.getWorkbookDetailsAPI()

      expect(workbookStore.getWorkbookDetailsAPIStatus).toBe(API_FAILED)
      expect(workbookStore.getWorkbookDetailsAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test GetWorkbookDetailsAPI success state', async () => {
      await workbookStore.getWorkbookDetailsAPI()

      const { page, workbook_id: workbookId } = getWorkbookDetailsAPIResponse
      const { page_id: pageId, lists } = page
      const { sections } = lists[0]
      const { cards } = sections[0]

      const { activePageDetails, workbookDetails } = workbookStore
      let { lists: activePageLists } = activePageDetails
      activePageLists = Array.from(activePageLists.values())
      let { sections: activePageListSections } = activePageLists[0]
      activePageListSections = Array.from(activePageListSections.values())
      let { cards: activePageListSectionCards } = activePageListSections[0]
      activePageListSectionCards = Array.from(
         activePageListSectionCards.values()
      )

      expect(workbookStore.getWorkbookDetailsAPIStatus).toBe(API_SUCCESS)
      expect(workbookDetails.id).toBe(workbookId)
      expect(activePageDetails).not.toBeNull()
      expect(activePageDetails.id).toBe(pageId)
      expect(activePageLists.length).toBe(lists.length)
      expect(activePageListSections.length).toBe(sections.length)
      expect(activePageListSectionCards.length).toBe(cards.length)
   })

   it('should test get shared users data loading state ', () => {
      const mockLoadingPromise = new Promise((): void => {})
      workbookService.getSharedUsersDetailsAPI = jest.fn(
         () => mockLoadingPromise
      )

      workbookStore.getSharedUsersDetailsAPI(workbookId, onSuccess, onFailure)

      expect(workbookStore.getSharedUsersDetailsAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test get shared users data sucess state ', async () => {
      await workbookStore.getSharedUsersDetailsAPI(
         workbookId,
         onSuccess,
         onFailure
      )

      expect(workbookStore.getSharedUsersDetailsAPIStatus).toBe(API_SUCCESS)
      expect(workbookStore.sharedUsers).not.toBe(null)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test get shared users data failure state ', async () => {
      const mockFailurePromise = new Promise((_, reject) => reject())
      workbookService.getSharedUsersDetailsAPI = jest.fn(
         () => mockFailurePromise
      )

      await workbookStore.getSharedUsersDetailsAPI(
         workbookId,
         onSuccess,
         onFailure
      )

      expect(workbookStore.getSharedUsersDetailsAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
   })

   it('should test GetWorkbookChildDetailsAPI loading state', () => {
      expect(workbookStore.getWorkbookChildDetailsAPIStatus).toBe(API_INITIAL)
      expect(workbookStore.getWorkbookChildDetailsAPIError).toStrictEqual({})
   })

   it('should test GetWorkbookChildDetailsAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      workbookService.getWorkbookChildDetailsAPI = jest.fn(
         () => mockLoadingPromise
      )

      workbookStore.getWorkbookChildDetailsAPI()

      expect(workbookStore.getWorkbookChildDetailsAPIStatus).toBe(API_FETCHING)
   })

   it('should test GetWorkbookChildDetailsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      workbookService.getWorkbookChildDetailsAPI = jest.fn(
         () => mockFailurePromise
      )

      await workbookStore.getWorkbookChildDetailsAPI()

      expect(workbookStore.getWorkbookChildDetailsAPIStatus).toBe(API_FAILED)
      expect(workbookStore.getWorkbookChildDetailsAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test GetWorkbookChildDetailsAPI success state', async () => {
      await workbookStore.getWorkbookChildDetailsAPI()

      const {
         workbook_id: workbookId,
         workbook_name: workbookName,
         pages: pagesResponse
      } = getWorkbookChildDetailsAPIResponse
      const firstPageResponse = pagesResponse[0]
      const {
         page_id: firstPageResponseId,
         page_name: firstPageResponseName
      } = firstPageResponse
      const { lists: listsResponse } = firstPageResponse
      const firstListResponse = listsResponse[0]
      const {
         list_id: firstListResponseId,
         list_name: firstListResponseName
      } = firstListResponse
      const { sections: sectionsResponse } = firstListResponse
      const firstSectionResponse = sectionsResponse[0]
      const {
         section_id: firstSectionResponseId,
         section_name: firstSectionResponseName
      } = firstSectionResponse

      const { workbookChildDetails } = workbookStore
      const { pages } = workbookChildDetails
      const firstPage = pages[0]
      const { lists } = firstPage
      const firstList = lists[0]
      const { sections } = firstList
      const firstSection = sections[0]

      expect(workbookStore.getWorkbookChildDetailsAPIStatus).toBe(API_SUCCESS)
      expect(workbookChildDetails.id).toBe(workbookId)
      expect(workbookChildDetails.name).toBe(workbookName)
      expect(pages.length).toBe(pagesResponse.length)
      expect(firstPage.id).toBe(firstPageResponseId)
      expect(firstPage.name).toBe(firstPageResponseName)
      expect(lists.length).toBe(listsResponse.length)
      expect(firstList.id).toBe(firstListResponseId)
      expect(firstList.name).toBe(firstListResponseName)
      expect(sections.length).toBe(sectionsResponse.length)
      expect(firstSection.id).toBe(firstSectionResponseId)
      expect(firstSection.name).toBe(firstSectionResponseName)
   })

   it('should test GetWorkbookChildDetailsAPI loading state', () => {
      expect(workbookStore.mergeCardsAPIStatus).toBe(API_INITIAL)
      expect(workbookStore.mergeCardsAPIError).toStrictEqual({})
   })

   it('should test GetWorkbookChildDetailsAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      workbookService.mergeCardsAPI = jest.fn(() => mockLoadingPromise)

      const mockFailureFunction = jest.fn()
      const mockSuccessFunction = jest.fn()

      workbookStore.mergeCardsAPI(
         mergeCardsRequest,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(workbookStore.mergeCardsAPIStatus).toBe(API_FETCHING)
   })

   it('should test GetWorkbookChildDetailsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      workbookService.mergeCardsAPI = jest.fn(() => mockFailurePromise)

      const mockFailureFunction = jest.fn()
      const mockSuccessFunction = jest.fn()

      await workbookStore.mergeCardsAPI(
         mergeCardsRequest,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(workbookStore.mergeCardsAPIStatus).toBe(API_FAILED)
      expect(workbookStore.mergeCardsAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockFailureFunction).toBeCalled()
   })

   it('should test GetWorkbookChildDetailsAPI success state', async () => {
      const mockFailureFunction = jest.fn()
      const mockSuccessFunction = jest.fn()

      await workbookStore.mergeCardsAPI(
         mergeCardsRequest,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(workbookStore.mergeCardsAPIStatus).toBe(API_SUCCESS)
      expect(mockSuccessFunction).toBeCalled()
   })

   it('should test CreatePageAPI loading state', () => {
      expect(workbookStore.createPageAPIStatus).toBe(API_INITIAL)
      expect(workbookStore.createPageAPIError).toStrictEqual({})
   })

   it('should test CreatePageAPI loading state', () => {
      workbookStore.setGetWorkbookDetailsAPIResponse(
         getWorkbookDetailsAPIResponse
      )

      const mockLoadingPromise = new Promise((): void => {})
      workbookService.createPageAPI = jest.fn(() => mockLoadingPromise)

      const mockFailureFunction = jest.fn()
      const mockSuccessFunction = jest.fn()

      workbookStore.createPageAPI(mockSuccessFunction, mockFailureFunction)

      expect(workbookStore.createPageAPIStatus).toBe(API_FETCHING)
   })

   it('should test CreatePageAPI failure state', async () => {
      workbookStore.setGetWorkbookDetailsAPIResponse(
         getWorkbookDetailsAPIResponse
      )

      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      workbookService.createPageAPI = jest.fn(() => mockFailurePromise)

      const mockFailureFunction = jest.fn()
      const mockSuccessFunction = jest.fn()

      await workbookStore.createPageAPI(
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(workbookStore.createPageAPIStatus).toBe(API_FAILED)
      expect(workbookStore.createPageAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockFailureFunction).toBeCalled()
   })

   it('should test CreatePageAPI success state', async () => {
      workbookStore.setGetWorkbookDetailsAPIResponse(
         getWorkbookDetailsAPIResponse
      )

      const mockFailureFunction = jest.fn()
      const mockSuccessFunction = jest.fn()

      await workbookStore.createPageAPI(
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(workbookStore.createPageAPIStatus).toBe(API_SUCCESS)
      expect(mockSuccessFunction).toBeCalled()
   })

   it('should test GetPageDetails loading state', () => {
      expect(workbookStore.getPageDetailsAPIStatus).toBe(API_SUCCESS)
      expect(workbookStore.getPageDetailsAPIError).toStrictEqual({})
   })

   it('should test GetPageDetails loading state', () => {
      workbookStore.setGetWorkbookDetailsAPIResponse(
         getWorkbookDetailsAPIResponse
      )

      const mockSuccessFunction = jest.fn()

      const mockLoadingPromise = new Promise((): void => {})
      workbookService.getPageDetailsAPI = jest.fn(() => mockLoadingPromise)

      workbookStore.getPageDetailsAPI('1', mockSuccessFunction)

      expect(workbookStore.getPageDetailsAPIStatus).toBe(API_FETCHING)
   })

   it('should test GetPageDetails failure state', async () => {
      workbookStore.setGetWorkbookDetailsAPIResponse(
         getWorkbookDetailsAPIResponse
      )

      const mockSuccessFunction = jest.fn()

      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      workbookService.getPageDetailsAPI = jest.fn(() => mockFailurePromise)

      await workbookStore.getPageDetailsAPI('1', mockSuccessFunction)

      expect(workbookStore.getPageDetailsAPIStatus).toBe(API_FAILED)
      expect(workbookStore.getPageDetailsAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test GetPageDetails success state', async () => {
      workbookStore.setGetWorkbookDetailsAPIResponse(
         getWorkbookDetailsAPIResponse
      )

      const mockSuccessFunction = jest.fn()

      await workbookStore.getPageDetailsAPI('1', mockSuccessFunction)

      const page = getPageDetailsResponse
      const { page_id: pageId, lists } = page
      const { sections } = lists[0]
      const { cards } = sections[0]

      const { activePageDetails } = workbookStore
      let { lists: activePageLists } = activePageDetails
      activePageLists = Array.from(activePageLists.values())
      let { sections: activePageListSections } = activePageLists[0]
      activePageListSections = Array.from(activePageListSections.values())
      let { cards: activePageListSectionCards } = activePageListSections[0]
      activePageListSectionCards = Array.from(
         activePageListSectionCards.values()
      )

      expect(workbookStore.getPageDetailsAPIStatus).toBe(API_SUCCESS)
      expect(activePageDetails).not.toBeNull()
      expect(activePageDetails.id).toBe(pageId)
      expect(activePageLists.length).toBe(lists.length)
      expect(activePageListSections.length).toBe(sections.length)
      expect(activePageListSectionCards.length).toBe(cards.length)
   })

   it('should test ReorderPageAPI loading state', () => {
      expect(workbookStore.reorderPageAPIStatus).toBe(API_INITIAL)
      expect(workbookStore.reorderPageAPIError).toStrictEqual({})
   })

   it('should test ReorderPageAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      workbookService.reorderPageAPI = jest.fn(() => mockLoadingPromise)

      const mockFailureFunction = jest.fn()

      workbookStore.reorderPageAPI(
         '3fa85f64-5717-4562-b3fc-2c963f66afa878378373',
         reorderPageRequest,
         mockFailureFunction
      )

      expect(workbookStore.reorderPageAPIStatus).toBe(API_FETCHING)
   })

   it('should test ReorderPageAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      workbookService.reorderPageAPI = jest.fn(() => mockFailurePromise)

      const mockFailureFunction = jest.fn()

      await workbookStore.reorderPageAPI(
         '3fa85f64-5717-4562-b3fc-2c963f66afa878378373',
         reorderPageRequest,
         mockFailureFunction
      )

      expect(workbookStore.reorderPageAPIStatus).toBe(API_FAILED)
      expect(workbookStore.reorderPageAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockFailureFunction).toBeCalled()
   })

   it('should test reorderPage method', () => {
      workbookStore.setGetWorkbookDetailsAPIResponse(
         getWorkbookDetailsAPIResponse
      )

      workbookStore.reorderPage(
         '3fa85f64-5717-4562-b3fc-2c963f66afa878378373',
         4
      )

      const {
         workbookDetails: { pages }
      } = workbookStore

      const pagesArray: Array<BaseModel> = Array.from(pages.values())

      expect(pagesArray[4].id).toBe(
         '3fa85f64-5717-4562-b3fc-2c963f66afa878378373'
      )
   })

   it('should test ReorderPageAPI success state', async () => {
      const mockFailureFunction = jest.fn()

      await workbookStore.reorderPageAPI(
         '3fa85f64-5717-4562-b3fc-2c963f66afa878378373',
         reorderPageRequest,
         mockFailureFunction
      )

      expect(workbookStore.reorderPageAPIStatus).toBe(API_SUCCESS)
   })

   it('should test MovePageAPI initial state', () => {
      expect(workbookStore.movePageAPIStatus).toBe(API_INITIAL)
      expect(workbookStore.movePageAPIError).toStrictEqual({})
   })

   it('should test MovePageAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      workbookService.movePageAPI = jest.fn(() => mockLoadingPromise)

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      workbookStore.movePageAPI(
         '1',
         movePageRequest,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(workbookStore.movePageAPIStatus).toBe(API_FETCHING)
   })

   it('should test MovePageAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      workbookService.movePageAPI = jest.fn(() => mockFailurePromise)

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await workbookStore.movePageAPI(
         '1',
         movePageRequest,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(workbookStore.movePageAPIStatus).toBe(API_FAILED)
      expect(workbookStore.movePageAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockFailureFunction).toBeCalled()
   })

   it('should test MovePageAPI success state', async () => {
      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await workbookStore.movePageAPI(
         '1',
         movePageRequest,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(workbookStore.movePageAPIStatus).toBe(API_SUCCESS)
   })

   it('should test updatePageName method', () => {
      workbookStore.setGetWorkbookDetailsAPIResponse(
         getWorkbookDetailsAPIResponse
      )

      const pageId = '3fa85f64-5717-4562-b3fc-2c963f66afa743543543'
      const updatedPageName = 'Update Name'

      workbookStore.updatePageName(pageId, updatedPageName)

      const { pages } = workbookStore.workbookDetails
      const page = pages.get(pageId)

      expect(page.name).toBe(updatedPageName)
   })

   it('should test GetAssignmentWorkbookDetailsAPI initial state', () => {
      expect(workbookStore.getAssignmentWorkbookDetailsAPIStatus).toBe(
         API_INITIAL
      )
      expect(workbookStore.getAssignmentWorkbookDetailsAPIError).toEqual({})
   })

   it('should test GetAssignmentWorkbookDetailsAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      evaluationWorkbookService.getAssignmentWorkbookDetailsAPI = jest.fn(
         () => mockLoadingPromise
      )

      workbookStore.getAssignmentWorkbookDetailsAPI('1')

      expect(workbookStore.getAssignmentWorkbookDetailsAPIStatus).toBe(
         API_FETCHING
      )
   })

   it('should test GetAssignmentWorkbookDetailsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      evaluationWorkbookService.getAssignmentWorkbookDetailsAPI = jest.fn(
         () => mockFailurePromise
      )

      await workbookStore.getAssignmentWorkbookDetailsAPI('1')

      expect(workbookStore.getAssignmentWorkbookDetailsAPIStatus).toBe(
         API_FAILED
      )
      expect(workbookStore.getAssignmentWorkbookDetailsAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test GetAssignmentPageDetailsAPI initial state', () => {
      expect(workbookStore.getAssignmentPageDetailsAPIStatus).toBe(API_SUCCESS)
      expect(workbookStore.getAssignmentPageDetailsAPIError).toEqual({})
   })

   it('should test GetAssignmentPageDetailsAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      evaluationWorkbookService.getAssignmentPageDetailsAPI = jest.fn(
         () => mockLoadingPromise
      )

      workbookStore.getAssignmentPageDetailsAPI('1')

      expect(workbookStore.getAssignmentPageDetailsAPIStatus).toBe(API_FETCHING)
   })

   it('should test GetAssignmentPageDetailsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      evaluationWorkbookService.getAssignmentPageDetailsAPI = jest.fn(
         () => mockFailurePromise
      )

      await workbookStore.getAssignmentPageDetailsAPI('1')

      expect(workbookStore.getAssignmentPageDetailsAPIStatus).toBe(API_FAILED)
   })

   it('should test GetAssignmentPageDetailsAPI success state', async () => {
      const mockSuccessFunction = jest.fn()

      await workbookStore.getAssignmentPageDetailsAPI('1', mockSuccessFunction)

      const {
         page_name: pageName,
         page_id: pageId,
         page_status: status
      } = getAssignmentPageDetailsAPIResponse
      const { activePageDetails } = workbookStore
      if (activePageDetails) {
         const { pageStatus, name, id } = activePageDetails
         expect(name).toBe(pageName)
         expect(id).toBe(pageId)
         expect(pageStatus).toBe(status)
      }

      expect(workbookStore.getAssignmentPageDetailsAPIStatus).toBe(API_SUCCESS)
   })

   it('should test publish workbook loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      evaluationWorkbookService.publishWorkbookAPI = jest.fn(
         () => mockLoadingPromise
      )

      workbookStore.publishWorkbookAPI(
         workbookId,
         publishWorkbookRequest,
         onSuccess,
         onFailure
      )

      expect(workbookStore.publishWorkbookAPIStatus).toBe(API_FETCHING)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test publish workbook Success state', async () => {
      await workbookStore.publishWorkbookAPI(
         workbookId,
         publishWorkbookRequest,
         onSuccess,
         onFailure
      )

      expect(workbookStore.publishWorkbookAPIStatus).toBe(API_SUCCESS)
      expect(onSuccess).toBeCalled()
      expect(onFailure).not.toBeCalled()
   })

   it('should test publish workbook failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      evaluationWorkbookService.publishWorkbookAPI = jest.fn(
         () => mockFailurePromise
      )

      await workbookStore.publishWorkbookAPI(
         workbookId,
         publishWorkbookRequest,
         onSuccess,
         onFailure
      )

      expect(workbookStore.publishWorkbookAPIStatus).toBe(API_FAILED)
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalled()
      expect(workbookStore.publishWorkbookAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test GetAssignmentWorkbookDetailsAPI success state', async () => {
      await workbookStore.getAssignmentWorkbookDetailsAPI('1')

      const {
         page,
         workbook_id: workbookId
      } = getAssignmentWorkbookDetailsAPIResponse
      const { page_id: pageId, lists } = page
      const { sections } = lists[0]
      const { cards } = sections[0]

      const { activePageDetails, workbookDetails } = workbookStore
      let { lists: activePageLists } = activePageDetails
      activePageLists = Array.from(activePageLists.values())
      let { sections: activePageListSections } = activePageLists[0]
      activePageListSections = Array.from(activePageListSections.values())
      let { cards: activePageListSectionCards } = activePageListSections[0]
      activePageListSectionCards = Array.from(
         activePageListSectionCards.values()
      )

      expect(workbookStore.getAssignmentWorkbookDetailsAPIStatus).toBe(
         API_SUCCESS
      )
      expect(workbookDetails.id).toBe(workbookId)
      expect(activePageDetails).not.toBeNull()
      expect(activePageDetails.id).toBe(pageId)
      expect(activePageLists.length).toBe(lists.length)
      expect(activePageListSections.length).toBe(sections.length)
      expect(activePageListSectionCards.length).toBe(cards.length)
   })
})
