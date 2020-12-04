import {
   API_INITIAL,
   API_FETCHING,
   API_FAILED,
   API_SUCCESS
} from '@ib/api-constants'

import getWorkbookDetailsAPIResponse from '../../../fixtures/getWorkbookDetailsAPIResponse.json'
import getMultipleCardsAPIResponse from '../../../fixtures/getMultipleCardDetails.json'
import ListService from '../../../services/ListService/index.fixture'
import SectionService from '../../../services/SectionService/index.fixture'
import CardService from '../../../services/CardService/index.fixture'
import PageFixture from '../../../services/PageService/index.fixture'
import EvaluationPageFixture from '../../../services/Evaluation/PageService/index.fixture'

import ListModel from '../ListModel'

import PageModel from '.'

const { page } = getWorkbookDetailsAPIResponse

let pageService, pageModel

const pageListRequestObject = {
   page_id: '1',
   list_name: 'Sample list name',
   order: 2
}

const reorderListSectionRequestObject = {
   list_id: '1',
   order: 2
}

const reorderPageListRequestObject = {
   order: 2
}

const reorderSectionCardRequestObject = {
   section_id: '1',
   order: 3
}

const getMultipleCardsRequestObject = {
   cards_ids: ['1', '2']
}

const movePageListRequestObject = {
   page_id: '1'
}

describe('PageModel test cases', () => {
   let listService
   let sectionService
   let cardService
   let evaluationPageService

   beforeEach(() => {
      pageService = new PageFixture()
      listService = new ListService()
      sectionService = new SectionService()
      cardService = new CardService()
      evaluationPageService = new EvaluationPageFixture()
      pageModel = new PageModel(
         page,
         pageService,
         listService,
         sectionService,
         cardService,
         evaluationPageService
      )
   })

   it('should initialize page model with given data', () => {
      const {
         page_id: pageId,
         page_name: pageName,
         page_objective: pageObjective,
         page_description: pageDescription,
         lists
      } = page

      expect(pageModel.id).toBe(pageId)
      expect(pageModel.name).toBe(pageName)
      expect(pageModel.objective).toBe(pageObjective)
      expect(pageModel.description).toBe(pageDescription)
      expect(pageModel.lists.size).toBe(lists.length)
   })

   it('should test CreatePageListAPI initial state', () => {
      expect(pageModel.createPageListAPIStatus).toBe(API_INITIAL)
      expect(pageModel.createPageListAPIError).toStrictEqual({})
   })

   it('should test CreatePageListAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      pageService.createPageListAPI = jest.fn(() => mockLoadingPromise)

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      pageModel.createPageListAPI(
         pageListRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(pageModel.createPageListAPIStatus).toBe(API_FETCHING)
   })

   it('should test CreatePageListAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      pageService.createPageListAPI = jest.fn(() => mockFailurePromise)

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await pageModel.createPageListAPI(
         pageListRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(pageModel.createPageListAPIStatus).toBe(API_FAILED)
      expect(pageModel.createPageListAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockFailureFunction).toBeCalled()
   })

   it('should test CreatePageListAPI success state', async () => {
      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await pageModel.createPageListAPI(
         pageListRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(pageModel.createPageListAPIStatus).toBe(API_SUCCESS)
      expect(mockSuccessFunction).toBeCalled()
   })

   it('should test ReorderListSectionAPI initial state', () => {
      expect(pageModel.reorderListSectionAPIStatus).toBe(API_INITIAL)
      expect(pageModel.reorderListSectionAPIError).toStrictEqual({})
   })

   it('should test ReorderListSectionAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      pageService.reorderListSectionAPI = jest.fn(() => mockLoadingPromise)

      const mockFailureFunction = jest.fn()

      pageModel.reorderListSectionAPI(
         '1',
         reorderListSectionRequestObject,
         mockFailureFunction
      )

      expect(pageModel.reorderListSectionAPIStatus).toBe(API_FETCHING)
   })

   it('should test ReorderListSectionAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      pageService.reorderListSectionAPI = jest.fn(() => mockFailurePromise)

      const mockFailureFunction = jest.fn()

      await pageModel.reorderListSectionAPI(
         '1',
         reorderListSectionRequestObject,
         mockFailureFunction
      )

      expect(pageModel.reorderListSectionAPIStatus).toBe(API_FAILED)
      expect(pageModel.reorderListSectionAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockFailureFunction).toBeCalled()
   })

   it('should test ReorderListSectionAPI success state', async () => {
      const mockFailureFunction = jest.fn()

      await pageModel.reorderListSectionAPI(
         '1',
         reorderListSectionRequestObject,
         mockFailureFunction
      )

      expect(pageModel.reorderListSectionAPIStatus).toBe(API_SUCCESS)
   })

   it('should test ChangeListSectionOrder method', () => {
      const { lists } = page
      const secondList = lists[1]
      const { list_id: sourceListId, sections } = secondList
      const secondSection = sections[1]
      const { section_id: sectionId } = secondSection
      pageModel.changeListSectionOrder(sourceListId, sourceListId, sectionId, 0)
      const { lists: listsFromModel } = pageModel
      const secondListFromModel = listsFromModel.get(sourceListId)
      const { sections: sectionsFromModel } = secondListFromModel
      const sectionsFromModelArray = Array.from(sectionsFromModel)
      expect(sectionsFromModel.size).toBe(sections.length)
      expect(sectionsFromModelArray.length).toBe(sections.length)
   })

   it('should test ReorderPageListAPI initial state', () => {
      expect(pageModel.reorderPageListAPIStatus).toBe(API_INITIAL)
      expect(pageModel.reorderPageListAPIError).toStrictEqual({})
   })

   it('should test ReorderPageListAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      pageService.reorderPageListAPI = jest.fn(() => mockLoadingPromise)

      const mockFailureFunction = jest.fn()

      pageModel.reorderPageListAPI(
         '1',
         reorderPageListRequestObject,
         mockFailureFunction
      )

      expect(pageModel.reorderPageListAPIStatus).toBe(API_FETCHING)
   })

   it('should test ReorderPageListAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      pageService.reorderPageListAPI = jest.fn(() => mockFailurePromise)

      const mockFailureFunction = jest.fn()

      await pageModel.reorderPageListAPI(
         '1',
         reorderPageListRequestObject,
         mockFailureFunction
      )

      expect(pageModel.reorderPageListAPIStatus).toBe(API_FAILED)
      expect(pageModel.reorderPageListAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockFailureFunction).toBeCalled()
   })

   it('should test ReorderPageListAPI success state', async () => {
      const mockFailureFunction = jest.fn()

      await pageModel.reorderPageListAPI(
         '1',
         reorderPageListRequestObject,
         mockFailureFunction
      )

      expect(pageModel.reorderPageListAPIStatus).toBe(API_SUCCESS)
   })

   it('should test ChangePageListOrder method', () => {
      const { lists } = page
      const firstList = lists[0]
      const { list_id: firstListId } = firstList
      const secondList = lists[1]
      const { list_id: secondListId } = secondList
      pageModel.changePageListOrder(secondListId, 0)
      const { lists: listsFromModel } = pageModel
      const listsArray: Array<ListModel> = Array.from(listsFromModel.values())
      expect(listsArray[0].id).toBe(secondListId)
      expect(listsArray[1].id).toBe(firstListId)
   })

   it('should test ReorderSectionCardAPI initial state', () => {
      expect(pageModel.reorderSectionCardAPIStatus).toBe(API_INITIAL)
      expect(pageModel.reorderSectionCardAPIError).toStrictEqual({})
   })

   it('should test ReorderSectionCardAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      pageService.reorderSectionCardAPI = jest.fn(() => mockLoadingPromise)

      const mockFailureFunction = jest.fn()

      pageModel.reorderSectionCardAPI(
         '1',
         reorderSectionCardRequestObject,
         mockFailureFunction
      )

      expect(pageModel.reorderSectionCardAPIStatus).toBe(API_FETCHING)
   })

   it('should test ReorderSectionCardAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      pageService.reorderSectionCardAPI = jest.fn(() => mockFailurePromise)

      const mockFailureFunction = jest.fn()

      await pageModel.reorderSectionCardAPI(
         '1',
         reorderSectionCardRequestObject,
         mockFailureFunction
      )

      expect(pageModel.reorderSectionCardAPIStatus).toBe(API_FAILED)
      expect(pageModel.reorderSectionCardAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockFailureFunction).toBeCalled()
   })

   it('should test ReorderSectionCardAPI success state', async () => {
      const mockFailureFunction = jest.fn()

      await pageModel.reorderSectionCardAPI(
         '1',
         reorderSectionCardRequestObject,
         mockFailureFunction
      )

      expect(pageModel.reorderSectionCardAPIStatus).toBe(API_SUCCESS)
   })

   it('should test ChangeSectionCardOrder method', () => {
      const { lists } = page
      const firstList = lists[0]
      const { sections } = firstList
      const firstSection = sections[0]
      const secondSection = sections[1]
      const { section_id: firstSectionId } = firstSection
      const { section_id: secondSectionId } = secondSection
      const { cards } = firstSection
      const firstCard = cards[0]
      const { card_id: cardId } = firstCard
      pageModel.changeSectionCardOrder(
         firstSectionId,
         secondSectionId,
         cardId,
         2
      )
      const { lists: listsFromModel } = pageModel
      const listsArray: Array<ListModel> = Array.from(listsFromModel.values())
      const firstListFromModel = listsArray[0]
      const { sections: sectionsFromModel } = firstListFromModel
      const sectionsArray = Array.from(sectionsFromModel.values())
      const firstSectionFromModel = sectionsArray[0]
      const { cards: firstSectionCardsFromModel } = firstSectionFromModel
      const secondSectionFromModel = sectionsArray[1]
      const { cards: secondSectionCardsFromModel } = secondSectionFromModel
      expect(firstSectionCardsFromModel.get(cardId)).toBe(undefined)
      expect(secondSectionCardsFromModel.get(cardId)).not.toBe(undefined)
   })

   it('should test GetMultipleCardsAPI initial state', () => {
      expect(pageModel.getMultipleCardDetailsAPIStatus).toBe(API_INITIAL)
      expect(pageModel.getMultipleCardDetailsAPIError).toStrictEqual({})
   })

   it('should test GetMultipleCardsAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      pageService.getMultipleCardDetailsAPI = jest.fn(() => mockLoadingPromise)

      pageModel.getMultipleCardDetailsAPI(getMultipleCardsRequestObject)

      expect(pageModel.getMultipleCardDetailsAPIStatus).toBe(API_FETCHING)
   })

   it('should test GetMultipleCardsAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject) => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      pageService.getMultipleCardDetailsAPI = jest.fn(() => mockFailurePromise)

      await pageModel.getMultipleCardDetailsAPI(getMultipleCardsRequestObject)

      expect(pageModel.getMultipleCardDetailsAPIStatus).toBe(API_FAILED)
      expect(pageModel.getMultipleCardDetailsAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
   })

   it('should test GetMultipleCardsAPI success state', async () => {
      await pageModel.getMultipleCardDetailsAPI(getMultipleCardsRequestObject)

      const { card_details: cardsDetails } = getMultipleCardsAPIResponse
      const cardsLength = cardsDetails.length
      const firstCard = cardsDetails[0]
      const { card_id: firstCardId } = firstCard
      const lastCard = cardsDetails[cardsLength - 1]
      const { card_id: lastCardId } = lastCard

      const { cardsDetails: cards } = pageModel
      const cardsDetailsLength = pageModel.cardsDetails.length

      expect(pageModel.getMultipleCardDetailsAPIStatus).toBe(API_SUCCESS)
      expect(cardsDetailsLength).toBe(cardsLength)
      expect(cards[0].id).toBe(firstCardId)
      expect(cards[cardsDetailsLength - 1].id).toBe(lastCardId)
   })

   it('should test MoveListAPI initial state', () => {
      expect(pageModel.moveListAPIStatus).toBe(API_INITIAL)
      expect(pageModel.moveListAPIError).toStrictEqual({})
   })

   it('should test MoveListAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      pageService.moveListAPI = jest.fn(() => mockLoadingPromise)

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      pageModel.moveListAPI(
         '1',
         movePageListRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(pageModel.moveListAPIStatus).toBe(API_FETCHING)
   })

   it('should test MoveListAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      pageService.moveListAPI = jest.fn(() => mockFailurePromise)

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await pageModel.moveListAPI(
         '1',
         movePageListRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(pageModel.moveListAPIStatus).toBe(API_FAILED)
      expect(pageModel.moveListAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockFailureFunction).toBeCalled()
   })

   it('should test MoveListAPI success state', async () => {
      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await pageModel.moveListAPI(
         '78378373',
         movePageListRequestObject,
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(pageModel.moveListAPIStatus).toBe(API_SUCCESS)
      expect(mockSuccessFunction).toBeCalled()
   })

   it('should test SubmitAssignmentAPI initial state', () => {
      expect(pageModel.submitAssignmentAPIStatus).toBe(API_INITIAL)
      expect(pageModel.submitAssignmentAPIError).toStrictEqual({})
   })

   it('should test SubmitAssignmentAPI loading state', () => {
      const mockLoadingPromise = new Promise((): void => {})
      evaluationPageService.submitAssignmentAPI = jest.fn(
         () => mockLoadingPromise
      )

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      pageModel.submitAssignmentAPI(
         '1',
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(pageModel.submitAssignmentAPIStatus).toBe(API_FETCHING)
   })

   it('should test SubmitAssignmentAPI failure state', async () => {
      const mockFailurePromise = new Promise((_, reject): void => {
         reject(
            new Error(
               "We're having some trouble completing your request. Please try again."
            )
         )
      })
      evaluationPageService.submitAssignmentAPI = jest.fn(
         () => mockFailurePromise
      )

      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await pageModel.submitAssignmentAPI(
         '1',
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(pageModel.submitAssignmentAPIStatus).toBe(API_FAILED)
      expect(pageModel.submitAssignmentAPIError).toBe(
         "We're having some trouble completing your request. Please try again."
      )
      expect(mockFailureFunction).toBeCalled()
   })

   it('should test SubmitAssignmentAPI success state', async () => {
      const mockSuccessFunction = jest.fn()
      const mockFailureFunction = jest.fn()

      await pageModel.submitAssignmentAPI(
         '1',
         mockSuccessFunction,
         mockFailureFunction
      )

      expect(pageModel.submitAssignmentAPIStatus).toBe(API_SUCCESS)
      expect(mockSuccessFunction).toBeCalled()
   })
})
