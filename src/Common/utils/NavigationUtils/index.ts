import { History } from 'history'

import { HOME_SCREEN_PATH } from '../../constants/NavigationConstants'
import Config from '../../constants/EnvironmentConstants'

const LOGIN_REDIRECT_URL = Config.LOGIN_REDIRECT_URL

export function goToHomePage(history: History): void {
   history.push(HOME_SCREEN_PATH)
}

export function replaceWithHomePage(history: History): void {
   history.replace(HOME_SCREEN_PATH)
}

export function goToPreviousPage(history: History): void {
   if (history.length <= 2) {
      replaceWithHomePage(history)
   } else {
      history.goBack()
   }
}

export function goToCardDetails(history: History, cardId: string): void {
   history.push({
      search: `?cardId=${cardId}`
   })
}

export function redirectToLearningLogin(): void {
   window.location.replace(LOGIN_REDIRECT_URL)
}
