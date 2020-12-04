import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import AuthStore from '../../../UserProfile/stores/AuthStore'
import AuthFixture from '../../../UserProfile/services/AuthService/index.fixture'

import Header from '.'

const authStore = new AuthStore(new AuthFixture())
describe('Header Component test cases', () => {
   let history
   beforeEach(() => {
      history = createMemoryHistory()
   })
   it('should check for renderHomeLink', () => {
      const { getByText } = render(
         <Router history={history}>
            <Header shouldShowHome authStore={authStore} />
         </Router>
      )
      getByText('Home')
   })

   it('should check for not rednering of HomeLink ', () => {
      const { queryByText } = render(
         <Router history={history}>
            <Header shouldShowHome={false} authStore={authStore} />
         </Router>
      )
      expect(queryByText('Home')).toBe(null)
   })
})
