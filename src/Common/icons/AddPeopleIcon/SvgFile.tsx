import React from 'react'

export default function SvgComponent(props): JSX.Element {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='21'
         height='17'
         fill='none'
         viewBox='0 0 21 17'
         {...props}
      >
         <path
            fill='#fff'
            d='M16 4.62h-1.778a.89.89 0 01.001-1.778H16V1.065a.89.89 0 111.778 0v1.777h1.778a.89.89 0 01-.001 1.778h-1.777v1.778a.89.89 0 01-1.778 0V4.62zM8 7.287A3.556 3.556 0 118 .175a3.556 3.556 0 010 7.112zm-8 8.177c.345-4.242 3.788-6.4 7.985-6.4 4.256 0 7.753 2.04 8.013 6.4.01.175 0 .712-.668.712H.647c-.223 0-.665-.48-.646-.712z'
         ></path>
      </svg>
   )
}
