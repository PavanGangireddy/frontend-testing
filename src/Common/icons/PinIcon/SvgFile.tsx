import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   const { fill } = props
   return (
      <svg width={6} height={12} fill='none' viewBox='0 0 6 12' {...props}>
         <path
            fill={fill}
            fillOpacity={0.5}
            d='M4.76.008L1.246 0a.406.406 0 00-.261.097.485.485 0 00-.157.251c-.026.1-.021.207.013.304s.096.18.176.234l.455.314-.433 3.59-.895 1.227a.785.785 0 00-.08.762.7.7 0 00.243.298c.105.072.226.11.35.11l1.636-.002.49 4.61a.252.252 0 00.073.146.202.202 0 00.286 0 .24.24 0 00.073-.147l.492-4.607 1.637.001a.609.609 0 00.349-.11.688.688 0 00.242-.297.766.766 0 00.06-.393.744.744 0 00-.14-.369L4.97 4.785l-.433-3.59.455-.314a.484.484 0 00.163-.234.525.525 0 00.007-.294C5.136.256 5.083.17 5.01.109s-.16-.097-.252-.1z'
         />
      </svg>
   )
}

export default SvgComponent

SvgComponent.defaultProps = {
   fill: '#0058E3' //TODO:need to add in color constants
}
