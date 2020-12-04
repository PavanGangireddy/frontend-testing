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
         viewBox='0 0 48 48'
         {...other}
      >
         <g clipPath='url(#starred_workbook_prefix__clip0)'>
            <path
               fill='url(#starred_workbook_prefix__paint0_linear)'
               d='M6.416 3v42c0 1.65 1.35 3 3 3h29.167c1.65 0 3-1.35 3-3V11.048c0-.921-.365-1.805-1.016-2.456L32.99 1.017A3.472 3.472 0 0030.535 0H9.416c-1.65 0-3 1.35-3 3z'
            />
            <path
               fill='url(#starred_workbook_prefix__paint1_linear)'
               d='M32.991 1.017a3.479 3.479 0 00-1.601-.91v9.78l10.195 10.196V11.05c0-.921-.366-1.805-1.017-2.456l-7.576-7.576z'
            />
            <path
               fill='url(#starred_workbook_prefix__paint2_linear)'
               d='M41.481 10.206l.031.14h-9.19a1.178 1.178 0 01-1.179-1.178V.054a3.688 3.688 0 012.031 1.045l7.309 7.309a3.73 3.73 0 01.998 1.798z'
            />
            <path
               fill='url(#starred_workbook_prefix__paint3_linear)'
               d='M41.584 42.09V45c0 1.65-1.35 3-3 3H9.414c-1.65 0-3-1.35-3-3v-2.91h35.169z'
            />
            <path
               fill='#CFF3FC'
               fillRule='evenodd'
               d='M24 30l-4.084 2.147a.998.998 0 01-1.451-1.054l.78-4.548-3.305-3.22a1.002 1.002 0 01.555-1.707l4.566-.663 2.042-4.138a1 1 0 011.794 0l2.042 4.138 4.566.663a1 1 0 01.555 1.706l-3.305 3.221.78 4.548a1 1 0 01-1.451 1.055L24 30z'
               clipRule='evenodd'
            />
         </g>
         <defs>
            <linearGradient
               id='starred_workbook_prefix__paint0_linear'
               x1={13.278}
               x2={60.502}
               y1={1.722}
               y2={40.192}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#18CEFB' />
               <stop offset={0.297} stopColor='#2BB9F9' />
               <stop offset={0.735} stopColor='#42A0F7' />
               <stop offset={1} stopColor='#4A97F6' />
            </linearGradient>
            <linearGradient
               id='starred_workbook_prefix__paint1_linear'
               x1={38.598}
               x2={34.975}
               y1={16.351}
               y2={5.763}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#4C8DF1' stopOpacity={0} />
               <stop offset={1} stopColor='#4256AC' />
            </linearGradient>
            <linearGradient
               id='starred_workbook_prefix__paint2_linear'
               x1={33.166}
               x2={43.44}
               y1={0.423}
               y2={11.931}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#A3EDFF' />
               <stop offset={1} stopColor='#4A97F6' />
            </linearGradient>
            <linearGradient
               id='starred_workbook_prefix__paint3_linear'
               x1={24}
               x2={24}
               y1={43.642}
               y2={48.309}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#4C8DF1' stopOpacity={0} />
               <stop offset={1} stopColor='#4256AC' />
            </linearGradient>
            <clipPath id='starred_workbook_prefix__clip0'>
               <path fill='#fff' d='M0 0h48v48H0z' />
            </clipPath>
         </defs>
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 32,
   height: 32
}

export default SvgComponent
