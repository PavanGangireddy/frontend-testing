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
         <path
            fill='#FF9102'
            d='M43.188 8.79H5.745a1.906 1.906 0 00-1.905 1.904V45.05c0 1.051.854 1.905 1.905 1.905H43.19a1.906 1.906 0 001.905-1.905V10.694a1.907 1.907 0 00-1.906-1.905z'
         />
         <path
            fill='url(#starred_folder__paint0_linear)'
            d='M40.724 35.015H8.21a1.905 1.905 0 01-1.905-1.905V2.756c0-1.052.853-1.905 1.905-1.905h32.513c1.053 0 1.906.853 1.906 1.905V33.11a1.905 1.905 0 01-1.905 1.905z'
         />
         <path
            fill='url(#starred_folder__paint1_linear)'
            d='M6.908 33.714V3.359c0-1.052.853-1.905 1.906-1.905h32.513c.371 0 .717.108 1.01.292a1.905 1.905 0 00-1.614-.895H8.21a1.905 1.905 0 00-1.905 1.905V33.11a1.9 1.9 0 00.895 1.613 1.888 1.888 0 01-.292-1.01z'
         />
         <path
            fill='#C2CECE'
            d='M36.723 7.265H12.21v1.397h24.512V7.265zm0 5.335H12.21v1.397h24.512V12.6zm0 5.335H12.21v1.396h24.512v-1.396zm0 5.334H12.21v1.397h24.512v-1.397z'
         />
         <path
            fill='url(#starred_folder__paint2_linear)'
            d='M15.132 18.76l6.16 6.159h-6.16v-6.16z'
         />
         <path
            fill='url(#starred_folder__paint3_linear)'
            d='M45.093 25.427V11.254L42.629 8.79v16.638h2.465z'
         />
         <path
            fill='url(#starred_folder__paint4_linear)'
            d='M47.98 26.709L45.326 45.51a1.905 1.905 0 01-1.886 1.639H5.495c-.95 0-1.754-.7-1.887-1.639L.02 20.105a1.904 1.904 0 011.886-2.171h11.718c.95 0 1.754.698 1.887 1.638l.47 3.327c.133.94.937 1.638 1.886 1.638h28.229a1.905 1.905 0 011.886 2.172z'
         />
         <path
            fill='#FF9102'
            fillRule='evenodd'
            d='M24 40.5l-3.744 1.969a.918.918 0 01-1.33-.967l.715-4.169-3.029-2.952a.916.916 0 01.508-1.564l4.186-.608 1.872-3.793a.917.917 0 011.644 0l1.872 3.793 4.186.608a.918.918 0 01.508 1.564l-3.029 2.952.715 4.17a.917.917 0 01-1.33.966L24 40.5z'
            clipRule='evenodd'
         />
         <defs>
            <linearGradient
               id='starred_folder__paint0_linear'
               x1={10.041}
               x2={47.905}
               y1={3.506}
               y2={41.369}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#fff' />
               <stop offset={1} stopColor='#E8EFEE' />
            </linearGradient>
            <linearGradient
               id='starred_folder__paint1_linear'
               x1={25.584}
               x2={1.491}
               y1={19.049}
               y2={-5.044}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#fff' />
               <stop offset={1} stopColor='#E8EFEE' />
            </linearGradient>
            <linearGradient
               id='starred_folder__paint2_linear'
               x1={19.201}
               x2={11.756}
               y1={25.907}
               y2={18.462}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#C2CECE' stopOpacity={0} />
               <stop offset={0.179} stopColor='#AFBCBC' stopOpacity={0.179} />
               <stop offset={1} stopColor='#5B6A6A' />
            </linearGradient>
            <linearGradient
               id='starred_folder__paint3_linear'
               x1={54.064}
               x2={37.353}
               y1={28.541}
               y2={11.83}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#FFC200' stopOpacity={0} />
               <stop offset={0.161} stopColor='#FDBB00' stopOpacity={0.161} />
               <stop offset={0.397} stopColor='#F7A700' stopOpacity={0.397} />
               <stop offset={0.678} stopColor='#EE8700' stopOpacity={0.678} />
               <stop offset={0.992} stopColor='#E05B00' stopOpacity={0.992} />
               <stop offset={1} stopColor='#E05A00' />
            </linearGradient>
            <linearGradient
               id='starred_folder__paint4_linear'
               x1={24.001}
               x2={24.001}
               y1={44.078}
               y2={46.775}
               gradientUnits='userSpaceOnUse'
            >
               <stop stopColor='#FFC200' />
               <stop offset={0.268} stopColor='#FB0' />
               <stop offset={0.659} stopColor='#FFA801' />
               <stop offset={1} stopColor='#FF9102' />
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
