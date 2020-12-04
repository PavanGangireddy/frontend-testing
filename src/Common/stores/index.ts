import { isChrome } from 'react-device-detect'

import { networkCallWithApisauce as networkCallWithAPISauceWithoutAuth } from '../utils/AuthAPIUtils'
import { networkCallWithApisauce } from '../utils/APIUtils'

import { EntityObjectType } from '../../Discussions/stores/types'
import DiscussionsAPI from '../../Discussions/services/DiscussionsService/index.api'
import DiscussionsFixture from '../../Discussions/services/DiscussionsService/index.fixture'
import DiscussionsStore from '../../Discussions/stores/DiscussionsStore'
import AuthFixture from '../../UserProfile/services/AuthService/index.fixture'
import AuthService from '../../UserProfile/services/AuthService/index.api'
import AuthStore from '../../UserProfile/stores/AuthStore'
import UserFixture from '../../UserProfile/services/UserService/index.fixture'
import UserService from '../../UserProfile/services/UserService/index.api'
import UserStore from '../../UserProfile/stores/UserStore'
import DashboardFixture from '../../FolderManagement/services/DashboardService/index.fixture'
import DashboardAPI from '../../FolderManagement/services/DashboardService/index.api'
import PublishFixture from '../../FolderManagement/services/PublishService/index.fixture'
import PublishAPI from '../../FolderManagement/services/PublishService/index.api'
import DashboardStore from '../../FolderManagement/stores/DashboardStore'
import WorkbookFixture from '../../WorkbookManagement/services/WorkbookService/index.fixture'
import EvaluationWorkbookFixture from '../../WorkbookManagement/services/Evaluation/WorkbookService/index.fixture'
import WorkbookAPI from '../../WorkbookManagement/services/WorkbookService/index.api'
import EvaluationWorkbookAPI from '../../WorkbookManagement/services/Evaluation/WorkbookService/index.api'
import ListFixture from '../../WorkbookManagement/services/ListService/index.fixture'
import ListAPI from '../../WorkbookManagement/services/ListService/index.api'
import SectionFixture from '../../WorkbookManagement/services/SectionService/index.fixture'
import SectionAPI from '../../WorkbookManagement/services/SectionService/index.api'
import CardFixture from '../../WorkbookManagement/services/CardService/index.fixture'
import CardAPI from '../../WorkbookManagement/services/CardService/index.api'
import WorkbookStore from '../../WorkbookManagement/stores/WorkbookStore'
import PageFixture from '../../WorkbookManagement/services/PageService/index.fixture'
import EvaluationPageFixture from '../../WorkbookManagement/services/Evaluation/PageService/index.fixture'
import PageAPI from '../../WorkbookManagement/services/PageService/index.api'
import EvaluationPageAPI from '../../WorkbookManagement/services/Evaluation/PageService/index.api'
import ChecklistFixtureService from '../../UtilityTools/services/ChecklistService/index.fixture'
import ChecklistServiceAPI from '../../UtilityTools/services/ChecklistService/index.api'
import ChecklistStore from '../../UtilityTools/stores/ChecklistStore'
import AssignmentsFixture from '../../FolderManagement/services/AssignmentsService/index.fixture'
import AssignmentsAPI from '../../FolderManagement/services/AssignmentsService/index.api'
import FileUploadAPIService from '../services/FileUploadService/index.api'
import FileUploadFixtureService from '../services/FileUploadService/index.fixture'
import LearningsFixture from '../../FolderManagement/services/LearningsService/index.fixture'
import LearningsAPI from '../../FolderManagement/services/LearningsService/index.api'
import { getCookie } from '../../UserProfile/utils/StorageUtils'
import WelcomeMessageUIStore from '../../FolderManagement/stores/WelcomeMessageUIStore'

import {
   VIEW_IN_CHROME_BANNER_COOKIE_NAME,
   VIEW_IN_CHROME_BANNER_COOKIE_VALUE
} from '../constants/UIConstants'

import FileUploaderStore from './FileUploadStore'
import ChromeBannerUIStore from './ChromeBannerUIStore'

export const isFixtures = true

const getAuthServiceInstance = () => {
   if (isFixtures) {
      return new AuthFixture()
   }
   return new AuthService(networkCallWithAPISauceWithoutAuth)
}
const authStore = new AuthStore(getAuthServiceInstance())
export const authNetworkCallWithApisauce = networkCallWithApisauce(authStore)

const getListServiceInstance = () => {
   if (isFixtures) {
      return new ListFixture()
   }
   return new ListAPI(authNetworkCallWithApisauce)
}

const getSectionServiceInstance = () => {
   if (isFixtures) {
      return new SectionFixture()
   }
   return new SectionAPI(authNetworkCallWithApisauce)
}

const getCardServiceInstance = () => {
   if (isFixtures) {
      return new CardFixture()
   }
   return new CardAPI(authNetworkCallWithApisauce)
}

const getWorkbookServiceInstance = () => {
   if (isFixtures) {
      return new WorkbookFixture()
   }
   return new WorkbookAPI(authNetworkCallWithApisauce)
}

const getDashboardService = () => {
   if (isFixtures) {
      return new DashboardFixture()
   }
   return new DashboardAPI(authNetworkCallWithApisauce)
}

const getPublishService = () => {
   if (isFixtures) {
      return new PublishFixture()
   }
   return new PublishAPI(authNetworkCallWithApisauce)
}

const getAssignmentService = () => {
   if (isFixtures) {
      return new AssignmentsFixture()
   }
   return new AssignmentsAPI(authNetworkCallWithApisauce)
}

const getLearningsService = () => {
   if (isFixtures) {
      return new LearningsFixture()
   }
   return new LearningsAPI(authNetworkCallWithApisauce)
}

const dashboardStore = new DashboardStore(
   getDashboardService(),
   getAssignmentService(),
   getPublishService(),
   getLearningsService()
)

const getPageServiceInstance = () => {
   if (isFixtures) {
      return new PageFixture()
   }
   return new PageAPI(authNetworkCallWithApisauce)
}

const getUserService = () => {
   if (isFixtures) {
      return new UserFixture()
   }
   return new UserService(authNetworkCallWithApisauce)
}

const getDiscussionsService = () => {
   if (isFixtures) {
      return new DiscussionsFixture()
   }
   return new DiscussionsAPI(authNetworkCallWithApisauce)
}

export const getDiscussionsStore = (entityObject: EntityObjectType) => {
   const apiService = getDiscussionsService()
   return new DiscussionsStore({
      apiService,
      entityObject
   })
}

const userStore = new UserStore(getUserService())

const getChecklistServiceInstance = () => {
   if (isFixtures) {
      return new ChecklistFixtureService()
   }
   return new ChecklistServiceAPI(authNetworkCallWithApisauce)
}

const getEvaluationWorkbookServiceInstance = () => {
   if (isFixtures) {
      return new EvaluationWorkbookFixture()
   }
   return new EvaluationWorkbookAPI(authNetworkCallWithApisauce)
}

const getEvaluationPageServiceInstance = () => {
   if (isFixtures) {
      return new EvaluationPageFixture()
   }
   return new EvaluationPageAPI(authNetworkCallWithApisauce)
}

const checklistStore = new ChecklistStore(getChecklistServiceInstance())

const clearAllStores = (): void => {
   authStore.clearStore()
   userStore.clearStore()
}

userStore.setClearAllStoresFunction(clearAllStores)

const workbookStore = new WorkbookStore(
   getWorkbookServiceInstance(),
   getPageServiceInstance(),
   getListServiceInstance(),
   getSectionServiceInstance(),
   getCardServiceInstance(),
   getEvaluationWorkbookServiceInstance(),
   getEvaluationPageServiceInstance()
)

const getFileUploadService = () => {
   if (isFixtures) return new FileUploadFixtureService()
   return new FileUploadAPIService(authNetworkCallWithApisauce)
}
const fileUploadStore = new FileUploaderStore(getFileUploadService())

const chromeBannerUIStore = new ChromeBannerUIStore()
if (
   getCookie(VIEW_IN_CHROME_BANNER_COOKIE_NAME) ===
      VIEW_IN_CHROME_BANNER_COOKIE_VALUE ||
   isChrome
) {
   chromeBannerUIStore.closeChromeBanner()
}

const welcomeMessageUIStore = new WelcomeMessageUIStore()

export default {
   authStore,
   workbookStore,
   userStore,
   dashboardStore,
   fileUploadStore,
   checklistStore,
   chromeBannerUIStore,
   welcomeMessageUIStore
}
