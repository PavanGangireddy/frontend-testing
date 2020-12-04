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
            fill='#fff'
            fillRule='evenodd'
            d='M3 6.176a5 5 0 1110 0v3h.5a1.5 1.5 0 110 3h-11a1.5 1.5 0 010-3H3v-3zm5 9a2 2 0 002-2H6a2 2 0 002 2z'
            clipRule='evenodd'
         ></path>
      </svg>
   )
}
