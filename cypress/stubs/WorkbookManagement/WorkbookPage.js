import { apiMethods } from '../../constants/APIConstants/APIMethods'
import { apiEndpoints } from '../../constants/APIConstants/APIEndpoints'
import { apiStatuses } from '../../constants/APIConstants/APIStatuses'
import userProfile from '../../fixtures/userProfile.json'
import rootFolderDetails from '../../fixtures/rootFolderDetails.json'
import foldersAndWorkbooks from '../../fixtures/foldersAndWorkbooks.json'
import starredFoldersAndPinnedWorkbooks from '../../fixtures/starredFoldersAndPinnedWorkbooks.json'
import workbookDetails from '../../fixtures/workbookDetails.json'
import cardDetails from '../../fixtures/cardDetails.json'
import multipleCardsDetails from '../../fixtures/multipleCardsDetails.json'
import discussions from '../../fixtures/discussions.json'

export const stubGetUserProfile = () => {
   cy.route({
      method: apiMethods.get,
      url: apiEndpoints.userProfile,
      status: apiStatuses.success,
      response: userProfile
   })
}

export const stubRootFolderDetails = () => {
   cy.route({
      method: apiMethods.post,
      url: apiEndpoints.rootFolderDetails,
      status: apiStatuses.success,
      response: rootFolderDetails
   })
}

export const stubStarredFoldersAndPinnedWorkbooks = () => {
   cy.route({
      method: apiMethods.get,
      url: apiEndpoints.pinnedWorkbooksAndStarredFolders,
      status: apiStatuses.success,
      response: starredFoldersAndPinnedWorkbooks
   })
}

export const stubFoldersAndWorkbooks = () => {
   const folderId = '1'
   cy.route({
      method: apiMethods.post,
      url: `${apiEndpoints.folders}${folderId}/v1/`,
      status: apiStatuses.success,
      response: foldersAndWorkbooks
   })
}

export const stubWorkbookDetails = () => {
   const workbookId = '1'
   cy.route({
      method: apiMethods.get,
      url: `${apiEndpoints.workbooks}${workbookId}/v1/`,
      status: apiStatuses.success,
      response: workbookDetails
   })
}

export const stubCardDetails = () => {
   const cardId = '4fa85f64-5717-4562-b3fc-2d963f66afb0fsdfsd'
   cy.route({
      method: apiMethods.get,
      url: `${apiEndpoints.card}${cardId}/v1/`,
      status: apiStatuses.success,
      response: cardDetails
   })
}

export const stubMultipleCardsDetails = () => {
   cy.route({
      method: apiMethods.post,
      url: apiEndpoints.multipleCardDetails,
      status: apiStatuses.success,
      response: multipleCardsDetails
   })
}

export const stubDiscussions = () => {
   cy.route({
      method: apiMethods.post,
      url: `${apiEndpoints.getDiscussions}?offset=0&limit=4`,
      status: apiStatuses.success,
      response: discussions
   })
}
