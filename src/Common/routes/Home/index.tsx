import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { History } from 'history'
import { observer, inject } from 'mobx-react'

import AuthStore from '../../../UserProfile/stores/AuthStore'

import {
   Typo12DarkBlueGreyHKGroteskSemiBold,
   Typo12BlackHKGroteskRegular,
   Typo12SteelHKGroteskMedium
} from '../../styleGuide/Typos'
import Header from '../../components/Header'

interface Props {
   authStore: AuthStore
   history: History
}

@inject('authStore')
@observer
class Home extends Component<Props> {
   render() {
      const { authStore } = this.props
      return (
         <div>
            <Header shouldShowHome authStore={authStore} />
            <h2>Home</h2>
            <Link to='/counter'>
               <p>Counter</p>
            </Link>
            <Typo12DarkBlueGreyHKGroteskSemiBold>
               This is Semibold
            </Typo12DarkBlueGreyHKGroteskSemiBold>
            <Typo12SteelHKGroteskMedium>
               This is Medium
            </Typo12SteelHKGroteskMedium>
            <Typo12BlackHKGroteskRegular>
               This is Regular
            </Typo12BlackHKGroteskRegular>
         </div>
      )
   }
}

export default Home
