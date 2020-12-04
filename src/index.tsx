import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import './Common/i18n'
import './Common/utils/ConfigUtils'
import * as serviceWorker from './serviceWorker'
import App from './Common/routes/App'
import LoadingView from './Common/components/LoadingWrapper/LoadingView'
import './index.css'
import './assets/css/index.css'

ReactDOM.render(
   <Suspense
      fallback={
         <div className='suspense-loading-view'>
            <LoadingView />
         </div>
      }
   >
      <App />
   </Suspense>,
   document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
