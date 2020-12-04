import React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
   const { width, height, fill, ...other } = props
   return (
      <svg
         width={width}
         height={height}
         fill={fill}
         viewBox='0 0 10 10'
         {...other}
      >
         <path fill={fill} d='M3 1v8l4-4-4-4z' />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 12,
   height: 12,
   fill: '#171F46'
}

export default SvgComponent
