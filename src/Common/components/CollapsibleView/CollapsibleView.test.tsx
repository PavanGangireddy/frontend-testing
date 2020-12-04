import React from 'react'
import { render } from '@testing-library/react'

import CollapsibleView from '.'

describe('CollapsibleView tests', () => {
   it('should test if details display when isOpen is true', () => {
      const renderSummaryView = (): React.ReactNode => <p>Summary</p>
      const renderDetailsView = (): React.ReactNode => <p>Details</p>
      const { getByText } = render(
         <CollapsibleView
            renderSummaryView={renderSummaryView}
            renderDetailsView={renderDetailsView}
            isOpen={true}
         />
      )

      getByText('Details')
   })

   it('should test if details display when isOpen is false', () => {
      const renderSummaryView = (): React.ReactNode => <p>Summary</p>
      const renderDetailsView = (): React.ReactNode => <p>Details</p>
      const { queryByText } = render(
         <CollapsibleView
            renderSummaryView={renderSummaryView}
            renderDetailsView={renderDetailsView}
            isOpen={false}
         />
      )

      expect(queryByText('Details')).toBeNull()
   })
})
