import React from 'react'
import { render } from '@testing-library/react'
import { API_SUCCESS } from '@ib/api-constants'

import SideBar from '.'

describe('SideBar Component test cases', () => {
   it('should render collapsed view', () => {
      const { getByText, queryByText } = render(
         <SideBar
            collapsedHeaderView={<>Collapsed Header View</>}
            expandedHeaderView={<>Expanded Header View</>}
            collapsedFooterView={<>Collapsed Footer View</>}
            expandedFooterView={<>Expanded Footer View</>}
            isCollapsed={true}
            onClickSideBarToggleButton={(): void => {}}
            status={API_SUCCESS}
            error={null}
            retryFunction={() => {}}
            shouldDisplayViewInChromeMessageBanner={false}
         />
      )

      getByText(/Collapsed Header View/)
      getByText(/Collapsed Footer View/)
      expect(queryByText(/Expanded Header View/)).toBe(null)
      expect(queryByText(/Expanded Footer View/)).toBe(null)
   })

   it('should render expanded view', () => {
      const { getByText, queryByText } = render(
         <SideBar
            collapsedHeaderView={<>Collapsed Header View</>}
            expandedHeaderView={<>Expanded Header View</>}
            collapsedFooterView={<>Collapsed Footer View</>}
            expandedFooterView={<>Expanded Footer View</>}
            isCollapsed={false}
            onClickSideBarToggleButton={(): void => {}}
            status={API_SUCCESS}
            error={null}
            retryFunction={() => {}}
            shouldDisplayViewInChromeMessageBanner={false}
         />
      )
      getByText(/Expanded Header View/i)
      getByText(/Expanded Footer View/i)
      expect(queryByText(/Collapsed Header View/i)).toBe(null)
      expect(queryByText(/Collapsed Footer View/i)).toBe(null)
   })
})
