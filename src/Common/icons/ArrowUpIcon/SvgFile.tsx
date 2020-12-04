import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg width={16} height={16} fill='none' viewBox='0 0 16 16' {...props}>
         <path
            fill='#7E858E'
            fillRule='evenodd'
            d='M7.293 2.707a1 1 0 011.414 0L13 7l-.975.975L8.69 4.638V14H7.311V4.638L3.975 7.975 3 7l4.293-4.293z'
            clipRule='evenodd'
         />
      </svg>
   )
}

export default SvgComponent
