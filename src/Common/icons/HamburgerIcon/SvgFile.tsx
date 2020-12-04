import * as React from 'react'

import Colors from '../../themes/Colors'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   const { width, height, fill } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 16 16'
         {...props}
      >
         <path
            fill={fill}
            fillRule='evenodd'
            d='M1 3a1 1 0 011-1h12a1 1 0 010 2H2a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 010 2H2a1 1 0 01-1-1zm1 4a1 1 0 000 2h12a1 1 0 000-2H2z'
            clipRule='evenodd'
         />
      </svg>
   )
}

export default SvgComponent

SvgComponent.defaultProps = {
   width: 16,
   height: 16,
   fill: Colors.white
}
