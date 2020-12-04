import { apiMethods } from '../constants/APIConstants/APIMethods'
import { apiEndpoints } from '../constants/APIConstants/APIEndpoints'
import { apiStatuses } from '../constants/APIConstants/APIStatuses'
import { LOGIN_SCREEN_PATH } from '../constants/RouteConstants/RouteConstants.js'

export function setViewPortSize(width, height) {
   cy.viewport(width, height)
}

export function initCypress() {
   Cypress.on('uncaught:exception', (err, runnable) => false)
}

export function loginUser() {
   initCypress()
   cy.setCookie('bss_at', 'accesstoken')
   cy.setCookie('bss_rkt', 'refreshtoken')
   cy.setCookie('user_id', 'usertoken')
}

export function clickElementById(elementId) {
   cy.get(elementId).click()
}

export function fillElementByID(elementId, text) {
   cy.get(elementId).type(text)
}

export function checkCurrentRoute(route) {
   cy.url().should('include', route)
}

export function checkCurrentRouteCompletePath(route) {
   cy.url().should('eq', route)
}

export function clickUsingDataTestID(dataTestID) {
   return cy.get(`[data-testid=${dataTestID}]`).click()
}

export function fillElementByDataTestID(dataTestID, text) {
   cy.get(`[data-testid=${dataTestID}]`).type(text)
}

export function getUsingDataTestID(dataTestID) {
   return cy.get(`[data-testid=${dataTestID}]`)
}

export function doubleClickOnNthElementWithDataTestID(
   dataTestID,
   elementNumber
) {
   getUsingDataTestID(dataTestID)
      .eq(elementNumber)
      .dblclick()
}

export function clickOnNthElementWithDataTestID(dataTestID, elementNumber) {
   getUsingDataTestID(dataTestID)
      .eq(elementNumber)
      .click()
}

export function clickOnNthChildUsingDataTestID(dataTestID, childNumber) {
   return cy
      .get(`:nth-child(${childNumber}) > [data-testid=${dataTestID}]`)
      .click()
}

export function checkURLIncluded(url) {
   return cy.url().should('include', url)
}

export function isUrlStrictlyMatched(url) {
   return cy.url().should('eq', url)
}

export function checkDataTestIDExists(dataTestID) {
   return cy.get(`[data-testid=${dataTestID}]`)
}

export function typeUsingDataTestID(dataTestID, value) {
   return cy.get(`[data-testid=${dataTestID}]`).type(value)
}

export function checkDataTestIDIsInDisableMode(dataTestID) {
   cy.get(`[data-testid=${dataTestID}]`).should('be.disabled')
}

export function checkIfIDExists(id) {
   return cy.get(id)
}

export function clickUsingID(id) {
   return cy.get(id).click()
}

export function getNthChildInDataTestID(dataTestID, childNumber) {
   return getUsingDataTestID(dataTestID).eq(childNumber)
}

export function checkIfTextExists(text) {
   return cy.get(text)
}

export function checkForText(text) {
   return cy.contains(text)
}

export function clickOnRetry() {
   const RETRY_BUTTON = 'retry'
   return clickUsingDataTestID(RETRY_BUTTON)
}

export function clickByText(text, force = false) {
   cy.contains(text).click({
      force: force
   })
}

export function clickOnNthChildInDataTestID(dataTestID, childNumber) {
   getNthChildInDataTestID(dataTestID, childNumber).click()
}

export const goToHomePage = () => {
   cy.visit('/')
}

export function triggerEvent(element, event) {
   element.trigger(event)
}

export function dblclickOnNthElementWithDataTestID(dataTestID, elementNumber) {
   getUsingDataTestID(dataTestID)
      .eq(elementNumber)
      .dblclick()
}

export function goToLoginPage() {
   cy.visit('/')
   checkCurrentRoute(LOGIN_SCREEN_PATH)
}
