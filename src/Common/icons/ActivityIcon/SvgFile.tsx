import React from 'react'

export default function SvgComponent(props): JSX.Element {
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='16'
         height='15'
         fill='none'
         viewBox='0 0 16 15'
         {...props}
      >
         <path
            fill='#fff'
            fillRule='evenodd'
            d='M10.182 14.176a.726.726 0 01-.69-.479L5.818 3.089 4.327 7.397a.727.727 0 01-.69.479H.726a.715.715 0 01-.727-.7c0-.387.326-.7.727-.7h2.385L5.128.655c.1-.287.377-.48.69-.48.314 0 .591.193.69.48l3.674 10.607 1.492-4.307c.1-.287.376-.48.69-.48h2.909c.402 0 .727.314.727.7 0 .387-.325.7-.727.7h-2.385l-2.017 5.822a.725.725 0 01-.69.479z'
            clipRule='evenodd'
         ></path>
      </svg>
   )
}
