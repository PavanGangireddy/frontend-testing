import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
         <path
            fill='#FF0B37'
            fillRule='evenodd'
            d='M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM12 4.5a1.44 1.44 0 00-1.44 1.499l.27 6.752a1.17 1.17 0 002.34 0l.27-6.752A1.44 1.44 0 0012 4.5zm-1.725 12.938a1.688 1.688 0 113.377.003 1.688 1.688 0 01-3.377-.004z'
            clipRule='evenodd'
         />
      </svg>
   )
}

export default SvgComponent
