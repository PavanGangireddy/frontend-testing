import React, { Component } from 'react'
import { NodataContainer, NoDataHeading } from './styledComponents'

export default class LearningsNoDataView extends Component {
   render() {
      return (
         <NodataContainer>
            <NoDataHeading>{`Currently no Learnings available for you `}</NoDataHeading>
         </NodataContainer>
      )
   }
}
