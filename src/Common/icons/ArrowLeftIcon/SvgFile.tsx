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
         viewBox='0 0 16 16'
         {...other}
      >
         <path
            fill={fill}
            fillRule='evenodd'
            d='M2.707 8.707a1 1 0 010-1.414L7 3l.975.975L4.638 7.31H14v1.378H4.638l3.337 3.336L7 13 2.707 8.707z'
            clipRule='evenodd'
         />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 16,
   height: 16,
   fill: '#171F46'
}

export default SvgComponent
