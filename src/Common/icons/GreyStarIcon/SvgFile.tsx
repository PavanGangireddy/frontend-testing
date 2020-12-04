import * as React from 'react'

import Colors from '../../themes/Colors'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   const { fill } = props
   return (
      <svg width={16} height={16} fill='none' viewBox='0 0 16 16' {...props}>
         {/* <g clipPath='url(#prefix__clip0)'> */}
         <path
            fill={fill}
            d='M7.05.868c.303-.915 1.597-.915 1.9 0l1.18 3.564a.997.997 0 00.927.685l3.688.08c.935.02 1.333 1.198.601 1.781l-3.018 2.403c-.317.252-.45.67-.339 1.06l1.08 3.745c.263.916-.782 1.646-1.551 1.084L8.59 13.131a1 1 0 00-1.18 0l-2.928 2.14c-.77.561-1.814-.17-1.55-1.085L4.01 10.44a1 1 0 00-.339-1.06L.655 6.978c-.732-.583-.334-1.762.601-1.782l3.688-.079a1 1 0 00.928-.685L7.05.868z'
         />
         {/* </g>
         <defs>
            <clipPath id='prefix__clip0'>
               <path fill='#fff' d='M0 0h16v16H0z' />
            </clipPath>
         </defs> */}
      </svg>
   )
}

export default SvgComponent

SvgComponent.defaultProps = {
   fill: Colors.steel
}
