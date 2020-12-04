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
         fill={fill}
         viewBox='0 0 10 10'
         {...other}
      >
         <path fill={fill} d='M9 3H1l4 4 4-4z' />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 12,
   height: 12,
   fill: '#171F46'
}

export default SvgComponent
