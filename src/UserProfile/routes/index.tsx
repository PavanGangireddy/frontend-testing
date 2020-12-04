import React, { lazy } from 'react'

import { ReactRoute } from '../../Common/utils/RouteUtils'

import {
   LOGIN_WITH_LEARNING_TOKEN_PATH,
   LOGIN_WITH_LEARNING_TOKEN_SCREEN,
   LOGIN_SCREEN_PATH,
   LOGIN_SCREEN
} from '../constants/NavigationConstants'

const LoginWithLearningTokenRoute = lazy(() =>
   import('./LoginWithLearningTokenRoute')
)

const LoginPage = lazy(() => import('./LoginPage'))

// TODO: need to update this routes when we go with beta or gamma
const userProfileRoutes = [
   <ReactRoute
      exact
      path={LOGIN_SCREEN_PATH}
      key={LOGIN_SCREEN}
      component={LoginPage}
   />,
   <ReactRoute
      exact
      path={LOGIN_WITH_LEARNING_TOKEN_PATH}
      key={LOGIN_WITH_LEARNING_TOKEN_SCREEN}
      component={LoginWithLearningTokenRoute}
   />
]

export default userProfileRoutes
