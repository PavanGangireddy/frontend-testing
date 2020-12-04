import {
   stubWorkbookDetails,
   stubRootFolderDetails,
   stubStarredFoldersAndPinnedWorkbooks,
   stubFoldersAndWorkbooks,
   stubGetUserProfile,
   stubCardDetails,
   stubMultipleCardsDetails,
   stubDiscussions
} from '../../stubs/WorkbookManagement/WorkbookPage'
import {
   loginUser,
   goToHomePage,
   doubleClickOnNthElementWithDataTestID,
   checkCurrentRoute,
   checkForText,
   getUsingDataTestID,
   clickUsingDataTestID,
   clickOnNthElementWithDataTestID,
   getNthChildInDataTestID,
   triggerEvent
} from '../../reusableActions/Common'
import {
   WORKBOOK_GRID_ITEM,
   PAGE_LIST,
   PAGE_BUTTON,
   WORKBOOK_HOME_NAVIGATION_BUTTON,
   SECTION_CARD,
   CARD_SELECT_BOX,
   MERGE_CARDS_BUTTON,
   MERGE_CARDS_CLOSE_BUTTON,
   MERGE_CARD_NEXT_BUTTON,
   CARD_DETAILS_MODAL_CLOSE_BUTTON
} from '../../constants/WorkbookManagement'
import {
   PAGE_TITLE,
   PAGE_DESCRIPTION,
   HOME,
   SHARED_WITH_ME,
   IB_HUBS
} from '../../constants/i18nConstants/WorkbookManagement'
import workbookDetails from '../../fixtures/workbookDetails.json'
import foldersAndWorkbooks from '../../fixtures/foldersAndWorkbooks.json'
import cardDetails from '../../fixtures/cardDetails.json'
import discussions from '../../fixtures/discussions.json'

describe('Workbook Page', () => {
   beforeEach(() => {
      cy.server()
      loginUser()
      stubGetUserProfile()
      stubStarredFoldersAndPinnedWorkbooks()
      stubRootFolderDetails()
      stubFoldersAndWorkbooks()
   })

   const testWorkbookPageCountAndActivePageListCount = () => {
      const {
         page: { lists },
         total_pages: totalPages
      } = workbookDetails
      getUsingDataTestID(PAGE_LIST).should('have.length', lists.length)
      getUsingDataTestID(PAGE_BUTTON).should('have.length', totalPages.length)
   }

   it('should navigate to workbook page on click workbook', () => {
      goToHomePage()
      stubWorkbookDetails()
      doubleClickOnNthElementWithDataTestID(WORKBOOK_GRID_ITEM, 1)
      checkCurrentRoute('/workbook/')
      checkForText(PAGE_TITLE)
      checkForText(PAGE_DESCRIPTION)
      testWorkbookPageCountAndActivePageListCount()
   })

   it('should open card details modal on click card', () => {
      stubCardDetails()
      stubDiscussions()
      clickOnNthElementWithDataTestID(SECTION_CARD, 1)
      const { card_title: cardTitle } = cardDetails
      checkForText(cardTitle)
      const { discussions: cardDiscussions } = discussions
      const { title: discussionTitle } = cardDiscussions[0]
      checkForText(discussionTitle)
      clickUsingDataTestID(CARD_DETAILS_MODAL_CLOSE_BUTTON)
      testWorkbookPageCountAndActivePageListCount()
   })

   it('should test merge cards', () => {
      triggerEvent(getNthChildInDataTestID(SECTION_CARD, 0), 'mouseover')
      clickOnNthElementWithDataTestID(CARD_SELECT_BOX, 0)
      triggerEvent(getNthChildInDataTestID(SECTION_CARD, 1), 'mouseover')
      clickOnNthElementWithDataTestID(CARD_SELECT_BOX, 1)
      triggerEvent(getNthChildInDataTestID(SECTION_CARD, 2), 'mouseover')
      clickOnNthElementWithDataTestID(CARD_SELECT_BOX, 2)
      triggerEvent(getNthChildInDataTestID(SECTION_CARD, 3), 'mouseover')
      clickOnNthElementWithDataTestID(CARD_SELECT_BOX, 3)
      stubMultipleCardsDetails()
      clickUsingDataTestID(MERGE_CARDS_BUTTON)
      getUsingDataTestID(MERGE_CARD_NEXT_BUTTON).should('be.disabled')
      clickUsingDataTestID(MERGE_CARDS_CLOSE_BUTTON)
      testWorkbookPageCountAndActivePageListCount()
   })

   it('should navigate to home page', () => {
      clickUsingDataTestID(WORKBOOK_HOME_NAVIGATION_BUTTON)
      checkCurrentRoute('/')
      checkForText(HOME)
      checkForText(SHARED_WITH_ME)
      checkForText(IB_HUBS)
      const { workbooks } = foldersAndWorkbooks
      getUsingDataTestID(WORKBOOK_GRID_ITEM).should(
         'have.length',
         workbooks.length
      )
   })
})
