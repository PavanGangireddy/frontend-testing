import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
         <circle
            r={12}
            fill='#D7DFE9'
            fillOpacity={0.4}
            transform='matrix(1 0 0 -1 12 12)'
         />
         <path
            fill='#3E4C59'
            d='M2.555 17.791c0-.82-.176-4.058 2.378-6.626C6.652 9.437 9.223 9.137 12.3 9V4.693a.75.75 0 011.254-.555l7.14 6.477a.75.75 0 01.006 1.106l-7.14 6.613a.75.75 0 01-1.26-.55V13.5c-1.953.054-3.344.178-4.608.58-2.444.777-3.893 4.11-4.284 5.125a.457.457 0 01-.422.295.435.435 0 01-.435-.436c.001-.443.004-.952.004-1.273z'
         />
      </svg>
   )
}

export default SvgComponent
