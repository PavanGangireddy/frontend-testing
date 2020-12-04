import React from 'react'

export default function SvgComponent(props): JSX.Element {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='12'
         height='13'
         fill='none'
         viewBox='0 0 12 13'
         {...props}
      >
         <path
            fill='#171F46'
            d='M0 9.926h12v-1.5H0v1.5zm0 2.25h12v-.75H0v.75zm0-5.25h12v-2.25H0v2.25zm0-6.75v3h12v-3H0z'
         ></path>
      </svg>
   )
}
