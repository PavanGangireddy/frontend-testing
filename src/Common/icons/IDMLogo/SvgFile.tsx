import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg width={48} height={48} fill='none' viewBox='0 0 48 48' {...props}>
         <path
            fill='url(#prefix__paint0_linear)'
            d='M12.717 38.063l12.865-9.139-7.453 7.187c.177.532.266 1.065.355 1.686h10.824c.976-8.074 8.961-8.607 8.961-18.632 0-3.727-1.42-7.098-3.637-9.583l-8.074 8.607H33.3c-6.92 6.565-13.841 13.13-20.584 19.874z'
         />
         <path
            fill='url(#prefix__paint1_linear)'
            d='M30.195 0L14.491 20.762l7.453-.09-6.21 11.003c-2.662-3.372-6.3-5.767-6.3-12.422 0-7.63 5.856-13.84 13.309-14.462l-7.63 8.873L30.194 0z'
         />
         <path
            fill='#fff'
            d='M18.75 39.305h10.292c.532 0 .976.444.976.976s-.444.976-.976.976H18.75c-.532 0-.976-.444-.976-.976s.444-.976.976-.976zm-.355 3.727c0 .532.444.975.976.975h8.961a.984.984 0 00.976-.975.984.984 0 00-.976-.976h-8.96a.985.985 0 00-.977.976zm1.42 1.863C19.992 46.58 21.767 48 23.896 48c2.13 0 3.815-1.33 4.081-3.105h-8.162z'
         />
         <defs>
            <linearGradient
               id='prefix__paint0_linear'
               x1={12.717}
               x2={38.269}
               y1={23.823}
               y2={23.823}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#FF8008' />
               <stop offset={1} stopColor='#FFC837' />
            </linearGradient>
            <linearGradient
               id='prefix__paint1_linear'
               x1={9.434}
               x2={30.195}
               y1={15.837}
               y2={15.837}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#FF8008' />
               <stop offset={1} stopColor='#FFC837' />
            </linearGradient>
         </defs>
      </svg>
   )
}

export default SvgComponent
