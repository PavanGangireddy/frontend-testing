import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>): React.ReactNode {
   return (
      <svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
         <g clipPath='url(#prefix__clip0)'>
            <path
               fill='#A368FC'
               d='M0 12v10.286h10.286V12H3.429a6.865 6.865 0 016.857-6.857V1.714C4.614 1.714 0 6.328 0 12zm24-6.857V1.714c-5.672 0-10.286 4.614-10.286 10.286v10.286H24V12h-6.857A6.865 6.865 0 0124 5.143z'
            />
         </g>
         <defs>
            <clipPath id='prefix__clip0'>
               <path fill='#fff' d='M0 0h24v24H0z' />
            </clipPath>
         </defs>
      </svg>
   )
}

export default SvgComponent
