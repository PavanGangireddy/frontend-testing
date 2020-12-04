import { apiMethods } from '../constants/APIConstants/APIMethods'
import { apiEndpoints } from '../constants/APIConstants/APIEndpoints'
import { apiStatuses } from '../constants/APIConstants/APIStatuses'
import starredFoldersAndPinnedWorkbooksInfo from '../fixtures/starredFoldersAndPinnedWorkbooksInfo.json'
import getRootFolderDetails from '../fixtures/getRootFolderDetails.json'
import getWorkbooksAndFolders from '../fixtures/getWorkbooksAndFolders.json'
import getSharedWorkbooksAndFolders from '../fixtures/getSharedWorkbooksAndFolders.json'
import userProfile from '../fixtures/userProfile.json'
import searchFoldersAndWorkbooksAPIResponse from '../fixtures/searchFoldersAndWorkbooksAPIResponse.json'

export function stubGetRootFolderDetails() {
   cy.route({
      method: apiMethods.post,
      url: apiEndpoints.rootFolderDetails,
      status: apiStatuses.success,
      response: getRootFolderDetails
   }).as('getRootFolderDetails')
}

export function stubGetPinnedWorkbooksAndStarredFolders() {
   cy.route({
      method: apiMethods.get,
      url: apiEndpoints.pinnedWorkbooksAndStarredFolders,
      status: apiStatuses.success,
      response: starredFoldersAndPinnedWorkbooksInfo
   }).as('getpinnedWorkbooksAndStarredFolders')
}

export function stubGetWorkbooksAndFolders() {
   const folderId = '1'
   cy.route({
      method: apiMethods.post,
      url: `${apiEndpoints.getWorkBooksAndFolders}${folderId}/v1/`,
      status: apiStatuses.success,
      response: getWorkbooksAndFolders
   }).as('getWorkbooksAndFolders')
}

export function stubActiveFolders() {
   const folderId = '2'
   cy.route({
      method: apiMethods.post,
      url: `${apiEndpoints.getWorkBooksAndFolders}${folderId}/v1/`,
      status: apiStatuses.success,
      response: getWorkbooksAndFolders
   })
}

export function stubGetOnClickCurrentFolderInBreadCrumb() {
   const folderId = '0'
   cy.route({
      method: apiMethods.post,
      url: `${apiEndpoints.getWorkBooksAndFolders}${folderId}/v1/`,
      status: apiStatuses.success,
      response: getWorkbooksAndFolders
   })
}

export function stubGetSharedWorkbooksAndFolders() {
   cy.route({
      method: apiMethods.post,
      url: apiEndpoints.getSharedWorkBooksAndFolders,
      status: apiStatuses.success,
      response: getSharedWorkbooksAndFolders
   }).as('getSharedWorkbooksAndFolders')
}

export function stubGetTrashFoldersAndWorkbooks() {
   cy.route({
      method: apiMethods.post,
      url: apiEndpoints.trashFoldersAndWorkbooks,
      status: apiStatuses.success,
      response: searchFoldersAndWorkbooksAPIResponse
   }).as('getTrashFoldersAndWorkbooks')
}

export function stubGetuserProfile() {
   cy.route({
      method: apiMethods.get,
      url: apiEndpoints.userProfile,
      status: apiStatuses.success,
      response: userProfile
   }).as('getuserProfile')
}

export function stubGetSearchFoldersAndWorkbooks() {
   cy.route({
      method: apiMethods.post,
      url: apiEndpoints.getSearchFoldersAndWorkbooks,
      status: apiStatuses.success,
      response: searchFoldersAndWorkbooksAPIResponse
   }).as('getSearchFoldersAndWorkbooks')
}

export function stubLogout() {
   cy.route({
      method: apiMethods.post,
      url: apiEndpoints.logout,
      status: apiStatuses.success,
      response: searchFoldersAndWorkbooksAPIResponse
   }).as('logout')
}
