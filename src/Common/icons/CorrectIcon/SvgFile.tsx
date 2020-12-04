import React from 'react'

interface Props {
   width: number
   height: number
   backgroundFill: string
   tickMarkFill: string
}

export default function SvgComponent(props: Props): JSX.Element {
   const { width, height, backgroundFill, tickMarkFill, ...other } = props
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width={width}
         height={height}
         viewBox='0 0 18 18'
         {...other}
      >
         <g fill='none' fillRule='evenodd'>
            <path
               fill={backgroundFill}
               d='M9 0C4.027 0 0 4.027 0 9a9 9 0 109-9z'
            ></path>
            <path
               fill={tickMarkFill}
               d='M7.92 12.96l-3.6-3.457 1.019-.978 2.581 2.479 5.461-5.244 1.019.978z'
            ></path>
         </g>
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 18,
   height: 18,
   backgroundFill: '#DAFFD9',
   tickMarkFill: '#00bb74'
}
