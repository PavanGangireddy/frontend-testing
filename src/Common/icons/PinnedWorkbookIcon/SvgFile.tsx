import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg width={24} height={32} fill='none' viewBox='0 0 24 32' {...props}>
         <path
            fill='#0058E3'
            d='M3.333 0H14.23c.884 0 1.732.351 2.357.976l6.438 6.438c.625.625.976 1.473.976 2.357v18.896A3.335 3.335 0 0120.667 32H3.333A3.333 3.333 0 010 28.667V3.333A3.333 3.333 0 013.333 0zm0 1.333a2 2 0 00-2 2v25.334a2 2 0 002 2h17.334a2 2 0 002-2V9.77a2 2 0 00-.586-1.414l-6.438-6.438a2 2 0 00-1.414-.586H3.333z'
         />
         <path
            fill='#0B69FF'
            fillOpacity={0.1}
            fillRule='evenodd'
            d='M4.667 3.333h8.78c.355 0 .694.14.944.39l5.885 5.886c.25.25.39.59.39.943v16.781c0 .737-.596 1.334-1.332 1.334H4.667a1.333 1.333 0 01-1.333-1.334V4.667c0-.737.596-1.334 1.333-1.334z'
            clipRule='evenodd'
         />
         <path
            fill='#0058E3'
            fillOpacity={0.5}
            d='M13.76 11.008L10.246 11a.406.406 0 00-.262.097.485.485 0 00-.157.251c-.026.1-.021.207.013.304s.096.18.176.234l.455.314-.433 3.59-.895 1.227a.785.785 0 00-.08.762.7.7 0 00.243.298c.105.072.226.11.35.11l1.636-.002.49 4.61a.252.252 0 00.073.146.202.202 0 00.286 0 .24.24 0 00.073-.147l.492-4.607 1.637.001a.609.609 0 00.349-.11.682.682 0 00.242-.297.766.766 0 00.06-.393.744.744 0 00-.14-.369l-.885-1.233-.433-3.591.455-.314a.484.484 0 00.163-.234.525.525 0 00.007-.294c-.026-.097-.079-.182-.151-.244s-.16-.097-.252-.1z'
         />
      </svg>
   )
}

export default SvgComponent
