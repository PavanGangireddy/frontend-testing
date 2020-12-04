import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
         <circle
            cx={12}
            cy={12}
            r={12}
            fill='#D7DFE9'
            fillOpacity={0.4}
            transform='rotate(-180 12 12)'
         />
         <path
            fill='#616E7C'
            fillRule='evenodd'
            d='M18.768 6.64l-4.476 5.371 4.315 5.362a1 1 0 01-1.559 1.254l-4.828-6a1 1 0 01.011-1.267l5-6a1.001 1.001 0 011.537 1.28zm-8.536-1.28a1 1 0 011.536 1.28l-4.476 5.37 4.315 5.363a1 1 0 01-1.558 1.254l-4.828-6a1 1 0 01.011-1.267l5-6z'
            clipRule='evenodd'
         />
      </svg>
   )
}

export default SvgComponent
