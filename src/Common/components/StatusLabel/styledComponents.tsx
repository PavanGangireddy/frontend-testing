import tw, { styled } from 'twin.macro'

import { BaseHKGroteskSemiBoldText } from '../../styleGuide/Typos'

import { submitted, yetToStart, inProgress } from './constants'

type status = 'SUBMITTED' | 'YET_TO_START' | 'IN_PROGRESS'

const getStatusBackgroundColor = (status: status): any => {
   switch (status) {
      case submitted:
         return tw`bg-blueyGreen16`
      case yetToStart:
         return tw`bg-cerulean8`
      case inProgress:
         return tw`bg-macaroniAndCheese16`
      default:
         return tw`bg-blueyGreen16`
   }
}

const getStatusTextColor = (status: status): any => {
   switch (status) {
      case submitted:
         return tw`text-blueyGreen`
      case yetToStart:
         return tw`text-cerulean`
      case inProgress:
         return tw`text-brownishOrange`
      default:
         return tw`text-blueyGreen`
   }
}

export const StatusLabelContainer = styled.div`
   ${tw`w-auto h-auto md:w-87px md:h-24px rounded-25px inline-block flex justify-center items-center
      px-8px py-0 md:px-8px md:py-4px`}
   ${props => props.css}
   ${({ status }) => getStatusBackgroundColor(status)}

`

export const Label = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-12px`}
   ${({ status }) => getStatusTextColor(status)}
`
