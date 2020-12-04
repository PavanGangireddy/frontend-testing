import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { API_SUCCESS } from '@ib/api-constants'
import { Provider } from 'mobx-react'

import ChromeBannerUIStore from '../../stores/ChromeBannerUIStore'
import LayoutWithSideBar from '.'

describe('LayoutWithSideBar component test cases', () => {
   let chromeBannerUIStore
   beforeEach(() => {
      chromeBannerUIStore = new ChromeBannerUIStore()
   })
   it('should render the given layout with sidebar', () => {
      const { getByText } = render(
         <Provider chromeBannerUIStore={chromeBannerUIStore}>
            <LayoutWithSideBar
               collapsedHeaderView={<>Collapsed Header View</>}
               expandedHeaderView={<>Expanded Header View</>}
               collapsedFooterView={<>Collapsed Footer View</>}
               expandedFooterView={<>Expanded Footer View</>}
               status={API_SUCCESS}
               error={null}
               retryFunction={() => {}}
               searchBar={() => <div>searchBar</div>}
            >
               <div>
                  <p>Main section</p>
               </div>
            </LayoutWithSideBar>
         </Provider>
      )

      getByText(/Expanded Header View/)
      getByText(/Expanded Footer View/)
      getByText(/Main section/)
   })
})
