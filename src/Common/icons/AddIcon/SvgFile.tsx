import * as React from 'react'

import Colors from '../../themes/Colors'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   const { width, height, fill } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 24 24'
         {...props}
      >
         <path
            fill={fill}
            fillRule='evenodd'
            d='M10.875 10.875V3h2.25v7.875H21v2.25h-7.875V21h-2.25v-7.875H3v-2.25h7.875z'
            clipRule='evenodd'
         />
      </svg>
   )
}

export default SvgComponent

SvgComponent.defaultProps = {
   width: 24,
   height: 24,
   fill: Colors.white
}
