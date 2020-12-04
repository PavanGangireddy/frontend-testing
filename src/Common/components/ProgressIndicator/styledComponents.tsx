import tw, { styled } from 'twin.macro'

export const ProgressIndicatorContainer = styled.div`
   ${tw`flex items-center`}
   ${props => props.css}
`

export const SingleChart = styled.div`
   ${tw`
      w-full
   `}
`

export const CircularChart = styled.svg`
   ${tw`
      block w-20px h-20px
   `}
`

export const CircularBackground = styled.path`
   fill: none;
   stroke: #b0cdfa;
   stroke-width: 4;
   stroke-linecap: round;
`

export const Circle = styled.path`
   fill: none;
   stroke-width: 3.5;
   stroke-linecap: round;
   animation: progress 1s ease-out forwards;
   stroke: #0b69ff;
   @keyframes progress {
      0% {
         stroke-dasharray: 0 100;
      }
   }
`

export const FlexWrapper = styled.div`
   ${tw`
       flex-no-wrap mr-8px
   `}
`
