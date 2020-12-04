import React from 'react'

interface Props {
   width: number
   height: number
   fill: string
}

function SvgComponent(props: Props): JSX.Element {
   const { width, height, fill, ...other } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 24 24'
         {...other}
      >
         <path
            fill={fill}
            fillRule='evenodd'
            d='M7 8a5 5 0 0110 0v2h1a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h1V8zm5-3a3 3 0 00-3 3v2h6V8a3 3 0 00-3-3z'
            clipRule='evenodd'
         />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 24,
   height: 24,
   fill: '#7E858E'
}

export default SvgComponent
