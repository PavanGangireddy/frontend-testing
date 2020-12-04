import React, { ReactElement } from 'react'

import ProgressIndicatorWithScore from '../ProgressIndicatorWithScore'

import { EmptyCell, ResultContainer } from './styledComponents'

interface AssignmentProgressIndicatorProps {
   userSecuredScore: number | null
   totalScore: number | null
}

function AssignmentProgressIndicator(
   props: AssignmentProgressIndicatorProps
): ReactElement {
   const { userSecuredScore, totalScore } = props
   return (
      <ResultContainer>
         {userSecuredScore !== null && totalScore !== null ? (
            <ProgressIndicatorWithScore
               securedScore={userSecuredScore}
               totalScore={totalScore}
            />
         ) : (
            <EmptyCell>-</EmptyCell>
         )}
      </ResultContainer>
   )
}

export default AssignmentProgressIndicator
