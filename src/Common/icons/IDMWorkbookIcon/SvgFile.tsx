import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
   const { width, height } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 48 48'
         {...props}
      >
         <g clipPath='url(#IDMWorkbookIcon__clip0)'>
            <path
               fill='url(#IDMWorkbookIcon__paint0_linear)'
               d='M6.416 3v42c0 1.65 1.35 3 3 3h29.167c1.65 0 3-1.35 3-3V11.048c0-.921-.365-1.805-1.016-2.456L32.99 1.017A3.472 3.472 0 0030.535 0H9.416c-1.65 0-3 1.35-3 3z'
            />
            <path
               fill='url(#IDMWorkbookIcon__paint1_linear)'
               d='M32.991 1.017a3.479 3.479 0 00-1.601-.91v9.78l10.195 10.196V11.05c0-.921-.366-1.805-1.017-2.456l-7.576-7.576z'
            />
            <path
               fill='url(#IDMWorkbookIcon__paint2_linear)'
               d='M41.481 10.206l.031.14h-9.19a1.178 1.178 0 01-1.179-1.178V.054a3.688 3.688 0 012.031 1.045l7.309 7.309a3.73 3.73 0 01.998 1.798z'
            />
            <path
               fill='url(#IDMWorkbookIcon__paint3_linear)'
               d='M41.584 42.09V45c0 1.65-1.35 3-3 3H9.414c-1.65 0-3-1.35-3-3v-2.91h35.169z'
            />
            <path
               fill='#CFF3FC'
               fillRule='evenodd'
               d='M18.641 31.031l6.433-4.569-3.727 3.593c.09.267.134.533.178.843h5.412c.488-4.037 4.48-4.303 4.48-9.316 0-1.863-.71-3.549-1.818-4.791l-4.037 4.303h3.371c-3.46 3.283-6.92 6.566-10.292 9.937zM27.38 12l-7.85 10.38 3.726-.044-3.105 5.501c-1.331-1.685-3.15-2.883-3.15-6.21a7.252 7.252 0 016.654-7.231l-3.815 4.436L27.381 12z'
               clipRule='evenodd'
            />
            <path
               fill='#CFF3FC'
               fillOpacity={0.9}
               fillRule='evenodd'
               d='M21.658 31.652h5.146c.266 0 .488.222.488.488a.492.492 0 01-.488.488h-5.146a.492.492 0 01-.488-.488c0-.266.222-.488.488-.488zm-.177 1.864c0 .266.221.488.487.488h4.481a.493.493 0 00.488-.488.492.492 0 00-.488-.488h-4.48a.491.491 0 00-.488.488zm.71.931c.088.843.975 1.553 2.04 1.553s1.908-.666 2.04-1.553h-4.08z'
               clipRule='evenodd'
            />
         </g>
         <defs>
            <linearGradient
               id='IDMWorkbookIcon__paint0_linear'
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
               id='IDMWorkbookIcon__paint1_linear'
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
               id='IDMWorkbookIcon__paint2_linear'
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
               id='IDMWorkbookIcon__paint3_linear'
               x1={24}
               x2={24}
               y1={43.642}
               y2={48.309}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#4C8DF1' stopOpacity={0} />
               <stop offset={1} stopColor='#4256AC' />
            </linearGradient>
            <clipPath id='IDMWorkbookIcon__clip0'>
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
