import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg width={15} height={15} fill='none' viewBox='0 0 15 15' {...props}>
         <path fill='#FBFBFB' d='M0 0h15v15H0z' />
         <path
            fill='#0058E3'
            fillOpacity={0.5}
            fillRule='evenodd'
            d='M7.574 11.16l-2.723 1.432a.667.667 0 01-.967-.703l.52-3.032L2.201 6.71a.668.668 0 01.37-1.137l3.044-.443 1.362-2.758a.666.666 0 011.195 0L9.534 5.13l3.044.443a.667.667 0 01.37 1.137l-2.203 2.147.52 3.032a.667.667 0 01-.968.703L7.574 11.16z'
            clipRule='evenodd'
         />
      </svg>
   )
}

export default SvgComponent
