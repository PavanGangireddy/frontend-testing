import React, { Component, ReactElement } from 'react'

import {
   ProgressIndicatorContainer,
   SingleChart,
   CircularChart,
   CircularBackground,
   Circle,
   FlexWrapper
} from './styledComponents'

interface ProgressIndicatorProps {
   securedScore: number
   totalScore: number
   containerCSS?: React.CSSProperties
}
class ProgressIndicator extends Component<ProgressIndicatorProps> {
   get resultPercentage(): number {
      const { securedScore, totalScore } = this.props
      if (securedScore >= 0) {
         const percentage = (securedScore / totalScore) * 100
         return percentage
      }
      return 0
   }

   render(): ReactElement {
      const { containerCSS } = this.props
      return (
         <ProgressIndicatorContainer css={containerCSS}>
            <FlexWrapper>
               <SingleChart>
                  <CircularChart viewBox='0 0 36 36'>
                     <CircularBackground
                        d='M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831'
                     />
                     <Circle
                        strokeDasharray={`${this.resultPercentage}, 100`}
                        d='M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831'
                     />
                  </CircularChart>
               </SingleChart>
            </FlexWrapper>
         </ProgressIndicatorContainer>
      )
   }
}

export default ProgressIndicator
