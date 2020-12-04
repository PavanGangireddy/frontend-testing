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
            d='M2 6.126L3.15 5 8 9.747 12.85 5 14 6.126l-5.3 5.19c-.39.38-1.01.38-1.4 0L2 6.125z'
            clipRule='evenodd'
         />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 12,
   height: 12,
   fill: '#171F46'
}

export default SvgComponent
