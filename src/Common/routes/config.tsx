import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PageNotFound404 from '../../Common/components/PageNotFound404'
import workbookRoutes from '../../WorkbookManagement/routes'
import folderManagementRoutes from '../../FolderManagement/routes'
import userProfileRoutes from '../../UserProfile/routes'

import {
   NOT_FOUND_PAGE_PATH,
   NOT_FOUND_PAGE
} from '../constants/NavigationConstants'
import { ProtectedRoute } from '../utils/RouteUtils'

import Home from './Home'

export const routes = () => (
   <Router>
      <Switch>
         {userProfileRoutes}
         {workbookRoutes}
         {folderManagementRoutes}
         <ProtectedRoute exact path='/' component={Home} />
         <Route
            path={NOT_FOUND_PAGE_PATH}
            key={NOT_FOUND_PAGE}
            component={PageNotFound404}
         />
      </Switch>
   </Router>
)
