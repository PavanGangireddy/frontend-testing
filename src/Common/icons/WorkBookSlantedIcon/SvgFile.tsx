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
            fill='#000'
            d='M3.333 8.842h9.334V7.51H3.333v1.333zM2 11.51h9.333v-1.333H2v1.333zm2.667-6.667v1.334H14V4.842H4.667z'
         ></path>
      </svg>
   )
}
