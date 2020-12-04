import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   const { fill } = props

   //TODO: need to check why clippath is not working in 1199px
   return (
      <svg width={16} height={16} fill='none' viewBox='0 0 16 16' {...props}>
         {/* <g clipPath='url(#prefix__prefix__clip0)'> */}
         <path
            fill={fill}
            fillRule='evenodd'
            d='M9.164 15.226c0 .427.346.774.774.774h4.28c.984 0 1.782-.809 1.782-1.806V1.806C16 .81 15.202 0 14.218 0h-4.28a.774.774 0 100 1.548h4.28c.14 0 .255.116.255.258v12.387a.257.257 0 01-.255.259h-4.28a.773.773 0 00-.774.774zM5.93 4.389l2.518 2.837H0v1.548h8.449l-2.518 2.837 1.135 1.036 3.665-4.13a.78.78 0 000-1.035L7.066 3.353 5.93 4.39z'
            clipRule='evenodd'
         />
         {/* </g> */}
         {/* <defs>
            <clipPath id='prefix__prefix__clip0'>
               <path fill='#fff' d='M0 0h16v16H0z' />
            </clipPath>
         </defs> */}
      </svg>
   )
}

export default SvgComponent
SvgComponent.defaultProps = {
   fill: '#7E858E' //TODO:need to add in color constants
}
