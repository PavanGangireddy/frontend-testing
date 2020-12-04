import React from 'react'

export default function SvgComponent(props): JSX.Element {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='16'
         height='16'
         fill='none'
         viewBox='0 0 16 16'
         {...props}
      >
         <path
            fill='#7E858E'
            fillRule='evenodd'
            d='M1 3a1 1 0 011-1h12a1 1 0 010 2H2a1 1 0 01-1-1zm3 5a1 1 0 011-1h9a1 1 0 010 2H5a1 1 0 01-1-1zm4 4a1 1 0 000 2h6a1 1 0 000-2H8z'
            clipRule='evenodd'
         ></path>
      </svg>
   )
}
