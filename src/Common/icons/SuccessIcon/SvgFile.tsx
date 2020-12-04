import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg width={80} height={80} fill='none' viewBox='0 0 80 80' {...props}>
         <path
            fill='#2DCA73'
            fillRule='evenodd'
            d='M72.5 40c0 17.95-14.55 32.5-32.5 32.5S7.5 57.95 7.5 40 22.05 7.5 40 7.5 72.5 22.05 72.5 40zm7.5 0c0 22.091-17.909 40-40 40S0 62.091 0 40 17.909 0 40 0s40 17.909 40 40zM37.828 52.64l19.835-20-5.326-5.28-17.204 17.348-7.503-7.381-5.26 5.346 10.165 10 2.663 2.62 2.63-2.652z'
            clipRule='evenodd'
         />
      </svg>
   )
}

export default SvgComponent
