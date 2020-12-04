import React from 'react'

interface Props {
   className?: string
}

export default function SvgComponent(props: Props): JSX.Element {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='12'
         height='21'
         fill='none'
         viewBox='0 0 12 21'
         className={props.className}
      >
         <rect
            width='20'
            height='12'
            y='20.007'
            fill='#7E858E'
            rx='1'
            transform='rotate(-90 0 20.007)'
         ></rect>
         <path fill='#fff' d='M1.5 16.486V1.526h9v14.96z'></path>
         <circle cx='6' cy='18.293' r='0.855' fill='#fff'></circle>
      </svg>
   )
}
