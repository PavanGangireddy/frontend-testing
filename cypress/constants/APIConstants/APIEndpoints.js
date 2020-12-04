const BASE_URL = `https://bss-backend-alpha.apigateway.in/api/`
const BASE_AUTH_URL = `${BASE_URL}bss_auth/`
const BASE_APP_URL = `${BASE_URL}workbook_management/`
const BASE_DISCUSSIONS_URL = `${BASE_URL}bss_discussions/`

export const AUTHENTICATION = `${BASE_URL}bss_auth/`

export const apiEndpoints = {
   login: 'user/login/v1/',
   forgotPassword: 'user/send/reset_password_link/v1/',
   updatePassword: 'user/reset_password/v1/',
   signUp: 'user/signup/v1/',
   sendVerificationEmail: 'user/send/verify_email_link/v1/',
   verifyUserEmail: 'user/verify_email/v1/',
   pinnedWorkbooksAndStarredFolders: `${BASE_URL}workbook_management/pinned_workbooks_starred_folders/v1/`,
   rootFolderDetails: `${BASE_APP_URL}root_folder/v1/`,
   getWorkBooksAndFolders: `${BASE_APP_URL}folders/`,
   getSharedWorkBooksAndFolders: `${BASE_APP_URL}shared_workbooks_folders/v1/`,
   userProfile: `${BASE_AUTH_URL}user/profile/v1/`,
   getSearchFoldersAndWorkbooks: `${BASE_APP_URL}search_workbooks_folders/v1/`,
   trashFoldersAndWorkbooks: `${BASE_APP_URL}trash/folders_and_workbooks/v1/`,
   logout: `${BASE_AUTH_URL}user/logout/v1/`,
   folders: `${BASE_APP_URL}folders/`,
   workbooks: `${BASE_APP_URL}workbooks/`,
   card: `${BASE_APP_URL}card/`,
   multipleCardDetails: `${BASE_APP_URL}get/cards/v1/`,
   getDiscussions: `${BASE_DISCUSSIONS_URL}get_discussions/v1/`
}
