import React, { Component } from 'react'
import 'styled-components/macro'

import { CollapsibleViewContainer } from './styledComponents'

interface CollapsibleViewProps {
   renderDetailsView: Function
   renderSummaryView: Function
   isOpen: boolean
   containerCSS?: React.CSSProperties
}

class CollapsibleView extends Component<CollapsibleViewProps> {
   render(): React.ReactNode {
      const {
         renderSummaryView,
         renderDetailsView,
         containerCSS,
         isOpen
      } = this.props

      return (
         <CollapsibleViewContainer css={containerCSS}>
            {renderSummaryView()}
            {isOpen ? renderDetailsView() : null}
         </CollapsibleViewContainer>
      )
   }
}

export default CollapsibleView
