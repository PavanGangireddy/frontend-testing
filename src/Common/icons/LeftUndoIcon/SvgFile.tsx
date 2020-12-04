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
            fill='#3E4C59'
            d='M21.445 17.791c0-.82.176-4.058-2.378-6.626C17.348 9.437 14.777 9.137 11.7 9V4.693a.75.75 0 00-1.254-.555l-7.14 6.477a.75.75 0 00-.006 1.106l7.14 6.613a.75.75 0 001.26-.55V13.5c1.953.054 3.344.178 4.608.58 2.444.777 3.893 4.11 4.284 5.125a.457.457 0 00.422.295c.24 0 .436-.195.435-.436-.001-.443-.004-.952-.004-1.273z'
         />
      </svg>
   )
}

export default SvgComponent
