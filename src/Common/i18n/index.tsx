import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

const fallbackLng = ['en']

i18n
   .use(Backend)
   .use(initReactI18next)
   .init(
      {
         fallbackLng,
         backend: {
            loadPath: '/i18n/translations/{{lng}}/{{ns}}.json'
         },
         ns: ['common'],
         defaultNS: 'common',
         react: {
            useSuspense: true,
            wait: true
         }
      },
      err => {
         if (err) {
            console.log(err)
         }
      }
   )

i18n.loadNamespaces(
   [
      'common',
      'contentGeneration',
      'userProfile',
      'workbookManagement',
      'folderManagement',
      'discussions',
      'utilityTools'
   ],
   err => {
      if (err) {
         console.log(err)
      }
   }
)

export default i18n
