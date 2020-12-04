import React from 'react'

export default function SvgComponent(props): JSX.Element {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='16'
         height='17'
         fill='none'
         viewBox='0 0 16 17'
         {...props}
      >
         <path
            fill='#171F46'
            d='M1.333 14.176H14v-2H1.334v2zm12-8.667H2a.665.665 0 00-.667.667v4a.665.665 0 00.667.666h11.334c.176 0 .346-.07.47-.195a.662.662 0 00.196-.471v-4a.668.668 0 00-.666-.667zm-12-3.333v2H14v-2H1.334z'
         ></path>
      </svg>
   )
}
