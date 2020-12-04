import * as React from 'react'

interface Props {
   width: number
   height: number
}

function SvgComponent(props: Props): JSX.Element {
   const { width, height, ...other } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 32 32'
         {...other}
      >
         <path
            fill='url(#workbook_paint0_linear)'
            d='M4.277 2v28c0 1.1.9 2 2 2h19.445c1.1 0 2-.9 2-2V7.366c0-.614-.243-1.203-.678-1.637l-5.05-5.05A2.31 2.31 0 0020.357 0H6.277c-1.1 0-2 .9-2 2z'
         />
         <rect
            width={5.333}
            height={20}
            x={6.667}
            y={4.667}
            fill='#CFF3FC'
            rx={2}
         />
         <rect
            width={5.333}
            height={13.333}
            x={13.333}
            y={4.667}
            fill='#CFF3FC'
            rx={2}
         />
         <rect
            width={5.333}
            height={18}
            x={20}
            y={4.667}
            fill='#CFF3FC'
            rx={2}
         />
         <path
            fill='url(#workbook_paint1_linear)'
            d='M21.994.678A2.311 2.311 0 0020.926.07v6.52l6.797 6.798V7.366a2.32 2.32 0 00-.678-1.638l-5.05-5.05z'
         />
         <path
            fill='url(#workbook_paint2_linear)'
            d='M27.654 6.804c.008.032.015.063.02.094h-6.126a.786.786 0 01-.786-.786V.036l.15.03c.457.101.873.336 1.204.667l4.873 4.872c.33.33.56.745.665 1.199z'
         />
         <path
            fill='url(#workbook_paint3_linear)'
            d='M27.723 28.06V30c0 1.1-.9 2-2 2H6.276c-1.1 0-2-.9-2-2v-1.94h23.446z'
         />
         <defs>
            <linearGradient
               id='workbook_paint0_linear'
               x1={8.852}
               x2={40.334}
               y1={1.148}
               y2={26.794}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#18CEFB' />
               <stop offset={0.297} stopColor='#2BB9F9' />
               <stop offset={0.735} stopColor='#42A0F7' />
               <stop offset={1} stopColor='#4A97F6' />
            </linearGradient>
            <linearGradient
               id='workbook_paint1_linear'
               x1={25.732}
               x2={23.317}
               y1={10.9}
               y2={3.842}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#4C8DF1' stopOpacity={0} />
               <stop offset={1} stopColor='#4256AC' />
            </linearGradient>
            <linearGradient
               id='workbook_paint2_linear'
               x1={22.111}
               x2={28.96}
               y1={0.282}
               y2={7.954}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#A3EDFF' />
               <stop offset={1} stopColor='#4A97F6' />
            </linearGradient>
            <linearGradient
               id='workbook_paint3_linear'
               x1={16}
               x2={16}
               y1={29.095}
               y2={32.206}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#4C8DF1' stopOpacity={0} />
               <stop offset={1} stopColor='#4256AC' />
            </linearGradient>
         </defs>
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 32,
   height: 32
}

export default SvgComponent
