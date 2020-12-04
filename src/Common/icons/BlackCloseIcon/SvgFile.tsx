import * as React from 'react'

import colors from '../../themes/Colors'

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
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
            d='M6.889 8L3 4.111 4.111 3 8 6.889 11.889 3 13 4.111 9.111 8 13 11.889 11.889 13 8 9.111 4.111 13 3 11.889 6.889 8z'
            clipRule='evenodd'
         />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 16,
   height: 16,
   fill: colors.darkBlueGrey
}

export default SvgComponent
