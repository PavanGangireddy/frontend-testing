import React, { Component, ReactElement } from 'react'

import ProgressIndicator from '../../../Common/components/ProgressIndicator'

import {
   ProgressIndicatorAndScore,
   ScoreContainer,
   SecuredScore,
   Separator,
   TotalScore
} from './styledComponents'

interface ProgressIndicatorWithScoreProps {
   securedScore: number
   totalScore: number
   progressIndicatorContainerCss?: React.CSSProperties
}

class ProgressIndicatorWithScore extends Component<
   ProgressIndicatorWithScoreProps
> {
   render(): ReactElement {
      const {
         securedScore,
         totalScore,
         progressIndicatorContainerCss
      } = this.props
      return (
         <ProgressIndicatorAndScore>
            <ProgressIndicator
               securedScore={securedScore}
               totalScore={totalScore}
               containerCSS={progressIndicatorContainerCss}
            />
            <ScoreContainer>
               <SecuredScore>{securedScore}</SecuredScore>
               <Separator>/</Separator>
               <TotalScore>{totalScore}</TotalScore>
            </ScoreContainer>
         </ProgressIndicatorAndScore>
      )
   }
}

export default ProgressIndicatorWithScore
